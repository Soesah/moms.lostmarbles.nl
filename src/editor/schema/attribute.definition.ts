export class SchemaAttribute {
  public type: string;
  public name: string;
  public required: boolean = false;
  public abstract: boolean = false;

  constructor(name: string, type: string, required: boolean = false) {
    this.type = type;
    this.name = name;
    this.required = required;
  }
}
