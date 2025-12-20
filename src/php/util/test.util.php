<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');
$start = 0;
$options = [];
$csvFile = '/home/sdev/public_html/php/util/options.csv';
$handle = fopen($csvFile, 'w');
do{    
	$found = false;
	$q = mysql_query("SELECT * FROM listings WHERE type='sale' ORDER BY ID DESC LIMIT {$start},10000");    
	while($r = mysql_fetch_assoc($q)){            
		$found = true;
		$r = reset(standerizeListing([$r]));               
		$val = strtolower($r->category);
		if(!$val)continue;

		$cats = explode(",",$val);
		foreach($cats as $cat){
			$cat = trim($cat);
			if(!in_array($cat,$options)){
				$options[] = $cat;
				fputcsv($handle, [$cat]);
			}
		}
	}   
	$start += 10000;    
}while($found);
fclose($handle);
t('stop');


$vals = [];
$cols = [];
$q = mysql_query("SELECT * FROM listings WHERE status='ready' AND type='SALE' ORDER BY id DESC LIMIT 20000");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data'],true);	

	$obj = $data;
	if(!$obj)continue;

	$keys = array_keys($obj);
	if(!$keys)continue;


	//capRate
	//netOperatingIncome

	/*
	if(count($obj['suites'])>0){
		t($obj,1);
		waitforme();		
	}
	*/

	/*
	if($obj['availability']['status']){
		//t($obj['realtorBoards'][0],1);
		$vals[] = $obj['availability']['status'];
	}
	*/

	//if($obj['secondaryCategories'])t($obj['secondaryCategories'],1);
	if($obj['secondaryCategories'])t($obj['secondaryCategories'],1);

	$cols = array_merge($cols,$keys);	
	$cols = array_unique($cols);
	$vals = array_unique($vals);
}
sort($cols);
//t($cols);
t(implode("\n",$vals));

t('a');




uselib('scrapers::loopnet');
$ln = new Loopnet();

uselib('deal');
$dl = new Deal();

$res = $dl->getLeaseInfo('6513238');
t($res);

$q = mysql_query("SELECT * FROM listings WHERE id='6360090'");
while($r = mysql_fetch_assoc($q)){
	t("Processing: {$r['id']}",1);
	$lat = $r['lat'];
	$lng = $r['lng'];
	
	#$res = $dl->checkDuplicateListings($r['id'], $lat,$lng,true,false,true);
	$res = $dl->getDuplicateListingsV2($r['id'],$r['type']);
	t($res,1);
}
t('done');


$res = $dl->getScoreKeys();
t($res);



$res = $dl->getDeal(6248497,false);

$start = time();
$res = $dl->getDuplicateListingsV2('6248497', $res->listing->lat,$res->listing->lng,true);
t("BM: ".(time()-$start),1);

foreach($res as $id=>$r){
	t("{$id}: {$r->address}",1);
	t($r->dupInfo,1);
}
t('stop');

//t($dl->getCsMarkets($res->listing->lat,$res->listing->lng,'markets'));
//t($dl->queryCsMarkets($res->listing->lat,$res->listing->lng,'markets'));

$markets = $dl->getMarkets($res->listing->lat,$res->listing->lng);
t($markets);





uselib('AWS::s3');
$s3 = new S3();
$s3->test();
t('stop');



$dl  = new Deal();
$count = 0;

