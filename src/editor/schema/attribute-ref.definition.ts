export class SchemaAttributeRef {
  public ref: string;
  public required: boolean = false;

  constructor(ref: string, required: boolean = false) {
    this.ref = ref;
    this.required = required;
  }
}
