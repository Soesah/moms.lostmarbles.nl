<?php 

	$dom = new DOMDocument();
	$dom->loadXML("<moms-recipes/>");
	Moms::addUserInfo($dom);

	class Moms
	{
    const version = "1.1.4";
		const PAGE_TABLE 			= "moms_page";
		const USER_TABLE			= "moms_user";
		const CATEGORY_TABLE	= "moms_category";
		const RECIPE_TABLE		= "moms_recipe";

		public function addPageContents($dom, $name)
		{
			$result = query("SELECT * FROM ".self::PAGE_TABLE." WHERE name = '".$name."'");
	 		$page = $dom->importNode(queryToXML($result, $result, "page")->documentElement, true);
			$dom->documentElement->appendChild($page);
		}


		public function getPageList($dom)
		{
			$result = query("SELECT id, name, title FROM ".self::PAGE_TABLE);
			$list = $dom->importNode(recordListToXML($result, "pages","page")->documentElement, true);
			$dom->documentElement->appendChild($list);
		}
	 
	  public function addUserInfo($dom)
		{
			$user = $dom->createElement("user");
			$name = $dom->createElement("name");
			$user->appendChild($name);
			$level = $dom->createElement("level");
			$user->appendChild($level);
	    if(isset($_SESSION["user_name"]))
			{
				$name->nodeValue = $_SESSION["user_name"];
				$level->nodeValue = $_SESSION["user_level"];
			}

			$xpath = new DOMXpath($dom);
			$node = $xpath->query("//user")->item(0);
			if($node)
			  $node->parentNode->replaceChild($user, $node);
	    else
	      $dom->documentElement->appendChild($user);

		}

	  public function getUserList($dom)
		{
			$result = query("SELECT * FROM ".self::USER_TABLE."");
			$list = $dom->importNode(recordListToXML($result, "user-list","user-item")->documentElement, true);
			$xpath = new DOMXpath($dom);
			$user_list = $xpath->query("//user-list")->item(0);
			if($user_list)
			  $user_list->parentNode->replaceChild($list, $user_list);
	    else
	      $dom->documentElement->appendChild($list);
		}

	  public function updateUser($id, $name, $email, $level)
	  {
	    $query = "UPDATE ".self::USER_TABLE." SET name = '".$name."', email = '".$email."', user_level = '".$level."' WHERE id = ".$id;
	    $result = query($query);
	    return $result;
	  }

	  public function addUser()
	  {
	    $query = "INSERT INTO ".self::USER_TABLE." (id, name, pass, email, user_level, last_login_date) VALUES (null, '', '', '', 0, null)";
	    $result = query($query);
	    return $result;
	  }

	  public function deleteUser($id)
	  {
	    if(isset($_SESSION['user_level']) && strpos($_SESSION['user_level'],'admin'))
	    {
	      $query = "DELETE FROM ".self::USER_TABLE." WHERE id = ".$id;
	      $result = query($query);
	      return $result;
	    }
	    else
	      return false;
	  }


		public function getCategoryList($dom)
		{
			$result = query("SELECT id, slug, position, name_singular, name_plural FROM ".self::CATEGORY_TABLE."");
			$list = $dom->importNode(recordListToXML($result, "categories", "category")->documentElement, true);
			$xpath = new DOMXpath($dom);
			$categories = $xpath->query("//categories")->item(0);
			if($categories)
			  $categories->parentNode->replaceChild($list, $categories);
	    else
	      $dom->documentElement->appendChild($list);
		}

		public function getRecipeList($dom)
		{
	    $cat = (isset($_GET["select-cat"]))?$_GET["select-cat"]:((isset($_SESSION["cat"])?$_SESSION["cat"]:""));
			if($cat == "new")
			{
			  $result = query("SELECT r.*, c.name_singular as category_name, c.slug as category_slug FROM ".self::RECIPE_TABLE." r LEFT JOIN ".self::CATEGORY_TABLE." c ON r.category_id = c.id ORDER BY creation_date DESC LIMIT 20;");
			  $list = $dom->importNode(recordListToXML($result, "more-new-recipes","recipe")->documentElement, true);
			}
			else
			{
			  $result = query("SELECT id, slug, category_id, (now() < DATE_SUB(creation_date, INTERVAL -2 MONTH)) as new, creation_date, name FROM ".self::RECIPE_TABLE."");
			  $list = $dom->importNode(recordListToXML($result, "recipes","recipe")->documentElement, true);
			}
			$xpath = new DOMXpath($dom);
			$recipes = $xpath->query("//recipes")->item(0);
			if($recipes)
			  $recipes->parentNode->replaceChild($list, $recipes);
		}

	  public function getRecipeSearch($dom, $search)
		{

	 		//fulltext match
			$result = query("SELECT MATCH(name, xml) AGAINST ('".$search."') as rank, r.id, r.slug, r.xml, r.servings, r.category_id, r.creation_date, r.name, c.name_singular as category_name FROM ".self::RECIPE_TABLE." r LEFT JOIN ".self::CATEGORY_TABLE." c ON r.category_id = c.id WHERE xml LIKE '%".$search."%' OR name LIKE '%".$search."%' ORDER BY rank DESC");
			$list = $dom->importNode(recordListToXML($result, "results","recipe")->documentElement, true);
			$xpath = new DOMXpath($dom);
			$results = $xpath->query("//results")->item(0);
			if($results)
			  $results->parentNode->replaceChild($list, $results);
		}


	  public function getNewRecipes($dom)
	  {
			$result = query("SELECT r.*, c.name_singular as category_name, c.slug as category_slug FROM ".self::RECIPE_TABLE." r LEFT JOIN moms_category c ON r.category_id = c.id ORDER BY creation_date DESC LIMIT 2;");
			$list = $dom->importNode(recordListToXML($result, "new-recipes","recipe")->documentElement, true);
			$xpath = new DOMXpath($dom);
			$recipes = $xpath->query("//new-recipes")->item(0);
			if($recipes)
			  $recipes->parentNode->replaceChild($list, $recipes);
	  }

	  public function getNewRecipeList($dom)
	  {
			$result = query("SELECT r.*, DATE_FORMAT(creation_date, '%a, %d %b %Y %T +0100') as rss_date, c.name_singular as category_name, c.slug as category_slug FROM ".self::RECIPE_TABLE." r LEFT JOIN moms_category c ON r.category_id = c.id ORDER BY creation_date DESC LIMIT 10;");
			$list = $dom->importNode(recordListToXML($result, "new-recipes","recipe")->documentElement, true);
	    $dom->documentElement->appendChild($list);
	  }

	  private function getRecipeId($slug)
	  {
			$result = query("SELECT id from ".self::RECIPE_TABLE." WHERE slug = '".$slug."'", True);
			return $result[0]["id"];
	  }

		public function getRecipe($dom, $id)
		{
			$result = query("SELECT *, (now() < DATE_SUB(creation_date, INTERVAL -2 MONTH)) as new FROM ".self::RECIPE_TABLE." WHERE id = '".$id."' OR slug = '".$id."'");
			$item = $dom->importNode(queryToXML($result, $result, "recipe")->documentElement, true);
			$xpath = new DOMXpath($dom);
			$recipe = $xpath->query("//recipe")->item(0);
			if($recipe)
			  $recipe->parentNode->replaceChild($item, $recipe);
			else
			  $dom->documentElement->appendChild($item);
		}

	  public function getRecipeXML($id)
		{
			$result = query("SELECT * FROM ".self::RECIPE_TABLE." WHERE id = '".$id."'");
			$dom = queryToXML($result, $result, "recipe");
			return $dom;
		}

	  public function createRecipe($dom, $title)
	  {
	    $xpath = new DOMXPath($dom);
	    $titleNode = $xpath->query("//title")->item(0);
	    $titleNode->appendChild($dom->createTextNode($title));
	    $title = $title;
	    $slug = Website::getIOName($title);
	    $xmlstr = XML::getXMLContent($dom, $dom->documentElement);

	    $query = "INSERT INTO ".self::RECIPE_TABLE." (id, category_id, name, slug, creation_date, modification_date, xml, servings, preparation_time, language) VALUES ";
	    $query = $query."(null, 0, '".$title."','".$slug."', now(), now(), '".$xmlstr."', '', '', 'nl-NL')";

	    $id = query($query);

	    return $id;
	  }

	  /*
	   * Save an xml file to the database
	   * Params: dom:DOMDocument
	   * Returns: url of the document (as it may have changed)
	   */
	  public function saveRecipe($id, $dom)
	  {
	    $xpath = new DOMXPath($dom);
	    $root = $dom->documentElement;

	    $titleNode = $xpath->query("//title")->item(0);
	    if($titleNode)
	      $title = $titleNode->textContent;

	    $servings = $root->getAttribute("servings");
	    $preptime = $root->getAttribute("preparation_time");

	    $xmlstr = XML::getXMLContent($dom, $dom->documentElement);

	    $category_id = $root->getAttribute("category_id");

	    if($id != '')
	    {
	      $query = "UPDATE ".self::RECIPE_TABLE." SET ";
	      $query = $query."name = '".$title."', ";
	      $query = $query."slug = '".Website::getIOName($title)."', ";
	      $query = $query."category_id = '".$category_id."', ";
	      $query = $query."servings = '".$servings."', preparation_time = '".$preptime."', ";
	      $query = $query."xml = '".$xmlstr."', modification_date = now() WHERE id = ".$id;
	    }
	    else
	      return "An error occured while saving. No ID was provided";

	  	//save
			$result = query($query);

	    //return the url, as it may have changed
			return "Ok";
	  }

	  public function deleteRecipe($id)
	  {
	    if(isset($_SESSION['user_level']) && strpos($_SESSION['user_level'],'admin'))
	    {
	      $query = "DELETE FROM ".self::RECIPE_TABLE." WHERE id = ".$id;
	      $result = query($query);
	      $query = "DELETE FROM moms_changelog WHERE recipe_id = ".$id;
	      $result = query($query);
	      return $result;
	    }
	    else 
	      return false;
	  }


	  public function fixNotes($dom)
	  {
			$xpath = new DOMXpath($dom);
			$location = $xpath->query("//notes-location")->item(0);
			$notes = $xpath->query("//notes")->item(0);
			$noteform = $xpath->query("//form[@type = 'note']")->item(0);
			if(!$notes)
			  $notes = $dom->createElement("notes");
		  $location->parentNode->replaceChild($notes, $location);
	    $notes->appendChild($noteform);
	  }


	  public function getLastChangeDate($dom)
	  {
	    $result = query("SELECT id, DATE_FORMAT(creation_date, '%a, %d %b %Y %T +0100') as change_date FROM ".self::RECIPE_TABLE." ORDER BY creation_date DESC LIMIT 1");
	    $changedate = $dom->createElement("change-date");
	    $changedate->appendChild($dom->createTextNode($result["change_date"]));
	    $dom->documentElement->appendChild($changedate);
	  }

	  /*
	   * Create a change
	   */
	  public function addChange($user_id, $recipe_id, $type)
	  {
	    //create a new page in the database
	    if(!self::changeExists($user_id, $recipe_id, $type))
	      $query = "INSERT INTO moms_changelog (id, user_id, recipe_id, type, date) VALUES (null, ".$user_id.",".$recipe_id.",'".$type."',now())";

			$result = query($query);

			return $result;
	  }

	  public function changeExists($user_id, $recipe_id, $type)
	  {
	    $query = "SELECT id FROM moms_changelog WHERE user_id = ".$user_id." AND recipe_id = ".$recipe_id." AND type = '".$type."' AND TO_DAYS(date)=To_DAYS(now())";

	    $result = query($query);

	    if($result)
	      return true;
	    else
	      return false;
	  }

	  public function getChangelog($dom)
	  {
	 		$xpath = new DOMXpath($dom);
			$changelog = $xpath->query("//changelog")->item(0);
			if($changelog)
	    {
	      $type = $changelog->getAttribute("type");
	      if ($type == "small")
	      {
	        $result = query("SELECT c.id, u.name as user_name, c.type, r.slug, r.name as recipe_name, c.date, c.recipe_id FROM moms_changelog c LEFT JOIN ".self::USER_TABLE." u on u.id = c.user_id LEFT JOIN ".self::RECIPE_TABLE." r ON r.id = c.recipe_id ORDER BY c.date DESC LIMIT 1");
	        $list = $dom->importNode(queryToXML($result, $result ,"change")->documentElement, true);
	        $changelog->appendChild($list);
	      }
	      else if ($type == "recipe")
	      {
	      	$recipe_id = (isset($_GET["id"]))?$_GET["id"]:self::getRecipeId($_GET["r"]);
	        $result = query("SELECT c.id, u.name as user_name, c.type, r.name as recipe_name, c.date, c.recipe_id FROM moms_changelog c LEFT JOIN ".self::USER_TABLE." u on u.id = c.user_id LEFT JOIN ".self::RECIPE_TABLE." r ON r.id = c.recipe_id WHERE c.recipe_id = ".$recipe_id." ORDER BY c.date DESC");
	        $list = $dom->importNode(recordListToXML($result, "changelog","change")->documentElement, true);
	  		  $changelog->parentNode->replaceChild($list, $changelog);
	    }
	      else
	      {
	        $result = query("SELECT c.id, u.name as user_name, c.type, r.name as recipe_name, c.date, c.recipe_id FROM moms_changelog c LEFT JOIN ".self::USER_TABLE." u on u.id = c.user_id LEFT JOIN ".self::RECIPE_TABLE." r ON r.id = c.recipe_id ORDER BY c.date DESC");
	        $list = $dom->importNode(recordListToXML($result, "changelog","change")->documentElement, true);
	  		  $changelog->parentNode->replaceChild($list, $changelog);
	      }

	      $list->setAttribute("type", $type);
	    }
	  }
	}

?>