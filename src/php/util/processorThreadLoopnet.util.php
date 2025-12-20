<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

$vars = json_decode($argv[1]);
$remoteId = $vars->rId;

if(!$remoteId) t("Event not found!!");

uselib('scrapers::loopnet');
$sc = new Loopnet();
$sc->process($remoteId);
