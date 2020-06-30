import { SchemaElement } from './schema-element';
import { SchemaElementType } from './schema.info';

export class SchemaChoice {
  public type: SchemaElementType = SchemaElementType.ComplexTypeChoice;
  public elements: SchemaElement[] = [];

  public getElement(name: string): SchemaElement | null {
    return this.elements.find((element) => element.name === name) || null;
  }
}
