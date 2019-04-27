import { ComplexNode } from './complex-node';
import { NodeType } from './document.info';

export class ComplexText {
  public parent: ComplexNode;
  public value: string | null;
  public type: NodeType = NodeType.TEXT;

  private siblingIndex: number = 0;

  constructor(value: string | null, node: ComplexNode) {
    this.value = value;
    this.parent = node;
  }

  get index() {
    return this.siblingIndex;
  }

  set index(index: number) {
    this.siblingIndex = index;
  }
}
