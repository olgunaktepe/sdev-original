<?php 	
session_write_close();

usehelper("ajax::dispatch");


$cmd = "ps aux --sort=lstart | grep .util";
exec($cmd,$res);

$count = array();
$list = array();
foreach($res as $r){
	if(strpos($r,".lock")!==false)continue;
	if(strpos($r,"ps aux")!==false)continue;
	if(strpos($r,"grep ")!==false)continue;
	
	$p = preg_split("/\s+/",$r);
	$p["10"] = join(" ",array_splice($p,10));
	
	
	preg_match("/\/(.*)\/(.*?).util.php/",$p["10"],$matches);
	$util = $matches[2];	
	array_unshift($p,$util);
	$count[$util]++;
	
	$list[] = $p;
}

arsort($count);
?>