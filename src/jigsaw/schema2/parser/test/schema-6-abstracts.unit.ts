/*

    schema with abstract elements
 */

export const schemaWithAbstracts = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc" type="docType"/>

  <xs:complexType name="docType">
    <xs:sequence>
      <xs:element name="title" type="xs:string"/>
      <xs:element name="introduction" type="paragraphType"/>
      <xs:choice maxOccurs="unbounded">
        <xs:element ref="block.abstract"/>
      </xs:choice>
    </xs:sequence>
  </xs:complexType>

  <xs:element name="block.abstract" abstract="true"/>
  <xs:element name="paragraph" type="paragraphType" substitutionGroup="block.abstract"/>

  <xs:complexType mixed="true" name="paragraphType">
    <xs:choice maxOccurs="unbounded">
      <xs:element ref="inline.abstract"/>
    </xs:choice>
  </xs:complexType>

  <xs:element name="inline.abstract" abstract="true" />
  <xs:element name="bold" type="xs:string" substitutionGroup="inline.abstract" />
  <xs:element name="italic" type="xs:string" substitutionGroup="inline.abstract" />

  <xs:element name="list" type="listType" substitutionGroup="block.abstract" />

  <xs:complexType mixed="false" name="listType">
    <xs:sequence>
      <xs:element name="item" type="paragraphType" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>

</xs:schema>`;
