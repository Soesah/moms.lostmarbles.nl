<?php

	include '../code/website.php';

	Security::logout();

	header("location:../index.php");
?>