<?php
	include '../../code/website.php';

	Website::XMLHeader();
	// Website::CompressHeader();

  if (!Security::isAuthor())
    header("location:../index.php");

	echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:wxsl="http://www.w3schools.com/w3style.xsl">


	<xsl:template match="@category_id">
	  <a href="#" onclick="node.showLookup()">
		<xsl:choose>    
    <?php
      
      $dom = new DOMDocument;
      $dom->loadXML("<root/>");
    	Moms::getCategoryList($dom);
    	$xpath = new DOMXPath($dom);
    	$categories = $xpath->query("//category");
  	  echo "<xsl:when test=\". = 0\">Onbekende Categorie</xsl:when>\n";
    	foreach($categories as $category)
    	  echo "<xsl:when test=\". = ".$category->getAttribute('id')."\">".$category->getAttribute("name_singular")."</xsl:when>\n";

    ?>
		</xsl:choose>
		</a>
	</xsl:template>

</xsl:stylesheet>