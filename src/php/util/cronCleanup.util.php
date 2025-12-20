<?php
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

$cmd = 'ls /tmp -l | awk \'/.lock/ {print $9}\'';
exec($cmd,$locks);
foreach($locks as $l){
	$cmd = 'ps aux | grep '.$l;
	//t($cmd,1);
	$pids = array();
	exec($cmd,$pids);
	$found = count($pids)-2;
	
	if(!$found){
		t("Lock not active: ".$l,1);
		//exec("rm -f /tmp/{$l}");
	}
}

