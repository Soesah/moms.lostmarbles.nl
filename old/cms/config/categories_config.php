<?php
	include '../../code/website.php';

	// Website::CompressHeader();
	Website::XMLHeader();

  $dom->loadXML("<config/>");

  if (!Security::isAuthor())	
    header("location:../index.php");
	
	Moms::getCategoryList($dom);
  	
	echo XML::getDOMTransformation($dom, "categories_config.xsl", Website::getData(array()));
?>