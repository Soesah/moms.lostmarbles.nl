<?php

  include "../code/website.php";
  include "cssmin.php";

  Website::CSSHeader();
  Website::CacheHeader(365, "moms-style.css");
  Website::EtagHeader("moms-style-".Moms::version.".css");

  if (extension_loaded("zlib") && (ini_get("output_handler") != "ob_gzhandler"))
    ini_set("zlib.output_compression", 1);
  else
    Website::CompressHeader();

  $filename = Website::GetRequestFilename();

  if (!Website::ServeStoredOutput($filename))
  {

    $resources = array();
    if(isset($_GET["type"]) && $_GET["type"] == "cms")
      array_push($resources, 'cms.css');

    array_push($resources,'moms-style.css'); 

    $contents =  CssMin::minify(Website::concatResources($resources));  
    Website::StoreOutput($filename, $contents, Moms::version, "*.css");

    echo $contents;
  } 
?>