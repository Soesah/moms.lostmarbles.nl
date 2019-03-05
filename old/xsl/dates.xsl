<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="@creation_date|@modification_date|@start_date|@end_date">
    <span class="date">
      <xsl:apply-templates select="." mode="nicedate" />
    </span>
  </xsl:template>

  <xsl:template match="*|@*" mode="nicedate" >
    <xsl:param name="day" select="substring-before(substring-after(substring-after(., '-'), '-'), ' ')" />
    <xsl:param name="month" select="substring-before(substring-after(., '-'), '-')" />
    <xsl:param name="year" select="substring-before(., '-')" />
      <xsl:call-template name="weekday">
        <xsl:with-param name="day" select="$day" />
        <xsl:with-param name="month" select="$month" />
        <xsl:with-param name="year" select="$year" />
      </xsl:call-template>
      <xsl:text> </xsl:text>
      <xsl:value-of select="number($day)" />
      <!--xsl:call-template name="daystring">
        <xsl:with-param name="d" select="$day" />
      </xsl:call-template-->
      <xsl:text> </xsl:text>
      <xsl:call-template name="month">
        <xsl:with-param name="m" select="$month" />
      </xsl:call-template>
      <xsl:text> </xsl:text>
      <xsl:value-of select="$year" />
  </xsl:template>

  <xsl:template match="*|@*" mode="simple-nicedate" >
    <xsl:param name="day" select="substring-before(substring-after(substring-after(., '-'), '-'), ' ')" />
    <xsl:param name="month" select="substring-before(substring-after(., '-'), '-')" />
    <xsl:param name="year" select="substring-before(., '-')" />
    <xsl:value-of select="number($day)" />
    <xsl:text> </xsl:text>
    <xsl:call-template name="month">
      <xsl:with-param name="m" select="$month" />
    </xsl:call-template>
    <xsl:text> </xsl:text>
    <xsl:value-of select="$year" />
  </xsl:template>


  <!-- dates -->
  <xsl:template name="daystring">
    <xsl:param name="d" />
    <sup>
      <xsl:choose>
        <xsl:when test="$d = '01' or $d = '1' or $d = '21' or $d = '31'">st</xsl:when>
        <xsl:when test="$d = '02' or $d = '2' or $d = '22'">nd</xsl:when>
        <xsl:when test="$d = '03' or $d = '3' or $d = '23'">rd</xsl:when>
        <xsl:otherwise >th</xsl:otherwise>
      </xsl:choose>
    </sup>
  </xsl:template>

  <xsl:template name="month">
    <xsl:param name="m" />
    <xsl:choose>
      <xsl:when test="$m = '1' or $m = '01'">januari</xsl:when>
      <xsl:when test="$m = '2' or $m = '02'">februari</xsl:when>
      <xsl:when test="$m = '3' or $m = '03'">maart</xsl:when>
      <xsl:when test="$m = '4' or $m = '04'">april</xsl:when>
      <xsl:when test="$m = '5' or $m = '05'">mei</xsl:when>
      <xsl:when test="$m = '6' or $m = '06'">juni</xsl:when>
      <xsl:when test="$m = '7' or $m = '07'">juli</xsl:when>
      <xsl:when test="$m = '8' or $m = '08'">augustus</xsl:when>
      <xsl:when test="$m = '9' or $m = '09'">september</xsl:when>
      <xsl:when test="$m = '10' or $m = '10'">oktober</xsl:when>
      <xsl:when test="$m = '11' or $m = '11'">november</xsl:when>
      <xsl:when test="$m = '12' or $m = '12'">december</xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="weekday">
    <xsl:param name="year" />
    <xsl:param name="month" />
    <xsl:param name="day" />
    <xsl:variable name="a" select="floor((14 - $month) div 12)" />
    <xsl:variable name="y" select="$year - $a" />
    <xsl:variable name="m" select="$month + 12 * $a - 2" />
    <xsl:variable name="weekday" select="($day + $y + floor($y div 4) - floor($y div 100) + floor($y div 400) + floor((31 * $m) div 12)) mod 7" />
    <xsl:choose>
      <xsl:when test="$weekday=0">zondag</xsl:when>
      <xsl:when test="$weekday=1">maandag</xsl:when>
      <xsl:when test="$weekday=2">dinsdag</xsl:when>
      <xsl:when test="$weekday=3">woensdag</xsl:when>
      <xsl:when test="$weekday=4">donderdag</xsl:when>
      <xsl:when test="$weekday=5">vrijdag</xsl:when>
      <xsl:when test="$weekday=6">zaterdag</xsl:when>
      <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="leadingzero">
    <xsl:param name="v"/>
    <xsl:if test="number($v) &lt; 10">0</xsl:if>
    <xsl:value-of select="$v"/>
  </xsl:template>

</xsl:stylesheet>



