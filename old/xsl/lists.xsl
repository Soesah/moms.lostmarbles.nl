<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="categories">
    <section class="box filter categories">
		  <h2>Categori&#235;n</h2>
      <p>
        <xsl:text>Kies een categorie, of sorteer de recepten op </xsl:text>
        <a href="{$path}?select-sort=date">
          <xsl:if test="$sort = 'date'">
            <xsl:attribute name="class">selected</xsl:attribute>
          </xsl:if>
          <xsl:text>datum</xsl:text>
        </a>
        <xsl:text> of </xsl:text>
        <a href="{$path}?select-sort=name">
          <xsl:if test="$sort = 'name'">
            <xsl:attribute name="class">selected</xsl:attribute>
          </xsl:if>
          <xsl:text>naam</xsl:text>
        </a>.</p>
			<xsl:if test="not(ancestor::cms)">
			  <ul>
	        <li>
						<xsl:choose>
			        <xsl:when test="$cat or //results">
			          <a href="{$path}list/">Alle recepten</a>
			        </xsl:when>
							<xsl:otherwise>
								<i>Alle recepten</i>
							</xsl:otherwise>
						</xsl:choose>
	      	</li>
	     	 	<li>
						<xsl:choose>
			        <xsl:when test="$cat != 'new' or //results">
				        <a href="{$path}new/">Meer nieuwe recepten</a>
							</xsl:when>
							<xsl:otherwise>
								<i>Meer nieuwe recepten</i>
							</xsl:otherwise>
						</xsl:choose>
	      	</li>
				</ul>
			</xsl:if>
			<ol>
			  <xsl:apply-templates select="node()">
				  <xsl:sort select="@position" data-type="number" order="ascending"/>
			  </xsl:apply-templates>
		  </ol>
      <div class="icon icon-mushroom"/>
    </section>
	</xsl:template>

	<xsl:template match="category">
		<li>
      <a href="{$path}category/{@slug}">
        <xsl:if test="$cat = @id or $cat = @slug">
          <xsl:attribute name="class">selected</xsl:attribute>
        </xsl:if>
				<xsl:value-of select="@name_plural"/>
			</a>
		</li>
	</xsl:template>
	
	<xsl:template match="this-category">
		<xsl:variable name="category" select="//recipe[title]/@category_id"/>
		<section class="box filter this-category">
			<h2>
				<xsl:value-of select="categories/category[@id = $category]/@name_plural"/>
			</h2>
			<ul>
				<xsl:apply-templates select="recipes/recipe[@category_id = $category]" mode="list">
					<xsl:sort select="name" data-type="text" order="ascending"/>
				</xsl:apply-templates>
			</ul>
      <div class="icon icon-milk"/>
		</section>
	</xsl:template>

  <xsl:template match="results">
    <section class="box">
      <h2>Resultaten</h2>
      <xsl:if test="not(*)">
        <p>Er zijn geen resultaten gevonden bij het zoeken naar '<span class="important"><xsl:value-of select="$search"/></span>'. Pas de zoekterm aan en probeer het opnieuw, of ga terug naar de <a href="?select-cat=false">lijst van categori&#235;n</a>.</p>
      </xsl:if>
      <ol class="items">
        <xsl:apply-templates select="node()" mode="list"/>
      </ol>
      <div class="icon icon-cabbage"/>
    </section>
  </xsl:template>

  <xsl:template match="more-new-recipes">
    <section class="box">
      <h2>Meer nieuwe recepten</h2>
      <ol class="items">
        <xsl:apply-templates select="node()" mode="list"/>
      </ol>
      <div class="icon icon-potatoes"/>
    </section>
  </xsl:template>

  <xsl:template match="new-recipes">
    <section class="box">
      <h2>Nieuwe recepten</h2>
      <ol class="items">
        <xsl:apply-templates select="node()" mode="list"/>
      </ol>
      <p class="rsslink">
        <a href="{$path}rss/new-recipes.php">
          <span class="icon icon-rss"/>
          <span class="rss-text">Volg de nieuwe recepten</span>
        </a>
      </p>
      <div class="icon icon-potatoes"/>
    </section>
  </xsl:template>

  <xsl:template match="recipes">
    <xsl:variable name="cat_id" select="//category[@id = $cat or $cat = @slug]/@id"/>
    <section class="box">
      <xsl:choose>
        <xsl:when test="$cat">
          <h2>
            <xsl:value-of select="//category[@id = $cat or $cat = @slug]/@name_plural"/>
          </h2>
        </xsl:when>
        <xsl:otherwise>
          <h2>Recepten</h2>
        </xsl:otherwise>        
      </xsl:choose>
			<xsl:if test="ancestor::cms">
				<p>Kies een van de recepten om te bewerken.</p>
			</xsl:if>
      <ol>
        <xsl:choose>
          <xsl:when test="$sort = 'name'">
            <xsl:choose>
              <xsl:when test="$cat">
                <xsl:apply-templates select="node()[@category_id = $cat_id]" mode="list">
                  <xsl:sort select="name" order="ascending" data-type="text"/>
                </xsl:apply-templates>
              </xsl:when>
              <xsl:otherwise>
                <xsl:apply-templates select="node()" mode="list">
                  <xsl:sort select="name" order="ascending" data-type="text"/>
                </xsl:apply-templates>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:when test="$sort = 'date'">
            <xsl:choose>
              <xsl:when test="$cat">
                <xsl:apply-templates select="node()[@category_id = $cat_id]" mode="list">
                  <xsl:sort select="@modification_date" order="ascending" data-type="text"/>
                </xsl:apply-templates>
              </xsl:when>
              <xsl:otherwise>
                <xsl:apply-templates select="node()" mode="list">
                  <xsl:sort select="@modification_date" order="ascending" data-type="text"/>
                </xsl:apply-templates>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
        </xsl:choose>
      </ol>
      <div class="icon icon-broccoli"/>
    </section>
	</xsl:template>
	
	<xsl:template match="recipe" mode="list">
		<li class="recipe-item">
      <xsl:choose>
        <xsl:when test="$logged-in and ancestor::cms">
					<a href="load-xml.php?id={@id}" onclick="top.cms.setHash({@id});return top.cms.showEditor();">
            <xsl:value-of select="name"/>
          </a>
				</xsl:when>
        <xsl:when test="$logged-in and not(ancestor::results) and not(ancestor::new-recipes) and not(ancestor::more-new-recipes)">
					<xsl:choose>
						<xsl:when test="@id = //recipe[not(ancestor::more-new-recipes) and not(ancestor::new-recipes) and title]/@id">
		          <i>
		            <xsl:value-of select="name"/>
		          </i>
						</xsl:when>
						<xsl:otherwise>
							<a href="{$path}recipe/{@slug}">
		            <xsl:value-of select="name"/>
		          </a>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:if test="@new = '1'">
            <span title="Nieuw!" class="icon icon-star"/>
					</xsl:if>
          <xsl:if test="$sort = 'date'">
            <xsl:text> - </xsl:text>
            <xsl:apply-templates select="@creation_date"/>
          </xsl:if>
        </xsl:when>
        <xsl:otherwise>
          <xsl:attribute name="class">
            <xsl:text>item </xsl:text>
            <xsl:if test="position() = 1">first-item</xsl:if>
            <xsl:if test="position() = last()">last-item</xsl:if>
          </xsl:attribute>
          <h4>
            <xsl:choose>
              <xsl:when test="(ancestor::results or ancestor::new-recipes or ancestor::more-new-recipes ) and $logged-in">
                <a href="{$path}recipe/{@slug}">
                  <xsl:value-of select="name"/>
                </a>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="name"/>
              </xsl:otherwise>
            </xsl:choose>
          </h4>
          <p>
            <xsl:text>Een </xsl:text>
						<xsl:choose>
							<xsl:when test="$logged-in">
								<a href="{$path}category/{@category_slug}" class="category">
		              <xsl:value-of select="@category_name"/>
		            </a>
							</xsl:when>
							<xsl:otherwise>
								<span class="category">
		              <xsl:value-of select="@category_name"/>
		            </span>
							</xsl:otherwise>
						</xsl:choose>
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
            <xsl:apply-templates select="@creation_date"/>
          </p>
        </xsl:otherwise>
      </xsl:choose>
		</li>
	</xsl:template>
	
	<xsl:template match="pagelist">
		<xsl:apply-templates select="//pages"/>
	</xsl:template>
	
	<xsl:template match="pages">
			<h4>Pages</h4>
			<ul>
				<xsl:apply-templates select="node()" mode="list">
					<xsl:sort select="title" data-type="text" order="ascending"/>
				</xsl:apply-templates>
			</ul>
	</xsl:template>

	<xsl:template match="page" mode="list">
		<li>
			<a href="{$path}edit.php?id={@id}">
				<xsl:value-of select="@title"/>
			</a>
		</li>
	</xsl:template>

  <xsl:template match="changelog[@type='small']">
    <section class="box filter changes-small">
      <h2>Wijzigingen</h2>
      <p>
        <xsl:text>De </xsl:text> 
				<xsl:choose>
					<xsl:when test="$logged-in">
						<a href="{$path}recipe/{change/@slug}">laatste wijziging</a>
					</xsl:when>
					<xsl:otherwise>laatste wijziging</xsl:otherwise>
				</xsl:choose>
 				<xsl:text> was </xsl:text>
				<xsl:apply-templates select="change/@date" mode="nicedate"/>
      </p>
      <div class="icon icon-icecream"/>
    </section>
  </xsl:template>

  <xsl:template match="changelog[@type='recipe']">
    <xsl:if test="change">
      <section class="box filter changes-big">
        <h2>Wijzigingen</h2>
        <ol>
          <xsl:apply-templates select="node()"/>
        </ol>
        <div class="icon icon-icecream"/>
      </section>
    </xsl:if>
  </xsl:template>

  <xsl:template match="change">
    <li>
      <xsl:apply-templates select="@date" mode="nicedate"/>
      <br/>
      <xsl:value-of select="@user_name"/>
      <xsl:apply-templates select="@type" mode="change-text-1"/>
      <xsl:value-of select="@recipe_name"/>
      <xsl:apply-templates select="@type" mode="change-text-2"/>
    </li>
  </xsl:template>

  <xsl:template match="@type" mode="change-text-1">
    <xsl:choose>
      <xsl:when test=". = 'changed'">
        <xsl:text> heeft wijzigen gemaakt aan </xsl:text>
      </xsl:when>
      <xsl:when test=". = 'created'">
        <xsl:text> heeft een nieuw recept voor </xsl:text>
      </xsl:when>
      <xsl:when test=". = 'add note'">
        <xsl:text> heeft een notitie toegevoegd bij </xsl:text>
      </xsl:when>
    </xsl:choose>
  </xsl:template>
  
    <xsl:template match="@type" mode="change-text-2">
      <xsl:choose>
        <xsl:when test=". = 'changed'">
          <xsl:text>.</xsl:text>
        </xsl:when>
        <xsl:when test=". = 'created'">
          <xsl:text> aangemaakt. </xsl:text>
        </xsl:when>
        <xsl:when test=". = 'add note'">
          <xsl:text>.</xsl:text>
        </xsl:when>
      </xsl:choose>
  </xsl:template>
  
</xsl:stylesheet>
