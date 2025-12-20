<?php
session_write_close();

uselib("benchmarks");
$bm = new Benchmarks();

$dl = new Deal();

usehelper('ajax::dispatch');


function getZhvi(){
	global $bm;

	$zip = $_REQUEST['zip'];
	if(!$zip)err("Zip is required!");	

	$res = $bm->getZHVI($zip);	

	json(['res'=>$res]);
}
function getZori(){
	global $bm;

	$zip = $_REQUEST['zip'];
	if(!$zip)err("Zip is required!");	

	$res = $bm->getZORI($zip);	

	json(['res'=>$res]);
}

function getMarkets($latitude,$longitude){
	global $dl;
	
	$markets = [];

	foreach(['retail','industrial','office','multi','hosp','student'] as $type){		
		$markets[$type]['markets'] = $dl->queryCsMarkets($latitude,$longitude,'markets',3,$type);
		$markets[$type]['submarkets'] = $dl->queryCsMarkets($latitude,$longitude,'submarkets',3,$type);
	}			

	$data = [];
	foreach($markets as $type=>$ms){
		$data[$type] = [];
		$alldata = [];
		foreach($ms['markets'] as $m){ 
			list($mdata) = mysql_fetch_array(mysql_query("SELECT data FROM cs_markets_data WHERE type='{$type}' AND market_remote_id='{$m->remote_id}'"));									
			$mdata = marketsCalcFields(json_decode($mdata));
			$alldata[$m->remote_id] = (object)['id'=>$m->remote_id,'title'=>$m->name, 'distance'=>$m->distance, 'data'=>$mdata];
		}					
		$data['markets'][$type] = groupMarkets($alldata);	

		$alldata = [];
		foreach($ms['submarkets'] as $m){			
			list($mdata) = mysql_fetch_array(mysql_query("SELECT data FROM cs_submarkets_data WHERE type='{$type}' AND submarket_remote_id='{$m->remote_id}'"));						
			$mdata = marketsCalcFields(json_decode($mdata));
			$alldata[$m->remote_id] = (object)['id'=>$m->remote_id,'title'=>$m->name, 'distance'=>$m->distance, 'data'=>$mdata];
		}	
		$data['submarkets'][$type] = groupMarkets($alldata);						
	}
	return $data;
}
function groupMarkets($alldata){
	$cols = [];
	$formatted = [];
	$fields = [];
	foreach($alldata as $id=>$data){
		$cols[] = ['id'=>$id,'title'=>$data->title,'distance'=>$data->distance];
		if(!$data->data)continue;
		foreach($data->data as $k=>$v){
			$fields[] = $k;
			if(!$formatted[$k])$formatted[$k] = [];
			$formatted[$k][$id] = $v;
		}
	}	
	foreach($fields as $f){		
		foreach($cols as $col){	
			$id = $col['id'];			
			if(!$formatted[$f][$id])$formatted[$f][$id] = 0;
		}
		
	}
	return (object)['cols'=>$cols, 'data'=>$formatted];
}
function search(){
	global $dl;

	$wheresql = [];

	$latitude = $_REQUEST['lat']; //'34.06555';
	$longitude = $_REQUEST['lng']; //'-118.24054';
	$distance = ($_REQUEST['width']>$_REQUEST['length'])?$_REQUEST['width']:$_REQUEST['length']; //200;	
	$markets = getMarkets($latitude,$longitude);	
	
	$wheresql[] = "status='ready'";
	$wheresql[] = "type='sale'";
	$wheresql[] = "last_deal_cache IS NOT NULL";	
	$wheresql[] = "(((acos(sin(({$latitude}*pi()/180)) * sin((m.lat*pi()/180))+cos(({$latitude}*pi()/180)) * cos((m.lat*pi()/180)) * cos((({$longitude} - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '{$distance}'";

	$filter = $_REQUEST['filter'];
	if($filter){
		foreach($filter as $k=>$v){
			if(!is_string($v) || trim($v)){
				switch($k){					
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

	$items = [];
	$perpage = 10000;
	$offset = 0;
	do{
		$found = false;
		$sql = "SELECT * FROM listings AS m WHERE ".implode(" AND ",$wheresql)." LIMIT {$offset},{$perpage}";	
		//err($sql);
		$q = mysql_query($sql);
		
		$batch = [];
		while($r = mysql_fetch_assoc($q)){
			$found = true;
			$batch[] = $r;			
		}		
		$batch = standerizeListing($batch);	
		foreach($batch as $r){
			//if($r->zip != '83611')continue;
			$items[] = $r;
		}		

		//t(count($items),1);

		$offset += $perpage;
	}while($found);

	
	$stats = (object)[
		'scrapes'=>[]
	];
	$range = (strtotime($range[1])-strtotime($range[0]))/60/60/24;
	$type = 'day';
	if($range>60)$type = 'week';	
	foreach($items as $item){		
		$date = ($type == 'week')?getWeek(pick($item->created_on,$item->scraped_on)):dbDate(pick($item->created_on,$item->scraped_on));						
		$stats->scrapes[$date]['new']++;
		if($item->expired && $item->last_seen){
			$date = ($type == 'week')?getWeek($item->last_seen):dbDate($item->last_seen);
			$stats->scrapes[$date]['expired']++;
		}
	}	
	json(['listings'=>$items,'stats'=>$stats,'markets'=>$markets]);
}
function getWeek($ts){ 
	$day = date('d',strtotime($ts));
	$ym = date('Y-m',strtotime($ts));
	if($day>=22) $date = $ym.'-22';
	else if($day>=15) $date = $ym.'-15';
	else if($day>=8) $date = $ym.'-8';
	else $date = $ym.'-1';

	return $date;
}
