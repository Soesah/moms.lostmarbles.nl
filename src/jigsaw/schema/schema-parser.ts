import { SchemaElement } from './definition/schema-element';
import { SchemaAttribute } from './definition/schema-attribute';
import { NodeType } from '../document/document.info';
import {
  SchemaType,
  SchemaElementDefinition,
  parseType,
  SchemaAttributeDefinition,
  SchemaAttributeUse,
} from './definition/schema-definition';
import {
  SchemaComplexContent,
  SchemaContentType,
  SchemaComplexStructure,
} from './definition/schema-complex-content';

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
}

export enum SchemaConstants {
  Unbounded = 'unbounded',
  Required = 'required',
  Optional = 'optional',
  One = '1',
  True = 'true',
}

export class SchemaParser {
  public rootElements: SchemaElement[];

  constructor(schema: Document) {
    // reduce rootDefs
    this.rootElements = this.parseElements(schema);

    // parse a def down to the  last detail
    // parse complexType
    // parse abstract/substitution group
    // create structure of element
    // do not parse defs that have been parsed (as  long as they occur as root  defs...)
    // get abstracts
    // fill out abstracts
    // complete known complexTypes
    // complete elements and inline complexTypes
  }

  private parseElements(schema: Document): SchemaElement[] {
    // get the possible root elements
    const elements = this.getChildElements(
      schema.documentElement,
      SchemaElements.Element,
    );

    return elements.map((el) => {
      const def = this.parseElementDefinition(el);
      const element = new SchemaElement(def.name, def.type);
      if (element.type === SchemaType.Complex && def.complexNode) {
        const attributes = this.parseAttributes(def.complexNode);
        element.setAttributes(attributes);

        const complexContent = this.parseComplexType(def.complexNode);
        element.setContent(complexContent);
      }

      return element;
    });
  }

  private parseComplexType(el: Element): SchemaComplexContent {
    const mixed =
      el.getAttribute(SchemaAttributes.Mixed) === SchemaConstants.True;
    const content: Partial<SchemaComplexContent> = {
      type: SchemaContentType.Empty,
      mixed,
    };

    const structureEl = el.firstElementChild;

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
          content.type = SchemaContentType.Sequence;
          break;
        case SchemaElements.Choice:
          content.type = SchemaContentType.Choice;
          break;
      }
      content.structure = this.parseComplexTypeContent(structureEl);
    }

    return content as SchemaComplexContent;
  }

  private parseComplexTypeContent(el: Element): SchemaComplexStructure[] {
    const children = this.getChildElements(el);

    return children.reduce(
      (
        structure: SchemaComplexStructure[],
        child: Element,
      ): SchemaComplexStructure[] => {
        switch (child.nodeName) {
          case SchemaElements.Element:
            const def = this.parseElementDefinition(child);
            structure = [
              ...structure,
              {
                name: def.name,
                min: def.minOccurs,
                max: def.maxOccurs,
              },
            ];
            break;

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
    const type = el.getAttribute(SchemaAttributes.Type);
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
      isRef: !!ref,
      minOccurs,
      maxOccurs,
    };

    if (complexType && el.firstElementChild) {
      def.complexNode = el.firstElementChild;
    }

    return def;
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

  // private parseReferenceElement() {}

  // private parseAbstractElement() {
  //   // add all elements that point to this abstract to the definition
  //   // keep the abstract around
  // }

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
