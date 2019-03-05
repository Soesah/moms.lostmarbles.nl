<?php

	include '../code/website.php';

	Website::XMLHeader();
	Website::CompressHeader();
	
  Moms::getLastChangeDate($dom);
  Moms::getNewRecipeList($dom);
  
	echo XML::getDOMTransformation($dom, "../xsl/rss.xsl", Website::getData(array("today",date("Ymd"))));
?>