import { ComplexNode } from './complex-node';

export class ComplexDocument {
  public root: ComplexNode;

  constructor(node: ComplexNode) {
    this.root = node;
  }

  public getComplexNode(uuid: string): ComplexNode {
    const node = this.root.getComplexNode(uuid);

    if (!node) {
      throw new Error(`Node with uuid ${uuid} not found`);
    }

    return node;
  }
}
