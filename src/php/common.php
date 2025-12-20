<?php
//Listings
function getFileIcons($file){
	$ext = end(explode('.',$file));

	$icon = '/images/icons/file_other.jpg';
	switch($ext){
		case 'png':
		case 'jpg':
		case 'jpeg':
			$icon = $GLOBALS['system']['upload_href'].path2url($file);
			break;
		case 'pdf':
			$icon = '/images/icons/file_pdf.jpg';
			break;
		case 'xls':
		case 'csv':
			$icon = '/images/icons/file_excel.jpg';
			break;
		case 'doc':
			$icon = '/images/icons/file_word.jpg';
			break;
	}
	return $icon;
}
function formatCurrency($v){
	return ($v<100000)?number_format($v,2):number_format($v,0);		
}
function getKeyValueV2($obj,$keys){
	$found = false;
		
	$parts = [];
	foreach($keys as $key){
    	$kp = explode('.',$key);		
		$parent = &$parts;
		foreach($kp as $k){		
			if(!$parent[$k])$parent[$k] = [];
			$parent = &$parent[$k];
		}
	}
	t($parts);

    $val = json_decode(json_encode($obj));
    foreach($parts as $part=>$children){  						
		if(is_array($val)){
			$res = [];
			foreach($val as $subval){
				if($part == 'max')$target = end($subval);
        		else $target = $subval->{$part};			
				if(!is_object($target) && !is_array($target)){
					$res[] = $target;
				}
			}
			$val = implode(", ",$res);
		}
		else{
			if($part == 'max')$val = end($val);
			else $val = $val->{$part}; 				
		}		        
        //t($val,1);

        $val = json_decode(json_encode($val));
                
        if(!$children && $val){
            $found = true;
        }
        if(!is_object($val) && !is_array($val))break;
    }  
    //t($key);
    //t($val);
    if(!$found)$val = '';   
	return $val;
}
function getKeyValue($obj,$key){
	$found = false;
    $parts = explode('.',$key);
    $val = json_decode(json_encode($obj));
    foreach($parts as $i=>$part){  						
		if(is_array($val)){
			$res = [];
			foreach($val as $subval){
				if($part == 'max')$target = end($subval);
        		else $target = $subval->{$part};			
				if(!is_object($target) && !is_array($target)){
					$res[] = $target;
				}
			}
			$val = implode(", ",$res);
		}
		else{
			if($part == 'max')$val = end($val);
			else $val = $val->{$part}; 				
		}
		//t($key,1);		        
        //t($val,1);

        $val = json_decode(json_encode($val));
                
        if($i+1 == count($parts) && $val){
            $found = true;
        }
        if(!is_object($val) && !is_array($val))break;
    }  
    //t($key);
    //t($val);
    if(!$found)$val = '';   
	return $val;
}
function validateListingRule(&$deal,$rules,&$results,$level=0,$group=0,$parent=0,$condition=''){ 
    $condition = 'AND';   

	//Extract POI rules (Live filters)
	$poi_rules = array_filter($rules,function($a){ return !$a['disabled'] && reset(explode('.',$a['id']))=='live_points_of_interest'; });
	$poi_keys = array_column($poi_rules, 'key');		
	$rules = array_filter($rules,function($a)use ($poi_keys){ return !in_array($a['key'],$poi_keys); });
	if($poi_rules){
		$count = rules2Sql($poi_rules,'poi',$deal);
		$deal->points_of_interest = $count;
		$err = ($count === false)?true:false;
		$res = ($count>0)?true:false;
		$results['points_of_interest-uid-'.uniqid()] = (object)['valid'=> $res, 'err'=> $err, 'level'=>$level, 'group'=>$group, 'condition'=>$condition, 'parent'=>$parent, 'value'=>$count];                        
	}

	//Format Dups rules
	$dups_rules = array_filter($rules,function($a){ return !$a['disabled'] && reset(explode('.',$a['id']))=='dups'; });
	$dups_keys = array_column($dups_rules, 'key');		
	$rules = array_filter($rules,function($a)use ($dups_keys){ return !in_array($a['key'],$dups_keys); });
	if($dups_keys){
		$deal->dups_live = (object)['count'=>[]];
		foreach($dups_rules as $r){		
			$params = $r['params'];			
			$skip_days = (int)$params['skip_days'];			
			$within_days = (int)$params['within_days'];	
			
			$count = 0;
			foreach($deal->dups['items'] as $d){				
				$ts = strtotime($d->listing2_timestamp);
				$diff = (time()-$ts)/60/60/24;						
				if($diff<$skip_days || $diff>$within_days)continue;
				$count++;
			}						
			$deal->dups_live->count['within_'.$within_days]['skip_'.$skip_days] = $count;
			$r['id'] = "dups_live.count.within_{$within_days}.skip_{$skip_days}";
			$rules[] = $r;   
		}								
	}

	//Format cached POI Rules	
	$poi_rules = array_filter($rules,function($a){ return !$a['disabled'] && reset(explode('.',$a['id']))=='points_of_interest'; });	
	$poi_keys = array_column($poi_rules, 'key');		
	$rules = array_filter($rules,function($a)use ($poi_keys){ return !in_array($a['key'],$poi_keys); });		
	if($poi_rules){                        		
		foreach($poi_rules as $r){		
			$params = $r['params'];			
			$stories = (int)$params['stories'];			
			$year = (int)$params['year'];
			$types = $params['type'];
			$proximity = (float)$params['proximity'];
			$pkey = 'proximity_'.str_replace('.','',$proximity);

			if(is_string($types))$types = [$types];

			$count = 0;			
			foreach($deal->poi->{$pkey} as $type=>$storiesList){
				if(!in_array($type,$types))continue;
				if(!$storiesList)continue;
				//t($deal->listing->id,1);
				//t($deal->poi,1);
				foreach($storiesList as $svalue=>$yearsList){
					if($stories>0 && $svalue<$stories)continue;					
					if(!$yearsList)continue;
					foreach($yearsList as $yvalue=>$ycount){
						if($year>0 && $yvalue<$year)continue;
						$count += $ycount;						
					}				
				}
			}			
											
			$typeKey = implode(",",$types);

			if(!$stories)$stories = 'na';
			if(!$year)$year = 'na';
			if(!$typeKey)$typeKey = 'na';

			$deal->poi->count[$pkey][$typeKey][$stories][$year] = $count;
			$r['id'] = "poi.count.{$pkey}.{$typeKey}.{$stories}.{$year}";
			$rules[] = $r;                        						
		}
	}	
	
	//Extract OpenAddress rules (Live filters)
	$oa_rules = array_filter($rules,function($a){ return !$a['disabled'] && reset(explode('.',$a['id']))=='live_openaddress'; });
	$oa_keys = array_column($oa_rules, 'key');		
	$rules = array_filter($rules,function($a)use ($oa_keys){ return !in_array($a['key'],$oa_keys); });	
	if($oa_rules){                        
		$deal->openaddress = [];
		foreach($oa_rules as $r){				
			$count = Deal::getOaAddressCount($deal->standerized->city,$deal->standerized->state,$deal->listing->lat,$deal->listing->lng,$r['proximity']);			

			$r['proximity'] = str_replace('.','',$r['proximity']);
			$r['id'] = $r['id'].'_'.$r['proximity'];
						
			$deal->openaddress['count_'.$r['proximity']] = $count;
			$rules[] = $r;                        						
		}
	}	

	//Format cached OA Rules	
	$rrules = array_filter($rules,function($a){ return !$a['disabled'] && reset(explode('.',$a['id']))=='openaddress'; });	
	$rkeys = array_column($rrules, 'key');		
	$rules = array_filter($rules,function($a)use ($rkeys){ return !in_array($a['key'],$rkeys); });		
	if($rrules){                        		
		foreach($rrules as $r){		
			$params = $r['params'];						
			$proximity = (float)$params['proximity'];
			$pkey = 'proximity_'.str_replace('.','',$proximity);
			$r['id'] = "openaddress.{$pkey}.count";			
			$rules[] = $r;                        						
		}
	}
	
	//Replace "Auto-detect" catergory
	foreach($rules as $i=>$r){
		$key = $r['id'];
		if(strpos($key,'.auto-category.') !== false){			
			$key = str_replace('.auto-category.','.'.strtolower($deal->standerized->category_mapped).'.',$key);					
			$rules[$i]['id'] = $key;
		}
	}

    foreach($rules as $r){
        if($r['disabled'])continue;           
        $key = $r['id'];
        $op = $r['op'];
        $values = $r['value'];  
        $mode = $r['mode'];  
		$params = $r['params'];

		if(!$values)$values = [0];
                                
        $val = getKeyValue($deal,$key);        
        if(!$val)$val = null;	
		
        $err = false;
        if(is_array($val)){ $err = 'Array found'; t($err);  }
        else if(is_object($val)){ $err = 'Object found';  t($err); }
        else if(is_null($val)){ $err = 'Property Missing'; } 
        
        if($err){
            $res = false;
        }
        else{              
            if(in_array($r['type'],['float','double','integer'])) $val = (float)preg_replace("/[^0-9\.-]/","",$val); 
			if($params['premulitplier']) $val = $val * $params['premulitplier'];
            $valuesRes = []; 									
            foreach($values as $i=>$value){  
				if(preg_match("/\*[\d\-\.]+/",$value)){
					$value = (count(explode(' - ',$value)) == 2)?explode(' - ',$value):$value;
					if(is_array($value)){
						list($vkey,$vmult) = explode('*',$value[0]);
						$value[0] = getKeyValue($deal,$vkey);						

						list($vkey,$vmult) = explode('*',$value[1]);						
						$value[1] = getKeyValue($deal,$vkey);

						if($value[0] && $value[1]){
							if($vmult != 1){ $value[0] = (float)preg_replace("/[^0-9\.-]/","",$value[0])*(1/$vmult); }						
							else if(in_array($r['type'],['float','double','integer'])) $value[0] = (float)preg_replace("/[^0-9\.-]/","",$value[0]); 

							if($vmult){ $value[1] = (float)preg_replace("/[^0-9\.-]/","",$value)*(1/$vmult); }						
							else if(in_array($r['type'],['float','double','integer'])) $value[1] = (float)preg_replace("/[^0-9\.-]/","",$value[1]); 
						}
						else{
							$value[0] = null;
							$value[1] = null;
							$err = 'Property Missing';
						}						
					}
					else{																		
						list($vkey,$vmult) = explode('*',$value);															
						$value = getKeyValue($deal,$vkey);

						if($value){
							if($vmult != 1){ $value = (float)preg_replace("/[^0-9\.-]/","",$value)*(1/$vmult); }		
							else if(in_array($r['type'],['float','double','integer'])) $value = (float)preg_replace("/[^0-9\.-]/","",$value); 				
						}
						else{
							$value = null;
							$err = 'Property Missing';
						}
					}
				}
				else{
					$value = (count(explode(' - ',$value)) == 2)?explode(' - ',$value):$value;
				}                

				if($err){
					$res = false;
				}
				else{
					$valuesRes[$i] = text2op($op,$val,$value);					               
				}
				
				if($mode == 'or'){
					$res = false;
					foreach($valuesRes as $vres){
						if($vres){
							$res = true;
							break;
						}                     
					}
				}
				else{
					$res = true;
					foreach($valuesRes as $vres){
						if(!$vres){
							$res = false;
							break;
						}                     
					}
				}                        
			}
        }
        $results[$key.'-uid-'.uniqid()] = (object)['valid'=> $res, 'err'=> $err, 'level'=>$level, 'group'=>$group, 'condition'=>$condition, 'parent'=>$parent, 'value'=>$val, 'ref_value'=>$value, 'op'=>$op];                        
    }
}
function text2op($op,$val,$value){
	$res = '';
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
		case 'not_begins_with': $res = !preg_match("/^".$value."/i",$val); break;
		case 'contains': $res = preg_match("/".$value."/i",$val); break;
		case 'not_contains': $res = !(preg_match("/".$value."/i",$val)); break;
		case 'ends_with': $res = preg_match("/".$value."$/i",$val); break;
		case 'not_ends_with': $res = !(preg_match("/".$value."$/i",$val)); break;
		case 'is_empty': $res = ($val>0)?false:true; break;
		case 'is_not_empty': $res = ($val>0)?true:false; break;
		case 'is_null': $res = is_null($val); break;
		case 'is_not_null': $res = !is_null($val); break;
	}   
	return $res;

}
function rules2Sql($rules,$table,$deal){
	$lat = $deal->listing->lat;
	$lng = $deal->listing->lng;
	if(!$lat || !$lng)return false;

	$wheresql = [];
	$distance = 0;
	foreach($rules as $r){ 
        if($r['disabled'])continue;           
        $key = end(explode('.',$r['id']));
        $op = $r['op'];
        $values = $r['value'];  
        $mode = $r['mode'];  
		if(!$distance || $r['proximity']<$distance)$distance = $r['proximity'];  
                        					
		$valuesRes = [];            
    	foreach($values as $i=>$value){  		
			$value = (count(explode(' - ',$value)) == 2)?explode(' - ',$value):$value;
			switch($op){
				case 'equal': $valuesRes[$i] = "`{$key}` = '{$value}'"; break;
				case 'not_equal': $valuesRes[$i] = "`{$key}` != '{$value}'"; break;
				case 'in': $valuesRes[$i] = "`{$key}` LIKE '%{$value}%'"; break;
				case 'not_in': $valuesRes[$i] = "`{$key}` NOT LIKE '%{$value}%'"; break;
				case 'less': $valuesRes[$i] = "`{$key}` < '{$value}'"; break;
				case 'less_or_equal': $valuesRes[$i] = "`{$key}` <= '{$value}'"; break;
				case 'greater': $valuesRes[$i] = "`{$key}` > '{$value}'"; break;
				case 'greater_or_equal': $valuesRes[$i] = "`{$key}` >= '{$value}'"; break;
				case 'between': $valuesRes[$i] = "`{$key}` BETWEEN '{$value[0]}' AND '{$value[1]}'"; break;
				case 'not_between': $valuesRes[$i] = "`{$key}` NOT BETWEEN '{$value[0]}' AND '{$value[1]}'"; break;
				case 'begins_with': $valuesRes[$i] = "`{$key}` LIKE '{$value}%'"; break;
				case 'not_begins_with': $valuesRes[$i] = "`{$key}` NOT LIKE '{$value}%'"; break;
				case 'contains': $valuesRes[$i] = "`{$key}` LIKE '%{$value}%'"; break;
				case 'not_contains': $valuesRes[$i] = "`{$key}` NOT LIKE '%{$value}%'"; break;
				case 'ends_with': $valuesRes[$i] = "`{$key}` LIKE '%{$value}'"; break;
				case 'not_ends_with': $valuesRes[$i] = "`{$key}` NOT LIKE '%{$value}'"; break;
				case 'is_empty': $valuesRes[$i] = "`{$key}` = ''"; break;
				case 'is_not_empty': $valuesRes[$i] = "`{$key}` <> ''"; break;
				case 'is_null': $valuesRes[$i] = "`{$key}` IS NULL"; break;
				case 'is_not_null': $valuesRes[$i] = "`{$key}` IS NOT NULL"; break;
			}                
		}            
        if($mode == 'or'){
            $wheresql[] = "(".implode(" OR ",$valuesRes).")";
        }
        else{
            $wheresql[] = "(".implode(" AND ",$valuesRes).")";
        }        
	}  
	
	$sql = 'SELECT SQL_CALC_FOUND_ROWS id,
				(((acos(sin(('.$lat.'*pi()/180)) * sin((lat*pi()/180))+cos(('.$lat.'*pi()/180)) * cos((lat*pi()/180)) * cos((('.$lng.' - lng)*pi()/180))))*180/pi())*60*1.1515) AS distance 
				FROM '.$table.' WHERE '.implode(" AND ",$wheresql).' HAVING distance<'.$distance;
	//t($sql);
	$q = mysql_query($sql);	
	list($count) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));	
	
	return $count;
}
function standerizeListing($items){	
    $formatted = array();
    foreach($items as $item){
		if(is_array($item))$item = (object)$item;
		if(is_string($item->data)) $item->data = json_decode($item->data);

        switch($item->source){
			case 'import':
				$loc = [                    
                    'price' => (float)$item->data->price,
                    'type'  => $item->data->type,
                    'category' => ucwords(strtolower($item->data->category)),					
					'subtype' => $item->data->subtype,
                    'APN'   => '',
                    'FIP'   => '',                    
                    'description' => '',
					'main_img' => '',
					'created_on' => $item->timestamp,
					'scraped_on' => $item->timestamp,

					'address' => $item->data->address,
					'city' => $item->data->city,
					'state' => $item->data->state,					
					'zip' => $item->data->zip,
					'country' => 'USA',
					'sqft' => $item->data->sqft,					
					'acres' => $item->data->sqft/43560,
					'buildings_sqft' => (float)preg_replace("/[^0-9\.]/","",$item->data->buildings_sqft),
					'parent' => [
						'title' => '',
						'type' => '',
						'acres' => '',
						'zoning' => '',
					],

					'noi'	=> preg_replace("/[^0-9\.]/","",$item->data->noi),
					'cap_rate'	=> preg_replace("/[^0-9\.]/","",$item->data->cap_rate),
					'lease_exp' => preg_replace("/[^0-9\.]/","",$item->data->lease_exp),
					'agents' => [],
                ];										
				break;
            case 'crexi.com':				
			case 'lease-crexi.com':												
				if(strpos($item->data->details->{"Square Footage"},"-") !== false)$item->data->details->{"Square Footage"} = trim(reset(explode("-",$item->data->details->{"Square Footage"})));
				if(strpos($item->data->details->{"Lot Size (acres)"},"-") !== false)$item->data->details->{"Lot Size (acres)"} = trim(reset(explode("-",$item->data->details->{"Lot Size (acres)"})));
				if(strpos($item->data->details->{"Lot Size (sq ft)"},"-") !== false)$item->data->details->{"Lot Size (sq ft)"} = trim(reset(explode("-",$item->data->details->{"Lot Size (sq ft)"})));
				if(strpos($item->data->details->{"Total Building SQFT"},"-") !== false)$item->data->details->{"Total Building SQFT"} = trim(reset(explode("-",$item->data->details->{"Total Building SQFT"})));

				
				$locationData = pick($item->data->locations[0],$item->data->location);							
                $loc = [                    
                    'price' => (float)$item->data->askingPrice,
                    'type'  => strpos($item->url,'lease')?'Lease':'Sale',
                    'category' => ucwords(strtolower($item->data->types[0])),
					'subtype' => ($item->data->subtypes)?implode(',',$item->data->subtypes):'',
                    'APN'   => $item->data->details->APN,
                    'FIP'   => '',                    
                    'description' => $item->data->marketingDescription,
					'main_img' => $item->data->thumbnailUrl,
					'created_on' => dbTimestamp(pick($item->data->activatedOn,$item->timestamp)),
					'scraped_on' => $item->timestamp,

					'address' => $locationData->address,
					'city' => pick($locationData->cityVerified,$locationData->city),
					'state' => ($locationData->stateVerified->code)?$locationData->stateVerified->code:$locationData->state->code,
					'zip' => $locationData->zip,
					'country' => 'USA',
					'buildings_sqft' => (float)preg_replace("/[^0-9\.]/","",pick($item->data->details->{"Square Footage"},$item->data->details->{"Total Building SQFT"})),					
					'parent' => [
						'title' => '',
						'type' => '',
						'acres' => '',
						'zoning' => $item->data->details->{"Permitted Zoning"},
					],

					'noi'	=> preg_replace("/[^0-9\.]/","",pick($item->data->details->{"NOI"},$item->data->details->{"Pro-Forma NOI"})),
					'cap_rate'	=> preg_replace("/[^0-9\.]/","",pick($item->data->details->{"Cap Rate"},$item->data->details->{"Pro-Forma Cap Rate"})),
					'lease_exp' => preg_replace("/[^0-9\.]/","",$item->data->details->{"Remaining Term"}),
                ];				

				//t('AAA: '.dbTimestamp(pick($item->data->activatedOn,$item->timestamp)),1);

				if(!$loc['lease_exp'] && $item->data->details->{'Lease Expiration'}){
					$loc['lease_exp'] = number_format((strtotime($data['Details']['Lease Expiration']) - strtotime('now'))/60/60/24/365,1);					
				}				
				if(!$loc['lease_exp'] && $item->data->details->{'Lease Commencement'} && $item->data->details->{'Lease Term'}){
					$years = preg_replace("/[^0-9\.]/","",$item->data->details->{'Lease Term'});
					$end = date('Y-m-d',strtotime('+'.round(($years*365)).' day', strtotime($item->data->details->{'Lease Commencement'})));			
					$loc['lease_exp'] = number_format((strtotime($end)-strtotime('now'))/60/60/24/365,1);
				}
						
				if($item->data->details->{"Lot Size (acres)"}){					
					$loc['acres'] = (float)preg_replace("/[^0-9\.]/","",$item->data->details->{"Lot Size (acres)"});					
					$loc['sqft'] = $loc['acres']*43560;
				}
				else if($item->data->details->{"Lot Size (sq ft)"}){
					$loc['sqft'] = (float)preg_replace("/[^0-9\.]/","",$item->data->details->{"Lot Size (sq ft)"});
					$loc['acres'] = $loc['sqft']/43560;
				}
				//else{
				//	$loc['sqft'] = $loc['buildings_sqft'];
				//	$loc['acres'] = $loc['sqft']/43560;
				//}

				$loc['agents'] = [];
				if($item->data->broker){
					foreach($item->data->broker as $a){						
						$agent = (object)[
							'name'	=> $a->firstName.' '.$a->lastName,
							'phone' => '',
							'email' => '',
							'company' => $a->brokerage->name,
							'license' => ($a->licenses)?reset($a->licenses):''
						];					
						$loc['agents'][] = $agent;
					}
				}

				//t($loc['acres'],1);
								
				$loc['children'] = [];
				if($item->data->suites){
					foreach($item->data->suites as $a){
						if(strpos($a->rentableSqFt,"-") !== false)$a->rentableSqFt = trim(reset(explode("-",$a->rentableSqFt)));
						if(strpos($a->usableSqFt,"-") !== false)$a->usableSqFt = trim(reset(explode("-",$a->usableSqFt)));
						if(strpos($a->rate,"-") !== false)$a->rate = trim(reset(explode("-",$a->rate)));

						$child = (object)[
							'id'			=> $a->id,
							'title'			=> $a->name,
							'created_on' 	=> dbTimestamp($a->createdOn),
							'last_update' 	=> dbTimestamp($a->updatedOn),
							'category'		=> ucwords(strtolower($a->spaceUse[0])),
							'subtype' 		=> ($a->subtypes)?implode(',',$a->subtypes):'',
							'avl_sqft'		=> pick((float)preg_replace("/[^0-9\.]/","",$a->rentableSqFt),(float)preg_replace("/[^0-9\.]/","",$a->usableSqFt)),
							'rate_type'		=> ($a->rateType == 'Per Year')?'yearly':'monthly',
							'lease_type'	=> $a->leaseType,
							'status'		=> $a->status,
							'rate'			=> (float)preg_replace("/[^0-9\.]/","",$a->rate),
							'source'		=> $item->source,
							'parent_id'		=> $item->id,
							'parent_url'	=> $item->url,
						];
						
						if($child->rate_type == 'monthly'){
							$child->rate = (float)number_format($child->rate*12,2);
							$child->rate_type = 'yearly';
						}
						$loc['children'][] = $child;
					}
				}
				if($item->source == 'lease-crexi.com'){
					$loc['lease_rent'] = (float)preg_replace("/[^0-9\.]/","",$item->data->rateYearly);					
					if(!$loc['lease_rent']){
						$prices = array_column($loc['children'],'rate');
						$avgPrice = (count($prices)>0)?array_sum($prices)/count($prices):0;
						$loc['lease_rent'] = $avgPrice;
					}					
				}

                break;
            case 'century21.com':				
                $loc = [
                    'price' => (float)preg_replace("/[^0-9\.]/","",$item->data->{"data-card-data"}->price),
                    'type'  => $item->data->{"listing-type"},
                    'category' => ucwords(strtolower($item->data->{"property-type"})),
					'subtype' => $item->data->features->Style,
                    'APN'   => '',
                    'FIP'   => '',
                    'agents' => [(object)['name' => $item->data->agent->name,'phone' => ($item->data->agent->phones)?reset($item->data->agent->phones):'','email' => '','company' => 'Century21','license' => '' ]],
                    'description' => $item->data->description,
					'created_on' => $item->timestamp,
					'scraped_on' => $item->timestamp,
					'main_img' => $item->data->{"data-card-data"}->image,

					'address' => $item->data->{"data-card-data"}->address,
					'city' => '',
					'state' => '',
					'zip' => '',
					'country' => 'USA',
					'acres' => (float)preg_replace("/Land:|Acres|[^0-9\.]/","",$item->data->{"data-card-data"}->size_land),
					'buildings_sqft' => (float)preg_replace("/Building:|sq. ft.|[^0-9\.]/","",$item->data->{"data-card-data"}->size_sqft),					
					'parent' => [
						'title' => '',
						'type' => '',
						'acres' => '',
						'zoning' => $item->data->features->Zoning,
					]
					
                ];

				preg_match("/(.*?), ([A-Z]+) (.*?)$/",$item->data->{"data-card-data"}->location,$matches);
				if($matches){ 
					$loc['city'] = $matches[1];
					$loc['state'] = $matches[2];
					$loc['zip'] = $matches[3];
				}				

				$loc['sqft'] = $loc['acres']*43560;

                break;
			case 'loopnet.com':
				$features = [];
				if($item->data->Features->ListingFeatures){
					foreach($item->data->Features->ListingFeatures as $r){
						$features[$r->FeatureId] = $r->FeatureValues;
					}
				}
				if($item->data->PropertyFacts){
					foreach($item->data->PropertyFacts as $k=>$r){							
						if(!$features[$k])$features[$k] = $r->FeatureValues;						
					}
				}
				$features = (object)$features;
				
                $loc = [
                    'price' => @(float)preg_replace("/[^0-9\.]/","",$features->Price[0]),
                    'type'  => ($item->data->ForSale)?'sale':'lease',
                    'category' => ucwords(strtolower(@implode(",",$features->PropertyType))),
					'subtype' => @implode(",",$features->PropertySubtype),
                    'APN'   => $item->data->PropertyTax->AssessorParcelNumbers,
                    'FIP'   => '',
                    'description' => $item->data->SaleNote,
					'created_on' => dbTimestamp(str_replace('T','',$item->data->DateCreated)),
					'scraped_on' => $item->timestamp,
					'main_img' => @$item->data->ListingAttachments[array_keys(array_column($item->data->ListingAttachments, 'SortOrder'), min(array_column($item->data->ListingAttachments, 'SortOrder')))[0]]->Uri,

					'lease_rent' => '',

					'address' => $item->data->Address->DeliveryAddress,
					'city' => $item->data->Address->City,
					'state' => $item->data->Address->State,
					'zip' => $item->data->Address->PostalCode,
					'country' => 'USA',
					'sqft' => @((float)preg_replace("/[^0-9\.]/","",reset(array_filter([$features->LandArea[0],$features->TotalLotSize[0],$features->LotSize[0]]))*43560)),
					'acres' => @(float)preg_replace("/[^0-9\.]/","",reset(array_filter([$features->LandArea[0],$features->TotalLotSize[0],$features->LotSize[0]]))),
					'buildings_sqft' => @(float)preg_replace("/[^0-9\.]/","",pick($features->BuildingSize[0],$item->data->PropertyTax->BuildingSize)),
					'parent' => [
						'title' => '',
						'type' => '',
						'acres' => '',
						'zoning' => @$features->Zoning[0],
					],

					'noi'	=> preg_replace("/[^0-9\.]/","",@$features->NOI[0]),
					'far'	=> preg_replace("/[^0-9\.]/","",@$features->BuildingFAR[0]),
					'cap_rate'	=> preg_replace("/[^0-9\.]/","",@$features->CapRate[0]),
					'lease_exp' => '',
                ];	
								
				$loc['agents'] = [];
				if($item->data->Contacts){
					foreach($item->data->Contacts as $a){
						$agent = (object)[
							'name'	=> $a->Name,
							'phone' => $a->Phones->PH,
							'email' => $a->Email,
							'company' => $a->CompanyName,
							'license' => '' 
						];					
						$loc['agents'][] = $agent;
					}
				}

				
				if(!$loc['sqft']){
					$loc['sqft'] = @( (float)preg_replace("/[^0-9\.]/","",$item->data->SpaceSummary->TotalAvailableSpace) );
					$loc['acres'] = $loc['sqft']/43560;
				}
				$loc['children'] = [];
				if($item->data->Spaces){
					foreach($item->data->Spaces as $a){		
						$rate = 0;
						foreach($a->RentalRates as $rr){
							if($rr->Id == 'SFYr'){
								$rate = (float)preg_replace("/[^0-9\.]/","",$rr->Value);
								break;	
							}
							if($rr->Id == 'SFMo'){
								$rate = (float)preg_replace("/[^0-9\.]/","",$rr->Value)*12;
								break;									
							}
						}
						$child = (object)[
							'id'			=> $a->SpaceId,
							'title'			=> $a->Number,
							'created_on' 	=> $loc['created_on'],
							'last_update' 	=> '',
							'category'		=> ucwords(strtolower($a->SpaceUse)),
							'subtype' 		=> ucwords(strtolower($a->SpaceType)),
							'avl_sqft'		=> pick((float)preg_replace("/[^0-9\.]/","",$a->SpaceAvailable),(float)preg_replace("/[^0-9\.]/","",$a->AreaMax)),
							'rate_type'		=> 'yearly',
							'lease_type'	=> $a->LocalizedServiceType,
							'status'		=> ($a->Status == 10)?'Active':'Inactive',
							'rate'			=> $rate,
							'source'		=> $item->source,
							'parent_id'		=> $item->id,
							'parent_url'	=> $item->url,
						];					
						$loc['children'][] = $child;
					}
				}				
				
				$prices = array_column($loc['children'],'rate');
				$avgPrice = (count($prices)>0)?array_sum($prices)/count($prices):0;
				$loc['lease_rent'] = $avgPrice;				
				
                break;  
            case 'commercialexchange.com':                                                   
			default:
				uselib('scrapers::ce');
				$ce = new CE();	
								
				$mainImage = '';
				if($item->data->media && is_array($item->data->media)){
					$mainImage = current(array_filter($item->data->media, function($e) { return $e->type == 'IMAGE'; }));
					if($mainImage)$mainImage = $mainImage->url;
				}
				if(!$mainImage){
					if($item->data->building->media && is_array($item->data->building->media)){
						$mainImage = current(array_filter($item->data->building->media, function($e) { return $e->type == 'IMAGE'; }));
						if($mainImage)$mainImage = $mainImage->url;
					}					
				}
							
				if(is_object($item->data->building->buildings))$item->data->building->buildings = [$item->data->building->buildings];				
                $loc = [
                    'price' => $item->data->sale->price->amount,
                    'type'  => $item->data->type,					
                    'category' => ucwords(strtolower($item->data->space->category)),
					'subtype' => array_filter(array($item->data->building->category,$item->data->building->subCategory)),
                    'APN'   => ($item->data->building->parcels)?array_map(function($o) { return $o->APN; }, $item->data->building->parcels):'',
                    'FIP'   => ($item->data->building->parcels)?array_map(function($o) { return $o->FIPS; }, $item->data->building->parcels):'',                    
                    'description' => $item->data->remarksForPublic,
					'created_on' => dbTimestamp(pick(str_replace('T','',$item->data->createdDate->{'$date'}),$item->timestamp)),
					'scraped_on' => $item->timestamp,
					'main_img' => $ce->getImageBaseUrl().'/'.$mainImage,
					
					'address' => $item->data->building->location->address->street->numberMin.' '.$item->data->building->location->address->street->name,
					'city' => $item->data->building->location->address->locality,
					'state' => $item->data->building->location->address->region,
					'zip' => $item->data->building->location->address->postalCode,
					'country' => $item->data->building->location->address->country,
					'sqft' => $item->data->building->lot->totalAcres*43560, //($item->data->space->size->units != 'ACRES')?$item->data->space->size->available:($item->data->space->size->available*43560),
					'acres' => $item->data->building->lot->totalAcres, //($item->data->space->size->units == 'ACRES')?$item->data->space->size->available:($item->data->space->size->available/43560),
					'buildings_sqft' => ($item->data->building->buildings)?array_sum(array_map(function($o) { return $o->size->grossSF; }, $item->data->building->buildings)):0,
					'parent' => [
						'title' => $item->data->building->name,
						'type' => $item->data->building->category,
						'acres' => $item->data->building->lot->totalAcres,
						'zoning' => $item->data->building->lot->zoning,
					],

					'noi'	=> preg_replace("/[^0-9\.]/","",$item->data->sale->financials->netOperatingIncome->amount),
					'cap_rate'	=> preg_replace("/[^0-9\.]/","",$item->data->sale->financials->capRate),
					'lease_exp' => number_format((strtotime($item->data->lease->subleaseExpirationDate) - strtotime('now'))/60/60/24/365,1),
                ];					
				
				if($item->data->space->condo)$loc['subtype'][] = 'condo';							
				$loc['subtype'] = implode(",",$loc['subtype']);

				$loc['agents'] = [];
				if($item->data->agents){
					foreach($item->data->agents as $a){
						$agent = (object)[
							'name'	=> $a->name,
							'phone' => '',
							'email' => '',
							'company' => $a->company->name,
							'license' => '' 
						];

						if($a->contactMethods){
							foreach($a->contactMethods as $m){
								if($m->method == 'PHONE' && !$agent->phone)$agent->phone = $m->value;
								if($m->method != 'PHONE' && !$agent->email)$agent->email = $m->value;
							}
						}
						$loc['agents'][] = $agent;
					}
				}

				//CE doesn't list all children. So we need to handle pulling the children from the database. 
				//In this function we're just creating a child based on the parent info.
				$loc['children'] = [];
				if(strtolower($loc['type']) == 'lease'){
					$loc['sqft'] = ($item->data->space->size->units != 'ACRES')?$item->data->space->size->available:($item->data->space->size->available*43560);
					$loc['acres'] = ($item->data->space->size->units == 'ACRES')?$item->data->space->size->available:($item->data->space->size->available/43560);
				}
				$leaseRate = 0;
				$leaseRatePeriod = $leaseRateSize = '';
				if($item->data->lease && $item->data->lease->askingRent){
					$leaseRate = (float)pick($item->data->lease->askingRent[0]->price->amount->minimum->amount,$item->data->lease->askingRent[0]->price->amount->maximum->amount);				
					$leaseRatePeriod = ($item->data->lease->askingRent[0]->price->period == 'ANNUAL')?'yearly':'monthly';
					$leaseRateSize = ($item->data->lease->askingRent[0]->price->size == 'SF')?'sf':'total';
					if($leaseRateSize == 'total')$leaseRate = ($loc['sqft'])?($leaseRate/$loc['sqft']):0;
					if($leaseRatePeriod == 'monthly'){
						$leaseRate = $leaseRate*12;	
						$leaseRatePeriod = 'yearly';
					}
				}
				$loc['lease_rent'] = number_format((float)$leaseRate,2);

				if(strtolower($loc['type']) == 'lease'){
					$child = (object)[
						'id'			=> $item->data->id,
						'title'			=> $item->data->title,
						'created_on' 	=> $loc['creates_on'],
						'last_update' 	=> dbTimestamp(str_replace('T','',$item->data->modifiedDate->{'$date'})),
						'category'		=> $loc['category'],
						'subtype' 		=> $loc['subtype'],
						'avl_sqft'		=> ($item->data->space->size->units != 'ACRES')?$item->data->space->size->available:($item->data->space->size->available*43560),
						'rate_type'		=> $leaseRatePeriod,
						'lease_type'	=> '',
						'status'		=> ($item->data->availability->status == 'AVAILABLE')?'Active':'Inactive',
						'rate'			=> number_format($leaseRate,2),
						'source'		=> $item->source,
						'parent_id'		=> $item->id,
						'parent_url'	=> $item->url,
					];					
					$loc['children'][] = $child;			
				}										
                break;                
        }
		$loc['full_address'] = "{$loc['address']}, {$loc['city']}, {$loc['state']} {$loc['zip']}";
        $loc['source'] = $item->source;
		$loc['remote_id'] = $item->remote_id;
        $loc['title'] = $item->title;
        $loc['url'] = $item->url;
        $loc['id'] = $item->id;
		$loc['flags'] = $item->flags;
		$loc['expired'] = $item->expired;
		$loc['last_seen'] = $item->last_seen;
		$loc['status'] = ($item->deal_data->status)?$item->deal_data->status:'No Status';
		$loc['lng'] = $item->lng;
		$loc['lat'] = $item->lat;
		$loc['dom'] = (int)xDaysAgo(dbDate(pick($loc['created_on'],$loc['scraped_on'])),dbDate($loc['last_seen']),'');		
		//if($loc['description'])$loc['description_preview'] = strshorten(strip_tags($loc['description']),100);

		if(!$loc['main_img'] && $item->images){
			//uselib('AWS::s3');
			//$s3 = new S3();
			//$loc['main_img'] = $s3->getSignedURL(reset($item->images));        
		}
		
		$loc = standCalcFields($loc);		
        $formatted[] = (object)$loc;
    }
    return $formatted;
}
function standCalcFields($loc){															//Base calculated fields.
	$loc['price_per_sqft'] = ($loc['sqft'])?$loc['price']/$loc['sqft']:0;
	$loc['price_per_acres'] = ($loc['acres'])?$loc['price']/$loc['acres']:0;	
	
	if(!$loc['far'])$loc['far'] = ($loc['sqft'])?($loc['buildings_sqft']/$loc['sqft']):0;

	if(!$loc['noi'] && $loc['cap_rate'] && $loc['price'])$loc['noi'] = ($loc['cap_rate']/100)*$loc['price'];
	if(!$loc['cap_rate'] && $loc['noi'] && $loc['price'])$loc['cap_rate'] = ($loc['noi']/$loc['price'])*100;			

	$loc['building_price_per_sqft'] = ($loc['buildings_sqft'])?$loc['price']/$loc['buildings_sqft']:0;	
	$loc['building_price_per_sqft_rounded'] = round($loc['building_price_per_sqft']);
	if($loc['noi'] && $loc['buildings_sqft'])$loc['building_rent_rate'] = $loc['noi']/$loc['buildings_sqft'];

	if($loc['lease_exp']<0)$loc['lease_exp'] = -1;
	
	$dollars = array('price_per_sqft','price_per_acres','price');
	foreach($dollars as $k)$loc[$k] = formatCurrency($loc[$k]);

	$floats = array('cap_rate','building_rent_rate','acres','far','building_price_per_sqft');
	foreach($floats as $k)if($loc[$k])$loc[$k] = number_format($loc[$k],2);

	$ints = array('noi');
	foreach($ints as $k)if($loc[$k])$loc[$k] = number_format($loc[$k],0);	

	$catKeys = explode(',',$loc['category']);
	$mappedCat = 'Retail';
	if($catKeys){
		foreach($catKeys as $k){
			if($GLOBALS["category_map"][strtolower($k)]){
				$mappedCat = $GLOBALS["category_map"][strtolower($k)];
				break;
			}
		}
	}
	$loc['category_mapped'] = $mappedCat;

	return $loc;
}
function AdvCalcFields($deal){															//Advanced calcualted fields that rely on the cached deals data.
	$res = (object)[];		
	//json($deal);exit;

	//$size = preg_replace("/[^0-9\.]/","",pick($deal->standerized->buildings_sqft,$deal->standerized->sqft));	
	$size = preg_replace("/[^0-9\.]/","",$deal->standerized->buildings_sqft);	
	$price = preg_replace("/[^0-9\.]/","",$deal->standerized->price);
			
	if($size>0 && $price>0){
		if($deal->markets){
			foreach($deal->markets as $market){
				$type = $market->type;		
				if(!$res->{$type})$res->{$type} = (object)[];
				if(!$res->{$type}->market_noi && $market->data->{"Market Rent/SF"}){				
					$rate = preg_replace("/[^0-9\.]/","",$market->data->{"Market Rent/SF"});
					$res->{$type}->market_noi = $size*$rate;				
					$res->{$type}->market_cap_rate = ($res->{$type}->market_noi/$price)*100;
					$res->{$type}->market_rent_rate = number_format($rate,2);
					//err($price);

					$res->{$type}->market_noi = number_format($res->{$type}->market_noi,0);
					$res->{$type}->market_cap_rate = number_format($res->{$type}->market_cap_rate,2);					
				}				
			}
		}
		if($deal->submarkets){ 	
			foreach($deal->submarkets as $market){
				$type = $market->type;			
				if(!$res->{$type})$res->{$type} = (object)[];		
				if(!$res->{$type}->submarket_noi && $market->data->{"Market Rent/SF"}){				
					$rate = preg_replace("/[^0-9\.]/","",$market->data->{"Market Rent/SF"});
					$res->{$type}->submarket_noi = $size*$rate;				
					$res->{$type}->submarket_cap_rate = ($res->{$type}->submarket_noi/$price)*100;
					$res->{$type}->submarket_rent_rate = number_format($rate,2);
					
					$res->{$type}->submarket_noi = number_format($res->{$type}->submarket_noi,0);
					$res->{$type}->submarket_cap_rate = number_format($res->{$type}->submarket_cap_rate,2);
				}
			}
		}	
	}
	return $res;
}
function marketsCalcFields($data){
	if(!$data)return $data;

	if(!is_numeric(stripNumber($data->{'Available SF'})))$data->{'Available SF'} = 0;
	if(!is_numeric(stripNumber($data->{'Existing Buildings'})))$data->{'Existing Buildings'} = 0;
	
	$data->{'Average Building SF'}=number_format(($data->{'Existing Buildings'})?(stripNumber($data->{'Available SF'})/stripNumber($data->{'Existing Buildings'})):0);	
	
	return $data;
}
function stripNumber($v){
	return preg_replace("/[^0-9\.]/","",$v);
}
function stateAbbreviate($state){
	return reset(array_keys(array_filter($GLOBALS["states"],function($a) use($state){ return $a==$state; })));
}
function compareStrings($s1, $s2) {
	//one is empty, so no result
	if (strlen($s1)==0 || strlen($s2)==0) {
		return 0;
	}
	
	$s1 = strtolower($s1);
	$s2 = strtolower($s2);

	//replace none alphanumeric charactors
	//i left - in case its used to combine words
	$s1clean = preg_replace("/[^A-Za-z0-9-]/", ' ', $s1);
	$s2clean = preg_replace("/[^A-Za-z0-9-]/", ' ', $s2);

	//remove double spaces
	while (strpos($s1clean, "  ")!==false) {
		$s1clean = str_replace("  ", " ", $s1clean);
	}
	while (strpos($s2clean, "  ")!==false) {
		$s2clean = str_replace("  ", " ", $s2clean);
	}

	//create arrays
	$ar1 = explode(" ",$s1clean);
	$ar2 = explode(" ",$s2clean);
	$l1 = count($ar1);
	$l2 = count($ar2);

	//flip the arrays if needed so ar1 is always largest.
	if ($l2>$l1) {
		$t = $ar2;
		$ar2 = $ar1;
		$ar1 = $t;
	}

	//flip array 2, to make the words the keys
	$ar2 = array_flip($ar2);


	$maxwords = max($l1, $l2);
	$matches = 0;

	//find matching words
	foreach($ar1 as $word) {
		if (array_key_exists($word, $ar2))
			$matches++;
	}

	return ($matches / $maxwords) * 100;
}
function compareAddresses($addr1, $addr2) {
	$addr1 = strtolower($addr1);
	$addr2 = strtolower($addr2);
    $addr1 = normalizeAddress($addr1);
    $addr2 = normalizeAddress($addr2);

    // Extract house numbers
    $houseNumber1 = extractHouseNumber($addr1);
    $houseNumber2 = extractHouseNumber($addr2);
 
    // Check house numbers	
    if ($houseNumber1 && $houseNumber2 && $houseNumber1 != $houseNumber2) {
		$numberMatch = false;
        return 0;
    }
	else{
		$numberMatch = true;
	}

    // Check the rest of the address
	$res = compareStrings($addr1, $addr2); 
	if($res>=50 && $numberMatch)$res = 100;


    return $res;   
}
function normalizeAddress($address) {
    $replacements = [
        '/\bSt\b\.?/' => 'Street',
        '/\bRd\b\.?/' => 'Road',
        '/\bDr\b\.?/' => 'Drive',
        '/\bAve\b\.?/' => 'Avenue',
        '/\bBlvd\b\.?/' => 'Boulevard',
		'/\bTrl\b\.?/' => 'Trail',
        '/\bS\b\.?/' => 'South',
        '/\bN\b\.?/' => 'North',
        '/\bE\b\.?/' => 'East',
        '/\bW\b\.?/' => 'West'
    ];

    // Perform replacements
    foreach ($replacements as $pattern => $replacement) {
        $address = preg_replace($pattern, $replacement, $address);
    }

    return $address;
}
function extractHouseNumber($address) {
    if (preg_match('/\b\d+\b/', $address, $matches)) {
        return $matches[0];
    }
    return null;
}

