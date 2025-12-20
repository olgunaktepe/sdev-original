<?php 
include_once 'GeoHash.php';
use Lvht\GeoHashLib;

Class geoHash{	
	public function __construct(){
		
	}
	
	static public function hash($lng, $lat){		
		return GeoHashLib::encode($lng, $lat);
	}
}


?>
