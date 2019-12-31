import { ComplexNode } from './complex-node';
import { NodeType } from '../core/info';

export class ComplexText {
  public parent: ComplexNode;
  public value: string = '';
  public type: NodeType = NodeType.TEXT;

  private siblingIndex: number = 0;

  constructor(value: string, node: ComplexNode) {
    this.value = value;
    this.parent = node;
  }

  get index() {
    return this.siblingIndex;
  }

  set index(index: number) {
    this.siblingIndex = index;
  }

  public buildXML(document: Document): Text {
    const el = document.createTextNode(this.value);

    return el;
  }
}
