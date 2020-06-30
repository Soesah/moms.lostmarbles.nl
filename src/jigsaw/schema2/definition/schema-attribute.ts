import { SchemaAttributeType, SchemaAttributeUse } from './schema.info';

export class SchemaAttribute {
  public name: string;
  public type: SchemaAttributeType;
  public use: SchemaAttributeUse;

  constructor(
    name: string,
    type: SchemaAttributeType,
    use: SchemaAttributeUse = SchemaAttributeUse.Required,
  ) {
    this.name = name;
    this.type = type;
    this.use = use;
  }
}
