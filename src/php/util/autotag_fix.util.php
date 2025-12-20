<?php 
set_time_limit(0);
include_once('/home/sdev/public_html/php/helpers/cli.php');

$tw = new Twilio();
$q = mysql_query("SELECT * FROM twilio_log WHERE autotag_listingIds='' AND timestamp >= now() - INTERVAL 24 HOUR");
while($r = mysql_fetch_assoc($q)){
	$res = $tw->autotagLog($r['id']);	
}
t('done');
