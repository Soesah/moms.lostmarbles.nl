/*
  three roots
  mixed elements
*/

export const schemaWidthChoice = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="title" type="xs:string"/>
        <xs:choice maxOccurs="unbounded">
          <xs:element ref="paragraph" />
          <xs:element ref="list" />
        </xs:choice>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="paragraph">
    <xs:complexType mixed="true">
        <xs:choice maxOccurs="unbounded">
          <xs:element name="bold" type="xs:string" />
          <xs:element name="italic" type="xs:string" />
        </xs:choice>
    </xs:complexType>
  </xs:element>

  <xs:element name="list">
    <xs:complexType mixed="false">
      <xs:sequence>
        <xs:element name="item" type="xs:string" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

</xs:schema>`;
