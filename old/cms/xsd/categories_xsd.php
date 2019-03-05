<?php
	include '../../code/website.php';

	Website::XMLHeader();
	// Website::CompressHeader();

  $dom->loadXML("<schema/>");

  if (!Security::isAuthor())	
    header("location:../index.php");
	
	Moms::getCategoryList($dom);
  	
	echo XML::getDOMTransformation($dom, "categories_xsd.xsl", Website::getData(array()));
?>