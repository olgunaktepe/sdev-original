<?php 
uselib('AWS::s3'); 
uselib('scrapers::score');

Class Century{
	private $settings; 
	
	public function __construct(){
		$this->settings = (object)array(
			'source'	=> 'century21.com',			
			'imageBase'	=> '',								
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
	public function process($rId){
		if(!$rId)return false;
	
		t("Processing: ".$rId,1);
		
		$obj = $this->getListingDetails($rId);        
		if(!$obj || !$obj->{'data-id'}){ $this->markError($rId); return false; }				
	
		//Collect Images
		$images = array();
		$origImages = $obj->images;	
				
		t("Found images: ".count($origImages),1);
	
		//ProcessImages
		foreach($origImages as $m){		
			$imageFilename = $rId.'_'.end(explode("/",$m)).'.jpg';					
			$res = $this->processImage($m,$imageFilename);
			if($res){
				$images[] = $imageFilename;
			}
		}
		
		//Save info
		$data = mysql_real_escape_string(json_encode($obj));
		$images = json_encode($images);
		mysql_query("UPDATE listings SET status='ready',data='{$data}',images='{$images}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");		
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
        if(!$id)return false;
        
        list($url) = mysql_fetch_array(mysql_query("SELECT url FROM listings WHERE source='{$this->settings->source}' AND remote_id='{$id}'"));
		if(!$url)return false;
		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$html = curl_get($url,array(),false);			
			$tries++;			
		}while(!$html && $tries<5);	
        
        $dom = new DOMDocument;
        @$dom->loadHTML($html);
        $finder = new DomXPath($dom);

        $item = array();
        $el = $finder->query('.//*[@id="pdp-info"]');    
        if(!count($el))return false;
        foreach ($el->item(0)->attributes as $attr) {
            $name = $attr->nodeName;
            $value = json_decode($attr->nodeValue)?json_decode($attr->nodeValue):$attr->nodeValue;                        
            $item[$name] = $value;
        }

        $item['listing-type'] = trim($finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," pdp-listing-type ")]')->item(0)->nodeValue);
        $item['price'] = trim($finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," pdp-price ")]')->item(0)->nodeValue);
        $item['lease-term'] = trim($finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," pdp-lease-term ")]')->item(0)->nodeValue);
        $item['property-type'] = trim($finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," pdp-property-type ")]')->item(0)->nodeValue);
        $item['description'] = trim($finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," pdp-description ")]')->item(0)->nodeValue);

        $item['features'] = array();
        $feats = $finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," pdp-features ")]//li');
        if(count($feats)){
            foreach($feats as $f){
                list($key,$val) = explode(':',$f->nodeValue);
                $item['features'][trim($key)] = trim($val);
            }
        }

        $item['agent'] = array();

        $item['agent']['name'] = trim($finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," contact-text-container ")]//*[contains(concat(" ",normalize-space(@class)," ")," contactName ")]')->item(0)->nodeValue);
        $item['agent']['company'] = trim($finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," contact-text-container ")]//*[contains(concat(" ",normalize-space(@class)," ")," officeName ")]')->item(0)->nodeValue);            
        $item['agent']['phones'] = array();
        
        $phones = $finder->query('.//*[contains(concat(" ",normalize-space(@class)," ")," contact-text-container ")]//*[contains(concat(" ",normalize-space(@class)," ")," pdp-contact-phone ")]//a');
        if(count($phones)){
            foreach($phones as $p){
                $item['agent']['phones'][] = preg_replace('/[[:^print:]]/', '', trim($p->nodeValue));
            }
        }
        
        $item['images'] = array();
        preg_match("/window.slideshowData = \[(.*?)\]/s",$html,$matches);        
        if($matches){
            $images = $matches[1];
            $matches = false;
            preg_match_all("/\bsrc: \"(.*?)\"/",$images,$matches);            
            if($matches){
                foreach($matches[1] as $im){
                    array_push($item['images'],$im);
                }
            }
            
        }

        $obj = json_decode(json_encode($item));
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
					
		$res = $this->s3->send($tempFilePath);
		unlink($tempFilePath);
		
		return $res;
	}
	public function scrape(){
		$perpage = 24;				
		$page = 0;		
		do{
			$found = false;

            t("Getting Page: ".$page,1);
	
			$url = "https://commercial.century21.com/propsearch-async?kw=&pt=&o=listingdate-desc&sl=1&le=1&s=".($page*$perpage);			
			$tries = 0;
			do{				
				$res = curl_get($url,array(),false);								
				$tries++;
				if(!$res)sleep(1);
			}while(!$res && $tries<5);

            $dom = new DOMDocument;
            @$dom->loadHTML($res);
            $finder = new DomXPath($dom);
            $nodes = $finder->query('.//a[contains(concat(" ",normalize-space(@class)," ")," property-card ")]');

            $total = $finder->query('.//*[@id="numResults"]');            
            if(!count($total))t("Error");

            $total = $total[0]->getAttribute('value'); 
            t("Total Found: ".$total,1);           

            if($nodes){ 	
                $found = true;
	            foreach($nodes as $n){
                    $item = array();
		            $item['data'] = json_decode($res = $n->getAttribute('data-card-data'));
                    $keys = array('link','id','source-id','listing-id','brand-cd','mls','zipcode','latitude','longitude');
                    foreach($keys as $k)$item[$k] = $n->getAttribute('data-'.$k);
                    $item = (object)$item;

                    $rId = $item->id;
                    if(!$rId)continue;

                    list($oldId) = mysql_fetch_array(mysql_query("SELECT id FROM listings WHERE remote_id='{$rId}' AND source='{$this->settings->source}' AND status='ready'"));					
					if($oldId){								
						mysql_query("UPDATE listings SET last_seen=NOW() WHERE remote_id='{$rId}' AND source='{$this->settings->source}'");
						$this->logUpdate($rId);	
					}
                    else{
						$link = 'https://commercial.century21.com/'.$item->link;						
						$name = mysql_real_escape_string($item->data->address.' '.$item->data->location);							
						$lng = $item->longitude;
						$lat = $item->latitude;
										
						mysql_query("INSERT INTO listings SET source='{$this->settings->source}', url='{$link}', remote_id='{$rId}', public_id='{$rId}', status='pending', title='{$name}', lng='{$lng}', lat='{$lat}', last_seen=NOW()");
						$this->sc->getScore($lat,$lng);
					}		
                }
            }
			$page++;
		}while($found && $page<10000);		
	}	
	public function logUpdate($lId){    
		if(!$lId)return false;
		
		list($old) = mysql_fetch_array(mysql_query("SELECT data FROM listings WHERE remote_id='{$lId}' AND source='{$this->settings->source}'"));		
		//list($old) = mysql_fetch_array(mysql_query("SELECT data FROM listings WHERE remote_id='{$lId}' AND source='{$this->settings->source}' AND (last_update_check<(NOW() - INTERVAL 6 HOUR) OR last_update_check IS NULL)"));		
		$old = json_decode($old);
		if(!$old)return false;
						
		t("Getting details...",1);
		$details = $this->getListingDetails($lId);
		if(!$details && $details->{'data-id'})return false;				
		
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