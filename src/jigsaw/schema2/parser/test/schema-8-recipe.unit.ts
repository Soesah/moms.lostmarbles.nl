export const schemaRecipe = `<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- moms recipe -->
  <xs:element name="recipe">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="image" minOccurs="0"/>
        <xs:element ref="title"/>
        <xs:element ref="cook" minOccurs="0"/>
        <xs:element ref="servings" minOccurs="0"/>
        <xs:element ref="preparation-time" minOccurs="0"/>
        <xs:element ref="description" minOccurs="0"/>
        <xs:element ref="ingredients" minOccurs="0"/>
        <xs:element ref="preparation" minOccurs="0"/>
        <xs:element ref="notes" minOccurs="0"/>
      </xs:sequence>
      <xs:attribute name="id" type="xs:integer" use="required"/>
      <xs:attribute name="slug" type="xs:string" use="required"/>
      <xs:attribute name="servings" type="xs:string" use="required"/>
      <xs:attribute name="preparation_time" type="xs:string" use="required"/>
      <xs:attribute name="category_id" type="xs:integer" use="required"/>
    </xs:complexType>
  </xs:element>

  <!-- image -->
  <xs:element name="image">
    <xs:complexType>
      <xs:attribute name="source" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>

  <!-- title -->
  <xs:element name="title" type="xs:string"/>

  <!-- cook -->
  <xs:element name="cook" type="xs:string"/>

  <!-- servings -->
  <xs:element name="servings" type="xs:integer"/>

  <!-- preparation-time -->
  <xs:element name="preparation-time" type="xs:integer"/>

  <!-- description -->
  <xs:element name="description" type="block-type"/>

  <!-- ingredients -->
  <xs:element name="ingredients">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="ingredient" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="ingredient">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="name"/>
        <xs:element ref="amount" minOccurs="0"/>
        <xs:element ref="remark" minOccurs="0"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="amount" type="xs:string"/>

  <xs:element name="name" type="xs:string" />

  <xs:element name="remark" type="xs:string" />

  <!-- preparation -->
  <xs:element name="preparation">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="step" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="step" type="text-type"/>

  <!-- notes -->
  <xs:element name="notes">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="note" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="note">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="paragraph" maxOccurs="unbounded"/>
        <xs:element ref="author"/>
      </xs:sequence>
      <xs:attribute ref="top" use="optional"/>
      <xs:attribute ref="left" use="optional"/>
    </xs:complexType>
  </xs:element>

  <!-- cook -->
  <xs:element name="author">
    <xs:complexType>
      <xs:complexContent>
        <xs:extension base="text-type">
          <xs:attribute name="id" type="xs:string" use="optional"/>
        </xs:extension>
      </xs:complexContent>
    </xs:complexType>
  </xs:element>

  <xs:attribute name="top" type="xs:integer"/>

  <xs:attribute name="left" type="xs:integer"/>

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

  <xs:element name="ordered-list" type="list-type" substitutionGroup="block.abstract"/>

  <xs:element name="item" type="text-type"/>

  <!-- inline elements -->
  <xs:element name="emphasis" type="text-type" substitutionGroup="inline.abstract"/>

  <xs:element name="strong" type="text-type" substitutionGroup="inline.abstract"/>

  <xs:element name="underline" type="text-type" substitutionGroup="inline.abstract"/>

  <xs:element name="superscript" type="text-type" substitutionGroup="inline.abstract"/>

</xs:schema>`;

// step[mixed]/emphasis[mixed]/emphasis
