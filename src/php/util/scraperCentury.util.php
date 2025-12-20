<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('scrapers::century');
$sc = new Century();
$sc->scrape();