<?php
require __DIR__ . '/vendor/autoload.php';

use yidas\googleMaps\Client;

Class Gmaps{
    private $settings, $client;

    public function __construct(){
        $this->settings = (object)[
            'api_key'       => 'AIzaSyBWxlCsVDAhp8jMnoJ5YNeWcXj55JAANCo', 
        ];
        $this->client = new \yidas\googleMaps\Client(['key'=>$this->settings->api_key]);
    }
    public function geocode($address){
        if(!$address)return false;

        $cache = $this->checkCacheAddress($address);
        if($cache)return $cache;

        mysql_query("INSERT INTO geocoding_requests SET ident='geocode', address='{$address}'");

        $res = $this->client->geocode($address);
        //if($res)
        $this->saveCacheAddress($address,$res);        
        return $res;
    }
    public function rgeocode($lat,$lng){
        if(!$lat || !$lng)return false;

        $cache = $this->checkCacheLatLng($lat,$lng);        
        if($cache)return $cache;

        if($lat=='0.0' || $lng == '0.0')return false;        
    
        $res = $this->client->reverseGeocode([$lat,$lng],['location_type'=>'ROOFTOP']);
        if(!$res)$res = $this->client->reverseGeocode([$lat,$lng]);

        mysql_query("INSERT INTO geocoding_requests SET ident='reverse_geocode', address='{$lat},{$lng}', res='".json_encode($res)."'");

        //if($res)
        $this->saveCacheLatLng($lat,$lng,$res);        
        return $res;
    }
    private function checkCacheAddress($address){        
        list($res) = mysql_fetch_array(mysql_query("SELECT data FROM gmaps_geocoding_cache WHERE address='{$address}'"));
        $res = json_decode($res);
        return $res;
    }
    private function checkCacheLatLng($lat,$lng){        
        list($res) = mysql_fetch_array(mysql_query("SELECT data FROM gmaps_geocoding_cache WHERE latlng='{$lat},{$lng}'"));
        $res = json_decode($res);
        return $res;
    }
    private function saveCacheAddress($address,$data){
        $data = mysql_real_escape_string(json_encode($data));
        $address = mysql_real_escape_string($address);
        mysql_query("INSERT INTO gmaps_geocoding_cache SET address='{$address}',data='{$data}'");
    }
    private function saveCacheLatLng($lat,$lng,$data){
        $data = mysql_real_escape_string(json_encode($data));
        $latlng = "{$lat},{$lng}";
        mysql_query("INSERT INTO gmaps_geocoding_cache SET latlng='{$latlng}',data='{$data}'");
    }

    
}