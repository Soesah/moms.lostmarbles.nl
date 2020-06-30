import { SchemaElement } from './schema-element';
import { SchemaElementType } from './schema.info';

export class SchemaSequenceItem {
  public minOccurs: number = 1;
  public maxOccurs: number = 1;
  public element: SchemaElement;

  constructor(element: SchemaElement) {
    this.element = element;
  }

  public get name() {
    return this.element.name;
  }
}

export class SchemaSequence {
  public type: SchemaElementType = SchemaElementType.ComplexTypeSequence;
  public elements: SchemaSequenceItem[] = [];

  public addElement(element: SchemaElement, minOccurs = 1, maxOccurs = 1) {
    const item = new SchemaSequenceItem(element);
    item.minOccurs = minOccurs;
    item.maxOccurs = maxOccurs;

    this.elements = [...this.elements, item];
  }

  public getElement(name: string): SchemaElement | null {
    const item = this.elements.find((element) => element.name === name);
    return item ? item.element : null;
  }
}
