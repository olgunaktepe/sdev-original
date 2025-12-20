<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

uselib('process');

$selfUtil = 'cacherLauncher.util.php';
$threads = getRunningThreads($selfUtil);
t("Running: ".$threads,1);
if($threads>=1)t('Already running...');

$maxThreads = 20;
$util = 'cacherThread.util.php';
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

    $item = getNext($history);     
	if(!$item['id']){
		t("No items found...",1);
		sleep(5);
		continue;
	}
	
	    	
	t("Starting Thread...({$item['id']})",1);
	$process = new Process("$cmd {$item['id']}");
    t("$cmd {$item['id']}",1);
	$process->start();
	$pId = $process->getPid();
	$history[] = $item['id'];
    //mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE id='{$item['id']}'");    
	sleep(1);
	
}while(1);
exit;

function getNext($history){
    $cutoff = 10;
    $sql = "SELECT * FROM listings WHERE id NOT IN ('".implode("','",$history)."') AND status='ready' AND last_deal_cache IS NULL AND timestamp > NOW() - INTERVAL {$cutoff} DAY ORDER BY id DESC LIMIT 1";
	//t($sql,1);
	$q = mysql_query($sql);
	if(mysql_error())t(mysql_error());
	$r = mysql_fetch_assoc($q);    

    return $r;
}
function getRunningThreads($util){	
    $pid = getmypid();
	$threads = trim(shell_exec('ps aux | grep \''.$util.'\' | grep -v .lock | grep -v '.$pid.' | grep -v grep | wc -l'));		
	if($threads<0)$threads=0;

	return $threads;
}
