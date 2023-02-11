import { SchemaElement } from './schema-element';
import { SchemaElementType } from './schema.info';

export class SchemaChoice {
  public hash: string;
  public type: SchemaElementType = SchemaElementType.ComplexTypeChoice;
  public isMixed: boolean = false;
  public isRecursive: boolean = false;
  public minOccurs: number = 1;
  public maxOccurs: number = 1;
  public elements: SchemaElement[] = []; // need to handle sequences also

  constructor(hash: string) {
    this.hash = hash;
  }

  public get name(): string {
    return 'choice'; // not the nicest thing to do...
  }

  public addElement(element: SchemaElement) {
    this.elements = [...this.elements, element];
  }

  public getElement(name: string): SchemaElement | null {
    return this.elements.find((element) => element.name === name) || null;
  }

  public setRecursive(isRecursive: boolean) {
    this.isRecursive = isRecursive;
  }
}
