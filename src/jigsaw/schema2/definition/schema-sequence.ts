import { SchemaElementType } from './schema.info';
import { SchemaElement } from './schema-element';
import { SchemaChoice } from './schema-choice';

export class SchemaSequenceItem {
  public minOccurs: number = 1;
  public maxOccurs: number = 1;
  public element: SchemaElement | SchemaChoice;

  constructor(element: SchemaElement | SchemaChoice) {
    this.element = element;
  }

  public get name(): string {
    return this.element.name;
  }
}

export class SchemaSequence {
  public hash: string;
  public type: SchemaElementType = SchemaElementType.ComplexTypeSequence;
  public isMixed: boolean = false;
  public isRecursive: boolean = false;
  public elements: SchemaSequenceItem[] = [];

  constructor(hash: string) {
    this.hash = hash;
  }

  public addElement(
    element: SchemaElement | SchemaChoice,
    minOccurs = 1,
    maxOccurs = 1,
  ) {
    const item = new SchemaSequenceItem(element);
    item.minOccurs = minOccurs;
    item.maxOccurs = maxOccurs;

    this.elements = [...this.elements, item];
  }

  public getElement(name: string): SchemaElement | SchemaChoice | null {
    const item = this.elements.find((element) => element.name === name);
    return item ? item.element : null;
  }

  public setRecursive(isRecursive: boolean) {
    this.isRecursive = isRecursive;
  }
}
