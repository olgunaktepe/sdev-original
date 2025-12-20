<?php
uselib('scrapers::crexi');
uselib('twilio::twilio');

Class Contacts{
    public function __construct(){
        $this->dl = new Deal();
        $this->twilio = new Twilio();
    }

    public function identifyPhone($number,$twilioLookup=true){
        $number = Twilio::strip($number);        
        $items = ['number'=>'+1'.$number, 'local'=>[],'remote'=>[]];


        $ownNumber = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_numbers WHERE number='+1{$number}'"));
        if($ownNumber){
            $items['local'][] = [
                'name'  => stripslashes($ownNumber['title']),
                'own'   => 1,                
                'company'  => 'SDEV',
                'source'  => '',                
            ];
        }
        else{
            $number = Twilio::strip($number);
            $q = mysql_query("SELECT c.*,l.title AS listing_title FROM deals_contacts_entries AS e 
                                LEFT JOIN deals_contacts AS c ON e.contact_id=c.id
                                LEFT JOIN listings AS l ON l.id=c.listing_id
                                WHERE e.type='phone' AND e.value='{$number}' 
                                GROUP BY c.id");
            while($r = mysql_fetch_assoc($q)){
                $items['local'][] = [
                    'name'  => stripslashes($r['name']),
                    'company'  => stripslashes($r['company']),
                    'source'  => $r['source'],
                    'listing_id' => $r['listing_id'],
                    'listing_title' => stripslashes($r['listing_title']),
                ];
            }
    
            if($twilioLookup){
                $res = $this->twilio->lookup($number);            
                if($res){                
                    $items['remote'][] = [
                        'name'  => $res->caller->caller_name,                    
                        'company'  => $res->caller->caller_type,
                        'source'  => 'Caller ID',
                        'type' => $res->carrier->type,
                        'carrier' => $res->carrier->name,
                    ];  
                }            
            }  
        }

              
        return $items;
    }

    public function removeContact($id){
        mysql_query("DELETE FROM deals_contacts WHERE id='{$id}'");
        mysql_query("DELETE FROM deals_contacts_entries WHERE contact_id='{$id}'");
    }
    public function getDealContacts($listingId){     
        $items = $this->loadDealContacts($listingId);        
        if($items){
            $response = (object)['data'=>$items,'error'=>false];
        }
        else{
            ob_start();
            $response = $this->fetchDealContacts($listingId);
            ob_end_clean();
            $items = $this->loadDealContacts($listingId);
            $response = (object)['data'=>$items,'error'=>$response->error];
        }


        if($items){
            $response->agents = [];
            $response->vendors = [];
            foreach($items as $item){
                if(in_array(strtolower($item->type),['listing agent'])) $response->agents[] = $item;
                else $response->vendors[] = $item;
            }
        }

        return $response;
    }
    public function fetchDealContacts($listingId){            //From Source        
        $deal = $this->dl->getDeal($listingId);  
        $response = (object)['data'=>[],'error'=>false];

        t('fetching...',1);
        
        $items = [];
        switch($deal->listing->source){
            case 'loopnet.com':
                $cr = new Crexi();
                $agents = $deal->listing->data->Contacts;
                if($agents){                    
                    foreach($agents as $agent){                                                
                        $item = [                                
                                'listing_id' => $listingId,
                                'source' => $deal->listing->source,
                                'remote_id' => $agent->ContactId,
                                'type' => 'Listing Agent',
                                'name' => $agent->Name,
                                'company' => $agent->CompanyName,
                                'address' => $agent->Address->DeliveryAddress,
                                'city' => $agent->Address->City,
                                'state' => $agent->Address->State,
                                'zip' => $agent->Address->PostalCode,
                                'license' => '',
                                'data' => '',
                                'entries' => [
                                    ['type'=>'phone','value'=>Twilio::strip($agent->Phones->PH)],
                                    ['type'=>'email','value'=>trim($agent->Email)],
                                ]                          
                        ]; 
                        if($item['entries'][0]['value'] || $item['entries'][1]['value']){
                            $items[] = $item;
                        }
                    }
                }
                break;
            case 'crexi.com':
                $cr = new Crexi();
                $agents = $deal->listing->data->broker;
                if($agents){
                    $cr = new Crexi();                    
                    if(!$cr->login()){ $response->error = 'Unable to login to Crexi'; return $response; }
                    foreach($agents as $agent){
                        if(!$agent->publicProfileId)continue;
                        $res = $cr->getBrokerProfile($agent->publicProfileId);
                        if(!$res->userId) $res = $cr->getBrokerProfile($agent->publicProfileId);
                        if(!$res->userId) continue;                        
                        
                        $items[] = [                                
                                'listing_id' => $listingId,
                                'source' => $deal->listing->source,
                                'remote_id' => $res->publicProfileId,
                                'type' => 'Listing Agent',
                                'name' => implode(" ",[$res->firstName,$res->lastName]),
                                'company' => $res->brokerage->name,
                                'address' => $res->brokerage->location->address,
                                'city' => $res->brokerage->location->city,
                                'state' => $res->brokerage->location->state->code,
                                'zip' => $res->brokerage->location->zip,
                                'license' => implode(" | ",$res->licenseNumbers),
                                'data' => json_encode($res),
                                'entries' => [
                                    ['type'=>'phone','value'=>Twilio::strip($res->phone)]
                                ]                          
                        ];                                                    
                    }
                }
                break;
            default:
                $response->error = 'Not supported';                
                break;
        }
        
        foreach($items as $item){
            list($oldId) = mysql_fetch_array(mysql_query("SELECT * FROM deals_contacts WHERE source='{$item['source']}' AND remote_id='{$item['remote_id']}'"));                                        
            $entries = $item['entries'];
            unset($item['entries']);

            $updatesql = [];
            foreach($item as $k=>$v)$updatesql[] = "`$k` = '".mysql_real_escape_string($v)."'";

            if($oldId){
                $sql = "UPDATE deals_contacts SET ".implode(",",$updatesql)." WHERE id='{$oldId}'";
            }
            else{
                $sql = "INSERT INTO deals_contacts SET ".implode(",",$updatesql);
            }
            mysql_query($sql);
            if(!$oldId)$oldId = mysql_insert_id();
            if(!$oldId){ $response->error = mysql_error(); return $response; }

            foreach($entries as $e){
                if(!trim($e['value']))continue;
                mysql_query("INSERT INTO deals_contacts_entries SET contact_id='{$oldId}', type='{$e['type']}', value='{$e['value']}'");
            }            
        }
        $response->data = $items;
        return $response;        
    }
    public function loadDealContacts($listingId){             //From DB
        $items = [];

        $q = mysql_query("SELECT * FROM deals_contacts WHERE listing_id='{$listingId}'");
        while($r = mysql_fetch_assoc($q)){            
            $items[] = $this->formatContact($r);
        }
        return $items;
    }
    function formatContact($r){
        if(!$r['name']) $r['name'] = 'No Name';
        $r['entries'] = $this->getContactEntries($r['id']);
        $r['stats'] = $this->formatContactStats($r);
        $r['data'] = json_decode($r['data']);
        if($r['listing_id']){
            $d = new Deal();
            $r['listing'] = $d->getStanderizedListing($r['listing_id']);
        }
        return (object)$r;
    }
    public function loadDealContact($id){
        $q = mysql_query("SELECT * FROM deals_contacts WHERE id='{$id}'");
        $r = mysql_fetch_assoc($q);
        if(!$r)return false;
        return $this->formatContact($r);
    }
    public function formatContactStats($r){
        $data = json_decode($r['data']);
        $stats = (object)[];

        switch($r['source']){
            case 'crexi.com':
                $stats->sold = $data->closedAssetsStats->number;
                $stats->sold_value = $data->closedAssetsStats->value;
                $stats->sold_sqft = $data->closedAssetsStats->squareFootage;

                $stats->active = $data->activeAssetsStats->number;
                $stats->active_value = $data->activeAssetsStats->value;
                $stats->active_sqft = $data->activeAssetsStats->squareFootage;

                $stats->specialty = $data->specialityAssetType;
                break;
            default:
                break;
        }
        return $stats;
    }
    public function getContactEntries($cId){
        $items = [];

        $q = mysql_query("SELECT * FROM deals_contacts_entries WHERE contact_id='{$cId}'");
        while($r = mysql_fetch_assoc($q)){
            $items[] = (object)$r;
        }
        return $items;
    }
}