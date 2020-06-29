import { ComplexNode } from './complex-node';
import { ComplexNodeBase } from './complex-node-base';
import { NodeType } from '../../core/info';

export class ComplexComment extends ComplexNodeBase {
  public value: string = '';

  constructor(value: string, parent: ComplexNode, index: number) {
    super();
    this.type = NodeType.COMMENT;
    this.index = index;
    this.parentNode = parent;
    this.value = value;
  }

  public buildXML(document: Document): Comment {
    return document.createComment(this.value);
  }

  public canBeRemoved(): boolean {
    return false;
  }
}