$perpage = 10;
$offset = 0;
$found = false;
do{
	t("Query...",1);
	//$q = mysql_query("SELECT * FROM listings WHERE status='ready' AND id='3423498' AND timestamp>='2023-05-02 00:00:00'");
	$q = mysql_query("SELECT c.*,l.lat,l.lng FROM deals_cache2 AS c LEFT JOIN listings AS l ON l.id=c.listing_id WHERE c.listing_id>0 ORDER BY c.listing_id ASC LIMIT {$offset},{$perpage}");
	//$q = mysql_query("SELECT c.* FROM deals_cache2 AS c WHERE c.listing_id>0 ORDER BY c.listing_id DESC LIMIT {$offset},{$perpage}");
	while($r = mysql_fetch_assoc($q)){
		$found = true;
		t($r['listing_id'],1);
		t(++$count,1);


		
		$cache = json_decode($r['data']);				
		if(!$cache || !$r['lat'])continue;							
		//if(!$cache)continue;		


		$cache->greatschools = $dl->getGreatschoolsCachables($r['lat'],$r['lng']);
		t("Saving...",1);

		$data = mysql_real_escape_string(json_encode($cache));
		mysql_query("UPDATE deals_cache2 SET data='{$data}' WHERE listing_id='{$r['listing_id']}'");
		if(mysql_error()){
			t(mysql_error(),1);
			t($r['listing_id']);
		}

		
		
		/*
		$cache->poi = $dl->getPoiCachables($r['lat'],$r['lng']);
		t("Saving...",1);

		$data = mysql_real_escape_string(json_encode($cache));
		mysql_query("UPDATE deals_cache2 SET data='{$data}' WHERE listing_id='{$r['listing_id']}'");
		if(mysql_error()){
			t(mysql_error(),1);
			t($r['listing_id']);
		}
		*/
		
		//t($res);		
	}
	$offset += $perpage;
}while($found);
t('done');



$res = $dl->getDeal(3347274,false);

t($dl->getCsMarkets($res->listing->lat,$res->listing->lng,'markets'));
t($dl->queryCsMarkets($res->listing->lat,$res->listing->lng,'markets'));

$markets = $dl->getMarkets($res->listing->lat,$res->listing->lng);
t($markets);



t($res);

$q = mysql_query("SELECT * FROM listings WHERE timestamp>='2023-03-14' AND status='ready' AND last_deal_cache IS NOT NULL");
while($r = mysql_fetch_assoc($q)){
	t($r['id'],1);
	mysql_query("DELETE FROM deals_cache WHERE type IN ('markets','submarkets') AND listing_id='{$r['id']}'");	
	$dl->getDeal($r['id'],false);
}
t('done');


$q = mysql_query("SELECT * FROM deals_cache WHERE type='submarkets' AND listing_id='2665968' ORDER BY id DESC LIMIT 1");
//$q = mysql_query("SELECT * FROM deals_cache WHERE type='markets' ORDER BY id DESC LIMIT 500");
while($r = mysql_fetch_assoc($q)){
	t('Listing ID: '.$r['listing_id'],1);

	$data = json_decode($r['data']);
	t("Matched: ".$data[0]->remote_id,1);

	list($lat,$lng) = mysql_fetch_array(mysql_query("SELECT lat,lng FROM listings WHERE id='{$r['listing_id']}'"));
	$markets = $dl->getCsMarkets($lat,$lng,'submarkets');
	t($markets);

	if($data[0]->remote_id != $markets[0]->remote_id){
		t('nope',1);
		waitforme();
	}
}
t('stop');







