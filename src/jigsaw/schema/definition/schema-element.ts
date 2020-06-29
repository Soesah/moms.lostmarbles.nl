import { SchemaAttribute } from './schema-attribute';
import { SchemaType } from './schema-definition';
import {
  SchemaComplexType,
  isSchemaElementOccurance,
  isSchemaChoice,
} from './schema-complex-type';

export class SchemaElement {
  public name: string;
  public type: SchemaType;
  public complexType?: SchemaComplexType;
  public attributes: SchemaAttribute[] = [];
  public root: boolean = false;

  constructor(name: string, type: SchemaType) {
    this.name = name;
    this.type = type;
  }

  get isComplexType(): boolean {
    return this.type === SchemaType.Complex;
  }

  public setAttributes(attributes: SchemaAttribute[]) {
    this.attributes = attributes;
  }

  public getAttribute(name: string): SchemaAttribute {
    const attribute = this.attributes.find((attr) => attr.name === name);

    if (!attribute) {
      throw new Error(
        `Attribute '${name}' not declared on element '${this.name}'`,
      );
    }

    return attribute;
  }

  public setComplexType(complexType: SchemaComplexType) {
    this.complexType = complexType;
  }

  public getMinOccurs(name: string): number {
    if (this.complexType) {
      const occ = this.complexType.structure.find((def) => {
        if (isSchemaElementOccurance(def)) {
          return def.name === name;
        } else if (isSchemaChoice(def)) {
          console.log(def);
          return 1;
        }
      });
      if (occ) {
        return occ.min;
      }
    }
    throw new Error(`${name} is not a child of ${this.name}`);
  }

  public setRoot(root: boolean) {
    this.root = root;
  }
}
