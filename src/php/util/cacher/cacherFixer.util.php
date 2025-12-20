<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

uselib('deal');
$dl = new Deal();

$cutoff = 3;
$q = mysql_query("SELECT * FROM listings WHERE status='ready' AND last_deal_cache > NOW() - INTERVAL {$cutoff} DAY");
while($r = mysql_fetch_assoc($q)){
    $id = $r['id'];

    t("ID: ".$id,1);
    $res = $dl->getDeal($id);
    if(!$res || !$res->census){
        t("Fixing...",1);
        mysql_query("DELETE FROM deals_cache2 WHERE listing_id='{$id}'");
        $res = $dl->getDeal($id,false);
    }
}