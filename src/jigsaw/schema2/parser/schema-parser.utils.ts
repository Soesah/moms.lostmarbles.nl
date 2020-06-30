import {
  SchemaElementType,
  SchemaAttributeType,
  SchemaAttributeUse,
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

// gets child elements by type, or all if no type is provided
export const getChildElementsByTagName = (
  parent: Element,
  type?: string,
): Element[] => {
  let children: Element[] = [];

  for (const child of parent.childNodes) {
    if (child.nodeType === NodeType.ELEMENT) {
      if (!type || child.nodeName === type) {
        children = [...children, child as Element];
      }
    }
  }

  return children;
};
