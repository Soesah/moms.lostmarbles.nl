<?php
	include '../code/website.php';

	Website::HTMLHeader();
	Website::CompressHeader();
  
  $dom->loadXML("<cms/>");

	if (!Security::isAuthor())	
    header("location:../index.php");
	
	Moms::addPageContents($dom, 'cms');
  	
	echo Website::HTML5Page($dom, "../xsl/cms.xsl", Website::getData(array("path","../","today",date("Ymd"), "version", Moms::version)));
  unset($_SESSION["error"]);
?>