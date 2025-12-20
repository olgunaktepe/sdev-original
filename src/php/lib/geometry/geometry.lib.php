<?php
require (dirname(__DIR__).'/geometry/vendor/autoload.php');

Class Geometry{    
    public function __construct(){
    
    }
    public function pointInPoly($lat,$lng,$geo){
        //Not accurate!
        if(!$lat || !$lng || !$geo)return false;

        foreach($geo as $g){            
            $poly =  \GeometryLibrary\PolyUtil::decode($g);                          
            $response =  \GeometryLibrary\PolyUtil::isLocationOnPath(['lat' => $lat, 'lng' => $lng],$poly);                                 
            return $response;
        }                
    }
}
    