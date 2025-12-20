<?php
require_once __DIR__ . '/vendor/autoload.php';
uselib('gmail::html2text');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-php-quickstart.json
define('SCOPES', implode(' ', array(
  Google_Service_Gmail::GMAIL_READONLY,
  Google_Service_Gmail::GMAIL_MODIFY
)));


/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient($user='') {
	define('APPLICATION_NAME', 'Gmail API PHP Quickstart');
	define('CLIENT_SECRET_PATH', __DIR__ . '/client_secret.json');
	define('CREDENTIALS_PATH', __DIR__ . '/'.$user.'.json');		
	
  $client = new Google_Client();
  $client->setApplicationName(APPLICATION_NAME);
  $client->setScopes(SCOPES);
  $client->setAuthConfig(CLIENT_SECRET_PATH);
  $client->setAccessType('offline');
  $client->setApprovalPrompt('force');
  $client->setRedirectUri('https://www.privatebailbonds.com/test');

 
  

  
  // Load previously authorized credentials from a file.
  $credentialsPath = expandHomeDirectory(CREDENTIALS_PATH);
  $accessToken = false;
  if (file_exists($credentialsPath)) {
    $accessToken = json_decode(file_get_contents($credentialsPath), true);
  }
  if($accessToken){
	//t($accessToken,1);
  } else {
  	
  	if (php_sapi_name() != 'cli') {
  		throw new Exception('This application must be run on the command line.');
  	}
  	
    // Request authorization from the user.    
	//$authUrl = $client->createAuthUrl();    
    //printf("Open the following link in your browser:\n%s\n", $authUrl);
    //t('done');
        
    //print 'Enter verification code: ';
    $authCode = trim('4/0AfJohXnWmnFHQI6Y5nPR-_OuVX6OtvlycTr4srTujmZ3CkyhCC_lW__1gbt8GAdiXIRlfw');

    // Exchange authorization code for an access token.
    $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
    t(json_encode($accessToken),1);
    // Store the credentials to disk.
    if(!file_exists(dirname($credentialsPath))) {
      mkdir(dirname($credentialsPath), 0700, true);
    }
    file_put_contents($credentialsPath, json_encode($accessToken));
    printf("Credentials saved to %s\n", $credentialsPath);
    
    t('done');
    
  }
  $client->setAccessToken($accessToken);

  // Refresh the token if it's expired.
  if ($client->isAccessTokenExpired()) {
	$refreshToken = $client->getRefreshToken();
    $client->fetchAccessTokenWithRefreshToken($refreshToken);	

	$at = $client->getAccessToken();
	$at['refresh_token'] = $refreshToken;

    file_put_contents($credentialsPath, json_encode($at));
  }

  return $client;
}

/**
 * Expands the home directory alias '~' to the full path.
 * @param string $path the path to expand.
 * @return string the expanded path.
 */
function expandHomeDirectory($path) {
  $homeDirectory = getenv('HOME');
  if (empty($homeDirectory)) {
    $homeDirectory = getenv('HOMEDRIVE') . getenv('HOMEPATH');
  }
  return str_replace('~', realpath($homeDirectory), $path);
}

function getMessage($service,$user,$mId){
	$message = $service->users_messages->get($user, $mId);
	
	$mainload = $message->getPayload();
	$headers = $mainload->getHeaders();
	$subject = getGmailHeader($headers,'Subject');
	$date = getGmailHeader($headers,'Date');
	$to = getGmailHeader($headers,'To');
    $from = getGmailHeader($headers,'From');
    
	if(!$mainload->parts)$mainload->parts = array($mainload);
	
	$text = $html = '';
	foreach($mainload->parts as $payload){
		$mime = $payload->getMimeType();
		$body = $payload->getBody();
        $content = $body->getData();
        $contentDecoded = base64url_decode($content);

        if($mime == 'text/plain'){
            $text = $contentDecoded;
        }
        if($mime == 'text/html'){            
            $html = $contentDecoded;
        }					
	}
	$text = preg_replace("/\n+/"," ",$text);
	$text = preg_replace("/\s+/"," ",$text);	
	$to = preg_replace("/<|>/"," ",$to);
	
	return (object)array(
		'subject'	=> $subject,
		'to'		=> $to,
        'from'      => $from,
		'date'		=> $date,
		'html'		=> $html,
        'remoteId'  => getGmailHeader($headers,'Message-ID'),
		'text'		=> $text
	);	
}