//Map
function box2Distance($lat1,$lng1,$lat2,$lng2){
	$distance = (((acos(sin(($lat1*pi()/180)) * sin(($lat2*pi()/180))+cos(($lat1*pi()/180)) * cos(($lat2*pi()/180)) * cos((($lng1 - $lng2)*pi()/180))))*180/pi())*60*1.1515);
    $distance = $distance/2;
	return $distance;
}
function haversineDistance($lat1, $lng1, $lat2, $lng2) {
    $earthRadius = 6371;
    $dLat = deg2rad($lat2 - $lat1);
    $dLng = deg2rad($lng2 - $lng1);
    $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) * sin($dLng / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    $distance = $earthRadius * $c;
    return $distance;
}


//General
function median($arr) {
	$count = count($arr); //total numbers in array
	$middleval = floor(($count-1)/2); // find the middle value, or the lowest middle value
	if($count % 2) { // odd number, middle is the median
		$median = $arr[$middleval];
	} else { // even number, calculate avg of 2 medians
		$low = $arr[$middleval];
		$high = $arr[$middleval+1];
		$median = (($low+$high)/2);
	}
	return $median;
}
function path2url($path,$direct=false){	
	if($direct)
		$url = str_replace($GLOBALS['system']['path'],str_replace("site/","",$GLOBALS['system']['href_base']),$path);
	else
		$url = str_replace($GLOBALS['system']['path'],$GLOBALS['system']['href_base'],$path);
	
	$url = preg_replace("/\/+/","/",$url);
	if($direct) $url = $GLOBALS['site']['url'].$url;
	return $url;
}
function url2path($url){	
	$url = urldecode($url);
	if(strpos($url,'http') !== false){
		$str = str_replace($GLOBALS['system']['upload_href_abs'],$GLOBALS['system']['upload_path'],$url);
	}
	else{
		$str = str_replace($GLOBALS['system']['upload_href'],$GLOBALS['system']['upload_path'],$url);
	}
	return $str;	
}
function html2png($html,$out){	
	$temp = $GLOBALS['system']['tmp_path'].'/'.uniqid().'.html';
	file_put_contents($temp, $html);
	$cmd = $GLOBALS['system']['phantom_path']."/phantomjs-2.1.1-linux-x86_64/bin/phantomjs {$GLOBALS['system']['phantom_path']}/html2png.js '$temp' '$out'";
	//t($cmd,1);
	exec($cmd,$output);
	//t($output,1);
	unlink($temp);
	return $out; 
}
function html2pdf($html,$out){	
	$temp = $GLOBALS['system']['tmp_path'].'/'.uniqid().'.html';
	file_put_contents($temp, $html);
	$cmd = $GLOBALS['system']['phantom_path']."/phantomjs-2.1.1-linux-x86_64/bin/phantomjs {$GLOBALS['system']['phantom_path']}/html2pdf.js '$temp' '$out'";
	//t($cmd,1);
	exec($cmd,$output);
	//t($output,1);
	unlink($temp);
	return $out; 
}
function getJsonPathValue($obj, $path) {
	foreach(explode('/', $path) as $key) {
		if(strlen($key)){
			if(is_array($obj))$obj = $obj[$key];							
			else $obj = $obj->$key;
		}
	}
	return $obj;
}

