import { SchemaDocument } from '../schema-document';
import {
  SchemaElements,
  SchemaAttributes,
  SchemaElementType,
} from '../definition/schema.info';
import {
  getChildElementsByTagName,
  getSchemaElementType,
  getSchemaAttributeType,
  getSchemaAttributeUse,
  getSchemaAttributeOccurs,
  getSchemaAttributeMixed,
  getTypeFromComplexType,
} from './schema-parser.utils';
import { SchemaElement } from '../definition/schema-element';
import { SchemaAttribute } from '../definition/schema-attribute';
import { SchemaSequence } from '../definition/schema-sequence';
import { SchemaChoice } from '../definition/schema-choice';

export type SchemaComplexTypes = SchemaChoice | SchemaSequence;

export class SchemaParser {
  public schema: Document;
  public complexTypes: Map<string, Element> = new Map();

  constructor(schema: Document) {
    this.schema = schema;
  }

  public parse(): SchemaDocument {
    const doc = new SchemaDocument();

    // find the abstract elements (needed later in parsing)
    this.parseAbstractElements();

    // parse the root elements from the root node of the document
    doc.addRootElements(...this.parseRootElements());

    return doc;
  }

  public addComplexType(name: string, complexType: Element) {
    this.complexTypes.set(name, complexType);
  }

  public getComplexType(name: string): Element | undefined {
    return this.complexTypes.get(name);
  }

  private parseAbstractElements() {
    // find abstract elements
    // find related elements
  }

  private parseRootElements(): SchemaElement[] {
    // get only actual element definitions
    const rootElements = getChildElementsByTagName(
      this.schema.documentElement,
      SchemaElements.Element,
    ).filter(
      (el) =>
        !el.getAttribute(SchemaAttributes.Abstract) &&
        !el.getAttribute(SchemaAttributes.SubstitutionGroup),
    );

    // parse each elements structure
    return rootElements.map((el: Element) => {
      return this.parseElement(el);
    });
  }

  private parseAttributes(complexType: Element): SchemaAttribute[] {
    // parse the attributes
    return getChildElementsByTagName(complexType, SchemaElements.Attribute).map(
      (attr: Element) => {
        let name = attr.getAttribute(SchemaAttributes.Name);
        const ref = attr.getAttribute(SchemaAttributes.Reference);
        const use = getSchemaAttributeUse(
          attr.getAttribute(SchemaAttributes.Use),
        );

        if (ref && !name) {
          const referenceEl = this.getReferenceAttribute(ref);

          attr = referenceEl;
          name = ref;
        }

        if (!name) {
          throw new Error(`Could not parse attribute without name`);
        }

        const typeValue = attr.getAttribute(SchemaAttributes.Type);
        const type = getSchemaAttributeType(typeValue);

        if (!type && typeValue) {
          throw new Error(
            `Could not parse custom simpleType for attribute "${name}"`,
          );
        }

        if (!type) {
          throw new Error(`Could not parse type for attribute "${name}"`);
        }

        return new SchemaAttribute(name, type, use);
      },
    );
  }

  private parseElement(el: Element): SchemaElement {
    let name = el.getAttribute(SchemaAttributes.Name);
    const ref = el.getAttribute(SchemaAttributes.Reference);

    if (ref && !name) {
      const referenceEl = this.getReferenceElement(ref);

      if (!referenceEl) {
        throw new Error(`Reference element not found for ref "${ref}"`);
      }

      el = referenceEl;
      name = ref;
    }

    if (!name) {
      throw new Error('Could not parse element without name');
    }

    const schemaEl = new SchemaElement(name);

    const { type, complexType } = this.parseSchemaType(name, el);
    schemaEl.setSchemaType(type);

    if (type === SchemaElementType.ComplexTypeSequence && complexType) {
      schemaEl.setComplexType(this.parseComplexTypeSequence(complexType));
    }

    if (type === SchemaElementType.ComplexTypeChoice && complexType) {
      schemaEl.setComplexType(this.parseComplexTypeChoice(complexType));
    }

    if (complexType) {
      schemaEl.setAttributes(...this.parseAttributes(complexType));
    }

    return schemaEl;
  }

