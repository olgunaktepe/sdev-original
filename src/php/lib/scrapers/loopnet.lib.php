<?php 
uselib('AWS::s3'); 
uselib('scrapers::score');

Class Loopnet{
	private $settings; 
	
	public function __construct(){
		$this->settings = (object)array(
			'source'	=> 'loopnet.com',			
			'imageBase'	=> '',								
			'proxy' => 'niotdnkf:Nz0obgXk6Et9f2Xd@proxy.proxy-cheap.com:31112',
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
		if(!$obj || !$obj->ListingId){ $this->markError($rId); return false; }		
		
		//ProcessImages
		$images = array();		
		foreach($obj->ListingAttachments as $att){
			if(strpos($att->ContentType,'image') === false)continue;
							
			$name = preg_replace("/ /","_",$att->AttachmentTypeDescription);
			$name = preg_replace("/[^0-9A-Za-z_-]/","",$name);
		
			$imageFilename = $rId.'_'.$att->AttachmentMasterId.'_'.$name.'.'.end(explode(".",$att->Uri));

			$res = $this->processImage($att->Uri,$imageFilename);			
			if($res){
				$images[] = $imageFilename;
			}
		}			
		t("Found images: ".count($images),1);

		//Save info
		$data = mysql_real_escape_string(json_encode($obj));
		$images = json_encode($images);

		$title = mysql_real_escape_string($obj->AddressHeader->FirstLineText);
		$url = 'https://www.loopnet.com/Listing/'.$obj->ListingId;
		$lng = $obj->Coordinate->x;
		$lat = $obj->Coordinate->y;

		mysql_query("UPDATE listings SET status='ready',title='{$title}',url='{$url}',lng='{$lng}',lat='{$lat}',data='{$data}',images='{$images}' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");		
		$error = mysql_error();
	
		if($error){
			$this->markError($rId);
		}
	}
	public function pingListing($id){
		$res = (object)['active'=>false,'error'=>false];
		$l = $this->getListingDetails($id);

		if($l) $res->active = ($l->Status == 10)?true:false;		
		else $res->error = true;

		return $res;
	}
	public function getListingDetails($id){
        if(!$id)return false;
                
		$headers = [
			"authority: www.loopnet.com",
			"accept: application/json, text/plain, */*",
			"accept-language: en-US,en;q=0.9",
			"content-type: application/json;charset=UTF-8",  
			"origin: https://www.loopnet.com",  
			//"requestverificationtoken: -aPAjTYzuh-7fbFxgrzECNbwxIE-MyQG3iSh0D2wnwo1_919ME-nqiKdKEgDH5_J0dsEY_TpJ66o0rWX4hsHKLHLqHs1",
			//"traceparent: 00-1f24e7a92decd84aa01ba65860352226-51861e8b75f8fe9c-00",
			"user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  		];  

		$url = "https://www.loopnet.com/services/listing/{$id}/";
		$obj = false;
		$tries = 0;
		do{
			t("Tried: ".$tries,1);
			$json = curl_get($url,$headers,$this->settings->proxy);			
			$json = json_decode($json);
			$tries++;			
		}while(!$json && $tries<5);	
        
		return $json;
	}
	private function markError($rId){
		mysql_query("UPDATE listings SET status='error' WHERE source='{$this->settings->source}' AND remote_id='{$rId}'");
	}
	public function processImage($url,$filename){
		$headers = [
			"authority: www.loopnet.com",
			"accept: application/json, text/plain, */*",
			"accept-language: en-US,en;q=0.9",
			"content-type: application/json;charset=UTF-8",  
			"origin: https://www.loopnet.com",  
			//"requestverificationtoken: -aPAjTYzuh-7fbFxgrzECNbwxIE-MyQG3iSh0D2wnwo1_919ME-nqiKdKEgDH5_J0dsEY_TpJ66o0rWX4hsHKLHLqHs1",
			//"traceparent: 00-1f24e7a92decd84aa01ba65860352226-51861e8b75f8fe9c-00",
			"user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  		];  
		$fileContents = curl_get($url,$headers,$this->settings->proxy);								
		//t($fileContents,1);
				
		$tempFilePath = $GLOBALS['system']['tmp_path'].'/'.$filename;
		if(file_exists($tempFilePath))unlink($tempFilePath);
		file_put_contents($tempFilePath,$fileContents);
					
		$res = $this->s3->send($tempFilePath);
		unlink($tempFilePath);
		
		return $res;
	}
	
	public function scrape($type='sale'){
		$startDate = 'today';
		$endDate = 'tomorrow';
		
		$page = 1;		
		do{
			$found = false;

            t("Getting Page: ".$page,1);

			$headers = [
  					"authority: www.loopnet.com",
  					"accept: application/json, text/plain, */*",
  					"accept-language: en-US,en;q=0.9",
  					"content-type: application/json;charset=UTF-8",  
  					"origin: https://www.loopnet.com",  
  					//"requestverificationtoken: -aPAjTYzuh-7fbFxgrzECNbwxIE-MyQG3iSh0D2wnwo1_919ME-nqiKdKEgDH5_J0dsEY_TpJ66o0rWX4hsHKLHLqHs1",
  					//"traceparent: 00-1f24e7a92decd84aa01ba65860352226-51861e8b75f8fe9c-00",
  					"user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
			];  

			if($type == 'lease'){
				$data = '{
					"pageguid": "9b0b0de4-a877-4408-99d4-7b723a646ec0",
					"criteria": {
					  "LNPropertyTypes": 0,					"LNIndustrialSubtypes": 0,					"LNRetailSubtypes": 0,					"LNShoppingCenterSubtypes": 0,					"LNMultiFamilySubtypes": 0,					"LNSpecialtySubtypes": 0,					"LNOfficeSubtypes": 0,					"LNHealthCareSubtypes": 0,					"LNHospitalitySubtypes": 0,					"LNSportsAndEntertainmentSubtypes": 0,					"LNLandSubtypes": 0,					"PropertyTypes": 0,					"HospitalitySubtypes": 0,					"IndustrialSubtypes": 0,					"LandTypes": 0,					"OfficeSubtypes": 0,					"GeneralRetailSubtypes": 0,					"FlexSubtypes": 0,					"SportsAndEntertainmentSubtypes": 0,					"SpecialtySubtypes": 0,					"MultifamilySubtypes": 0,					"HealthcareSubtypes": 0,					"ShoppingCenterTypes": 0,					"ApartmentStyleTypes": 0,					"Country": "US",					"Region": "",					"State": "",					"Market": "",					"MSA": null,					"County": "",					"City": "",					"PostalCode": "",					"GeographyFilters": [],					"PageLocationLabel": "USA",					"TypeaheadLocationLabel": "USA",					"IncludeProximityCities": false,					"AddressLine": null,					"Distance": 0,					"Radius": null,					"CoordinateBounds": null,					"Polygon": null,					"HasValidCoordinates": null,					"BuildingClass": 0,					"BuildingSizeUom": "SquareFeet",					"LotSizeUom": "Acres",					"SubCategoryList": [],					"Editor": "Default",					"PreserveAddressForRadiusSavedSearch": false,					"ListingSearchType": 1,					"OnMarketDateRange": null,					"Keywords": null,					"LoopLinkForLeaseDefaultSorting": [],					"LoopLinkForSaleDefaultSorting": [],					"LoopLinkForSaleAndLeaseDefaultSorting": [],					"PropertyGroupId": null,					"HasMultipleLocations": false,					"IsForSale": false,					"PriceRangeMin": null,					"PriceRangeMax": null,					"BuildingSizeRangeMin": null,					"BuildingSizeRangeMax": null,					"PriceRangeCurrency": "USD",					"PriceRangeRateType": "Total",					"LotSizeRangeMin": null,					"LotSizeRangeMax": null,					"UnitCountRangeMin": null,				"UnitCountRangeMax": null,					"CapRateRangeMin": null,					"CapRateRangeMax": null,					"YearBuiltRangeMin": null,					"YearBuiltRangeMax": null,					"TermLengthRangeMin": null,					"TermLengthRangeMax": null,					"NetLeased": false,					"InContract": true,					"Distressed": false,					
					  "Auction": false,					
					  "IsTenXAuctions": false,					"AuctionIds": null,					"Single": false,					"Multiple": false,					"InvestmentTypeCore": false,					"InvestmentTypeValueAdd": false,					"InvestmentTypeOpportunistic": false,					"InvestmentTypeTripleNet": false,					"InvestmentTypeOpportunityZone": false,					"AuctionAssetTypeProperties": false,					"AuctionAssetTypeNotes": false,					"AuctionFinanceTypeFinancing": null,					"AuctionFinanceTypeBrokerCoOp": null,					"BusinessForSale": true,					"VacantOwner": true,					"Investment": true,					"InOpportunityZone": null,					"CondosFilter": 0,					"PortfoliosFilter": 0,					"ShoppingCenterFilter": 0,					"BuildingParkFilter": 0,					"IsForLease": true,					"LeaseRateRangeMin": null,					"LeaseRateRangeMax": null,					"SpaceAvailableRangeMin": null,					"SpaceAvailableRangeMax": null,					"LeaseRateTerm": "y",					"SpaceAvailableUom": "SquareFeet",					"LeaseRateCurrency": "USD",					"LeaseRatePerSizeUom": "SquareFeet",					"SubLease": false,					"RegionalMarket": null,					"SubMarket": "",					"MoveInDateIndicator": 0,					  "MoveInDateEnteredType": null,					  "MoveInDateEnteredRangeMin": null,					  "MoveInDateEnteredRangeMax": null,					"UseClassTypes": 0,					  "SpaceLeaseTypes": 0,					  "ListingId": null,
					  "DateIndicator": 0,
					  "DateEnteredRangeMin": "'.date('m/d/Y',strtotime($startDate)).'",
					  "DateEnteredRangeMax": "'.date('m/d/Y',strtotime($endDate)).'",
					  "MinimumDate": "01/01/0001",
					  "DateEnteredType": "SD",
					  "DateFormat": "MM/dd/yyyy",
					  "ViewMode": "None",
					  "ListingIdPinClick": null,
					  "IsUserFromUS": true,
					  "ForceRemoveBoundary": false,
					  "BoundsChangedViaMapInteraction": false,
					  "AgentFirstName": null,
					  "AgentLastName": null,
					  "Currency": null,
					  "ListingType": 1,
					  "IsAuctionsOnly": false,
					  "ResultLimit": 500,
					  "PageNumber": '.$page.',
					  "Sorting": [{"SortField": 1,"SortOrder": 1}],
					  "PageSize": 20,
					  "Timeout": 0,
					  "Origin": 1,
					  "StateKey": "9c110808aa68b172fecf76297b09c5ab",
					  "ExcludingInContract": false,
					  "LeaseRateUomTerm": "SquareFeetYearForUI"
					}
				  }';
			}
			else{
				$data = '{
					"pageguid": "9b0b0de4-a877-4408-99d4-7b723a646ec0",
					"criteria": {"LNPropertyTypes": 0,"LNIndustrialSubtypes": 0,"LNRetailSubtypes": 0,"LNShoppingCenterSubtypes": 0,"LNMultiFamilySubtypes": 0,"LNSpecialtySubtypes": 0,			"LNOfficeSubtypes": 0,				"LNHealthCareSubtypes": 0,				"LNHospitalitySubtypes": 0,				"LNSportsAndEntertainmentSubtypes": 0,				"LNLandSubtypes": 0,				"PropertyTypes": 0,				"HospitalitySubtypes": 0,				"IndustrialSubtypes": 0,				"LandTypes": 0,				"OfficeSubtypes": 0,				"GeneralRetailSubtypes": 0,				"FlexSubtypes": 0,				"SportsAndEntertainmentSubtypes": 0,				"SpecialtySubtypes": 0,				"MultifamilySubtypes": 0,				"HealthcareSubtypes": 0,				"ShoppingCenterTypes": 0,				"ApartmentStyleTypes": 0,				"Country": "US",				"Region": "",				"State": "",				"Market": "",				"MSA": null,				"County": "",				"City": "",				"PostalCode": "",				"GeographyFilters": [],				"PageLocationLabel": "USA",				"TypeaheadLocationLabel": "USA",				"IncludeProximityCities": false,				"AddressLine": null,				"Distance": 0,		"Radius": null,				"CoordinateBounds": null,				"Polygon": null,				"HasValidCoordinates": null,				"BuildingClass": 0,				"BuildingSizeUom": "SquareFeet",				"LotSizeUom": "Acres",				"SubCategoryList": [],				"Editor": "Default",				"PreserveAddressForRadiusSavedSearch": false,				"ListingSearchType": 2,				"OnMarketDateRange": null,				"Keywords": null,				"LoopLinkForLeaseDefaultSorting": [],				"LoopLinkForSaleDefaultSorting": [],				"LoopLinkForSaleAndLeaseDefaultSorting": [],				"PropertyGroupId": null,				"HasMultipleLocations": false,				"IsForSale": true,				"PriceRangeMin": null,				"PriceRangeMax": null,				"BuildingSizeRangeMin": null,				"BuildingSizeRangeMax": null,				"PriceRangeCurrency": "USD",				"PriceRangeRateType": "Total",				"LotSizeRangeMin": null,				"LotSizeRangeMax": null,				"UnitCountRangeMin": null,				"UnitCountRangeMax": null,				"CapRateRangeMin": null,				"CapRateRangeMax": null,				"YearBuiltRangeMin": null,				"YearBuiltRangeMax": null,				"TermLengthRangeMin": null,				"TermLengthRangeMax": null,				"NetLeased": false,				"InContract": true,				"Distressed": false,				
					"Auction": false,				
					"IsTenXAuctions": false,				"AuctionIds": null,				"Single": false,				"Multiple": false,				"InvestmentTypeCore": false,				"InvestmentTypeValueAdd": false,				"InvestmentTypeOpportunistic": false,				"InvestmentTypeTripleNet": false,				"InvestmentTypeOpportunityZone": false,				"AuctionAssetTypeProperties": false,				"AuctionAssetTypeNotes": false,				"AuctionFinanceTypeFinancing": null,				"AuctionFinanceTypeBrokerCoOp": null,				"BusinessForSale": true,				"VacantOwner": true,				"Investment": true,				"InOpportunityZone": null,				"CondosFilter": 0,				"PortfoliosFilter": 0,				"ShoppingCenterFilter": 0,				"BuildingParkFilter": 0,				"IsForLease": false,					"LeaseRateRangeMin": null,				"LeaseRateRangeMax": null,				"SpaceAvailableRangeMin": null,				"SpaceAvailableRangeMax": null,				"LeaseRateTerm": null,				"SpaceAvailableUom": null,				"LeaseRateCurrency": null,				"LeaseRatePerSizeUom": null,				"SubLease": false,				"RegionalMarket": null,				"SubMarket": "",				"MoveInDateIndicator": 0,				"MoveInDateEnteredType": null,				"MoveInDateEnteredRangeMin": null,				"MoveInDateEnteredRangeMax": null,				"ListingId": null,					"DateIndicator": 0,
					"DateEnteredRangeMin": "'.date('m/d/Y',strtotime($startDate)).'",
					"DateEnteredRangeMax": "'.date('m/d/Y',strtotime($endDate)).'",
					"MinimumDate": "01/01/0001",
					"DateEnteredType": "SD",
					"DateFormat": "MM/dd/yyyy",
					"ViewMode": "None",				"ListingIdPinClick": null,				"IsUserFromUS": true,				"ForceRemoveBoundary": false,				"BoundsChangedViaMapInteraction": false,				"AgentFirstName": null,				"AgentLastName": null,				"Currency": null,				"ListingType": 1,					"IsAuctionsOnly": false,
					"ResultLimit": 500,
					"PageNumber": '.$page.',
					"Sorting": [{"SortField": 1,"SortOrder": 1}],
					"PageSize": 20,
					"Timeout": 0,
					"Origin": 1,
					"StateKey": "6268cb0fcc74862181c705a190acce6e",
					"ExcludingInContract": false
					}
				}';			
			}

			$url = "https://www.loopnet.com/services/search";		
			
			$tries = 0;
			do{				
				$res = curl_post($url,$data,$headers,$this->settings->proxy);			
				//t($res,1);
				$res = json_decode($res);	
				$tries++;				
			}while(!$res && $tries<5);			

            $total = $res->MetaState->TotalResultCount;
			$listingIds = explode(",",$res->AllListingIds);	
			t("Total Found: ".$total,1); 			

			
			foreach($listingIds as $lId){
				list($oldId,$lastseen) = mysql_fetch_array(mysql_query("SELECT id,last_seen FROM listings WHERE remote_id='{$rId}' AND source='{$this->settings->source}' AND status='ready'"));					
				if($oldId){
					if(strtotime(dbDate($lastseen)) < strtotime(dbDate('today'))){
						mysql_query("UPDATE listings SET last_seen=NOW() WHERE remote_id='{$rId}' AND source='{$this->settings->source}'");
						$this->logUpdate($rId);	
					}
				}
                else{															
					mysql_query("INSERT INTO listings SET source='{$this->settings->source}', type='{$type}', remote_id='{$lId}', public_id='{$lId}', status='pending', last_seen=NOW()");					
				}	
			}
			return true;		//No need to paginate
						
			/*
			$mapHtml = $res->Map->HTML;
			$dom = new DOMDocument;
        	@$dom->loadHTML($mapHtml);
        	$mapDom = new DomXPath($dom);

			$listingHtml = $res->SearchPlacards->Html;
			$dom = new DOMDocument;
        	@$dom->loadHTML($listingHtml);
        	$listingDom = new DomXPath($dom);
            
			$nodes = $listingDom->query('//article');
			t("Total Found: ".$total,1);           
			t("Nodes Found: ".count($nodes));           

            if($nodes){ 	
                $found = true;
	            foreach($nodes as $n){
                    $item = array();
					$anchor = $listingDom->query('.//a[@href]',$n)->item(0);					
					if(!$anchor)continue;
				
					$item['id'] = $n->getAttribute('data-id');
					$item['href'] = $anchor->getAttribute('href');
					$item['title'] = $anchor->getAttribute('title');

					$pin = $mapDom->query("//div[@map-pin][@id='{$item['id']}']")->item(0);
					$item['lng'] = $pin->getAttribute('lon');
					$item['lat'] = $pin->getAttribute('lat');
				
                    $item = (object)$item;
                    $rId = $item->id;
                    if(!$rId)continue;

                    list($oldId) = mysql_fetch_array(mysql_query("SELECT * FROM listings WHERE remote_id='{$rId}' AND source='{$this->settings->source}' AND status='ready'"));					
					if($oldId){								
						mysql_query("UPDATE listings SET last_seen=NOW() WHERE remote_id='{$rId}' AND source='{$this->settings->source}'");
						$this->logUpdate($rId);	
					}
                    else{
						$link = $item->href;				
						$name = $item->title;				
						$lng = $item->lng;
						$lat = $item->lat;
										
						mysql_query("INSERT INTO listings SET source='{$this->settings->source}', url='{$link}', remote_id='{$rId}', public_id='{$rId}', status='pending', title='{$name}', lng='{$lng}', lat='{$lat}', last_seen=NOW()");
						$this->sc->getScore($lat,$lng);
					}		
                }
            }
			*/


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
		if(!$details && $details->ListingId)return false;				
		
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