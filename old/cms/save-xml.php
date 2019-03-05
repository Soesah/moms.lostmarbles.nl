<?php
	include '../code/website.php';

  Website::XMLHeader();
  Website::CompressHeader();

	$xmlstr = file_get_contents('php://input');

	$dom = new DOMDocument;
  $dom->encoding = "utf-8";
    
  if($dom->loadXML($xmlstr))
  {
    $id = $dom->documentElement->getAttribute("id");
    Moms::addChange($_SESSION["user_id"], $id, "changed");
    echo Moms::saveRecipe($id, $dom);
  }  
  else
    echo "An error occured while saving. The XML was not welformed";

?>
