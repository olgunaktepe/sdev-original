<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

uselib('deal');
$dl = new Deal();

$id = $argv[1];
if(!$id)t("Item ID not specified");

$q = mysql_query("SELECT * FROM listings WHERE id='{$id}' AND status='ready'");
$r = mysql_fetch_assoc($q);
if(!$r)t('Invalid');
            
t("Processing {$r['id']} - {$r['timestamp']}",1);


$lat = $r['lat'];
$lng = $r['lng'];
$res = $dl->checkDuplicateListings($r['id'], $lat,$lng,true,false,true);
//t($res,1);

t('done');