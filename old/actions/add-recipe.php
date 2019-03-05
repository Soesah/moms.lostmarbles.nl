<?php

  include '../code/website.php';
 
	Website::TextHeader();
  
  $dom = new DOMDocument;
  $dom->load("../cms/template/template.xml");

  $title = $_POST['title'];
  $id = Moms::createRecipe($dom, $title);
    
  Moms::addChange($_SESSION["user_id"], $id, "created");
  
 header("location:../cms/#".$id);
?>