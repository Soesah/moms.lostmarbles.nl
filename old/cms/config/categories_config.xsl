<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:x="http://www.xopus.com/xmlns/config">

  <xsl:output method="xml" encoding="utf-8"/>

  <xsl:template match="/">
    <x:config version="1.0" xmlns:x="http://www.xopus.com/xmlns/config">

      <x:nodeConfig>
        <x:node match="@category_id">
					<x:enumeration value="0">
			      <x:name>Onbekende categorie</x:name>
			    </x:enumeration>
          <xsl:apply-templates select="config/categories/category"/>
        </x:node>
      </x:nodeConfig>


    </x:config>
  </xsl:template>

  <xsl:template match="category">
    <x:enumeration value="{@id}">
      <x:name>
        <xsl:value-of select="@name_singular"/>
      </x:name>
    </x:enumeration>
  </xsl:template>



</xsl:stylesheet>