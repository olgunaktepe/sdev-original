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
							
		);
		
		$this->s3 = new S3();
		$this->sc = new Score();
	}	
	public function getAllPending(){
		$items = array();
		
		$q = mysql_query("SELECT * FROM listings WHERE status IN ('pending') AND source='{$this->settings->source}' AND timestamp>=NOW() - INTERVAL 60 DAY LIMIT 50000");
		while($r = mysql_fetch_assoc($q)) $items[] = (object)$r;
		return $items;
	}
	public function getListingDetails($id){
		$url = 'https://api.commercialexchange.com/api/cfra/ee/property/listings/'.$id;
		$headers = array("x-api-key: ".$this->settings->key);
		
		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$obj = curl_get($url,$headers,false);
			$obj = json_decode($obj);
			$tries++;
			if(!$obj)sleep(1);
		}while(!$obj && $tries<5);				
		return $obj;
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
		if($obj->listedSpaces){
			foreach($obj->listedSpaces as $r){
				if(!$r->media)continue;				
				foreach($r->media as $m){
					$origImages[$m->url] = $m;
				}
			}
		}
		t("Found images: ".count($origImages),1);
		
		//ProcessImages
		foreach($origImages as $m){										
			if($m->type != 'IMAGE')continue;
			$name = preg_replace("/ /","_",$m->name);
			$name = preg_replace("/[^0-9A-Za-z_-]/","",$m->name);
		
			$imageFilename = $rId.'_'.$r->publicId.'_'.$name.'.'.end(explode(".",$m->url));
			$res = $this->processImage($this->settings->imageBase.$m->url,$imageFilename);
			if($res){
				$images[] = $imageFilename;
			}
		}	

		//Save info
		$url = 'https://www.commercialexchange.com/property/'.$obj->id;
		
		$dupItem = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE url='{$url}' AND remote_id!='{$rId}' AND status='ready'"));
		if($dupItem){
			$dupItem = (object)$dupItem;
			$listingUrl = $this->getListingUrl(json_decode($dupItem->data),$rId);
			$data = mysql_real_escape_string($dupItem->data);			
									
			mysql_query("UPDATE listings SET status='ready',data='{$data}',images='{$dupItem->images}',url='{$dupItem->url}',listing_url='{$listingUrl}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
		}
		else{
			$listingUrl = $this->getListingUrl($obj,$rId);
			$data = mysql_real_escape_string(json_encode($obj));
			$images = json_encode($images);

			mysql_query("UPDATE listings SET status='ready',data='{$data}',images='{$images}',url='{$url}',listing_url='{$listingUrl}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
		}	
		$error = mysql_error();

		if($error){
			$this->markError($rId);
		}
	}
	public function getListingUrl($data,$rId){
		$listingUrl = '';
		if(!$data->listedSpaces) return false;
		
		foreach($data->listedSpaces as $s){
			if($s->id == $rId){
				$listingUrl = 'https://www.commercialexchange.com/listing/'.$s->publicId;
			}
		}
		return $listingUrl;
	}
	private function markError($rId){
		mysql_query("UPDATE listings SET status='error' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
	}
	public function processImage($url,$filename){					
		$fileContents = file_get_contents($url);
				
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
				$res = curl_post($url,$data,$headers,false);				
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
							list($oldId) = mysql_fetch_array(mysql_query("SELECT * FROM listings WHERE remote_id='{$rId}' AND source='{$this->settings->source}' AND status='ready'"));
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
			$p->old = getJsonPathValue($old,$p->path);
			if(strtolower($p->old) == strtolower($p->value))continue;
			$changeDetected++;
		}
			
		if($changeDetected > 0){					
			mysql_query("INSERT INTO listings_updates SET listing_id='{$lId}', old_data='".mysql_real_escape_string(json_encode($old))."', patch='".mysql_real_escape_string(json_encode($patchRaw))."', diff_count='{$count}'");
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
				
				if(strtolower($update['value_old']) == strtolower($update['value_new']))continue;
												
				$updatesql = array();
				foreach($update as $k=>$v)$updatesql[] = "`$k` = '".mysql_real_escape_string($v)."'";				
				mysql_query("INSERT INTO listings_updates_operations SET ".implode(",",$updatesql));														
			}
		}
	}
}