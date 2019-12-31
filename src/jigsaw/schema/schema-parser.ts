import { SchemaElement } from './definition/schema-element';
import { SchemaAttribute } from './definition/schema-attribute';
import { NodeType } from '../document/document.info';
import {
  SchemaType,
  SchemaElementDefinition,
  parseType,
  SchemaAttributeDefinition,
  SchemaAttributeUse,
  AbstractElement,
} from './definition/schema-definition';
import {
  SchemaComplexType,
  SchemaContentTypes,
  SchemaComplexTypeStructure,
} from './definition/schema-complex-type';
import { SchemaDocument } from './definition/schema-document';

const SCHEMA_NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';

export enum SchemaElements {
  Element = 'xs:element',
  Attribute = 'xs:attribute',
  Choice = 'xs:choice',
  Sequence = 'xs:sequence',
  ComplexType = 'xs:complexType',
}

export enum SchemaAttributes {
  Name = 'name',
  Reference = 'ref',
  Type = 'type',
  Min = 'minOccurs',
  Max = 'maxOccurs',
  Use = 'use',
  Abstract = 'abstract',
  Mixed = 'mixed',
  SubstitutionGroup = 'substitutionGroup',
}

export enum SchemaConstants {
  Unbounded = 'unbounded',
  Required = 'required',
  Optional = 'optional',
  One = '1',
  True = 'true',
}

export class SchemaParser {
  private document: SchemaDocument;
  private abstractElements: AbstractElement[] = [];
  private schema!: Document;

  constructor() {
    this.document = new SchemaDocument();
  }

  public parse(schema: Document): SchemaDocument {
    this.schema = schema;
    // collect abstract elements from substitution grouped elements
    this.abstractElements = this.parseAbstractElements();
    this.parseElements(true);

    return this.document;
  }

  private parseElements(root: boolean = false) {
    // get the possible root elements
    const elements = this.getChildElements(
      this.schema.documentElement,
      SchemaElements.Element,
    ).filter(
      (el) =>
        !el.getAttribute(SchemaAttributes.Abstract) &&
        !el.getAttribute(SchemaAttributes.SubstitutionGroup),
    );

    elements.forEach((el) => {
      const element = this.parseElement(el, root);
      this.document.addElement(element);
    });
  }

  private parseElement(el: Element, root: boolean = false): SchemaElement {
    const def = this.parseElementDefinition(el);
    const element = new SchemaElement(def.name, def.type);
    if (element.type === SchemaType.Complex && def.complexNode) {
      const attributes = this.parseAttributes(def.complexNode);
      element.setAttributes(attributes);

      const mixed =
        el.getAttribute(SchemaAttributes.Mixed) === SchemaConstants.True;

      const complexType = this.parseComplexType(
        def.complexNode.firstElementChild,
        mixed,
      );
      element.setComplexType(complexType);
    }

    element.setRoot(root);

    return element;
  }

  private parseComplexType(
    structureEl: Element | null,
    mixed: boolean = false,
  ): SchemaComplexType {
    const content: Partial<SchemaComplexType> = {
      type: SchemaContentTypes.Empty,
      mixed,
    };

    if (structureEl) {
      const min = parseInt(
        structureEl.getAttribute(SchemaAttributes.Min) || SchemaConstants.One,
        10,
      );
      const max =
        structureEl.getAttribute(SchemaAttributes.Max) ===
        SchemaConstants.Unbounded
          ? Infinity
          : parseInt(
              structureEl.getAttribute(SchemaAttributes.Max) ||
                SchemaConstants.One,
              10,
            );
      content.min = min;
      content.max = max;

      switch (structureEl.nodeName) {
        case SchemaElements.Sequence:
          content.type = SchemaContentTypes.Sequence;
          break;
        case SchemaElements.Choice:
          content.type = SchemaContentTypes.Choice;
          break;
      }
      content.structure = this.parseComplexTypeContent(structureEl);
    }

    return content as SchemaComplexType;
  }

  private parseComplexTypeContent(el: Element): SchemaComplexTypeStructure[] {
    const children = this.getChildElements(el);

    return children.reduce(
      (
        structure: SchemaComplexTypeStructure[],
        child: Element,
      ): SchemaComplexTypeStructure[] => {
        switch (child.nodeName) {
          case SchemaElements.Element:
            const def = this.parseElementDefinition(child);
            const abstractContent = this.abstractElements.find(
              (abs) => abs.name === def.name,
            );
            if (abstractContent && abstractContent.elements.length) {
              structure = [
                ...structure,
                ...abstractContent.elements.map((abs) => {
                  return {
                    name: abs.name,
                    min: def.minOccurs,
                    max: def.maxOccurs,
                  };
                }),
              ];
            } else {
              structure = [
                ...structure,
                {
                  name: def.name,
                  min: def.minOccurs,
                  max: def.maxOccurs,
                },
              ];
            }
            // add the element to the parser's known elements if they are not references
            if (!def.isRef) {
              const element = this.parseElement(child);
              this.document.addElement(element);
            }
            break;
          case SchemaElements.Choice:
            const content = this.parseComplexType(child);
            structure = [...structure, content];
          default:
            break;
        }
        return structure;
      },
      [],
    );
  }

