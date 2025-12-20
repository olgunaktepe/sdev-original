<?php
uselib('deal');
uselib('AWS::s3');
uselib('walkscore');

$dl = new Deal();
$s3 = new S3();
$ws = new Walkscore();
$ct = new Contacts();

usehelper("ajax::dispatch");

function removeVersion(){
	$id = $_REQUEST['id'];
	sql("DELETE FROM deals_versions WHERE id='{$id}'");
}
function getDealVersions(){
	global $dl,$gmaps, $s3;

	$id = $_REQUEST['id'];
	$lng = $_REQUEST['lng'];
	$lat = $_REQUEST['lat'];
	if(!$id || !$lng || !$lat)err("Unexpected Error");
	
    $deal = $dl->getDeal($id,false);    			
	if(!$deal)err("Unable to get deal");
		
	$updates = $dl->getListingUpdates($id,true);			
	$dups = $dl->getDuplicateListings($id, $lat,$lng);
	
	$versions = [];
	foreach($dups as $d){
		$source = $d->source;
		if(!$versions[$source])$versions[$source] = [];
		$ddeal = $dl->getDeal($d->id,false);
		$item = ['id'=>uniqid(), 'item'=>$ddeal, 'timestamp'=>xTimeAgo($ddeal->listing->timestamp,'now'), 'title'=>$d->title, 'updates'=>[]];		

		$dupdates = $dl->getListingUpdates($d->id,true);
		foreach($dupdates as $u){
			$mdeal = $dl->getDeal($d->id,false,$u->data);
			if($mdeal)$item['updates'][] = ['id'=>uniqid(), 'timestamp'=>xTimeAgo($u->timestamp,'now'), 'item'=>$mdeal];			
		}

		$versions[$source][] = $item;
	}
	$versions[$deal->standerized->source] = [['id'=>'default', 'item'=>$deal, 'timestamp'=>xTimeAgo($deal->listing->timestamp,'now'), 'title'=>$deal->standerized->title, 'updates'=>[]]];	
	foreach($updates as $u){
		$mdeal = $dl->getDeal($d->id,false,$u->data);
		if($mdeal)$versions[$deal->standerized->source][0]['updates'][] = ['id'=>uniqid(), 'timestamp'=>xTimeAgo($u->timestamp,'now'), 'item'=>$mdeal];	
	}

	$defaultVersion = $dl->getDefaultVersion($id);
	$overrideVersions = $dl->getDealVersionsData($id);		
	if($overrideVersions){
		$versions['Manual Overrides'] = [];				
		foreach($overrideVersions as $v){
			$odeal = $dl->applyVersion($deal,$v);			
			$versions['Manual Overrides'][] = ['id'=>uniqid(), 'default'=>($v->id==$defaultVersion)?1:0, 'localId'=>$v->id, 'item'=>$odeal, 'timestamp'=>xTimeAgo($v->timestamp,'now'), 'title'=>$odeal->standerized->title, 'editable'=>1, 'updates'=>[]];
		}
	}

	json($versions);	
}
function getVersionFields($type,$deal){
	$fields = [];
	switch ($type){
		case 'listing_info':
			$fields[] = (object)['key'=>'standerized.title','label'=>'Title','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.type','label'=>'Type','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.address','label'=>'Address','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.city','label'=>'City','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.state','label'=>'State','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.zip','label'=>'Zipcode','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.category','label'=>'Category','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.subtype','label'=>'Subtype','type'=>'text'];
			$fields[] = (object)['key'=>'standerized.price','label'=>'Price','type'=>'number'];
			$fields[] = (object)['key'=>'standerized.sqft','label'=>'Sqft','type'=>'number'];
			$fields[] = (object)['key'=>'standerized.acres','label'=>'Acres','type'=>'number'];			
			$fields[] = (object)['key'=>'standerized.buildings_sqft','label'=>'Building Sqft','type'=>'number'];
			$fields[] = (object)['key'=>'standerized.NOI','label'=>'NOI','type'=>'number'];
			$fields[] = (object)['key'=>'standerized.cap_rate','label'=>'CAP Rate','type'=>'number'];
			break;
		default:
			break;
	}

	foreach($fields as $k=>$f){
		$fields[$k]->value = getKeyValue($deal,$f->key);
		if($f->type == 'number')$fields[$k]->value = preg_replace("/[^0-9\-\.]/","",$fields[$k]->value);
	}

	return $fields;
}
function setDefaultVersion(){
	global $dl;
	$lId = $_REQUEST['listing_id'];
	$id = $_REQUEST['id'];

	$dl->setDefaultVersion($lId,$id);
	json();
}
function createVersion(){
	global $dl;
	$lId = $_REQUEST['listing_id'];
	$id = $_REQUEST['id'];
	
	if(!$_POST['data'])err("No data overriden!");

	$data = mysql_real_escape_string(json_encode($_POST['data']));

	if($id){
		$sql = "UPDATE deals_versions SET data='{$data}' WHERE id='{$id}'";
	}
	else{
		$sql = "INSERT INTO deals_versions SET listing_id='{$lId}', user_id='{$_SESSION['user']->id}', data='{$data}'";
	}
	mysql_query($sql);
	if(mysql_error())err(mysql_error());

	if(!$id)$id = mysql_insert_id();
	$dl->setDefaultVersion($lId,$id);
	json();
}
function updateStatus(){
	$id = $_REQUEST['id'];
	$status = $_REQUEST['status'];

	mysql_query("INSERT INTO deals_data SET status='{$status}',listing_id='{$id}' ON DUPLICATE KEY UPDATE status='{$status}'");	
	$error = mysql_error();
	if($error)err($error);

	json(['status'=>$status]);
}
function flag(){
    $flag = $_REQUEST['flag'];
    $id = $_REQUEST['id'];
    if(!$id || !in_array($flag,['heart','up','down']))err("Unexpected Error");

    list($found) = mysql_fetch_array(mysql_query("SELECT id FROM listings_flags WHERE listing_id='{$id}'"));
    if($found)
        mysql_query("UPDATE listings_flags SET {$flag}=1-{$flag} WHERE listing_id='{$id}'");
    else
		mysql_query("INSERT INTO listings_flags SET {$flag}=1, listing_id='{$id}'");

	$flags = mysql_fetch_assoc(mysql_query("SELECT * FROM listings_flags WHERE listing_id='{$id}'"));
	if($flags) $flags = (object)$flags;
	json(['flags'=>$flags]);
}
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
function loadTimeline(){
	global $dl;
	$lng = $_REQUEST['lng'];
    $lat = $_REQUEST['lat'];
	$id = $_REQUEST['id'];

    if(!$lng || !$lat)err("Missing coordinates!");
	
	$listing = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$id}'"));	
	$formatted = reset(standerizeListing([$listing]));		

	$updates = $dl->getListingUpdates($id);

	$events = [];	
	$events[] = ['type'=>'event','timestamp'=>$formatted->created_on,'title'=>'Listing Created','description'=>"Listing created on <a href='{$formatted->url}' target='_blank'>{$formatted->source}</a><br>{$formatted->title}<br>{$formatted->address}",'icon'=>''];
	if($updates){		
		foreach($updates as $u){									
			$changes = [];
			$count = 0;				
			foreach($u->ops as $p){
				if($p->operation == 'test')continue;
				//if(!is_numeric($p->value))$p->value = '';
				//$changes[] = "<div class='badge badge-sm badge-secondary'>{$p->operation} {$p->path} {$p->value_new}</div>";
				$color = 'secondary';
				if($p->operation == 'add') $color = 'success';
				if($p->operation == 'remove') $color = 'danger';				
				$changes[] = "<div class='badge badge-sm badge-{$color}'>{$p->operation} {$p->path}</div>";
				$count++;
			}
			if(!$count)continue;
			$desc  = "{$count} updates detected<br>".implode("<br>",$changes);			
			$events[] = ['type'=>'event','timestamp'=>$u->timestamp,'title'=>'Listing Update','description'=>$desc,'icon'=>''];
		}
	}	

	//Dups
	$dups = $dl->getDuplicateListings($id, $lat,$lng);
	if($dups){
		foreach($dups as $d){							
			$df = $d;
			if($df->url){				
				$desc = "Duplicate listing created on <a href='{$df->url}' target='_blank'>{$df->source}</a><br>{$df->title}<br>{$df->address}<br><a href='/site/deal3?id={$df->id}' target='_blank'>View Deal</a>";
			}
			else{
				$desc = "Duplicate listing created on {$df->source}</a><br>Details not avaialble";
			}				
			$events[] = ['type'=>'event','timestamp'=>$df->created_on,'title'=>'Possible Duplicate Listing Created','description'=>$desc,'icon'=>''];					

			$updates = $dl->getListingUpdates($d->id);
			if($updates){
				foreach($updates as $u){
					$changes = [];
					$count = 0;				
					foreach($u->ops as $p){
						if($p->operation == 'test')continue;
						//if(!is_numeric($p->value))$p->value = '';
						//$changes[] = "<div class='badge badge-sm badge-secondary'>{$p->operation} {$p->path} {$p->value_new}</div>";
						$color = 'secondary';
						if($p->operation == 'add') $color = 'success';
						if($p->operation == 'remove') $color = 'danger';				
						$changes[] = "<div class='badge badge-sm badge-{$color}'>{$p->operation} {$p->path}</div>";
						$count++;
					}
					if(!$count)continue;
					$desc  = "{$count} updates detected<br>".implode("<br>",$changes);			
					$events[] = ['type'=>'event','timestamp'=>$u->timestamp,'title'=>'Duplicate Listing Update','description'=>$desc,'icon'=>''];					
				}
			}
		}
	}
	usort($events,function($a,$b){ return strtotime($a['timestamp'])<strtotime($b['timestamp']); });
	foreach($events as $i=>&$e){ 
		$e['timestamp_ago']=xTimeAgo($e['timestamp'],'now');
		$e['timestamp'] = date('m/d/y - h:iA',strtotime($e['timestamp']));
		if($i%2 == 0) $e['alt'] = 'alt';

	}
	json(['events'=>$events]);
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
    $deal = $dl->getDeal($id,false);    			
	if(!$deal)err("Unable to get deal");
	$deal->standerized->geocoded = $deal->location->gmaps[0]->formatted_address;

	$deal->listing->images_urls = [];
	if($deal->listing->images){	
		foreach($deal->listing->images as $image){
			$deal->listing->images_urls[] = $s3->getSignedURL($image);
		}
	}	
	json($deal);
}