  private parseSchemaType(
    name: string,
    el: Element,
  ): { type: SchemaElementType; complexType?: Element } {
    const typeValue = el.getAttribute(SchemaAttributes.Type);
    let type = getSchemaElementType(typeValue);
    let complexType: Element | null = el.firstElementChild;
    let complexTypeElement: Element | null = null;

    if (type === null) {
      if (complexType) {
        complexTypeElement = complexType.firstElementChild;
      } else if (typeValue) {
        complexType = this.parseReferenceType(typeValue);
        complexTypeElement = complexType.firstElementChild;
      }
    }
    if (complexType) {
      type = getTypeFromComplexType(complexType);
    }

    if (type === null) {
      throw new Error(`Could not parse type for element "${name}"`);
    }

    return complexType ? { type, complexType } : { type };
  }

  private parseReferenceType(type: string): Element {
    let complexType = this.getComplexType(type);

    if (!complexType) {
      complexType = this.getReferenceComplexType(type);
    }
    if (!complexType) {
      throw new Error(`Could not parse custom type "${type}"`);
    }

    this.addComplexType(type, complexType);

    return complexType;
  }

  private parseComplexTypeSequence(el: Element): SchemaSequence {
    const complexType = new SchemaSequence();
    const isMixed = getSchemaAttributeMixed(
      el.getAttribute(SchemaAttributes.Mixed),
    );
    complexType.isMixed = isMixed;

    if (!el.firstElementChild) {
      throw new Error('Sequence has no element');
    }
    const children = getChildElementsByTagName(
      el.firstElementChild,
      SchemaElements.Element,
      SchemaElements.Choice,
    );

    children.forEach((child: Element) => {
      const minOccurs = getSchemaAttributeOccurs(
        child.getAttribute(SchemaAttributes.Min),
      );
      const maxOccurs = getSchemaAttributeOccurs(
        child.getAttribute(SchemaAttributes.Max),
      );

      // possible sequence children
      if (child.tagName === SchemaElements.Choice) {
        const choice = this.parseComplexTypeChoice(child);

        complexType.addElement(choice, minOccurs, maxOccurs);
      } else if (child.tagName === SchemaElements.Element) {
        const element = this.parseElement(child);

        complexType.addElement(element, minOccurs, maxOccurs);
      } else {
        throw new Error(
          `Unabled to parse ${child.tagName} as child of sequence`,
        );
      }
    });

    return complexType;
  }

  private parseComplexTypeChoice(el: Element): SchemaChoice {
    const complexType = new SchemaChoice();
    const isMixed = getSchemaAttributeMixed(
      el.getAttribute(SchemaAttributes.Mixed),
    );
    const minOccurs = getSchemaAttributeOccurs(
      el.getAttribute(SchemaAttributes.Min),
    );
    const maxOccurs = getSchemaAttributeOccurs(
      el.getAttribute(SchemaAttributes.Max),
    );
    complexType.minOccurs = minOccurs;
    complexType.maxOccurs = maxOccurs;
    complexType.isMixed = isMixed;

    if (!el.firstElementChild) {
      throw new Error('Choice has no element');
    }

    const children = getChildElementsByTagName(
      el.firstElementChild,
      SchemaElements.Element,
    );

    children.forEach((child: Element) => {
      const element = this.parseElement(child);

      complexType.addElement(element);
    });

    return complexType;
  }

  private getReferenceElement(name: string): Element | undefined {
    const rootElements = getChildElementsByTagName(
      this.schema.documentElement,
      SchemaElements.Element,
    );

    return rootElements.find(
      (el) => el.getAttribute(SchemaAttributes.Name) === name,
    );
  }

  private getReferenceComplexType(name: string): Element | undefined {
    const rootElements = getChildElementsByTagName(
      this.schema.documentElement,
      SchemaElements.ComplexType,
    );

    return rootElements.find(
      (el) => el.getAttribute(SchemaAttributes.Name) === name,
    );
  }

  private getReferenceAttribute(name: string): Element {
    const rootElements = getChildElementsByTagName(
      this.schema.documentElement,
      SchemaElements.Attribute,
    );

    const referenceEl = rootElements.find(
      (el) => el.getAttribute(SchemaAttributes.Name) === name,
    );

    if (!referenceEl) {
      throw new Error(`Reference attribute not found for ref "${name}"`);
    }

    return referenceEl;
  }
}
