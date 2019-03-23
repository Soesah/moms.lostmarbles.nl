import { ComplexNode } from '../document/complex-node';

export class Command {
  public execute(node: ComplexNode) {
    // do something
  }

  public canExecute(node: ComplexNode, context: ComplexNode): boolean {
    return false;
  }
}
