<?php


class Admin {

   private $Username;
   private $Password;


  function __construct($username, $password) {
   /*  $this->Username = "ResellerAdmin" ;
    $this->Password = "jFbd5lg7Djfbn48idmlf4Kd"; */

    $this->Username = $username;
    $this->Password = $password;

  }


  public function getUsername() {
      return $this->Username;
  }

  public function getPassword() {
      return $this->Password;
  }

 
}