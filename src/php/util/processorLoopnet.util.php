<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('process');
uselib('scrapers::loopnet');
$sc = new Loopnet();

$maxThreads = 5;

$pending = $sc->getAllPending();
t("Pending: ".count($pending),1);


$pIds = array();
foreach($pending as $p){
	$rId = $p->remote_id;
		
	t('Starting Thread: '.$rId,1);
	$cmd = 'php '.$GLOBALS['system']['util_path'].'/processorThreadLoopnet.util.php'.' \'{"rId":"'.$rId.'"}\'';
	t($cmd,1);
	$process = new Process($cmd);
	$process->start();
	$pId = $process->getPid();
		
	$pIds[] = $pId;
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
	}while($running>=$maxThreads);
	$pIds = $filtered;

	/*
	try{
		$sc->process($p->remote_id);
	}catch(Exception $e){}
	*/		
}


function checkPid($pId){
	if(!$pId)return false;
	
	$process = new Process();
	$process->setPid($pId);
	
	return $process->status();
}