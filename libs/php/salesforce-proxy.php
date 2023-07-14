<?php
// Salesforce API endpoint URL
$apiEndpoint = "https://brave-badger-fohzlw-dev-ed.trailblaze.lightning.force.com/services/data/v52.0/query";

// Get the HTTP method from the original request
$method = $_SERVER['REQUEST_METHOD'];

// Get the request data
$requestData = file_get_contents('php://input');

// Set the necessary headers for the Salesforce API request
$headers = array(
    'Authorization: Bearer '. $_GET['access_token'], // Pass the access token from your web page
    'Content-Type: application/json',
    'Accept: application/json'
);

// Set the cURL options for the Salesforce API request
$curlOptions = array(
    CURLOPT_URL => $apiEndpoint,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestData,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_SSL_VERIFYPEER => false // Adjust this option based on your server's SSL configuration
);

// Initialize cURL and set the options
$curl = curl_init();
curl_setopt_array($curl, $curlOptions);

// Execute the request and get the response
$response = curl_exec($curl);

// Get the response HTTP status code
$responseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

// Close the cURL session
curl_close($curl);

// Set the necessary headers for the proxy server response
header('Content-Type: application/json');
http_response_code($responseCode);

// Send the Salesforce API response back to the web page
echo $response;
