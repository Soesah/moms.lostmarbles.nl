export enum ComplexAttributeType {
  Number,
  String,
}

export class ComplexAttribute {
  public name: string;
  public type: ComplexAttributeType;

  private requiredAttribute: boolean = false;

  constructor(name: string, type: ComplexAttributeType) {
    this.name = name;
    this.type = type;
  }

  get required(): boolean {
    return this.requiredAttribute;
  }

  set required(required: boolean) {
    this.requiredAttribute = required;
  }
}
