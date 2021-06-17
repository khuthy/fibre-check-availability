<?php

require_once 'require_class.php';

class Session {
    private $api;
   
   private $admin;
   public $args = array();
   
  public function __construct()
  {
  
  }
   
 public function getSession() {
     
     $this->admin = new Admin('THE61', 'AS6tE$t2');
     $this->api = new api();
     $this->args['strUserName'] = $this->admin->getUsername();
     $this->args['strPassword'] =  $this->admin->getPassword();

     $result = $this->api->gets($this->args, 'getSession');
     if($result) {
         
        $this->api->saveSession('strSessionId', $result->strSessionId);

     }else {
         echo "Please check if you are connected to the Internet and try again later.";
     }

     
 }
  
}



