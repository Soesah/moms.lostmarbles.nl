/*
  schema with an extension to get an attribute on an element using a type
*/
export const schemaWithExtension = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">


  <xs:element name="doc" type="docType"/>

  <xs:complexType name="docType">
    <xs:sequence>
      <xs:element name="title" type="xs:string"/>
      <xs:element ref="author"/>
      <xs:element name="introduction" type="paragraphType"/>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType mixed="true" name="paragraphType">
    <xs:choice maxOccurs="unbounded">
      <xs:element name="bold" type="xs:string" />
      <xs:element name="italic" type="xs:string" />
    </xs:choice>
  </xs:complexType>

  <xs:element name="author">
    <xs:complexType>
      <xs:complexContent>
        <xs:extension base="paragraphType">
          <xs:attribute name="id" type="xs:string" use="optional"/>
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
  </xs:element>

</xs:schema>`;
