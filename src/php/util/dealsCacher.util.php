<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

//Moved to /cacher/cacherLauncher.util.php
t('OFFF');

uselib('deal');
$dl = new Deal();

$threads = getRunningThreads('dealsCacher.util.php');
if($threads>1)t("Already running...");

$cutoff = 10;
$limit = 10;

do{
    $found = false;
    $q = mysql_query("SELECT * FROM listings WHERE status='ready' AND last_deal_cache IS NULL AND timestamp > NOW() - INTERVAL {$cutoff} DAY ORDER BY id DESC LIMIT {$limit}");
    while($r = mysql_fetch_assoc($q)){
        $found = true;

        mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE id='{$r['id']}'");
        t("Processing {$r['id']} - {$r['timestamp']}",1);

        $start = time();
        $deal = $dl->getDeal($r['id'],false);

        if($deal)mysql_query("UPDATE listings SET type='{$deal->standerized->type}' WHERE id='{$r['id']}'");
        else mysql_query("UPDATE listings SET last_deal_cache=NULL WHERE id='{$r['id']}'");
        t("BM: ".(time()-$start),1);
    }
}while($found);


function getRunningThreads($util){
	//t('ps aux | grep \''.$util.'\' | wc -l',1);
    $pid = getmypid();        
	$threads = trim(shell_exec('ps aux | grep -v \''.$pid.'\' | grep -v \'grep\' | grep \''.$util.'\' | wc -l'));	
	return $threads;
}