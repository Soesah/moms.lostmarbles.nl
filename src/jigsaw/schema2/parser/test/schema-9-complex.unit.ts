export const schemaArticle = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- article -->
  <xs:element name="article">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="title"/>
        <xs:element ref="block.abstract" minOccurs="1"/>
        <xs:element ref="section" minOccurs="1"/>
      </xs:sequence>
      <xs:attribute ref="id" />
    </xs:complexType>
  </xs:element>

  <xs:element name="section">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="title"/>
        <xs:element ref="block.abstract" minOccurs="1"/>
        <xs:element ref="section" minOccurs="0"/>
      </xs:sequence>
      <xs:attribute ref="id" use="optional" />
    </xs:complexType>
  </xs:element>

  <!-- title -->
  <xs:element name="title" type="xs:string"/>


  <xs:attribute name="id" type="xs:integer"/>


  <!-- types -->
  <xs:complexType name="block-type">
    <xs:sequence>
      <xs:element ref="block.abstract" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>

  <xs:element name="block.abstract" abstract="true"/>

  <xs:complexType name="list-type">
    <xs:sequence>
      <xs:element ref="item" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="text-type" mixed="true">
    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:element ref="inline.abstract"/>
    </xs:choice>
  </xs:complexType>

  <xs:element name="inline.abstract" abstract="true"/>

  <!-- basic elements -->
  <xs:element name="paragraph" type="text-type" substitutionGroup="block.abstract"/>

  <xs:element name="list" type="list-type" substitutionGroup="block.abstract"/>

  <xs:element name="item" type="text-type"/>

  <!-- inline elements -->
  <xs:element name="emphasis" type="text-type" substitutionGroup="inline.abstract"/>
  <xs:element name="strong" type="text-type" substitutionGroup="inline.abstract"/>


</xs:schema>`;
