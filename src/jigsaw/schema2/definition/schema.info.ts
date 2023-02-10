export enum SchemaAttributeType {
  String,
  Decimal,
  Integer,
  Boolean,
  Date,
  Time,
}

export enum SchemaElementType {
  String = 'string',
  Decimal = 'decimal',
  Integer = 'integer',
  Boolean = 'boolean',
  Date = 'date',
  Time = 'time',
  Empty = 'empty',
  ComplexTypeChoice = 'complextypechoice',
  ComplexTypeSequence = 'complextypesequence',
  ComplexContent = 'complexcontent',
}

export enum SchemaSimpleType {
  String = 'xs:string',
  Decimal = 'xs:decimal',
  Integer = 'xs:integer',
  Boolean = 'xs:boolean',
  Date = 'xs:date',
  Time = 'xs:time',
}

export enum SchemaElements {
  Element = 'xs:element',
  Attribute = 'xs:attribute',
  Choice = 'xs:choice',
  Sequence = 'xs:sequence',
  ComplexType = 'xs:complexType',
  ComplexContent = 'xs:complexContent',
  Restriction = 'xs:restriction',
  Extension = 'xs:extension',
}

export enum SchemaAttributes {
  Base = 'base',
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
