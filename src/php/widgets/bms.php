<?php
session_write_close();

uselib("benchmarks");
$bm = new Benchmarks();

usehelper('ajax::dispatch');

function getBm(){
	global $bm;

	$types = $_REQUEST['types'];
	$levels = $_REQUEST['levels'];
	$zip = $_REQUEST['zip'];
	if(!$zip)err("Zip is required!");
	if(!$types)err("Type is required");

	$res = [];
	if(in_array('zhvi',$types)){
		$res['zhvi'] = $bm->getZHVI($zip,$levels);
	}

	json($res);
}