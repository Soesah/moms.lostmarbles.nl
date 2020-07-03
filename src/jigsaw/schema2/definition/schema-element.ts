import { SchemaElementType } from './schema.info';
import { SchemaAttribute } from './schema-attribute';
import { SchemaChoice } from './schema-choice';
import { SchemaSequence } from './schema-sequence';

export class SchemaElement {
  public name: string;
  public type: SchemaElementType = SchemaElementType.String;
  public complexType?: SchemaChoice | SchemaSequence;
  public attributes: SchemaAttribute[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public setSchemaType(type: SchemaElementType) {
    this.type = type;
  }

  public setAttributes(...attributes: SchemaAttribute[]): void {
    this.attributes = attributes;
  }

  public setComplexType(complexType: SchemaChoice | SchemaSequence): void {
    this.complexType = complexType;
  }

  public getElement(name: string): SchemaElement | SchemaChoice {
    if (!this.complexType) {
      throw new Error(
        `Cannot call getElement on non-complexType element ${this.name}`,
      );
    }

    const el = this.complexType.getElement(name);
    if (!el) {
      throw new Error(
        `Schema element ${this.name} does not define the ${name} element`,
      );
    }
    return el;
  }
}