//General
function waitForMe(){
	if(php_sapi_name() !== 'cli' || !defined('STDIN') )return;
	
	echo "Waiting for input...";
	$handle = fopen ("php://stdin","r");
	$line = fgets($handle);	
	fclose($handle);		
}
function errorlog($type,$source,$msg){
	mysql_query("INSERT INTO log_errors (`user_id`,`type`,`source`,`msg`) VALUES ('{$_SESSION['user']->id}','$type','".mysql_real_escape_string($source)."','".mysql_real_escape_string($msg)."')");	
}
function includeWidget($widget, $params=array()){	
	$_REQUEST = $params;
	global $pagedata;
	$path = explode("::",$widget);
	
	$template = 'index.phtml';
	$file = array_pop($path);
	
	if(strpos($file,"~")===0){
		$template = $file.'.phtml';		
		$file = array_pop($path);
	}	
	
	$path = implode("/",$path);
	
	$widgetdata = array();
	$widgetdata['js'] = array();

	$template = $GLOBALS['widgets']['template_path'] . "/" . $path . "/" . $file . "/" . $template;	
	if(!file_exists($template)){
		$template = $GLOBALS['widgets']['template_path'] . "/" . $path . "/$file.phtml";
	}
	$widgetdata['content'] = $template;

	$js = $GLOBALS['widgets']['js_path'] . "/"  . $path . "/$file.js";		
	if(file_exists($js)){ $widgetdata['js'][] = $GLOBALS['widgets']['js_href'] . "/" . $path . "/$file.js".'?'.filemtime($js); }
	else{
		$js = $GLOBALS['widgets']['js_path'] . "/"  . $path . "/$file/index.js";		
		if(file_exists($js)){ $widgetdata['js'][] = $GLOBALS['widgets']['js_href'] . "/" . $path . "/$file/index.js".'?'.filemtime($js); }
	}	
	foreach($widgetdata['js'] as $js){
		foreach($widgetdata['js'] as $k=>$file){ $widgetdata['js'][$k] = $file; }
	}
	
	$script = $GLOBALS['widgets']['script_path'] . "/" . $path . "/$widget.php";
	if(file_exists($script)){ $widgetdata['script'] = $script; }
	
	if( $widgetdata['script'])
		include_once $widgetdata['script'];
	include_once $widgetdata['content'];

	$pagedata['js_default'] = array_merge($widgetdata['js'],$pagedata['js_default']);		
}
function mapTemplate($template){
	$template = explode("::",$template);
	$file = array_pop($template).'.phtml';
	return $GLOBALS['system']['template_path'].'/'.implode("/",$template).'/'.$file;
}
function includeTemplate($template){
	include mapTemplate($template);
}
function uselib($lib){
	$lib = explode("::",$lib);
	$file = array_pop($lib).'.lib.php';

	include_once($GLOBALS['system']['lib_path'].'/'.implode("/",$lib).'/'.$file);
}
function usehelper($helper){
	$helper = explode("::",$helper);
	$file = array_pop($helper).'.php';	
	include_once($GLOBALS['system']['helper_path'].'/'.implode("/",$helper).'/'.$file);
}
function t($var,$live=false,$readable=false){
	if($readable){
		print $var."\n";
	}
	else{
		print '<pre>';
		var_dump($var);
		print '</pre>';
	}	
	if(!$live)
		exit;
}
function sql($sql,$msg='ok',$silent=false){
	if(gettype($msg) == 'boolean'){ $silent = $msg; $msg='ok'; }
	
	mysql_query($sql);
	$error = mysql_error();
	if($error){
		err($error);
	}
	else{	
		if(!$silent)	
			print json_encode(array('success'=>$msg));
	}
}
function json($data=''){
	if(empty($data)){
		$data = array('success'=>'ok');
	}
	$error = mysql_error();
	if(empty($error)){ print json_encode($data); }
	else{ err($error); }	
}
function err($msg,$ajax=1){	
	if($ajax){
		print json_encode(array('error'=>$msg));
	}
	else{
		displayError($msg);
	}
	exit;
}
function errs($errors,$ajax=1){	
	if(is_array($errors))$errors = array_filter($errors);	
	if(!$errors)return;
	
	if($ajax){				
		print json_encode(array('errors'=>$errors));
	}
	else{
		if(is_array($errors)){
			displayError(implode('<br>',$errors));
		}
		else{
			err($errors,0);
		}
	}
	exit;
}
function displayError($msg){
	print '<div class="alert alert-danger">'.$msg.'</div>';
}
function r($id,$msg,$error=false){
	if($error){ $type = 'error'; }
	else{ $type = 'message'; }		
}
function objectToArray($d){
	if (is_object($d)){ $d = get_object_vars($d); } 
	if (is_array($d)){ return array_map(__FUNCTION__, $d); }
	else { return $d; }
}
function arrayToObject($d){
	if (is_array($d)){ return (object) array_map(__FUNCTION__, $d); }
	else{ return $d; }
}
function email($emails,$subject,$message,$attachments=array(),$from='',$from_email=''){
	if($emails && !is_array($emails)) $emails = array($emails);
	if($attachments && !is_array($attachments)) $attachments = array($attachments);
	if(!$emails) return false;
	if(!$from){ $from = $GLOBALS['site']['title']; }
	if(!$from_email){ $from_email = $GLOBALS['emails']['from_email']; }
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";	
	$headers .= 'From: '.$from.' <'.$from_email.'>' . "\r\n";	
	
	$message = str_replace("\\r","",$message);
	$message = str_replace("\\n","",$message);
	$message = stripslashes($message);	
		
	//return mail($emails,$subject,$message, $headers);	
	//return mail('gontham@hotmail.com',$subject,$message, $headers);
	
	return sendgrid(array(
		'emails'=>$emails,
		'subject'=>$subject,
		'body'=>$message,
		'attachments'=>$attachments,
		'from'=>$from_email,
		'replyTo'=>$from_email,
		'fromName'=>$from 
	));		
	/*
	if($GLOBALS['emails']['smtp_host'])
		return smtp($emails,$subject,$message,$from,$from_email);		
	else
		return mail(implode(",",$emails),$subject,$message, $headers);	
	*/
}
function sendgrid($data){
	require_once("php/lib/sendgrid-php/sendgrid-php.php");
	
	$sendgrid = new SendGrid($GLOBALS['SETTINGS']['sendgrid_key']);
	$email    = new SendGrid\Email();

	if(!$from_name)$from_name=$from;
	
	$emails = $data['emails'];
	if(!$emails)return false;
	if(!is_array($emails))$emails = array($emails);
	
	$email->setTos($emails);
	//$email->setTos(array('gontham@hotmail.com'));	
	if($data['from'])$email->setFrom($data['from']);
	if($data['fromName'])$email->setFromName($data['fromName']);
	if($data['replyTo'])$email->setReplyTo($data['replyTo']);
	if($data['subject'])$email->setSubject($data['subject']);	
	foreach($data['attachments'] as $a)$email->addAttachment($a);
		
	if($data['body'])$email->setHtml($data['body']);
	
	$sendgrid->send($email);
	return true;
}
function smtp($emails=array(),$subject='',$message='',$from='',$from_email=''){	
	include_once 'lib/PHPMailer/PHPMailerAutoload.php';			
	$mail = new PHPMailer;
	
	if(!is_array($emails))$emails=array($emails);
		
	$mail->isSMTP();                                     		 // Set mailer to use SMTP
	$mail->Host = $GLOBALS['emails']['smtp_host'];			 // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                              		 // Enable SMTP authentication
	$mail->Username = $GLOBALS['emails']['smtp_username'];      // SMTP username
	$mail->Password = $GLOBALS['emails']['smtp_password'];      // SMTP password
	//$mail->SMTPSecure = 'tls';                            		 // Enable encryption, 'ssl' also accepted	
	//$mail->SMTPDebug  = 2;
	
	$mail->From = ($from_email)?$from_email:$GLOBALS['emails']['from_email'];
	$mail->FromName = ($from)?$from:$GLOBALS['emails']['from'];
	foreach($emails as $to)
		$mail->addAddress($to);
		
	$mail->isHTML(true);                                  // Set email format to HTML
	
	$mail->Subject = $subject;
	$mail->Body    = $message;
	$res = $mail->send();	
	

	if(!$res) {		
		return false;
	} else {
		return true;
	}
}
function loadTemplateFile($file=''){
	$file = $GLOBALS['system']['template_path'].$file;	
	if(file_exists($file)){
		ob_start();
		include $file;
		$output = ob_get_clean();
	}
	return $output;
}
function strshorten($str,$len,$suffix='...'){	
	if(strlen($str)>$len){
		return substr($str,0,$len).$suffix;
	}
	else{
		return $str;
	}
}
function formatDate($timestamp,$format=''){	
	if(!$timestamp || strpos("0000-00-00",$timestamp)!==false)return '';
	if(!$format)$format = $GLOBALS['SETTINGS']['date_format_compact'];	
	return date($format,strtotime($timestamp));
}
function dbtimestamp($timestamp){
	if(!$timestamp || strpos("0000-00-00",$timestamp)!==false) return false;
	return date('Y-m-d H:i:s',strtotime($timestamp));
}
function dbdate($timestamp){
	if(!$timestamp || strpos("0000-00-00",$timestamp)!==false) return false;
	return date('Y-m-d',strtotime($timestamp));
}
function getUser($userID){
	$query = mysql_query("SELECT * FROM `users` WHERE `id` ='".$userID."'");
	return mysql_fetch_assoc($query);
}
function xTimeAgo ($oldTime, $newTime, $suffix='ago') {
	$timeCalc = strtotime($newTime) - strtotime($oldTime);
	if ($timeCalc > (60*60*24)) {$timeCalc = round($timeCalc/60/60/24) . " days $suffix"; }
	else if ($timeCalc > (60*60)) {$timeCalc = round($timeCalc/60/60) . " hours $suffix"; }
	else if ($timeCalc > 60) {$timeCalc = round($timeCalc/60) . " minutes $suffix"; }
	else if ($timeCalc > 0) {$timeCalc .= " seconds $suffix"; }
	return $timeCalc;
}
function xHoursAgo ($oldTime, $newTime, $suffix='ago') {
	$timeCalc = strtotime($newTime) - strtotime($oldTime);	
	$timeCalc = number_format($timeCalc/60/60,1) . " $suffix";	
	return $timeCalc;
}
function xDaysAgo ($oldTime, $newTime, $suffix='ago') {
	$timeCalc = strtotime($newTime) - strtotime($oldTime);	
	$timeCalc = $timeCalc/60/60/24 . " $suffix";	
	return $timeCalc;
}
function pathUrl($path,$direct=false){	
	if($direct)
		return str_replace($GLOBALS['system']['path'],str_replace("site/","",$GLOBALS['system']['href_base']),$path);
	else
		return str_replace($GLOBALS['system']['path'],$GLOBALS['system']['href_base'],$path);
}
function pick($var1,$var2){
	return ($var1)?$var1:$var2; 
}
function curl_get($url,$headers=array(),$proxy=true,$useragent='',$returnHeader=false,$timeout=30,$sourceId=''){	
	if($proxy){
		if(!is_string($proxy)) $proxy = getProxy();
	}

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HEADER, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($curl, CURLOPT_ENCODING, '');

	if($proxy)curl_setopt($curl, CURLOPT_PROXY, $proxy);
	if($useragent)curl_setopt($curl, CURLOPT_USERAGENT,$useragent);
	if($headers)curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT ,$timeout);
	curl_setopt($curl, CURLOPT_TIMEOUT, $timeout); //timeout in seconds
	$response = curl_exec($curl);

	$header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
	$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	$header = substr($response, 0, $header_size);
	$response = substr($response, $header_size);
	
	//t("Proxy: $proxy",1);
	//t($header,1);
	//t($response,1);
	//t(curl_error($curl),1);

	curl_close($curl);


	logTraffic($url,$proxy,$httpcode,'',$sourceId);

	if($returnHeader){
		return array($response,$header);
	}
	else{
		return $response;
	}	
}
function curl_post($url,$data,$headers=array(),$proxy=true,$useragent='',$returnHeader=false,$sourceId=''){	
	if($proxy){
		if(!is_string($proxy)) $proxy = getProxy();
	}
	
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HEADER, true);
	#curl_setopt($curl, CURLOPT_POST, count($data));
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_ENCODING, '');	

	if($proxy)curl_setopt($curl, CURLOPT_PROXY, $proxy);
	if($useragent)curl_setopt($curl, CURLOPT_USERAGENT,$useragent);
	if($headers)curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

	//curl_setopt($curl, CURLOPT_CONNECTTIMEOUT ,10);
	//curl_setopt($curl, CURLOPT_TIMEOUT, 10); //timeout in seconds

	$response = curl_exec($curl);
	
	$header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
	$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	$header = substr($response, 0, $header_size);
	$response = substr($response, $header_size);
	
	//t($header,1);

	curl_close($curl);

	logTraffic($url,$proxy,$httpcode,'',$sourceId);

	if($returnHeader){
		return array($response,$header);
	}
	else{
		return $response;
	}	
}

