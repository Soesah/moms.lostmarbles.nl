import { SchemaElement } from './schema-element';

export class SchemaDocument {
  public elements: SchemaElement[] = [];

  public get rootElements(): SchemaElement[] {
    return this.elements.filter((el) => el.root);
  }

  public addElement(element: SchemaElement) {
    if (!this.hasElement(element.name)) {
      this.elements = [...this.elements, element];
    }
  }

  public getElement(name: string): SchemaElement {
    const element = this.elements.find((el) => el.name === name);

    if (!element) {
      throw new Error(`getElement Error: Element '${name}' not found.`);
    }

    return element;
  }

  private hasElement(name: string): boolean {
    return !!this.elements.find((el) => el.name === name);
  }
}
