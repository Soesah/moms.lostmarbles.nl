export enum ComplexAttributeType {
  Number,
  String,
}

export class ComplexAttribute {
  public name: string;
  public value: string;
  public type: ComplexAttributeType;

  private requiredAttribute: boolean = false;

  constructor(name: string, value: string, type: ComplexAttributeType) {
    this.name = name;
    this.value = value;
    this.type = type;
  }

  get required(): boolean {
    return this.requiredAttribute;
  }

  set required(required: boolean) {
    this.requiredAttribute = required;
  }
}
