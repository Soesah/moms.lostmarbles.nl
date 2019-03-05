<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="xml"/>
  <xsl:param name="path"/>

  <xsl:include href="recipe.xsl"/>

  <xsl:template match="/recipe">
    <xsl:apply-templates select="notes"/>
  </xsl:template>

</xsl:stylesheet>
