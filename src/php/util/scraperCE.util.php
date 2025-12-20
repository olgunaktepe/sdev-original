<?php 
set_time_limit(0);
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('scrapers::ce');
$sc = new CE();
$sc->scrape(60,true);