function getMessageOLD($service,$user,$mId){
	$message = $service->users_messages->get($user, $mId);
	
	$mainload = $message->getPayload();
	$headers = $mainload->getHeaders();
	$subject = getGmailHeader($headers,'Subject');
	$date = getGmailHeader($headers,'Date');
	$to = getGmailHeader($headers,'To');
	
	if(!$mainload->parts)$mainload->parts = array($mainload);
	
	$text = $html = '';
	foreach($mainload->parts as $payload){
		$mime = $payload->getMimeType();
		$body = $payload->getBody();
	
		$content = $body->getData();
		$contentDecoded = base64url_decode($content);
		$html .= $contentDecoded;

		$h2t = new html2text($contentDecoded);
		$text .= $h2t->get_text();
	}
	
	if(!$text){
		$text = $html = '';
		foreach($mainload->parts as $payload){
			$mime = $payload->getMimeType();
			$body = $payload->getBody();
			$content = $body->getData();
			if(!$content){
				$parts = $payload->getParts();
				if($parts){
					$body = $parts[0]->getBody();
					$content = $body->getData();
				}
			}
			$contentDecoded = base64url_decode($content);
			$html .= $contentDecoded;
	
			$h2t = new html2text($contentDecoded);
			$text .= $h2t->get_text();
		}
	}
	$text = preg_replace("/\n+/"," ",$text);
	$text = preg_replace("/\s+/"," ",$text);
	
	$to = preg_replace("/<|>/"," ",$to);
	
	return (object)array(
		'subject'	=> $subject,
		'to'		=> $to,
		'date'		=> $date,
		'html'		=> $html,
		'text'		=> $text
	);	
}
function listMessagesPaginated($service, $userId, $q, $pageToken=NULL) {    
	$messages = array();
	$opt_param = array('q'	=> $q);		
	t("Gmail searching...".$pageToken,1);
	try {
		if ($pageToken) {
			$opt_param['pageToken'] = $pageToken;
		}
		$messagesResponse = $service->users_messages->listUsersMessages($userId, $opt_param);
		if ($messagesResponse->getMessages()) {
			$messages = array_merge($messages, $messagesResponse->getMessages());
			$pageToken = $messagesResponse->getNextPageToken();
		}
		else{
			$pageToken = '';
		}
	} catch (Exception $e) {
		return false;
	}			
	return [$messages,$pageToken];
}
function listMessages($service, $userId, $q) {
	$pageToken = NULL;
	$messages = array();
	$opt_param = array(
		'q'	=> $q
	);
	$page = 0;
	do {		
        list($messages,$pageToken) = listMessagesPaginated($service, $userId, $q, $pageToken);
		$page++;
	} while ($pageToken && $page<1000);

	return $messages;
}
function base64url_decode($data) {
    return base64_decode(str_replace(array('-', '_'), array('+', '/'), $data));
}
function getGmailHeader($headers, $name) {
	foreach($headers as $header) {
		if($header['name'] == $name) {
			return $header['value'];
		}
	}
}



//t($service,1);


/*
// Print the labels in the user's account.
$user = 'me';
$results = $service->users_labels->listUsersLabels($user);

if (count($results->getLabels()) == 0) {
  print "No labels found.\n";
} else {
  print "Labels:\n";
  foreach ($results->getLabels() as $label) {
    printf("- %s\n", $label->getName());
  }
}
*/