$q = $mysqli->query("SELECT l.*, dd.status AS deal_status, dd.data AS deal_data FROM listings AS l 
LEFT JOIN deals_data AS dd ON dd.listing_id=l.id
WHERE l.id = '500'");
$r = mysql_fetch_assoc($q);    
t($r);



uselib('php-parallel::parallel');    
$Parallel = new Parallel\Parallel(new \Parallel\Storage\RedisStorage(['server' => 'tcp://127.0.0.1:6379']));
$time = microtime(true);
$Parallel->run('foo', function() {sleep(4);return ['hello' => 'world'];});
$Parallel->run('obj', function() {sleep(4);return (object) ['a' => 1, 'b' => 2, 'c' => 3];});
$result = $Parallel->wait(['foo', 'obj']);
t($result,1);
t(microtime(true) - $time);



uselib('scrapers::ce');
$sc = new CE();
$res = $sc->pingListing('63fd372488efc300067d2358');
t($res);

exit();

/*
$file = 'contacts.csv';
if (($handle = fopen($file, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 100000, ",")) !== FALSE) {	 		
        if(!$headers){ $headers=$data; continue; }		

        $obj = [];
        foreach($data as $k=>$v)$obj[preg_replace("/[^0-9A-Za-z\s-]/","",strtolower($headers[$k]))]=$v;

		if(!$obj['source'])$obj['source'] = 'import';

		$item = [
			'source' => $obj['source'],
			'type' => $obj['category'],
			'subtype' => $obj['vendor subcategory'],
			'title' => $obj['title'],
			'name' => implode(" ",array_filter([$obj['first name'],$obj['middle name'],$obj['last name']])),
			'company' => $obj['company'],
			'address' => $obj['address 1 - street'].' '.$obj['address 1 - street 2'],
			'city' => $obj['address 1 - city'],
			'state' => $obj['address 1 - state'],
			'zip' => $obj['address 1 - postal code'],
			'website' => $obj["website 1 - value"]
		];

		$entries = [];
		if($obj["primary email"]){
			$entries[] = [
				'type'	=> 'email',
				'value' => $obj["primary email"],
				'title' => '',
			];
		}
		if($obj["secondary email"]){
			$entries[] = [
				'type'	=> 'email',
				'value' => $obj["secondary email"],
				'title' => 'Secondary',
			];
		}
		if($obj["phone 1 - value"]){
			$entries[] = [
				'type'	=> 'phone',
				'value' => $obj["phone 1 - value"],
				'title' => $obj["phone 1 - type"],
			];
		}
		if($obj["phone 2 - value"]){
			$entries[] = [
				'type'	=> 'phone',
				'value' => $obj["phone 2 - value"],
				'title' => $obj["phone 2 - type"],
			];
		}

		$insertsql = [];
		foreach($item as $k=>$v)$insertsql[] = "{$k} = '".mysql_real_escape_string($v)."'";
		mysql_query("INSERT INTO deals_contacts SET ".implode(",",$insertsql));

		$cId = mysql_insert_id();
		if(!$cId)err("can't create contact");

		foreach($entries as $e){
			$e['contact_id'] = $cId;
			$insertsql = [];
			foreach($e as $k=>$v)$insertsql[] = "{$k} = '".mysql_real_escape_string($v)."'";
			mysql_query("INSERT INTO deals_contacts_entries SET ".implode(",",$insertsql));
		}
            
	}
}
t('done');
*/





$tw = new Twilio();
//$number = $tw->toggleCallRecording('CAe74d4d47aeb76de6009dcf30406832d4',false);	
$number = $tw->isCallRecording('CAcebc8a36256c998d660da196221e89d3');	
t($number);

uselib('deal');
$dl = new Deal();

$res = $dl->getDeal('2042102');
t($res);

$cutoff = 10;
$q = mysql_query("SELECT * FROM listings WHERE id='1928625'");
while($r = mysql_fetch_assoc($q)){
    mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE id='{$r['id']}'");
    t("Processing {$r['id']} - {$r['timestamp']}",1);
    
    $deal = $dl->getDeal($r['id'],false);
	
    mysql_query("UPDATE listings SET type='{$deal->standerized->type}' WHERE id='{$r['id']}'");
    t("BM: ".(time()-$start),1);
}
t('a');




$tw = new Twilio();
$q = mysql_query("SELECT * FROM twilio_log ORDER BY id DESC");
while($r = mysql_fetch_assoc($q)){
	$res = $tw->autotagLog($r['id']);
	t($res,1);
}
t('done');

uselib('deal');
$dl = new Deal();

$q = mysql_query("SELECT * FROM listings WHERE status='ready' AND last_deal_cache IS NULL AND source='loopnet.com'");
while($r = mysql_fetch_assoc($q)){
    mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE id='{$r['id']}'");
    t("Processing {$r['id']} - {$r['timestamp']}",1);

    $start = time();
    $deal = $dl->getDeal($r['id']);

    mysql_query("UPDATE listings SET type='{$deal->standerized->type}' WHERE id='{$r['id']}'");
    t("BM: ".(time()-$start),1);
}
t('done');


$q = mysql_query("SELECT l.*, dd.status AS deal_status, dd.data AS deal_data FROM listings AS l 
                            LEFT JOIN deals_data AS dd ON dd.listing_id=l.id
                            WHERE l.source='loopnet.com' AND l.status='ready'");
$r = mysql_fetch_assoc($q);            
$r['data'] = json_decode($r['data']);
$r['images'] = json_decode($r['images']);
$listing = (object)$r;
$standerized = reset(standerizeListing([$listing]));

t($standerized);




uselib('scrapers::loopnet');
$ln = new Loopnet();


uselib('deal');
$dl = new Deal();


$deal = $dl->getDeal('1385344');

//$res = $ln->scrape();
$res = $ln->process('27536307');
t($res);
t('done');




uselib('twilio::twilio');
$tw = new Twilio();

//$res = $tw->lookup('3237158388');
$res = $tw->getConverenceRecording('CFe37ba5213b59aa85dfe82070d51b68f2');
t($res);



$ct = new Contacts();
$res = $ct->identifyPhone('+14048821569');
t($res);




uselib('scrapers::ce');
$sc = new CE();
$res = $sc->getListingDetails('639a8be509a9550008d43438');
t($res);


$l = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='1420371'"));
$res = reset(standerizeListing([$l]));
t($res->created_on);





$q = mysql_query("SELECT * FROM `listings_flags`");
while($r = mysql_fetch_assoc($q)){	
	$status = '';
	if($r['up']){ $status = 'Potential Buy'; }
	if($r['heart']){ $status = 'Favorites'; }
	if($r['down']){ $status = 'Bad Deal'; }

	if($status){
		mysql_query("INSERT INTO deals_data SET listing_id='{$r['listing_id']}', status='{$status}'");
	}
}
t('Done');


$vals = [];
$cols = [];
$q = mysql_query("SELECT * FROM listings WHERE source='crexi.com' AND status='ready' AND remote_id IN ('985882','985823','985799','985797') ORDER BY id DESC LIMIT 1000");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data'],true);	

	$obj = $data;
	if(!$obj)continue;

	$keys = array_keys($obj);
	if(!$keys)continue;


	//capRate
	//netOperatingIncome

	if($obj['thirdPartyProvider']){
		//t($obj['realtorBoards'][0],1);
		$vals[] = $obj['thirdPartyProvider'];
	}

	//if($obj['secondaryCategories'])t($obj['secondaryCategories'],1);

	$cols = array_merge($cols,$keys);	
}
$cols = array_unique($cols);
sort($cols);
//t($cols);

$vals = array_unique($vals);
t(implode("\n",$vals));

t('a');



uselib('deal');
$dl = new Deal();

$deal = $dl->getDeal('1385344');

$loc = $deal->location;
$cityZips = $dl->getCityZips2($loc->zip);
t(implode(",",$cityZips));
t($cityZips);


//t($dl);
$res = $dl->getCensusPopulation($deal->location);  
//t(implode(",",$res));

t('stop');




uselib('twilio::twilio');
$twilio = new Twilio();

$res = $twilio->createConferenceRoom('+14048821569','+13237158388','+19516001963');
t($res);



$ct = new Contacts();
$res = $ct->getDealContacts('688075');
t($res);



uselib('scrapers::crexi');
$sc = new Crexi();
$token = $sc->getToken('johnsm2332@camcastemail.com','sunshine3443');
t("Token: ".$token,1);
waitforme();
$sc->setToken($token);
$res = $sc->getBrokerProfile('christopherpap');

t($res);



uselib('twilio::twilio');
$twilio = new Twilio();
$res = $twilio->getRecording('REda1f151c169fa04bf134a26ead6bdcb7');
t($res);


sleep(10);
t('aaa');



uselib('scrapers::crexi');
$sc = new Crexi();
$res = $sc->process('871024');
t($res);



$l = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='805003'"));
$res = reset(standerizeListing([$l]));
t($res);




uselib('deal');
$dl = new Deal();


$res = $dl->getListingUpdates('378083');
t($res);
t('stop');


//Find listing overlaps
$prev = '';
$count = 0;
$q = mysql_query("SELECT * FROM `listings` ORDER BY `listings`.`lng` DESC LIMIT 10000");
while($r = mysql_fetch_assoc($q)){
	$count++;	
	if($count == 1){
		$prev = $r;
		continue;
	}


	$lat1 = $r['lat'];
    $lng1 = $r['lng'];
    $lat2 = $prev['lat'];
    $lng2 = $prev['lng'];

	//t("Point1: ".$lat1.','.$lng1,1);
	//t("Point2: ".$lat2.','.$lng2,1);

    $distance = box2Distance($lat1,$lng1,$lat2,$lng2);	
	if($distance < 0.5){
		t($distance,1);
		t("{$r['source']}: {$r['remote_id']}",1);
		t("{$prev['source']}: {$prev['remote_id']}",1);
		t("--------------",1);

		if($r['source'] != $prev['source'] && $prev['source'] != 'lease-crexi.com' && $r['source'] != 'lease-crexi.com'){
			t('FOUND!',1);
			WaitForMe();
		}
	}
	$prev = $r;
}

t('stop');






uselib('deal');
$res = Deal::getAddressCoordinates('21338 Paseo Montan, Murrieta, CA 92562');
t($res);


uselib('scrapers::crexi');
$cx = new Crexi('lease');


$start = '2021-07-02';
$end = 'today';

for ( $i = strtotime($start); $i <= strtotime($end); $i = $i + 86400 ) {	
	$sstart = date( 'Y-m-d', $i );	
	$cx->startScrapeTest($sstart);		
}
t('stp');



$cols = [];
$q = mysql_query("SELECT * FROM listings WHERE source='crexi.com' AND status='ready' ORDER BY id DESC LIMIT 100");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data'],true);
	if(!$data['broker'])continue;
	$keys = array_keys($data['broker'][0]);
	if(!$keys)continue;

	$cols = array_merge($cols,$keys);	
}
$cols = array_unique($cols);
t($cols);

