<?php
//
//  security.php
//  functions for security
//
//  Created by Carl Giesberts on 2012-04-20.
//

Class Security
{
  const USER_LEVEL = "user";
  const AUTHOR_LEVEL = "author";
  const ADMIN_LEVEL = "admin";

  /*
   * Check if we are logged in.
   */
  public function check()
  {
    return isset($_SESSION["user_name"]);
  }

  /*
   * Check if we are an administrator.
   */
  public function isAdmin()
  {
    return strpos($_SESSION['user_level'],self::ADMIN_LEVEL) !== False;
  }

  /*
   * Check if we are an author.
   */
  public function isAuthor()
  {
    return strpos($_SESSION['user_level'],self::AUTHOR_LEVEL) !== False;
  }

  /*
   * Check if we are a user.
   */
  public function isUser()
  {
    return strpos($_SESSION['user_level'],self::USER_LEVEL) !== False;
  }


  /*
   * Log in by by setting sessions variables
   * This function should follow hasLoginData()
   */
  public function login($name)
  {
    $result = query("SELECT * from ".Moms::USER_TABLE." WHERE name='".$name."'");
    
    if($result['name'])
    {
      $_SESSION["user_id"] = $result['id'];
      $_SESSION["user_name"] = $result['name'];

      $_SESSION["user_level"] = "level: user";
      if($result['user_level'] == "50")
        $_SESSION["user_level"] = "level: author user";
      if($result['user_level'] == "100")
        $_SESSION["user_level"] = "level: admin author user";

      //update last login date
      query("UPDATE ".Moms::USER_TABLE." SET last_login_date = now() WHERE name='".$name."'");
      
      if(isset($_POST["remember"]) && $_POST["remember"] == "remember") //set and re-set the cookie
        setcookie("moms-user-name", $result['name'], time()+60*60*24*30, '/', $_SERVER["SERVER_NAME"]);
      else if($_COOKIE["moms-user-name"]) //remove the cookie if it was set
        setcookie("moms-user-name", $result['name'], time()-3600, '/', $_SERVER["SERVER_NAME"]);
      
      return True;
    }
    else
      return False;
  }

  /*
   * Unset the session variables to do a logout
   */
  public function logout()
  {
    unset($_SESSION["user_id"]);
    unset($_SESSION["user_name"]);
    unset($_SESSION["user_level"]);
  }

  /*
   * Check that two parameters have been posted
   */
  public function hasLoginData()
  {
    return !empty($_POST["user-name"]);    
  }
}


?>