<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('process');

$selfUtil = 'listingChecker.util.php';
$threads = getRunningThreads($selfUtil);
t("Running: ".$threads,1);
if($threads>=1)t('Already running...');

$maxThreads = 50;
$checkRate = 1;                 //Once every X days.
$pIds = array();

$openThreads = $maxThreads;
do{
 
    t("Fetching {$openThreads} listings...",1);
    $listings = getNext($openThreads,$checkRate);
    if(!$listings) t("No listings to check");

    foreach($listings as $r){        
        switch($r['source']){
            case 'crexi.com':            
                $rId = $r['remote_id'];
                break;
            case 'lease-crexi.com':            
                $rId = $r['remote_id'];
                break;
            case 'commercialexchange.com':            
                $rId = $r['remote_id'];
                break;
            case 'century21.com':            
                $rId = $r['remote_id'];
                break;
            case 'loopnet.com':            
                $rId = $r['remote_id'];
                break;        
            default:            
                $rId = false;
                break;            
        }
        if(!$rId)continue;
            
        $source = $r['source'];    
        t('Starting Thread: '.$rId,1);
	    $cmd = 'php '.$GLOBALS['system']['util_path'].'/listingCheckerThread.util.php'.' \'{"rId":"'.$rId.'","source":"'.$source.'"}\'';
	    t($cmd,1);
	    $process = new Process($cmd);
	    $process->start();
	    $pId = $process->getPid();

        $pIds[] = $pId;        
    }    

    //Check threads
    $pIds = array_filter($pIds);
                    
    $filtered = array();
    do{
        $running = 0;		
        foreach($pIds as $pId){
            if(checkPid($pId)){
                $running++;
                if(!in_array($pId,$filtered))$filtered[] = $pId;
            }
        }
        
        t("Running threads: ".$running,1);
        sleep(1);

        $openThreads = $maxThreads-$running;

    }while($openThreads<=0);
    $pIds = $filtered;        
}while(1);
t('stop');

function getNext($perpage,$checkRate){    
    $items = [];
    $cutoff = dbDate("-{$checkRate} days");
    #$q = mysql_query("SELECT SQL_CALC_FOUND_ROWS * FROM listings WHERE timestamp>'2022-10-01' AND timestamp<'".dbDate('now')." 00:00:00' AND status='ready' AND expired = 0 AND (last_seen_check < '{$cutoff} 00:00:00' OR last_seen_check IS NULL) LIMIT {$perpage}");
    $q = mysql_query("SELECT SQL_CALC_FOUND_ROWS * FROM listings WHERE timestamp>'2022-10-01' AND timestamp<'".dbDate('now')." 00:00:00' AND status='ready' AND (expired = 0 OR (expired=1 AND last_seen>NOW() - INTERVAL 7 DAY)) AND (last_seen_check < '{$cutoff} 00:00:00' OR last_seen_check IS NULL) LIMIT {$perpage}");

    list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
    t("Total Pending: ".$total,1);

    $ids = [];
    while($r = mysql_fetch_assoc($q)){ $items[] = $r; $ids[]=$r['id']; }

    mysql_query("UPDATE listings SET last_seen_check=NOW() WHERE id IN (".implode(",",$ids).")");

    return $items;
}
function checkPid($pId){
	if(!$pId)return false;
	
	$process = new Process();
	$process->setPid($pId);
	
	return $process->status();
}
function getRunningThreads($util){	
    $pid = getmypid();
	$threads = trim(shell_exec('ps aux | grep \''.$util.'\' | grep -v .lock | grep -v '.$pid.' | grep -v grep | wc -l'));		
	if($threads<0)$threads=0;

	return $threads;
}