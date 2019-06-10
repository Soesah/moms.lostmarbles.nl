import { SchemaDocument } from '../schema/document.definition';
import { NodeType } from './document.info';
import { ComplexText } from './complex-text';
import { ComplexNode } from './complex-node';
import { ComplexAttributeType, ComplexAttribute } from './complex-attribute';

export class ComplexDocument {
  public root: ComplexNode;
  private schema: SchemaDocument;

  constructor(document: Document, schema: SchemaDocument) {
    this.schema = schema;
    this.root = this.parseComplexNode(document.documentElement);
  }

  public getComplexNode(uuid: string): ComplexNode {
    const node = this.root.getComplexNode(uuid);

    if (!node) {
      throw new Error(`Node with uuid ${uuid} not found`);
    }

    return node;
  }

  public getXML(): Document {
    const document = new Document();

    document.appendChild(this.root.buildXML(document));

    return document;
  }

  private parseComplexNode(
    node: Element,
    parent: ComplexNode | null = null,
  ): ComplexNode {
    const name = node.nodeName;
    const uuid = node.getAttribute('editor:node-id');
    const definition = this.schema.getDefinition(name);

    if (!uuid) {
      throw new Error('Unable to parse complex node, uuid not found');
    }

    const complexNode = new ComplexNode(uuid, name, parent);
    const childNodes = [...node.childNodes]
      .filter(
        (child: ChildNode) =>
          child.nodeType !== NodeType.PROCESSING_INSTRUCTION,
      )
      .map((child: ChildNode, index: number) => {
        switch (child.nodeType) {
          case NodeType.TEXT:
            const textNode = new ComplexText(child.textContent ? child.textContent : '', complexNode);
            textNode.index = index;
            return textNode;
          default:
            const childNode = this.parseComplexNode(
              child as Element,
              complexNode,
            );
            childNode.index = index;
            return childNode;
        }
      });

    complexNode.setChildNodes(childNodes);

    complexNode.setAttributes(
      [...node.attributes]
        .filter((attr: Attr) => attr.name !== 'editor:node-id')
        .map(
          (attr: Attr) =>
            new ComplexAttribute(attr.name, attr.value, ComplexAttributeType.String),
        ),
    );

    complexNode.mixed = definition.mixed;
    complexNode.min = definition.minOccurs;
    complexNode.max = definition.maxOccurs;

    return complexNode;
  }
}