t('a');




$lastId = 0;
do{
	$found = false;
	$q = mysql_query("SELECT * FROM listings WHERE type='' AND status='ready' AND id>$lastId ORDER BY id ASC LIMIT 10000");
	while($r = mysql_fetch_assoc($q)){		
		$lastId = $r['id'];
		$found = true;
		$r['data'] = json_decode($r['data']);
		$r['images'] = json_decode($r['images']);
		$listing = (object)$r;
		$res = reset(standerizeListing([$listing]));				
		if(!$res->type)continue;

		t("UPDATE listings SET type='{$res->type}' WHERE id='{$r['id']}'",1);
		mysql_query("UPDATE listings SET type='{$res->type}' WHERE id='{$r['id']}'");
	}
}while($found);
t('stop');





uselib('benchmarks');
$bm = new Benchmarks();

$zip = '01001';
$res = $bm->getZORI($zip);
t($res);

t('stop');

function normalize($value, $min, $max) {
	$normalized = ($value - $min) / ($max - $min);
	return $normalized;
}
function calculate_median($arr) {
    $count = count($arr); //total numbers in array
    $middleval = floor(($count-1)/2); // find the middle value, or the lowest middle value
    if($count % 2) { // odd number, middle is the median
        $median = $arr[$middleval];
    } else { // even number, calculate avg of 2 medians
        $low = $arr[$middleval];
        $high = $arr[$middleval+1];
        $median = (($low+$high)/2);
    }
    return $median;
}





