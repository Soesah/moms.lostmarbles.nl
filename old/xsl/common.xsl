<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="header">
    <header class="page-top">
      <xsl:apply-templates select="node()"/>
    </header>
  </xsl:template>

  <xsl:template match="content">
    <div class="page-middle">
      <xsl:attribute name="class">
        <xsl:text>page-middle </xsl:text>
        <xsl:choose>
          <xsl:when test="(double-column and column) or count(column) = 3">
            <xsl:text>three-columns</xsl:text>
          </xsl:when>
          <xsl:when test="(double-column) or count(column) = 2">
            <xsl:text>two-columns</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>no-columns</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <xsl:apply-templates select="node()"/>
    </div>
  </xsl:template>

  <xsl:template match="footer">
    <footer class="page-bottom">
      <xsl:apply-templates select="node()"/>
    </footer>
  </xsl:template>
  
	<xsl:template match="header/title">
		<h1>
			<xsl:apply-templates select="node()"/>
		</h1>
	</xsl:template>

  <xsl:template match="form/title">
    <h2 class="form-title">
      <xsl:apply-templates select="node()"/>
    </h2>
  </xsl:template>


  <xsl:template match="double-column">
    <div>
      <xsl:call-template name="column-class"/>
      <xsl:apply-templates select="node()"/>
    </div>
  </xsl:template>

  <xsl:template match="column">
    <div>
      <xsl:call-template name="column-class"/>      
      <xsl:apply-templates select="node()"/>
    </div>    
  </xsl:template>

  <xsl:template name="column-class">
    <xsl:attribute name="class">
      <xsl:value-of select="name()"/>
      <xsl:text> </xsl:text>
      <xsl:if test="not(preceding-sibling::column|preceding-sibling::double-column)">
        <xsl:text>first-column</xsl:text>
      </xsl:if>
      <xsl:if test="not(following-sibling::column|following-sibling::double-column)">
        <xsl:text>last-column</xsl:text>
      </xsl:if>
    </xsl:attribute>
  </xsl:template>
  
  <xsl:template match="section">
		<div class="section">
			<xsl:apply-templates select="node()"/>
		</div>
	</xsl:template>
	
	<xsl:template match="section/title">
		<xsl:element name="{concat('h', count(ancestor::section))}">
			<xsl:apply-templates select="node()"/>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="quote">
		<blockquote>
			<xsl:apply-templates select="node()"/>
		</blockquote>
	</xsl:template>
	
	<xsl:template match="paragraph">
		<p>
			<xsl:apply-templates select="node()"/>
		</p>
	</xsl:template>

  <xsl:template match="description">
    <p class="description">
      <xsl:apply-templates select="node()"/>
    </p>
  </xsl:template>

  <xsl:template match="line">
    <p class="subline">
      <xsl:apply-templates select="node()"/>
    </p>
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

  <!-- user -->
  <xsl:template match="user">
    <xsl:choose>
      <xsl:when test="$logged-in">
        <xsl:apply-templates select="." mode="logged-in" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="." mode="log-in-form" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="user" mode="logged-in">
    <nav class="box form user-options">
      <h2>Opties</h2>
      <!--p>
      Welkom <a href="#" onclick="return setClass('changepass','update-password');"><xsl:value-of select="$user_name" /></a>. 
    </p-->
      <ul>
        <xsl:if test="//this-category  and contains($user_level, 'author')">
          <li class="edit-function">
            <a href="{$path}cms/#{//recipe[name]/@id}">Bewerken</a>
          </li>
        </xsl:if>
        <xsl:if test="contains($user_level, 'admin') and //this-category">
          <li>
            <a href="{$path}actions/remove-recipe.php?id={//recipe[name]/@id}" onclick="return confirm('Weet u zeker dat u dit recept wilt verwijderen?');">Recept Verwijderen</a>
          </li>
        </xsl:if>
        <xsl:if test="contains($user_level, 'author')">
          <li class="edit-function"> 
            <a href="#" onclick="setClass('add-recipe-form', 'hide');setFocus('naam');">Nieuw recept</a>
          </li>
        </xsl:if>
        <xsl:if test="//island">
          <li>
            <a href="#" onclick="return top.cms.showCMS();">Ander Recept Bewerken</a>
          </li>
          <li>
            <a href="#" onclick="return top.cms.exitEditorToRecipe();">Terug naar Recept</a>
          </li>
          <li>
            <a href="#" onclick="return top.cms.exitEditor();">Terug naar lijst</a>
          </li>
        </xsl:if>
        <xsl:if test="contains($user_level, 'admin') and not(//this-category) and not(//user-list) and not(//start-xopus) and not(//cms) and not(//island)">
          <li class="edit-function">
            <a href="{$path}?page=users">Gebruikers Beheren</a>
          </li>
        </xsl:if>
        <xsl:if test="//user-list or //this-category">
          <li>
            <a href="{$path}list/">Terug naar lijst</a>
          </li>
        </xsl:if>
				<xsl:if test="ancestor::cms and not(//island)">
        	<li>
          	<a href="#" onclick="return top.cms.showEditor()">Terug naar bewerken</a>
        	</li>
        	<li>
          	<a href="#" onclick="return top.cms.exitEditor()">Stoppen met bewerken</a>
        	</li>
				</xsl:if>
				<xsl:if test="not(//island) and not(ancestor::cms)">
        	<li>
          	<a href="{$path}actions/logout.php">Uitloggen</a>
        	</li>
				</xsl:if>
      </ul>

      <form id="add-recipe-form" class="add-form add-recipe-form hide" method="post">
					<xsl:choose>
						<xsl:when test="//island or ancestor::cms">
							<xsl:attribute name="onsubmit">return comm.sendForm(this, 'new-recipe');</xsl:attribute>
							<xsl:attribute name="action"><xsl:value-of select="$path"/>actions/add-recipe-cms.php</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="onsubmit">return tools.checkForm(this);</xsl:attribute>
							<xsl:attribute name="action"><xsl:value-of select="$path"/>actions/add-recipe.php</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
				
        <h4>Nieuw Recept Maken</h4>
        <p>Vul de naam in en druk op 'Ok'.</p>
        <div class="form-item">
          <label for="title">Naam</label>
          <input type="text" check="true" name="title" id="title" value="" placeholder="(naam)"/>
        </div>
        <div class="form-buttons">
          <button type="submit">Ok</button>
        </div>
      </form>
      <div class="icon icon-ricebowl"/>
      <!-- <img src="{$path}img/icons/ricebowl.png" alt="A bowl of rice" class="icon"/> -->
    </nav>

    <!--div class="box form">
      <form id="changepass" action="actions/update-password.php" class="update-password hide" method="post">
        <h2>Change Password</h2>
        <div class="form-item">
          <label for="password">Password</label>
          <input type="password" name="password" id="focus" value="" placeholder="(password)"/>
        </div>
        <div class="form-item">
          <label for="new-password">New Password</label>
          <input type="password" name="new-password" id="new-password" value="" placeholder="(new password)"/>
        </div>
        <div class="form-buttons">
          <button type="submit">Update</button>
        </div>
      </form>
    </div-->
  </xsl:template>


  <xsl:template match="form[@type = 'note']">
    <form action="{$path}actions/add-note.php?id={//recipe[title]/@id}" class="add-note-form" id="noteform" method="post" onsubmit="return comm.sendForm(this, 'addnote')">
      <xsl:attribute name="class">
        <xsl:text>noteform hide</xsl:text>
        <xsl:if test="not(preceding-sibling::note)">
          <xsl:text> only-note</xsl:text>
        </xsl:if>
      </xsl:attribute>
      <xsl:apply-templates select="node()"/>
      <div class="form-item">
        <label for="notetext">
          <span class="white">
            <xsl:value-of select="$user_name"/>
          </span>
        </label>
        <textarea rows="5" id="notetext" name="note" onfocus="if(this.value = ' ') this.value = '';">
          <xsl:text> </xsl:text>
        </textarea>
      </div>
      <div class="form-buttons">
        <button type="submit">Toevoegen</button>
      </div>
    </form>
    <div id="addnote" class="">
      <xsl:attribute name="class">
        <xsl:text>form-buttons note last-note</xsl:text>
        <xsl:if test="not(preceding-sibling::note)">
          <xsl:text> only-note</xsl:text>
        </xsl:if>
      </xsl:attribute>
      <br/>
      <button type="button" onclick="setClass('noteform', 'hide');setClass('addnote', 'hide');setFocus('notetext')">Notitie maken</button>
    </div>
  </xsl:template>


</xsl:stylesheet>
