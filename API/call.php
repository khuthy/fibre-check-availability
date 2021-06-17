<?php

require_once 'require_class.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

$postjson = json_decode(file_get_contents('php://input'), true);

$result = json_encode(array('success'=>false,'msg'=>'Nothing Happened'));


$api = new api();

if(true){
    
    switch($postjson['request']) {
        case 'getFibre': {

            if($postjson['address-input'] && $postjson['lat'] && $postjson['lng']) {
                $arr = array();
                $arr['strAddress']  = $postjson['address-input'];
                $arr['strLatitude'] = $postjson['lat'];
                $arr['strLongitude']= $postjson['lng'];
                $arr['strSessionId']= $api->loadSession('strSessionId');
    
                $fibre = $api->gets($arr, 'checkFibreAvailability');
               
                if($fibre->strMessage == 'No Fibre available' ) {
                    $result = json_encode(array('available'=>false, 'result'=>$fibre->strMessage));
                }else {
    
                    $result = json_encode(array('available'=>true, 'result'=>$fibre->strMessage, 'networkProvider'=> $fibre->arrAvailableProvidersGuids)); 
                }
                
            }
            break;
        }
        case 'getNetworkProvider': {

            $getNetworkProviderById = array();

            $arr = array();
            /* Get all Network provider name */
            $getNetworkProviderName = $api->gets(array('strSessionId'=>$api->loadSession('strSessionId')), 'getNetworkProviders');

            foreach ($getNetworkProviderName->arrNetworkProviders as $networkName) {
                foreach ($postjson['guidNertworkProviderId'] as $key) {
                    if($key == $networkName->guidNetworkProviderId) {
                        $getNetworkProviderById[] =  $networkName;
                    }
                    # code...
                    /* $arr['strSessionId']= $api->loadSession('strSessionId');
                    $arr['guidNetworkProviderId'] = $key;
    
                    $getNetworkProvider = $api->gets($arr, 'getNetworkProviderProducts'); */
                }
            }

           

            


            $result = json_encode(array('success'=>true, 'result'=>$getNetworkProviderById));
            break;
        }
        case 'getAllServiceProvider': {
            
            $arr = array();

            break;
        }
        default: {
            $result = json_encode(array('success'=>false, 'msg'=>$postjson['request']));
        }
    }
    
}
echo $result;