<?php

  include 'settings.php';
  include 'security.php';
	include 'xml.php';
	include 'database.php';
  include 'moms.php';

	//start sessions
	session_start();

  // set timezone
	date_default_timezone_set("Europe/Amsterdam");


  /**
  * Website
  */
  Class Website
  {    
    /*
     * ContentType headers
     */ 
    public function TextHeader()
    {
      self::contentType("text/plain");
    }

    public function HTMLHeader()
    {
      self::contentType("text/html");
    }

    public function XMLHeader()
    {
      self::contentType("application/xml");
    }

    public function CSSHeader()
    {
      self::contentType("text/css");
    }

    public function JavaScriptHeader()
    {
      self::contentType("text/javascript");
    }
    
    public function ImageHeader($mimetype="image/png")
    {
      header("Content-type: ".$mimetype);
    }

    public function contentType($contentType)
    {
      header("Content-type: ".$contentType."; charset=utf-8");
    }

    /*
     * Length header for images
     */ 
    public function LengthHeader($length)
    {
      header('Content-Length: '. $length);
    }

    /*
     * Gzip Compression
     */ 
    public function CompressHeader()
    {
      ob_start("ob_gzhandler");
      header("Content-Encoding: gzip");
    }

    /*
     * Add cache headers
     */ 
    public function CacheHeader($total_days=1, $file=null)
    {
      header("Cache-Control: public max-age: ". (24*60*60* $total_days));
      header("Expires: " . gmdate("D, d M Y H:i:s", time()+24*60*60* $total_days) . " GMT");
      header("Pragma: public");
      if ($file != null)
        header("Last-Modified: ".gmdate('D, d M Y H:i:s', filemtime($file)) . ' GMT');
    }

    /*
     * Add ETag header for caching
     */
    public function EtagHeader($file)
    {
      // create an etag
      $etag = md5($file);
      //set etag-header
      header("Etag:".$etag);
    }

    /*
     * Rewrite doctype and meta content type header from XSL output
     */ 
    public function HTML5Page($doc, $xsl_file, $data)
    {
      $html = XML::getDOMTransformation($doc, $xsl_file, $data);

      $html_array = explode("\n",$html);
      
      // split off the doctype
      $html_doc = array_shift($html_array);
      $html_content = implode("\n", $html_array);

      // fix html5 charset
      $html_content = preg_replace('/<meta http-equiv=\"Content-Type\" content=\"text\/html; charset=(.*[a-z0-9-])\" ?\>/i', '<meta charset="\1" />', $html_content);
      $html_content = preg_replace('/async=\"\"/i', 'async', $html_content);
      $html_content = preg_replace('/defer=\"\"/i', 'defer', $html_content);

      // write the HTML5 doctype
      $doctype = "<!DOCTYPE html>\n";
      return $doctype . $html_content;
    }

    /*
     * Concat resources and parse a version number 
     */
    public function concatResources($resources)
    {
      $contents = "";
      foreach ($resources as $key => $resource) 
      {
        $contents .= file_get_contents($resource);
      }
      return $contents;
    }

    /*
     * Get the filename of the request
     */
    public function GetRequestFileName()
    {
      $filename =  $_SERVER["REQUEST_URI"];
      $filename = substr($filename, strrpos($filename, "/")+1);
      return $filename;
    }

    /*
     * Store compiled output files, and serve them if they are requested and exist
     */
    public function ServeStoredOutput($filename)
    {
      if (file_exists($filename))
      {
        echo file_get_contents($filename);
        exit();
      }
      else
        return False;
    }

    public function StoreOutput($filename, $contents, $filter_token, $ext_filter)
    {
      // remove older files
      $filter = substr($filename, 0, strrpos($filename, $filter_token));

      if ($filter == "")
        die();

      $cached = glob($filter.$ext_filter);
      foreach ($cached as $key => $file) 
      {
        if ($file !== $filename)
          unlink($file);
      }

      if (!Settings::debug)
      {
        // write out the new file
        $f = fopen($filename, "w+");
        fwrite($f, $contents);
        fclose($f);
      }
    }

    function getData($start_data)
    {
      $data = ($start_data == null)?array():$start_data;

      foreach($_GET as $key => $value) 
      {
        //used to remember settings
        if(strpos($key, "select-") === false)
        {
          array_push($data, $key, $value);
        }
        else
        {
          $session_key = substr($key, strpos($key, "select-") + 7);
          if($value == "false")
            unset($_SESSION[$session_key]);
          else
            $_SESSION[$session_key] = $value;
        }
      }
      foreach($_POST as $key => $value)
        array_push($data, $key, $value);

      foreach($_SESSION as $key => $value)
        array_push($data, $key, $value);
      
      if(isset($_COOKIE["moms-user-name"]))
        array_push($data, "log-in-name", $_COOKIE["moms-user-name"]);
      
      if(isset($_SESSION["user_name"])) 
          array_push($data, "logged-in", true);

      return $data;
    }
    //
    //  File and directory functions
    //

    function processDirectory($dir, $handle, $dom, $parent)
    {
      while (false !== ($file = readdir($handle)))
      {
        $childdir = $dir."/".$file;
        if($file == ".DS_Store" || $file == "Thumbs.db")
        {}
        else if(!strstr($file, ".") && $childhandle = opendir($childdir))
        {
          $child = $dom->createElement('directory');
          $child->setAttribute("name",$file);
          $parent->appendChild($child);
          processDirectory($childdir, $childhandle, $dom, $child);
        }
        else if($file != "." && $file != "..")
        {
          $name = substr($file, 0, strpos($file, "."));
          
          $child = $dom->createElement('file');
          $text = $dom->createTextNode($name);
          
          if(strstr($file, ".xml"))
          {
            $doc = new DOMDocument();
            $doc->load($childdir);
            $text = $dom->createTextNode($doc->getElementsByTagName('title')->item(0)->textContent);
            foreach($doc->documentElement->attributes as $name => $node)
              $child->setAttribute($name, $node->value);
          }
          
          $child->setAttribute("name",$file);
          $child->setAttribute("size",filesize($childdir));
          $child->setAttribute("date",date("Y.m.d H:i:s.",filemtime($childdir)));
          $child->appendChild($text);
          $parent->appendChild($child);
        }
      }
    }
    
    function getFileName($title, $includesExtension)
    {
      if($includesExtension)
      {
        $ext = strtolower(substr($title, strrpos($title,'.')));
        $title = substr($title, 0, strrpos($title,'.'));
      }
      $a = array('/\ /','/\'/', '/\\\/', '/\//', '/\^/', '/\./', '/\$/', '/\|/','/\(/', '/\)/', '/\[/', '/\]/', '/\*/', '/\+/','/\?/', '/\{/', '/\}/', '/\,/');
      $b = array('_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_'); //18 items
      $filename = preg_replace($a, $b, $title);
      if(substr($filename, strlen($filename) - 1) == '_')
        $filename = substr($filename, 0, strlen($filename) - 1);
      if($includesExtension)
        return strtolower($filename).$ext;
      else
        return strtolower($filename);
    } 

    /*
     * Get a proper file structure name
     * Params: title:string, includesExtension:boolean
     * Returns: String
     */ 
    function getIOName($name, $includesExtension=false)
    {
      if($includesExtension)
      {
        $ext = strtolower(substr($name, strrpos($name,'.')));
        $name = substr($name, 0, strrpos($name,'.'));
      }
      $name = trim($name);

      $a = array('/\ /','/\'/', '/\\\/', '/\//', '/\^/', '/\./', '/\$/', '/\|/','/\(/', '/\)/', '/\[/', '/\]/', '/\*/', '/\+/','/\?/', '/\{/', '/\}/', '/\,/');
      $b = array('-','','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'); //18 items
      $name = preg_replace($a, $b, $name);

      while(substr($name, 0, 1) == '-')
        $name = substr($name, 1);

      while(substr($name, -1) == '-')
        $name = substr($name, 0, strrpos($name, '-'));

      if($includesExtension)
        return strtolower($name).$ext;
      else
        return strtolower($name);
    }
  }




?>