<?php
set_time_limit(60*60*1);
session_write_close();

uselib('deal');
uselib('AWS::s3');
uselib('walkscore');

$dl = new Deal();
$s3 = new S3();
$ws = new Walkscore();

usehelper("ajax::dispatch");

function getLeaseRates(){
    global $dl;    

    $lng = $_REQUEST['lng'];
    $lat = $_REQUEST['lat'];

    if(!$lng || !$lat)err("Missing coordinates!");


    $lat1 = $_REQUEST['box']['lat1'];
    $lng1 = $_REQUEST['box']['lng1'];
    $lat2 = $_REQUEST['box']['lat2'];
    $lng2 = $_REQUEST['box']['lng2'];
    $distance = box2Distance($lat1,$lng1,$lat2,$lng2);
    if(!$distance)$distance = 0.5;    
    //t($distance);

    $date = $_REQUEST['date'];
    if(!$date) err('Date range is required');
    
    $filter = $_REQUEST['filter'];    
    $limit = 10000;
    $offset = 0;    
    $items = getMapLocations($lat,$lng,$distance,['date'=>$date],$limit,$offset);        
    //$items = getMapLocations($lat,$lng,$distance,['date'=>$date],$limit,$offset);        
    $formatted = standerizeListing($items);

    $total = 0;
    $list = [];
    foreach($formatted as $r){        
        if(!$r->lease_rent || $r->lease_rent>100)continue;
        if(!$r->lease_rent)continue;
        //t($r->lease_rent,1);
        //t($r->url,1);
        $total += $r->lease_rent*12;
        $list[] = $r->lease_rent*12;
    }
    sort($list);

    //t($list);

    $stats = [
        'average' => (count($list))?$total/count($list):0,
        'count' => count($list),
        'min' => (count($list))?min($list):0,
        'max' => (count($list))?max($list):0,
        'median' => (count($list))?median($list):0,
    ];        
    json(['stats'=>$stats]);
}

function getFilters($ajax=true){
    $items = [];

    $q = mysql_query("SELECT * FROM filters2 ORDER BY title ASC");
    while($r = mysql_fetch_assoc($q)){
        //$r['data'] = json_decode($r['data']);
        list($r['username']) = mysql_fetch_array(mysql_query("SELECT username FROM users WHERE id='{$r['user_id']}'"));
        $items[] = (object)$r;
    }
    if($ajax)
        json(['items'=>$items]);
    else
        return $items;
}