//Contacts
function getContactsTypes(){
	$items = [];
	$q = mysql_query("SELECT DISTINCT type FROM deals_contacts");
	while(list($r) = mysql_fetch_array($q))if($r)$items[] = $r;
	return $items;
}
function removeContact(){
	global $ct;

	$id = $_REQUEST['id'];
	if(!$id)err("Unexpected Error");

	$ct->removeContact($id);

	json();
}
function contactCreate(){
	$id = $_REQUEST['id'];	

	$data = [];
	foreach(array_diff(array_keys($_POST),['action','id','phone','phone2','email','notes']) as $k){
		$data[$k] = $_REQUEST[$k];
	}	
	$data['data'] = json_encode(['notes'=>$_REQUEST['notes']]);
	$data['source'] = 'manual';

	$updatesql = [];
	foreach($data as $k=>$v)$updatesql[] = "`$k`='$v'";

	if($id){
		mysql_query("UPDATE deals_contacts SET ".implode(", ",$updatesql)." WHERE id='{$id}'");	
		$cId = $id;
	}
	else{
		mysql_query("INSERT INTO deals_contacts SET ".implode(", ",$updatesql));	
		$cId = mysql_insert_id();
	}	
	if(mysql_error())err(mysql_error());
	
	mysql_query("DELETE FROM deals_contacts_entries WHERE contact_id='{$cId}'");
	$phone = Twilio::strip($_REQUEST['phone']);
	if($phone)mysql_query("INSERT INTO deals_contacts_entries SET type='phone', value='{$phone}', contact_id='{$cId}'");
	$phone = Twilio::strip($_REQUEST['phone2']);
	if($phone)mysql_query("INSERT INTO deals_contacts_entries SET type='phone', value='{$phone}', contact_id='{$cId}'");
	$email = $_REQUEST['email'];
	if($email)mysql_query("INSERT INTO deals_contacts_entries SET type='email', value='{$email}', contact_id='{$cId}'");

	json();
}
function loadPoi(){
	global $dl;

	$lId = $_REQUEST['listing_id'];
	$distance = $_REQUEST['distance'];
	
	$items = $dl->getDealPoi($lId,$distance);
	json(['items'=>$items]);
}
function contactsLookup(){
	$twilio = new Twilio();

	$number = Twilio::strip($_REQUEST['number']);	
	$res = $twilio->lookup($number);
	json($res);
}
function loadContacts(){
	global $ct;

	$id = $_REQUEST['id'];	
	if(!$id)err("Unexpected Error");

	$res = $ct->getDealContacts($id);
	if($res->error)err($res->error);	

	json($res);
}

