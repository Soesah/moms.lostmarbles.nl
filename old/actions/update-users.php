<?php

  include '../code/website.php';
  Website::TextHeader();
  
  if(Security::isAdmin())
  {
    foreach($_POST as $key => $value)
    {
      if(strpos($key, "id"))
      {
        $id = $value;
        $changed = $_POST[substr($key,0, strpos($key,"_id"))."_changed"];
        $name = $_POST[substr($key,0, strpos($key,"_id"))."_name"];
        $email = $_POST[substr($key,0,  strpos($key,"_id"))."_email"];
        $level = $_POST[substr($key,0,  strpos($key,"_id"))."_level"];
        
        if($changed == "true")
          Moms::updateUser($id, $name, $email, $level);
        if($changed == "delete")
          Moms::deleteUser($id);
      }
    }
    if(isset($_POST["add_user"]) && $_POST["add_user"] == "true")
        Moms::addUser();
  }
	header("location:../index.php?page=users");

?>