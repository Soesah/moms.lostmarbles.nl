import { SchemaAttribute } from './attribute.definition';
import { SchemaAttributeRef } from './attribute-ref.definition';
import { SchemaElementRef } from './element-ref.definition';

export class SchemaElement {
  public name: string;
  public type?: string;
  public minOccurs?: number;
  public maxOccurs?: number;
  public required: boolean = false;
  public mixed: boolean = false;
  public abstract: boolean = false;
  public substitutionGroup: string;

  public elementDefinitions: Array<SchemaElement | SchemaElementRef> = [];
  public attributeDefinitions: Array<SchemaAttribute | SchemaAttributeRef> = [];

  constructor({
    name = '',
    type,
    abstract = false,
    minOccurs,
    maxOccurs,
    substitutionGroup,
    required = false,
  }: any) {
    this.name = name;
    this.type = type;
    this.abstract = abstract;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.required = required;
    this.substitutionGroup = substitutionGroup;
  }

  get isRef(): boolean {
    return false;
  }

  public addElement(child: SchemaElement | SchemaElementRef) {
    this.elementDefinitions = [...this.elementDefinitions, child];
  }

  public addAttribute(child: SchemaAttribute | SchemaAttributeRef) {
    this.attributeDefinitions = [...this.attributeDefinitions, child];
  }

  public getRefs() {
    return this.elementDefinitions.filter((def) => def.isRef);
  }

  public setType(type: string) {
    this.type = type;
  }

  public substitutes(name: string): boolean {
    return this.substitutionGroup === name;
  }
}

export interface SubstitutionGroup {
  name: string;
  elements: SchemaElement[];
}
