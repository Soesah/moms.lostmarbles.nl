<?php

  include '../code/website.php';

  if(Security::hasLoginData())
  {
    if (!Security::login($_POST["user-name"]))
      $_SESSION["error"] = "Name incorrect";
  }
  else
    $_SESSION["error"] = "No name given";
  
  if(isset($_POST["id"]) && $_POST["id"] != '')
      header("location:../recipe.php?id=".$_POST["id"]);
  else if(isset($_POST["request"]) && $_POST["request"] != '')
      header("location:../".$_POST["request"]);
  else
    header("location:../list/");
?>