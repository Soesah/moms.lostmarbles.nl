export enum SchemaType {
  String,
  Number,
  Complex,
  Abstract,
}

export enum ElementType {
  Element = 'element',
  Choice = 'choice',
  Sequence = 'sequence',
  ComplexType = 'complexType',
  Attribute = 'attribute',
}

export enum SchemaAttributeUse {
  Required,
  Optional,
}

export interface SchemaElementDefinition {
  name: string;
  type: SchemaType;
  typeName: string;
  isRef: boolean;
  minOccurs: number;
  maxOccurs: number;
  complexNode?: Element;
}

export interface SchemaAttributeDefinition {
  name: string;
  type: SchemaType;
  isRef: boolean;
  use: SchemaAttributeUse;
}

export const parseType = (
  type: string | null,
  isComplexType: boolean,
  isAbstract: boolean,
): SchemaType => {
  if (isComplexType) {
    return SchemaType.Complex;
  } else if (isAbstract) {
    return SchemaType.Complex;
  } else {
    switch (type) {
      case 'xs:string':
        return SchemaType.String;
      case 'xs:integer':
        return SchemaType.Number;
    }
  }
  return SchemaType.Complex;
};
