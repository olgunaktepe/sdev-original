<?php	
session_write_close();
set_time_limit(0);

usehelper("ajax::dispatch");

function getPingStats(){
	$range = $_REQUEST['range'];

	if(!$range)$date = dbDate('2022-10-01');
	else if($range == 1)$date = dbDate('yesterday');
	else $date = dbDate("-{$range} days");

	$type = $_REQUEST['type'];
	if(!$type) $type = ['Sale','Lease'];
	else $type = [$type];

	$stats = [];
	$q = mysql_query("SELECT source,count(id) FROM listings WHERE last_seen_check>= '{$date} 00:00:00' AND type IN ('".implode("','",$type)."') GROUP BY source");
	while(list($source,$count) = mysql_fetch_array($q)){
		$stats[$source] = (object)['checked'=>$count,'source'=>$source];
	}

	#$q = mysql_query("SELECT source,count(id) FROM listings WHERE date(last_seen_check) = '{$date}' AND expired=1 GROUP BY source");
	$q = mysql_query("SELECT source,count(id) FROM listings WHERE last_seen_check >= '{$date}' AND expired=1 AND type IN ('".implode("','",$type)."') GROUP BY source");
	while(list($source,$count) = mysql_fetch_array($q)){
		if(!$stats[$source])$stats[$source] = (object)['source'=>$source];

		$stats[$source]->expired = $count;
	}

	$q = mysql_query("SELECT source,count(id) FROM listings WHERE last_seen_check >= '{$date}' AND expired=0 AND type IN ('".implode("','",$type)."') GROUP BY source");
	while(list($source,$count) = mysql_fetch_array($q)){
		if(!$stats[$source])$stats[$source] = (object)['source'=>$source];

		$stats[$source]->alive = $count;
	}

	$total = (object)[];
	foreach($stats as &$s){
		$total->checked += $s->checked;	
		$total->alive += $s->alive;	
		$total->expired += $s->expired;			

		$s->expired_p = number_format(($s->checked)?((100*$s->expired)/$s->checked):0,2);
		$s->alive_p = number_format(($s->checked)?((100*$s->alive)/$s->checked):0,2);
	}

	$total->expired_p = number_format(($total->checked)?((100*$total->expired)/$total->checked):0,2);
	$total->alive_p = number_format(($total->checked)?((100*$total->alive)/$total->checked):0,2);

	json(['items'=>$stats,'total'=>$total]);
}
function getWeeklyScrape(){
	$days = 90;
	$range = array("-{$days} days","now");

	$stats = (object)array(
			'errors'	=> 0,
			'total'		=> 0,			
			'chartData'	=> array(),
	);

	//Get new Listings
	$morrisLabels = [];

	$wheresql = array();	
	$wheresql[] = "timestamp BETWEEN '".date('Y-m-d',strtotime($range[0]))." 00:00:00' AND '".date('Y-m-d',strtotime($range[1]))." 23:59:59'";
	$sql = "SELECT id,source,timestamp FROM listings
				WHERE ".implode(" AND ",$wheresql)." 
				ORDER BY timestamp DESC";	
	//t($sql);
	$q = mysql_query($sql);
	while($r = mysql_fetch_assoc($q)){		
		$source = $r['source'];
		$day = date('d',strtotime($r['timestamp']));
		$ym = date('Y-m',strtotime($r['timestamp']));
		if($day>=22) $date = $ym.'-22';
		else if($day>=15) $date = $ym.'-15';
		else if($day>=8) $date = $ym.'-8';
		else $date = $ym.'-1';

		if(!$stats->chartData['data'][$date]){
			$stats->chartData['labels'][] = $date;
			$stats->chartData['data'][$date][$source] = 0;
		}
		$stats->chartData['data'][$date][$source]++;
		if(!in_array($source,$morrisLabels))$morrisLabels[] = $source;
	}		
	
	$seriesMorris = array();	
	$series = array();	
	if($stats->chartData['labels']){
		sort($stats->chartData['labels']);	
		foreach($stats->chartData['labels'] as $i=>$l){	
			$mo = (object)["x"=>$l];	
			foreach($morrisLabels as $ml){
				$c = ($stats->chartData['data'][$l][$ml])?$stats->chartData['data'][$l][$ml]:0;
				$mo->{$ml} = $c;
			}
			$seriesMorris[] = $mo;			
		}
	}		

	$stats->chartData['morris_chart'] = [];
	$stats->chartData['morris_chart']['morris_data'] = $seriesMorris;
	$stats->chartData['morris_chart']['morris_labels'] = $morrisLabels;
	//$stats->chartData['morris_chart']['morris_colors'] = ["#80deea","#3bafda"];

	json($stats);
}




