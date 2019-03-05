<?php
	include '../code/website.php';

  Website::XMLHeader();
  Website::CompressHeader();


  $dom->loadXML("<xml/>");

  if (!Security::isAuthor())
    header("location:../index.php");

	if(isset($_GET['id']))
	{	
		Moms::getRecipe($dom, $_GET['id']);
	}
  
  //only the recipe
  $dom->replaceChild($dom->documentElement->firstChild, $dom->documentElement);
  
  $dom->documentElement->removeAttribute("creation_date");
  $dom->documentElement->removeAttribute("modification_date");
  $dom->documentElement->removeAttribute("language");
  $dom->documentElement->removeAttribute("new");

  $xpath = new DOMXPath($dom);
  $dom->documentElement->removeChild($xpath->query("//recipe/name")->item(0));
  if($xpath->query("//recipe/servings")->item(0))
    $dom->documentElement->removeChild($xpath->query("//recipe/servings")->item(0));
  if($xpath->query("//recipe/preparation-time")->item(0))
    $dom->documentElement->removeChild($xpath->query("//recipe/preparation-time")->item(0));
	echo $dom->saveXML();
?>