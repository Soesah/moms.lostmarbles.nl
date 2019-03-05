<?php

  include '../code/website.php';
 
  Website::XMLHeader();
  Website::CompressHeader();

  
  $xmlstr = file_get_contents('php://input');
  
  $dom = new DOMDocument;
  $dom->loadXML($xmlstr);    

  $xpath = new DOMXPath($dom);
  
  $note = $xpath->query("//note")->item(0);
  
  $contents = $note->textContent;
  $note->removeChild($note->firstChild);
  foreach(explode("\n", $contents) as $content)
  {
    $paragraph = $dom->createElement('paragraph');
    $note->appendChild($paragraph);
    $paragraph->appendChild($dom->createTextNode($content));
  }
  $author = $dom->createElement('author');
  $author->setAttribute('id', $_SESSION["user_id"]);
  $note->appendChild($author);
  $author->appendChild($dom->createTextNode($_SESSION["user_name"]));

  $id = $_GET["id"];
  $recipe = Moms::getRecipeXML($id);

  $recipeXPath = new DOMXPath($recipe);
  
  $notes = $recipeXPath->query("//notes")->item(0);
  if(!$notes)
  {
    $notes = $recipe->createElement("notes");
    $recipe->documentElement->appendChild($notes);
  }

  $note = $recipe->importNode($note, true);
  $notes->appendChild($note);
  $recipe->documentElement->removeChild($recipeXPath->query("//recipe/name")->item(0));

  Moms::saveRecipe($id, $recipe);

  $form = $recipe->createElement("form");
  $form->setAttribute("type", "note");
  $notes->appendChild($form);
  $description = $recipe->createElement("description");
  $description->appendChild($recipe->createTextNode("Voeg een notitie toe."));
  $form->appendChild($description);

  Moms::addChange($_SESSION["user_id"], $id, "add note");
  
  echo '<div id="children">';
  echo XML::getDOMTransformation($recipe, "../xsl/add-note.xsl", Website::getData(array()));
  echo '</div>';

?>