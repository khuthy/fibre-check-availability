<?php

require_once 'require_class.php';


class api {
    
    public $admin;
    


    public function __construct() {

        $this->admin = new Admin('ResellerAdmin', 'jFbd5lg7Djfbn48idmlf4Kd');

    }

    public function PostForm($var) {
        if(isset($_POST[$var])) {
          return $_POST[$var];
        }
      return null;
    }

    public function saveSession($var, $x) {
         $_SESSION[$var] = $x; 
    }

    public function loadSession($var){
        return  $_SESSION[$var];
    }
  
    public function GetForm($var) {
      if(isset($_GET[$var])) {
          return $_GET[$var];
        }
      return null;
    }
   


    public function gets($d = array(), $fileName) {
        $curl = new Curl();
        $response = new Response();
        $Url = "https://apitest.axxess.co.za/" . "calls/rsapi/".$fileName.".json";
        $curl->setBasicAuthentication($this->admin->getUsername(), $this->admin->getPassword());
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->setOpt(CURLOPT_SSL_VERIFYHOST,2);
        $curl->get($Url, $d);


        $response->curl = $curl;

        if ($curl->error)
        {
            $response->intCode = $curl->error_code;
        }
        else
        {
            $response->json = $curl->response;
            $result = json_decode($curl->response);
    
            if (null === $result)
            {
                $response->intCode = 500;
                $response->message = "Too many nested arrays or error decoding.";
            }
            else
            {
                $response->intCode = $result->intCode;
                $response->message = isset($result->message) ? $result->message : null;
                $response->object = $result;
            }
        }
    
            $response->hasError = true;
            if ($response->intCode != 200)
        {
            $response->hasError = true;
        }
    
        $curl->close();
        return $response->object;
    }

    public function posts($d, $fileName) {
        $curl = new Curl();
        $response = new Response();
        $Url = "https://apitest.axxess.co.za/" . "calls/rsapi/".$fileName.".json";
        $curl->setBasicAuthentication($this->admin->getUsername(), $this->admin->getPassword());
        $curl->setOpt(CURLOPT_SSL_VERIFYPEER, false);
        $curl->setOpt(CURLOPT_SSL_VERIFYHOST,2);
        $curl->post($Url, $d);


        $response->curl = $curl;

        if ($curl->error)
        {
            $response->intCode = $curl->error_code;
        }
        else
        {
            $response->json = $curl->response;
            $result = json_decode($curl->response);
    
            if (null === $result)
            {
                $response->intCode = 500;
                $response->message = "Too many nested arrays or error decoding.";
            }
            else
            {
                $response->intCode = $result->intCode;
                $response->message = isset($result->message) ? $result->message : null;
                $response->object = $result;
            }
        }
    
            $response->hasError = true;
            if ($response->intCode != 200)
        {
            $response->hasError = true;
        }
    
        $curl->close();
        return $response->object;
    }
    

}