<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('scrapers::loopnet');
$sc = new Loopnet();
$sc->scrape('sale');
$sc->scrape('lease');