function getTraffic(){
	$domain = $_REQUEST['domain'];
	$data = getSourceTraffic($domain);
	json($data);
}
function getSourcesStats(){
	$stats = (object)array(
		'summaryData' => array(),	
		'chartData'	=> array(),
	);

	$range = $_REQUEST['range'];

	$wheresql = array("1=1");	
	if($range>0)$wheresql[] = "timestamp BETWEEN '".date('Y-m-d',strtotime("-{$range} days"))." 00:00:00' AND '".date('Y-m-d',strtotime('now'))." 23:59:59'";

	$sql = "SELECT count(id),source,status FROM listings
				WHERE ".implode(" AND ",$wheresql)."
				GROUP BY source,status";
	//t($sql);
	$q = mysql_query($sql);

	$seriesMorris = [];
	$morrisLabels = [];					
	$sources = [];
	$totals = [];
	while(list($count,$source,$status) = mysql_fetch_array($q)){					
		if(!$sources[$source]){ $sources[$source] = ["x"=>$source]; }
		$sources[$source][$status] = $count;		
		if(!in_array($status,$morrisLabels))$morrisLabels[] = $status;
		$totals[$source] += $count;
		
	}	
			
	foreach($sources as $source=>$r){		
		list($cachePending) = mysql_fetch_array(mysql_query("SELECT count(id) FROM listings WHERE ".implode(" AND ",$wheresql)." AND timestamp>'2022-10-01' AND source='{$source}' AND last_deal_cache IS NULL"));
		$seriesMorris[] = $r;
		$stats->summaryData[] = ['title'=>$source, 'value'=>$totals[$source], 'pending'=>$sources[$source]['pending'], 'pending_cahce'=>$cachePending];		
	}			

	$stats->chartData['morris_chart'] = [];
	$stats->chartData['morris_chart']['morris_data'] = $seriesMorris;
	$stats->chartData['morris_chart']['morris_labels'] = $morrisLabels;	
	$stats->chartData['morris_chart']['morris_colors'] = ["#d36d6d","#3bafda","#80deea"];
	
	json($stats);
}
function getSourcesStatsOLD(){
	$stats = (object)array(
		//'summaryData' => array(),	
		'chartData'	=> array(),
	);

	$range = $_REQUEST['range'];

	$wheresql = array("1=1");	
	if($range>0)$wheresql[] = "timestamp BETWEEN '".date('Y-m-d',strtotime("-{$range} days"))." 00:00:00' AND '".date('Y-m-d',strtotime('now'))." 23:59:59'";

	$sql = "SELECT count(id),source FROM listings
				WHERE ".implode(" AND ",$wheresql)."
				GROUP BY source";
	//t($sql);
	$q = mysql_query($sql);

	$seriesMorris = [];
	$morrisLabels = ["Listings"];					
	while(list($count,$source) = mysql_fetch_array($q)){			
		$seriesMorris[] = (object)["x"=>$source,"Listings"=>$count];
	}

	$stats->chartData['morris_chart'] = [];
	$stats->chartData['morris_chart']['morris_data'] = $seriesMorris;
	$stats->chartData['morris_chart']['morris_labels'] = $morrisLabels;
	$stats->chartData['morris_chart']['morris_colors'] = ["#3bafda"];
	
	json($stats);
}
function getSourceTraffic($domain){		
	if(!$domain) return false;

	$days = 2;
	$range = array("-{$days} days","now");

	$stats = (object)array(
			'errors'	=> 0,
			'total'		=> 0,		
			'summaryData' => array(),	
			'chartData'	=> array(),
	);
	$limit = 100000;	

	$wheresql = array();
	$wheresql[] = "domain='{$domain}'";
	$wheresql[] = "timestamp BETWEEN '".date('Y-m-d',strtotime($range[0]))." 00:00:00' AND '".date('Y-m-d',strtotime($range[1]))." 23:59:59'";

	$sql = "SELECT * FROM traffic_log
				WHERE ".implode(" AND ",$wheresql)."
				ORDER BY timestamp DESC LIMIT {$limit}";
	//t($sql);
	$q = mysql_query($sql);

	while($r = mysql_fetch_assoc($q)){		
		$date = date('Y-m-d H:00:00',strtotime($r['timestamp']));
		if(!$stats->chartData['data'][$date]){
			$stats->chartData['labels'][] = $date;
			$stats->chartData['data'][$date] = array();
		}
								
		if($r['code'] == '200' || $r['source_res'] == '200'){
			$stats->chartData['data'][$date]['ok']++;
		}
		else{			
			$stats->chartData['data'][$date]['errors']++;			
			$stats->errors++;		
		}
		$stats->chartData['data'][$date]['total']++;
		$stats->total++;
	}
	
	$seriesMorris = array();
	$morrisLabels = ["Success","Error","Total"];
	$series = array();
	if($stats->total){
		foreach(array_reverse($stats->chartData['labels']) as $i=>$l){
			$c1 = ($stats->chartData['data'][$l]['total'])?$stats->chartData['data'][$l]['total']:0;
			$c2 = ($stats->chartData['data'][$l]['errors'])?$stats->chartData['data'][$l]['errors']:0;		
			$c3 = ($stats->chartData['data'][$l]['ok'])?$stats->chartData['data'][$l]['ok']:0;
			$series[] = array($l,$c1,$c2,$c3);
			$seriesMorris[] = (object)["x"=>$l,"Success"=>$c3,"Error"=>$c2,"Total"=>$c3];
		}	
	}
	$stats->chartData['series'] = $series;	

	$stats->chartData['morris_chart'] = [];
	$stats->chartData['morris_chart']['morris_data'] = $seriesMorris;
	$stats->chartData['morris_chart']['morris_labels'] = $morrisLabels;
	$stats->chartData['morris_chart']['morris_colors'] = ["#80deea","#d36d6d","#3bafda"];
			
	$stats->error_p = ($stats->total)?(100*$stats->errors)/$stats->total:0;

	$stats->summaryData[] = ['title'=>'Total Requests', 'value'=>$stats->total];
	$stats->summaryData[] = ['title'=>'Total Errors', 'value'=>$stats->errors, 'color'=>'#d36d6d', 'text'=>number_format($stats->errors,0). '('.number_format($stats->error_p,2).'%)'];	

	return $stats;
}


