<?php 
set_time_limit(60*20);
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('deal');
$dl = new Deal();

$id = $argv[1];
if(!$id)t('no ID');

$deal = $dl->getDeal($id); 
t('RES_CONTENT:'.json_encode($deal),1);








