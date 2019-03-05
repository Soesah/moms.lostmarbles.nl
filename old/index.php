<?php

	include 'code/website.php';

  Website::HTMLHeader();
  Website::CacheHeader(0);
  Website::CompressHeader();

  $data = Website::getData(array("today",date("Ymd"), "version", Moms::version, "path", Settings::path));

	if(isset($_SESSION["user_name"]))
	{  
    if (isset($_GET["r"])) // a recipe by slug or id
    {
      Moms::addPageContents($dom, 'recipe');
      Moms::getChangelog($dom);
      Moms::getCategoryList($dom);
      Moms::getRecipeList($dom);
      Moms::getRecipe($dom, $_GET['r']);
      Moms::fixNotes($dom);
    }
    else if(isset($_GET["page"]) && $_GET["page"] != "" && Security::isAdmin()) // a page, such as user administration
    {
  	  Moms::addPageContents($dom, $_GET['page']);
  	  Moms::getUserList($dom);
    }
    else if(isset($_GET["search"]) && $_GET["search"] != "") // search page
    {
  	  Moms::addPageContents($dom, 'search');
      Moms::getRecipeSearch($dom, $_GET["search"]);
      unset($_SESSION["cat"]);
    }
    else
    {
  	  Moms::addPageContents($dom, 'list');
		  Moms::getRecipeList($dom);
    }
    Moms::getCategoryList($dom);
	}
	else
  {
    // save the path that we are currently on, to redirect to after logging in
    $request = substr($_SERVER["REQUEST_URI"], strlen(Settings::path));
    $data = array_merge($data, array("request", $request));
	  Moms::addPageContents($dom, 'home');
  }
  Moms::getNewRecipes($dom);
  Moms::getChangelog($dom);


	echo Website::HTML5Page($dom, "xsl/default.xsl", $data);
  unset($_SESSION["error"]);
?>