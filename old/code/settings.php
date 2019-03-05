<?php 

	Class Settings
	{
	   const path =  "/moms/";
 	   const debug = True;
	}

  if (Settings::debug)
    ini_set('display_errors', '1');

  //get a connection
  $root = $_SERVER["DOCUMENT_ROOT"];
  include( $root."/../moms_connect.php");

?>