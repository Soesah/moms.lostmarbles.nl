import { SchemaDocument } from './document.definition';
import { SchemaComplexType } from './complexType.definition';
import { SchemaElement } from './element.definition';
import { SchemaElementRef } from './element-ref.definition';
import { SchemaAttribute } from './attribute.definition';
import { SchemaAttributeRef } from './attribute-ref.definition';

const SCHEMA_NAMESPACE_URI = 'http://www.w3.org/2001/XMLSchema';
const USE_REQUIRED = 'required';

enum NodeType {
  NoType,
  ElementNode,
  AttributeNode,
  TextNode,
  Cdata_sectionNode,
  Entity_referenceNode,
  EntityNode,
  Processing_instructionNode,
  CommentNode,
  DocumentNode,
  Document_typeNode,
  Document_fragmentNode,
  NotationNode,
}

export class SchemaParser {
  private doc: Document;
  private schema: SchemaDocument = new SchemaDocument();

  constructor(schema: Document) {
    this.doc = schema;
    this.parse();
  }

  private parse() {
    this.parseNode(this.schema, this.doc.documentElement);

    this.schema.resolveComplexTypes();
    this.schema.updateTypes();

    // console.log(this.schema);
  }

  private parseNode(
    node: SchemaDocument | SchemaElement | SchemaComplexType,
    element: Element,
  ) {
    const name = element.localName;
    let child: SchemaDocument | SchemaElement | SchemaComplexType = node;

    if (element.nodeType === NodeType.ElementNode) {
      switch (name) {
        case 'schema':
          break;
        case 'sequence':
          break;
        case 'choice':
          // child.setChoiceContent()
          break;
        case 'element':
          const el = this.parseElement(element);
          node.addElement(el);
          child = el;
          break;
        case 'attribute':
          const attr = this.parseAttribute(element);
          node.addAttribute(attr);
          break;
        case 'complexType':
          if (node instanceof SchemaDocument) {
            child = this.parseComplexType(element);
            node.addComplexType(child);
          }
          break;
        default:
          // console.log(`${name} not parsed (${element})`);
          break;
      }

      element.childNodes.forEach((childElement) =>
        this.parseNode(child, childElement as Element),
      );
    }
  }

  private parseComplexType(el: Element): SchemaComplexType {
    const name = el.getAttribute('name');
    const mixed = el.getAttribute('mixed');

    if (name !== null) {
      return new SchemaComplexType(name, mixed === 'true');
    } else {
      throw new Error('ComplexType could not be parsed, no name attribute');
    }
  }

  private parseElement(el: Element): SchemaElement | SchemaElementRef {
    const data = {
      name: el.getAttribute('name'),
      ref: el.getAttribute('ref'),
      type: el.getAttribute('type'),
      substitutionGroup: el.getAttribute('substitutionGroup'),
      minOccurs: el.getAttribute('minOccurs'),
      maxOccurs: el.getAttribute('maxOccurs'),
      abstract: el.getAttribute('abstract') === 'true',
    };

    let result;

    if (data.name) {
      result = new SchemaElement(data);
    } else if (data.ref !== null) {
      result = new SchemaElementRef(data);
    } else {
      throw new Error('Element could not be parsed, no name or ref attribute');
    }

    return result;
  }

  private parseAttribute(el: Element): SchemaAttribute | SchemaAttributeRef {
    const name = el.getAttribute('name');
    const ref = el.getAttribute('ref');
    const type = el.getAttribute('type');
    const use = el.getAttribute('use');

    let result;

    if (name !== null && type !== null) {
      result = new SchemaAttribute(name, type, use === USE_REQUIRED);
    } else if (ref !== null) {
      result = new SchemaAttributeRef(ref, use === USE_REQUIRED);
    } else {
      throw new Error(
        'Attribute could not be parsed, no name or ref attribute',
      );
    }

    return result;
  }
}
