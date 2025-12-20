<?php
$path = '../../php';
include_once($path.'/helpers/cli.php');
uselib('process');

require_once $GLOBALS['system']['lib_path'].'/cronScheduler/vendor/autoload.php';
use GO\Scheduler;
$scheduler = new Scheduler();

$scheduler->php($GLOBALS['system']['util_path'].'/cleanup.util.php')->at('0 0 * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('cleanup.util.php',(60*60*12),$lastExecutionTime);});

$scheduler->php($GLOBALS['system']['util_path'].'/listingChecker.util.php')->at('0 0 * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('listingChecker.util.php',(60*60*20),$lastExecutionTime);});

$scheduler->php($GLOBALS['system']['util_path'].'/scraperCE.util.php')->at('0 10,22 * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('scraperCE.util.php',(60*60*6),$lastExecutionTime);});
$scheduler->php($GLOBALS['system']['util_path'].'/processorCE.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('processorCE.util.php.util.php',(60*60*6),$lastExecutionTime);});

$scheduler->php($GLOBALS['system']['util_path'].'/scraperCrexi.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('scraperCrexi.util.php.util.php',(60*60*5),$lastExecutionTime);});
$scheduler->php($GLOBALS['system']['util_path'].'/processorCrexi.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('processorCrexi.util.php.util.php',(60*60*5),$lastExecutionTime);});

$scheduler->php($GLOBALS['system']['util_path'].'/scraperCrexiLease.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('scraperCrexi.util.php.util.php',(60*60*5),$lastExecutionTime);});
$scheduler->php($GLOBALS['system']['util_path'].'/processorCrexiLease.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('processorCrexi.util.php.util.php',(60*60*5),$lastExecutionTime);});

$scheduler->php($GLOBALS['system']['util_path'].'/scraperCentury.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('scraperCentury.util.php',(60*60*5),$lastExecutionTime);});
$scheduler->php($GLOBALS['system']['util_path'].'/processorCentury.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('processorCentury.util.php',(60*60*5),$lastExecutionTime);});

$scheduler->php($GLOBALS['system']['util_path'].'/scraperLoopnet.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('scraperCentury.util.php',(60*60*5),$lastExecutionTime);});
$scheduler->php($GLOBALS['system']['util_path'].'/processorLoopnet.util.php')->at('0 * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('processorCentury.util.php',(60*60*5),$lastExecutionTime);});

//$scheduler->php($GLOBALS['system']['util_path'].'/dealsCacher.util.php')->at('0 * * * *');
$scheduler->php($GLOBALS['system']['util_path'].'/cacher/cacherLauncher.util.php')->at('0 * * * *');
$scheduler->php($GLOBALS['system']['util_path'].'/cacher/cacherFixer.util.php')->at('*/30 * * * *');

$scheduler->php($GLOBALS['system']['util_path'].'/autotag_new.util.php')->at('* * * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('autotag_new.util.php',(60*10),$lastExecutionTime);});
$scheduler->php($GLOBALS['system']['util_path'].'/autotag_fix.util.php')->at('0 */6 * * *')->onlyOne(null, function ($lastExecutionTime) {return resetUtil('autotag_fix.util.php',(60*60*6),$lastExecutionTime);});

$scheduler->run();


function resetUtil($util,$timeout,$exectime){
	$runtime = (time() - $exectime);
	t("{$util} Runtime: {$runtime}",1);
	if($runtime > $timeout){
		$res = killRunningThreads($util);
		return ($res)?true:false;
	}
	return false;
}
function killRunningThreads($util){
	$threads = 1;
	$pids = getRunningPids($util);
	//t("Found: ".count($pids),1);
	$flag = true;
	if(count($pids)>=1){
		foreach($pids as $pid){
			$pr = new Process();
			$pr->setPid($pid);
			$pr->stop();
			sleep(1);
			if($pr->status())$flag = false;
			t("Killed PID: {$pid} || Status: {$pr->status()}",1);
		}
	}
	return $flag;
}
function getRunningPids($util){
	$lookup = $GLOBALS['system']['util_path'].'/'.$util;

	$pids = array();

	$mypid = getmypid();
	$cmd = 'ps aux | grep \''.$lookup.'\'';
	$res = trim(shell_exec($cmd));
	$lines = explode("\n",$res);
	foreach($lines as $l){
		if(strpos($l,$cmd) !== false || strpos($l,'grep') !== false || strpos($l,'.lock') !== false)continue;

		$cols = preg_split("/\t+|\s+/",$l);
		$pid = $cols[1];

		t("PID: $pid",1);
		if(!$pid || $pid == $mypid)continue;
		$pids[] = $pid;
	}
	return $pids;
}

?>