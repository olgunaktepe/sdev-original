<?php 
uselib('AWS::s3'); 
uselib('scrapers::score');

Class Crexi{
	private $settings, $token; 
	
	public function __construct($api='sale'){
		$this->settings = (object)array(
			'source'	=> 'crexi.com',
			'sale_api'  => 'https://api.crexi.com',
			'lease_api'  => 'https://api-lease.crexi.com',
			'imageBase'	=> '',
			'user' => 'johnsm2332@camcastemail.com',
			'pass' => 'sunshine3443'
		);		
		$this->s3 = new S3();
		$this->sc = new Score();		
		$this->setMode($api);		
		$this->token = false;
	}
	public function setToken($token){
		$this->token = $token;
	}
	public function getToken(){
		$url = 'https://api.crexi.com/token';
		$data = [
			'grant_type'=>'password',
			'username'=>$this->settings->user,
			'password'=>$this->settings->pass,
			'browser_id'=>'ab653ab464ca4c3e9ddc7b5a3a810803'
		];
		$headers = [
			'content-type: application/x-www-form-urlencoded',
			'origin: https://www.crexi.com',
			'referer: https://www.crexi.com/',
		];
		$res = json_decode(curl_post($url,http_build_query($data),$headers,false))	;		
		return $res->access_token;	
	}
	public function login(){
		$token = $this->getToken();
		if(!$token)$token = $this->getToken();
		if(!$token)return false;

		$this->setToken($token);
		return true;
	}

	private function setMode($mode){
		if($mode == 'lease'){
			$this->settings->mode = 'lease';
			$this->settings->source = 'lease-crexi.com';
			$this->settings->api = $this->settings->lease_api;
		}
		else{
			$this->settings->mode = 'sale';
			$this->settings->api = $this->settings->sale_api;
		}
	}
	public function getAllPending($cutoff=60){
		if($cutoff<=0)$cutoff = 60;
		$items = array();
				
		$q = mysql_query("SELECT * FROM listings WHERE status IN ('pending') AND source='{$this->settings->source}' AND timestamp>=NOW() - INTERVAL {$cutoff} DAY LIMIT 50000");
		while($r = mysql_fetch_assoc($q)) $items[] = (object)$r;
		return $items;
	}
	public function process($rId){
		if(!$rId)return false;
		t("Processing: ".$rId,1);
		
		$obj = $this->getListingDetails($rId);		
		if(!$obj){ $this->markError($rId); return false; }		
		$obj->broker = $this->getListingBroker($rId);
	
		//Collect Images
		$images = array();
		$origImages = $this->getListingImages($rId);	
				
		t("Found images: ".count($origImages),1);
	
		//ProcessImages
		foreach($origImages as $m){ 			
			if($m->type != 'Image')continue;
	
			$imageFilename = $rId.'_'.$m->id.'.'.end(explode(".",$m->imageUrl));					
			$res = $this->processImage($m->imageUrl,$imageFilename);			
			if($res){
				$images[] = $imageFilename;
			}
		}		
		
		
		//Save info
		if($this->settings->mode == 'lease'){
			$url = 'https://www.crexi.com/lease/properties/'.$obj->id;
		}
		else{
			$url = 'https://www.crexi.com/properties/'.$obj->id;
		}		
	
		$dupItem = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE url='{$url}' AND remote_id!='{$rId}' AND status='ready'"));
		if($dupItem){
			$dupItem = (object)$dupItem;
			$data = mysql_real_escape_string($dupItem->data);
			mysql_query("UPDATE listings SET status='ready',data='{$data}',images='{$dupItem->images}',url='{$dupItem->url}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
		}
		else{
			$data = mysql_real_escape_string(json_encode($obj));
			$images = json_encode($images);
			mysql_query("UPDATE listings SET status='ready',data='{$data}',images='{$images}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
		}
		$error = mysql_error();
	
		if($error){
			$this->markError($rId);
		}
	}
	public function pingListing($id){
		$res = (object)['active'=>false,'error'=>false];
		$l = $this->getListingDetails($id);

		if($l && $l->id) $res->active = true;
		else{ $res->active = false; }

		return $res;
	}
	private function getListingDetails($id){
		$url = $this->settings->api.'/assets/'.$id;	

		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$obj = curl_get($url,array(),false);
			$obj = json_decode($obj);
			$tries++;
			if(!$obj)sleep(1);
		}while(!$obj && $tries<5);				
		return $obj;
	}
	
	public function getBrokerProfile($id){
		$url = 'https://api.crexi.com/public-profiles/'.$id;
		
		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$headers = [];
			if($this->token)$headers[] = 'authorization: Bearer '.$this->token;
			$obj = curl_get($url,$headers,false);
			$obj = json_decode($obj);
			$tries++;
			if(!$obj)sleep(1);
		}while(!$obj && $tries<15);

		return $obj;	
	}
	public function getListingBroker($id){
		$url = $this->settings->api.'/assets/'.$id.'/brokers';
		
		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$headers = [];
			if($this->token)$headers[] = 'authorization: Bearer '.$this->token;
			$obj = curl_get($url,array(),false);
			$obj = json_decode($obj);
			$tries++;
			if(!$obj)sleep(1);
		}while(!$obj && $tries<15);
		return $obj;				
	}
	private function getListingImages($id){
		$url = $this->settings->api.'/assets/'.$id.'/gallery?imagesOnly=true';
	
		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$obj = curl_get($url,array(),false);
			$obj = json_decode($obj);
			$tries++;
			if(!$obj)sleep(1);
		}while(!$obj && $tries<5);
		return $obj;
	}
	
	private function markError($rId){
		mysql_query("UPDATE listings SET status='error' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
	}
	public function processImage($url,$filename){					
		$fileContents = file_get_contents($url);
				
		$tempFilePath = $GLOBALS['system']['tmp_path'].'/'.$filename;
		if(file_exists($tempFilePath))unlink($tempFilePath);
		file_put_contents($tempFilePath,$fileContents);
							
		//t($tempFilePath,1);
		$res = $this->s3->send($tempFilePath);
		//t($res,1);
		unlink($tempFilePath);
		
		return $res;
	}
	public function scrape(){
		$this->startScrape('ActivatedOn');
		$this->startScrape('UpdatedOn');
	}
	public function scrapeNewListings(){
		$this->startScrape('ActivatedOn');	
	}	
	public function scrapeUpdatedListings(){
		$this->startScrape('UpdatedOn');
	}
	private function startScrape($sort='ActivatedOn'){
		$perpage = 100;				
		$page = 0;		
		do{
			$found = false;
	
			$url = $this->settings->api."/assets/search";
			$data = '{"activationPeriod":"SevenDays","includeUndisclosedRate":"true","includeUnpriced":"true","count":'.$perpage.',"offset":'.($page*$perpage).',"sortDirection":"Descending","sortOrder":"'.$sort.'","brokerIds":[]}';						
			$headers = array(
				"accept: application/json",
				"accept-language: en-US,en;q=0.9",
				"content-type: application/json",				
			);
		
			$tries = 0;
			do{				
				$res = curl_post($url,$data,$headers,false);				
				//t($res,1);
				$res = json_decode($res);
				$tries++;
				if(!$res)sleep(1);
			}while(!$res && $tries<5);			
			
			t("Found: ".$res->totalCount,1);
			if($res->data){
				$found = true;								
				
				foreach($res->data as $r){
					$rId = $r->id;																		
					if(!$rId)continue;																	
													
					list($oldId) = mysql_fetch_array(mysql_query("SELECT id FROM listings WHERE remote_id='{$rId}' AND source='{$this->settings->source}' AND status='ready'"));
					if($oldId){							
						mysql_query("UPDATE listings SET last_seen=NOW() WHERE remote_id='{$rId}' AND source='{$this->settings->source}'");
						$this->logUpdate($rId);								
					}					
					else{
						if($this->settings->mode == 'lease'){
							$type = 'lease';
							$link = 'https://www.crexi.com/lease/properties/'.$rId;
						}
						else{
							$type = 'sale';
							$link = 'https://www.crexi.com/properties/'.$rId;
						}	
						$name = mysql_real_escape_string($r->name);	

						$loc = ($r->locations)?reset($r->locations):$r->location;
						$lng = $loc->longitude;
						$lat = $loc->latitude;
												
						mysql_query("INSERT INTO listings SET type='{$type}', source='{$this->settings->source}', url='{$link}', remote_id='{$rId}', public_id='{$rId}', status='pending', title='{$name}', lng='{$lng}', lat='{$lat}', last_seen=NOW()");						
						//$this->sc->getScore($lat,$lng);
					}					
				}
			}
			$page++;
		}while($found);		
	}	
	
	
	public function startScrapeTest($startDate,$sort='ActivatedOn'){		
		$endDate = dbDate("$startDate +1 day");		
		$perpage = 100;				
		$page = 0;		
		do{
			$found = false;
	
			$url = $this->settings->api."/assets/search";
			#$data = '{"activationPeriod":"TwelveMonths","count":'.$perpage.',"offset":'.($page*$perpage).',"sortDirection":"Descending","sortOrder":"'.$sort.'","brokerIds":[]}';						
			$data = '{"activationDateMax": "'.$endDate.'T06:59:59.999Z", "activationDateMin": "'.$startDate.'T07:00:00.000Z", "activationPeriod":"Custom","count":'.$perpage.',"offset":'.($page*$perpage).',"sortDirection":"Descending","sortOrder":"'.$sort.'","brokerIds":[]}';						
			$headers = array(
				"accept: application/json",
				"accept-language: en-US,en;q=0.9",
				"content-type: application/json",				
			);

			$tries = 0;
			do{				
				$res = curl_post($url,$data,$headers,false);				
				$res = json_decode($res);
				$tries++;
				if(!$res)sleep(1);
			}while(!$res && $tries<5);	
			
			t("Found: ".$res->TotalCount,1);
			if($res->Data){
				$found = true;								
				
				foreach($res->Data as $r){ 
					$rId = $r->Id;																		
					if(!$rId)continue;																	
													
					list($oldId) = mysql_fetch_array(mysql_query("SELECT * FROM listings WHERE remote_id='{$rId}' AND source='{$this->settings->source}' AND status='ready'"));
					if($oldId){
						mysql_query("UPDATE listings SET last_seen=NOW() WHERE remote_id='{$rId}' AND source='{$this->settings->source}'");
						$this->logUpdate($rId);							
					}					
					else{
						if($this->settings->mode == 'lease'){
							$link = 'https://www.crexi.com/lease/properties/'.$rId;
						}
						else{
							$link = 'https://www.crexi.com/properties/'.$rId;
						}
						$name = mysql_real_escape_string($r->Name);	

						$loc = ($r->Locations)?reset($r->Locations):$r->Location;
						$lng = $loc->Longitude;
						$lat = $loc->Latitude;
						$ts = dbTimestamp($r->ActivatedOn);
						
						t($ts,1);
												
						mysql_query("INSERT INTO listings SET timestamp='{$ts}', source='{$this->settings->source}', url='{$link}', remote_id='{$rId}', public_id='{$rId}', status='pending', title='{$name}', lng='{$lng}', lat='{$lat}', last_seen=NOW()");												
						//$this->sc->getScore($lat,$lng);
					}					
				}
			}
			$page++;
		}while($found);		
	}	


	public function logUpdate($lId){
		if(!$lId)return false;
		
		#list($old) = mysql_fetch_array(mysql_query("SELECT data FROM listings WHERE remote_id='{$lId}' AND source='{$this->settings->source}'"));		
		list($old) = mysql_fetch_array(mysql_query("SELECT data FROM listings WHERE remote_id='{$lId}' AND source='{$this->settings->source}' AND (last_update_check<(NOW() - INTERVAL 6 HOUR) OR last_update_check IS NULL)"));		
		$old = json_decode($old);
		if(!$old)return false;
						
		t("Getting details...",1);
		$details = $this->getListingDetails($lId);
		if(!$details)return false;		
		$details->broker = $this->getListingBroker($lId);
		
		mysql_query("UPDATE listings SET last_update_check=NOW() WHERE remote_id='{$lId}' AND source='{$this->settings->source}'");									
		t("Checking...{$lId}",1);
		
	
		uselib('jsonDiff::jsonDiff');
		$diff = jsonDiff2::diff($old,$details);
		
		$count = $diff->getDiffCnt();
		$patchRaw = $diff->getPatch();
		$patch = jsonDiff2::getPatch($diff);	

		$changeDetected = 0;
		foreach($patch as $p){
			if($p->op == 'test')continue;
			if(preg_match("/agent|broker|modifiedDate|UpdatedOn|modifiedByUserDate|modifiedCoreFieldDate|lastVerifiedDate|lastVerifiedMethod|lastVerifiedBy/i",$p->path))continue;
			if($p->op == 'replace' && preg_match("/images|media/",$p->path))continue;
			$p->old = getJsonPathValue($old,$p->path);
			if(strtolower($p->old) == strtolower($p->value))continue;
			$changeDetected++;
		}
			
		if($changeDetected > 0){					
			mysql_query("INSERT INTO listings_updates SET source='{$this->settings->source}', listing_id='{$lId}', old_data='".mysql_real_escape_string(json_encode($old))."', patch='".mysql_real_escape_string(json_encode($patchRaw))."', diff_count='{$count}'");
			$patchId = mysql_insert_id();
			if(!$patchId)return false;
			mysql_query("UPDATE listings SET data='".mysql_real_escape_string(json_encode($details))."' WHERE remote_id='{$lId}' AND source='{$this->settings->source}'");
			
			foreach($patch as $p){
				if($p->op == 'test')continue;											
				$p->old = getJsonPathValue($old,$p->path);
											
				$update = array();
				$update['patch_id'] = $patchId;
				$update['listing_id'] = $lId;
				$update['operation'] = $p->op;
				$update['path'] = $p->path;
				$update['value_old'] = json_encode($p->old);
				$update['value_new'] = json_encode($p->value);
				$update['source'] = $this->settings->source;
				
				if(strtolower($update['value_old']) == strtolower($update['value_new']))continue;
												
				$updatesql = array();
				foreach($update as $k=>$v)$updatesql[] = "`$k` = '".mysql_real_escape_string($v)."'";				
				mysql_query("INSERT INTO listings_updates_operations SET ".implode(",",$updatesql));														
			}
		}
	}
}