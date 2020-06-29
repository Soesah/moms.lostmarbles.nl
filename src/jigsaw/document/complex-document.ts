import { NodeType } from '../core/info';
import { ComplexText } from './elements/complex-text';
import { ComplexNode } from './elements/complex-node';
import { ComplexAttribute } from './elements/complex-attribute';
import { SchemaParser } from '../schema/parser/schema-parser';
import { SchemaDocument } from '../schema/schema-document';
import { SchemaContentTypes } from '../schema/definition/schema-complex-type';

export class ComplexDocument {
  public root: ComplexNode;
  public schema: SchemaDocument;

  constructor(document: Document, xsd: Document) {
    const parser = new SchemaParser();

    this.schema = parser.parse(xsd);
    this.root = this.parseComplexNode(document.documentElement, null, 0);
  }

  public getComplexNode(uuid: string): ComplexNode {
    const node = this.root.getComplexNode(uuid);

    if (!node) {
      throw new Error(`Node with uuid ${uuid} not found`);
    }

    return node;
  }

  public getXML(includeUUIDs: boolean = false): Document {
    const document = new Document();

    document.appendChild(this.root.buildXML(document, includeUUIDs));

    return document;
  }

  private parseComplexNode(
    node: Element,
    parent: ComplexNode | null = null,
    childIndex: number,
  ): ComplexNode {
    const name = node.nodeName;
    const schema = this.schema.getElement(name);
    const complexNode = new ComplexNode(name, parent, schema, childIndex);

    if (schema.isChoice) {
    }

    complexNode.setChildNodes(
      [...node.childNodes]
        .filter(
          (child: ChildNode) =>
            child.nodeType !== NodeType.PROCESSING_INSTRUCTION,
        )
        .map((child: ChildNode, index: number) => {
          switch (child.nodeType) {
            case NodeType.TEXT:
              return new ComplexText(
                child.textContent || '',
                complexNode,
                index,
              );
            default:
              return this.parseComplexNode(
                child as Element,
                complexNode,
                index,
              );
          }
        }),
    );

    complexNode.setAttributes(
      [...node.attributes].map((attr: Attr) => {
        const attributeSchema = schema.getAttribute(attr.name);
        return new ComplexAttribute(attr.name, attr.value, attributeSchema);
      }),
    );

    return complexNode;
  }
}