function getScrapes(){
	$domain = $_REQUEST['domain'];
	$data = getSourceScrapes($domain);
	json($data);
}
function getSourceScrapes($domain){		
	if(!$domain) return false;

	$days = 14;
	$range = array("-{$days} days","now");

	$stats = (object)array(
			'errors'	=> 0,
			'total'		=> 0,			
			'chartData'	=> array(),
	);

	//Get new Listings
	$wheresql = array();
	$wheresql[] = "source='{$domain}'";
	$wheresql[] = "timestamp BETWEEN '".date('Y-m-d',strtotime($range[0]))." 00:00:00' AND '".date('Y-m-d',strtotime($range[1]))." 23:59:59'";
	$sql = "SELECT * FROM listings
				WHERE ".implode(" AND ",$wheresql)."
				ORDER BY timestamp DESC";	
	$q = mysql_query($sql);
	while($r = mysql_fetch_assoc($q)){		
		$date = date('Y-m-d',strtotime($r['timestamp']));
		if(!$stats->chartData['data'][$date]){
			$stats->chartData['labels'][] = $date;
			$stats->chartData['data'][$date] = array();
		}
		$stats->chartData['data'][$date]['new']++;
	}

	//Get Updates
	$wheresql = array();
	$wheresql[] = "l.source='{$domain}'";
	$wheresql[] = "u.timestamp BETWEEN '".date('Y-m-d',strtotime($range[0]))." 00:00:00' AND '".date('Y-m-d',strtotime($range[1]))." 23:59:59'";
	$sql = "SELECT u.timestamp,u.id FROM listings_updates AS u
				LEFT JOIN listings AS l ON l.remote_id=u.listing_id
				WHERE ".implode(" AND ",$wheresql)."
				ORDER BY u.timestamp DESC";	
	$q = mysql_query($sql);
	while($r = mysql_fetch_assoc($q)){		
		$date = date('Y-m-d',strtotime($r['timestamp']));
		if(!$stats->chartData['data'][$date]){
			$stats->chartData['labels'][] = $date;
			$stats->chartData['data'][$date] = array();
		}
		$stats->chartData['data'][$date]['updates']++;
	}	
	
	$seriesMorris = array();
	$morrisLabels = ["New","Updates"];
	$series = array();	
	if($stats->chartData['labels']){
		sort($stats->chartData['labels']);	
		foreach($stats->chartData['labels'] as $i=>$l){
			$c1 = ($stats->chartData['data'][$l]['new'])?$stats->chartData['data'][$l]['new']:0;
			$c2 = ($stats->chartData['data'][$l]['updates'])?$stats->chartData['data'][$l]['updates']:0;					
			$series[] = array($l,$c1,$c2);
			$seriesMorris[] = (object)["x"=>$l,"New"=>$c1,"Updates"=>$c2];	
		}
	}	
	$stats->chartData['series'] = $series;	

	$stats->chartData['morris_chart'] = [];
	$stats->chartData['morris_chart']['morris_data'] = $seriesMorris;
	$stats->chartData['morris_chart']['morris_labels'] = $morrisLabels;
	$stats->chartData['morris_chart']['morris_colors'] = ["#80deea","#3bafda"];

	return $stats;
}