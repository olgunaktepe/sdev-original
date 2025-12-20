<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

uselib('process');

$selfUtil = 'cacherLauncher2.util.php';
$threads = getRunningThreads($selfUtil);
t("Running: ".$threads,1);
if($threads>=1)t('Already running...');

$cutoff = 60;
$sqlLimit = 5;
$maxThreads = 20;
$util = 'cacherThread2.util.php';
$cmd = 'php '.$GLOBALS['system']['util_path'].'/cacher/'.$util;

$history = [];
$debug = false;
do{            
	$threads = getRunningThreads($util);
	t("Running Threads: {$threads}",1);
	if($threads >= $maxThreads){
		sleep(5);
		continue;
	}

    $items = getNext($history,$sqlLimit);     
	if(!$items){
		t("No items found...",1);
		sleep(5);
		continue;
	}
	
	foreach($items as $item){
		t("Starting Thread...({$item['id']})",1);
		$process = new Process("$cmd {$item['id']}");
    	t("$cmd {$item['id']}",1);
		$process->start();
		$pId = $process->getPid();
		$history[] = $item['id'];		
	}
    //mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE id='{$item['id']}'");    
	//sleep(1);
	
}while(1);
exit;

function getNext($history,$limit=1){
	global $cutoff;
	
	$items = [];

    
    $sql = "SELECT l.* FROM listings AS l 
			LEFT JOIN deals_cache2 AS c ON c.listing_id=l.id
			 WHERE l.id NOT IN ('".implode("','",$history)."') AND l.type!='lease' AND l.status='ready' AND c.listing_id IS NULL AND l.timestamp > NOW() - INTERVAL {$cutoff} DAY ORDER BY l.id DESC LIMIT {$limit}";
	//xt($sql,1);
	$q = mysql_query($sql);
	if(mysql_error())t(mysql_error());
	while($r = mysql_fetch_assoc($q)) $items[] = $r;
	
    return $items;
}
function getRunningThreads($util){	
    $pid = getmypid();
	$threads = trim(shell_exec('ps aux | grep \''.$util.'\' | grep -v .lock | grep -v '.$pid.' | grep -v grep | wc -l'));		
	if($threads<0)$threads=0;

	return $threads;
}
