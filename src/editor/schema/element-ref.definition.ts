import { SchemaElement } from './element.definition';

export class SchemaElementRef extends SchemaElement {
  public ref: string;
  public type?: string;
  public abstract: boolean = false;

  constructor({
    ref = '',
    type,
    abstract = false,
    minOccurs,
    maxOccurs,
    required = false,
  }: any) {
    super({ minOccurs, maxOccurs, required });

    this.ref = ref;
    this.type = type;
    this.abstract = abstract;
  }

  get isRef(): boolean {
    return true;
  }
}
