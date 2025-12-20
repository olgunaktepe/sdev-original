<?php

Class Filters{
    public function __construct(){

    }

    static public function getPoiTypes(){
        $items = [];
        $q = mysql_query("SELECT DISTINCT subtype FROM poi");
        while(list($r) = mysql_fetch_array($q)){
            if($r){
                $items[] = $r;
            }
        }
        return $items;
    }
    static public function getFilterData($id){         
        $filters = self::buildFilterConfig();            
        $filter = reset(array_filter($filters,function($a) use($id){ return $a['id'] == $id; }));
        if(!$filter)return false;

        $options = [];
        if(in_array($id,['standerized.state'])){        
            foreach($GLOBALS["states"] as $k=>$v) $options[] = ['label'=>$v, 'value'=>$k];        
        }
        else if(in_array($id,['standerized.city'])){    
            $q = mysql_query("SELECT DISTINCT city FROM zipcodes ");    
            while(list($r) = mysql_fetch_array($q)) $options[] = ['label'=>$r, 'value'=>$r];                
        } 
        else if(in_array($id,['standerized.source'])){    
            $q = mysql_query("SELECT DISTINCT source FROM listings ");    
            while(list($r) = mysql_fetch_array($q)) $options[] = ['label'=>$r, 'value'=>$r];                
        } 
        else if(strpos($id,'live_points_of_interest.') !== false){
            $k = explode('.',$id)[1];
            $q = mysql_query("SELECT DISTINCT $k FROM poi LIMIT 500");    
            while(list($r) = mysql_fetch_array($q)) $options[] = ['label'=>$r, 'value'=>$r];                
        }
        else if(in_array($id,['standerized.category']) || strpos($id,'standerized') !== false){ ;  
            $options = [];
            $key = end(explode('.',$id));
            $q = mysql_query("SELECT * FROM listings WHERE source!='century21.com' ORDER BY id DESC LIMIT 1000,5000");    
            while($r = mysql_fetch_assoc($q)){            
                $r = reset(standerizeListing([$r]));               
                $val = strtolower($r->{$key});
                if(!$val)continue;
                //$options[$val] = ['label'=>ucwords($val).' - '.$r->source, 'value'=>$val];
                $options[$val] = ['label'=>ucwords($val), 'value'=>$val];
            }
            $options = array_values($options);     
            usort($options,function($a,$b){ return strcmp($a['label'],$b['label']); });
        }                
        return (object)['filter'=>$filter, 'options'=>$options];
    }
    static public function buildFilterConfig(){    
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
          "Asset Value" => ['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],     
          "Availability Rate" => ['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],     
          "Available SF" => ['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],     
          "Average Sale Price" => ['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],     
          "Cap Rate" => ['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],     
          "Cap Rate Transactions" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Demand SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Demolished SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Existing Buildings" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Gross Delivered Buildings" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Gross Delivered SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Inventory SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Leasing Activity SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Market Cap Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Market Rent Growth" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],    
          "Market Rent Growth 12 Mo" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Market Rent Index" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Market Rent/SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Market Sale Price Growth" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Market Sale Price Per SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Median Cap Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Median Price/Bldg SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Net Absorption SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Net Absorption SF 12 Mo" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Net Absorption SF Direct" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Net Absorption SF Sublet" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Net Delivered SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Net Delivered SF 12 Mo" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Occupancy Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "All Service Type Rent Direct" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "All Service Type Rent Overall" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "All Service Type Rent Sublet" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Sales Volume Transactions" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Sold Building SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Total Sales Volume" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Transaction Sale Price/SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Under Construction Buildings" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Under Construction SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Vacancy Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Vacant Available %" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Vacant Available SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "NNN Rent Direct" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "NNN Rent Overall" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "Existing Centers" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
          "NNN Rent Sublet" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
        ];
    
        $submarkets = [
            "All Service Type Rent Direct" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "All Service Type Rent Overall" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "All Service Type Rent Sublet" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Asset Value" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Availability Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Available SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Average Sale Price" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Cap Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Cap Rate Transactions" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Demand SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Demolished SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Existing Buildings" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Existing Centers" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Gross Delivered Buildings" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Gross Delivered SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Inventory SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Leasing Activity SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Market Cap Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Market Rent Growth" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Market Rent Growth 12 Mo" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Market Rent Index" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Market Rent/SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Market Sale Price Growth" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Market Sale Price Per SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Median Cap Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Median Price/Bldg SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "NNN Rent Direct" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "NNN Rent Overall" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "NNN Rent Sublet" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Net Absorption SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Net Absorption SF 12 Mo" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Net Absorption SF Direct" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Net Absorption SF Sublet" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Net Delivered SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Net Delivered SF 12 Mo" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Occupancy Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Sales Volume Transactions" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Sold Building SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Total Sales Volume" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Transaction Sale Price/SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Under Construction Buildings" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Under Construction SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Vacancy Rate" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Vacant Available %" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
            "Vacant Available SF" =>['type'=>'float', 'market_type'=>true,'params'=>[['label'=>'Multiplier', 'name'=>'premulitplier','type'=>'float']]],      
        ];
    
        $advanced = [
            'retail.market_noi'   => ['type'=>'float', 'label'=>'Retail Market NOI'],
            'retail.market_cap_rate'   => ['type'=>'float', 'label'=>'Retail Market CAP Rate'],
            'retail.submarket_noi'   => ['type'=>'float', 'label'=>'Retail Submarket NOI'],
            'retail.submarket_cap_rate'   => ['type'=>'float', 'label'=>'Retail Submarket CAP Rate'], 
            'industrial.market_noi'   => ['type'=>'float', 'label'=>'Industrial Market NOI'],
            'industrial.market_cap_rate'   => ['type'=>'float', 'label'=>'Industrial Market CAP Rate'],
            'industrial.submarket_noi'   => ['type'=>'float', 'label'=>'Industrial Submarket NOI'],
            'industrial.submarket_cap_rate'   => ['type'=>'float', 'label'=>'Industrial Submarket CAP Rate'],
            
            'office.market_noi'   => ['type'=>'float', 'label'=>'Office Market NOI'],
            'office.market_cap_rate'   => ['type'=>'float', 'label'=>'Office Market CAP Rate'],
            'office.submarket_noi'   => ['type'=>'float', 'label'=>'Office Submarket NOI'],
            'office.submarket_cap_rate'   => ['type'=>'float', 'label'=>'Office Submarket CAP Rate'],     

            'multifamily.market_noi'   => ['type'=>'float', 'label'=>'Multifamily Market NOI'],
            'multifamily.market_cap_rate'   => ['type'=>'float', 'label'=>'Multifamily Market CAP Rate'],
            'multifamily.submarket_noi'   => ['type'=>'float', 'label'=>'Multifamily Submarket NOI'],
            'multifamily.submarket_cap_rate'   => ['type'=>'float', 'label'=>'Multifamily Submarket CAP Rate'], 
            
            'student.market_noi'   => ['type'=>'float', 'label'=>'Student Market NOI'],
            'student.market_cap_rate'   => ['type'=>'float', 'label'=>'Student Market CAP Rate'],
            'student.submarket_noi'   => ['type'=>'float', 'label'=>'Student Submarket NOI'],
            'student.submarket_cap_rate'   => ['type'=>'float', 'label'=>'Student Submarket CAP Rate'],   

            'hospitality.market_noi'   => ['type'=>'float', 'label'=>'Hospitality Market NOI'],
            'hospitality.market_cap_rate'   => ['type'=>'float', 'label'=>'Hospitality Market CAP Rate'],
            'hospitality.submarket_noi'   => ['type'=>'float', 'label'=>'Hospitality Submarket NOI'],
            'hospitality.submarket_cap_rate'   => ['type'=>'float', 'label'=>'Hospitality Submarket CAP Rate'],   
        ];

        $oa = [
            'count'   => [
                'type'=>'float', 
                'label'=>'# of Surrounding Addresses', 
                'params'=>[
                    ['label'=>'Proximity (miles)', 'name'=>'proximity', 'values'=>[0.1,0.25,0.5]],                    
                ]
            ]        
        ];

        $poi = [
            'count'   => [
                            'type'=>'float', 
                            'label'=>'POI Count', 
                            'params'=>[
                                ['label'=>'Proximity (miles)', 'name'=>'proximity', 'values'=>[0.1,0.25,0.5]],
                                ['label'=>'Type', 'name'=>'type', 'values'=>self::getPoiTypes(), 'multiple'=>true],
                                ['label'=>'Stories (greater than)', 'name'=>'stories'],
                                ['label'=>'Year Built (greater than)', 'name'=>'year'],
                            ]
                        ]            
        ];

        $greatschools = [
            'proximity_1' => ['type'=>'float', 'label'=>'Average School Score (1 mile)'],
            'proximity_3' => ['type'=>'float', 'label'=>'Average School Score (3 miles)'],
            'proximity_5' => ['type'=>'float', 'label'=>'Average School Score (5 miles)'],
            'closest' => ['type'=>'float', 'label'=>'Closest School Score (within  50 miles)'],
        ];

        $live_poi = [            
            'type'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'subtype'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'title'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'stories'   => ['type'=>'float', 'label'=>'# of Stories', 'proximity'=>true, 'live'=>true],
            'address'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'city'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'state'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'zip'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'county'   => ['type'=>'str', 'proximity'=>true, 'live'=>true],
            'year_built'   => ['type'=>'float', 'label'=>'Year Built', 'proximity'=>true, 'live'=>true]                    
        ];
        $live_oa = [
            'count'   => ['type'=>'float', 'proximity'=>true, 'label'=>'Surrounding Addresses', 'live'=>true],            
        ];

        /*
        $dups = [
            'historical_6' => ['type'=>'float', 'label'=>'Was on the market in the past 6 months', 'live'=>true,
            'historical_12' => ['type'=>'float', 'label'=>'Was on the market in the past 12 months', 'live'=>true],
            'historical_24' => ['type'=>'float', 'label'=>'Was on the market in the past 24 months', 'live'=>true],
            'historical_all' => ['type'=>'float', 'label'=>'Was on the market', 'live'=>true],            
        ];
        */

        $dups = [
            'count' => [
                'type'=>'float', 
                'label'=>'Was on the market', 
                'params'=> [                
                    ['label'=>'Listed less than X days ago', 'name'=>'within_days'],
                    ['label'=>'Skip dups listed with X days', 'name'=>'skip_days'],
            ]]            
        ];

        $leaseinfo = [
            'min_rate' => ['type'=>'float', 'label'=>'Min Lease Rate'],
            'max_rate' => ['type'=>'float', 'label'=>'Max Lease Rate'],
            'avg_rate' => ['type'=>'float', 'label'=>'Avg Lease Rate'],
        ];

    
        $mainFilter = [
            'standerized' => $listing,
            'zillow' => $zillow,
            //'zillow2' => $zillow2,
            'census' => $census,
            'walkscore' => $walkscore,
            'greatschools' => $greatschools,
            'markets.data' => $markets,
            'submarkets.data' => $submarkets,
            'advanced' => $advanced,
            'points_of_interest' => $poi,
            'openaddress' => $oa,
            'dups' => $dups,
            'leaseinfo' => $leaseinfo,
            //'live_points_of_interest' => $live_poi,
            //'live_openaddress' => $live_oa,
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
                    "proximity" => 0, //($f['key'])?1:0,
                    "market_type" => '',                     
                    "live" => false,                     
                    "params" => [],
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
                    default:                
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
                }
                $formattedFilters[] = $item;
            }
        }
        return $formattedFilters;
    }


}