<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

uselib('process');

//Reset cache
mysql_query("TRUNCATE TABLE dups");
mysql_query("UPDATE listings SET last_dups_cache=NULL WHERE last_dups_cache IS NOT NULL");

$selfUtil = 'dupsRecacher.util.php';
$threads = getRunningThreads($selfUtil);
t("Running: ".$threads,1);
if($threads>=1)t('Already running...');

$sqlLimit = 5;
$maxThreads = 20;
$util = 'dupsRecacherThread.util.php';
$cmd = 'php '.$GLOBALS['system']['util_path'].'/cacher/'.$util;

$debug = false;
do{            
	$threads = getRunningThreads($util);
	t("Running Threads: {$threads}",1);
	if($threads >= $maxThreads){
		sleep(5);
		continue;
	}

    $items = getNext($sqlLimit);     
	if(!$items){
		t("No items found...");		
	}
	
	foreach($items as $item){
		t("Starting Thread...({$item['id']})",1);
		$process = new Process("$cmd {$item['id']}");
    	t("$cmd {$item['id']}",1);
		$process->start();
		//$pId = $process->getPid();		
        mysql_query("UPDATE listings SET last_dups_cache=NOW() WHERE id='{$item['id']}'");    
	}    
	//sleep(1);
	
}while(1);
exit;

function getNext($limit=1){
	global $cutoff;
	
	$items = [];
    $sql = "SELECT l.* FROM listings AS l 			
			 WHERE l.status='ready' AND last_dups_cache IS NULL AND timestamp>='2022-10-01' ORDER BY l.id DESC LIMIT {$limit}";
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
