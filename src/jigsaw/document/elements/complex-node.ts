import { ComplexAttribute } from './complex-attribute';
import { ComplexText } from './complex-text';
import { NodeType, EDITOR_NAMESPACE } from '../../core/info';
import { UUIDUtil } from '../../util/uuid.util';
import { SchemaElement } from '../../schema/definition/schema-element';

export type ComplexNodes = ComplexNode | ComplexText;

export class ComplexNode {
  public uuid: string;
  public name: string;
  public type: NodeType = NodeType.ELEMENT;
  public index: number = 0;
  public parentNode: ComplexNode | null;
  public childNodes: ComplexNodes[] = [];
  public attributes: ComplexAttribute[] = [];
  public schema: SchemaElement;

  constructor(
    name: string,
    parent: ComplexNode | null,
    schema: SchemaElement,
    index: number,
  ) {
    this.uuid = UUIDUtil.uuid4();
    this.name = name;
    this.parentNode = parent;
    this.schema = schema;
    this.index = index;
  }

  get mixed(): boolean {
    return !!(
      this.schema.isComplexType &&
      this.schema.complexType &&
      this.schema.complexType.mixed
    );
  }

  public canBeRemoved(): boolean {
    // use the schema to verify if the node is required
    return true;
  }

  get canMoveUp(): boolean {
    // use the schema to see if this node can be moved up
    return true;
  }

  get canMoveDown(): boolean {
    // use the schema to see if this node can be moved down
    return true;
  }

  get hasAttributes(): boolean {
    return this.attributes.length !== 0;
  }

  get allowedChildren(): ComplexNode[] {
    // use the node to find existing children, types and count
    // use the schema to see if others are allowed
    return [];
  }

  public allowsChild(name: string): boolean {
    return this.allowedChildren.map((n: ComplexNode) => n.name).includes(name);
  }

  public getPath(path: ComplexNode[] = []): ComplexNode[] {
    return this.parentNode
      ? this.parentNode.getPath([this, ...path])
      : [this, ...path];
  }

  public setChildNodes(childNodes: ComplexNodes[]) {
    this.childNodes = [...childNodes];
  }

  public setAttributes(attributes: ComplexAttribute[]) {
    this.attributes = [...attributes];
  }

  public getComplexNode(uuid: string): ComplexNode | null {
    if (this.uuid === uuid) {
      return this;
    }
    return this.childNodes.reduce(
      (acc: ComplexNode | null, node: ComplexNodes) => {
        if (!acc && node instanceof ComplexNode) {
          acc = node.getComplexNode(uuid);
        }
        return acc;
      },
      null,
    );
  }

  public buildXML(document: Document, includeUUIDs: boolean): HTMLElement {
    const el = document.createElement(this.name);

    if (includeUUIDs) {
      el.setAttributeNS(EDITOR_NAMESPACE, 'editor:node-id', this.uuid);
    }

    this.attributes.forEach((ca: ComplexAttribute) => {
      el.setAttribute(ca.name, ca.value);
    });

    this.childNodes.forEach((cn: ComplexNodes) => {
      el.appendChild(cn.buildXML(document, includeUUIDs));
    });

    return el;
  }
}
