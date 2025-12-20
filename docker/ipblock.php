<?php
if(file_exists('settings.local.php'))include_once 'settings.local.php';
else include_once 'settings.php';

// Railway test environment bypass
if(!empty($GLOBALS['bypass_ipblock']))return;

include_once 'includes/php/main.php';
include_once 'php/main.php';

$ips = [
    '127.0.0.1', '::1', //Localhost dev
    '47.144.223.17', //Joe
    '136.55.9.190','45.22.67.175','172.58.168.156','68.228.29.176',
    '136.41.128.32',    //Giles Office
    '174.69.43.210','70.191.208.120', '68.146.201.148', '68.1.83.182',   //Giles Beach House
    '136.55.9.190',     //Ben Office
    '136.55.42.98',     //Ben House
    '70.15.181.229',    //Jason
];

$q = mysql_query("SELECT ip_whitelist FROM users WHERE ip_whitelist!=''");
while(list($r) = mysql_fetch_array($q)){
    $r = array_filter(explode(",",$r));
    if($r)$ips = array_merge($ips,$r);
}

$ips = array_filter(array_unique($ips));


if(in_array($_SERVER['REMOTE_ADDR'],$ips)){}
else{ header("Location: http://google.com"); exit;}
