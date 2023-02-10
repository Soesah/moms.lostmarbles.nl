/*
  single root
  defining the document element by element
  no refs
  some attributes
*/

export const simpleSchema = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="title" type="xs:string"/>
      </xs:sequence>
      <xs:attribute name="index" type="xs:integer" use="optional"/>
      <xs:attribute name="year" type="xs:integer" use="required"/>
    </xs:complexType>
  </xs:element>

</xs:schema>`;