//Phones
function loadPhones(){
	$id = $_REQUEST['id'];

	$res = (object)['phones'=>[],'settings'=>''];

	$res->settings = Deal::getListingPhoneSettings($id);
	json($res);
}
function savePhoneSettings(){
	$id = $_REQUEST['id'];
	$data = $_POST;
	Deal::saveListingPhoneSettings($id,$data);
	json();
}

//Folders
function removeFile(){
	$id = preg_replace("/[^0-9]/","",$_REQUEST['id']);
	if(!$id)err("Unexpected Error");

	list($path) = mysql_fetch_array(mysql_query("SELECT path FROM deals_files WHERE id='{$id}'"));
	$path = $GLOBALS['system']['upload_path'].$path;
	if(!file_exists($path))err("Unexpected Error");
	
	@unlink($path);
	sql("DELETE FROM deals_files WHERE id='{$id}'");	
}
function foldersUpload(){
	$id = $_REQUEST['listing_id'];	
	$folder = $_REQUEST['folder'];	
	if(!$id || !$folder)err("Unexpected Error!");
	
	foreach($_FILES as $i=>$f){
		if(!is_string($f['tmp_name']))continue;
		$res = uploadDealFile($i,$id);
		if($res){
			$filename = end(explode("/",$res));
			mysql_query("INSERT INTO deals_files SET listing_id='{$id}', user_id = '{$_SESSION['user']->id}', folder='{$folder}', filename='{$filename}', path='{$res}'");
		}
	}
	json();	
}
function updateFolders(){
	$data = $_REQUEST['data'];
	$id = $_REQUEST['id'];
	
	$folders = [];
	foreach($data as $r){
		if($r['type'] == 'file'){
			$fid = str_replace('file_','',$r['id']);
			mysql_query("UPDATE deals_files SET folder='{$r['parent']}' WHERE id='{$fid}'");
		}
		else{
			unset($r['state']);
			$r['state'] = ['opened' => true];
			$folders[] = $r;
		}		
	}
	
	//t($folders);
	$data = json_encode($folders);	
	mysql_query("INSERT INTO deals_folders SET data='{$data}',listing_id='{$id}' ON DUPLICATE KEY UPDATE data='{$data}'");	
}
function getFolders(){
	$id = $_REQUEST['id'];

	$items = mysql_fetch_assoc(mysql_query("SELECT * FROM deals_folders WHERE listing_id={$id}"));	
	if($items){
		$items = json_decode($items['data']);
	}
	else{
		$items = [
		[
			'id'		=> 'root_images',
			'parent'	=> '#',
			'text'		=> 'Images',
			'icon'		=> 'mdi mdi-view-dashboard',
			'state' 	=> ['opened' => true],
			'li_attr'   => [],
			'a_attr'	=> []
		],
		[
			'id'		=> 'root_documents',
			'parent'	=> '#',
			'text'		=> 'Documents',
			'icon'		=> 'mdi mdi-format-float-right',
			'state' 	=> ['opened' => true],
			'li_attr'   => [],
			'a_attr'	=> []
		],
		[
			'id'		=> 'root_reports',
			'parent'	=> '#',
			'text'		=> 'Reports',
			'icon'		=> 'mdi mdi-format-list-bulleted',
			'state' 	=> ['opened' => true],
			'li_attr'   => [],
			'a_attr'	=> []
		],
		[
			'id'		=> 'root_misc',
			'parent'	=> '#',
			'text'		=> 'Misc Files',			
			'icon'		=> '',
			'state' 	=> ['opened' => true],
			'li_attr'   => [],
			'a_attr'	=> []
		]];
	}

	$q = mysql_query("SELECT * FROM deals_files WHERE listing_id='{$id}'");
	while($r = mysql_fetch_assoc($q)){
		$items[] = [
			'id'		=> 'file_'.$r['id'],
			'parent'	=> $r['folder']?$r['folder']:'root_misc',
			'text'		=> $r['filename'],
			'type'		=> 'file',
			'icon'		=> '',			
			'li_attr'   => [],
			'a_attr'	=> ['href'=> $GLOBALS['system']['upload_href'].path2url($r['path']), 'target'=>'_blank']
		];
	}
	json($items);
}

