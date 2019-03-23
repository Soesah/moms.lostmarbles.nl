import { SchemaElement } from '../schema/element.definition';
import { SchemaAttribute } from '../schema/attribute.definition';

export class ComplexNode {
  public node: Node;
  public schema: SchemaElement | SchemaAttribute;

  constructor(node: Node, schema: SchemaElement | SchemaAttribute) {
    this.node = node;
    this.schema = schema;
  }
}