$cols = [];
$q = mysql_query("SELECT * FROM listings WHERE source='century21.com' AND status='ready' ORDER BY id DESC LIMIT 10000");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data'],true);	
	//if($data["data-card-data"]["size_sqft"])t($data["data-card-data"]["size_sqft"],1);

	$keys = array_keys($data['features']);
	if(!$keys)continue;

	$cols = array_merge($cols,$keys);	
}
$cols = array_unique($cols);
t($cols);





$cols = [];
$q = mysql_query("SELECT * FROM listings WHERE source='crexi.com' AND status='ready' ORDER BY id DESC LIMIT 10000");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data'],true);
	if(!$data['Details'])continue;
	$keys = array_keys($data['Details']);
	if(!$keys)continue;

	$cols = array_merge($cols,$keys);	
}
$cols = array_unique($cols);
t($cols);

t('a');

$cols = [];
$q = mysql_query("SELECT * FROM listings WHERE source='commercialexchange.com' AND status='ready' ORDER BY id DESC LIMIT 10000");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data'],true);	
	$obj = $data['building']['buildings']['physicalCharacteristics'];
	if(!$obj)continue;


	$keys = array_keys($obj);
	if(!$keys)continue;

	$cols = array_merge($cols,$keys);	
}
$cols = array_unique($cols);
t($cols);




