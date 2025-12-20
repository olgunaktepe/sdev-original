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

//$start = time();
$deal = $dl->getDeal($r['id'],false);
if(!$deal || !$deal->census){
    mysql_query("DELETE FROM deals_cache2 WHERE listing_id='{$r['id']}'");
	$deal = $dl->getDeal($r['id'],false);
}

t($deal->standerized->type,1);

if($deal){
    mysql_query("UPDATE listings SET type='{$deal->standerized->type}', last_deal_cache=NOW() WHERE id='{$r['id']}'");
}
else{    
    mysql_query("UPDATE listings SET last_deal_cache=NULL WHERE id='{$r['id']}'");
} 

t('Done');

