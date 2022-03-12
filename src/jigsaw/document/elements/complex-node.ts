import { NodeType, EDITOR_NAMESPACE } from '../../core/info';
import { ComplexChoice } from '../structure/complex-choice';
import { ComplexSequence } from '../structure/complex-sequence';
import { ComplexText } from './complex-text';
import { ComplexAttribute } from './complex-attribute';
import { UUIDUtil } from '../../util/uuid.util';
import { SchemaElement } from '../../schema/definition/schema-element';
import { SchemaType } from '../../schema/definition/schema-definition';
import {
  ComplexNodeBase,
  isText,
  isComment,
  isElement,
} from './complex-node-base';

export type ComplexNodes = ComplexNode | ComplexText;

export class ComplexNode extends ComplexNodeBase {
  public uuid: string;
  public name: string;
  public structure: ComplexChoice | ComplexSequence | null = null;
  public attributes: ComplexAttribute[] = [];
  public schema: SchemaElement;

  constructor(
    name: string,
    parent: ComplexNode | null,
    schema: SchemaElement,
    index: number,
  ) {
    super();
    this.type = NodeType.ELEMENT;
    this.index = index;
    this.parentNode = parent;
    this.uuid = UUIDUtil.uuid4();
    this.name = name;
    this.schema = schema;
  }

  get mixed(): boolean {
    return !!(
      this.schema.isComplexType &&
      this.schema.complexType &&
      this.schema.complexType.mixed
    );
  }

  get childNodes(): ComplexNode[] {
    return this.structure ? this.structure.nodes : [];
  }

  get firstChild(): ComplexNodes {
    return this.childNodes[0];
  }

  get lastChild(): ComplexNodes {
    return this.childNodes[this.childNodes.length - 1];
  }

  get elementChildNodes(): ComplexNode[] {
    return this.childNodes.filter((child) => isElement(child)) as ComplexNode[];
  }

  get firstElementChild(): ComplexNode {
    return this.elementChildNodes[0];
  }

  get lastElementChild(): ComplexNodes {
    return this.elementChildNodes[this.elementChildNodes.length - 1];
  }

  public canBeRemoved(): boolean {
    return !!(this.parentNode && this.parentNode.canRemoveChild(this));
  }

  public canRemoveChild(child: ComplexNodes): boolean {
    if (isText(child)) {
      // a text node can be removed from a string typed element
      return this.schema.type === SchemaType.String;
    } else if (isComment(child)) {
      return true;
    } else if (isElement(child)) {
      // verify with the schema if a child can be removed from a complexType
      if (this.schema.isComplexType) {
        const min = this.schema.getMinOccurs(child.name);
        // console.log({ min });
        return min === 0;
      }
    }

    return false;
  }

  public canInsertChild(): boolean {
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

  public setStructure(structure: ComplexSequence | ComplexChoice) {
    this.structure = structure;
  }

  public setChildNodes(childNodes: ComplexNodes[]) {
    // this.childNodes = [...childNodes];
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