//Updates 
function getUpdatesTypes(){
	$items = [];
	$q = mysql_query("SELECT DISTINCT type FROM deals_updates");
	while(list($r) = mysql_fetch_array($q)) if($r) $items[] = $r;
	return $items;
}
function createUpdate(){	
	$id = $_REQUEST['listing_id'];	
	if(!$id)err("Unexpected Error!");

	$data = [];
	foreach(array_diff(array_keys($_POST),['action','file']) as $k){
		$data[$k] = $_REQUEST[$k];
	}	
	$data['user_id'] = $_SESSION['user']->id;
	$updatesql = [];
	foreach($data as $k=>$v)$updatesql[] = "`$k`='$v'";
	mysql_query("INSERT INTO deals_updates SET ".implode(", ",$updatesql));	
	if(mysql_error())err(mysql_error());

	$updateId = mysql_insert_id();
	
	$files = [];
	foreach($_FILES as $i=>$f){
		if(!is_string($f['tmp_name']))continue;
		$res = uploadDealFile($i,$id);
		if($res){
			$filename = end(explode("/",$res));
			mysql_query("INSERT INTO deals_files SET listing_id='{$id}', user_id = '{$_SESSION['user']->id}', update_id='{$updateId}', filename='{$filename}', path='{$res}'");
		}
	}
	json();	
}
function uploadDealFile($param,$dId){   
    uselib('uploadHandler::handler');
    $options = array(
        'upload_dir' => $GLOBALS['system']['upload_path']."/{$dId}/",
        'upload_url' => $GLOBALS['system']['upload_href_abs']."/{$dId}/",        
        'user_dirs' => false,    
        'param_name' => $param,
        'image_versions' => array(),
		'accept_file_types' => '/\.(gif|jpe?g|png|pdf|ms-excel)$/i',
        'print_response' => false);
    //t($options);

    $handler = new CustomUploadHandler($options);
    $res = $handler->get_response();

    $uploadRes = $res[$options['param_name']][0];	
    if($uploadRes->error)return false;

	$file = url2path($uploadRes->url);        
    return $file;
}
function loadUpdates(){
	$dId = $_REQUEST['id'];
		
	$array = array();

	$offset = (int)$_REQUEST['start'];
	$length = (int)$_REQUEST['length'];
	
	$offset = $offset;
	$length = (int) $length;
	if ($length)
		$limit = "LIMIT $offset,$length";
	else
		$limit = "";
	
	$filter = $_REQUEST['filter'];
	$wheresql = array();	
	$wheresql[] = "listing_id='{$dId}'";	
	if($filter){
		foreach($filter as $k=>$v){
			if((is_array($v) && !empty($v)) || strlen(trim($v))){
				switch($k){
					case 'q':
						$wheresql[] = "(title LIKE '%{$v}%' OR description LIKE '%{$v}%')";
						break;
					case 'type':
						$wheresql[] = "type IN ('".implode("','",$v)."')";
						break;
					case 'todo_id':
						$wheresql[] = "todo_id='{$v}'";
						break;
					default:
						//$wheresql[] = "$k = '$v'";
						break;
				}
			}
		}
	}

	$sql = "SELECT SQL_CALC_FOUND_ROWS * FROM deals_updates				
				WHERE ".implode(" AND ",$wheresql)."				
				ORDER BY timestamp DESC
				$limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		$array[] = formatUpdate($r);
	}
	json(array(		
		'data'=> $array,
		'total' => $total,		
		'page' => $offset,		
		'length' => $length,
	));
}
function formatUpdate($r){
	$r['timestamp_ago'] = xTimeAgo($r['timestamp'],'now');
	$r['files'] = getUpdateFiles($r['id']);	
	$r['user'] = Users::getUsersData($r['user_id']);
	if($r['todo_id'])$r['todo'] = getTodoTask($r['todo_id']);
	return (object)$r;
}
function getUpdateFiles($id){
	$items = [];

	$q = mysql_query("SELECT * FROM deals_files WHERE update_id='{$id}'");
	while($r = mysql_fetch_assoc($q)){
		$r['icon'] = getFileIcons($r['path']);
		$r['href'] = path2url($r['path']);
		$items[] = (object)$r;
	}
	return $items;
}


