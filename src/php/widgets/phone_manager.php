<?php
uselib('twilio::twilio');
$twilio = new Twilio();

uselib('contacts');
$ct = new Contacts();

usehelper('ajax::dispatch');


function toggleNumberSetting(){
	$type = $_REQUEST['type'];
	$id = $_REQUEST['id'];

	if($type == 'record'){
		sql("UPDATE twilio_numbers SET record=1-record WHERE id='{$id}'");
	}
	else{
		err("Not Supported");
	}
}
function loadActiveConvos(){
	$res = [
		'calls'	=> getActiveCalls($_REQUEST['listingId'])
	];
	json($res);
}
function getActiveCalls($listingId=0){
	$items = [];

	$wheresql = [];
	$wheresql[] = "status IN ('in-progress','ringing')";
	if($listingId)$wheresql[] = "listing_id='$listingId'";

	$assignedNumbers = Twilio::getAssignedNumbersByUserType($_SESSION['user']->type_id);	
	$wheresql[] = "(sender IN ('".implode("','",$assignedNumbers)."') OR target IN ('".implode("','",$assignedNumbers)."'))";
	
	$q = mysql_query("SELECT * FROM twilio_log WHERE ".implode(" AND ",$wheresql)." ORDER BY timestamp DESC");	
	while($r = mysql_fetch_assoc($q)){
		$items[] = formatLog($r);
	}
	return $items;
}
function updateNumber(){
	global $twilio;

	$id = $_REQUEST['id'];	
	$title = mysql_real_escape_string($_REQUEST['title']);
	$tags = mysql_real_escape_string($_REQUEST['call_tags']);
	$vt = mysql_real_escape_string($_REQUEST['voicemail_text']);

	
	sql("UPDATE twilio_numbers SET title='{$title}', call_tags='{$tags}', voicemail_text='{$vt}' WHERE id='{$id}'");
}
function cancelForward(){
	global $twilio;
	$id = $_REQUEST['id'];		
	sql("UPDATE twilio_numbers SET forward='' WHERE id='{$id}'");
}
function assignNumber(){
	global $twilio;

	$id = $_REQUEST['id'];	
	$type = $_REQUEST['type_id'];	
	
	mysql_query("DELETE FROM twilio_numbers_types WHERE number_id='{$id}'");	
	if($type)mysql_query("INSERT INTO twilio_numbers_types SET number_id='{$id}', type_id='{$type}'");	
	json();	
}
function forwardNumber(){
	global $twilio;

	$id = $_REQUEST['id'];	
	$number = $_REQUEST['number'];	
	if(!$number)err("Invalid Number!");

	sql("UPDATE twilio_numbers SET forward='".Twilio::format($number)."' WHERE id='{$id}'");
}
function deleteRecording(){
	global $twilio;

	$sid = $_REQUEST['sid'];
	if(!$sid)err("Missing ID");
	if($_SESSION['user']->type_id != 1)err("Unauthorized attempt");

	$res = $twilio->deleteRecording($sid);
	if($res){
		mysql_query("UPDATE twilio_log SET recording_sid=NULL WHERE recording_sid='{$sid}'");
		json();
	}
	else err("Unexpected Error");
}
function getRecordingUrl(){
	global $twilio;

	$sid = $_REQUEST['sid'];
	if(!$sid)err("Missing ID");

	$res = $twilio->getRecording($sid);
	json(['url'=>$res]);
}
function readLog(){
	$id = $_REQUEST['id'];
	Twilio::setLoadReadStatus($_SESSION['user']->id,$id);	
	json();
}
function loadLog(){		
	$convos = false;

	$sortColumns = array('l.timestamp','l.status','l.user_id','l.type','l.sender','l.target','l.duration','l.content','l.listing_id','');			

	$array = array();
	
	$offset = (int)$_REQUEST['start'];
	$length = (int)$_REQUEST['length'];
	
	if($_REQUEST['order'])$orderby = array('col'=>$sortColumns[$_REQUEST['order'][0]['column']],'dir'=>$_REQUEST['order'][0]['dir']);
	
	$offset = $offset;
	$length = (int) $length;
	if ($length)
		$limit = "LIMIT $offset,$length";
	else
		$limit = "";
	
	if (!$orderby)
		$orderby = array('l.timestamp DESC');
	else
		$orderby = array($orderby['col'] . " " . $orderby['dir']);
	
	
	$wheresql = array("1=1");

	$assignedNumbers = Twilio::getAssignedNumbersByUserType($_SESSION['user']->type_id);	
	$wheresql[] = "(l.sender IN ('".implode("','",$assignedNumbers)."') OR l.target IN ('".implode("','",$assignedNumbers)."'))";

	//$wheresql[] = "e.date >= NOW()";
	$filter = $_REQUEST['filter'];
	if($filter){
		foreach($filter as $k=>$v){
			if(!is_string($v) || trim($v)){
				switch($k){					
					case 'title':
						$wheresql[] = "l.title like '%".trim($v)."%' OR l.remote_id LIKE '%".trim($v)."%'";
						break;
					case 'listing_id':
						//$wheresql[] = "l.listing_id='{$v}'";						
						$orsql = [];
						$orsql[] = "l.listing_id='{$v}'";
						$orsql[] = "(l.listing_id=0 AND find_in_set('{$v}',l.autotag_listingIds) <> 0)";
						$wheresql[] = "(".implode(" OR ",$orsql).")";												
						break;
					case 'timestamp':
						$range = explode(' - ',$v);
						$wheresql[] = "l.timestamp BETWEEN '".dbDate($range[0])." 00:00:00' AND '".dbDate($range[1])." 23:59:59'";
						break;
					case 'from':
						$wheresql[] = "l.sender LIKE '%{$v}%'";
						break;					
					case 'to':
						$wheresql[] = "l.target LIKE '%{$v}%'";
						break;	
					case 'fromto':
						$wheresql[] = "(l.sender LIKE '%{$v}%' OR l.target LIKE '%{$v}%')";
						break;
					case 'type':
					case 'status':
						$wheresql[] = "l.{$k}='{$v}'";
						break;				
					default:
						break;
				}
			}
		}
	}	

	if($convos){
		$sql = "SELECT SQL_CALC_FOUND_ROWS l.sender+l.target AS k,max(l.id) AS maxid, count(1) AS num FROM twilio_log AS l WHERE ".implode(" AND ",$wheresql)." GROUP BY k ORDER BY maxid DESC {$limit} ";		
	}
	else{		
		$sql = "SELECT SQL_CALC_FOUND_ROWS l.* FROM twilio_log AS l					
				WHERE ".implode(" AND ",$wheresql)." 				
				ORDER BY " . implode(' ', $orderby) . " $limit";	
	}		
	//t($sql);	
	$q = mysql_query($sql);	
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		//t($r['data']);
		if($convos){
			$array[] = formatConvo($r['maxid'],$r['num']);
		}
		else{
			$array[] = formatLog($r);
		}
	}	
	json(array(
		'sql'=>preg_replace("/\n|\r|\t/"," ",$sql),
		'data'=> $array,
		'total' => $total,
		'page' => $offset,
		'sort'	=> ($sortby)?$sortby['col']:$_REQUEST['order'][0]['column'],
		'sortDir' => ($sortby)?$sortby['dir']:$_REQUEST['order'][0]['dir'],
		'length' => $length,
	));
}
function formatConvo($id,$count){
	$r = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_log WHERE id='{$id}'"));
	$r = formatLog($r);
	$r->count = $count;
	return $r;
}
function formatLog($r){	
	global $twilio, $ct;

	$deal = new Deal();
	
	$r['timestamp'] = date('m/d/y h:ia',strtotime($r['timestamp']));
	$r['timestamp_ago'] = xTimeAgo($r['timestamp'],'now');
	$r['tags'] = $twilio->getLogTags($r['remote_id']);
	$r['new'] = 1;
	if($r['direction'] == 'outbound')$r['new'] = 0;
	if($twilio->getLogReadStatus($r['id'],$_SESSION['user']->id)>0)$r['new'] = 0;

	$r['content'] = stripslashes(str_replace('\n',"<br>",$r['content']));
	$r['content_preview'] = strshorten($r['content'],50);
	
	$r['media'] = explode('|',$r['media']);	

	if($r['user_id']){
		$r['user'] = Users::getUsersData($r['user_id']);
	}
	$r['listing'] = $twilio->getLogListing($r['remote_id']);
	if(!$r['listing_id'] && $r['autotag_listingIds']){
		$lIds = explode(",",$r['autotag_listingIds']);
		$r['autotag_listings'] = [];
		foreach($lIds as $lId){
			$listing = $deal->getStanderizedListing($lId);
			//$listing = (object)['id'=>$lId,'title'=>''];
			//list($listing->title) = mysql_fetch_array(mysql_query("SELECT title FROM listings WHERE id='{$lId}'"));
			//$listing->title_preview = strshorten($listing->title,50);

			$r['autotag_listings'][] = $listing;
		}
	}

	$r['caller_ids'] = [
		'sender'	=> $ct->identifyPhone($r['sender']),
		'target'	=> $ct->identifyPhone($r['target']),
	];

	return (object)$r;
}


