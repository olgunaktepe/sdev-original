
<?php
session_write_close();

uselib('deal');
$dl = new Deal();

usehelper("ajax::dispatch");

$datapoints = ['adderss','distance','agents','price'];
$ops = Filters::buildFilterConfig()[0]['operators'];

function loadDups(){		
	$sortColumns = array('d.timestamp','d.listing_id1','d.listing_id2','d.distance','d.score','');
			
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
                    case 'type':
                        $wheresql[] = "l.type = '".mysql_real_escape_string($v)."'";
                        break;								
					default:
						break;
				}
			}
		}
	}	

	
	$sql = "SELECT SQL_CALC_FOUND_ROWS d.* FROM dups AS d					
                LEFT JOIN listings AS l ON l.id=d.listing_id1
				WHERE ".implode(" AND ",$wheresql)." 				
				ORDER BY  " . implode(' ', $orderby) . " $limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		//t($r['data']);
		$array[] = formatDup($r);
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
function formatDup($r){
    $listing = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$r['listing_id1']}'"));	
    $r['ref'] = reset(standerizeListing([$listing]));				

    $listing = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$r['listing_id2']}'"));	
    $r['dup'] = reset(standerizeListing([$listing]));				

	$r['timestamp_ago'] = xTimeAgo($r['timestamp'],'now');
    $r['data'] = json_decode($r['data']);	
    $r['distance_feet'] = $r['distance']*5280;
	return (object)$r;
}
function saveConfig(){
    global $dl;

    $config = json_decode(json_encode($_REQUEST['config']));
    if(!$config)err("Unexpected Error");    

    unset($config->save_pending);

    //err($config);
    //exit();

    sql("UPDATE admin_settings SET value='".mysql_real_escape_string(json_encode($config))."' WHERE name='dups_config'");   
}
function getConfig(){
    global $dl;

    $config = $dl->dups_config;
    $scores = $dl->getScoreKeys();

    foreach($scores as $s){
        if(!$config->weights->{$s})$config->weights->{$s} = 0;
    }
    
    json($config);
}
function testListing(){
    global $dl;

    $id = $_REQUEST['id'];
    if(!$id)err("Missing listing ID");

    $config = json_decode(json_encode($_REQUEST['config']));
    if(!$config)err("Unexpected Error");    
        
    $l = $dl->getDeal($id,false);
    $start = time();
    $res = (object)['items'=>$dl->getDuplicateListingsV2($id, $l->listing->lat,$l->listing->lng,false,$config)];
    $res->bm = (time()-$start);
    $l->dupInfo = ['ref'=>1];

    array_unshift($res->items, reset(standerizeListing([$l->listing])));

    json($res);
}