$listing = reset(standerizeListing([(object)['source'=>'test']]));
$res = falttenObject($listing);
t($res);

function falttenObject($obj,$parent=''){
    $items = [];
    foreach($obj as $k=>$v){
		$subk = implode('-',array_filter([$parent,$k]));
        if(is_object($v)) $items = array_merge($items,falttenObject($v,$subk));
        else{
            if(is_array($v)){
				$type = 'array';
				if($v[0])$items = array_merge($items,falttenObject($v[0],$subk));
			}
            else $type = 'str';

            $items[] = ['key'=>$subk, 'type'=>$type];
        }
    }
    return $items;
}

uselib('deal');
$dl = new Deal();

$lat = '33.886113294331';
$lng = '-118.08142024239';

//$lat = '34.04602170142056';
//$lng = '-118.24341835510265';

$res = $dl->getMarkets($lat,$lng);
//$res = $dl->getSubmarkets($lat,$lng);
t($res);

uselib('walkscore');
$ws = new Walkscore();

$lat = '34.145443';
$lng = '-118.2291';
$res = $ws->getScore($lat,$lng);
t($res);

t('a');


$q = mysql_query("SELECT * FROM listings WHERE source='commercialexchange.com' AND lng=''");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data']);
	
	$types[] = $type;
}
$types = array_unique($types);
t($types);
t('done');




uselib('zillow::zillow');
$zl = new Zillow();

$res = $zl->search();
t($res);

t('Done');




uselib('AWS::s3');
$s3 = new S3();
$s3->test();
t('stop');



uselib('scrapers::ce');
$sc = new CE();

$q = mysql_query("SELECT * FROM listings WHERE source='commercialexchange.com' AND status='ready' AND lat='' ORDER BY id DESC LIMIT 10000");
while($r = mysql_fetch_assoc($q)){
	$obj = $sc->getListingDetails($r['remote_id']);
			
	$url = $listingUrl = 'https://www.commercialexchange.com/listing/'.$obj->publicId;

	$lng = $obj->building->location->geopoint->longitude;
	$lat = $obj->building->location->geopoint->latitude;

	$data = mysql_real_escape_string(json_encode($obj));
	mysql_query("UPDATE listings SET data='{$data}', lng='{$lng}', lat='{$lat}'  WHERE url='{$url}'");
}
t('stop');


do{
	$found = false;
$q = mysql_query("SELECT * FROM listings WHERE source='commercialexchange.com' AND status='ready' AND lat='' AND id<45 ORDER BY id DESC LIMIT 10000");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data']);
	$found = true;

	$lng = $data->building->location->geopoint->longitude;
	$lat = $data->building->location->geopoint->latitude;

	$sql = "UPDATE listings SET lat='{$lat}', lng='{$lng}' WHERE id='{$r['id']}'";
	t($sql,1);
	mysql_query($sql);
}
}while($found);
t('done');

uselib('scrapers::ce');
$sc = new CE();
$res = $sc->getListingDetails('624b52592c1c690009ca1d29');
t($res->building->location->geopoint->longitude);


uselib('scrapers::crexi');
$ce = new Crexi();

$ce->scrape();
t('done');






//broker|agent
///modifiedDate|UpdatedOn|modifiedByUserDate|modifiedCoreFieldDate
/*
$q = mysql_query("SELECT DISTINCT patch_id FROM listings_updates_operations WHERE operation='replace' AND (path LIKE '/images/%' OR path LIKE '/media/%')");
while(list($pId) = mysql_fetch_array($q)){
	t($pId,1);
	//mysql_query("DELETE FROM listings_updates WHERE id='{$pId}'");
	mysql_query("DELETE FROM listings_updates_operations WHERE patch_id='{$pId}'");
}
t('Done');
*/

