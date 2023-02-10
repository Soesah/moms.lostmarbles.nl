export const schemaNamelessElement = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:sequence>
        <xs:element type="xs:string"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

</xs:schema>`;

export const schemaNoTypeElement = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc"/>

</xs:schema>`;

export const schemaEmptyComplexType = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType/>
  </xs:element>

</xs:schema>`;

export const schemaNamelessAttribute = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:attribute />
    </xs:complexType>
  </xs:element>

</xs:schema>`;

export const schemaNoTypeAttribute = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:attribute name="test" />
    </xs:complexType>
  </xs:element>

</xs:schema>`;

export const schemaNoCustomTypeAttribute = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="doc">
    <xs:complexType>
      <xs:attribute name="test" type="test" />
    </xs:complexType>
  </xs:element>

</xs:schema>`;
