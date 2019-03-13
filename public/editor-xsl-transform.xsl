<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:editor="https://does-not-matter-right-now/editor">

  <xsl:output method="xml" indent="no"/>

  <xsl:template match="node()[parent::xsl:template and not(self::xsl:apply-templates or self::xsl:text)]">
    <xsl:copy>
      <xsl:apply-templates select="@*|xsl:attribute"/>
      <xsl:element name="xsl:processing-instruction" namespace="http://www.w3.org/1999/XSL/Transform">
        <xsl:attribute name="name">editor-id</xsl:attribute>
        <xsl:element name="xsl:apply-templates" namespace="http://www.w3.org/1999/XSL/Transform">
          <xsl:attribute name="select">@editor:node-id</xsl:attribute>
        </xsl:element>
      </xsl:element>
      <xsl:apply-templates select="node()[not(self::xsl:attribute)]"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="xsl:stylesheet" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:element name="xsl:stylesheet" namespace="http://www.w3.org/1999/XSL/Transform">
      <!-- <xsl:attribute name="test">test</xsl:attribute> -->
      <xsl:attribute name="editor:editor" namespace="https://does-not-matter-right-now/editor">https://does-not-matter-right-now/editor</xsl:attribute>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates select="node()"/>
    </xsl:element>
  </xsl:template>


  <xsl:template match="xsl:*" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:element name="xsl:{local-name()}" namespace="http://www.w3.org/1999/XSL/Transform">
      <xsl:apply-templates select="@*|node()"/>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
