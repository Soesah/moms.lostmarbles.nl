import { SchemaType, SchemaAttributeUse } from './schema-definition';

export class SchemaAttribute {
  public name: string;
  public type: SchemaType;
  public use: SchemaAttributeUse;

  constructor(name: string, type: SchemaType, use: SchemaAttributeUse) {
    this.name = name;
    this.type = type;
    this.use = use;
  }
}