function pw_get($url,$headers=array(),$proxy=true,$script='lwp.js',$addargs=array()){
	//if($proxy)$proxy = getProxy();	
	$app = "node {$GLOBALS['system']['playwright']}/".$script;
	$args = array(
			'url'	=> $url,			
			'dataType' => $dataType,
	);
	foreach($addargs as $k=>$v)$args[$k]=$v;
	if($proxy){
		if(is_string($proxy)) $args['proxy'] = $proxy;
		else $args['proxy']=getProxy();
	}
	if($headers)$args['headers']=base64_encode(json_encode($headers));
	$logProxy = $args['proxy'];
	$args = json_encode($args);

	$timeout = 300;
	if($addargs['timeout']>0)$timeout = $addargs['timeout'];

	#$cmd = "ulimit -u 10000; timeout 300s {$app} '{$args}'";
	$cmd = "timeout {$timeout}s {$app} '{$args}'";
	if($_REQUEST['debug'])t($cmd,1);
	//t($cmd,1);

	exec($cmd,$res);

	$res = implode(" ",$res);
	//t($res);

	preg_match("/RES_CONTENT:(.*)/",$res,$matches);

	return $matches[1];
}
function node_get($url,$headers=array(),$proxy=true,$script='lwp.js',$addargs=array()){
	//if($proxy)$proxy = getProxy();	
	$app = "node {$GLOBALS['system']['node']}/".$script;
	$args = array(
			'url'	=> $url,			
			'dataType' => $dataType,
	);
	foreach($addargs as $k=>$v)$args[$k]=$v;
	if($proxy){
		if(is_string($proxy)) $args['proxy'] = $proxy;
		else $args['proxy']=getProxy();
	}
	if($headers)$args['headers']=base64_encode(json_encode($headers));
	$logProxy = $args['proxy'];
	$args = json_encode($args);

	$timeout = 300;
	if($addargs['timeout']>0)$timeout = $addargs['timeout'];

	#$cmd = "ulimit -u 10000; timeout 300s {$app} '{$args}'";
	$cmd = "timeout {$timeout}s {$app} '{$args}'";
	if($_REQUEST['debug'])t($cmd,1);
	//t($cmd,1);

	exec($cmd,$res);

	$res = implode(" ",$res);
	//t($res);

	preg_match("/RES_CONTENT:(.*)/",$res,$matches);

	return $matches[1];
}
function logTraffic($url,$proxy,$code=0,$res='',$sourceId=''){
	$subdomain = parse_url($url, PHP_URL_HOST);
	$parts = explode(".",$subdomain);
	$domain = $parts[count($parts)-2].'.'.$parts[count($parts)-1];	
	$res = mysql_real_escape_string(substr($res,0,255));	
			
	mysql_query("INSERT INTO traffic_log SET domain='{$domain}', subdomain='{$subdomain}',url='{$url}',code='{$code}',proxy='{$proxy}', res='{$res}', source_id='{$sourceId}'");
}
function updateTrafficLog($uId,$res){
	$res = mysql_real_escape_string($res);
	t("UPDATE traffic_log SET source_res='{$res}' WHERE source_id='{$uId}'",1);
	mysql_query("UPDATE traffic_log SET source_res='{$res}' WHERE source_id='{$uId}'");
}
function getProxy($type=''){
	$wheresql = array("status=1");
	if($type)$wheresql[] = "type='{$type}'";

	$q = mysql_query("SELECT proxy FROM proxies WHERE ".implode(" AND ",$wheresql)." ORDER BY rand()");
	//$q = mysql_query("SELECT proxy FROM proxies WHERE status=2 ORDER BY rand()");
	list($proxy) = mysql_fetch_array($q);	
	
	if (php_sapi_name() == "cli"){		
		t($proxy,1);		
	}

	//t($proxy,1);
	return $proxy;
}
function notifyme($subject,$message,$email='gontham.inc@gmail.com'){	
	$headers = 'From: botapp@botapp2.com' . "\r\n" .
			'Reply-To: botapp@botapp2.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
	//$message = 'Inventory is updated';
	
	$res = mail($email,$subject,$message,$headers);		
	if(!$res){
		//t('a',1);
		$res = smtp($email,$subject,$message);
	}
	return $res;
}
function getIP(){
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	return $ip;
}