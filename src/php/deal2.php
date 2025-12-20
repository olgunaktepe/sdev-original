<?php
uselib('deal');
uselib('AWS::s3');
uselib('walkscore');

$dl = new Deal();
$s3 = new S3();
$ws = new Walkscore();

usehelper("ajax::dispatch");

function getCsMarkets(){
	global $dl;

	$lng = $_REQUEST['lng'];
    $lat = $_REQUEST['lat'];
	$id = $_REQUEST['id'];

    if(!$lng || !$lat)err("Missing coordinates!");
	
	$res = [
		'markets' => $dl->getMarkets($lat,$lng),
		'submarkets' => $dl->getSubmarkets($lat,$lng),
	];
	if(!$res['markets'])$res['markets'][] = ['name'=>'No Market'];
	if(!$res['submarkets'])$res['submarkets'][] = ['name'=>'No Submarket'];
	json($res);
}
function getWalkscore(){
	global $ws;

	$lng = $_REQUEST['lng'];
    $lat = $_REQUEST['lat'];
	$id = $_REQUEST['id'];

    if(!$lng || !$lat)err("Missing coordinates!");

	$res = $ws->getScore($lat,$lng);
	json($res);
}
function loadDuplicates(){
	global $dl;
	$lng = $_REQUEST['lng'];
    $lat = $_REQUEST['lat'];
	$id = $_REQUEST['id'];

    if(!$lng || !$lat)err("Missing coordinates!");

	$res = $dl->getDuplicateListings($id, $lat,$lng);
	json(['items'=>$res]);
}
function loadMapAddresses(){
	global $dl;
	$lng = $_REQUEST['center']['lng'];
    $lat = $_REQUEST['center']['lat'];

    if(!$lng || !$lat)err("Missing coordinates!");


    $lat1 = $_REQUEST['box']['lat1'];
    $lng1 = $_REQUEST['box']['lng1'];
    $lat2 = $_REQUEST['box']['lat2'];
    $lng2 = $_REQUEST['box']['lng2'];
    $distance = box2Distance($lat1,$lng1,$lat2,$lng2);
    if(!$distance)err("Unexpected error");
    //t($distance);
        
    $res = $dl->getOaAddresses($lat,$lng,$distance);
	json($res);
}
function loadMapZillowAddresses(){
	global $dl;	
    $box = $_REQUEST['box'];                
    $res = $dl->getZillowAddresses($box);

	$avgSqft = $avgValue = [];

	foreach($res as $r){
		if($r['sqft'])$avgSqft[] = $r['sqft'];
		if($r['value'])$avgValue[] = $r['value'];
	}	
	$avgSqft = ($avgSqft)?array_sum($avgSqft)/count($avgSqft):0;
	$avgValue = ($avgValue)?array_sum($avgValue)/count($avgValue):0;
	$avgPrice = ($avgSqft)?($avgValue/$avgSqft):0;

	$totals = [
		'avg_price' => formatCurrency($avgPrice),
		'avg_value' => formatCurrency($avgValue),
		'avg_sqft' => $avgSqft,
		'total' => count($res)
	];

	json(['items'=>$res, 'summary'=>$totals]);
}

function loadListing(){	
	global $dl,$gmaps, $s3;

	$id = $_REQUEST['id'];

	$q = mysql_query("SELECT * FROM listings WHERE id = '{$id}'");
	$r = mysql_fetch_assoc($q);
	if(!$r)return false;

	$r['data'] = json_decode($r['data']);
	$r['images'] = json_decode($r['images']);
	$listing = (object)$r;
	$standerized = reset(standerizeListing([$listing]));	

	$deal = (object)['listing'=>$listing, 'standerized'=>$standerized];	

	//$listing->lat = '33.577740';
	//$listing->lng = '-117.295580';
	$deal->location = $dl->geocode($listing->lat,$listing->lng);		
	$deal->standerized->geocoded = $deal->location->gmaps[0]->formatted_address;

	$listing->images_urls = [];
	if($listing->images){	
		foreach($listing->images as $image){
			$listing->images_urls[] = $s3->getSignedURL($image);
		}
	}

	if($deal->location->zip){
		//$deal->oa = [];
		//foreach(array(10,30,50) as $d){
		//	$deal->oa[$d] = $dl->getOaAddresses($listing->lat,$listing->lng,$d);
		//}					
		$deal->zillow = $dl->getZillowData($deal->location);
		$deal->census = $dl->getCensusData($deal->location);
	}
	json($deal);
}