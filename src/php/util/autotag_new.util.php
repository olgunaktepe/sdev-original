<?php 
set_time_limit(0);
include_once('/home/sdev/public_html/php/helpers/cli.php');

$tw = new Twilio();
$q = mysql_query("SELECT * FROM twilio_log WHERE auto_tagged=0 ORDER BY id DESC");
while($r = mysql_fetch_assoc($q)){
	$res = $tw->autotagLog($r['id']);	
}
t('done');
