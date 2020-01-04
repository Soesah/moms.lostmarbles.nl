import { ComplexNode } from './complex-node';
import { NodeType } from '../../core/info';

export class ComplexText {
  public type: NodeType = NodeType.TEXT;
  public index: number = 0;
  public parentNode: ComplexNode;
  public value: string = '';

  constructor(value: string, parent: ComplexNode, index: number) {
    this.value = value;
    this.parentNode = parent;
    this.index = index;
  }

  public buildXML(document: Document): Text {
    const el = document.createTextNode(this.value);

    return el;
  }

  public canBeRemoved(): boolean {
    return false;
  }
}
