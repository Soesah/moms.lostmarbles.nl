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
} from './schema-parser.utils';
import { SchemaElement } from '../definition/schema-element';
import { SchemaAttribute } from '../definition/schema-attribute';
import { SchemaSequence } from '../definition/schema-sequence';

export class SchemaParser {
  public schema: Document;

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

          if (!referenceEl) {
            throw new Error(`Reference attribute not found for ref "${ref}"`);
          }

          attr = referenceEl;
          name = ref;
        }

        const type = getSchemaAttributeType(
          attr.getAttribute(SchemaAttributes.Type),
        );

        if (!name) {
          throw new Error(`Need to handle reference attributes`);
        }

        if (!type) {
          throw new Error(`Need to handle reference attributes`);
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

    if (complexType) {
      schemaEl.setAttributes(...this.parseAttributes(complexType));
    }

    return schemaEl;
  }

  private parseSchemaType(
    name: string,
    el: Element,
  ): { type: SchemaElementType; complexType?: Element } {
    let type = getSchemaElementType(el.getAttribute(SchemaAttributes.Type));
    let complexType: Element | null = null;
    if (type === null) {
      complexType = el.firstElementChild;
      if (complexType) {
        const complexTypeElement = complexType.firstElementChild;
        if (complexTypeElement) {
          type =
            complexTypeElement.tagName === SchemaElements.Sequence
              ? SchemaElementType.ComplexTypeSequence
              : SchemaElementType.ComplexTypeChoice;
        } else {
          type = SchemaElementType.Empty;
        }
      }
    }

    if (type === null) {
      throw new Error(`Could not parse type for element "${name}"`);
    }

    return complexType ? { type, complexType } : { type };
  }

  private parseComplexTypeSequence(el: Element): SchemaSequence {
    const complexType = new SchemaSequence();

    if (!el.firstElementChild) {
      throw new Error('Sequence has no element');
    }
    const children = getChildElementsByTagName(
      el.firstElementChild,
      SchemaElements.Element,
    );

    children.forEach((child: Element) => {
      const element = this.parseElement(child);
      const minOccurs = getSchemaAttributeOccurs(
        child.getAttribute(SchemaAttributes.Min),
      );
      const maxOccurs = getSchemaAttributeOccurs(
        child.getAttribute(SchemaAttributes.Max),
      );

      complexType.addElement(element, minOccurs, maxOccurs);
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

  private getReferenceAttribute(name: string): Element | undefined {
    const rootElements = getChildElementsByTagName(
      this.schema.documentElement,
      SchemaElements.Attribute,
    );

    return rootElements.find(
      (el) => el.getAttribute(SchemaAttributes.Name) === name,
    );
  }
}
