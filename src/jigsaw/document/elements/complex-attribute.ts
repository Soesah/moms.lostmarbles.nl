import {
  SchemaAttributeUse,
  SchemaAttributeType,
} from '@/jigsaw/schema2/definition/schema.info';
import { SchemaAttribute } from '../../schema2/definition/schema-attribute';

export class ComplexAttribute {
  public name: string;
  public value: string;
  public schema: SchemaAttribute;

  constructor(name: string, value: string, schema: SchemaAttribute) {
    this.name = name;
    this.value = value;
    this.schema = schema;
  }

  get type(): SchemaAttributeType {
    return this.schema.type;
  }

  get required(): boolean {
    return this.schema.use === SchemaAttributeUse.Required;
  }
}
