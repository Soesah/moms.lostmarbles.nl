<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-public=""/>

  <xsl:param name="path" select="'/'"/>

  <xsl:param name="logged-in" select="false()"/>
  <xsl:param name="log-in-name" select="''"/>
  <xsl:param name="user_name" />
  <xsl:param name="user_level" />
  <xsl:param name="today" />
  <xsl:param name="version" select="1" />
  <xsl:param name="search" select="''" />
  <xsl:param name="sort" select="'name'" />
  <xsl:param name="cat" select="false()" />
  <xsl:param name="error" select="''"/>

  <xsl:include href="dates.xsl"/>
  <xsl:include href="recipe.xsl"/>
  <xsl:include href="lists.xsl"/>

  <xsl:template match="cms">
    <html>
      <head>
        <title>
          <xsl:value-of select="page/@title"/>
          <xsl:text> -  Mom's Lost Marbles</xsl:text>
        </title>
        <link rel="stylesheet" href="{$path}css/moms-cms-{$version}.css" type="text/css" />
        <link rel="shortcut icon" href="{$path}css/favicon.ico" type="image/x-icon"/>
      </head>
      <body onload="defaultFocus();cms.init();">
        <xsl:attribute name="class">
					<xsl:text>edit </xsl:text>
          <xsl:if test="$logged-in">
            <xsl:text> logged-in</xsl:text>
          </xsl:if>
        </xsl:attribute>

        <xsl:apply-templates select="node()"/>

        <xsl:call-template name="script"/>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="page/name"/>

  <xsl:template match="content-frame">
    <iframe src="recipes.php" class="content-frame" frameborder="0"/>
  </xsl:template>

  <xsl:template match="editor-frame">
    <iframe src="island.php" class="editor-frame" frameborder="0"/>
  </xsl:template>

  <xsl:template name="script">
    <script src="{$path}js/moms-cms-{$version}.js" type="text/javascript">&#160;</script>
  </xsl:template>

  <!-- island -->

  <xsl:template match="island">
    <html>
      <head>
        <title>
          <xsl:value-of select="page/@title"/>
          <xsl:text> -  Mom's Lost Marbles</xsl:text>
        </title>
        <link rel="stylesheet" href="{$path}css/moms-cms-{$version}.css" type="text/css" />
      </head>
      <body>
        <xsl:attribute name="class">
          <xsl:text>cms-island</xsl:text>
          <xsl:if test="$logged-in">
            <xsl:text> logged-in</xsl:text>
          </xsl:if>
        </xsl:attribute>

        <div class="page">
          <xsl:apply-templates select="node()"/>
        </div>

        <xsl:call-template name="script"/>
        <script src="xopus/xopus.js?theme=xopus" type="text/javascript">&#160;</script>
      </body>
    </html>
  </xsl:template>


  <xsl:template match="edit-recipe">

    <!-- The Xopus Canvas -->
    <div xopus="true" autostart="true">
      <xml>
        <x:config version="1.0" xmlns:x="http://www.xopus.com/xmlns/config">

          <x:javascript src="config/api.js"/>
          <x:import src="config/config.xml"/>

          <x:pipeline xml="dummy.xml" xsd="xsd/recipe.xsd">
            <x:view name="WYSIWYG View">
              <x:transform xsl="../xsl/edit.xsl">
                <x:param name="path">
                  <xsl:value-of select="$path"/>
                </x:param>
              </x:transform>
            </x:view>

            <x:view name="XML View">
              <x:treeTransform/>
            </x:view>
          </x:pipeline>
        </x:config>
      </xml>
    </div>
  </xsl:template>




</xsl:stylesheet>
