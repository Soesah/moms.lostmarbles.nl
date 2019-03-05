<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <xsl:output method="xml" encoding="utf-8"/>
  
  <xsl:template match="/">
    <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
      <xs:simpleType name="categoryType">
        <xs:restriction base="xs:string">
					<xs:enumeration value="0"/>
          <xsl:apply-templates select="schema/categories/category"/>
        </xs:restriction>
      </xs:simpleType>      
    </xs:schema>
    </xsl:template>

  <xsl:template match="category">
    <xs:enumeration value="{@id}">
      <xsl:comment>
        <xsl:value-of select="@name_singular"/>
      </xsl:comment>
    </xs:enumeration>
  </xsl:template>


</xsl:stylesheet>