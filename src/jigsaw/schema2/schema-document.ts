import { SchemaElement } from './definition/schema-element';

export class SchemaDocument {
  public rootElements: SchemaElement[] = [];

  public addRootElements(...elements: SchemaElement[]) {
    this.rootElements = [...this.rootElements, ...elements];
  }

  public getElement(name: string): SchemaElement {
    const el = this.rootElements.find((element) => element.name === name);
    if (!el) {
      throw new Error(`Schema document does not define the ${name} element`);
    }
    return el;
  }
}
