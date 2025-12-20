<?php 
uselib('AWS::s3'); 
uselib('scrapers::score');

Class CE{
	private $settings; 
	
	public function __construct(){
		$this->settings = (object)array(
			'source'	=> 'commercialexchange.com',
			'key'		=> $GLOBALS['SETTINGS']['commercialexchange_apikey'],
			'imageBase'	=> 'https://api.commercialexchange.com/api/images/data/md/43/',	
			'proxy'		=> '95.211.175.167:13200',							
		);
		
		
		$this->s3 = new S3();
		$this->sc = new Score();
	}	
	
	public function getBuildingSpaces($listingId){
		list($lat,$lng) = mysql_fetch_array(mysql_query("SELECT lat,lng FROM listings WHERE id='{$listingId}' AND source='{$this->settings->source}'"));

		$items = [];
		$q = mysql_query("SELECT * FROM listings WHERE source='{$this->settings->source}' AND lat='{$lat}' AND lng='{$lng}'");
		while($r = mysql_fetch_assoc($q)) $items[] = $r;

		$sIds = [];            
		$children = [];
        foreach($items as $s){
            //if($res['status'] !== 'ready')continue;                
            $standerized = reset(standerizeListing([(object)$s]));
            if($standerized->children){                    
                $child = $standerized->children[0];
                if(in_array($child->id,$sIds))continue;
                $sIds[] = $child->id;
                $children[] = $child;
            }
        }        

		return $children;
	}
	public function getImageBaseUrl(){
		return $this->settings->imageBase;
	}
	public function getAllPending(){
		$items = array();
		
		$q = mysql_query("SELECT * FROM listings WHERE status IN ('pending') AND source='{$this->settings->source}' AND timestamp>=NOW() - INTERVAL 60 DAY LIMIT 50000");
		#$q = mysql_query("SELECT * FROM listings WHERE status IN ('pending') AND source='{$this->settings->source}' LIMIT 50000");
		while($r = mysql_fetch_assoc($q)) $items[] = (object)$r;
		return $items;
	}
	public function pingListing($id){
		$res = (object)['active'=>false,'error'=>false];
		$l = $this->getListingDetails($id);

		if($l) $res->active = true;
		else if($l === 0) $res->active = false;
		else $res->error = true;

		return $res;
	}
	public function getListingDetails($id){
		$url = 'https://api.commercialexchange.com/api/cfra/ee/property/listings/'.$id;		
		$headers = array("x-api-key: ".$this->settings->key);		
	
		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$obj = curl_get($url,$headers,$this->settings->proxy);			
			if(preg_match("/Listing with id (.*?) not found/i",$obj) || $obj === "") return 0;
			$obj = json_decode($obj);
			$tries++;
			if(!$obj)sleep(1);
		}while(!$obj && $tries<5);
		if(!$obj)return false;
		
		$space = false;
		if(count($obj->listedSpaces)){
			foreach($obj->listedSpaces as $s){
				if($s->id == $id){
					$space = $s;
					break;
				}
			}
		}
		if($space){
			//unset($obj->media);
			unset($obj->listedSpaces);
			$space->building = $obj;
		}					
		return $space;
	}
	public function process($rId){		
		if(!$rId)return false;
		
		t("Processing: ".$rId,1);
		
		//mysql_query("UPDATE listings SET status='processing' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
		
		$obj = $this->getListingDetails($rId);
		if(!$obj){ $this->markError($rId); return false; }

		
		//Collect Images
		$images = array();
		$origImages = array();			
		if($obj->media){
			foreach($obj->media as $m){
				$origImages[$m->url] = $m;
			}
		}		
		if($obj->building && $obj->building->media){
			foreach($obj->building->media as $m){
				$origImages[$m->url] = $m;
			}			
		}				
		t("Found images: ".count($origImages),1);			
		
		//ProcessImages
		foreach($origImages as $m){										
			if($m->type != 'IMAGE')continue;
			$name = preg_replace("/ /","_",$m->name);
			$name = preg_replace("/[^0-9A-Za-z_-]/","",$m->name);
		
			$imageFilename = $rId.'_'.$obj->publicId.'_'.$name.'.'.end(explode(".",$m->url));
			$res = $this->processImage($this->settings->imageBase.$m->url,$imageFilename);
			if($res){
				$images[] = $imageFilename;
			}
		}	

		//Save info
		$url = $listingUrl = 'https://www.commercialexchange.com/listing/'.$obj->publicId;
		
		$dupItem = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE url='{$url}' AND remote_id!='{$rId}' AND status='ready'"));
		if($dupItem){
			$dupItem = (object)$dupItem;			
			$data = mysql_real_escape_string($dupItem->data);
			
			$lng = $dupItem->data->building->location->geopoint->longitude;
			$lat = $dupItem->data->building->location->geopoint->latitude;
									
			mysql_query("UPDATE listings SET status='ready',data='{$data}',images='{$dupItem->images}',public_id='{$dupItem->public_id}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
		}
		else{			
			$data = mysql_real_escape_string(json_encode($obj));
			$images = json_encode($images);
			$publicId = $obj->publicId;


			$lng = $obj->building->location->geopoint->longitude;
			$lat = $obj->building->location->geopoint->latitude;

			//t("UPDATE listings SET status='ready',data='{$data}',images='{$images}',url='{$url}',public_id='{$publicId}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
			
			mysql_query("UPDATE listings SET status='ready',data='{$data}',images='{$images}',url='{$url}',public_id='{$publicId}', lng='{$lng}', lat='{$lat}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");						
		}	
		$error = mysql_error();

		if($error){
			$this->markError($rId);
		}
	}
	private function markError($rId){
		mysql_query("UPDATE listings SET status='error' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
	}
	public function processImage($url,$filename){					
		//$fileContents = curl_get($url);
		$fileContents = curl_get($url,array(),$this->settings->proxy);
				
		$tempFilePath = $GLOBALS['system']['tmp_path'].'/'.$filename;
		if(file_exists($tempFilePath))unlink($tempFilePath);
		file_put_contents($tempFilePath,$fileContents);
					
		$res = $this->s3->send($tempFilePath);			
		unlink($tempFilePath);
		
		return $res;
	}
	public function scrape($daysback=2,$logUpdates=false){ 
		$perpage = 300;
		$sort = 'QUALITY';
		
		$to = dbDate('tomorrow');
		$from = dbDate("-{$daysback} days");
		
		$page = 1;
		
		do{
			$found = false;
			
			$url = "https://api.commercialexchange.com/api/cfra/ee/search/properties/_list?pageSize={$perpage}&pageNumber={$page}&sort={$sort}%3Adesc&byProperty=true";		
			$data = '{"bounds":{"ne":{"lat":52.963174162442954,"lon":-44.45148437500001},"sw":{"lat":19.396102271865235,"lon":-147.283515625}},"dateAdded":{"maximum":"'.$to.'","minimum":"'.$from.'"}}';		
			$headers = array(
				"accept: application/json",
				"accept-language: en-US,en;q=0.9",
				"content-type: application/json",
				"x-api-key: ".$this->settings->key
			);
		
			$tries = 0;
			do{				
				$res = curl_post($url,$data,$headers,$this->settings->proxy);								
				$res = json_decode($res);
				$tries++;
				if(!$res)sleep(1);
			}while(!$res && $tries<5);
			
	
			t("Found: ".$res->total,1);
			if($res->results){
				$found = true;
				
				foreach($res->results as $r){
					$data = $r->data;										
					foreach($data->{'listedSpaces.ids'} as $rId){
						if(!$rId)continue;						
						$name = mysql_real_escape_string($data->name);						
						
						$lng = $data->location->geopoint->longitude;
						$lat = $data->location->geopoint->latitude;
						
						if($logUpdates){						
							list($oldId) = mysql_fetch_array(mysql_query("SELECT id FROM listings WHERE remote_id='{$rId}' AND source='{$this->settings->source}' AND status='ready'"));
							if($oldId){								
								mysql_query("UPDATE listings SET last_seen=NOW() WHERE remote_id='{$rId}' AND source='{$this->settings->source}'");
								$this->logUpdate($rId);								
							}
							else{
								mysql_query("INSERT INTO listings SET source='{$this->settings->source}', remote_id='{$rId}', status='pending', title='{$name}', lng='{$lng}', lat='{$lat}', last_seen=NOW()");
								$this->sc->getScore($lat,$lng);
							}
						}
						else{
							mysql_query("INSERT INTO listings SET source='{$this->settings->source}', remote_id='{$rId}', status='pending', title='{$name}', lng='{$lng}', lat='{$lat}', last_seen=NOW()");
							$this->sc->getScore($lat,$lng);
						}
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
		
		/*
		unset($old->occupancy);
		$old->brandnew = (object)array('a'=>1,'b'=>2,'c'=>3);				
		$old->lot->totalAcres = 10.0;				
		$old = json_decode(json_encode($old), true);			
		unset($old["lot"]["zoning"]);		
		$old = json_decode(json_encode($old));		
		*/
				
		$details = $this->getListingDetails($lId);
		if(!$details)return false;

		//Dont check for changes in the building data. 
		unset($details->building);
		unset($old->building);
		
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