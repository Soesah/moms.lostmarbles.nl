import { SchemaDocument } from '../schema-document';
import {
  SchemaElements,
  SchemaAttributes,
  SchemaElementType,
  SchemaComplexType,
} from '../definition/schema.info';
import {
  getChildElementsByTagName,
  getSchemaElementType,
  getTypeFromComplexType,
  getSchemaAttributeType,
  getSchemaAttributeUse,
  getSchemaAttributeOccurs,
  getSchemaAttributeMixed,
  hashCode,
} from './schema-parser.utils';
import { SchemaElement } from '../definition/schema-element';
import { SchemaAttribute } from '../definition/schema-attribute';
import { SchemaSequence } from '../definition/schema-sequence';
import { SchemaChoice } from '../definition/schema-choice';

export class SchemaParser {
  public schema: Document;
  public complexTypes: Map<string, Element> = new Map();
  public parsedComplexTypes: Map<string, SchemaComplexType> = new Map();
  public abstractElements: Map<string, Element[]> = new Map();

  constructor(schema: Document) {
    this.schema = schema;
  }

  public parse(): SchemaDocument {
    const doc = new SchemaDocument();

    // find the abstract elements (needed later in parsing)
    this.parseAbstractElements();

    // parse the root elements from the root node of the document
    const elements = this.parseRootElements();
    doc.addRootElements(...elements);

    return doc;
  }

  public addComplexType(name: string, complexType: Element) {
    this.complexTypes.set(name, complexType);
  }

  public getComplexType(name: string): Element | undefined {
    return this.complexTypes.get(name);
  }

  public addParsedComplexType(name: string, complexType: SchemaComplexType) {
    this.parsedComplexTypes.set(name, complexType);
  }

  public getParsedComplexType(name: string): SchemaComplexType | undefined {
    return this.parsedComplexTypes.get(name);
  }

