<?php
uselib('gmaps::gmaps');
uselib('zillow::zillow');
uselib('AWS::s3');
uselib('walkscore');
uselib('geometry::geometry');
uselib('scrapers::ce');

Class Deal{
    public function __construct(){
        $this->gmaps = new Gmaps();
        $this->zillow = new Zillow();
        $this->s3 = new S3();
        $this->ws = new Walkscore();
        $this->geo = New Geometry();

        $this->dups_config = json_decode($GLOBALS['SETTINGS']['dups_config']);
    }

    static public function getAddressCoordinates($address){
        $gmaps = new Gmaps();
        $res = $gmaps->geocode($address);        
                   
        if($res && is_array($res) && $res[0] && $res[0]->geometry){            
            $coord = $res[0]->geometry->location;
        }
        else{
            $coord = false;
        }
        return $coord;
    }  
    public function geocode($lat,$lng){
        $res = $this->gmaps->rgeocode($lat,$lng);
        $location = (object)['gmaps'=>$res,'coord'=>(object)['lat'=>$lat, 'lng'=>$lng]];
                   
        if($res && is_array($res) && $res[0] && $res[0]->address_components){            
            foreach($res[0]->address_components as $c){			
                if(in_array('street_number',$c->types)) $location->street_number = $c->long_name;
                if(in_array('street',$c->types)) $location->route = $c->long_name;
                if(in_array('locality',$c->types)) $location->city = $c->long_name;
                if(in_array('administrative_area_level_2',$c->types)) $location->county = $c->long_name;
                if(in_array('administrative_area_level_1',$c->types)) $location->state = $c->long_name;
                if(in_array('postal_code',$c->types)) $location->zip = $c->long_name;
            }
        }
        else{
            $location->gmaps = false;
        }
        return $location;
    }              
    public function calculateMonthlyTrends($data,$periods=[1,3,5,10]){ 
        if(!$data)return false;

        $data = array_filter($data);
        $end = end(array_keys($data));                                      
        $endValue = (float)end($data);

        $trends = [];
        foreach($periods as $p){
            $mp = $p * 12;               
            $start = array_reverse(array_keys($data))[$mp];
            if(!$start) $start = reset(array_keys($data));
            $startValue = (float)$data[$start];
            
            if($startValue){                  
                $trends[$p] = ['title'=>"{$p} Year",'end'=>['date'=>$end,'value'=>$endValue], 'start'=>['date'=>$start,'value'=>$startValue], 'delta'=>($endValue-$startValue), 'p'=>(($endValue-$startValue)/$startValue)*100];
            }
        }       
        return $trends; 
    }
    public function calculateYearlyTrends($data,$periods=[1,3,5,10]){ 
        $end = end(array_keys($data));                                      
        $endValue = end($data);

        $trends = [];
        foreach($periods as $p){
            $mp = $p;            
            $start = array_reverse(array_keys($data))[$mp];
            if(!$start) $start = reset(array_keys($data));
            $startValue = $data[$start];
            
            if($startValue)
                $trends[$p] = ['title'=>"{$p} Year",'end'=>['date'=>$end,'value'=>$endValue], 'start'=>['date'=>$start,'value'=>$startValue], 'delta'=>($endValue-$startValue), 'p'=>(($endValue-$startValue)/$startValue)*100];
        }       
        return $trends; 
    }
    public function getCityZips($city,$state){
        if(!$city)return false;

        $items = [];
        $q = mysql_query("SELECT * FROM zipcodes WHERE city='{$city}' AND state='{$state}'");
        while($r = mysql_fetch_assoc($q))$items[] = $r['ZipCode'];
        return array_filter($items);
    }

    public function getCityZipsByZip($zip){
        if(!$zip)return false;

        list($city,$state,$county) = mysql_fetch_array(mysql_query("SELECT City, State, County FROM zipcodes WHERE ZipCode='{$zip}'"));
        if(!$city || !$state)return false;
  
        $items = [];
        $q = mysql_query("SELECT * FROM zipcodes WHERE city='{$city}' AND state='{$state}' AND County='{$county}'");
        while($r = mysql_fetch_assoc($q))$items[] = $r['ZipCode'];
        return array_filter($items);
    }
    public function getCountyZipsByZip($zip){
        if(!$zip)return false;

        list($state,$county) = mysql_fetch_array(mysql_query("SELECT State, County FROM zipcodes WHERE ZipCode='{$zip}'"));
        if(!$county || !$state)return false;
  
        $items = [];
        $q = mysql_query("SELECT * FROM zipcodes WHERE state='{$state}' AND County='{$county}'");
        while($r = mysql_fetch_assoc($q))$items[] = $r['ZipCode'];
        return array_filter($items);
    }
    


    //Twilio
    static public function getListingPhoneSettings($lId){
        list($settings) = mysql_fetch_array(mysql_query("SELECT settings FROM listings_phone_settings WHERE listing_id='{$lId}'"));        
        if($settings) $settings = json_decode($settings);
        return $settings;
    }
    static public function saveListingPhoneSettings($lId,$settings){
        $settings = json_encode($settings);
        mysql_query("INSERT INTO listings_phone_settings SET listing_id='{$lId}', settings='{$settings}' ON DUPLICATE KEY UPDATE settings='{$settings}'");
    }

    //Versions
    public function setDefaultVersion($lId,$vId){
        $version = json_encode(['global'=>$vId]);        
        mysql_query("INSERT INTO deals_data SET default_versions='{$version}',listing_id='{$lId}'ON DUPLICATE KEY UPDATE default_versions='{$version}'");	
    }
    public function getDefaultVersion($lId){        
        list($data) = mysql_fetch_array(mysql_query("SELECT default_versions FROM deals_data WHERE listing_id='{$lId}'"));
        if($data)$data = json_decode($data);

        return $data->global;
    }



    //Updates    
    public function getListingUpdates($listingId,$includeData=false){
        $items = array();

        list($rId,$source) = mysql_fetch_array(mysql_query("SELECT remote_id,source FROM listings WHERE id='{$listingId}'"));
                
        $q = mysql_query("SELECT * FROM listings_updates WHERE listing_id='{$rId}' AND source='{$source}' ORDER BY id ASC");
        while($r = mysql_fetch_assoc($q)){                        
            $ops = $this->getUpdateOps($r['id']);            
            if(!$ops)continue;
            $item = (object)['id'=>$r['id'], 'timestamp'=>$r['timestamp'], 'ops'=>$ops];
            if($includeData)$item->data = json_decode($r['old_data']);
            $items[] = $item;
        }                
        return $items;
    }
    public function getUpdateOps($patchId){
        $items = array();
        
        $q = mysql_query("SELECT * FROM listings_updates_operations WHERE patch_id='{$patchId}' ORDER BY id ASC");
        while($r = mysql_fetch_assoc($q)){                                    
            $items[] = (object)$r;
        }                
        return $items;
    }
    

    //General   
    public function clearCache($id){
        //mysql_query("DELETE FROM deals_cache WHERE listing_id='{$id}'");
        mysql_query("DELETE FROM deals_cache2 WHERE listing_id='{$id}'");

        $this->getDeal($id,false);
        //$this->getDeal2($id,false);

        mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE id='{$id}'");
    }
    public function getStanderizedListing($listingId,$includeRawData=false){
        $q = mysql_query("SELECT l.*, dd.status AS deal_status, dd.data AS deal_data FROM listings AS l 
                            LEFT JOIN deals_data AS dd ON dd.listing_id=l.id
                            WHERE l.id = '{$listingId}'");
        $r = mysql_fetch_assoc($q);    
        if(!$r)return false;        

        $listing = (object)$r;
        $standerized = reset(standerizeListing([$listing]));
        if($includeRawData)$standerized->raw_data = $listing->data;

        return $standerized;
    } 
    public function getDeal($listingId,$cacheOnly=true,$overrideData=false,$overrideStandardData=false){
        return $this->getDeal2($listingId,$cacheOnly,$overrideData,$overrideStandardData);


        //Deprecated
        global $s3, $ws;	    

        //include $GLOBALS['system']['path'].'/includes/php/connect.php';

	    $q = mysql_query("SELECT l.*, dd.status AS deal_status, dd.data AS deal_data FROM listings AS l 
                            LEFT JOIN deals_data AS dd ON dd.listing_id=l.id
                            WHERE l.id = '{$listingId}'");
	    $r = mysql_fetch_assoc($q);    
	    if(!$r)return false;        
                

        if($cacheOnly && $r['last_deal_cache'] == '')return false;                    //Skip uncached listings. 
                        
	    $r['data'] = json_decode($r['data']);
        if($overrideData)$r['data'] = $overrideData;                                  //Set Override Data

	    $r['images'] = json_decode($r['images']);
	    $listing = (object)$r;
	    $standerized = reset(standerizeListing([$listing]));

        if($listing->last_deal_cache)$listing->last_deal_cache_ago = xTimeAgo($listing->last_deal_cache,'now');
        
        if($overrideStandardData){            
            $standerized = $overrideStandardData;               //Set override Data for `standerized` object        
        }                
        
        $listing->flags = mysql_fetch_assoc(mysql_query("SELECT * FROM listings_flags WHERE listing_id='{$r['id']}'"));
        if($listing->flags)$listing->flags = (object)$listing->flags;

	    $deal = (object)['listing'=>$listing, 'standerized'=>$standerized];	

        $deal->status = (trim($r['deal_status']))?$r['deal_status']:'No Status';
        $deal->data = json_decode($r['deal_data']);
        
	    $deal->location = $this->geocode($listing->lat,$listing->lng);		    
	    $deal->standerized->geocoded = ($deal->location->gmaps)?$deal->location->gmaps[0]->formatted_address:'';
                
	    $listing->images_urls = [];                
        //foreach($listing->images as $image){            
        //   $listing->images_urls[] = $this->s3->getSignedURL($image);
        //}                    	    

        $listing->main_img = '';
        //if($listing->images) $listing->main_img = $this->s3->getSignedURL(reset($listing->images));        
        
	    if($deal->location->zip){		        
            $cache = $this->checkCache($listing->id,'zillow');   
            if($cache === false){
                if($cacheOnly)return false;                
    		    $deal->zillow = $this->getZillowData($deal->location);
                $this->saveCache($listing->id,'zillow',$deal->zillow);        
            }
            else{
                $deal->zillow = $cache;
            }

            $cache = $this->checkCache($listing->id,'census');   
            if($cache === false){
                if($cacheOnly)return false;
		        $deal->census = $this->getCensusData($deal->location);        
                $this->saveCache($listing->id,'census',$deal->census);        
            }
            else{
                $deal->census = $cache;
            }
	    }                  
        
        $cache = $this->checkCache($listing->id,'walkscore');    
        if($cache === false){
            if($cacheOnly)return false;
            $deal->walkscore = $this->ws->getScore($listing->lat,$listing->lng);    
            $this->saveCache($listing->id,'walkscore',$deal->walkscore);        
        }
        else{
            $deal->walkscore = $cache;
        }                   

        $cache = $this->checkCache($listing->id,'markets');
        if($cache === false){
            if($cacheOnly)return false;
            if($listing->source == 'loopnet.com' && $listing->data->SubmarketId){                
                $deal->markets = $this->getMarkets($listing->lat,$listing->lng,$listing->data->SubmarketId);                
            }
            else{
                $deal->markets = $this->getMarkets($listing->lat,$listing->lng);
            }            
            $this->saveCache($listing->id,'markets',$deal->markets);        
        }
        else{
            $deal->markets = $cache;
        }

        $cache = $this->checkCache($listing->id,'submarkets');
        if($cache === false){
            if($cacheOnly)return false;
            if($listing->source == 'loopnet.com' && $listing->data->SubmarketId){
                $deal->submarkets = $this->getSubmarkets($listing->lat,$listing->lng,$listing->data->SubmarketId);
            }
            else{
                $deal->submarkets = $this->getSubmarkets($listing->lat,$listing->lng);
            }
            $this->saveCache($listing->id,'submarkets',$deal->submarkets);
        }
        else{        
            $deal->submarkets = $cache;
        }                  

	    //$deal->markets = $deal->markets;
        //$deal->submarkets = $deal->submarkets;
        $markets = [];        
        foreach($deal->markets as $m)$markets[$m->type] = $m;
        $deal->markets = $markets;

        $submarkets = [];        
        foreach($deal->submarkets as $m)$submarkets[$m->type] = $m;
        $deal->submarkets = $submarkets;
        

        $deal->advanced = AdvCalcFields($deal);

	    return $deal;        
    }
    public function saveCache($listingId,$type,$data){
        $data = mysql_real_escape_string(json_encode($data));
        mysql_query("DELETE FROM deals_cache WHERE listing_id='{$listingId}' AND type='{$type}'");
        mysql_query("INSERT INTO deals_cache SET listing_id='{$listingId}', type='{$type}', data='{$data}'");
    }
    public function checkCache($listingId,$type){
        list($data) = mysql_fetch_array(mysql_query("SELECT data FROM deals_cache WHERE listing_id='{$listingId}' AND type='{$type}'"));        
        if($data === NULL)return false;
        $data = json_decode($data);
        return $data;
    }



    //Cache V2
    public function formatDeal2($r,$cacheOnly=true,$overrideData=false,$overrideStandardData=false){    
        $listingId = $r['id'];

        if($cacheOnly && !$r['cache'])return false;                    //Skip uncached listings.         
                
	    if(is_string($r['data']))$r['data'] = json_decode($r['data']);        
        if($overrideData)$r['data'] = $overrideData;                                  //Set Override Data

	    if(is_string($r['images']))$r['images'] = json_decode($r['images']);
	    $listing = (object)$r;
	    $standerized = reset(standerizeListing([$listing]));

        if($listing->last_deal_cache)$listing->last_deal_cache_ago = xTimeAgo($listing->last_deal_cache,'now');

        if($overrideStandardData){            
            $standerized = $overrideStandardData;               //Set override Data for `standerized` object        
        }                       
                
	    $deal = (object)['listing'=>$listing, 'standerized'=>$standerized, 'dups'=>[]];	        

        $deal->status = (trim($r['deal_status']))?$r['deal_status']:'No Status';
        if(is_string($r['deal_data']))$deal->data = json_decode($r['deal_data']);
        
        if(strtolower($standerized->type) != 'sale'){
            return $deal;
        }

             
        $cache = json_decode($r['cache']);
        if($cache){            
            $deal->location = $cache->location;
            $deal->images_urls = $cache->images_urls;
            $deal->main_img = $cache->main_img;
            $deal->zillow = $cache->zillow;
            $deal->census = $cache->census;
            $deal->walkscore = $cache->walkscore;
            $deal->markets = $cache->markets;
            $deal->submarkets = $cache->submarkets;       
            $deal->openaddress = $cache->openaddress;       
            $deal->poi = $cache->poi;    
            $deal->greatschools = $cache->greatschools;       
        }
        else{
            //Create Dups 
            $this->checkDuplicateListings($listing->id, $listing->lat,$listing->lng,true,false,true);

            //Cache Deal
            $cache = (object)[];
            $cache->location = $deal->location = $this->geocode($listing->lat,$listing->lng);	            
                
	        $cache->images_urls = $listing->images_urls = [];                
            //foreach($listing->images as $image){            
            //   $listing->images_urls[] = $this->s3->getSignedURL($image);
            //}                    	    

            $cache->main_img = $listing->main_img = '';
            //if($listing->images) $listing->main_img = $this->s3->getSignedURL(reset($listing->images));  
            
            if($deal->location->zip){		                                    
                $cache->zillow = $deal->zillow = $this->getZillowData($deal->location);
                $cache->census = $deal->census = $this->getCensusData($deal->location);        
            }
            $cache->walkscore = $deal->walkscore = $this->ws->getScore($listing->lat,$listing->lng); 
            
            if($listing->source == 'loopnet.com' && $listing->data->SubmarketId){                
                $deal->markets = $this->getMarkets($listing->lat,$listing->lng,$listing->data->SubmarketId);                
            }
            else{
                $deal->markets = $this->getMarkets($listing->lat,$listing->lng);
            } 
            $cache->markets = $deal->markets;

            if($listing->source == 'loopnet.com' && $listing->data->SubmarketId){
                $deal->submarkets = $this->getSubmarkets($listing->lat,$listing->lng,$listing->data->SubmarketId);
            }
            else{
                $deal->submarkets = $this->getSubmarkets($listing->lat,$listing->lng);
            } 
            $cache->submarkets = $deal->submarkets;
                        
            //$start = time();
            $cache->poi = $deal->poi = $this->getPoiCachables($listing->lat,$listing->lng);	
            //t('POI: '.(time()-$start),1);

            //$start = time();
            $cache->openaddress = $deal->openaddress = $this->getOaCachables($standerized->city,$standerized->state,$listing->lat,$listing->lng);	
            //t('OA: '.(time()-$start),1);

            $cache->greatschools = $deal->greatschools = $this->getGreatschoolsCachables($listing->lat,$listing->lng);	            
            
            mysql_query("INSERT INTO deals_cache2 SET listing_id='{$listingId}', data = '".mysql_real_escape_string(json_encode($cache))."'");            
        }        

        $deal->standerized->geocoded = ($deal->location->gmaps)?$deal->location->gmaps[0]->formatted_address:'';

        $markets = [];        
        foreach($deal->markets as $m)$markets[$m->type] = $m;
        $deal->markets = $markets;

        $submarkets = [];        
        foreach($deal->submarkets as $m)$submarkets[$m->type] = $m;
        $deal->submarkets = $submarkets;
    
        $deal->advanced = AdvCalcFields($deal);

        $deal->dups = $this->getDuplicateListingsV2($listingId,$listing->type);   
        $deal->leaseinfo = $this->getLeaseInfo($listing->id,true);

        return $deal;
    } 
    public function getDeal2($listingId,$cacheOnly=true,$overrideData=false,$overrideStandardData=false){
        global $s3, $ws;	
      
	    $q = mysql_query("SELECT l.*, dd.status AS deal_status, dd.data AS deal_data, c.data AS cache FROM listings AS l 
                            LEFT JOIN deals_data AS dd ON dd.listing_id=l.id
                            LEFT JOIN deals_cache2 AS c ON c.listing_id=l.id
                            WHERE l.id = '{$listingId}'");
	    $r = mysql_fetch_assoc($q);    
	    if(!$r)return false;                
        
        $deal = $this->formatDeal2($r,$cacheOnly,$overrideData,$overrideStandardData);        

	    return $deal;        
    }

    //Greatschools
    public function getDealGreatschools($listingId,$distance){
        list($lat,$lng) = mysql_fetch_array(mysql_query("SELECT lat,lng FROM listings WHERE id='{$listingId}'"));
        if(!$lat || !$lng)return false;

        $wheresql = ["1=1"];
        $sql = 'SELECT *,
				(((acos(sin(('.$lat.'*pi()/180)) * sin((lat*pi()/180))+cos(('.$lat.'*pi()/180)) * cos((lat*pi()/180)) * cos((('.$lng.' - lng)*pi()/180))))*180/pi())*60*1.1515) AS distance 
				FROM greatschools WHERE '.implode(" AND ",$wheresql).' HAVING distance<'.$distance;
	    //t($sql);

        $items = [];
	    $q = mysql_query($sql);	
        while($r = mysql_fetch_assoc($q)){
            $item = json_decode($r['data']);
            $items[] = $item;
        }
	    return $items;
    }
    public function getGreatschoolsCachables($latitude,$longitude){
        $distances = [1,3,5];
        $res = [];

        foreach($distances as $d){
            $wheresql = [];
            $wheresql[] = '(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * cos((m.lat*pi()/180)) * cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$d;
            $sql = 'SELECT rating FROM greatschools AS m WHERE '.implode(" AND ",$wheresql).'';

            $items = [];
	        $q = mysql_query($sql);	
            while(list($rating) = mysql_fetch_array($q)){                
                if($rating>0)$items[] = $rating;                
            }
            $res['proximity_'.str_replace('.','',$d)] = ($items)?(array_sum($items)/count($items)):0;
        }
        $closest = $this->getGreatschoolsClosest($latitude,$longitude);

        $res['closest'] = ($closest)?$closest->data->rating:0;
	    return $res;
    }
    public function getGreatschoolsClosest($latitude,$longitude,$cutoff=50,$ratingOnly=true){
        $wheresql = ["1=1"];        
        if($ratingOnly)$wheresql[] = "rating>0";

        $sql = 'SELECT *, (((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * cos((m.lat*pi()/180)) * cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance FROM greatschools AS m WHERE '.implode(" AND ",$wheresql).' HAVING distance<"'.$cutoff.'" ORDER BY distance ASC LIMIT 1';                        
	    $q = mysql_query($sql);	
        $r = mysql_fetch_assoc($q);
        if(!$r)return false;
        
        $r['data'] = json_decode($r['data']);                

        return (object)$r;
    }

    //POI    
    public function getPoiCachables($latitude,$longitude){
        $distances = [0.1,0.25,0.5];
        $res = [];

        foreach($distances as $d){
            $wheresql = [];
            $wheresql[] = '(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * cos((m.lat*pi()/180)) * cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$d;
            $sql = 'SELECT subtype,stories,year_built,count(id) FROM poi AS m WHERE '.implode(" AND ",$wheresql).' GROUP BY subtype,stories,year_built';

            $items = [];
	        $q = mysql_query($sql);	
            while(list($type,$stories,$year,$count) = mysql_fetch_array($q)){
                if(!$items[$type])$items[$type] = [];
                if(!$items[$type][$stories])$items[$type][$stories] = [];
                if(!$items[$type][$stories][$year])$items[$type][$stories][$year] = [];

                $items[$type][$stories][$year] = $count;
            }
            $res['proximity_'.str_replace('.','',$d)] = $items;
        }
	    return $res;
    }
    public function getDealPoi($listingId,$distance){
        list($lat,$lng) = mysql_fetch_array(mysql_query("SELECT lat,lng FROM listings WHERE id='{$listingId}'"));
        if(!$lat || !$lng)return false;

        $wheresql = ["1=1"];
        $sql = 'SELECT *,
				(((acos(sin(('.$lat.'*pi()/180)) * sin((lat*pi()/180))+cos(('.$lat.'*pi()/180)) * cos((lat*pi()/180)) * cos((('.$lng.' - lng)*pi()/180))))*180/pi())*60*1.1515) AS distance 
				FROM poi WHERE '.implode(" AND ",$wheresql).' HAVING distance<'.$distance;
	    //t($sql);

        $items = [];
	    $q = mysql_query($sql);	
        while($r = mysql_fetch_assoc($q)){
            $items[] = $this->formatPoi($r);
        }
	    return $items;
    }
    public function formatPoi($r){
        $r['distance'] = number_format($r['distance'],2);
        $r['data'] = json_decode($r['data']);
        return (object)$r;
    }

    //Versions
    public function applyVersion($deal,$version){
        //Doesn't support nested overrides. Only first level overrides.
        $odeal = unserialize(serialize($deal));
        foreach($version->data as $k=>$kv){
            $parts = explode(".",$k);			
            $odeal->{$parts[0]}->{$parts[1]} = $kv;	
        }				                
        $odeal->standerized = (object)standCalcFields((array)$odeal->standerized);				
        $odeal = $this->getDeal($deal->listing->id,false,[],$odeal->standerized);
        return $odeal;
    }
    public function getVersionData($id){                
        $q = mysql_query("SELECT * FROM deals_versions WHERE id='{$id}'");
        $r = mysql_fetch_assoc($q);
        if(!$r)return false;
        return $this->formatVersionData($r);        
    }
    public function getDealVersionsData($lId){
        $items = [];

        $q = mysql_query("SELECT * FROM deals_versions WHERE listing_id='{$lId}'");
        while($r = mysql_fetch_assoc($q)){
            $items[] = $this->formatVersionData($r);
        }
        return $items;
    }
    private function formatVersionData($r){
        $r['data'] = json_decode($r['data']);
        return (object)$r;
    }

    //Costar
    public function getMarkets($lat,$lng,$submarketId=false){
        $res = [];
        if($submarketId){            
            $q = mysql_query("SELECT * FROM cs_markets WHERE remote_id=(SELECT market_remote_id FROM cs_submarkets WHERE remote_id='{$submarketId}' LIMIT 1)");
            while($r = mysql_fetch_assoc($q)){            
                $r = (object)$r;
                list($r->data) = mysql_fetch_array(mysql_query("SELECT data FROM cs_markets_data WHERE type='{$r->type}' AND market_remote_id=(SELECT market_remote_id FROM cs_submarkets WHERE type='{$r->type}' AND remote_id='{$submarketId}' LIMIT 1)"));
                if($r->data){
                    $r->data = json_decode($r->data);
                    $res[] = $r;
                }
            }             
        }
        if($res)return $res;

        $res = $this->getCsMarkets($lat,$lng,'markets');        
        foreach($res as &$r){
            list($r->data) = mysql_fetch_array(mysql_query("SELECT data FROM cs_markets_data WHERE type='{$r->type}' AND market_remote_id='{$r->remote_id}'"));
            if($r->data)$r->data = json_decode($r->data);
        }        
        return $res;
    }
    public function getSubmarkets($lat,$lng,$submarketId=false){
        $res = false;
        if($submarketId){          
            $q = mysql_query("SELECT * FROM cs_submarkets WHERE remote_id='{$submarketId}'");  
            while($r = mysql_fetch_assoc($q)){        
                $r = (object)$r;
                list($r->data) = mysql_fetch_array(mysql_query("SELECT data FROM cs_submarkets_data WHERE type='{$r->type}' AND submarket_remote_id='{$submarketId}'"));
                if($r->data){
                    $r->data = json_decode($r->data);
                    $res = [$r]; 
                }
            }             
        }
        if($res)return $res;

        $res = $this->getCsMarkets($lat,$lng,'submarkets');        
        foreach($res as &$r){
            list($r->data) = mysql_fetch_array(mysql_query("SELECT data FROM cs_submarkets_data WHERE type='{$r->type}' AND submarket_remote_id='{$r->remote_id}'"));
            if($r->data)$r->data = json_decode($r->data);
        }        
        return $res;
    }
    public function queryCsMarkets($lat,$lng,$mode,$limit=50,$type=''){ 
        $distance = 1000;
        $wheresql = [];
        $wheresql[] = "1=1";
        if($type)$wheresql[] = "type='{$type}'";
        $limit = " LIMIT {$limit}";
        $sql = '
                SELECT SQL_CALC_FOUND_ROWS m.*,(((acos(sin(('.$lat.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$lat.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$lng.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance FROM cs_'.$mode.' AS m                
                WHERE (((acos(sin(('.$lat.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$lat.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$lng.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$distance.' 
            AND '.implode(" AND ",$wheresql).' ORDER BY distance ASC '.$limit;
        //t($sql);    
        $q = mysql_query($sql);                        
                
        $markets = [];
        while($r = mysql_fetch_assoc($q)){  
            $r['distance'] = number_format($r['distance'],2);
            $markets[$r['remote_id'].'_'.$r['type']] = (object)$r;
        }          
        return $markets;
    }
    public function getCsMarkets($lat,$lng,$mode){ 
        $matched = [];
        $markets = $this->queryCsMarkets($lat,$lng,$mode);

        if($mode == 'markets'){
            foreach($markets as $m){                
                $res = $this->pointInMarkets($lat,$lng,$m);
                if($res)$matched[] = $m;
            }
        }
        if($mode == 'submarkets'){
            foreach($markets as $m){
                $res = $this->pointInSubmarkets($lat,$lng,$m); 
                if($res)$matched[] = $m;   
            }
        }
                
        return $matched;
    }    
    public function pointInMarkets($lat,$lng,$market){          
        $matches = [];   
        //t("SELECT * FROM cs_markets_layers WHERE type='{$market->type}' AND market_remote_id='{$market->remote_id}'",1);            
        $q = mysql_query("SELECT * FROM cs_markets_layers WHERE type='{$market->type}' AND market_remote_id='{$market->remote_id}'");
        $r = mysql_fetch_assoc($q);
        if(!$r)return false;
        
        $geo = json_decode($r['data']);
        
        $res = $this->pointInGeo($lat,$lng,$geo);
        return ($res)?true:false;
    }
    public function pointInSubmarkets($lat,$lng,$market){
        $matches = [];       
        $q = mysql_query("SELECT * FROM cs_submarkets_layers WHERE type='{$market->type}' AND submarket_remote_id='{$market->remote_id}'");
        $r = mysql_fetch_assoc($q);
        if(!$r)return false;

        $geo = json_decode($r['data']);            
        $res = $this->pointInGeo($lat,$lng,$geo);
        return ($res)?true:false;
    }    
    private function pointInGeo($lat,$lng,$geo){        
        //$res = pw_get('',[],false,'isPointInsidePoly.js',['lat'=>$lat, 'lng'=>$lng, 'geo'=>$geo]);               
        $res = node_get('',[],false,'isPointInsidePoly.js',['lat'=>$lat, 'lng'=>$lng, 'geo'=>$geo]);        
        $res = json_decode($res);                
        return ($res && $res->isInside)?true:false;
    }

    //Zillow
    public function getZillowAddresses($box){        
        if(!$box['north'] || !$box['south'] || !$box['east'] || !$box['west'])err("Unexpected Error");
        $res = $this->zillow->search($box);  
                           
        $items = [];
        $houses = $res->cat1->searchResults->mapResults;        
        if($houses){
            foreach($houses as $h){
                $r = [
                    'address'   => $h->address,
                    'value'     => (float)preg_replace("/[^0-9\.]/","",$h->price),
                    'loc'       => $h->latLong,
                    'type'      => $h->hdpData->homeInfo->homeType, 
                    'sqft'      => (float)$h->hdpData->homeInfo->livingArea
                ];
                //t($r,1);                
               
                $r['price_sqft'] = ($r['sqft'])?$r['value']/$r['sqft']:0;
                $items[] = $r;
            }
        }                       
                
        return $items;
    }

    //Lease data
    public function getLeaseInfo($id,$useCachedDups=true){    
        $ce = new CE();
        $listing = $this->getStanderizedListing($id);

        $dup_spaces = [];
        $spaces = [];
                
        $spaces = (($listing->source == 'commercialexchange.com'))?$ce->getBuildingSpaces($listing->id):$listing->children;            
                
        if($useCachedDups){
            $dups = $this->getDuplicateListingsV2($id,'lease'); 
            if($dups['items']){                
                foreach($dups['items'] as $d){                    
                    $listing = $this->getStanderizedListing($d->listing_id2);                    
                    if(strtolower($listing->type) != 'lease')continue;                    
                    $subspaces = (($listing->source == 'commercialexchange.com'))?$ce->getBuildingSpaces($listing->id):$listing->children;                                
                    if($subspaces) $dup_spaces = array_merge($dup_spaces,$subspaces);
                    
                }
            }
        }
        else{
            $dups = $this->checkDuplicateListings($id, $listing->lat,$listing->lng,true,false,false);

            foreach($dups as $d){
                if(strtolower($d->type) != 'lease')continue;
    
                $listing = $this->getStanderizedListing($d->id);
                $subspaces = (($listing->source == 'commercialexchange.com'))?$ce->getBuildingSpaces($listing->id):$listing->children;            
                if($subspaces) $dup_spaces = array_merge($dup_spaces,$subspaces);
            }
        }        
        
        

        $sIds = [];
        if($spaces)foreach($spaces as $s)$sIds[] = $s->id;
        if($dup_spaces){
            foreach($dup_spaces as $ds){
                if(in_array($ds->id,$sIds))continue;
                $ds->dup = 1;
                $sIds[] = $ds->id;
                $spaces[] = $ds;
            }
        }

        $data = (object)[
            'spaces' => $spaces,
        ];
        $data->avg_rate = ($spaces)?array_sum(array_map(function($s){return $s->rate;},$spaces))/count($spaces):0;
        $data->min_rate = ($spaces)?min(array_map(function($s){return $s->rate;},$spaces)):0;
        $data->max_rate = ($spaces)?max(array_map(function($s){return $s->rate;},$spaces)):0;
        return $data;
    }

    //Dups    
    public function getDuplicateListingsV2($id,$type='',$includeData=false){
        $dups = [];
        $ranges = [6,12,24,'all'];
        $items = [];

        $wheresql = [];
        $wheresql[] = "listing_id1='{$id}'";
        if($type)$wheresql[] = "listing2_type='{$type}'";
        $q = mysql_query("SELECT * FROM dups WHERE ".implode(" AND ",$wheresql));
        while($r = mysql_fetch_assoc($q)){
            $r['data'] = json_decode($r['data']);
            if($includeData)$r['listing'] = reset(standerizeListing([mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$r['listing_id2']}'"))]));
            $items[$r['listing_id2']] = (object)$r;

            foreach($ranges as $range){
                if($range == 'all')$dups['historical_'.$range]++;
                else if($r['listing2_timestamp'] > date('Y-m-d H:i:s',strtotime('-'.$range.' months')))$dups['historical_'.$range]++;                    
            }
        }
        foreach($ranges as $range){
            if(!$dups['historical_'.$range])$dups['historical_'.$range]=-1;
        }
        $dups['items'] = $items;
        return $dups;
    }   
    public function checkDuplicateListings($id, $latitude,$longitude,$macthesOnly=true,$config=false,$save=false){
        if(!$latitude || !$longitude)return false;        
        if($config) $distance = $config->radius;
        else $distance = $this->dups_config->radius;   
                                                 
        $limit = '';
        $wheresql = [];
        $wheresql[] = "m.id!='{$id}'";
        
        $sql = '
                SELECT SQL_CALC_FOUND_ROWS m.*,(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance FROM listings AS m                
                WHERE (((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$distance.' 
            AND '.implode(" AND ",$wheresql).' ORDER BY distance ASC '.$limit;
        //t($sql);    
        $q = mysql_query($sql);
        list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));

        $items = array();
        while($r = mysql_fetch_assoc($q)){            
            $r['data'] = json_decode($r['data']);           
            $items[$r['id']] = (object)$r;
        }

        $matches = [];
        if($items){
            $listing = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$id}'"));	
	        $listing = reset(standerizeListing([$listing]));	

            $dups = [];
            foreach(standerizeListing($items) as $r)$dups[$r->id] = $r;
                
            $matchedDups = $this->checkDuplicatesV2($listing,$dups,$config);                    
            foreach($matchedDups as $md){                
                $mId = $md['id'];
                $matches[$mId] = $dups[$mId];
                $matches[$mId]->dupInfo = $md;
            }

        } 
        if($macthesOnly)$matches = array_filter($matches,function($m){return $m->dupInfo['match'];});
        if($save){
            mysql_query("DELETE FROM dups WHERE listing_id1='{$id}'");
            mysql_query("UPDATE listings SET last_dups_cache=NOW() WHERE id='{$id}'");
            foreach($matches as $m){ 
                $ts = pick($m->created_on,$m->scraped_on);
                mysql_query("INSERT INTO dups SET listing_id1='{$id}', listing_id2='{$m->id}', listing2_timestamp='{$ts}', listing2_type='{$m->type}',dup='{$m->dupInfo['match']}',score='{$m->dupInfo['score']}',reason='{$m->dupInfo['reason']}',distance='{$m->dupInfo['distance']}',data='".json_encode($m->dupInfo)."'");
            }
        }
        return $matches;
    }
    public function getScoreKeys(){
        $q = mysql_query("SELECT * FROM listings WHERE status='ready' LIMIT 2");

        $l1 = reset(standerizeListing([mysql_fetch_assoc($q)]));	
        $l2 = reset(standerizeListing([mysql_fetch_assoc($q)]));	
        
        $res = reset($this->checkDuplicatesV2($l1,[$l2]));
        
        $scores = [];
        foreach($res['scores'] as $k=>$v){
            $scores[] = $k;
        }
        return $scores;
    }
    public function checkDuplicatesV2($listing,$dups,$config=false){        
        if(!$config)$config = $this->dups_config;

        $matches = [];
        $scores = [];
        foreach($dups as $d){  
            if($d->id == $listing->id)continue;

            $agentOverlap = false;
            foreach($listing->agents as $a1){
                foreach($d->agents as $a2){                    
                    //t($a1->name.'=='.$a2->name,1);
                    //if($a1->name && $a1->name==$a2->name || ($a1->company && $a1->company == $a2->company)){
                    if($a1->name && $a1->name==$a2->name){
                        $agentOverlap = true;
                        break;
                    }
                }
            }                
            
            $distance = box2Distance($listing->lat,$listing->lng,$d->lat,$d->lng); 
            

            $scores['distance'] = exp(-0.01 * $distance*5280)*100; 
            $scores['address'] = compareAddresses($listing->address,$d->address);            
            $scores['price'] = ($listing->price>0 && $d->price>7)?(100-((100*abs($listing->price-$d->price))/$listing->price)):'na';
            $scores['agents'] = ($agentOverlap)?100:0;
            
            $scores['apn'] = (!$listing->APN || !$d->APN)?'na':compareStrings($listing->APN[0],$d->APN[0]);
            $scores['fip'] = (!$listing->FIP || !$d->FIP)?'na':compareStrings($listing->FIP[0],$d->FIP[0]);            
            $scores['acres'] = ($listing->acres>0 && $d->acres>0)?(100-((100*abs($listing->acres-$d->acres))/$listing->acres)):'na';
            $scores['buildings_sqft'] = ($listing->buildings_sqft>0 && $d->buildings_sqft>0)?(100-((100*abs($listing->buildings_sqft-$d->buildings_sqft))/$listing->buildings_sqft)):'na';            
            $scores['category'] = (!$listing->category || !$d->category)?'na':compareStrings($listing->category,$d->category);
            $scores['subtype'] = (!$listing->subtype || !$d->subtype)?'na':compareStrings($listing->subtype,$d->subtype);
            $scores['title'] = (!$listing->title || !$d->title)?'na':compareStrings($listing->title,$d->title);  
                        
            arsort($scores);

            //Auto mismatch     
            if($config->auto_mismatch){
                foreach($config->auto_mismatch as $rule){   
                    if(!$rule->conditions)continue;
                    $pass = $fail = 0;

                    foreach($rule->conditions as $condition){
                        $op = $condition[1];
                        $ref = $condition[2];  
                        if($condition[0] == 'distance')
                            $score = $distance;
                        else
                            $score = $scores[$condition[0]];                        

                        //if($score == 'na')continue;
                        
                        if(text2op($op,$score,$ref)){
                            $pass++;
                        }
                        else{
                            $fail++;
                        }
                    }

                    if($rule->mode == 'or' && $pass>0){ $matches[] = ['id'=>$d->id,'score'=>0, 'reason'=>'automismatch', 'match'=> 0, 'distance'=>$distance, 'scores'=>$scores]; continue 2; }
                    if($rule->mode == 'and' && $fail==0){ $matches[] = ['id'=>$d->id,'score'=>0, 'reason'=>'automismatch', 'match'=> 0, 'distance'=>$distance, 'scores'=>$scores]; continue 2; }
                }
            }

            //Auto match              
            if($config->auto_match){
                foreach($config->auto_match as $rule){   
                    if(!$rule->conditions)continue;
                    $pass = $fail = 0;

                    foreach($rule->conditions as $condition){
                        $op = $condition[1];
                        $ref = $condition[2];  

                        if($condition[0] == 'distance')
                            $score = $distance;
                        else
                            $score = $scores[$condition[0]];                        

                        //if($score === 'na')continue;
             
                        if(text2op($op,$score,$ref)){
                            $pass++;
                        }
                        else{
                            $fail++;
                        }
                    }

                    if($rule->mode == 'or' && $pass>0){ $matches[] = ['id'=>$d->id,'score'=>100, 'reason'=>'automatch', 'match'=> 1, 'distance'=>$distance, 'scores'=>$scores]; continue 2; }
                    if($rule->mode == 'and' && $fail==0){ $matches[] = ['id'=>$d->id,'score'=>100, 'reason'=>'automatch', 'match'=> 1, 'distance'=>$distance, 'scores'=>$scores]; continue 2; }
                } 
            }


            $finalScore = 0;
            foreach($config->weights as $k=>$w){
                if($scores[$k] == 'na')continue;
                $finalScore += $scores[$k]*($w/100);
            }
            if($finalScore >= $config->threshold)$matches[] = ['id'=>$d->id,'score'=>$finalScore, 'reason'=>'score_over_threshold', 'match'=> 1, 'distance'=>$distance, 'scores'=>$scores];
            else $matches[] = ['id'=>$d->id,'score'=>$finalScore, 'reason'=>'score_under_threshold', 'match'=> 0, 'distance'=>$distance, 'scores'=>$scores];
        }      
        
        usort($matches,function($a,$b){return $b['score']-$a['score'];});
        return $matches;
    }





    public function getDuplicateListings($id, $latitude,$longitude,$distance=0.1){
        if(!$latitude || !$longitude)return false;
                 
        $limit = '';
        $wheresql = [];
        $wheresql[] = "m.id!='{$id}'";
        
        $sql = '
                SELECT SQL_CALC_FOUND_ROWS m.*,(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance FROM listings AS m                
                WHERE (((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$distance.' 
            AND '.implode(" AND ",$wheresql).' ORDER BY distance ASC '.$limit;
        //t($sql);    
        $q = mysql_query($sql);
        list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
        
        /*
        $items = array();
        while($r = mysql_fetch_assoc($q)){
            $r['data'] = json_decode($r['data']);           
            $items[$r['id']] = (object)$r;            
        }
        $items = $this->filterDuplicationListings($id,$items);
        return $items;
        */

        $items = array();
        while($r = mysql_fetch_assoc($q)){            
            $r['data'] = json_decode($r['data']);           
            $items[$r['id']] = (object)$r;
        }

        $matches = [];
        if($items){
            $listing = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$id}'"));	
	        $listing = reset(standerizeListing([$listing]));	

            $dups = [];
            foreach(standerizeListing($items) as $r)$dups[$r->id] = $r;
                
            $mIds = $this->checkDuplicates($listing,$dups);        
            foreach($mIds as $mId){
                $matches[$mId] = $dups[$mId];
            }

        }                
        return $matches;
    }
    public function filterDuplicationListings($id,$dups){
        $items = [];
        if(!$dups || !$id)return $items;
        $listing = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$id}'"));	
	    $formatted = reset(standerizeListing([$listing]));	
        
        foreach($dups as $d){				
            $df = reset(standerizeListing([$d]));			
                
            $score = compareStrings($df->address,$formatted->address);	
            if($score == 0)	continue;

            $items[$df->id] = $df;
        }
        return $items;
    }
    public function checkDuplicates($listing,$dups){
        $matches = [];
        foreach($dups as $d){  
            if($d->id == $listing->id)continue;

            $distance = box2Distance($listing->lat,$listing->lng,$d->lat,$d->lng);                                    
            if($distance && $distance>0.5)continue; 
                                    
            $score = compareStrings($listing->address,$d->address);            
            if($score <= 40)continue;

            //t("Ref: ".$listing->address,1);
            //t("Val: ".$d->address,1);
            
            $flag = false;
            foreach($listing->agents as $a1){
                foreach($d->agents as $a2){                    
                    //t($a1->name.'=='.$a2->name,1);
                    if($a1->name && $a1->name==$a2->name || ($a1->company && $a1->company == $a2->company)){
                        $flag = true;
                        break;
                    }
                }
            }            
            if(!$flag)continue;

            if($listing->price && $d->price && abs($listing->price-$d->price)>10000)continue;

            $matches[] = $d->id;
        }        
        return $matches;
    }

    //OpenAddressses   
    public function getOaCachables($city,$state,$latitude,$longitude){;
        $res = [];
        
        $distances = [0.1,0.25,0.5];
        foreach($distances as $d){
            $count = $this->getOaAddressCount($city,$state,$latitude,$longitude,$d);
            $res['proximity_'.str_replace('.','',$d)] = ['title'=>"OpenAddress Count - {$d} miles",'proximity'=>$d, 'count'=>$count];            
        }
        return $res;
    } 
    static public function getOaAddressCount($city,$state,$latitude,$longitude,$distance){    
        $abv = stateAbbreviate($state);
        if($abv)$state = $abv;        

        $wheresql = [];
        $wheresql[] = "state='{$state}'";
        $wheresql[] = "city='{$city}'";
        $wheresql[] = '(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * cos((m.lat*pi()/180)) * cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$distance;
        $sql = "SELECT SQL_CALC_FOUND_ROWS count(id) FROM oa_addresses AS m WHERE ".implode(" AND ",$wheresql);
        //t($sql,1);
        list($count) = mysql_fetch_array(mysql_query($sql));
        return $count;
    }
    public function getOaAddresses($latitude,$longitude,$distance=5,$limit='10000'){
        if(!$latitude || !$longitude)return false;
                 
        if($limit)$limit = "LIMIT $limit";
        $wheresql = ["1=1"];
        
        $sql = '
                SELECT SQL_CALC_FOUND_ROWS m.*,(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance FROM oa_addresses AS m                
                WHERE (((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
            cos((m.lat*pi()/180)) * 
            cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$distance.' 
            AND '.implode(" AND ",$wheresql).' ORDER BY distance ASC '.$limit;
        //t($sql);    
        $q = mysql_query($sql);
        list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
        
        $items = array();
        while($r = mysql_fetch_assoc($q)){
            $r['data'] = json_decode($r['data']);

            $address = [];
            $address[] = $r['data']->properties->number.' '.$r['data']->properties->street;            
            $address[] = pick($r['data']->properties->city,$r['city']);
            $address[] = pick($r['data']->properties->district,$r['county']);
            $address[] = pick($r['district']->properties->postcode,$r['zip']);
            $r['address'] = implode(", ",array_filter($address));
            $items[$r['id']] = (object)$r;
        }
        
        return (object)['items'=>$items,'total'=>$total, 'distance'=>$distance];
    }
    

    //Census
    public function getCensusData($loc){
        $date = [];
        $data['income'] = (object)['title'=> 'Census Median Income', 'data'=>$this->getCensusIncome($loc)];
        $data['population'] = (object)['title'=> 'Census Population', 'data'=>$this->getCensusPopulation($loc)];
        return $data;
    }  
    public function getCensusIncome($loc){
        $items = array();
        $q = mysql_query("SELECT * FROM census_income WHERE zip='{$loc->zip}'");
        while($r = mysql_fetch_assoc($q)){
            $data = json_decode($r['data']);
            foreach($data as $d=>$v){
                //t($v,1);
                //if(!is_numeric($v))t($v,1);
                $items[$d] = (float)$v->value+0;
            }
        }
        $res = [];        
        $res['zip'] = ['type'=>'zip','title'=>$loc->zip, 'value'=> end($items),'data'=>$items,'trends'=>$this->calculateYearlyTrends($items)];
    
        return $res;
    }
    public function getCensusPopulation($loc){
        $items = array();
        $q = mysql_query("SELECT * FROM census_population WHERE zip='{$loc->zip}'");
        while($r = mysql_fetch_assoc($q)){
            $data = json_decode($r['data']);
            foreach($data as $d=>$v){
                $items[$d] = $v->value+0;
            }
        }

        $res = [];
        $res['zip'] = ['type'=>'zip','title'=>$loc->zip, 'value'=> end($items),'data'=>$items,'trends'=>$this->calculateYearlyTrends($items)];

        //$cityZips = $this->getCityZips($loc->city,$loc->state);        
        $cityZips = $this->getCityZipsByZip($loc->zip);
        if($cityZips && count($cityZips)==1){
            $res['city'] = ['type'=>'city','title'=>$loc->city, 'value'=> end($items),'data'=>$items,'trends'=>$this->calculateYearlyTrends($items)];
        }
        else if($cityZips && count($cityZips)>1){
            $items = array();            
            $q = mysql_query("SELECT * FROM census_population WHERE zip IN ('".implode("','",$cityZips)."')");
            while($r = mysql_fetch_assoc($q)){
                $data = json_decode($r['data']);
                foreach($data as $d=>$v){
                    $items[$d] += $v->value+0;
                }
            }
            $res['city'] = ['type'=>'city','title'=>$loc->city, 'value'=> end($items),'data'=>$items,'trends'=>$this->calculateYearlyTrends($items)];
        }   
        
        $countyZips = $this->getCountyZipsByZip($loc->zip);
        if($countyZips && count($countyZips)==1){
            $res['county'] = ['type'=>'county','title'=>$loc->county, 'value'=> end($items),'data'=>$items,'trends'=>$this->calculateYearlyTrends($items)];
        }
        else if($countyZips && count($countyZips)>1){
            $items = array();            
            $q = mysql_query("SELECT * FROM census_population WHERE zip IN ('".implode("','",$countyZips)."')");
            while($r = mysql_fetch_assoc($q)){
                $data = json_decode($r['data']);
                foreach($data as $d=>$v){
                    $items[$d] += $v->value+0;
                }
            }
            $res['county'] = ['type'=>'county','title'=>$loc->county, 'value'=> end($items),'data'=>$items,'trends'=>$this->calculateYearlyTrends($items)];
        }  

        return $res;
    }

    //Zillow
    public function getZillowData($loc){
        $date = [];
        $data['zhvi'] = (object)['title'=> 'Zillow Home Value Index', 'data'=>$this->getZillowZHVI($loc)];
        $data['zori'] = (object)['title'=> 'Zillow Observed Rent Index', 'data'=>$this->getZillowZORI($loc)];
        return $data;
    }  
    public function getZillowZORI($loc){
        $data = [];

        $wheresql = [];
        $wheresql[] = "region_name = '{$loc->zip}'";        
        $q = mysql_query("SELECT * FROM zillow_zori WHERE ".implode(" AND ",$wheresql));
        $r = mysql_fetch_assoc($q);
        if(!$r)return false;
        $r['data'] = json_decode($r['data'],true);        
        $data['zip'] = ['type'=>'zip','title'=>$loc->zip,'data'=>$r['data'], 'value'=>end($r['data']), 'rank' => $r['rank'], 'trends'=>$this->calculateMonthlyTrends($r['data'])];
        $msa = $r['msa_name'];        

        if($msa){
            $wheresql = [];
            $wheresql[] = "region_name = '{$msa}'";            
            $q = mysql_query("SELECT * FROM zillow_zori WHERE ".implode(" AND ",$wheresql));
            $r = mysql_fetch_assoc($q);
            if($r){
                $r['data'] = json_decode($r['data'],true);
                $data['city'] = ['type'=>'msa','title'=>$msa,'data'=>$r['data'], 'value'=>end($r['data']), 'rank' => $r['rank'], 'trends'=>$this->calculateMonthlyTrends($r['data'])];
            }        
        }
        return $data;
    }
    public function getZillowZHVI($loc){
        $data = [];

        $wheresql = [];
        $wheresql[] = "region_name = '{$loc->zip}'";
        $wheresql[] = "region_type = 'Zip'";        
        $q = mysql_query("SELECT * FROM zillow_zhvi WHERE ".implode(" AND ",$wheresql));
        $r = mysql_fetch_assoc($q);
        if(!$r)return false;        
        $r['data'] = json_decode($r['data'],true);                
        $data['zip'] = ['type'=>'zip','title'=>$loc->zip,'data'=>$r['data'], 'value'=>end($r['data']), 'rank' => $r['rank'], 'trends'=>$this->calculateMonthlyTrends($r['data'])];
        $city = $r['city'];
        $stateAbr = $r['state_name'];
        $state = $GLOBALS["states"][$r['state_name']];

        $wheresql = [];
        $wheresql[] = "region_name = '{$city}'";
        $wheresql[] = "region_type = 'City'";        
        $q = mysql_query("SELECT * FROM zillow_zhvi WHERE ".implode(" AND ",$wheresql));
        $r = mysql_fetch_assoc($q);
        if($r){
            $r['data'] = json_decode($r['data'],true);
            $data['city'] = ['type'=>'city','title'=>$city,'data'=>$r['data'], 'value'=>end($r['data']), 'rank' => $r['rank'], 'trends'=>$this->calculateMonthlyTrends($r['data'])];
        }        

        $wheresql = [];
        $wheresql[] = "region_name = '{$state}'";
        $wheresql[] = "region_type = 'State'";
        $q = mysql_query("SELECT * FROM zillow_zhvi WHERE ".implode(" AND ",$wheresql));
        $r = mysql_fetch_assoc($q);
        if(!$r){
            $wheresql = [];
            $wheresql[] = "region_name = '{$stateAbr}'";
            $wheresql[] = "region_type = 'State'";
            $q = mysql_query("SELECT * FROM zillow_zhvi WHERE ".implode(" AND ",$wheresql));
            $r = mysql_fetch_assoc($q);
        }
        if($r){
            $r['data'] = json_decode($r['data'],true);
            $data['state'] = ['type'=>'state','title'=>$state,'data'=>$r['data'], 'value'=>end($r['data']), 'rank' => $r['rank'], 'trends'=>$this->calculateMonthlyTrends($r['data'])];
        }        

        $wheresql = [];
        $wheresql[] = "region_name LIKE '%, {$stateAbr}'";
        $wheresql[] = "region_name LIKE '%{$city}%'";
        $wheresql[] = "region_type = 'msa'";        
        $q = mysql_query("SELECT * FROM zillow_zhvi WHERE ".implode(" AND ",$wheresql));
        $r = mysql_fetch_assoc($q);
        if($r){
            $r['data'] = json_decode($r['data'],true);
            $data['msa'] = ['type'=>'msa','title'=>$r['region_name'],'data'=>$r['data'], 'value'=>end($r['data']), 'rank'=>$r['rank'], 'trends'=>$this->calculateMonthlyTrends($r['data'])];
        }        

        return $data;
    }
}