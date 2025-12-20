<?php
require __DIR__ . '/voice-javascript-sdk-quickstart-php-main/vendor/autoload.php';
require __DIR__ . '/voice-javascript-sdk-quickstart-php-main/randos.php';

use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;
use Twilio\Rest\Client;
use Twilio\TwiML\VoiceResponse;

class Twilio {	

	public $settings;

	public function __construct($user=false) {
        $this->settings = (object)[
            'token'         => $GLOBALS['SETTINGS']['twilio_token'],            
            'secret'        => $GLOBALS['SETTINGS']['twilio_secret'],
            'sid'           => $GLOBALS['SETTINGS']['twilio_sid'],
            'app_sid'       => $GLOBALS['SETTINGS']['twilio_app_sid'],
            'auth_token'    => $GLOBALS['SETTINGS']['twilio_auth_token'],
            'url'           => $GLOBALS['SETTINGS']['twilio_setup_url']
        ];
                
        $this->client = new Client($this->settings->sid, $this->settings->auth_token);                        
    }
    public function getTwimlClient(){
        return new VoiceResponse();
    }
    public function refreshToken($username){
        $access_token = new AccessToken($this->settings->sid, $this->settings->token, $this->settings->secret,3600,$username);
        
        // Create Voice grant
        $voiceGrant = new VoiceGrant();
        $voiceGrant->setOutgoingApplicationSid($this->settings->app_sid);
        
        // Optional: add to allow incoming calls
        $voiceGrant->setIncomingAllow(true);
        
        // Add grant to token
        $access_token->addGrant($voiceGrant);
        
        // render token to string
        $token = $access_token->toJWT();
    
        json([
            'username' => $username,
            'token' => $token,
        ]);
    }
    public function getActiveUsers(){                                               //Need to change this logic to return users with active Twilio connections.
        $items = [];
        $q = mysql_query("SELECT * FROM users WHERE status=1");
        while($r = mysql_fetch_assoc($q)) $items[] = (object)$r;
        return $items;
    }