  private parseAbstractElements() {
    // find abstract elements
    const abstractElements = getChildElementsByTagName(
      this.schema.documentElement,
      SchemaElements.Element,
    ).filter((el) => el.getAttribute(SchemaAttributes.Abstract));
    // find related elements
    const substitutionGroupElements = getChildElementsByTagName(
      this.schema.documentElement,
      SchemaElements.Element,
    ).filter((el) => el.getAttribute(SchemaAttributes.SubstitutionGroup));

    abstractElements.forEach((element: Element) => {
      const name = element.getAttribute(SchemaAttributes.Name);
      if (!name) {
        throw new Error('Could not parse abstract element without name');
      }
      this.abstractElements.set(
        name,
        substitutionGroupElements.filter(
          (el: Element) =>
            el.getAttribute(SchemaAttributes.SubstitutionGroup) === name,
        ),
      );
    });
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

        if (type === null && typeValue) {
          throw new Error(
            `Could not parse custom simpleType for attribute "${name}"`,
          );
        }

        if (type === null) {
          throw new Error(`Could not parse type for attribute "${name}"`);
        }

        return new SchemaAttribute(name, type, use);
      },
    );
  }

  private parseElement(el: Element, parent?: SchemaElement): SchemaElement {
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
    schemaEl.setPath(`${parent ? `${parent.name}/` : ''}${name}`);

    const { type, complexType } = this.parseSchemaType(name, el);
    schemaEl.setSchemaType(type);

    if (complexType) {
      schemaEl.setComplexType(
        this.parseComplexType(type, complexType, schemaEl, name),
      );

      schemaEl.setAttributes(
        ...schemaEl.attributes, // copy over from what complexContent might have set
        ...this.parseAttributes(complexType),
      );
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

    if (type === null && typeValue) {
      complexType = this.parseReferenceType(typeValue);
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

    return complexType;
  }

  private parseComplexType(
    type: SchemaElementType,
    complexType: Element,
    parent: SchemaElement,
    name: string,
  ): SchemaComplexType {
    switch (type) {
      case SchemaElementType.ComplexTypeSequence:
        return this.parseComplexTypeSequence(
          complexType.firstElementChild,
          parent,
          name,
        );
      case SchemaElementType.ComplexTypeChoice:
        const isMixed = getSchemaAttributeMixed(
          complexType.getAttribute(SchemaAttributes.Mixed),
        );
        return this.parseComplexTypeChoice(
          complexType.firstElementChild,
          isMixed,
          parent,
          name,
        );
      case SchemaElementType.ComplexContent:
        return this.parseComplexContent(
          complexType.firstElementChild,
          parent,
          name,
        );
    }

    return new SchemaSequence('invalid');
  }

  private parseComplexTypeSequence(
    sequenceEl: Element | null,
    parent: SchemaElement,
    name: string,
  ): SchemaSequence {
    if (!sequenceEl) {
      throw new Error('Sequence has no element');
    }

    const hash = hashCode(sequenceEl.outerHTML);
    // keep this complexType early, to prevent recursion from confusing things when things aren't parsed yet
    let complexType = this.parsedComplexTypes.get(hash) as SchemaSequence;

    if (!complexType) {
      complexType = new SchemaSequence(hash);
      this.addParsedComplexType(hash, complexType);

      // figure out abstract children
      const children = getChildElementsByTagName(
        sequenceEl,
        SchemaElements.Element,
        SchemaElements.Choice,
      ).reduce((acc: Element[], element: Element) => {
        const ref = element.getAttribute(SchemaAttributes.Reference);
        const abstractElements = this.abstractElements.get(ref || '');
        if (abstractElements) {
          acc = [...acc, ...abstractElements];
        } else {
          acc = [...acc, element];
        }
        return acc;
      }, []);

      children.forEach((child: Element) => {
        const minOccurs = getSchemaAttributeOccurs(
          child.getAttribute(SchemaAttributes.Min),
        );
        const maxOccurs = getSchemaAttributeOccurs(
          child.getAttribute(SchemaAttributes.Max),
        );

        // possible sequence children
        if (child.tagName === SchemaElements.Choice) {
          const choice = this.parseComplexTypeChoice(
            child,
            false,
            parent,
            name,
          );
          complexType.addElement(choice, minOccurs, maxOccurs);
        } else if (child.tagName === SchemaElements.Element) {
          const element = this.parseElement(child, parent);
          complexType.addElement(element, minOccurs, maxOccurs);
        } else {
          throw new Error(
            `Unabled to parse ${child.tagName} as child of sequence`,
          );
        }
      });
    }

    if (parent.lastPath === name && parent.path !== name) {
      complexType.setRecursive(true);
    }

    return complexType;
  }

  private parseComplexTypeChoice(
    choiceEl: Element | null,
    isMixed: boolean = false,
    parent: SchemaElement,
    name: string,
  ): SchemaChoice {
    if (!choiceEl) {
      throw new Error('Choice has no element');
    }
    const hash = hashCode(choiceEl.outerHTML);
    // keep this complexType early, to prevent recursion from confusing things when things aren't parsed yet
    let complexType = this.parsedComplexTypes.get(hash) as SchemaChoice;

    if (!complexType) {
      complexType = new SchemaChoice(hash);
      this.addParsedComplexType(hash, complexType);

      const minOccurs = getSchemaAttributeOccurs(
        choiceEl.getAttribute(SchemaAttributes.Min),
      );
      const maxOccurs = getSchemaAttributeOccurs(
        choiceEl.getAttribute(SchemaAttributes.Max),
      );
      complexType.minOccurs = minOccurs;
      complexType.maxOccurs = maxOccurs;
      complexType.isMixed = isMixed;

      // figure out abstract children
      const children = getChildElementsByTagName(
        choiceEl,
        SchemaElements.Element,
      ).reduce((acc: Element[], element: Element) => {
        const ref = element.getAttribute(SchemaAttributes.Reference);
        const abstractElements = this.abstractElements.get(ref || '');
        if (abstractElements) {
          acc = [...acc, ...abstractElements];
        } else {
          acc = [...acc, element];
        }
        return acc;
      }, []);

      children.forEach((child: Element) => {
        const element = this.parseElement(child, parent);

        complexType.addElement(element);
      });
    }

    if (parent.lastPath === name && parent.path !== name) {
      complexType.setRecursive(true);
    }

    return complexType;
  }

  private parseComplexContent(
    contentEl: Element | null,
    schemaEl: SchemaElement,
    name: string,
  ): SchemaChoice | SchemaSequence {
    if (!contentEl || !contentEl.firstElementChild) {
      throw new Error('Content has no element or content');
    }
    const actionEl = contentEl.firstElementChild;
    const base = actionEl.getAttribute(SchemaAttributes.Base);
    if (!base) {
      throw new Error(
        `No base type specified for complex content ${actionEl.tagName}`,
      );
    }
    const sourceComplexType = this.parseReferenceType(base);
    const type = getTypeFromComplexType(sourceComplexType);
    const complexType = this.parseComplexType(
      type,
      sourceComplexType,
      schemaEl,
      name,
    );

    if (!sourceComplexType) {
      throw new Error(`No complexType found named ${base}`);
    }

    switch (actionEl.tagName) {
      case SchemaElements.Restriction:
        break;
      case SchemaElements.Extension:
        if (schemaEl) {
          schemaEl.setAttributes(...this.parseAttributes(actionEl));
        }
        break;
      default:
        throw new Error(`Unable to parse complexContent ${actionEl.tagName}`);
    }

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
