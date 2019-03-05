<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html" encoding="UTF-8" indent="yes" doctype-public=""/>

	<xsl:param name="path"/>
	<xsl:param name="xopus" select="false()"/>
  <xsl:param name="user_name" />
  <xsl:param name="user_level" />
  <xsl:param name="logged-in" />

  <xsl:include href="dates.xsl"/>
  <xsl:include href="recipe.xsl"/>
 	<xsl:include href="../cms/xsl/categories_xsl.php"/>




</xsl:stylesheet>
