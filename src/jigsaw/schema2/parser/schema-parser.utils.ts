import {
  SchemaElementType,
  SchemaAttributeType,
  SchemaAttributeUse,
  SchemaConstants,
  SchemaElements,
} from '../definition/schema.info';

enum NodeType {
  NONE,
  ELEMENT,
  ATTRIBUTE,
  TEXT,
  CDATA_SECTION,
  ENTITY_REFERENCE,
  ENTITY,
  PROCESSING_INSTRUCTION,
  COMMENT,
  DOCUMENT,
  DOCUMENT_TYPE,
  DOCUMENT_FRAGMENT,
  NOTATION,
}

export const getSchemaAttributeOccurs = (occurs: string | null): number => {
  if (occurs === SchemaConstants.Unbounded) {
    return Infinity;
  } else if (typeof occurs === 'string') {
    return parseInt(occurs, 10);
  }
  return 1;
};

export const getSchemaAttributeType = (
  type: string | null,
): SchemaAttributeType | null => {
  switch (type) {
    case 'xs:string':
      return SchemaAttributeType.String;
    case 'xs:decimal':
      return SchemaAttributeType.Decimal;
    case 'xs:integer':
      return SchemaAttributeType.Integer;
    case 'xs:boolean':
      return SchemaAttributeType.Boolean;
    case 'xs:date':
      return SchemaAttributeType.Date;
    case 'xs:time':
      return SchemaAttributeType.Time;
    default:
      return null;
  }
};

export const getSchemaAttributeUse = (
  type: string | null,
): SchemaAttributeUse => {
  switch (type) {
    case 'optional':
      return SchemaAttributeUse.Optional;
    case 'required':
      return SchemaAttributeUse.Required;
    default:
      return SchemaAttributeUse.Required;
  }
};

export const getSchemaAttributeMixed = (type: string | null): boolean => {
  switch (type) {
    case 'true':
      return true;
    case 'false':
    default:
      return false;
  }
};

export const getSchemaElementType = (
  type: string | null,
): SchemaElementType | null => {
  switch (type) {
    case 'xs:string':
      return SchemaElementType.String;
    case 'xs:decimal':
      return SchemaElementType.Decimal;
    case 'xs:integer':
      return SchemaElementType.Integer;
    case 'xs:boolean':
      return SchemaElementType.Boolean;
    case 'xs:date':
      return SchemaElementType.Date;
    case 'xs:time':
      return SchemaElementType.Time;
    default:
      return null;
  }
};

// get the type from the complexType
export const getTypeFromComplexType = (
  complexType: Element,
): SchemaElementType => {
  const complexTypeElement = complexType.firstElementChild;

  if (complexTypeElement) {
    switch (complexTypeElement.tagName) {
      case SchemaElements.Sequence:
        return SchemaElementType.ComplexTypeSequence;
      case SchemaElements.Choice:
        return SchemaElementType.ComplexTypeChoice;
      case SchemaElements.ComplexContent:
        return SchemaElementType.ComplexContent;
      case SchemaElements.Attribute:
        return SchemaElementType.Empty;
    }
  }
  return SchemaElementType.Empty;
};

// gets child elements by type, or all if no type is provided
export const getChildElementsByTagName = (
  parent: Element,
  ...types: string[]
): Element[] => {
  let children: Element[] = [];

  for (const child of parent.childNodes) {
    if (child.nodeType === NodeType.ELEMENT) {
      if (types.includes(child.nodeName)) {
        children = [...children, child as Element];
      }
    }
  }

  return children;
};

export const hashCode = (s: string): string => {
  return `${s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0)}`;
};
