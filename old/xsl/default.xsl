<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html" encoding="UTF-8" indent="yes" doctype-public=""/>

  <xsl:param name="browser" select="''"/>
  <xsl:param name="platform" select="''"/>
  <xsl:param name="os" select="''"/>
  <xsl:param name="path" select="'/'"/>
	<xsl:param name="version" select="1"/>

  <xsl:param name="logged-in" select="false()"/>
  <xsl:param name="log-in-name" select="''"/>
  <xsl:param name="user_name" />
  <xsl:param name="user_level" />
  <xsl:param name="today" />
  <xsl:param name="id" />
  <xsl:param name="search" select="''" />
  <xsl:param name="request" select="''" />
  <xsl:param name="sort" select="'name'" />
  <xsl:param name="cat" select="false()" />
  <xsl:param name="xopus" select="false()" />
  <xsl:param name="error" select="''"/>

	<xsl:include href="dates.xsl"/>
  <xsl:include href="recipe.xsl"/>
	<xsl:include href="lists.xsl"/>
	
	<xsl:template match="/moms-recipes">
    <html lang="nl">
    <head>
      <title>
				<xsl:choose>
					<xsl:when test="//recipe/name and //this-category">
						<xsl:value-of select="//recipe/name"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="page/@title"/>
					</xsl:otherwise>
				</xsl:choose>
        <xsl:text> - </xsl:text>
        <xsl:value-of select="page/header/title"/>
      </title>
      <link href="{$path}css/moms-style-{$version}.css" rel="stylesheet" type="text/css" />
      <link href="http://fonts.googleapis.com/css?family=Carme" rel="stylesheet" type="text/css"/>
			<link rel="shortcut icon" href="{$path}css/favicon.ico" type="image/x-icon"/>
      <link rel="alternate" type="application/rss+xml"  href="rss/new-recipes.php" title="New Recipes from Mom's Lost Marbles"/>
      <meta name="viewport" content="width=device-width"/>
      <meta name="description" content="Recipes from mom and others"/>
      <meta name="keywords" content="recipes"/>
      <meta name="google-site-verification" content="5lB6klw9_fC88-0i9KQwcRWzaX4ut1nAnMmm9Av65jI" />
    </head>
    <body onload="defaultFocus()">
      <xsl:attribute name="class">
        <xsl:if test="$search != ''">
          <xsl:text> showing-results</xsl:text>
        </xsl:if>
        <xsl:if test="$logged-in">
          <xsl:text> logged-in</xsl:text>
        </xsl:if>
      </xsl:attribute>
      
			<xsl:apply-templates select="page|//start-xopus"/>
      
			<xsl:call-template name="script"/>
    </body>
    </html>
  </xsl:template>

  <xsl:template match="page">
		<div class="page">
			<xsl:apply-templates select="header|content|footer|sidebar"/>
    </div>
	</xsl:template>
	
  <xsl:template name="script">
		<script src="{$path}js/moms-script-{$version}.js" type="text/javascript" async="" defer=""> </script>
  </xsl:template>

  <!-- forms -->
  
  <xsl:template match="form[@type = 'login']">
    <section class="box form">
      <form action="{$path}actions/login.php" method="post">
				<xsl:apply-templates select="node()"/>
        <xsl:call-template name="error"/>
        <input type="hidden" name="id" value="{$id}"/>
        <input type="hidden" name="request" value="{$request}"/>
        <div class="form-item">
          <label for="focus">Naam</label>
          <input type="text" name="user-name" id="focus" value="{$log-in-name}" placeholder="(naam)"/>
        </div>
        <div class="form-item">
          <label for="remember">Onthouden</label>
          <input type="checkbox" id="remember" name="remember" value="remember" class="checkbox">
            <xsl:if test="$log-in-name != ''">
              <xsl:attribute name="checked">true</xsl:attribute>
            </xsl:if>
          </input>
        </div>
        <div class="form-buttons">
          <button type="submit">Inloggen</button>
        </div>
        <p class="description">Deze website gaat over en gebruikt <i>cookies</i>. Door 'onthouden' aan te vinken stopt u uw hand in de koekjestrommel.</p>
      </form>
      <div class="icon icon-melon"/>
    </section>    
  </xsl:template>

  <xsl:template match="form[@type = 'search']">
    <section class="box form search">
      <form action="{$path}search/" method="GET" onsubmit="document.location.href = '{$path}search/' + this.search.value;return false;">
        <xsl:apply-templates select="node()"/>
        <xsl:call-template name="error"/>
        <div class="form-item">
          <label for="focus">Zoekwaarde</label>
          <input type="text" name="search" id="focus" value="{$search}" placeholder="(zoekwaarde)"/>
        </div>
        <div class="form-buttons">
          <button type="submit">Zoeken</button>
        </div>
      </form>
      <div class="icon icon-bananas"/>
    </section>
  </xsl:template>


  <xsl:template match="form[@type = 'users']">
    <div class="box form users">
      <form action="actions/update-users.php" method="post">
        <xsl:apply-templates select="node()"/>
        <xsl:call-template name="error"/>
        <input type="hidden" id="add_user" name="add_user" value="false"/>
        <div class="form-item">
          <label></label>
          <input type="checkbox" id="add_user_check" class="checkbox" onclick="changeField('add_user', this.checked);"/>
          <label class="wide" for="add_user_check">Gebruiker toevoegen</label>
        </div>
        <div class="form-buttons">
          <button type="submit">Wijzigen</button>
        </div>
      </form>
      <div class="icon icon-pineapple"/>
    </div>
  </xsl:template>

  <xsl:template match="user-list">
    <div class="form-item">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td valign="top" rowspan="{count(user-item) +1 }" width="100">
            <label>Gebruikers</label>
          </td>
          <th>Naam</th>
          <th>Email</th>
          <th>Level</th>
          <th>Laatste Inlog Datum</th>
          <th></th>
        </tr>
        <xsl:apply-templates select="user-item"/>
      </table>
    </div>
  </xsl:template>

  <xsl:template match="user-item">
    <tr id="user_{@id}">      
      <td>
        <input type="hidden" name="user_{@id}_id" value="{@id}"/>
        <input type="hidden" id="user_{@id}_changed" name="user_{@id}_changed" value="false"/>
        <input type="text" name="user_{@id}_name" onblur="if(this.value != this.orivalue) changeField('user_{@id}_changed', true);"  orivalue="{name}" value="{name}"/>
      </td>
      <td>
        <input type="text" name="user_{@id}_email" onblur="if(this.value != this.orivalue) changeField('user_{@id}_changed', true);"  orivalue="{@email}" value="{@email}"/>
      </td>
      <td>
        <select name="user_{@id}_level" onchange="changeField('user_{@id}_changed', true);">
          <option value="0">
            <xsl:if test="@user_level = 0">
              <xsl:attribute name="selected">true</xsl:attribute>
            </xsl:if>
            <xsl:text>User</xsl:text>
          </option>
          <option value="50">
            <xsl:if test="@user_level = 50">
              <xsl:attribute name="selected">true</xsl:attribute>
            </xsl:if>
            <xsl:text>Author</xsl:text>
          </option>
          <option value="100">
            <xsl:if test="@user_level = 100">
              <xsl:attribute name="selected">true</xsl:attribute>
            </xsl:if>
            <xsl:text>Admin</xsl:text>
          </option>
        </select>        
      </td>
      <td>
        &#160;
        <xsl:if test="@last_login_date != ''">
          <xsl:apply-templates select="@last_login_date" mode="simple-nicedate"/>
        </xsl:if>
      </td>
      <td>
        <a href="#" class="user-delete-link" onclick="changeField('user_{@id}_changed', 'delete'); this.className = 'hide'; document.getElementById('user_{@id}').className = 'delete';return false;">
          <span class="icon icon-delete" title="Gebruiker verwijderen"/>
        </a>
      </td>
    </tr>
  </xsl:template>

  <xsl:template name="error">
    <xsl:if test="$error != ''">
      <p id="error" class="error">
        <xsl:value-of select="$error" />
      </p>
      <script type="text/javascript">
        if (window.addEventListener) //Mozilla, etc.
        window.addEventListener("load",function(){window.setTimeout("var e = document.getElementById('error'); e.parentNode.removeChild(e);", 4000);},false);
        else if (window.attachEvent) //IE
        window.attachEvent("onload",function(){window.setTimeout("var e = document.getElementById('error'); e.parentNode.removeChild(e);", 4000);});
      </script>
    </xsl:if>
  </xsl:template>



</xsl:stylesheet>
