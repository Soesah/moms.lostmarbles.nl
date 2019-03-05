<?php
	include '../code/website.php';

	Website::HTMLHeader();
	Website::CompressHeader();

  $dom->loadXML("<island/>");

  if (!Security::isAuthor())
    header("location:../index.php");

	Moms::addPageContents($dom, 'island');
  Moms::addUserInfo($dom);

	echo Website::HTML5Page($dom, "../xsl/cms.xsl", Website::getData(array("path",Settings::path,"today",date("Ymd"), "version", Moms::version)));
	unset($_SESSION["error"]);
?>