<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('scrapers::crexi');
$sc = new Crexi('lease');
$sc->scrape();