function removeFilter(){
    $id = $_REQUEST['id'];
    if(!$id)err("Filter not found!");

    sql("DELETE FROM filters2 WHERE id='{$id}'");
}
function getFilter(){
    $id = $_REQUEST['id'];

    if(!$id)err("Filter not found");

    $r = mysql_fetch_assoc(mysql_query("SELECT * FROM filters2 WHERE id='{$id}'"));
    if(!$r)err("Filter not found");

    $r['data'] = json_decode($r['data']);

    json(['item'=>$r]);
}
function searchFilters(){
    $userId = $_REQUEST['user_id'];
    $type = $_REQUEST['type'];
    $q = $_REQUEST['q'];    

    $wheresql = [];
    if($userId)$wheresql[] = "user_id='{$userId}'";
    if($type)$wheresql[] = "type='{$type}'";
    if($q)$wheresql[] = "title LIKE '%{$q}%'";
    if(!$wheresql)$wheresql = ["1=1"];

    $items = [];

    $q = mysql_query("SELECT * FROM filters2 WHERE ".implode(" AND ",$wheresql)." ORDER BY title ASC");
    while($r = mysql_fetch_assoc($q)){    
        $r['data'] = json_decode($r['data']);
        $r['count'] = count($r['data']);
        list($r['username']) = mysql_fetch_array(mysql_query("SELECT username FROM users WHERE id='{$r['user_id']}'"));
        $items[] = (object)$r;
    }
    json(['items'=>$items]);
}
function saveQuery(){
    $q = $_REQUEST['query'];    

    $title = mysql_real_escape_string($q['title']);
    $data = mysql_real_escape_string(json_encode($q));
    sql("INSERT INTO filters2 SET type='subquery', data='{$data}', title='{$title}'");
}
function filterSave(){
    $filters = $_REQUEST['filters'];
    $title = $_REQUEST['title'];
    $type = $_REQUEST['type'];

    $overwriteId = $_REQUEST['overwrite_id'];
    if(!$overwriteId){
        if(!$title) err("Title is required");
        if(!$filters) err("No filters detected");
    }        
    $data = mysql_real_escape_string(json_encode($filters));

    if($overwriteId){        
        sql("UPDATE filters2 SET data='{$data}' WHERE id='{$overwriteId}'");
    }
    else{
        sql("INSERT INTO filters2 SET user_id='{$_SESSION['user']->id}', type='{$type}', title='{$title}', data='{$data}'");
    }    
}
function export_sample(){
    $filename = 'Upload_Template.csv';
    $file = $GLOBALS['system']['path'].'/assets/'.$filename; 

    if(!file_exists($file))err('File not found!');

    $f = fopen($file, 'r');     
    // Set headers to download file rather than displayed 
    header('Content-Type: text/csv'); 
    header('Content-Disposition: attachment; filename="' . $filename . '";'); 
    
    //output all remaining data on a file pointer 
    fpassthru($f); 
    exit;
}
function export(){
    $filename = $_REQUEST['filename'];
    $file = $GLOBALS['system']['tmp_path'].'/'.$filename; 

    if(!file_exists($file))err('File not found!');

    $f = fopen($file, 'r');     
    // Set headers to download file rather than displayed 
    header('Content-Type: text/csv'); 
    header('Content-Disposition: attachment; filename="' . $filename . '";'); 
    
    //output all remaining data on a file pointer 
    fpassthru($f); 
    exit;
}
function getBuilderFilters(){
    json(['filters'=>Filters::buildFilterConfig()]);
}
function generateExport(){
    global $dl;
    $ids = explode(",",$_REQUEST['ids']);
    $fields = explode(",",$_REQUEST['fields']);
    
    if(!$ids)err("No listings found!");

    $filters = Filters::buildFilterConfig();
            
    $filename = "wvgu_export_" . date('Y-m-d h:i:s') . '_'. uniqid() .".csv";   
    $file = $GLOBALS['system']['tmp_path'].'/'.$filename;       
    $f = fopen($file, 'w'); 

    $exportData = [
        'Title' => 'standerized.title',
        'URL' => 'standerized.url',
        'Address' => 'standerized.address',
        'City' => 'standerized.city',
        'State' => 'standerized.state',
        'Zip' => 'standerized.zip',
        'Type' => 'standerized.category',
        'Subtype' => 'standerized.subtype',
        'Price' => 'standerized.price',
        'Land Sqft' => 'standerized.sqft',
        'Land Acres' => 'standerized.acres',
        'Building Sqft' => 'standerized.buildings_sqft',
        'Price per Sqft'=> 'standerized.price_per_sqft',
        'Price Per Acre'=> 'standerized.price_per_acres',
        'Price Perl Building Sqft'=> 'standerized.building_price_per_sqft',
        'FAR'=> 'standerized.far',
        'Sale/Lease'=> 'standerized.type',
        'Lease Expires In (year)'=> 'standerized.lease_exp',
        'NOI'=> 'standerized.noi',
        'Cap Rate'=> 'standerized.cap_rate',
        'NOI/Cap Rate'=> 'standerized.building_rent_rate',
        'Retail Market NOI' => 'advanced.retail.market_noi',
        'Retail Market Rate' => 'advanced.retail.market_cap_rate',
        'Retail Market Rate/Implied Market NOI' => 'advanced.retail.market_rent_rate',
        'Retail Submarket NOI' => 'advanced.retail.submarket_noi',
        'Retail Submarket Rate' => 'advanced.retail.submarket_cap_rate',
        'Retail Submarket Rate/Implied Submarket NOI' => 'advanced.retail.submarket_rent_rate',
        'Industrial Market NOI' => 'advanced.industrial.market_noi',
        'Industrial Market Rate' => 'advanced.industrial.market_cap_rate',
        'Industrial Market Rate/Implied Market NOI' => 'advanced.industrial.market_rent_rate',
        'Industrial Submarket NOI' => 'advanced.industrial.submarket_noi',
        'Industrial Submarket Rate' => 'advanced.industrial.submarket_cap_rate',
        'Industrial Submarket Rate/Implied Submarket NOI' => 'advanced.industrial.submarket_rent_rate',
        'Office Market NOI' => 'advanced.office.market_noi',
        'Office Market Rate' => 'advanced.office.market_cap_rate',
        'Office Market Rate/Implied Market NOI' => 'advanced.office.market_rent_rate',
        'Office Submarket NOI' => 'advanced.office.submarket_noi',
        'Office Submarket Rate' => 'advanced.office.submarket_cap_rate',
        'Office Submarket Rate/Implied Submarket NOI' => 'advanced.office.submarket_rent_rate',
    ];	
    if($fields){
        foreach($fields as $field){
            list($key,$title) = explode('_-_',$field);
            if(in_array($key,array_values($exportData)))continue;            
            if($key && $title)$exportData['Additional Field: '.$title] = $key;
        }					
    }    

    // Set column headers         
    fputcsv($f, array_keys($exportData)); 



    $q = mysql_query("SELECT SQL_CALC_FOUND_ROWS m.*, c.data AS cache, d.listing_id AS deals_data_listing_id, d.default_versions AS deals_data_default_versions, d.data AS deals_data_data FROM listings AS m                
                        LEFT JOIN deals_data AS d ON d.listing_id=m.id
                        LEFT JOIN deals_cache2 AS c ON c.listing_id=m.id
                        WHERE m.id IN ('".implode("','",$ids)."')");
    while($r = mysql_fetch_assoc($q)){
    #foreach($ids as $id){        
        $id = $r['id'];
        //$deal = $dl->getDeal($id);        
        $deal = $dl->formatDeal2($r);        
        $data = [];
        foreach($exportData as $title=>$key){
            //$keys = explode('.',$key);                        
            //$data[] = $deal->{$keys[0]}->{$keys[1]};  

            $keys = explode('.',$key);                        
            $val = $deal;
            foreach($keys as $k){
                $val = $val->{$k};
            }

            //$val = getKeyValue($deal,$key);
            $data[] = $val;
        }		        
        fputcsv($f, $data);         
    }

    fclose($f);

    if(!file_exists($file))err("Unable to generate download file!");
    
    json(['filename'=>$filename]);
}
function filterListings(){
    global $dl;

    $ids = explode(',',$_REQUEST['listingIds']);
    $rules = $_REQUEST['rules'];     
            
    $showAll = ($rules == 'ShowAll')?true:false;
    
    $stats = (object)['total'=>count($ids), 'valid'=>0, 'invalid'=>0, 'err'=>0, 'err_valid'=>0];
    $data = [];
    
    $items = [];    
    $q = mysql_query("SELECT SQL_CALC_FOUND_ROWS m.*, c.data AS cache, d.listing_id AS deals_data_listing_id, d.default_versions AS deals_data_default_versions, d.data AS deals_data_data FROM listings AS m                
                        LEFT JOIN deals_data AS d ON d.listing_id=m.id
                        LEFT JOIN deals_cache2 AS c ON c.listing_id=m.id
                        WHERE m.id IN ('".implode("','",$ids)."')");
    while($r = mysql_fetch_assoc($q)){
        $id = $r['id'];
        $r = formatListing($r);
        $items[$id] = $r;        
    }

    foreach($items as $id=>$r){
        if($showAll){             
            $validation = [];
            $validation['id'] = $id;
            $validation['pass'] = true;
            $validation['err'] = false; 
            $data[] = $validation;  
            $stats->valid++;  
        }
        else{                   
            //$start = time();
            //ob_start();
            //$deal = $dl->getDeal($id);        
            //$deal = $dl->getDeal($id,false);        
            //$deal = $dl->getDeal2($id,false);        
            $deal = $dl->formatDeal2((array)$r,false);        
            //ob_clean();                        
            //$bm = (time()-$start);
            //if($bm>5){ err("{$id} Time: ".$bm); exit;}
            //t($deal);                        
            if(!$deal){
                //t("$id :failed",1);
                continue;
            }            
            
            $res = [];            
            validateListingRule($deal,$rules,$res);              
                    
            $deal->validation = ['res'=>$res];
            $deal->validation['id'] = $id;
            $deal->validation['pass'] = true;
            $deal->validation['err'] = false;               
            foreach($res as $r){            
                if($r->err)$deal->validation['err'] = true;
                else if(!$r->valid)$deal->validation['pass'] = false;
            }                                    

            if($deal->validation['err']){
                $stats->err++;
                if($deal->validation['pass']) $stats->err_valid++;
            }
            else{
                if($deal->validation['pass']) $stats->valid++;
                else $stats->invalid++;
            }

            $data[] = $deal->validation;
        }
    }
    json(['deals'=>$data, 'stats'=>$stats]);
}
function getFilterData(){
    $id = $_REQUEST['id'];
    $res = Filters::getFilterData($id);
    if(!$res)err("Filter data not found!");
    
     //Get Relative Values        
     $filters = Filters::buildFilterConfig();    
     $relativeGroups = [];
     foreach($filters as $f){   
         $relativeGroups[$f['optgroup']][] = $f;
     }  
     $res->relativeGroups = $relativeGroups;

    json($res);
}

function falttenObject($obj,$parent=''){
    $items = [];
    foreach($obj as $k=>$v){
		$subk = implode('-',array_filter([$parent,$k]));
        if(is_object($v)) $items = array_merge($items,falttenObject($v,$subk));
        else{
            if(is_array($v)){
				$type = 'array';
				if($v[0])$items = array_merge($items,falttenObject($v[0],$subk));
			}
            else $type = 'str';

            $items[] = ['key'=>$subk, 'type'=>$type];
        }
    }
    return $items;
}
function testSubmarkets(){
    $lng = $_REQUEST['lng'];
    $lat = $_REQUEST['lat'];

    if(!$lng || !$lat)err("Missing coordinates!");


    $lat1 = $_REQUEST['box']['lat1'];
    $lng1 = $_REQUEST['box']['lng1'];
    $lat2 = $_REQUEST['box']['lat2'];
    $lng2 = $_REQUEST['box']['lng2'];
    $distance = box2Distance($lat1,$lng1,$lat2,$lng2);
    if(!$distance)$distance = 0.5;    
    //t($distance);

    $type = 'market';
    $limit = '';
    $wheresql = ["1=1"]; 
    $wheresql[] = "type='retail'";
    //$wheresql[] = "m.remote_id=43900";

    $sql = '
        SELECT SQL_CALC_FOUND_ROWS m.*,(((acos(sin(('.$lat.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$lat.'*pi()/180)) * 
    cos((m.lat*pi()/180)) * 
    cos((('.$lng.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance FROM cs_markets AS m                
        WHERE (((acos(sin(('.$lat.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$lat.'*pi()/180)) * 
    cos((m.lat*pi()/180)) * 
    cos((('.$lng.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$distance.' 
    AND '.implode(" AND ",$wheresql).' ORDER BY distance ASC '.$limit;


    //$sql = 'SELECT * FROM cs_markets AS m WHERE m.id=43900';

    //t($sql);    
    $q = mysql_query($sql);
    list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
    //t($total);

    $items = array();
    while($r = mysql_fetch_assoc($q)){
        $geo = mysql_fetch_assoc(mysql_query("SELECT * FROM cs_markets_layers WHERE market_remote_id='{$r['remote_id']}'"));
        $r['geo'] = json_decode($geo['data']);
        $items[$r['id']] = (object)$r;
    }

    json(['items'=>$items]);
}
function calcLocationsStats(){    
    json();
    exit;


    
    set_time_limit(600);
    global $dl;

    $rules = $_REQUEST['rules']; 
    $showAll = ($rules == 'ShowAll')?true:false;  
    
    $extractKeys = [
                        (object)['key'=>'standerized.price','type'=>'number'],
                        (object)['key'=>'standerized.sqft','type'=>'number'],
                        (object)['key'=>'standerized.acres','type'=>'number'],
                        (object)['key'=>'standerized.buildings_sqft','type'=>'number'],
                        (object)['key'=>'standerized.price_per_sqft','type'=>'number'],
                        (object)['key'=>'standerized.price_per_acres','type'=>'number'],
                        (object)['key'=>'standerized.building_price_per_sqft_rounded','type'=>'number'],
                        (object)['key'=>'standerized.category','type'=>'string'],
                        (object)['key'=>'standerized.noi','type'=>'number']                       
                    ];

    $filter = $_REQUEST['filter'];            
    $filter['date'] = dbDate('2021-01-01').' - '.dbDate('tomorrow');
    unset($filter['remote_id']);
    
    //$start = time();

    $max = 20000;
    $perpage = 10000;
    $page = 0;    
    $data = [];
    do{
        $found = false;
        $offset = $page*$perpage;            
        $sql = loadLocationSql($filter,$perpage,$offset,'m.id DESC');   
                
        $params = (object)[
            'sql'   => base64_encode($sql),
            'rules' => $rules,
            'keys'  => $extractKeys
        ];

        t("Launching...",1);    
        $cmd = "php /home/wvgu/public_html/php/util/statsThread.util.php '".json_encode($params)."'";
        t($cmd);
        exec($cmd,$res);    
        t($res);
    
    t('done');



        $items = standerizeListing($items);                
                
        foreach($items as $item){
            $found = true;
            $id = $item->id;     
            
            $deal = (object)['standerized'=>$item];            
            //$deal = $dl->getDeal($id);
            
            t($rules);
            $res = [];
            //if($showAll) //do what?            
            validateRule($deal,$rules,$res);              
            foreach($res as $r){            
                if($r->err || !$r->valid)continue;       
            }                                                
            foreach($extractKeys as $k){
                $val = getKeyValue($deal,$k->key);
                if($k->type == 'number') $val = (float)preg_replace("/[^0-9\-\.]/","",$val);
                if(!$val || (float)$val == 0)$val = null;
                
                //t($k->key.': '.$val,1);

                if(!$data[$k->key]) $data[$k->key] = (object)['list'=>[], 'missing'=>0, 'errors'=>0];

                $err = false;
                if(is_array($val)){ $err = 'Array found'; t($err);  }
                else if(is_object($val)){ $err = 'Object found';  t($err); }
                else if(is_null($val)){ $err = 'Property Missing'; $data[$k->key]->missing++; continue; }
                if($err){ $data[$k->key]->errors++; continue; }

                if($val)$data[$k->key]->list[] = $val;
            }
        } 
       
        $page++;                    
        if($offset>=$max)$found = false;
    }while($found);

    t($data);
    
    //if((time()-$start)>5)t('BM: '.(time()-$start).' - '.$item->id,1);

    //$ids = explode(',',$_REQUEST['listingIds']);
    //
    //

    t('done');
    
}
function clusterByDistance($points, $maxDistance) {    
    $clusters = array();
    $history = array();
  
    foreach($points as $p1){          
        $cluster = array();
        $cluster[] = $p1->id;

        $group = array_filter($points,function($a) use($p1){ return $a->city == $p1->city; });        

        foreach($group as $p2){                        
            if($p2->id == $p1->id)continue;
            $k = $p1->id+$p2->id;            
            $distance = isset($history[$k])?$history[$k]:haversineDistance($p1->lat, $p1->lng, $p2->lat, $p2->lng);                                  
                                    
            if ($distance <= $maxDistance) {
                //if($p1->id == '2928769' && $p2->id == '2929987')t($distance);
                $cluster[] = $p2->id;              
            }  
            
            $history[$k] = $distance;
            //$history[$p2->id.'_-_'.$p1->id] = $distance;
        }  
        //if($p1->id == '2928769')t($cluster,1);
        if(count($cluster)>1)$clusters[$p1->id] = $cluster;
    }
    return $clusters;
}
function sortListingsArray($items, $col, $dir){
    $sortable = [];
    foreach($items as $id=>$item){
        $val = getNestedVal($item, $col);
        if(is_string($val))$val = (float)preg_replace('/[^0-9.\-]/','',$val);
        if($col == 'created_on')$val = strtotime($val);
        $sortable[$id] = $val;
    }
    if($dir == 'asc')asort($sortable);
    else arsort($sortable);
    $sorted = [];
    foreach($sortable as $id=>$v)$sorted[$id] = $items[$id];
    return $sorted;
}
function getNestedVal($obj, $path){
    $keys = explode('.', $path);
    $val = $obj;
    foreach($keys as $k){
        if(is_object($val) && isset($val->$k))$val = $val->$k;
        else if(is_array($val) && isset($val[$k]))$val = $val[$k];
        else return 0;
    }
    return $val;
}
function getLocations(){
    global $dl;

    $bm = [];

    $filter = $_REQUEST['filter'];
    $chunkSize = 500;
    $resultLimit = 500;
    $filter['box'] = $_REQUEST['box'];
    $filter['center'] = $_REQUEST['center'];

    $orderby = pick($_REQUEST['orderby'],'created_on');
    $orderdir = ($_REQUEST['orderdir'] == 'asc')?'asc':'desc';

    $start = time();

    if($orderby == 'created_on'){
        $dbOrder = "m.timestamp ".($orderdir == 'asc' ? 'ASC' : 'DESC');
        $locations = loadLocations($filter,$resultLimit,0,$dbOrder);

        $items = [];
        foreach($locations as $l)$items[$l->id] = $l;

        $formatted = [];
        foreach(standerizeListing($items) as $item)$formatted[$item->id] = $item;

        $totalInRange = getLocationCount($filter);
    }
    else{
        $result = chunkedSort($filter,$orderby,$orderdir,$chunkSize,$resultLimit);
        $items = $result['items'];
        $formatted = $result['formatted'];
        $totalInRange = $result['total'];
    }
    $bm['query'] = (time()-$start);

    $clusters = [];
    if(count($items)<5000){
        $start = time();
        $clusters = clusterByDistance($formatted, 0.1);         
        $bm['clustering'] = (time()-$start);            
    }       
        
    $start = time();
    foreach($formatted as $k=>$item){                                                     //get Advanced Fields                
        //$start = time();
        
        //$deal = $dl->getDeal($item->id);             
        $deal = $dl->formatDeal2((array)$items[$item->id]);
        //if((time()-$start)>5)t('BM: '.(time()-$start).' - '.$item->id,1);
        $formatted[$k]->advanced = $deal->advanced;                        

        //$group = array_filter($formatted,function($a) use($item){ return $a->city == $item->city; });  
        //$formatted[$k]->dups = $dl->checkDuplicates($item,$group);   
        //if($item->id == '2929987')t($formatted[$k]->dups); 

        if($clusters){
            $cs = $clusters[$item->id];                
            if($cs){
                $cItems = [];            
                foreach($cs as $cid) $cItems[$cid] = $formatted[$cid];                        

                $formatted[$k]->dups = $dl->checkDuplicates($item,$cItems);            

                //if($item->id == '2929987'){                 
                //    t($formatted[$k]->dups);
                //}
            }
        }        
                                
        //$formatted[$k]->dups = $dl->checkDuplicates($item,$formatted);
    } 
    $bm['formatting'] = (time()-$start);           
   
    //t(time()-$start);    
    $filterOutIds = [];        
    foreach($formatted as $f){        
        //if(strtolower($f->type) == 'lease')$filterOutIds[] = $f->id;                    //Remove Leases        
        //if($filter['q'] && !preg_match("/{$filter['q']}/i",$f->title) && !preg_match("/{$filter['q']}/i",$f->description) )$filterOutIds[] = $f->id;                    //Remove Leases                
        if($f->country && $f->country != 'USA')$filterOutIds[] = $f->id;                    //Remove non usa 
    }         

    $filteredItems = [];
    $filteredFormatted = [];
    //foreach($items as $item)if(!in_array($item->id,$filterOutIds)){ $item->cache = ''; $filteredItems[] = $item; }
    foreach($formatted as $item)if(!in_array($item->id,$filterOutIds))$filteredFormatted[] = $item;   
    
    /*
    list($lastSearch) = mysql_fetch_array(mysql_query("SELECT latest_search FROM users WHERE id='{$_SESSION['user']->id}'"));
    foreach($filteredItems as $k=>$item){
        $filteredItems[$k]->data = '';
        if($lastSearch && strtotime($item->timestamp)>strtotime($lastSearch)){
            $filteredItems[$k]->new = 1;
        }
    }
    mysql_query("UPDATE users SET latest_search=NOW() WHERE id='{$_SESSION['user']->id}'");    
    */

    //json(['items'=>$filteredItems, 'formatted'=>$filteredFormatted]);
    //json(['items'=>[], 'formatted'=>$filteredFormatted,'bm'=>$bm]);
    json(['items'=>$filteredItems, 'formatted'=>$filteredFormatted,'bm'=>$bm,'totalInRange'=>$totalInRange]);
    //json(['formatted'=>$filteredFormatted]);
}
function getDealStatus(){
    $items = [];

    $q = mysql_query("SELECT DISTINCT status FROM deals_data");
    while(list($r) = mysql_fetch_array($q))if($r)$items[] = $r;
    return $items;
}
function loadLocationSql($filter,$limit=0,$offset=0,$orderby=''){ 
    if($filter['date']){
        $range = explode(' - ',$filter['date']);
        $date1 = dbDate($range[0]);
        $date2 = dbDate($range[1]);
    }
    else{
        $date1 = dbDate('-15 days');
        $date2 = dbDate('today');
    }    
    
    $wheresql = [];
    $wheresql[] = "m.timestamp BETWEEN '{$date1} 00:00:00' AND '{$date2} 23:59:59'";    
    $wheresql[] = "m.last_deal_cache IS NOT NULL";    
    if($filter['type']){
        switch($filter['type']){
            case 'lease':
            case 'sale':
                $wheresql[] = "m.type='{$filter['type']}'";
                break;
            case 'expired_sale':
                $wheresql[] = "m.type='sale'";
                $wheresql[] = "m.expired=1";
                #$wheresql[] = "m.last_seen<'".dbDate('-2 days')."'";
                break;
            case 'expired_lease':
                $wheresql[] = "m.type='lease'";
                $wheresql[] = "m.expired=1";
                #$wheresql[] = "m.last_seen<'".dbDate('-2 days')."'";
                break;
        }        
    }
    if($filter['source'])$wheresql[] = "m.source IN ('".implode("','",$filter['source'])."')";    
    if($filter['status'])$wheresql[] = "d.status IN ('".implode("','",$filter['status'])."')";    
    if($filter['remote_id']){
        $ids = explode(",",$filter['remote_id']);
        mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE remote_id IN ('".implode("','",$ids)."')");
        $wheresql = ["m.remote_id IN ('".implode("','",$ids)."')"];        
    }

    if($filter['box'] && $filter['center']){
        $longitude = $filter['center']['lng'];
        $latitude = $filter['center']['lat'];
        
        $lat1 = $filter['box']['lat1'];
        $lng1 = $filter['box']['lng1'];
        $lat2 = $filter['box']['lat2'];
        $lng2 = $filter['box']['lng2'];
        $distance = box2Distance($lat1,$lng1,$lat2,$lng2);
        if(!$distance)$distance = 0.5;          
        $wheresql[] = '(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * cos((m.lat*pi()/180)) * cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) <= '.$distance; 
    }
    else{
        $longitude = 0;
        $latitude = 0;
    }        
        
    if($limit>0)$limit = "LIMIT {$offset}, {$limit}";   
    else $limit = ''; 

    $sql = '
        SELECT SQL_CALC_FOUND_ROWS 
            m.*, 
            c.data AS cache, 
            d.listing_id AS deals_data_listing_id, d.default_versions AS deals_data_default_versions, d.data AS deals_data_data, 
            (((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * cos((m.lat*pi()/180)) * cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance
            FROM listings AS m                
        LEFT JOIN deals_data AS d ON d.listing_id=m.id
        LEFT JOIN deals_cache2 AS c ON c.listing_id=m.id
        WHERE '.implode(" AND ",$wheresql);
    if($orderby)$sql .= " ORDER BY {$orderby}";
    $sql .= ' '.$limit;

    //t($sql);

    return $sql;
}
function loadLocations($filter,$limit=0,$offset=0,$orderby=''){
    $sql = loadLocationSql($filter,$limit,$offset,$orderby);
    //t($sql);
    $q = mysql_query($sql);
    list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
    //t($total);

    $items = array();
    while($r = mysql_fetch_assoc($q)){
        $res = formatListing($r);
        $items[$r['id']] = $res;
    }
    return $items;
}
function getLocationCount($filter){
    if($filter['date']){
        $range = explode(' - ',$filter['date']);
        $date1 = dbDate($range[0]);
        $date2 = dbDate($range[1]);
    }
    else{
        $date1 = dbDate('-15 days');
        $date2 = dbDate('today');
    }

    $wheresql = [];
    $wheresql[] = "m.timestamp BETWEEN '{$date1} 00:00:00' AND '{$date2} 23:59:59'";
    $wheresql[] = "m.last_deal_cache IS NOT NULL";
    if($filter['type']){
        switch($filter['type']){
            case 'sale':
            case 'lease':
                $wheresql[] = "m.type='{$filter['type']}'";
                break;
            case 'expired_sale':
                $wheresql[] = "m.type='sale'";
                $wheresql[] = "m.expired=1";
                break;
            case 'expired_lease':
                $wheresql[] = "m.type='lease'";
                $wheresql[] = "m.expired=1";
                break;
        }
    }
    if($filter['source'])$wheresql[] = "m.source IN ('".implode("','",$filter['source'])."')";

    $sql = "SELECT COUNT(*) FROM listings AS m WHERE ".implode(" AND ",$wheresql);
    $q = mysql_query($sql);
    if($q){
        list($count) = mysql_fetch_array($q);
        return (int)$count;
    }
    return 0;
}
function chunkedSort($filter,$orderby,$orderdir,$chunkSize,$resultLimit){
    $sortedBuffer = [];
    $totalCount = 0;
    $offset = 0;
    $allItems = [];

    while(true){
        $chunk = loadLocations($filter,$chunkSize,$offset,'');
        if(empty($chunk))break;

        $totalCount += count($chunk);

        $standardized = standerizeListing($chunk);

        foreach($standardized as $item){
            $sortedBuffer[$item->id] = $item;
            $allItems[$item->id] = $chunk[$item->id];
        }

        $sortedBuffer = sortListingsArray($sortedBuffer,$orderby,$orderdir);
        if(count($sortedBuffer) > $resultLimit){
            $keep = array_slice($sortedBuffer,0,$resultLimit,true);
            foreach($sortedBuffer as $id=>$item)if(!isset($keep[$id]))unset($allItems[$id]);
            $sortedBuffer = $keep;
        }

        $offset += $chunkSize;
        if($offset > 50000)break;
    }

    $sortedBuffer = sortListingsArray($sortedBuffer,$orderby,$orderdir);

    $finalItems = [];
    foreach($sortedBuffer as $id=>$s)if(isset($allItems[$id]))$finalItems[$id] = $allItems[$id];

    return ['items'=>$finalItems,'formatted'=>$sortedBuffer,'total'=>$totalCount];
}


function formatListing($r){		
    global $s3;
    

	$r['title'] = preg_replace('/[[:^print:]]/', '', $r['title']);
	//$r['timestamp'] = date('m/d/y - h:iA',strtotime($r['timestamp']));
    $r['timestamp_ago'] = xTimeAgo($r['timestamp'],'now');
	$r['status'] = ucfirst($r['status']);	
	$r['images'] = json_decode($r['images']);	
	$r['images_count'] = ($r['images'])?count($r['images']):0;
	$r['data'] = json_decode($r['data']);

    //$r['deal_data'] = mysql_fetch_assoc(mysql_query("SELECT * FROM deals_data WHERE listing_id='{$r['id']}'"));            
    //if($r['deal_data'])$r['deal_data'] = (object)$r['deal_data'];
    $r['deal_data'] = [];
    foreach($r as $k=>$v){
        if(strpos($k,'deals_data_') !== false){            
            $k = str_replace('deals_data_','',$k);                
            $r['deal_data'][$k] = $v;
        }
    }
    $r['deal_data'] = (object)$r['deal_data'];    

    //$r['flags'] = mysql_fetch_assoc(mysql_query("SELECT * FROM listings_flags WHERE listing_id='{$r['id']}'"));
    //if($r['flags'])$r['flags'] = (object)$r['flags'];

	//list($r['updates_count']) = mysql_fetch_array(mysql_query("SELECT count(id) FROM listings_updates WHERE listing_id='{$r['remote_id']}'"));
	
	//$sc = new Score();
	//$r['score'] = $sc->getScore($r['lat'],$r['lng'],true);
	
	$r['last_seen_ago'] = (xDaysAgo($r['last_seen'],'now') === 0)?'Today':number_format((float)xDaysAgo($r['last_seen'],'now'),2).' days ago';			
	
	return (object)$r;
}
function updateStatus(){
    $status = $_REQUEST['status'];
    $id = $_REQUEST['id'];
    if(!$id)err("Unexpected Error");

	mysql_query("INSERT INTO deals_data SET status='{$status}',listing_id='{$id}' ON DUPLICATE KEY UPDATE status='{$status}'");	
	$error = mysql_error();
	if($error)err($error);

    if(!$status)$status='No Status';
	json(['status'=>$status]);    
}

function validateListingImport($data){
    $res = Deal::getAddressCoordinates("{$data['address']}, {$data['city']}, {$data['state']}, {$data['zip']}");    
    if(!$res)return (object)['error'=>"Unable to geocode address"];

    list($oldId,$oldSource) = mysql_fetch_array(mysql_query("SELECT remote_id,source FROM listings WHERE lat='{$res->lat}' AND lng='{$res->lng}'"));
    if($old)return (object)['error'=>"Duplicate listing. {$oldSource} already has a listing at that location. Listing ID: {$oldId}"];

    return (object)['success'=>true, 'coordinates'=>$res];
}
function addListing(){
    $data = [];
    foreach($_POST as $k=>$v){
        if(in_array($k,['action']))continue;
        
        if(!trim($v))err("All fields are required!");
        $data[$k] = $v;
    }
    
    $res = validateListingImport($_REQUEST);    
    if(!$res->success){
        if($res->error)err($res->error);    
        else err("Unexpected Error");
    }    

    $id = uniqid();
    $item = [
        'title'         => $_REQUEST['title'],
        'type'          => $_REQUEST['type'],
        'source'        => 'import',
        'status'        => 'ready',
        'remote_id'     => $id,
        'public_id'     => $id,
        'lng'           => $res->coordinates->lng,
        'lat'           => $res->coordinates->lat,
        'data'          => json_encode($data)
    ];

    $updatesql = [];
    foreach($item as $k=>$v) $updatesql[] = "`$k` = '".mysql_real_escape_string($v)."'";
    $updatesql[] = "last_deal_cache=NOW()";
    sql("INSERT INTO listings SET ".implode(",",$updatesql));
}
function importListings(){    
	$csv_mimetypes = array(
			'text/csv',
			'text/plain',
			'application/csv',
			'text/comma-separated-values',
			'application/excel',
			'application/vnd.ms-excel',
			'application/vnd.msexcel',
			'text/anytext',
			'application/octet-stream',
			'application/txt',
	);

	$error = '';
	if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) $error = "Upload failed with error code " . $_FILES['file']['error'];
	else if ($info === FALSE) $error = "Unable to type of uploaded file";
	else if (!in_array($_FILES['file']['type'], $csv_mimetypes)) $error = "Invalid file uploaded";
	else if ($_FILES['file']['error'] != 0) $error = "Unkown Error";

	if($error){
		if(file_exists($_FILES["file"]["tmp_name"]))unlink($_FILES["file"]["tmp_name"]);
		err($error);
	}
	
	$headers = $items = array();
	if (($handle = fopen($_FILES["file"]["tmp_name"], "r")) !== FALSE) {
		while (($row = fgetcsv($handle, 100000, ",")) !== FALSE) {
			if(!$headers){
				foreach($row as $k){ $headers[] = $k; }
				continue; 
			}
			
			$item = array();
			foreach($headers as $i=>$h){
				 $item[$h] = trim($row[$i]);
			}
			$items[] = $item;
		}
	}
	fclose($handle);
	unlink($_FILES["file"]["tmp_name"]);	
		
	$stats = array('ok'=>0, 'errors'=>0);
	foreach($items as $item){  
        $map = [
            'Title' => 'title',
            'Address' => 'address',
            'City' => 'city',
            'State' => 'state',
            'Zip' => 'zip',
            'Type' => 'category',
            'Subtype' => 'subtype',
            'Price' => 'price',
            'Land Sqft' => 'sqft',
            'Building Sqft' => 'buildings_sqft',
            'Sale/Lease' => 'type',
            //'Lease Expires In (year)' => 'lease_exp',
            'NOI' => 'noi',
            'Cap Rate' => 'cap_rate',            

        ];
        $data = [];
        $missingData = false;
        foreach($map as $m1=>$m2){            
            if(!$item[$m1])$missingData = true;
            $data[$m2] = $item[$m1];
        }              
        if($missingData){
            $stats['errors']++;
            continue;
        }
        
        
        $id = uniqid();
        $res = validateListingImport($data);    
        if(!$res->success){
            err($res);
            //if($res->error)err($res->error);    
            //else err("Unexpected Error");
            $stats['errors']++;
            continue;
        }  
        $data['type'] = (strpos(strtolower($data['type']),'lease'))?'lease':'sale';          

        $id = uniqid();
        $item = [
            'title'         => $data['title'],
            'type'          => $data['type'],
            'source'        => 'import',
            'status'        => 'ready',
            'remote_id'     => $id,
            'public_id'     => $id,
            'lng'           => $res->coordinates->lng,
            'lat'           => $res->coordinates->lat,
            'data'          => json_encode($data)
        ];

        $updatesql = [];
        foreach($item as $k=>$v) $updatesql[] = "`$k` = '".mysql_real_escape_string($v)."'";
        $updatesql[] = "last_deal_cache=NOW()";
        mysql_query("INSERT INTO listings SET ".implode(",",$updatesql));
        $stats['ok']++;    
	}
	json(array('stats'=>$stats));
}