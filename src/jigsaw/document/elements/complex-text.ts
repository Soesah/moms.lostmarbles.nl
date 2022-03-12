import { ComplexNode } from './complex-node';
import { ComplexNodeBase } from './complex-node-base';
import { NodeType } from '../../core/info';

export class ComplexText extends ComplexNodeBase {
  public value: string = '';

  constructor(value: string, parent: ComplexNode, index: number) {
    super();
    this.type = NodeType.TEXT;
    this.index = index;
    this.parentNode = parent;
    this.value = value;
  }

  public buildXML(document: Document): Text {
    return document.createTextNode(this.value);
  }

  public canBeRemoved(): boolean {
    return true;
  }
}
