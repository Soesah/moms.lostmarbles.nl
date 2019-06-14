import { SchemaElement } from './element.definition';
import { SchemaElementRef } from './element-ref.definition';
import { SchemaAttribute } from './attribute.definition';
import { SchemaAttributeRef } from './attribute-ref.definition';

export class SchemaComplexType {
  public elementDefinitions: Array<SchemaElement | SchemaElementRef> = [];
  public attributeDefinitions: Array<SchemaAttribute | SchemaAttributeRef> = [];

  public name: string;
  public mixed: boolean = false;

  constructor(name: string, mixed = false) {
    this.name = name;
    this.mixed = mixed;
  }

  public addElement(child: SchemaElement | SchemaElementRef) {
    this.elementDefinitions = [...this.elementDefinitions, child];
  }

  public addAttribute(child: SchemaAttribute | SchemaAttributeRef) {
    this.attributeDefinitions = [...this.attributeDefinitions, child];
  }
}
