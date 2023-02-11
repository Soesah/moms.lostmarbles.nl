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
    if (name.indexOf('/') === -1) {
      const el = this.rootElements.find((element) => element.name === name);
      if (!el) {
        throw new Error(`Schema document does not define the ${name} element`);
      }
      return el;
    }
    // ugly, should be smarter
    const parts = name.split('/');
    const el = this.rootElements.find((element) => element.name === parts[0]);
    if (!el) {
      throw new Error(
        `Schema document does not define the ${parts[0]} element`,
      );
    }
    return el.getElement(parts[1]) as SchemaElement;
  }
}
