import { NodeType } from '../../core/info';
import { ComplexNode } from './complex-node';
import { ComplexText } from './complex-text';
import { ComplexComment } from './complex-comment';

export const isElement = (child: any): child is ComplexNode => {
  return (child as ComplexNode).type === NodeType.ELEMENT;
};

export const isText = (child: any): child is ComplexText => {
  return (child as ComplexText).type === NodeType.TEXT;
};

export const isComment = (child: any): child is ComplexComment => {
  return (child as ComplexComment).type === NodeType.COMMENT;
};

export class ComplexNodeBase {
  public type: NodeType = NodeType.TEXT;
  public index: number = 0;
  public parentNode: ComplexNode | null = null;
}
