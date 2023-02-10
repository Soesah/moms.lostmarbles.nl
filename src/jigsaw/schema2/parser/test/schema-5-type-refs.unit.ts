/*
  three roots
  type references
*/

export const schemaWithTypeRefs = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc" type="docType"/>

  <xs:complexType name="docType">
    <xs:sequence>
      <xs:element name="title" type="xs:string"/>
      <xs:element name="introduction" type="paragraphType" minOccurs="0"/>
      <xs:choice maxOccurs="unbounded">
        <xs:element ref="paragraph" />
        <xs:element ref="list" />
      </xs:choice>
    </xs:sequence>
  </xs:complexType>

  <xs:element name="paragraph" type="paragraphType"/>

  <xs:complexType mixed="true" name="paragraphType">
      <xs:choice maxOccurs="unbounded">
        <xs:element name="bold" type="xs:string" />
        <xs:element name="italic" type="xs:string" />
      </xs:choice>
  </xs:complexType>

  <xs:element name="list" type="listType"/>

  <xs:complexType mixed="false" name="listType">
    <xs:sequence>
      <xs:element name="item" type="xs:string" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>

</xs:schema>`;
