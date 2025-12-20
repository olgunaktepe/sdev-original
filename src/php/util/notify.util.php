<?php 
include_once('/home/alex/public_html/php/helpers/cli.php');


t('OFFFFFFFFFFFFFFFF');




//Check if scrapers stopped working!
list($fb_ts) = mysql_fetch_array(mysql_query("SELECT timestamp FROM `listings` WHERE site='facebook.com' ORDER BY `timestamp` DESC LIMIT 1"));
list($cl_ts) = mysql_fetch_array(mysql_query("SELECT timestamp FROM `listings` WHERE site='craigslist.org' ORDER BY `timestamp` DESC LIMIT 1"));

$fbh = (strtotime('now')-strtotime($fb_ts))/60/60;
$clh = (strtotime('now')-strtotime($cl_ts))/60/60;

if($fbh>12){
	email('gontham.inc@gmail.com','URGENT: FB Stopped Working: '.$fb_ts,'URGENT: CL Stopped Working: '.$fb_ts);
}
if($clh>12){
	email('gontham.inc@gmail.com','URGENT: CL Stopped Working: '.$cl_ts,'URGENT: FB Stopped Working: '.$cl_ts);
}


$count = 0;
do{
	$found = false;
	$q = mysql_query("SELECT * FROM notifications WHERE sent=0 ORDER BY RAND() LIMIT 1");
	$r = mysql_fetch_assoc($q);
	if(!$r)exit;
	
	$count++;
	t("Processing: ".$r['id'],1);
	
	$found = true;
	mysql_query("UPDATE notifications SET sent=1 WHERE id='{$r['id']}'");
	
	list($site) = mysql_fetch_array(mysql_query("SELECT site FROM listings WHERE id='{$r['listing_id']}'"));
	
	if($site == 'facebook.com'){		
		$from = 'FB';
		$fromEmail = 'fbscraper@alexsearchengine.com';
	}
	else{
		$from = 'CL';
		$fromEmail = 'clscraper@alexsearchengine.com';
	}	

	t("Count: ".$count,1);
	email('tsteven4111@gmail.com',$r['subject'],$r['message'],$from,$fromEmail);
	//email('gontham.inc@gmail.com',$r['subject'],$r['message'],$from,$fromEmail);
	sleep(1);	
}while($found);