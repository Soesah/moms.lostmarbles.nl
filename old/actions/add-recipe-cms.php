<?php

  include '../code/website.php';
 
  Website::TextHeader();
  
  $xmlstr = file_get_contents('php://input');

	$inputdom = new DOMDocument;
  $inputdom->encoding = "utf-8";
    
  $inputdom->loadXML($xmlstr);
  $xpath = new DOMXPath($inputdom);
  $title = $xpath->query("//title")->item(0)->textContent;
	
  $dom = new DOMDocument;
  $dom->load("../cms/template/template.xml");

  $id = Moms::createRecipe($dom, $title);
    
  Moms::addChange($_SESSION["user_id"], $id, "created");
  
  //load document, show editor, and reset the form that sent the request.
  echo "<div id='script'>";
  echo "<span>top.cms.setHash(".$id.")</span>";
  echo "<span>top.cms.showEditor()</span>";
  echo "<span>document.getElementById('add-recipe-form').reset();</span>";
  echo "<span>document.getElementById('add-recipe-form').className = 'add-form hide';</span>";
  echo "</div>";
  
?>