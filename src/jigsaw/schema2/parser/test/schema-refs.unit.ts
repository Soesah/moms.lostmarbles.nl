/*
  ref to element
  ref to attribute
  some attributes
*/

export const schemaDocumentWithRefs = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="title" type="xs:string"/>
        <xs:element ref="paragraph" minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
      <xs:attribute ref="year" use="required"/>
      <xs:attribute name="date" use="optional" type="xs:date"/>
    </xs:complexType>
  </xs:element>

  <xs:element name="paragraph" type="xs:string"/>

  <xs:attribute name="year" type="xs:integer"/>

</xs:schema>`;
