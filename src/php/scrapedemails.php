<?php
uselib('AWS::mturk');

usehelper("ajax::dispatch");

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
function loadEmails(){		
	$sortColumns = array('e.email','e.subject','e.date','e.mturk_status','');
			
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
		$orderby = array('e.date DESC');
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
						$wheresql[] = "e.subject like '%".trim($v)."%' OR e.email LIKE '%".trim($v)."%'";
						break;
					case 'status':
						$wheresql[] = "e.mturk_status='{$v}'";
						break;					
					case 'date':
						$range = explode(" - ",$v);
						$wheresql[] = "e.date BETWEEN '".dbdate($range[0])." 00:00:00' AND '".dbdate($range[1])." 23:59:59'";
						break;					
					default:
						break;
				}
			}
		}
	}	
	
	$sql = "SELECT SQL_CALC_FOUND_ROWS e.* FROM emails AS e					
				WHERE ".implode(" AND ",$wheresql)." 
				GROUP BY e.id				
				ORDER BY  " . implode(' ', $orderby) . " $limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		//t($r['data']);
		$array[] = formatEmail($r);
	}	
	json(array(
		//'sql'=>preg_replace("/\n|\r|\t/"," ",$sql),
		'data'=> $array,
		'total' => $total,
		'page' => $offset,
		'sort'	=> ($sortby)?$sortby['col']:$_REQUEST['order'][0]['column'],
		'sortDir' => ($sortby)?$sortby['dir']:$_REQUEST['order'][0]['dir'],
		'length' => $length,
	));
}
function formatEmail($r){					
	return (object)$r;
}