function loadNumbers(){		
	global $twilio;
	$sortColumns = array('n.title','n.number','l.active','','');
			
	$array = array();
	
	$offset = (int)$_REQUEST['start'];
	$length = (int)$_REQUEST['length'];
	
	if($_REQUEST['order'])$orderby = array('col'=>$sortColumns[$_REQUEST['order'][0]['column']],'dir'=>$_REQUEST['order'][0]['dir']);
	
	$offset = $offset;
	$length = (int) $length;
	if ($length)
		$limit = "LIMIT $offset,$length";
	else
		$limit = "";
	
	if (!$orderby)
		$orderby = array('n.timestamp DESC');
	else
		$orderby = array($orderby['col'] . " " . $orderby['dir']);
	
	
	$wheresql = array("1=1");
	//$wheresql[] = "e.date >= NOW()";
	$filter = $_REQUEST['filter'];
	if($filter){
		foreach($filter as $k=>$v){
			if(!is_string($v) || trim($v)){
				switch($k){					
					case 'title':
						$wheresql[] = "l.title like '%".trim($v)."%' OR l.remote_id LIKE '%".trim($v)."%'";
						break;
					case 'status':
						$wheresql[] = "l.status='{$v}'";
						break;					
					default:
						break;
				}
			}
		}
	}	
	$sql = "SELECT SQL_CALC_FOUND_ROWS n.* FROM twilio_numbers AS n					
				WHERE ".implode(" AND ",$wheresql)." 				
				ORDER BY " . implode(' ', $orderby) . " $limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		//t($r['data']);
		$array[] = $twilio->formatNumber($r);
	}	
	json(array(
		'sql'=>preg_replace("/\n|\r|\t/"," ",$sql),
		'data'=> $array,
		'total' => $total,
		'page' => $offset,
		'sort'	=> ($sortby)?$sortby['col']:$_REQUEST['order'][0]['column'],
		'sortDir' => ($sortby)?$sortby['dir']:$_REQUEST['order'][0]['dir'],
		'length' => $length,
	));
}
function getConvo(){
	global $ct;

	$sender = Twilio::strip(reset(explode("|",$_REQUEST['key'])));
	$target = Twilio::strip(end(explode("|",$_REQUEST['key'])));	
	
	$listings = [];
	$q = mysql_query("SELECT l.* FROM twilio_log AS t
						LEFT JOIN listings AS l ON l.id=t.listing_id
						WHERE t.listing_id>0 AND t.target IN ('{$sender}','{$target}') AND t.sender IN ('{$sender}','{$target}') 
						GROUP BY t.listing_id");
	while($r = mysql_fetch_assoc($q)) $listings[] = $r;

	$sender = $ct->identifyPhone($sender);
	$target = $ct->identifyPhone($target);		

	$ownNumber = false;
	$remoteNumbers = [];
	if($sender['local'][0]['own']){
		$ownNumber = $sender;
		$remoteNumbers[] = $target;
	}
	else if($target['local'][0]['own']){
		$ownNumber = $target;
		$remoteNumbers[] = $sender;
	}
	else{
		$remoteNumbers[] = $sender;
		$remoteNumbers[] = $target;
	}	


	json(['own_number'=>$ownNumber,'remote_numbers'=>$remoteNumbers,'listings'=>$listings]);
}
function getConvoMessages(){
	$items = [];

	$sender = Twilio::strip(reset(explode("|",$_REQUEST['key'])));
	$target = Twilio::strip(end(explode("|",$_REQUEST['key'])));
	$page = $_REQUEST['page'];
	$perpage = 20;

	$offset = $page*$perpage;
	$limit = $perpage;
	$q = mysql_query("SELECT * FROM twilio_log WHERE target IN ('{$sender}','{$target}') AND sender IN ('{$sender}','{$target}') ORDER BY id DESC LIMIT {$offset},{$limit}");
	while($r = mysql_fetch_assoc($q)){
		Twilio::setLoadReadStatus($_SESSION['user']->id,$r['id']);
		$r = formatLog($r);
		$items[] = $r;
	}

	json(['items'=>$items]);
}

//Contacts
function loadContacts(){
	$ct = new Contacts();

	$limit = 5;
	$offset = $_REQUEST['page']*$limit;	

	$wheresql = array("1=1");
	//$wheresql[] = "e.date >= NOW()";
	$filter = $_REQUEST['filter'];
	if($filter){
		foreach($filter as $k=>$v){
			if(!is_string($v) || trim($v)){
				switch($k){					
					case 'q':
						$wheresql[] = "(c.name like '%".trim($v)."%' OR c.company LIKE '%".trim($v)."%' OR e.value LIKE '%".trim($v)."%')";
						break;
					case 'loc':
						$wheresql[] = "(c.address like '%".trim($v)."%' OR c.city LIKE '%".trim($v)."%' OR c.state LIKE '%".trim($v)."%' OR c.zip LIKE '%".trim($v)."%')";
						break;
					case 'type':
						$wheresql[] = "(c.type like '%".trim($v)."%' OR c.subtype LIKE '%".trim($v)."%')";
						break;					
					default:
						break;
				}
			}
		}
	}	
	$sql = "SELECT SQL_CALC_FOUND_ROWS c.* FROM deals_contacts AS c
				LEFT JOIN deals_contacts_entries AS e ON e.contact_id=c.id
				WHERE ".implode(" AND ",$wheresql)." 				
				GROUP BY c.id 
				ORDER BY name ASC				
				LIMIT $offset,$limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){		
		$array[] = $ct->formatContact($r);
	}	

	json(['items'=>$array, 'total'=>$total]);
}
function getContactsTypes(){
	$items = [];
	$q = mysql_query("SELECT DISTINCT type FROM deals_contacts");
	while(list($r) = mysql_fetch_array($q))if($r)$items[] = $r;
	return $items;
}
function getContactsSubtypes(){
	$items = [];
	$q = mysql_query("SELECT DISTINCT subtype FROM deals_contacts");
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
function contactsLookup(){
	$twilio = new Twilio();

	$number = Twilio::strip($_REQUEST['number']);	
	$res = $twilio->lookup($number);
	json($res);
}
	