import { SchemaAttribute } from '../../schema/definition/schema-attribute';
import {
  SchemaAttributeUse,
  SchemaType,
} from '../../schema/definition/schema-definition';

export class ComplexAttribute {
  public name: string;
  public value: string;
  public schema: SchemaAttribute;

  constructor(name: string, value: string, schema: SchemaAttribute) {
    this.name = name;
    this.value = value;
    this.schema = schema;
  }

  get type(): SchemaType {
    return this.schema.type;
  }

  get required(): boolean {
    return this.schema.use === SchemaAttributeUse.Required;
  }
}
