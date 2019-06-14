import { ComplexAttribute } from './complex-attribute';
import { ComplexText } from './complex-text';
import { NodeType, EDITOR_NAMESPACE } from './document.info';
import { UUIDUtil } from '../util/uuid.util';

type ComplexNodes = ComplexNode | ComplexText;

export class ComplexNode {
  public uuid: string;
  public name: string;
  public attributes: ComplexAttribute[] = [];
  public parentNode: ComplexNode | null;
  public childNodes: ComplexNodes[] = [];
  public type: NodeType = NodeType.ELEMENT;

  private siblingIndex: number = 0;
  private minOccurs: number = 0;
  private maxOccurs: number = 0;
  private isMixed: boolean = true;

  constructor(name: string, parent: ComplexNode | null) {
    this.uuid = UUIDUtil.uuid4();
    this.name = name;
    this.parentNode = parent;
  }

  get index() {
    return this.siblingIndex;
  }

  set index(index: number) {
    this.siblingIndex = index;
  }

  get min(): number {
    return this.minOccurs;
  }

  set min(min: number) {
    this.minOccurs = min;
  }

  get max(): number {
    return this.maxOccurs;
  }

  set max(max: number) {
    this.maxOccurs = max;
  }

  get mixed(): boolean {
    return this.isMixed;
  }

  set mixed(mixed: boolean) {
    this.isMixed = mixed;
  }

  get allowedChildren(): ComplexNode[] {
    return [];
  }

  public getPath(path: ComplexNode[] = []): ComplexNode[] {
    return this.parentNode
      ? this.parentNode.getPath([this, ...path])
      : [this, ...path];
  }

  public setChildNodes(childNodes: ComplexNodes[]) {
    this.childNodes = [...childNodes];
  }

  public allowsChild(name: string): boolean {
    return this.allowedChildren.map((n: ComplexNode) => n.name).includes(name);
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
