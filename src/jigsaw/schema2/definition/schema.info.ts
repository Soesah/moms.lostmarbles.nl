export enum SchemaAttributeType {
  String,
  Decimal,
  Integer,
  Boolean,
  Date,
  Time,
}

export enum SchemaElementType {
  String,
  Decimal,
  Integer,
  Boolean,
  Date,
  Time,
  Empty,
  ComplexTypeChoice,
  ComplexTypeSequence,
}

export enum SchemaElements {
  Element = 'xs:element',
  Attribute = 'xs:attribute',
  Choice = 'xs:choice',
  Sequence = 'xs:sequence',
  ComplexType = 'xs:complexType',
}

export enum SchemaAttributes {
  Name = 'name',
  Reference = 'ref',
  Type = 'type',
  Min = 'minOccurs',
  Max = 'maxOccurs',
  Use = 'use',
  Abstract = 'abstract',
  Mixed = 'mixed',
  SubstitutionGroup = 'substitutionGroup',
}

export enum SchemaAttributeUse {
  Required,
  Optional,
}

export enum SchemaConstants {
  Unbounded = 'unbounded',
  Required = 'required',
  Optional = 'optional',
  One = '1',
  True = 'true',
}
