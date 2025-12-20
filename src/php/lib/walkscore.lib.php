<?php
Class Walkscore{
    public function __construct(){
        $this->settings = (object)[
            'key'       => 'e1ffb065b3ff0efee28321c6698a2db7',
        ];
    }
    public function getScore($lat, $lng) {
        $res = $this->checkCache($lat,$lng);		
		if($res)return $res;		
        $res = (object)[
            'walk' => $this->getWalkScore($lat,$lng),
            'transit' => $this->getTransitScore($lat,$lng),
        ];
        if($res->walk && $res->transit){
			$this->saveCache($lat,$lng,$res);
		}
        return $res;
    }
    private function getWalkScore($lat, $lng){    
        //t($lat.', '.$lng,1);
        $retries = 0;
        do{
            $url = "https://api.walkscore.com/score?format=json&address=";
            $url .= "&lat=$lat&lon=$lng&wsapikey={$this->settings->key}";
            $res = json_decode(curl_get($url,[],false));
            if(!$res)sleep(1);
            $retries++;
        }while(!$res && $retries<2);
        //t($res);
        return $res;
    }
    private function getTransitScore($lat,$lng){  
        $retries = 0;
        do{
            $url = "https://transit.walkscore.com/transit/score/?format=json";
            $url .= "&lat=$lat&lon=$lng&wsapikey={$this->settings->key}";
 
            $res = json_decode(curl_get($url,[],false));
            if(!$res)sleep(1);
            $retries++;
        }while(!$res && $retries<2);
        return $res;        
    }
    private function saveCache($lat,$lng,$res){
		$res = mysql_real_escape_string(json_encode($res));
		mysql_query("INSERT INTO walkscores SET lng='{$lng}',lat='{$lat}',data='{$res}'");
	}
	private function checkCache($lat,$lng){		
		list($data) = mysql_fetch_array(mysql_query("SELECT data FROM walkscores WHERE lng='{$lng}' AND lat='{$lat}'"));				
		$data = json_decode($data);		
		return $data;
	}
}