<?php 

Class Score{
	private $settings; 
	
	public function __construct(){
		$this->settings = (object)array(			
			'key'		=> $GLOBALS['SETTINGS']['score_apikey'],
			'on'		=> false										
		);
	}	
	public function getScore($lat,$lng,$cacheOnly=false){	
		
		
		if(!$this->settings->on)	return false;				//Turn OFF

		$res = $this->checkCache($lat,$lng);
		if($cacheOnly)return $res;		
		if($res)return $res;			
		
		#$url = "https://cls.moodysanalytics.com/cls/badge?lat={$lat}&long={$lng}&styles=%7B%22linkColor%22%3A%22%231085D1%22%2C%22border%22%3A%22none%22%7D&type=office&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEbEdOREU0TURNd1FUVTVRalpETmpCRE1USTNNRGt4TkVWQ01VVTNNRFk0UmtJNE4wVXhNdyJ9.eyJpc3MiOiJodHRwczovL2Rldm1vb2R5cy5hdXRoMC5jb20vIiwic3ViIjoiV3hwb1oyQ09Rc1drNXdKdFJNaFBxcXFrdlNlZTlERkdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY2xzLm1vb2R5c2FuYWx5dGljcy5jb20iLCJpYXQiOjE2MTI0ODY4MjgsImV4cCI6MTYxMjU3MzIyOCwiYXpwIjoiV3hwb1oyQ09Rc1drNXdKdFJNaFBxcXFrdlNlZTlERkciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.YJD4MFJGF_PCcLRj12SAk60gJCYBVnIylC-BD_9Odg_wUoSh02bT6eH2Zum1hP2uz-HoU-MDZ46Ext5z43Q3sDhR2rcOhtsirvDHdyiBTxIV_W6R2C7gnRSA1JJ8gK2ltPRTmxvKhcv1nSfbqFo38sRVou3in-mj93S12EthELjqXHeZwh92EzcIYNwNusqztjV8UlLSebdWkVR8lOSQq1vS2790aLzXDl86rSbzjkRfrMYxlWMcuNkni1qHqZnpjvRoMCHwIRlPBip7dO76Zc4zCdWNZW2fptLn25sodJ1EQgXK78IzDwmvJsgChs8yCvOJUEWTthdY8VBgkjT_MA&body=%3Cdiv%3EScores%20range%20between%20400%20and%201000%3C/div%3E&userNameRequesting=undefined";		
		$url = "https://cls.moodysanalytics.com/cls/api/v1/badge/reverse?lat={$lat}&long={$lng}";
		t($url,1);

		$headers = array(
				"authorization: Bearer ".$this->settings->key,
				#"accept-language: en-US,en;q=0.9",
				#"content-type: application/json",				
		);
		
		$tries = 0;
		do{
			$res = curl_get($url,$headers,false);			
			$res = json_decode($res);
			$tries++;		
			if(!$res)sleep(1);
		}while(!$res && $tries<5);
		
		if($res){
			$this->saveCache($lat,$lng,$res);
		}
		 
		return $res;
	}
	private function saveCache($lat,$lng,$res){
		$res = mysql_real_escape_string(json_encode($res));
		mysql_query("INSERT INTO listings_scores SET lng='{$lng}',lat='{$lat}',res='{$res}'");
	}
	private function checkCache($lat,$lng){		
		list($data) = mysql_fetch_array(mysql_query("SELECT res FROM listings_scores WHERE lng='{$lng}' AND lat='{$lat}'"));				
		$data = json_decode($data);		
		return $data;
	}
}