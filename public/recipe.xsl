<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:editor="editor.id">

  <xsl:template match="recipe">
		<article class="box recipe">
			<xsl:apply-templates select="title"/>
			<article class="recipe-body">
				<xsl:apply-templates select="." mode="summary"/>
				<xsl:apply-templates select="*[not(self::title) and not(self::notes)]"/>
			</article>
      <xsl:if test="@new = 1">
      	<div class="icon icon-star-large"/>
      </xsl:if>
      <div class="icon icon-bowl2"/>
		</article>
		<xsl:apply-templates select="notes"/>
	</xsl:template>

	<xsl:template match="recipe/name"/>

	<xsl:template match="recipe/title">
		<h2>
			<xsl:apply-templates select="node()"/>
		</h2>
	</xsl:template>

	<xsl:template match="recipe" mode="summary">
		<section class="summary" category="{@category_id}">
      <div class="servings">
        <div class="icon icon-person"/>
        <xsl:value-of select="@servings"/>
        <xsl:if test="@servings != ''">
          <xsl:choose>
            <xsl:when test="@servings = 1"> Persoon</xsl:when>
            <xsl:otherwise> Personen</xsl:otherwise>
          </xsl:choose>
        </xsl:if>
      </div>
      <div class="preparation-time">
        <div class="icon icon-clock"/>
        <xsl:value-of select="@preparation_time"/>
      </div>
		</section>
		<p class="summary-text">
			<xsl:apply-templates select="@category_id" mode="text"/>
			<xsl:apply-templates select="cook" mode="text"/>
			<xsl:if test="@servings != 0">
		    <xsl:text> voor </xsl:text>
		    <xsl:value-of select="@servings"/>
		    <xsl:choose>
		      <xsl:when test="@servings = 1">
		        <xsl:text> persoon</xsl:text>
		      </xsl:when>
		      <xsl:otherwise>
		        <xsl:text> personen</xsl:text>
		      </xsl:otherwise>
		    </xsl:choose>
			</xsl:if>
			<xsl:text>. </xsl:text>
			<xsl:if test="@creation_date">
		    <xsl:text>Toegevoegd op </xsl:text>
		    <xsl:apply-templates select="@creation_date"/>
				<xsl:text>. </xsl:text>
			</xsl:if>
			<xsl:if test="@preparation_time != ''">
				<xsl:text>De bereidingstijd bedraagt </xsl:text>
				<xsl:value-of select="@preparation_time"/>
				<xsl:text>. </xsl:text>
			</xsl:if>
	  </p>
	</xsl:template>

	<xsl:template match="@category_id" mode="text">
		<span>
			<xsl:text>Een </xsl:text>
      <xsl:apply-templates select="."/>
		</span>
	</xsl:template>

	<xsl:template match="cook|servings|preparation-time"/>

	<xsl:template match="cook" mode="text">
		<span>
      <xsl:text> van </xsl:text>
      <xsl:apply-templates select="node()"/>
		</span>
	</xsl:template>

	<xsl:template match="ingredients">
		<h4>Ingredi&#235;nten</h4>
		<ul>
			<xsl:apply-templates select="node()"/>
		</ul>
	</xsl:template>

	<xsl:template match="ingredient">
		<li class="ingredient">
			<xsl:apply-templates select="amount"/>
			<xsl:apply-templates select="name"/>
			<xsl:apply-templates select="remark"/>
		</li>
	</xsl:template>

	<xsl:template match="ingredient/amount">
		<span class="{name()}">
			<xsl:apply-templates select="node()"/>
		</span>
		<xsl:text> </xsl:text>
	</xsl:template>

	<xsl:template match="ingredient/name">
		<span class="{name()}">
			<xsl:apply-templates select="node()"/>
		</span>
		<xsl:if test="following-sibling::remark">
			<xsl:text>, </xsl:text>
		</xsl:if>
	</xsl:template>

	<xsl:template match="ingredient/remark">
		<span class="{name()}">
			<xsl:apply-templates select="node()"/>
		</span>
	</xsl:template>

	<xsl:template match="preparation">
		<h4>Bereidingswijze</h4>
		<ol>
			<xsl:apply-templates select="node()"/>
		</ol>
	</xsl:template>

	<xsl:template match="step">
		<li>
			<xsl:attribute name="class">
        <xsl:text>step </xsl:text>
        <xsl:if test="count(preceding-sibling::step) mod 2 = 1">uneven</xsl:if>
        <xsl:if test="not(preceding-sibling::step)"> first-step</xsl:if>
        <xsl:if test="not(following-sibling::step)"> last-step</xsl:if>
      </xsl:attribute>
 			<xsl:apply-templates select="node()"/>
		</li>
	</xsl:template>

	<xsl:template match="image">
		<img class="image" src="img/recipe_large/{@source}" alt="{@source}"/>
	</xsl:template>

	<xsl:template match="notes">
		<section id="notes">
      <xsl:attribute name="class">
        <xsl:text>box form notes-box </xsl:text>
        <xsl:if test="not(note)">no-notes</xsl:if>
      </xsl:attribute>
			<h3>Notities</h3>
			<xsl:apply-templates select="node()"/>
			<div class="icon icon-beans"/>
		</section>
	</xsl:template>

	<xsl:template match="note">
		<section>
			<xsl:attribute name="class">
        <xsl:text>note </xsl:text>
        <xsl:if test="not(preceding-sibling::note)">first-note</xsl:if>
        <xsl:if test="not(following-sibling::*)"> last-note</xsl:if>
      </xsl:attribute>
			<xsl:apply-templates select="author"/>
			<xsl:apply-templates select="node()[not(self::author)]"/>
		</section>
	</xsl:template>

	<xsl:template match="author">
		<div class="author">
			<xsl:apply-templates select="node()"/>
		</div>
	</xsl:template>

	<xsl:template match="paragraph">
		<p>
			<xsl:apply-templates select="node()"/>
		</p>
	</xsl:template>

  <xsl:template match="description">
    <section class="description">
      <xsl:apply-templates select="node()"/>
    </section>
  </xsl:template>

  <xsl:template match="ordered-list">
		<ol>
			<xsl:apply-templates select="node()"/>
		</ol>
	</xsl:template>

  <xsl:template match="list">
		<ul>
			<xsl:apply-templates select="node()"/>
		</ul>
	</xsl:template>

	<xsl:template match="item">
		<li>
			<xsl:apply-templates select="node()"/>
		</li>
	</xsl:template>

	<!-- inline -->

	<xsl:template match="strong">
		<b>
			<xsl:apply-templates select="node()"/>
		</b>
	</xsl:template>

	<xsl:template match="italic">
		<i>
			<xsl:apply-templates select="node()"/>
		</i>
	</xsl:template>

	<xsl:template match="underline">
		<u>
			<xsl:apply-templates select="node()"/>
		</u>
	</xsl:template>

	<xsl:template match="link">
		<a href="{@href}">
			<xsl:apply-templates select="node()"/>
		</a>
	</xsl:template>
</xsl:stylesheet>
