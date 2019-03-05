<?php

  include '../code/website.php';
	Website::TextHeader();
  
  if(Security::isAdmin())
  {
    if(isset($_GET["id"]) && $_GET["id"] != "")
        Moms::deleteRecipe($_GET["id"]);
  }
	header("location:../index.php");

?>