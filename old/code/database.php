<?php

	//
	// Database functions
	//
	
	function query($query, $forceRecordList = false)
	{
    global $db;

    $stmt = $db->query($query);

    if($stmt) {
      $count = $stmt->rowCount();
      if(!$count) {    //if no rows, return false
        return false;
      } else if($count > 1 || $forceRecordList) {
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
      } else {
        echo $query;
        if ($query === "SELECT id from moms_recipe WHERE slug = 'appeltaart'") {        
          echo 'QUERY['.$query.']';
         var_dump($stmt->fetch(PDO::FETCH_ASSOC));
          echo 'QUERY['.$query.']';
        }
       return $stmt->fetch(PDO::FETCH_ASSOC);
      }
    } else {
      return $stmt;
    }
	}
	
	function recordListToXML($recordlist, $rootname, $elementname)
	{
		$doc = new DOMDocument();
		$doc->formatOutput = true;
		$doc->encoding = "utf-8";
		
		$doc->LoadXML("<".$rootname."/>");
		
    if(isset($recordlist['id']) || isset($recordlist['id']))//dirty
    {
		  $child = queryToXML($recordlist, $recordlist, $elementname);
		  $child = $doc->importNode($child->documentElement, true);
		  $doc->documentElement->appendChild($child);
    }
    else if($recordlist)
    {
		  foreach($recordlist as $result)
		  {
			  $child = queryToXML($recordlist, $result, $elementname);
			  $child = $doc->importNode($child->documentElement, true);
			  $doc->documentElement->appendChild($child);
		  }
    }
		return $doc;
	}
	
	function queryToXML($result, $recordlist, $documentname)
	{
		$doc = new DOMDocument();
		$doc->formatOutput = true;
		$doc->encoding = "utf-8";
      
		if($result)
		{
			$doc->LoadXML("<".$documentname."/>");
			$frag = $doc->createDocumentFragment(); 
		  foreach($recordlist as $key => $value)
		  {
			  if($key != "xml" && $key != "name")
				  $doc->documentElement->setAttribute($key, $value);
			  else if($key == "name")
			  {
				  $x = new DOMDocument();
				  $frag->appendXML("<".$key.">".$value."</".$key.">"); 				
				  $doc->documentElement->appendChild($frag);
			  }
			  else
			  {
				  $x = new DOMDocument();
				  $frag->appendXML($value); 				
				  $doc->documentElement->appendChild($frag);
			  }
		  }
		}
		else
			$doc->LoadXML("<error code='404'/>"); 
		
		return $doc;
	}

  
?>