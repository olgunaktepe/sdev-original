<?php
uselib('scrapers::score');

usehelper("ajax::dispatch");

function getListingUpdates($id){
	$items = array();

	$q = mysql_query("SELECT id,timestamp,diff_count FROM listings_updates WHERE listing_id='{$id}' ORDER BY id ASC");
	while($r = mysql_fetch_assoc($q)){
		$r['timestamp'] = date('m/d/y - h:iA',strtotime($r['timestamp']));
		$items[] = (object)$r;
	}
	
	return $items;
}
function loadUpdates(){
	$sortColumns = array('timestamp','operation','path','value_old','value_new','');
		
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
		$orderby = array('e.timestamp DESC');
	else
		$orderby = array($orderby['col'] . " " . $orderby['dir']);
	
	
	$wheresql = array();
	
	$wheresql[] = "listing_id='{$_REQUEST['id']}'";
	
	//$wheresql[] = "e.date >= NOW()";
	$filter = $_REQUEST['filter'];
	if($filter){
		foreach($filter as $k=>$v){
			if(!is_string($v) || trim($v)){
				switch($k){
					case 'path':
						$items = explode(",",trim($v));						
						foreach($items as $item){
							$wheresql[] = "path like '%".trim($item)."%'";
						}						
						break;						
					case 'type':
						$wheresql[] = "operation='{$v}'";
						break;
					case 'patch':
						$wheresql[] = "patch_id='{$v}'";
						break;
					case 'date':
						$range = explode(" - ",$v);
						$wheresql[] = "timestamp BETWEEN '".dbdate($range[0])." 00:00:00' AND '".dbdate($range[1])." 23:59:59'";
						break;
					default:
						break;
				}
			}
		}
	}
	
	$sql = "SELECT SQL_CALC_FOUND_ROWS * FROM listings_updates_operations
				WHERE ".implode(" AND ",$wheresql)."
				ORDER BY  " . implode(' ', $orderby) . " $limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		//t($r['data']);
		$array[] = formatUpdate($r);
	}
	json(array(
			'data'=> $array,
			'total' => $total,
			'page' => $offset,
			'sort'	=> ($sortby)?$sortby['col']:$_REQUEST['order'][0]['column'],
			'sortDir' => ($sortby)?$sortby['dir']:$_REQUEST['order'][0]['dir'],
			'length' => $length,
	));
}
function formatUpdate($r){
	//$r['value_old'] = json_decode($r['value_old']);
	//$r['value_new'] = json_decode($r['value_new']);
	$r['timestamp'] = date('m/d/y - h:iA',strtotime($r['timestamp']));

	return (object)$r;
}
function getSummary(){
	global $ev;
		
	$stats = (object)array(
		'scrapes'	=> array(),			
	);									
	
	$q = mysql_query("SELECT count(id), source, status FROM listings GROUP BY source,status");
	//$q = mysql_query("SELECT count(id), source, status FROM listings WHERE timestamp>='".dbDate('now')." 00:00:00' GROUP BY source,status");
	while(list($count,$source,$status) = mysql_fetch_array($q)){
		if(!$stats->scrapes[$source]) $stats->scrapes[$source] = array();
		$stats->scrapes[$source][ucfirst($status)]=$count;
		$stats->scrapes[$source]['Total']+=$count;
	}	
	json(array('stats'=>$stats));
}
function loadDetails(){
	$id = $_REQUEST['id'];
	$patch = $_REQUEST['patch'];
			
	if($patch){
		list($data,$updates) = mysql_fetch_array(mysql_query("SELECT old_data,patch FROM listings_updates WHERE id='$patch'"));
	}
	else{
		$updates = array();
		list($data) = mysql_fetch_array(mysql_query("SELECT data FROM listings WHERE id='$id'"));
	}	
	$data = json_decode($data);		
	json(array('data'=>$data));	
}
function loadListings(){		
	$sortColumns = array('l.title','l.status','l.source','l.timestamp','','','','l.last_seen');
			
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
					case 'source':
						$wheresql[] = "l.source='{$v}'";
						break;
					case 'date':
						$range = explode(" - ",$v);
						$wheresql[] = "l.timestamp BETWEEN '".dbdate($range[0])." 00:00:00' AND '".dbdate($range[1])." 23:59:59'";
						break;
					case 'update_date':
						$range = explode(" - ",$v);
						$wheresql[] = "op.timestamp BETWEEN '".dbdate($range[0])." 00:00:00' AND '".dbdate($range[1])." 23:59:59'";
						break;
					case 'update_path':
						$items = explode(",",trim($v));
						foreach($items as $item){
							$wheresql[] = "op.path like '%".trim($item)."%'";
						}
							break;
					default:
						break;
				}
			}
		}
	}	

	
	/*
	$sql = "SELECT SQL_CALC_FOUND_ROWS l.* FROM listings	AS l	
				LEFT JOIN listings_updates_operations AS op ON op.listing_id=l.remote_id	
				WHERE ".implode(" AND ",$wheresql)." 
				GROUP BY l.id				
				ORDER BY  " . implode(' ', $orderby) . " $limit";
	*/
	$sql = "SELECT SQL_CALC_FOUND_ROWS l.* FROM listings	AS l	
				LEFT JOIN listings_updates_operations AS op ON op.listing_id=l.remote_id	
				WHERE ".implode(" AND ",$wheresql)." 				
				ORDER BY  " . implode(' ', $orderby) . " $limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		//t($r['data']);
		$array[] = formatListing($r);
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
function formatListing($r){		
	$r['title'] = preg_replace('/[[:^print:]]/', '', $r['title']);
	$r['timestamp'] = date('m/d/y - h:iA',strtotime($r['timestamp']));
	$r['status'] = ucfirst($r['status']);	
	$r['images'] = json_decode($r['images']);	
	$r['images_count'] = ($r['images'])?count($r['images']):0;
	$r['data'] = json_decode($r['data']);
	list($r['updates_count']) = mysql_fetch_array(mysql_query("SELECT count(id) FROM listings_updates WHERE listing_id='{$r['remote_id']}'"));
	
	$sc = new Score();
	$r['score'] = $sc->getScore($r['lat'],$r['lng'],true);
	
	$r['last_seen_ago'] = (xDaysAgo($r['last_seen'],'now') === 0)?'Today':number_format(xDaysAgo($r['last_seen'],'now'),2).' days ago';			
	
	return (object)$r;
}
function getScore(){
	$lat = $_REQUEST['lat'];
	$lng = $_REQUEST['lng'];	
	
	$sc = new Score();
	$res = $sc->getScore($lat,$lng);
	json(array('data'=>$res));
}
function export(){
	$sc = new Score();
	
	$sql = stripslashes(reset(explode("ORDER BY",$_REQUEST['sql'])));
	$sql .= "ORDER BY id DESC LIMIT 10000";	

	$struct = '{
	"ID":{
		"crexi.com":"Id",
		"commercialexchange.com":"id"
	},
	"Name":
	{
		"crexi.com":"Name",
		"commercialexchange.com":"locationName+title"
	},
	"Description":
		{
			"crexi.com":"Description",
			"commercialexchange.com":"remarksForPublic"
		},
	"Sale Price":
		{
			"crexi.com":"AskingPrice",
			"commercialexchange.com":"sale/price/amount"
		},
	"Lease Price":
		{
			"crexi.com":"000000000",
			"commercialexchange.com":"lease/askingRent/0/price/amount/minimum/amount+lease/askingRent/0/price/size+lease/askingRent/0/price/period"
		},
	"Address":
		{
			"crexi.com":"Locations/0/Address",
			"commercialexchange.com":"location/address/street/numberMin+location/address/street/name"
		},
	"City":
		{
			"crexi.com":"Locations/0/City",
			"commercialexchange.com":"location/address/locality"
		},
	"State":
		{
			"crexi.com":"Locations/0/State/Code",
			"commercialexchange.com":"location/address/region"
		},
	"Zip":
		{
			"crexi.com":"Locations/0/Zip",
			"commercialexchange.com":"location/address/postalCode"
		},
	"Square Ft.":
		{
			"crexi.com":"Details/Square Footage",
			"commercialexchange.com":"space/size/available+space/size/units"
		},
	"Lot":
		{
			"crexi.com":"Details/Lot Size (acres)",
			"commercialexchange.com":"lot/totalAcres"
		},
	"Broker Name":
		{
			"crexi.com":"broker/0/FirstName+broker/0/LastName",
			"commercialexchange.com":"agents/0/name"
		},
	"Score":
		{
			"crexi.com":"score",
			"commercialexchange.com":"score"
		}
}';
	$paths = json_decode($struct);
	
	$filename = 'export_'.date('mdY_His',strtotime('now')).'.csv';
	header('Content-Type: text/csv; charset=utf-8');
	header('Content-Disposition: attachment; filename='.$filename);
	$output = fopen('php://output', 'w');
	
	$first = true;
	$q = mysql_query($sql);
	while($r = mysql_fetch_assoc($q)){
		$data = json_decode($r['data']);
		if(!$data)continue;
	
		if($r['source'] == 'commercialexchange.com'){
			$r['url'] = $r['listing_url'];
			$data2 = (object)array();
			foreach($data->listedSpaces as $space){
				if($space->id == $r['remote_id'])
					$data2 = $space;
			}
			$data2->location = $data->location;
			$data2->lot = $data->lot;
			$data2->locationName = $data->name;
			$data = $data2;
		}
		
		$score = $sc->getScore($r['lat'],$r['lng'],true);
		$data->score = (int)$score->locationScore;			
	
	
		$header = array();
		$cells = array();
		foreach($paths as $pk=>$pv){
			$path = $pv->{$r['source']};
			if($path){
				$parts = array();
				foreach(explode('+',$path) as $part){
					$parts[] = getJsonPathValue($data,$part);
				}
				$value = implode(" ",$parts);
			}
			else{
				$value = "-";
			}
	
			$header[] = $pk;
			$cells[] = $value;
			#t($pk.": ".$value,1);
		}
	
		$header[] = "Source";
		$cells[] = $r['source'];
		$header[] = "URL";
		$cells[] = $r['url'];
	
	
		if($first){
			fputcsv($output, $header);
			$first = false;
		}
		fputcsv($output, $cells);
	}		
}