  private parseAttributes(parent: Element): SchemaAttribute[] {
    const attributeEls = this.getChildElements(
      parent,
      SchemaElements.Attribute,
    );

    return attributeEls.map((el) => {
      const def = this.parseAttributeDefinition(el);
      return new SchemaAttribute(def.name, def.type, def.use);
    });
  }

  // parse definitions
  private parseElementDefinition(el: Element): SchemaElementDefinition {
    const name = el.getAttribute(SchemaAttributes.Name);
    const ref = el.getAttribute(SchemaAttributes.Reference);
    const type = el.getAttribute(SchemaAttributes.Type) || '';
    const minOccurs =
      parseInt(`${el.getAttribute(SchemaAttributes.Min)}`, 10) || 1;
    const maxOccurs =
      el.getAttribute(SchemaAttributes.Max) === SchemaConstants.Unbounded
        ? Infinity
        : parseInt(
            el.getAttribute(SchemaAttributes.Max) || SchemaConstants.One,
            10,
          );
    const abstract = el.getAttribute(SchemaAttributes.Abstract) ? true : false;
    const complexType =
      (el.firstElementChild &&
        el.firstElementChild.nodeName === SchemaElements.ComplexType) ||
      false;

    let definitionName = name ? name : '';
    if (!definitionName && ref) {
      definitionName = ref;
    }

    const def: SchemaElementDefinition = {
      name: definitionName,
      type: parseType(type, complexType, abstract),
      typeName: type,
      isRef: !!ref,
      minOccurs,
      maxOccurs,
    };

    if (complexType && el.firstElementChild) {
      def.complexNode = el.firstElementChild;
    } else if (
      def.type === SchemaType.Complex &&
      !complexType &&
      !def.isRef &&
      !abstract
    ) {
      // find the complex type in the document as long this is not a reference element
      def.complexNode = this.getNamedComplexType(def.name, def.typeName);
    }

    return def;
  }

  private getNamedComplexType(name: string, type: string): Element {
    let el;
    // assuming named complex types are root children
    this.getChildElements(this.schema.documentElement).forEach(
      (child: Element) => {
        if (child.getAttribute(SchemaAttributes.Name) === type) {
          el = child;
        }
      },
    );

    if (!el) {
      throw new Error(
        `Unable to find complexType '${type}' for '${name}' as root child`,
      );
    }

    return el;
  }

  private parseAttributeDefinition(el: Element): SchemaAttributeDefinition {
    const name = el.getAttribute(SchemaAttributes.Name);
    const ref = el.getAttribute(SchemaAttributes.Reference);
    const type = el.getAttribute(SchemaAttributes.Type);
    const use = el.getAttribute(SchemaAttributes.Use);

    let definitionName = name ? name : '';
    if (!definitionName && ref) {
      definitionName = ref;
    }

    return {
      name: definitionName,
      type: parseType(type, false, false),
      isRef: !!ref,
      use:
        use === SchemaConstants.Required
          ? SchemaAttributeUse.Required
          : SchemaAttributeUse.Optional,
    };
  }

  private parseAbstractElements(): AbstractElement[] {
    // add all elements that point to this abstract to the definition
    return this.getChildElements(
      this.schema.documentElement,
      SchemaElements.Element,
    )
      .filter(
        (el) =>
          el.getAttribute(SchemaAttributes.Abstract) === SchemaConstants.True,
      )
      .map((el) => {
        const name = el.getAttribute('name') || '';
        const elements = this.getChildElements(
          this.schema.documentElement,
          SchemaElements.Element,
        )
          .filter(
            (child) =>
              child.getAttribute(SchemaAttributes.SubstitutionGroup) === name,
          )
          .map((child) => this.parseElement(child));

        return {
          name,
          elements,
        };
      });
  }

  // gets child elements by type, or all if no type is provided
  private getChildElements(parent: Element, type?: string): Element[] {
    let children: Element[] = [];

    for (const child of parent.childNodes) {
      if (child.nodeType === NodeType.ELEMENT) {
        if (!type || child.nodeName === type) {
          children = [...children, child as Element];
        }
      }
    }

    return children;
  }
}