//Todo 
function removeTodoTask(){
	$id = $_REQUEST['id'];

	sql("DELETE FROM deals_tasks WHERE id='{$id}'");
}
function getDealTasks($lId){
	$items = [];
	$q = mysql_query("SELECT * FROM deals_tasks WHERE listing_id='{$lId}'");
	while($r = mysql_fetch_assoc($q)) $items[] = (object)$r;
	return $items;
}
function getTodoTask($id){
	$q = mysql_query("SELECT * FROM deals_tasks WHERE id='{$id}'");
	$r = mysql_fetch_assoc($q);
	if($r)$r = formatTask($r);
	return $r;
}
function createTodoTask(){	
	$id = $_REQUEST['id'];	
	$lId = $_REQUEST['listing_id'];	
	if(!$lId)err("Unexpected Error!");

	$data = [];
	foreach(array_diff(array_keys($_POST),['action','file']) as $k){
		$data[$k] = $_REQUEST[$k];
	}		
	$data['user_id'] = $_SESSION['user']->id;	
	
	$updatesql = [];
	foreach($data as $k=>$v)$updatesql[] = "`$k`='$v'";

	if($id){
		sql("UPDATE deals_tasks SET ".implode(", ",$updatesql)." WHERE id='{$id}'");	
	}
	else{
		sql("INSERT INTO deals_tasks SET ".implode(", ",$updatesql));	
	}
	
}
function loadTodoTasks(){
	$dId = $_REQUEST['id'];
		
	$array = array();

	$offset = (int)$_REQUEST['start'];
	$length = (int)$_REQUEST['length'];
	
	$offset = $offset;
	$length = (int) $length;
	if ($length)
		$limit = "LIMIT $offset,$length";
	else
		$limit = "";
	
	$filter = $_REQUEST['filter'];
	$wheresql = array();	
	$wheresql[] = "listing_id='{$dId}'";	
	if($filter){
		foreach($filter as $k=>$v){
			if((is_array($v) && !empty($v)) || strlen(trim($v))){
				switch($k){
					default:
						$wheresql[] = "$k = '$v'";
						break;
				}
			}
		}
	}

	$sql = "SELECT SQL_CALC_FOUND_ROWS * FROM deals_tasks				
				WHERE ".implode(" AND ",$wheresql)."				
				ORDER BY timestamp DESC
				$limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		$array[] = formatTask($r);
	}
	json(array(		
		'data'=> $array,
		'total' => $total,		
		'page' => $offset,		
		'length' => $length,
	));
}
function formatTask($r){
	$r['timestamp_ago'] = xTimeAgo($r['timestamp'],'now');	
	$r['user'] = Users::getUsersData($r['user_id']);
	$r['tags'] = explode(",",$r['tags']);

	$r['lastUpdate'] = mysql_fetch_assoc(mysql_query("SELECT * FROM deals_updates WHERE todo_id='{$r['id']}' ORDER BY id DESC LIMIT 1"));
	if($r['lastUpdate']){
		$r['lastUpdate']['timestamp_ago'] = xTimeAgo($r['lastUpdate']['timestamp'],'now');		
		$r['lastUpdate']['user'] = Users::getUsersData($r['lastUpdate']['user_id']);	
	}

	return (object)$r;
}