    public function getNumber($id){
        $item = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_numbers WHERE id='{$id}'"));
        if(!$item)return false;

        return $this->formatNumber($item);
    }
    public function getNumberByNumber($number){
        $item = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_numbers WHERE number='{$number}'"));
        if(!$item)return false;

        return $this->formatNumber($item);
    }
    public function getNumberBySid($sid){
        $item = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_numbers WHERE remote_id='{$sid}'"));
        if(!$item)return false;

        return $this->formatNumber($item);
    }
    public function getNumberAssignedType($id){
        $res = mysql_fetch_assoc(mysql_query("SELECT ut.title, t.type_id FROM twilio_numbers_types AS t 
                                                LEFT JOIN users_types AS ut ON ut.id = t.type_id 
                                                WHERE t.number_id='{$id}'"));
        return ($res)?(object)$res:false;
    }
    public function formatNumber($r){
        $r['title'] = stripslashes($r['title']);
        $r['call_tags'] = explode(',',$r['call_tags']);
        $r['title_preview'] = strshorten($r['title'],50);
        $r['voicemail_text'] = stripslashes($r['voicemail_text']); 
        $r['assigned_type'] = $this->getNumberAssignedType($r['id']);

        return (object)$r;
    }

    public function releaseNumber($sid){
        if(!$sid)return false;

        $res = false;
        try{
            $this->client->incomingPhoneNumbers($sid)->delete();            
            $res = true;
        } catch (Services_Twilio_RestException $e) { 
            //$this->error($e->getMessage());
            return false;
        }

        if($res){
            mysql_query("UPDATE twilio_numbers SET active=0 WHERE remote_id='{$sid}'");
        }
        return $res;
    }
    public function buyNumber($number){
        if(!$number) return false;

        $res = false;
        try{
            $response = $this->client->incomingPhoneNumbers->create(["phoneNumber" => $number]);
			
	    	$res = (object)[
                'id'        => $response->sid,
                'number'    => $response->phoneNumber               
            ];			
		} catch (Services_Twilio_RestException $e) { 
            //$this->error($e->getMessage());
            return false;
        }
        if(!$res->id)return false;
        
        $this->configureNumberURLs($res->id);
        $formatted = $this->format($res->number);

        mysql_query("INSERT INTO twilio_numbers SET 
                    remote_id = '{$res->id}',
                    number = '{$res->number}',                    
                    title = '{$formatted}'");        
        return $res;
    }
    public function getAvailableNumber($areacode,$country='US'){       
		$res = false;
		try{
            $numbers = $this->client->availablePhoneNumbers($country)
                        ->local
                        ->read(["smsEnabled" => True, "voiceEnabled" => True, "areaCode" => $areacode], 1);

			foreach($numbers as $n) { 
	    		$res = (object)[
                    'id'        => $n->phoneNumber,
                    'number'    => $n->friendlyName,
                    'city'      => $n->locality,
                    'state'     => $n->region
                ];
			}	
		} catch (Services_Twilio_RestException $e) { 
            //$this->error($e->getMessage());
        }
        
		return $res;
	}
    public function configureNumberURLs($sid){
        if(!$sid)return false;

        $res = $this->client->incomingPhoneNumbers($sid)->update([
            "voiceUrl" => $this->settings->url,
            "smsUrl" => $this->settings->url
        ]);

        return ($res->sid)?true:false;
    }
    public function loadActiveNumbers($userTypeId=0){
        $items = [];

        $wheresql = ["n.active=1"];
        if($userTypeId > 2){
            $wheresql[] = "t.type_id = '{$userTypeId}'"; 
        }

        $q = mysql_query("SELECT n.* FROM twilio_numbers AS n 
                    LEFT JOIN twilio_numbers_types AS t ON t.number_id=n.id 
                    WHERE ".implode(" AND ",$wheresql));
        while($r = mysql_fetch_assoc($q)){
            $items[] = (object)$r;
        }
        return $items;
    }
    public static function getAssignedNumbersByUserType($tId){
        $items = [];

        $wheresql = ["1=1"];
        if($tId > 2){
            $wheresql[] = "t.type_id = '{$tId}'"; 
        }
        $q = mysql_query("SELECT number FROM twilio_numbers AS n
                            LEFT JOIN twilio_numbers_types AS t ON t.number_id=n.id 
                            WHERE ".implode(" AND ",$wheresql));
        while(list($n) = mysql_fetch_array($q))$items[] = self::strip($n);
        return $items;
    }

    public function getConverenceRecording($sid){
        $rec = $this->client->recordings->read(["conferenceSid" => $sid],1);
        foreach ($rec as $r)return $r->sid;
        return false;
    }

    public function getRecording($sid){
        $rec = $this->client->recordings($sid)->fetch();
        return $rec->mediaUrl;
    }

    public function fetchCallRecording($sid){
        if(!$sid)return false;

        $rec = $this->client->recordings->read(['callSid'=>$sid]);        
        if(!$rec) return false;
        
        $rec = reset($rec);
        return $rec;
    }
    //accepted status: 'stopped','in-progress','paused'
    public function toggleCallRecording($sid,$status){         
        try{
            $rec = $this->fetchCallRecording($sid);
            $rsid = $rec->sid;

            if(!$status && !$rsid)return true;
            if($status && !$rsid){
                $rec = $this->client->calls($sid)->recordings->create([
                    "recordingStatusCallback" => $GLOBALS['SETTINGS']['twilio_setup_url'].'?action=updateCallLogRecording',
                    "recordingStatusCallbackEvent" => ['in-progress completed absent'],
                ]);                                    
                if(!$rec->sid) return false;
                $rsid = $rec->sid;
            }
            if(!$rsid) return false;

            $res = $this->client->calls($sid)->recordings($rsid)->update($status);        
        } catch (Exception $e) { 
            //t($e->getMessage(),1);
            return false;
        }   
                        
        return ($res->callSid)?$rsid:false;
    }

    //Possible valeues: in-progress, completed, absent ,failed
    public function hasRecording($sid){
        $rec = $this->fetchCallRecording($sid);
        return ($rec->sid)?true:false;
    }
    public function deleteRecording($sid) {        
        try{
            $this->client->recordings($sid)->delete();
        } catch (Exception $e) { 
            //t($e->getMessage(),1);
            return false;
        }           
        return true;
    }

    

    public static function format($phone){
		$phone = self::strip($phone);
		
		if(strlen($phone) == 7)
			return preg_replace("/([0-9]{3})([0-9]{4})/", "$1-$2", $phone);
		elseif(strlen($phone) == 10)
			return preg_replace("/([0-9]{3})([0-9]{3})([0-9]{4})/", "($1) $2-$3", $phone);
		else
			return $phone;
	}	
	public static function strip($phone){
		$phone = str_replace("+1", "", $phone);
		$phone = preg_replace("/[^0-9,+]/", "", $phone);
		return $phone;
	}
	public static function areacode($phone){
		$phone = self::strip($phone);
		return substr($phone,0,3);
	}    
        

    //Lookup
    public function lookup($number){
        $number = self::strip($number);

        $res = $this->checkLookupCache($number);
        if($res)return $res;

        $res = false;
        try{
            $res = $this->client->lookups->v1->phoneNumbers("+1".$number)->fetch(["type" => ["carrier","caller-name"]]);
            $res = (object)[
                'carrier' => (object)$res->carrier,
                'caller' => (object)$res->callerName
            ];
        } catch (Exception $e) { 
            //t($e->getMessage(),1);
            return false;
        }       
        if($res)$this->saveLookupChache($number,$res);    
        return $res;
    }
    private function checkLookupCache($number){
        list($r) = mysql_fetch_array(mysql_query("SELECT data FROM twilio_lookup_cache WHERE number='{$number}'"));
        if($r)return json_decode($r);
        return false;
    }
    private function saveLookupChache($number,$data){
        $data = mysql_real_escape_string(json_encode($data));
        mysql_query("INSERT INTO twilio_lookup_cache SET data='{$data}', number='{$number}' ON DUPLICATE KEY UPDATE data='{$data}'");
    }

    //SMS
    function sendSsytemSms($from,$to,$body){
        $body = str_replace("<br>"," ",$body);
        $body = str_replace("\r\n"," ",$body);                    
                                    
        $message = $this->client->messages->create(
                "+1".self::strip($to),
                ["body" => $body, "from" => $from]
        ); 
        return $message->sid;
    }
    function sendSms($from,$to,$body,$listingId=0,$log=true,$userId=0,$media=[]){
        $body = str_replace("<br>"," ",$body);
        $body = str_replace("\r\n"," ",$body);                    
                                    
        $message = $this->client->messages->create(
                "+1".self::strip($to),
                ["body" => $body, "from" => $from, "mediaUrl" => $media]
        ); 
        if($message->sid && $log){
            if(!$userId)$userId=$_SESSION['user']->id;
            $this->logOutboundSms($userId,$message->sid,$from,$to,$body,$listingId);
        }
        return $message->sid;
    }

    //Conference
    public function createConferenceRoom($from,$owner,$target,$userId=0){   
        $confId = uniqid();     
        $this->client->account->calls->create(            
            "+1".self::strip($owner),
            "+1".self::strip($from),
            ["url"=>$this->settings->url.'?action=joinConference&userId='.$userId.'&number='.self::strip($from).'&target='.self::strip($target).'&owner=1&confId='.$confId]
        );
        sleep(5);
        $this->client->account->calls->create(            
            "+1".self::strip($target),
            "+1".self::strip($from),
            ["url"=>$this->settings->url.'?action=joinConference&confId='.$confId]
        );
    }


    //Log
    public function autotagLog($logId,$override=false){
        $log = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_log WHERE id='{$logId}'"));
        if(!$log)return false;
        $log = (object)$log;
        
        if($log->autotag_listingIds && !$override)return false;                                     //Already autotagged.
        mysql_query("UPDATE twilio_log SET auto_tagged=1 WHERE id='{$logId}'");

        $target = ($log->direction == 'inbound')?$log->sender:$log->target;
        $target = self::strip($target);
        if(!$target)return false;

        $contacts = [];
        $listingIds = [];

        //Check tag on last outbound call
        $call = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_log WHERE id!='{$logId}' AND (listing_id !=0 or autotag_listingIds != '') AND direction = 'outbound' AND target='{$target}' ORDER BY id DESC LIMIT 1"));
        //Check tag on last inbbound call        
        if(!$call)$call = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_log WHERE id!='{$logId}' AND (listing_id !=0 or autotag_listingIds != '') AND direction = 'inbound' AND sender='{$target}' ORDER BY id DESC LIMIT 1"));        
        if($call){
            $call = (object)$call;
            if($call->listing_id)$listingIds[] = $call->listing_id;
            else if($call->autotag_listingIds)$listingIds = explode(",",$call->autotag_listingIds);
        }                     
        
        //Check contacts book
        if(!$listingIds){
            $q = mysql_query("SELECT * FROM deals_contacts WHERE id IN (SELECT contact_id FROM deals_contacts_entries WHERE value='{$target}')");
            while($r = mysql_fetch_assoc($q)){
                $contacts[] = (object)$r;
                $listingIds[] = $r['listing_id'];
                $lcontactIds[] = $r['id'];             
            } 
            if(count($listingIds)>3){
                return false;
            }
        }

        if($listingIds){
            $listingIds = array_unique($listingIds);
            $listingIds = implode(",",$listingIds);
            mysql_query("UPDATE twilio_log SET autotag_listingIds='{$listingIds}' WHERE id='{$logId}'");            
        }        
        return $listingIds;
    }
    public function logOutboundSms($userId,$sid,$from,$to,$body,$listingId=0){
        $direction = 'outbound';       
        $this->logSms($userId,$sid,$from,$to,'outbound',$body,$listingId);
    }
    public function logInboundSms($sid,$from,$to,$body,$listingId=0,$media=[]){
        $direction = 'inbound';       
        $this->logSms(0,$sid,$from,$to,'inbound',$body,0,$media);
    }
    public function logSms($userId,$sid,$from,$to,$direction,$body,$listingId=0,$media=[]){
        $from = self::strip($from);
        $to = self::strip($to);

        if(is_array($media))$media = implode("|",$media);

        mysql_query("INSERT INTO twilio_log SET 
                                `remote_id` = '{$sid}', 
                                `sender` = '{$from}', 
                                `status` = 'completed',
                                `target` = '{$to}', 
                                `user_id` = '{$userId}',
                                `listing_id` = '{$listingId}',
                                `type` = 'sms',
                                `direction` = '{$direction}',                                 
                                `media` = '{$media}',
                                `content` = '".mysql_real_escape_string($body)."'");

    }
    static public function setLoadReadStatus($userId,$logId){
        mysql_query("INSERT INTO twilio_log_read SET user_id='{$userId}', log_id='{$logId}'");
    }
    static public function getLogReadStatus($logId,$userId){
        list($read) = mysql_fetch_array(mysql_query("SELECT * FROM twilio_log_read WHERE user_id='{$userId}' AND log_id='{$logId}'"));
        return $read;
    }
    public function getLogListing($sid){        
        list($listingId) = mysql_fetch_array(mysql_query("SELECT listing_id FROM twilio_log WHERE remote_id='{$sid}'"));        

        $listing = false;
        if($listingId){
            $deal = new Deal();
            $listing = $deal->getStanderizedListing($listingId);            
        }
        return $listing;
    }
    public function getLogTags($sid){
        if(!$sid)return false;
        
        $data = mysql_fetch_assoc(mysql_query("SELECT * FROM twilio_log_tags WHERE log_id=(SELECT id FROM twilio_log WHERE remote_id='{$sid}')"));        
        if(!$data)return false;

        $data = (object)$data;
        $data->tags_str = $data->tags;
        $data->tags = explode(',',$data->tags);
        return $data;
    }
    public function setLogTags($sid,$tags,$listingId){
        list($logId) = mysql_fetch_array(mysql_query("SELECT id FROM twilio_log WHERE remote_id='{$sid}'"));
        if(!$logId)return false;

        list($old) = mysql_fetch_array(mysql_query("SELECT * FROM twilio_log_tags WHERE log_id='{$logId}'"));

        $setsql = [];
        $setsql[] = "tags='{$tags}'";        
        $setsql[] = "log_id='{$logId}'";

        if($old){
            $sql = "UPDATE twilio_log_tags SET ".implode(',',$setsql)." WHERE id='{$old}'";
        }
        else{
            $sql = "INSERT INTO twilio_log_tags SET ".implode(',',$setsql);
        }        
        mysql_query($sql);        
        mysql_query("UPDATE twilio_log SET listing_id='{$listingId}' WHERE remote_id='{$sid}'");
    }
    public function updateLog($sid,$status,$duration,$recordingSid,$userId=0){
        $updatesql = [];
        
        if($duration)$updatesql[] = "`duration` = '{$duration}'";
        if($recordingSid)$updatesql[] = "recording_sid='{$recordingSid}'";
        if($userId)$updatesql[] = "user_id='{$userId}'";
        
        if($status == 'completed'){
            list($oldstatus) = mysql_fetch_array(mysql_query("SELECT status FROM twilio_log WHERE remote_id='{$sid}'"));
            if(!in_array($oldstatus,['busy', 'no-answer', 'canceled', 'failed']))$updatesql[] = "`status` = '{$status}'";
        }
        else{
            $updatesql[] = "`status` = '{$status}'";
        }
        
        if($updatesql)mysql_query("UPDATE twilio_log SET ".implode(",",$updatesql)." WHERE remote_id='{$sid}'");        
    }
    public function logCall($userId,$sid,$from,$to,$direction,$duration,$status,$tags='',$listingId=0,$confId=''){
        $from = self::strip($from);
        $to = self::strip($to);

        $insertsql = [];
        $insertsql[] = "`remote_id` = '{$sid}'";
        $insertsql[] = "`sender` = '{$from}'";
        $insertsql[] = "`target` = '{$to}'";
        $insertsql[] = "`type` = 'call'";
        $insertsql[] = "`direction` = '{$direction}'";
        $insertsql[] = "`status` = '{$status}'";
        $insertsql[] = "`duration` = '{$duration}'";
        if($listingId)$insertsql[] = "`listing_id` = '{$listingId}'";
        if($userId)$insertsql[] = "`user_id` = '{$userId}'";
        if($confId)$insertsql[] = "`conf_id` = '{$confId}'";
        //if()$insertsql[] = "`tags` = '{$tags}'";

        mysql_query("INSERT INTO twilio_log SET ".implode(",",$insertsql));
        if($tags && !mysql_error()){ 
            $id = mysql_insert_id();                       
            mysql_query("INSERT INTO twilio_log_tags SET log_id='{$id}', tags='".mysql_real_escape_string($tags)."'");            
        }
        

    }
    public function logOutboundCall($userId,$sid,$from,$to,$duration,$status,$tags='',$listingId=0,$confId=''){
        $direction = 'outbound';       
        $this->logCall($userId,$sid,$from,$to,'outbound',$duration,$status,$tags,$listingId,$confId);
    }
    public function logInboundCall($userId,$sid,$from,$to,$duration,$status,$tags='',$listingId=0){
        $direction = 'inbound';       
        $this->logCall($userId,$sid,$from,$to,'inbound',$duration,$status,$tags,$listingId);
    }

    
}
        
