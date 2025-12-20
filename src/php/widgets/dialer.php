<?php
uselib('twilio::twilio');
$twilio = new Twilio();

usehelper('ajax::dispatch');

function listingAutocomplete(){
	list($q,$zip) = explode("|",$_REQUEST['q']);

	$items = [];
	if($zip){		
		list($lat,$lng) = mysql_fetch_array(mysql_query("SELECT Latitude, Longitude FROM zipcodes WHERE ZipCode='{$zip}'"));
		if(!$lat)err("Zip code not found!");
		$sql = "SELECT *,".
				'(((acos(sin(('.$lat.'*pi()/180)) * sin((lat*pi()/180))+cos(('.$lat.'*pi()/180)) * cos((lat*pi()/180)) * cos((('.$lng.' - lng)*pi()/180))))*180/pi())*60*1.1515) AS distance'."
				FROM listings WHERE last_deal_cache IS NOT NULL AND title LIKE '%$q%' ORDER BY distance ASC LIMIT 5";			 		
	}
	else{
		$sql = "SELECT * FROM listings WHERE last_deal_cache IS NOT NULL AND title LIKE '%$q%' ORDER BY title ASC LIMIT 5";		
	}
	$q = mysql_query($sql);
	while($r = mysql_fetch_assoc($q)){		
		 $items[] = reset(standerizeListing([$r]));
	}
	json(['items'=>$items]);
}
function refreshToken(){
	global $twilio;
	$twilio->refreshToken($_SESSION['user']->id);	
}
function updateNumber(){
	$sid = $_REQUEST['sid'];
	if(!$sid)err("Unexpected Error");

	sql("UPDATE twilio_numbers SET 
				title = '{$_REQUEST['title']}',
				record = '{$_REQUEST['record']}',
				transcribe = '{$_REQUEST['transcribe']}' WHERE remote_id='{$sid}'");
}
function releaseNumber(){
	global $twilio;

	$sid = $_REQUEST['sid'];
	if(!$sid)err("Number is missing!");

	$res = $twilio->releaseNumber($sid);
	if(!$res)err("Unexpected Error");
	else json();
}
function buyNumber(){
	global $twilio;

	$number = $_REQUEST['number'];
	if(!$number)err("Number is missing!");

	$res = $twilio->buyNumber($number);
	if(!$res)err("Unexpected Error");
	else json(['sid'=>$res->id]);
}
function loadCallerIds(){
	global $twilio;

	json(['items'=>$twilio->loadActiveNumbers($_SESSION['user']->type_id)]);
}
function searchNumber(){
	global $twilio;

	$areacode = $_REQUEST['areacode'];

	$number = $twilio->getAvailableNumber($areacode);
	if(!$number)err("No Numbers Found");
	json(['number'=>$number]);
}
function updateTags(){
	global $twilio;

	$sid = $_REQUEST['sid'];
	$tags = $_REQUEST['tags'];
	$listingId = $_REQUEST['lId'];
	if(!$sid)err("Call ID not found!");


	$twilio->setLogTags($sid,$tags,$listingId);
	json();
}
function sendSms(){
	global $twilio;

	$from = $_REQUEST['from'];
	$to = $_REQUEST['number'];
	$body = $_REQUEST['body'];	
	$listingId = $_REQUEST['lId'];	

	if(!$from)err("Call ID not found!");
	if(!$to)err("Invalid Recipient");
	if(!$body)err("Invalid Message");

	$res = $twilio->sendSms($from,$to,$body,$listingId);
	if($res)json();
	else err("Unexpected Error");
}
function toggleCallRecording(){
	global $twilio;

	$sid = $_REQUEST['sid'];
	$status = $_REQUEST['status'];

	if($status) $status = 'in-progress';
	else $status = 'paused';

	$res = $twilio->toggleCallRecording($sid,$status);	
	json(['res'=>($res)?1:0]);
}
function checkCallRecording(){
	global $twilio;

	$sid = $_REQUEST['sid'];
	$res = $twilio->hasRecording($sid);	
	json(['res'=>($res)?1:0]);
}


?>