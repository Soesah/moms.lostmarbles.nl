<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:include href="dates.xsl"/>
  
  <xsl:template match="/">
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>New Recipes from Mom's Lost Marbles</title>
        <link>http://moms.lostmarbles.nl/</link>
        <description>These are the last 10 new recipes from Mom's Lost Marbles</description>
        <lastBuildDate>
          <xsl:value-of select="//change-date/text()"/>
        </lastBuildDate>
        <language>en-us</language>
        <atom:link href="http://moms.lostmarbles.nl/rss/new-recipes.php" rel="self" type="application/rss+xml" />
        <xsl:apply-templates select="//recipe"/>
      </channel>
    </rss>
  </xsl:template>

  <xsl:template match="recipe">
    <item>
      <title>
        <xsl:value-of select="name"/>
      </title>
      <link>http://moms.lostmarbles.nl/recipe/<xsl:value-of select="@slug"/></link>
      <guid>http://moms.lostmarbles.nl/recipe/<xsl:value-of select="@slug"/></guid>
      <pubDate><xsl:value-of select="@rss_date"/></pubDate>
      <description>
        <xsl:text>Een </xsl:text>
        <xsl:value-of select="@category_name"/>
        <xsl:if test=".//cook and .//cook/text() != ''">
          <xsl:text> van </xsl:text>
          <xsl:value-of select=".//cook"/>
        </xsl:if>
        <xsl:text> voor </xsl:text>
        <xsl:value-of select="@servings"/>
        <xsl:choose>
          <xsl:when test="@servings = 1">
            <xsl:text> persoon. </xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text> personen. </xsl:text>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:text>Toegevoegd op </xsl:text>
        <xsl:apply-templates select="@creation_date" mode="nicedate"/>
        <xsl:text>. </xsl:text>
        <xsl:if test="@preparation_time != ''">
          <xsl:text>De bereidingstijd bedraagt </xsl:text>
          <xsl:value-of select="@preparation_time"/>
          <xsl:text>. </xsl:text>
        </xsl:if>
      </description>
    </item>
  </xsl:template>

</xsl:stylesheet>
