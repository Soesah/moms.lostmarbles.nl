import { SchemaAttribute } from './schema-attribute';
import { SchemaType } from './schema-definition';
import { SchemaComplexType } from './schema-complex-type';

export class SchemaElement {
  public name: string;
  public type: SchemaType;
  public complexType?: SchemaComplexType;
  public attributes?: SchemaAttribute[];
  public root: boolean = false;

  constructor(name: string, type: SchemaType) {
    this.name = name;
    this.type = type;
  }

  public setAttributes(attributes: SchemaAttribute[]) {
    this.attributes = attributes;
  }

  public setComplexType(complexType: SchemaComplexType) {
    this.complexType = complexType;
  }

  public setRoot(root: boolean) {
    this.root = root;
  }
}
