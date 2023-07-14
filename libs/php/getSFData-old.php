<?php

//define login details
define("CLIENT_ID", '3MVG9vvlaB0y1YsLbTio7h8402brRGYpBWHbiJCIWB1gxzTUCrtbDCCcundrYNckrh9ojXvQSnO3YG6rt0Ut2');
define("CLIENT_SECRET", 'B5AA18993D57631376246A090E311FD42315B2050FAACFB27B67155CCA432461');
define("SF_INSTANCE", ''. $_REQUEST['myNewSFinstanceUrl'] . '');
define("SF_USER", 'stefandodds@hotmail.com');
define("SF_PWD", 'Jipnaps@15270');
define("SECURITY_TOKEN", ''. $_REQUEST['myNewSFToken'] . '');

//print response
$response_o = json_decode($response_j);
print_r($response_o);

$access_token = $response_o->access_token;

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://'.SF_INSTANCE.'/services/data/v51.0/query?q=SELECT+name+FROM+Account',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_SSL_VERIFYPEER => true,
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_2_0,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer '.$access_token,
  ),
));
$response_j = curl_exec($curl);
curl_close($curl);
$response_o = json_decode($response_j);
print_r($response_r);

	  //Standard central part for all
      $output['status']['code'] = "200";
      $output['status']['name'] = "ok";
      $output['status']['description'] = "success";
      $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
  
      //how to end the process
      $output['data'] = $decode;
      
      
      header('Content-Type: application/json; charset=UTF-8');
  
      echo json_encode($output); 

?>