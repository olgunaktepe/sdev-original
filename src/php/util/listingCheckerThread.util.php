<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('scrapers::ce');
uselib('scrapers::crexi');
uselib('scrapers::loopnet');
uselib('scrapers::century');

$vars = json_decode($argv[1]);
$rId = $vars->rId;
$source = $vars->source;

if(!$rId) t("Event not found!!");

switch($source){
    case 'crexi.com':
        $sc = new Crexi();        
        break;
    case 'lease-crexi.com':
        $sc = new Crexi('lease');        
        break;
    case 'commercialexchange.com':
        $sc = new CE();        
        break;
    case 'century21.com':
        $sc = new Century();        
        break;
    case 'loopnet.com':
        $sc = new Loopnet();        
        break;        
    default:
        $sc = false;        
        break;            
}
if(!$sc)t("Not supported");

$res = $sc->pingListing($rId);
t($res,1);

if($res->error){ t("error...",1); exit; }

if($res->active){
    mysql_query("UPDATE listings SET last_seen=NOW(), expired=0 WHERE source='{$source}' AND remote_id='{$rId}'");
    t(mysql_error(),1);
}
else{
    mysql_query("UPDATE listings SET expired=1 WHERE source='{$source}' AND remote_id='{$rId}'");
}