$count = 0;
$q = mysql_query("SELECT DISTINCT patch_id FROM listings_updates_operations");
while(list($pId) = mysql_fetch_array($q)){
	$count++;
	t("------------->Progress: {$count}",1);
	list($found) = mysql_fetch_array(mysql_query("SELECT id FROM listings_updates WHERE id='{$pId}'"));
	if(!$found){
		t("Deleting...",1);
		mysql_query("DELETE FROM listings_updates_operations WHERE patch_id='{$pId}'");
	}
	else{
		t("Skipping...",1);
	}
}
t('done');


uselib('scrapers::crexi');
$sc = new Crexi();
$res = $sc->process('796242');
t($res);


uselib('scrapers::century');
$ce = new Century();

$ce->scrape();
t('done');

//$pending = $ce->getAllPending();
//t("Pending: ".count($pending),1);
//$p = reset($pending);	
//t($p);

//$ce->process('C2182454437');
//t('stop');


t('off');




$source = 'commercialexchange.com';
unlink($source.'.csv');
$fp = fopen($source.'.csv', 'w');

$cols = array();
$q = mysql_query("SELECT * FROM `listings` WHERE timestamp>'2021-01-01' AND source='{$source}' LIMIT 10000");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data']);
	
	$data->media = '';
	
	$res = array();
	flattenObject($data,$res);
	
	$cols = array_merge($cols,array_keys($res));
	$cols = array_unique($cols);
	
	t(count($cols),1);
	
	
	//fputcsv($fp, $fields);
				
}
t($cols);
fclose($fp);
t('stop');

function flattenObject($data,&$array,$parentKey=''){
	if(!$data)return false;
	
	foreach($data as $k=>$v){
		$mainkey = join(".",array_filter(array($parentKey,$k)));
		
		if(is_object($v)){
			flattenObject($v,$array,$mainkey);
		}
		else if(is_array($v)){
			foreach($v as $k2=>$v2){				
				flattenObject($v2,$array,$mainkey.$k2);
			}
		}
		else if(is_string($v) || is_float($v)  || is_int($v) || is_bool($v)){			
			$value = $v;
			$array[$mainkey] = $value;
		}
		else{
			t('aaaaaaaaaaaaaaaa');
		}
	}	
}








uselib('scrapers::ce');
$sc = new CE();

$remoteId = '10978406';
$sc->process($remoteId);



t('off');







uselib('scrapers::crexi');
$cr = new Crexi();

$q = mysql_query("SELECT * FROM listings WHERE source='crexi.com'");
while($r = mysql_fetch_assoc($q)){	
	$data = json_decode($r['data']);
	if(!$data->broker){		
		t($r['url'],1);
		
		$res = $cr->getListingBroker($r['id']);
		if($res){
			$data->broker = $res;
			$data = mysql_real_escape_string(json_encode($data));						
			mysql_query("UPDATE listings SET data='{$data}' WHERE id='{$r['id']}'");
			t('fixed...',1);
		}
		else{
			t($res,1);
		}
	}		
}
t('a');



$nospace = 0;
$count = 0;
$chunk = 500;
$page = 0;
do{
	$found = false;
	$offset = $page*$chunk;
	t("LIMIT {$offset},{$chunk}",1);
		
	$q = mysql_query("SELECT * FROM listings LIMIT {$offset},{$chunk}");
	while($r = mysql_fetch_assoc($q)){	
		$found = true;
		convertListing($r);
	}
	$page++;
}while($found);
t('done');


