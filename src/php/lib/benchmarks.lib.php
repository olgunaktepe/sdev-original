<?php
uselib('deal');

Class Benchmarks{
    private $dl;
    public function __construct(){
        $this->dl = new Deal();
    }


    
    public function getZHVI($zip,$levels=['zip','city','county','metro','state','national']){
        $bms = [];

        $zipData = mysql_fetch_assoc(mysql_query("SELECT * FROM zillow_zhvi WHERE region_name='{$zip}' AND region_type='zip'"));
        $zipData['data'] = json_decode($zipData['data'],true);    
        $res = reset($this->dl->calculateMonthlyTrends($zipData['data'],[10]));         
        $bms['Zip'] = (object)['title'=>$zip,'current'=>$this->calcDeltas([end($zipData['data'])]),'trends'=>$this->calcDeltas([$res['p']])];        
        
        if(in_array('city',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zhvi WHERE city='{$zipData['city']}' AND state='{$zipData['state']}' AND region_type='zip'");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);                
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }                          
            if($trends)$bms['City'] = (object)['title'=>$zipData['city'],'current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)];
        }
        
        if(in_array('county',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zhvi WHERE county='{$zipData['county']}' AND state='{$zipData['state']}' AND region_type='zip'");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }  
            if($trends)$bms['County'] = (object)['title'=>$zipData['county'],'current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)];
        }

        if(in_array('metro',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zhvi WHERE metro='{$zipData['metro']}' AND state='{$zipData['state']}' AND region_type='zip'");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }  
            if($trends)$bms['Metro'] = (object)['title'=>$zipData['metro'],'current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)];       
        }
        
        if(in_array('state',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zhvi WHERE state='{$zipData['state']}' AND region_type='zip'");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }  
            if($trends)$bms['State'] = (object)['title'=>$zipData['state'],'current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)];
        }
        
        
        if(in_array('national',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zhvi WHERE region_type='zip'");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }            
            if($trends)$bms['National'] = (object)['title'=>'National','current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)]; 
        }
                
        return $bms;
    }

    //ZORI
    public function getZORI($zip,$levels=['zip','metro','state','national']){
        $bms = [];

        $zipData = mysql_fetch_assoc(mysql_query("SELECT * FROM zillow_zori WHERE region_name='{$zip}'"));
        $zipData['data'] = json_decode($zipData['data'],true);              
        if(!$zipData['data'])return false;
        $res = reset($this->dl->calculateMonthlyTrends($zipData['data'],[10]));          
        $bms['Zip'] = (object)['title'=>$zip,'current'=>$this->calcDeltas([end($zipData['data'])]),'trends'=>$this->calcDeltas([$res['p']])];             
        
        list($city,$state) = explode(', ',$zipData['msa_name']);    
                
        if(in_array('metro',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zori WHERE msa_name='{$zipData['msa_name']}'");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));                
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }              
            if($trends)$bms['Metro'] = (object)['title'=>$zipData['msa_name'],'current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)];                   
        }
        
        if($state && in_array('state',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zori WHERE msa_name LIKE '%, {$state}'");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }  
            if($trends)$bms['State'] = (object)['title'=>$state,'current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)];
        }
        
        
        if(in_array('national',$levels)){
            $trends = [];
            $current = [];
            $q = mysql_query("SELECT * FROM zillow_zori WHERE msa_name<>''");
            while($r = mysql_fetch_assoc($q)){
                $r['data'] = json_decode($r['data'],true);
                $res = reset($this->dl->calculateMonthlyTrends($r['data'],[10]));
                if($res['p'])$trends[] = $res['p'];
                if(end($r['data']))$current[] = end($r['data']);
            }            
            if($trends)$bms['National'] = (object)['title'=>'National','current'=>$this->calcDeltas($current,$bms['Zip']->current),'trends'=>$this->calcDeltas($trends,$bms['Zip']->trends)]; 
        }
                
        return $bms;
    }



    //General
    private function calcDeltas($list,$comps=false){
        $res = [];                        
        sort($list);
        
        $res = [
            'min'       => min($list),
            'max'       => max($list),
            'median'    => median($list),
            'average'   => array_sum($list)/count($list),                          
        ];

        if($comps){
            foreach($res as $k=>$v){                
                $delta = $v-$comps[$k];
                $res[$k.'_delta'] = $delta;                
            }
        }                
        return $res;
    }    
    private function normalize($value, $min, $max) {
	    $normalized = ($value - $min) / ($max - $min);
	    return $normalized;
    }




}