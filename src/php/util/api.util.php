<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

$key = $_REQUEST['key'];
if($key != $GLOBALS['API']['key'])err("Unauthorized Access");

usehelper("ajax::dispatch");
