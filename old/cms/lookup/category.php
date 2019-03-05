<?php
	include '../../code/website.php';

	Website::HTMLHeader();
	Website::CompressHeader();

  $dom->loadXML("<lookup/>");

  if (!Security::isAuthor())
    header("location:../index.php");
	
	Moms::getCategoryList($dom);

	echo Website::HTML5Page($dom, "categories_lookup.xsl", Website::getData(array('path','../../', "version", Moms::version)));
?>