function convertListing($r){	
	global $nospace;
	
	t("Remote ID: ".$r['remote_id'],1);
	
	if($r['source'] == 'commercialexchange.com'){		
		if($r['data']){
			$data = json_decode($r['data']);
			$space = false;
			//if(count($data->listedSpaces)>1){
				foreach($data->listedSpaces as $s){
					if($s->id == $r['remote_id']){
						$space = $s;
						break;
					}
				}
			//}
			if(!$space){ $nospace++; t("----------------------------------> Space not found. ({$nospace})",1); return false; }
			
			unset($data->media);
			unset($data->listedSpaces);
			$space->building = $data;
			//t($space);
			$r['data'] = json_encode($space);
			$r['public_id'] = $space->publicId;
			$r['title'] = $r['title'].' - '.$space->title;
		}						
		$r['url'] = $r['listing_url'];	
	}
	else{
		$r['public_id'] = $r['remote_id'];
	}
	
	unset($r['listing_url']);		
	unset($r['id']);

	$insertsql = array();
	foreach($r as $k=>$v)$insertsql[] = "`$k`='".mysql_real_escape_string($v)."'";
	mysql_query("INSERT INTO listings_v2 SET ".implode(",",$insertsql));
}











uselib('scrapers::score');

$sc = new Score();



	$offset = $page*$chunk;	
	$q = mysql_query("SELECT * FROM listings WHERE source='commercialexchange.com' AND timestamp>='20201-01-01' ORDER BY id DESC  LIMIT 10000");
	while($r = mysql_fetch_assoc($q)){
		$found = true;
		$count++;
		t("Progress-----> {$count}",1);

		$lng = $r['lng'];
		$lat = $r['lat'];
		if(!$lng || !$lat)continue;
			
		t($r['remote_id'],1);
		$res = $sc->getScore($lat,$lng);
		t($res->updatedAt,1);
		t("----------------",1);


	}

t('done');



$res = $sc->getScore('30.711143','-88.170681');
t($res);

uselib('scrapers::crexi');
$cr = new Crexi();


uselib('scrapers::ce');
$ce = new CE();

$count = 0;
$chunk = 500;
$page = 0;
do{
	$found = false;
	
	$offset = $page*$chunk;
	t("LIMIT {$offset},{$chunk}",1);
	$q = mysql_query("SELECT * FROM listings WHERE status='ready' ORDER BY id DESC LIMIT {$offset},{$chunk}");	
	while($r = mysql_fetch_assoc($q)){
		$found = true;
		$count++;
		t("Progress-----> {$count}",1);
		
		$lng = $r['lng'];
		$lat = $r['lat'];		
		if(!$lng || !$lat)continue;
													
		t($r['remote_id'],1);
		$res = $sc->getScore($lat,$lng);
		t($res->updatedAt,1);		
		t("----------------",1);
		
		
	}
	
	$page++;
	
}while($found);
t('done');

$sc->process('5ee3b5cc274734000643a738');

$rId = '5ad10eb79a47ff0001b78fd2';
$res = $sc->getListingDetails($rId);

$listingUrl = '';
foreach($res->listedSpaces as $s){
	if($s->id == $rId){
		$listingUrl = 'https://www.commercialexchange.com/listing/'.$s->publicId;
	}
}
t($listingUrl);
//t($cr->scrapeUpdatedListings());

#$cr->process('542378');
t('stop');




$date = date('Y-m-d H:i:s',strtotime('now'));
$q = mysql_query("SELECT * FROM listings WHERE source='crexi.com' AND status='ready'");
while($r = mysql_fetch_assoc($q)){
	$data = json_decode($r['data']);
	if(!$data->ActivatedOn)
		continue;
	if(strtotime($data->ActivatedOn) < strtotime($date))$date = $data->ActivatedOn;
	
	t($date,1);
}
t('done');



uselib('scrapers::crexi');
$cr = new Crexi();

t($cr->scrapeUpdatedListings());

//$cr->process('538452');
t('stop');



t('stop');


/*
uselib('AWS::s3');
$s3 = new S3();
$file = '/var/www/html/tmp/test.PNG';

$s3->test($file);
t('stop');
*/



uselib('scrapers::ce');
$sc = new CE();


//$pending = $sc->getAllPending();
//t("Pending: ".count($pending),1);
//$p = reset($pending);	
//t($p);

$sc->process('5d9cf28911500700017c2dfb');
t('stop');



//$sc->scrape(30,true);
//$sc->scrape(1000);
#$sc->logUpdate('5f9c5e4874d7680001899404');
//$sc->logUpdate('5cb73b1b111a950001b88b37');
t('exit');