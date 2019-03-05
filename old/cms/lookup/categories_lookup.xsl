<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:x="http://www.xopus.com/xmlns/config">

	<xsl:output method="html" encoding="UTF-8" indent="yes" doctype-public=""/>

	<xsl:param name="path"/>
	<xsl:param name="version"/>

  <xsl:template match="/">
		<html lang="nl">
			<head>
				<meta charset="utf-8"/>
	      <link rel="stylesheet" href="{$path}css/moms-cms-{$version}.css" type="text/css" />
	      <link href="http://fonts.googleapis.com/css?family=Carme" rel="stylesheet" type="text/css"/>
				<link rel="shortcut icon" href="{$path}css/favicon.ico" type="image/x-icon"/>				
			</head>
			<body onload="top.resizeTo(300, 480);">
				<div class="lookup">
					<div class="box form">
						<h2>Kies een categorie</h2>
						<xsl:apply-templates select="lookup/categories/category"/>
					</div>
				</div>
			</body>
 		</html>
  </xsl:template>

	<xsl:template match="category">
		<button type="button" onclick="top.choose({@id});">
			<xsl:value-of select="@name_singular"/>
		</button>
	</xsl:template>

</xsl:stylesheet>