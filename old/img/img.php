<?php 
  
  include "../code/website.php";  
  
  $img =  $_GET["image"];
  $ext = $_GET["ext"];
  $file = $img.".".$ext;

  Website::CacheHeader(365, $file);
  Website::EtagHeader($file.Moms::version);
  Website::ImageHeader("image/".$ext);
  Website::LengthHeader(filesize($file));

  //output the file
  readfile($file);
 