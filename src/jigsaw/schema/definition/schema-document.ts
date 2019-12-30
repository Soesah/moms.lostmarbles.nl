import { SchemaElement } from './schema-element';

export class SchemaDocument {
  public elements: SchemaElement[] = [];

  public addElement(element: SchemaElement) {
    this.elements = [...this.elements, element];
  }
}
