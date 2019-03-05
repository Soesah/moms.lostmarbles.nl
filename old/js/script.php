<?php
 	
  include "../code/website.php";
  include "jsmin.php";

  Website::JavaScriptHeader();
  Website::CacheHeader(365, "source/general.js");
  Website::EtagHeader("moms-script-".Moms::version.".js");
  Website::CompressHeader();

  $filename = Website::GetRequestFilename();
  $js_contents = null;
  $js_content = null;

  if (!Website::ServeStoredOutput($filename))
  {
    $list = isset($_GET["type"])?$_GET['type']:"basic";
    $js_contents = array();

    switch($list)
    {
    case "script":
    case "basic":
      array_push($js_contents,file_get_contents('source/general.js'));
      array_push($js_contents,file_get_contents('source/comm.js'));
      break;
    case "cms":
      array_push($js_contents,file_get_contents('source/general.js'));
      array_push($js_contents,file_get_contents('source/comm.js'));
      array_push($js_contents,file_get_contents('source/cms.js'));
      break;
    }

    foreach($js_contents as $js)
      $js_content = $js_content.$js;
    
    $js_content = JSMin::minify($js_content);  
    Website::StoreOutput($filename, $js_content, Moms::version, "*.js");
    echo $js_content;
  }

?>