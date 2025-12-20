<?php
session_write_close();

//t("This page is deperecated and no longer supported! <a href='/site/listings2'>Click Here</a> to get redirected to the new listings page");

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
function getFilters(){
    $items = [];

    $q = mysql_query("SELECT * FROM filters ORDER BY title ASC");
    while($r = mysql_fetch_assoc($q)){
        //$r['data'] = json_decode($r['data']);
        $items[] = (object)$r;
    }
    json(['items'=>$items]);
}
function filterSave(){
    $rules = $_REQUEST['rules'];
    $title = $_REQUEST['title'];

    if(!$title) err("Title is required");
    if(!$rules) err("No filters detected");
    
    $data = json_encode($rules);
    sql("INSERT INTO filters SET title='{$title}', data='{$data}'");
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
function generateExport(){
    global $dl;
    $ids = explode(",",$_REQUEST['ids']);
    $fields = explode(",",$_REQUEST['fields']);
    
    if(!$ids)err("No listings found!");
        
    $filename = "sdev_export_" . date('Y-m-d h:i:s') . '_'. uniqid() .".csv";   
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
        'Price Per Building Sqft'=> 'standerized.building_price_per_sqft',
        'FAR'=> 'standerized.far',
        'Sale/Lease'=> 'standerized.type',
        'Lease Expires In (year)'=> 'standerized.lease_exp',
        'NOI'=> 'standerized.noi',
        'Cap Rate'=> 'standerized.cap_rate',
        'NOI/Cap Rate'=> 'standerized.building_rent_rate',
        'Implied Market NOI' => 'advanced.market_noi',
        'Implied Market Rate' => 'advanced.market_cap_rate',
        'Implied Market Rate/Implied Market NOI' => 'advanced.market_rent_rate',
        'Implied Submarket NOI' => 'advanced.submarket_noi',
        'Implied Submarket Rate' => 'advanced.submarket_cap_rate',
        'Implied Submarket Rate/Implied Submarket NOI' => 'advanced.submarket_rent_rate',
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

    foreach($ids as $id){
        $deal = $dl->getDeal($id);        
        $data = [];
        foreach($exportData as $title=>$key){
            $val = getKeyValue($deal,$key);
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
    
    $stats = (object)['total'=>count($ids), 'valid'=>0, 'invalid'=>0, 'err'=>0, 'err_valid'=>0];
    $data = [];
    foreach($ids as $id){
        //$start = time();
        ob_start();
        $deal = $dl->getDeal($id);        
        ob_clean();                        
        //$bm = (time()-$start);
        //if($bm>5){ err("{$id} Time: ".$bm); exit;}

        //t($deal);


        if(!$deal)continue;

        $res = [];
        validateRule($deal,$rules,$res);        
        $deal->validation = ['res'=>$res];

        $deal->validation['pass'] = true;
        $deal->validation['err'] = false;

        $maxLevel = 0;
        foreach($res as $r)if($r->level>$maxLevel)$maxLevel = $r->level;
        for($i=$maxLevel;$i>0;$i--){           
            $groups = [];
            foreach($res as $r){
                if($r->level != $i)continue;
                $group = $r->group;
                if(!$groups[$group]) $groups[$group] = (object)['condition'=>$r->condition, 'parent'=>$r->parent, 'valid'=>0, 'err'=>0, 'invalid'=>0];

                if($r->err)$groups[$group]->err++;
                else if($r->valid)$groups[$group]->valid++;                
                else $groups[$group]->invalid++;                                                
            }
            //t($groups);
                        
            foreach($groups as $gk=>$g){                
                $valid = false;
                $err = false;
                $parent = false;

                foreach($res as $r){if($r->group == $g->parent){$parent = $r;break;}}    
                if(!$parent && $g->parent){ t("Unexpected Error (1)"); }

                if($g->err>0){ $err = true; }

                if($g->condition == 'OR'){ 
                    if($g->valid>0){ $valid = true; }                    
                }
                if($g->condition == 'AND'){                                                        
                    if($g->valid>0 && $g->invalid<=0){ $valid = true; }
                } 

                /*
                if($g->condition == 'OR'){ 
                    if($g->valid>0){ $err = false; $valid = true; }
                    else if($g->err>0){ $err = true; $valid = false; }
                    else { $err = false; $valid = false; }
                }
                if($g->condition == 'AND'){                
                    if($g->err>0){ $err = true; $valid = false; }
                    else if($g->invalid>0){ $err = false; $valid = false; }
                    else if($g->valid>0){ $err = false; $valid = true; }
                } 
                */

                foreach($res as $k=>$r){
                    if($r->group != $gk)continue;                    
                    $res[$k] = (object)['valid'=> $valid, 'err'=> $err, 'level'=>$parent->level, 'group'=>$parent->group, 'condition'=>$parent->condition, 'parent'=>$parent->parent];                    
                }                                            
            }                        
        }        
        $decision = reset($res);
        $deal->validation['err'] = $decision->err;
        $deal->validation['pass'] = $decision->valid;
        $deal->validation['id'] = $id;

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
    json(['deals'=>$data, 'stats'=>$stats]);
}
function validateRule($deal,$rule,&$results,$level=0,$group=0,$parent=0,$condition=''){
    if($rule['condition']){            
        return validateRule($deal,$rule['rules'],$results,$level+1,uniqid(),$group,$rule['condition']);        
    }
    else{                
        foreach($rule as $r){  
            if($r['condition']){                    
                validateRule($deal,$r['rules'],$results,$level+1,uniqid(),$group,$r['condition']);        
                continue;
            }

            $key = $r['field'];
            $op = $r['operator'];
            $value = $r['value'];  
            
                        
            //t($key.': '.$value,1);
            $val = getKeyValue($deal,$key);            
            //if($deal->listing->id =='1465867')t($deal->listing->id.': '.$val,1);
            if(!$val)$val = null;

            $err = false;
            if(is_array($val)){ $err = 'Array found'; t($err);  }
            else if(is_object($val)){ $err = 'Object found';  t($err); }
            else if(is_null($val)) $err = 'Property Missing';    
            
            if($err){
                $res = false;
            }
            else{        
                if(in_array($r['type'],['float','double','integer'])) $val = (float)preg_replace("/[^0-9\.-]/","",$val);
                switch($op){
                    case 'equal': $res = $val == $value; break;
                    case 'not_equal': $res = $val != $value; break;
                    case 'in': $res = preg_match("/".$value."/i",$val); break;
                    case 'not_in': $res = !(preg_match("/".$value."/i",$val)); break;
                    case 'less': $res = $val < $value; break;
                    case 'less_or_equal': $res = $val <= $value; break;
                    case 'greater': $res = $val > $value; break;
                    case 'greater_or_equal': $res = $val >= $value; break;
                    case 'between': $res = ($val >= $value[0] && $val <= $value[1]); break;
                    case 'not_between': $res = ($val < $value[0] && $val > $value[1]); break;
                    case 'begins_with': $res = preg_match("/^".$value."/i",$val); break;
                    case 'contains': $res = preg_match("/".$value."/i",$val); break;
                    case 'not_contains': $res = !(preg_match("/".$value."/i",$val)); break;
                    case 'ends_with': $res = preg_match("/".$value."$/i",$val); break;
                    case 'not_ends_with': $res = !(preg_match("/".$value."$/i",$val)); break;
                    case 'is_empty': $res = ($val>0)?false:true; break;
                    case 'is_not_empty': $res = ($val>0)?true:false; break;
                    case 'is_null': $res = is_null($val); break;
                    case 'is_not_null': $res = !is_null($val); break;
                }                
            }
            $results[$key.'-uid-'.uniqid()] = (object)['valid'=> $res, 'err'=> $err, 'level'=>$level, 'group'=>$group, 'condition'=>$condition, 'parent'=>$parent, 'value'=>$val];                        
        }
    }
}
function buildFilterConfig(){    
    $listing = [  
        'source' => ['type'=>'str'],
        'title' => ['type'=>'str'],
        'url' => ['type'=>'str'],
        'id' => ['type'=>'str'],
        'price_per_sqft' => ['type'=>'float','label'=>'Land Price/Sqft'],
        'price_per_acres' => ['type'=>'float','label'=>'Land Price/Acre'],        
        'far' => ['type'=>'float','label'=>'FAR'],
        'price' => ['type'=>'float'],
        'type'  => ['type'=>'str', 'label'=>'Sale or Lease?'],
        'category' => ['type'=>'str', 'label'=>'Type'],
        'subtype' => ['type'=>'str', 'label'=>'Subtype'],
        //'APN'   => ['type'=>'str'],
        //'FIP'   => ['type'=>'str'],
        'noi'   => ['type'=>'float', 'label'=>'NOI'],
        'cap_rate'   => ['type'=>'float', 'label'=>'CAP Rate'],
        'agents_count' => ['type'=>'count' ,'key' => 'agents_-_count'],        
        'agent_name'	=> ['type'=>'str', 'key' => 'agents.name'],
        'agent_phone' => ['type'=>'str', 'key' => 'agents.phone'],
        'agent_email' => ['type'=>'str', 'key' => 'agents.email'],
        'agent_company' => ['type'=>'str', 'key' => 'agents.company'],
        'agent_license' => ['type'=>'str', 'key' => 'agents.license'],         
        'description' => ['type'=>'str'],
		'address' => ['type'=>'str'],
		'city' => ['type'=>'str'],
		'state' => ['type'=>'str'],
		'zip' => ['type'=>'str'],
	    'sqft' => ['type'=>'float','label'=>'Land Sqft'],
		'acres' => ['type'=>'float','label'=>'Land Acres'],
		'buildings_sqft' => ['type'=>'float','label'=>'Building Sqft'],
        'building_price_per_sqft' => ['type'=>'float','label'=>'Price Per Building Sqft'],
        'lease_exp' => ['type'=>'float','label'=>'Remaining Lease Period (years)'],
		
		//'building_title' => ['type'=>'str', 'key'=>'parent.title'],
		//'building_type' => ['type'=>'str', 'key'=>'parent.type'],
	    //'building_acres' => ['type'=>'float', 'key'=>'parent.acres'],
		//'building_zoning' => ['type'=>'str', 'key'=>'parent.zoning'],				
    ];

    $zillow = [
        'zhvi_price_zip' => ['type'=>'float', 'key'=>'zhvi.data.zip.value' ,'label'=>'ZHVI - By Zip'],
        'zhvi_trend_zip_max' => ['type'=>'float', 'key'=>'zhvi.data.zip.trends.max.p' ,'label'=>'ZHVI Trend - By Zip - Max Years'],
        'zhvi_trend_zip_5' => ['type'=>'float', 'key'=>'zhvi.data.zip.trends.5.p' ,'label'=>'ZHVI Trend - By Zip - 5 Years'],
        'zhvi_trend_zip_10' => ['type'=>'float', 'key'=>'zhvi.data.zip.trends.10.p' ,'label'=>'ZHVI Trend - By Zip - 10 Years'],

        'zhvi_price_city' => ['type'=>'float', 'key'=>'zhvi.data.city.value' ,'label'=>'ZHVI - By City'],
        'zhvi_trend_city_max' => ['type'=>'float', 'key'=>'zhvi.data.city.trends.max.p' ,'label'=>'ZHVI Trend - By City - Max Years'],
        'zhvi_trend_city_5' => ['type'=>'float', 'key'=>'zhvi.data.city.trends.5.p' ,'label'=>'ZHVI Trend - By City - 5 Years'],
        'zhvi_trend_city_10' => ['type'=>'float', 'key'=>'zhvi.data.city.trends.10.p' ,'label'=>'ZHVI Trend - By City - 10 Years'],

        'zori_price_zip' => ['type'=>'float', 'key'=>'zori.data.zip.value' ,'label'=>'ZORI - By Zip'],
        'zori_trend_zip_max' => ['type'=>'float', 'key'=>'zori.data.zip.trends.max.p' ,'label'=>'ZORI Trend - By Zip - Max Years'],
        'zori_trend_zip_5' => ['type'=>'float', 'key'=>'zori.data.zip.trends.5.p' ,'label'=>'ZORI Trend - By Zip - 5 Years'],
        'zori_trend_zip_10' => ['type'=>'float', 'key'=>'zori.data.zip.trends.10.p' ,'label'=>'ZORI Trend - By Zip - 10 Years'],

        'zori_price_city' => ['type'=>'float', 'key'=>'zori.data.city.value' ,'label'=>'ZORI - By City'],
        'zori_trend_city_max' => ['type'=>'float', 'key'=>'zori.data.city.trends.max.p' ,'label'=>'ZORI Trend - By City - Max Years'],
        'zori_trend_city_5' => ['type'=>'float', 'key'=>'zori.data.city.trends.5.p' ,'label'=>'ZORI Trend - By City - 5 Years'],
        'zori_trend_city_10' => ['type'=>'float', 'key'=>'zori.data.city.trends.10.p' ,'label'=>'ZORI Trend - By City - 10 Years'],           
    ];

    $zillow2 = [
        'price_0.5m' => ['type'=>'float' ,'label'=>'Avg Home Price - Within 0.5 miles'],
        'price_1m' => ['type'=>'float' ,'label'=>'Avg Home Price - Within 1 miles'],
        'price_2m' => ['type'=>'float' ,'label'=>'Avg Home Price - Within 2 miles'],
        'price_5m' => ['type'=>'float' ,'label'=>'Avg Home Price - Within 5 miles'],
    ];

    $census = [
        'census_income_zip' => ['type'=>'float', 'key'=>'income.data.zip.value' ,'label'=>'Median Income - By Zip'],
        'census_income_trend_zip_max' => ['type'=>'float', 'key'=>'income.data.zip.trends.max.p' ,'label'=>'Median Income Trend - By Zip - Max Years'],        

        'census_pop_zip' => ['type'=>'float', 'key'=>'population.data.zip.value' ,'label'=>'Population - By Zip'],
        'census_pop_trend_zip_max' => ['type'=>'float', 'key'=>'population.data.zip.trends.max.p' ,'label'=>'Population Trend - By Zip - Max Years'],        

        'census_pop_city' => ['type'=>'float', 'key'=>'population.data.city.value' ,'label'=>'Population - By City'],
        'census_pop_trend_city_max' => ['type'=>'float', 'key'=>'population.data.city.trends.max.p' ,'label'=>'Population Trend - By City - Max Years'],        

        'census_pop_county' => ['type'=>'float', 'key'=>'population.data.county.value' ,'label'=>'Population - By County'],
        'census_pop_trend_county_max' => ['type'=>'float', 'key'=>'population.data.county.trends.max.p' ,'label'=>'Population Trend - By County - Max Years'],        
    ];

    $walkscore = [
        'walkscore_walk' => ['type'=>'float', 'key'=>'walk.walkscore' ,'label'=>'Walkscore Score'],
        'walkscore_transit' => ['type'=>'float', 'key'=>'transit.transit_score' ,'label'=>'Walkscore Transit Score'],
    ];

    $markets = [        
      "Asset Value" => ['type'=>'float'],     
      "Availability Rate" => ['type'=>'float'],
      "Available SF" => ['type'=>'float'],
      "Average Sale Price" => ['type'=>'float'],      
      "Cap Rate" => ['type'=>'float'],      
      "Cap Rate Transactions" =>['type'=>'float'],      
      "Demand SF" =>['type'=>'float'],      
      "Demolished SF" =>['type'=>'float'],      
      "Existing Buildings" =>['type'=>'float'],      
      "Gross Delivered Buildings" =>['type'=>'float'],      
      "Gross Delivered SF" =>['type'=>'float'],      
      "Inventory SF" =>['type'=>'float'],      
      "Leasing Activity SF" =>['type'=>'float'],      
      "Market Cap Rate" =>['type'=>'float'],      
      "Market Rent Growth" =>['type'=>'float'],    
      "Market Rent Growth 12 Mo" =>['type'=>'float'],      
      "Market Rent Index" =>['type'=>'float'],      
      "Market Rent/SF" =>['type'=>'float'],      
      "Market Sale Price Growth" =>['type'=>'float'],      
      "Market Sale Price Per SF" =>['type'=>'float'],      
      "Median Cap Rate" =>['type'=>'float'],      
      "Median Price/Bldg SF" =>['type'=>'float'],      
      "Net Absorption SF" =>['type'=>'float'],      
      "Net Absorption SF 12 Mo" =>['type'=>'float'],      
      "Net Absorption SF Direct" =>['type'=>'float'],      
      "Net Absorption SF Sublet" =>['type'=>'float'],      
      "Net Delivered SF" =>['type'=>'float'],      
      "Net Delivered SF 12 Mo" =>['type'=>'float'],      
      "Occupancy Rate" =>['type'=>'float'],      
      "All Service Type Rent Direct" =>['type'=>'float'],      
      "All Service Type Rent Overall" =>['type'=>'float'],      
      "All Service Type Rent Sublet" =>['type'=>'float'],      
      "Sales Volume Transactions" =>['type'=>'float'],      
      "Sold Building SF" =>['type'=>'float'],      
      "Total Sales Volume" =>['type'=>'float'],      
      "Transaction Sale Price/SF" =>['type'=>'float'],      
      "Under Construction Buildings" =>['type'=>'float'],      
      "Under Construction SF" =>['type'=>'float'],      
      "Vacancy Rate" =>['type'=>'float'],      
      "Vacant Available %" =>['type'=>'float'],      
      "Vacant Available SF" =>['type'=>'float'],      
      "NNN Rent Direct" =>['type'=>'float'],      
      "NNN Rent Overall" =>['type'=>'float'],      
      "Existing Centers" =>['type'=>'float'],      
      "NNN Rent Sublet" =>['type'=>'float'],      
    ];

    $submarkets = [
        "All Service Type Rent Direct" =>['type'=>'float'],      
        "All Service Type Rent Overall" =>['type'=>'float'],      
        "All Service Type Rent Sublet" =>['type'=>'float'],      
        "Asset Value" =>['type'=>'float'],      
        "Availability Rate" =>['type'=>'float'],      
        "Available SF" =>['type'=>'float'],      
        "Average Sale Price" =>['type'=>'float'],      
        "Cap Rate" =>['type'=>'float'],      
        "Cap Rate Transactions" =>['type'=>'float'],      
        "Demand SF" =>['type'=>'float'],      
        "Demolished SF" =>['type'=>'float'],      
        "Existing Buildings" =>['type'=>'float'],      
        "Existing Centers" =>['type'=>'float'],      
        "Gross Delivered Buildings" =>['type'=>'float'],      
        "Gross Delivered SF" =>['type'=>'float'],      
        "Inventory SF" =>['type'=>'float'],      
        "Leasing Activity SF" =>['type'=>'float'],      
        "Market Cap Rate" =>['type'=>'float'],      
        "Market Rent Growth" =>['type'=>'float'],      
        "Market Rent Growth 12 Mo" =>['type'=>'float'],      
        "Market Rent Index" =>['type'=>'float'],      
        "Market Rent/SF" =>['type'=>'float'],      
        "Market Sale Price Growth" =>['type'=>'float'],      
        "Market Sale Price Per SF" =>['type'=>'float'],      
        "Median Cap Rate" =>['type'=>'float'],      
        "Median Price/Bldg SF" =>['type'=>'float'],      
        "NNN Rent Direct" =>['type'=>'float'],      
        "NNN Rent Overall" =>['type'=>'float'],      
        "NNN Rent Sublet" =>['type'=>'float'],      
        "Net Absorption SF" =>['type'=>'float'],      
        "Net Absorption SF 12 Mo" =>['type'=>'float'],      
        "Net Absorption SF Direct" =>['type'=>'float'],      
        "Net Absorption SF Sublet" =>['type'=>'float'],      
        "Net Delivered SF" =>['type'=>'float'],      
        "Net Delivered SF 12 Mo" =>['type'=>'float'],      
        "Occupancy Rate" =>['type'=>'float'],      
        "Sales Volume Transactions" =>['type'=>'float'],      
        "Sold Building SF" =>['type'=>'float'],      
        "Total Sales Volume" =>['type'=>'float'],      
        "Transaction Sale Price/SF" =>['type'=>'float'],      
        "Under Construction Buildings" =>['type'=>'float'],      
        "Under Construction SF" =>['type'=>'float'],      
        "Vacancy Rate" =>['type'=>'float'],      
        "Vacant Available %" =>['type'=>'float'],      
        "Vacant Available SF" =>['type'=>'float'],      
    ];

    $advanced = [
        'market_noi'   => ['type'=>'float', 'label'=>'Market NOI'],
        'market_cap_rate'   => ['type'=>'float', 'label'=>'Market CAP Rate'],
        'submarket_noi'   => ['type'=>'float', 'label'=>'Submarket NOI'],
        'submarket_cap_rate'   => ['type'=>'float', 'label'=>'Submarket CAP Rate'],        
    ];

    $mainFilter = [
        'standerized' => $listing,
        'zillow' => $zillow,
        //'zillow2' => $zillow2,
        'census' => $census,
        'walkscore' => $walkscore,
        'markets.data' => $markets,
        'submarkets.data' => $submarkets,
        'advanced' => $advanced
    ];

    $formattedFilters = [];
    foreach($mainFilter as $group=>$filters){        
        foreach($filters as $k=>$f){
            $key = ($f['key'])?$f['key']:$k;
            $item = [
                "label" => "",
                "id"=> $group.'.'.$key,
                "field"=> $group.'.'.$key,                
                "optgroup"=> $group,                
                "input"=> "text",
                "values"=> null,
                "value_separator"=> null,
                "default_value"=> null,
                "input_event"=> "change",
                "size"=> 0,
                "rows"=> 0,
                "multiple"=> false,
                "placeholder"=> null,
                "vertical"=> false,
                "validation"=> null,
                "operators"=> ["begins_with", "not_begins_with", "contains", "not_contains", "ends_with", "not_ends_with", "is_empty", "is_not_empty", "is_null", "is_not_null"],
                "plugin"=> null,
                "plugin_config"=> null,
                "data"=> null,
                "unique"=> false,
                "description"=> null,
                "color"=> null,
                "colors"=> null
            ];
            foreach($f as $fk=>$fv) if(in_array($fk,array_keys($item))) $item[$fk] = $fv;
            if(!$item['label'])$item['label'] = ucwords(str_replace('_',' ',$k));


            switch($f['type']){
                case 'str':                
                    $item["type"] = "string";
                    $item["input"] = "text";
                    $item["operators"] = ["begins_with", "not_begins_with", "contains", "not_contains", "ends_with", "not_ends_with", "is_empty", "is_not_empty", "is_null", "is_not_null"];                    
                    break;
                case 'float':
                    $item["type"] = "double";
                    $item["input"] = "number";
                    $item["operators"] = ["less","less_or_equal","greater","greater_or_equal","between","not_between","begins_with","not_begins_with"];
                    break;
                case 'count':
                    $item["type"] = "integer";
                    $item["input"] = "number";
                    $item["operators"] = ["less","less_or_equal","greater","greater_or_equal","between","not_between","begins_with","not_begins_with"];
                    break;
                default:
                    $item["type"] = "string";
                    break;
            }
            $formattedFilters[] = $item;
        }
    }
    json($formattedFilters);
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
function getMissingSubmarkets(){
    $items = [];

    $type = 'hospitality';
    //$q = mysql_query("SELECT * FROM `cs_submarkets` AS s LEFT JOIN cs_submarkets_layers AS l ON l.submarket_remote_id=s.remote_id AND l.type='{$type}' WHERE s.type='{$type}' AND l.id IS NULL");
    $q = mysql_query("SELECT * FROM `cs_markets` AS s LEFT JOIN cs_markets_layers AS l ON l.market_remote_id=s.remote_id AND l.type='{$type}' WHERE s.type='{$type}' AND l.id IS NULL");
    while($r = mysql_fetch_assoc($q)){          
        $items[$r['remote_id']] = (object)$r;
    }
    json(['items'=>$items]);
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
    //$wheresql[] = "type='retail'";
    $wheresql[] = "type='industrial'";
    //$wheresql[] = "m.remote_id=43900";

    $sql = '
        SELECT SQL_CALC_FOUND_ROWS m.*,(((acos(sin(('.$lat.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$lat.'*pi()/180)) * 
    cos((m.lat*pi()/180)) * 
    cos((('.$lng.' - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance FROM cs_submarkets AS m                
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
        $geo = mysql_fetch_assoc(mysql_query("SELECT * FROM cs_submarkets_layers WHERE submarket_remote_id='{$r['remote_id']}'"));
        $r['geo'] = json_decode($geo['data']);
        $items[$r['id']] = (object)$r;
    }

    json(['items'=>$items]);
}
function getLocations(){
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
    
    $filter = $_REQUEST['filter'];    
    $limit = 0;
    $offset = 0;    

    //$start = time();
    $items = getMapLocations($lat,$lng,$distance,$filter,$limit,$offset);        
    $formatted = standerizeListing($items);        
        
    foreach($formatted as $k=>$item){                                                           //get Advanced Fields        
        //$deal = $dl->getDeal($item->id);
        $formatted[$k]->advanced = $deal->advanced;
    }    

    //t(time()-$start);
    $filterOutIds = [];
    /*    
    foreach($formatted as $f){        
        if(strtolower($f->type) == 'lease')$filterOutIds[] = $f->id;                    //Remove Leases        
        if($filter['q'] && !preg_match("/{$filter['q']}/i",$f->title) && !preg_match("/{$filter['q']}/i",$f->description) )$filterOutIds[] = $f->id;                    //Remove Leases        
    } 
    */    

    $filteredItems = [];
    $filteredFormatted = [];
    foreach($items as $item)if(!in_array($item->id,$filterOutIds))$filteredItems[] = $item;
    foreach($formatted as $item)if(!in_array($item->id,$filterOutIds))$filteredFormatted[] = $item;        

    json(['items'=>$filteredItems, 'formatted'=>$filteredFormatted ,'distance'=>$distance]);
    //json(['formatted'=>$filteredFormatted]);
}


function getMapLocations($latitude,$longitude, $distance = 0.5, $filter=[], $limit=0, $offset=0){
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
    $wheresql[] = "timestamp BETWEEN '{$date1} 00:00:00' AND '{$date2} 23:59:59'";    
    $wheresql[] = "last_deal_cache IS NOT NULL";    
    if($filter['type']){
        switch($filter['type']){
            case 'lease':
            case 'sale':
                $wheresql[] = "m.type='{$filter['type']}'";
                break;
            case 'expired_sale':
                $wheresql[] = "m.type='sale'";
                $wheresql[] = "m.last_seen<'".dbDate('-2 days')."'";
                break;
            case 'expired_lease':
                $wheresql[] = "m.type='lease'";
                $wheresql[] = "m.last_seen<'".dbDate('-2 days')."'";
                break;
        }        
    }
    if($filter['source'])$wheresql[] = "m.source IN ('".implode($filter['source'])."')";    
    if($filter['remote_id']){
        mysql_query("UPDATE listings SET last_deal_cache=NOW() WHERE remote_id='{$filter['remote_id']}'");
        $wheresql = ["m.remote_id='{$filter['remote_id']}'"];        
    }
        
    if($limit>0)$limit = "LIMIT {$offset}, {$limit}";   
    else $limit = ''; 

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
    //t($total);

    $items = array();
    while($r = mysql_fetch_assoc($q))$items[$r['id']] = formatListing($r);
    return $items;
}
function loadListingFlags(){
    global $dl;

    $id = $_REQUEST['id'];
    $r = mysql_fetch_assoc(mysql_query("SELECT * FROM listings WHERE id='{$id}'"));
    if($r){        
        $r = formatListing($r);        
        json(['item'=>$r]);
    }   
    else{
        err('oops');
    }     
}
function formatListing($r){		
    global $s3;

	$r['title'] = preg_replace('/[[:^print:]]/', '', $r['title']);
	$r['timestamp'] = date('m/d/y - h:iA',strtotime($r['timestamp']));
	$r['status'] = ucfirst($r['status']);	
	$r['images'] = json_decode($r['images']);	
	$r['images_count'] = ($r['images'])?count($r['images']):0;
	$r['data'] = json_decode($r['data']);

    $r['flags'] = mysql_fetch_assoc(mysql_query("SELECT * FROM listings_flags WHERE listing_id='{$r['id']}'"));
    if($r['flags'])$r['flags'] = (object)$r['flags'];

	//list($r['updates_count']) = mysql_fetch_array(mysql_query("SELECT count(id) FROM listings_updates WHERE listing_id='{$r['remote_id']}'"));
	
	//$sc = new Score();
	//$r['score'] = $sc->getScore($r['lat'],$r['lng'],true);
	
	$r['last_seen_ago'] = (xDaysAgo($r['last_seen'],'now') === 0)?'Today':number_format(xDaysAgo($r['last_seen'],'now'),2).' days ago';			
	
	return (object)$r;
}
function flag(){
    $flag = $_REQUEST['flag'];
    $id = $_REQUEST['id'];
    if(!$id || !in_array($flag,['heart','up','down']))err("Unexpected Error");

    list($found) = mysql_fetch_array(mysql_query("SELECT id FROM listings_flags WHERE listing_id='{$id}'"));
    if($found)
        sql("UPDATE listings_flags SET {$flag}=1-{$flag} WHERE listing_id='{$id}'");
    else
        sql("INSERT INTO listings_flags SET {$flag}=1, listing_id='{$id}'");
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