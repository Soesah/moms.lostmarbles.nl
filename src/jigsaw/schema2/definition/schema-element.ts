import { SchemaElementType } from './schema.info';
import { SchemaAttribute } from './schema-attribute';
import { SchemaChoice } from './schema-choice';
import { SchemaSequence } from './schema-sequence';

export class SchemaElement {
  public name: string;
  public path: string = '';
  public type: SchemaElementType = SchemaElementType.String;
  public complexType?: SchemaChoice | SchemaSequence;
  public attributes: SchemaAttribute[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public setPath(path: string) {
    this.path = path;
  }

  public get lastPath(): string {
    const parts = this.path.split('/');
    return parts[parts.length - 1];
  }

  public get isComplexType(): boolean {
    return [
      SchemaElementType.ComplexTypeChoice,
      SchemaElementType.ComplexTypeSequence,
      SchemaElementType.ComplexContent,
    ].includes(this.type);
  }

  public setSchemaType(type: SchemaElementType) {
    this.type = type;
  }

  public setAttributes(...attributes: SchemaAttribute[]): void {
    this.attributes = attributes;
  }

  public setComplexType(complexType: SchemaChoice | SchemaSequence): void {
    this.complexType = complexType;
  }

  public getElement(name: string): SchemaElement | SchemaChoice {
    if (!this.complexType) {
      throw new Error(
        `Cannot call getElement(${name}) on non-complexType element ${this.name}`,
      );
    }

    const el = this.complexType.getElement(name);
    if (!el) {
      throw new Error(
        `Schema element ${this.name} does not define the ${name} element`,
      );
    }
    return el;
  }

  public getAttribute(name: string): SchemaAttribute {
    if (!this.complexType) {
      throw new Error(
        `Cannot call getAttribute(${name}) on non-complexType element ${this.name}`,
      );
    }
    const schemaAttribute = this.attributes.find((a) => a.name === name);

    if (!schemaAttribute) {
      throw new Error(
        `Attribute ${name} is not defined by element ${this.name}`,
      );
    }
    return schemaAttribute;
  }

  public getMinOccurs(name: string): number {
    // if (this.complexType) {
    //   const occ = this.complexType.elements.find((def) => {
    //     if (isSchemaElementOccurance(def)) {
    //       return def.name === name;
    //     } else if (isSchemaChoice(def)) {
    //       // console.log(def);
    //       return 1;
    //     }
    //   });
    //   if (occ) {
    //     return occ.min;
    //   }
    // }
    return 1;
    throw new Error(`${name} is not a child of ${this.name}`);
  }
}
