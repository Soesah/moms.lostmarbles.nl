import { SchemaChoice } from './definition/schema-choice';
import { SchemaElement } from './definition/schema-element';
import { SchemaSequence } from './definition/schema-sequence';
import { SchemaComplexType } from './definition/schema.info';

export class SchemaDocument {
  public rootElements: SchemaElement[] = [];
  public elements: Map<string, SchemaElement> = new Map();

  /*
    Create a map of elements, by path
    /doc
    /doc/title
    /doc/paragraph
    /doc/list
    /doc/list/item
    /doc/list/item/paragraph
    /doc/list/item/list => find recursion in this way!

    Make it easier to find a schema for an element, without having to walk over the document by the schema.

  */

  public addRootElements(...elements: SchemaElement[]) {
    elements.map((el) => {
      this.elements.set(`/${el.name}`, el);
      return el;
    });
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
