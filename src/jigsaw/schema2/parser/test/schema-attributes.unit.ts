/*
  single root
  only at attribute, via complexType
*/

export const schemaWithOnlyAttribute = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:attribute name="date" use="optional" type="xs:date"/>
    </xs:complexType>
  </xs:element>


</xs:schema>`;
