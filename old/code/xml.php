<?php

	/*
	* XML Functions
	*/
	class XML
	{
		function getDOMDocument($xml_file)
		{
		  	$xml = new DOMDocument();
		  	$xml->load($xml_file);
	 
		  	return $xml;  
		}
	  
		function getTransformation($xml_file, $xsl_file, $args)
		{
		  	$xml = self::getDOMDocument($xml_file);
	  		return self::getDOMTransformation($xml, $xsl_file, $args);
		}
		
		function getDOMTransformation($xml_dom, $xsl_file, $args)
		{
			global $maxrandom;
	  	$xsl = self::getDOMDocument($xsl_file);

		  $processor = new XSLTProcessor();

		 	for($i = 0; $i < sizeof($args); $i=$i+2)
			  @$processor->setParameter(null, $args[$i], $args[$i+1]);	// @ to suppress warnings	

		  $processor->importStylesheet($xsl);

		  return $processor->transformToXML($xml_dom);
		}

		function getXML($node)
		{
		   $doc= new DOMDocument();    
			 $doc->formatOutput = true;
		   $doc->encoding = "utf-8";

		   $doc->appendChild($doc->importNode($node,true));
		   return $doc->saveXML();
		}

	  function getXMLContent($doc, $node)
	  {
			$frag = $doc->createDocumentFragment(); 

	    foreach($node->childNodes as $child)
	      $frag->appendChild($child->cloneNode(true)); 				

	    return $doc->saveXML($frag);
	  }
		
  }
  
?>