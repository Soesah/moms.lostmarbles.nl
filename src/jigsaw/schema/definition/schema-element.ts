import { SchemaAttribute } from './schema-attribute';
import { SchemaType } from './schema-definition';
import { SchemaComplexContent } from './schema-complex-content';

export class SchemaElement {
  public name: string;
  public type: SchemaType;
  public attributes?: SchemaAttribute[];
  public content?: SchemaComplexContent;

  constructor(name: string, type: SchemaType) {
    this.name = name;
    this.type = type;
  }

  public setAttributes(attributes: SchemaAttribute[]) {
    this.attributes = attributes;
  }

  public setContent(content: SchemaComplexContent) {
    this.content = content;
  }
}
