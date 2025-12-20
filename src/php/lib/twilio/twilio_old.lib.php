<?php
//require "twilio-php-master/Services/Twilio.php";
//require "twilio-php-master/Services/Twilio/Capability.php";

class Twilio {	

	public 
			$sid, 												//Account SID
			$token, 											//Account Token
			$client, 											//Twilio Client
			$master, 											//Master Mode On/Off
			$userid,											//Id of the account holder user
			$agentid, 											//Id of the current authenitcated user
			$capability, 										//Twilio app capability token
			$admin_sid,											//Company's SID (located in the settings file) 
			$admin_token,										//Company's Token (located in the settings file)
			$app_sid, 											//Company's APP SID (located in the settings file)
			$setup_url;											//Twilio number setup URL (located in the settings file)

	public function __construct($user=false) {
		$this->admin_sid = $GLOBALS['SETTINGS']['twilio_sid'];
		$this->admin_token = $GLOBALS['SETTINGS']['twilio_token'];
		$this->app_sid = $GLOBALS['SETTINGS']['twilio_app_sid'];
		$this->setup_url = $GLOBALS['SETTINGS']['twilio_setup_url'];
        

		if(!$user)$user = $_SESSION['user'];
		
		if($user->parent_id){ 
			$this->userid = $user->parent_id;
			$this->agentid = $user->id;			
		}
		else if($user){			
			$this->userid = $user->id;
			$this->agentid = 0;
		}
		else{
			
		}

		$account = $this->getAccount();
		
		if($account->sid){
			$this->sid = $account->sid;
			$this->token = $account->token;			
		}
		elseif($this->userid && !$account->sid){
			 $this->createAccount();
		}
	
		
		$this->master = false;
		$this->init();				
	}	
	private function init(){
		if($this->master == false){
			if($this->sid && $this->token){
				$this->client = new Services_Twilio($this->sid, $this->token);
				return;
			}
		}		
		$this->master = true;
		$this->client = new Services_Twilio($this->admin_sid, $this->admin_token);						
	}
        
        public function placeCall($callerId,$target,$url,$options = array()){
            try {
                $call = $this->client->account->calls->create(
                    $callerId,
                    $target,
                    $url,
                    $options    
                );
                return $call;
            } catch (Exception $e) {
                echo 'Error: ' . $e->getMessage();
                return;
            }
        }
        
        
        // send call directly to voice mail
        public function callToVoicemail($callerId,$target,$url){
        	try {
	        	$call1 = $this->placeCall($callerId,$target,$url,array('Timeout' => 6));
	        	if(!$call1)return false;
	        	
	        	sleep(1);
	        	
	        	$call2 = $this->placeCall($callerId,$target,$url,array('IfMachine' => 'Continue','StatusCallback' => $url));
	        	if(!$call2)return false;
	        	
	        	sleep(2);
	        	
	        	$this->updateCall($call1->sid,array("Status" => "completed"),$callerId);
	        	
	        	return $call2;
	        } catch (Exception $e) {
	        	echo 'Error: ' . $e->getMessage();
	        	return;
	        }
        }
        
        public function getRemoteCall($sid){        	
        	return $this->client->account->calls->get($sid);
        }
        public function findRemoteCall($filter){
        	if(empty($filter)) return false;
        	foreach ($this->client->account->calls->getIterator(0, 50, $filter) as $call) {
        		return $call;
        	}
        	return false;
        }

        public function updateCall($callId,$options = array()){
            $this->client->account->calls->get($callId)->update($options);
        }
        
        public function sendSMS($callerId,$target,$msg,$options = array()){
                $msg = str_replace("<br>"," ",$msg);
                $msg = str_replace("\r\n"," ",$msg);
                $number = $this->findNumber($callerId);
        	$res = clearCachedBalance($number->user_id);
//        	$res = clearCachedBalance($_SESSION['user']->id);
        	if(!$res->result)return false;
        							
            try{
                $response = $this->client->account->sms_messages->create(
                    $callerId,
                    $target,
                    $msg,
                    $options,
                    $this->app_sid
                );
            }
            catch (Services_Twilio_RestException $e) { $result['error'] = addslashes($e->getMessage()); return $result; }
            if(isset($response->sid) && $response->sid!='')
                return $response->sid;
            else
                return false;
        }
        
	public function enableMaster(){
		$this->master = true;
		$this->init();
	}
	public function disableMaster(){
		$this->master = false;
		$this->init();	
	}
	public function getAccountSid(){
		return $this->sid;
	}
	public function createAccount($name=''){
		$this->enableMaster();
		if(!$name)
			$name = $GLOBALS['SETTINGS']['twilio_account_prefix'].$_SESSION['user']->username;

		try{
			$account = $this->client->accounts->create(array('FriendlyName' => $name));
		} catch (Services_Twilio_RestException $e) { $this->error($e->getMessage());}
		
		$this->sid = $account->sid;
		$this->token = $account->auth_token;
		$this->saveAccount($account,$name);
		$this->disableMaster();
	}
	public function closeAccount($sid){
		$account = $this->client->account;
		if(!$sid)return;		
		if($sid != $account->sid) err("Account doesn't match!");

		$account->update(array('Status' => 'Suspended'));
	} 
	public function getNumbers(){
		$array = array();					
		try{		
			$numbers = $this->client->account->incoming_phone_numbers;		
												
			if($numbers){						
				foreach($numbers as $n){							
					$array[] = $n->phone_number;
				}	
			}
		} catch (Services_Twilio_RestException $e) { $this->error($e->getMessage());}
		return $array;
	}
	public function getRecordings($sid,$accountSid=0){
		if(!$sid) return false;
		if(!$accountSid)$accountSid = $_REQUEST['AccountSid'];
	
		if(!$client && $accountSid){							//We need an authorized account to access recordings
			$account = $this->getAccount($accountSid);			//we check to see if an accountidis provided in the request
			if($account){
				$this->sid = $account->sid;
				$this->token = 	$account->token;
			}		
			$this->disableMaster();
		}
		
		$recs = array();
		foreach($this->client->account->recordings->getIterator(0, 50, array('CallSid' => $sid)) as $recording) {
    		$recs[] = $GLOBALS['SETTINGS']['twilio_recordings_domain'].$recording->uri;
		}
		return $recs;
	}	
	public function getAccountRecordings($accountSid){
		if(!$accountSid) return false;
		
		$account = $this->getAccount($accountSid);			//we check to see if an accountidis provided in the request		
		if(!$account) return false;
		
		$this->sid = $account->sid;
		$this->token = 	$account->token;		
		$this->disableMaster();
			
		$recs = array();
		
		foreach($this->client->account->recordings as $recording) {
			$recs[] = $recording;
		}
		return $recs;
	}
	public function deleteRecordings($sid){
		$this->client->account->recordings->delete($sid);
	}
	public function searchAvailableNumbers($areacode,$country='US'){
		$array = array();					
		try{
			if($country == 'US'){
				$params = array('AreaCode' => $areacode);
			}
			else{
				$params = array('Contains' => $areacode);
			}
			$numbers = $this->client->account->available_phone_numbers->getList($country, 'Local', $params);
			foreach($numbers->available_phone_numbers as $n) {
	    		$array[] = $n->phone_number;
			}	
		} catch (Services_Twilio_RestException $e) { $this->error($e->getMessage());}
		return $array;
	}
	public function purchaseNumber($number, $title='', $ajax=true){
		if($test) $n = (object)array('sid'=>'test');
		else{
			try{
				if($this->master){				//We don't allow the master account to purchase numbers. Every phone number needs to be belong to a subaccount
					$this->master = false;
					$this->init();
				}
				$n = $this->client->account->incoming_phone_numbers->create(array('PhoneNumber' => $number));
			} catch (Services_Twilio_RestException $e) { $this->error($e->getMessage());}
		}
		
		$this->setupNumber($n->sid);							
		$nId = $this->saveNumber($n,$title,false);
		if($nId){
			$this->assignTwilioNumber($this->userid,$nId);
			if($ajax)
				json();
			else
				return $nId;
		}
		else{
			if($ajax)
				err("Unable to save number");
			else 
				return false;
		}
	}	
	public function setupNumber($sid){
		try{
			$number = $this->client->account->incoming_phone_numbers->get($sid);	
			
			$number->update(array('VoiceUrl' => $this->setup_url,'StatusCallback'=>$this->setup_url.'?action=checkBalance'));
			$number->update(array('SmsUrl' => $this->setup_url));
		} catch (Services_Twilio_RestException $e) { $this->error($e->getMessage());}
	}	
	public function releaseNumber($sid, $croak=true){
		try{
			$this->client->account->incoming_phone_numbers->delete($sid);
		} catch (Services_Twilio_RestException $e) { 
			if($croak)$this->error($e->getMessage());
		}

		$this->deleteNumber($sid);
	}	
	public function transferNumber($curSid,$newSid,$phoneSid){
		if(!$this->master){
			$this->master = true;
			$this->init();
		}
						
		try{
			$number = $this->client->accounts->get($curSid)->incoming_phone_numbers->get($phoneSid);				
			$number->update(array("AccountSid" => $newSid));		
		} catch (Services_Twilio_RestException $e) { $this->error($e->getMessage()); return false; }
		
		return true;
	}
	
	//Reporting
	public function getUsage($range=0, $sid=0){
		//if(!$range)return false;
		
		if($sid){
			$account = $this->getAccount($sid);			
			if($account){
				$this->sid = $account->sid;
				$this->token = 	$account->token;
			}
			else{ return false; }
			$this->disableMaster();						
		}						
		$mainCats = array('calls-inbound','calls-outbound','calls-client','calls-sip','sms-inbound','sms-outbound','phonenumbers','calleridlookups','carrier-lookups','number-format-lookups','recordings','transcriptions','recordingstorage');		
		$usage = array('total'=>0);
		foreach ($this->client->account->usage_records->getIterator(0, 50, array(
				'StartDate' => $range->start,
				'EndDate'   => $range->end,
		)) as $record) {			
			$unitPrice = ($record->usage)?(($record->price/$record->usage)+(float)$GLOBALS['SETTINGS']['twilio_price_markups'][$record->category]):0;
			$usage[$record->category] = (object)array(
				'price'		=> $unitPrice,
				'price2'	=> $record->price,
				'usage'		=> $record->usage,
				'total'		=> $unitPrice*$record->usage
			);	
			if(in_array($record->category,$mainCats)){
				$usage['total'] += $usage[$record->category]->total;
			}		
		}	
		
		
		//Transcriptions		
		$wheresql = array();
		$wheresql[] = "n.account_sid='{$this->sid}'";
		if($range) $wheresql[] = "t.timestamp BETWEEN '{$range->start} 00:00:00' AND '{$range->end} 23:59:59'";
		$transcription_usage = 0;
		$query = mysql_query("SELECT t.length FROM twilio_calls_transcriptions as t
							  LEFT JOIN twilio_calls AS c ON c.id=t.call_id
							  LEFT JOIN twilio_numbers AS n ON n.id=c.twilio_number_id
							  WHERE ".implode(" AND ",$wheresql));
		
		while(list($length) = mysql_fetch_array($query)){$transcription_usage+=ceil($length/30); }
		$usage['transcriptions'] = (object)array(
				'price'		=> $GLOBALS['SETTINGS']['twilio_price_markups']['transcriptions'],
				'price2'	=> 0,
				'usage'		=> $transcription_usage,
				'total'		=> $GLOBALS['SETTINGS']['twilio_price_markups']['transcriptions']*$transcription_usage
		);				
		$usage['total'] += $usage['transcriptions']->total;
		
		return $usage;				
	}

	//Dialer
	public function getCapabilityToken($clientId=''){
		if(!$this->sid || !$this->token) return;
		if(!$clientId) $clientId = $this->userid;
						
		$res = file_get_contents_curl($this->setup_url.'?action=checkBalance&AccountSid='.$this->sid);
		//t($this->setup_url.'?action=checkBalance&AccountSid='.$this->sid);
		$res = json_decode($res);				
		if($res && $res->result){
			$this->capability = new Services_Twilio_Capability($this->sid, $this->token);
			$this->capability->allowClientOutgoing($this->app_sid);
			$this->capability->allowClientIncoming($clientId);
				
			json(array('token'=>$this->capability->generateToken()));
		}
		else{			
			print json_encode($res);			
		}
	}
	
	//Database	
	public function getCountries(){
		$countries = array();
		$query = mysql_query("SELECT id,title,`default` FROM twilio_countries WHERE status>0 ORDER BY title ASC");
		while($c = mysql_fetch_assoc($query)){
			$countries[] = (object)$c;
		}
		return $countries;
	}
	public function saveVoicemail($id, $url, $ajax=false){		
		$this->deleteVoicemail($id);
		$sql = "UPDATE twilio_numbers SET voicemail = '$url' WHERE id='$id'";
		if($ajax)
			sql($sql);
		else{
			mysql_query($sql);
			$error = mysql_error();
			if($error) return false;
			else return true;
		}
	}
	public function deleteVoicemail($id){
		$sid = $this->getVoicemailSid($id);
		if($sid) try{$this->deleteRecordings($sid);}catch(Exception $e) {}
		mysql_query("UPDATE twilio_numbers SET voicemail = '' WHERE id='$id'");
	}
	public function getVoicemail($id){
		$query = mysql_query("SELECT voicemail FROM twilio_numbers WHERE id='$id'");
		list($voicemail) = mysql_fetch_array($query);
		return $voicemail;
	}
	public function getVoicemailSid($id){
		$voicemail = $this->getVoicemail($id);		
		$voicemail = explode("/",$voicemail);
		$sid = end($voicemail);
		return $sid;			
	}	
	public function getAccount($id=0){
		if(!$id && !$this->userid)return false;
		
		if($id){
			$query = mysql_query("SELECT * FROM twilio_accounts WHERE id='$id' OR sid='$id'");			
		}
		else{
			$query = mysql_query("SELECT * FROM twilio_accounts WHERE user_id='{$this->userid}'");
		}		
		$account = (object)mysql_fetch_assoc($query);		
		return $account;
	}
	public function getUserAccount(){
		$query = mysql_query("SELECT * FROM twilio_accounts WHERE user_id='{$this->userid}'");
		$account = (object)mysql_fetch_assoc($query);		
		return $account;
	}
	public function getNumber($id){																		//Find number by id or sid
		$query = mysql_query("SELECT number FROM twilio_numbers WHERE id='$id' OR sid='$id'");						
		list($number) = mysql_fetch_array($query);
		return $number;				
	}
	public function getNumberInfo($id){		
		$query = mysql_query("SELECT * FROM twilio_numbers WHERE (id='$id' OR sid='$id') AND user_id='$this->userid'");					
		$data = mysql_fetch_assoc($query);
		return (object)$data;
	}
	public function findNumber($number){
            $number = trim($number);
            $number = self::strip($number);
            $query = mysql_query("SELECT * FROM twilio_numbers WHERE number like '%$number%'");
            $data = mysql_fetch_assoc($query);
            return (object)$data;
	}
	public function listNumbers($showall=false){
		$array = array();
		
		$wheresql = array();
		$wheresql[] = "number.user_id='{$this->userid}'";
		if($this->agentid)
			$wheresql[] = "assigned.user_id='{$this->agentid}'";
		if(!$showall)
			$wheresql[] = "number.status > 0";
		
		$sql = "SELECT number.* FROM twilio_numbers AS number
							  LEFT JOIN twilio_numbers_assignments AS assigned ON assigned.number_id=number.id								
							  WHERE ".implode(" AND ",$wheresql)."
							  GROUP BY number.id";	
	
		$query = mysql_query($sql);
		while($n = mysql_fetch_assoc($query)){
			$n = (object)$n;
                        $n->timestamp = formatDate($n->timestamp,$GLOBALS['SETTINGS']['date_format_regular']);
			$n->number = self::format($n->number);
			$array[] = $n;
		}
		return $array;
	}
	public function loadHistoryNumbers($limit=5){
		$array = array();
		
		$wheresql = array("user_id='{$this->userid}'", "type='outbound'");
		$sql = "SELECT target as number FROM twilio_calls WHERE ".implode(" AND ",$wheresql)." GROUP BY target order by id desc limit {$limit}";
		$query = mysql_query($sql);
		while($n = mysql_fetch_assoc($query)){
			$n = (object)$n;
                        $n->number = self::format($n->number);
			$array[] = $n;
		}
		return $array;
	}
	public function getOwnerNumbers($userId,$all=false){
		$ownerId = Users::getAccountOwnerId($userId);
		
		$array = array();
		if(!$ownerId) return false;
		
		$wheresql = array();
		$wheresql[] = "user_id='{$ownerId}'";
		if(!$all)$wheresql[] = "status>0";
			
		$sql = "SELECT * FROM twilio_numbers WHERE ".implode(" AND ",$wheresql)." ORDER BY id ASC";
		
		$query = mysql_query($sql);
		while($n = mysql_fetch_assoc($query)){
			$n = (object)$n;
			$n->number_original = $n->number;
			$n->number = self::format($n->number);
			$array[] = $n;
		}
		return $array;
	}
	public function getAssignedNumbers($userId,$allowAssocIds=true){
		$array = array();
		if(!$userId) return false;
		$assocIds = Users::getAssociatedUserIds($userId);
	
		if($allowAssocIds) $assocIds = Users::getAssociatedUserIds($userId);
        else $assocIds = array($userId);
                        
		$wheresql = array();	
//		$wheresql[] = "assigned.user_id='{$userId}'";
		$wheresql[] = "assigned.user_id in (".implode(",",$assocIds).") ";
		$wheresql[] = "number.status>0";
			
		$sql = "SELECT number.* FROM twilio_numbers AS number
							  LEFT JOIN twilio_numbers_assignments AS assigned ON assigned.number_id=number.id
							  WHERE ".implode(" AND ",$wheresql)."
							  GROUP BY number.id";
	    //pr($sql,true);
		$query = mysql_query($sql);
		while($n = mysql_fetch_assoc($query)){
			$n = (object)$n;
			$n->number_original = $n->number;
			$n->number = self::format($n->number);			
			$array[] = $n;
		}
		return $array;
	}
	public function toggleRecord($sid){
		list($status) = mysql_fetch_array(mysql_query("SELECT `record` FROM twilio_numbers WHERE sid='$sid'"));
		if($status == 1) $status = 0;
		else $status = 1; 
		sql("UPDATE twilio_numbers SET `record`='$status' WHERE `sid`='$sid' AND `user_id` = '{$this->userid}'",$status);
	}
	public function toggleTranscribe($sid){
		list($status) = mysql_fetch_array(mysql_query("SELECT `transcribe` FROM twilio_numbers WHERE sid='$sid'"));
		if($status == 1) $status = 0;
		else $status = 1; 				
		sql("UPDATE twilio_numbers SET `transcribe`='$status' WHERE `sid`='$sid' AND `user_id` = '{$this->userid}'",$status);
	}	
	public function toggleStv($sid){
		list($status) = mysql_fetch_array(mysql_query("SELECT `straight_to_voicemail` FROM twilio_numbers WHERE sid='$sid'"));
		if($status == 1) $status = 0;
		else $status = 1;
		sql("UPDATE twilio_numbers SET `straight_to_voicemail`='$status' WHERE `sid`='$sid' AND `user_id` = '{$this->userid}'",$status);
	}
	
	public function checkTranscribe($id){
		list($status) = mysql_fetch_array(mysql_query("SELECT `transcribe` FROM twilio_numbers WHERE id='$id'"));
		if($status == 1) return true;
		else return false; 				
	}
	public function checkRecord($id){
		list($status) = mysql_fetch_array(mysql_query("SELECT `record` FROM twilio_numbers WHERE id='$id'"));
		if($status == 1) return true;
		else return false; 	
	}
	
	private function saveNumber($n,$title='',$ajax=true){		
		$sql = "INSERT INTO twilio_numbers (`user_id`,`account_sid`, `sid`,`number`,`title`) VALUES ('{$this->userid}','{$this->sid}','{$n->sid}','{$n->phone_number}','$title')";
		//t($sql,1);
		if($ajax){
			sql($sql);
		}
		else{
			mysql_query($sql);
			$error = mysql_error();
			
			if($error) return false;
			
			$id = mysql_insert_id();
			return $id;
		}		
	}
	private function deleteNumber($sid){
		sql("UPDATE twilio_numbers SET `status`=0 WHERE `sid`='{$sid}' AND `user_id` = '{$this->userid}'");
	}
	private function saveAccount($account,$name){
		sql("INSERT INTO twilio_accounts (`user_id`,`sid`,`token`,`name`) VALUES ('{$this->userid}','{$account->sid}','{$account->auth_token}','{$name}')");
	}	
	public function logOutboundCall($numberId,$callSid,$target,$duration,$status){
            $type = 'outbound';
            $action_type = 12;
            $title = 'Voice Sent';
            $data_arr = array("Receiver: ".self::format($target)); 
            $this->logCall($numberId,$callSid,$type,$action_type,$target,$duration,$status,$data_arr,$title);
	}
	public function logInboundCall($numberId,$callSid,$target,$duration,$status){
            $type = 'inbound';
            $action_type = 7;
            $title = 'Voice Received';
            $data_arr = array("Caller: ".self::format($target)); 
            $this->logCall($numberId,$callSid,$type,$action_type,$target,$duration,$status,$data_arr,$title);
	}
	private function logCall($numberId,$callSid,$type,$action_type,$target,$duration,$status,$data_arr,$title){
            $target = self::strip($target);
            $source_type = 'Voice';
            $this->userid = ($this->userid)?$this->userid:$_REQUEST['userId'];

            $sql = "INSERT INTO twilio_calls (`twilio_number_id`,`user_id`,`sid`,`type`,`target`,`duration`,`status`) VALUES ('$numberId','$this->userid','$callSid','$type','$target','$duration','$status')";
            mysql_query($sql);
            $error = mysql_error();
            if($error) err('Outbound Call Error: '.$error,true);
            else self::logTimeLine($numberId,$type,$source_type,$action_type,$target,$title,$data_arr,$callSid);
            
	}
        
        public function logInboundSms($numberId,$messageSid,$target,$body){
            $type = 'inbound';
            $action_type = 8;
            $title = 'SMS Received';
            
            $data_arr = array("Sender: ".self::format($target));
            $body = mysql_real_escape_string($body);
            if ($body) $data_arr[] = "Message: ".$body;
            self::logSMS($numberId,$messageSid,$type,$action_type,$target,$data_arr,$body,$title);
        }
        
        public function logOutboundSms($numberId,$messageSid,$target,$body){
            $type = 'outbound';
            $action_type = 10;
            $title = 'SMS Sent';
            $data_arr = array("Receiver: ".self::format($target));
            $body = mysql_real_escape_string($body);
            if ($body) $data_arr[] = "Message: ".$body;
            self::logSMS($numberId,$messageSid,$type,$action_type,$target,$data_arr,$body,$title);
        }
        
        private function logSMS($numberId,$messageSid,$type,$action_type,$target,$data_arr,$message,$title){     	
            $target = self::strip($target);
            $source_type = 'Text';
            $this->userid = ($this->userid)?$this->userid:$_REQUEST['userId'];
            $status = ($type=="outbound")?"sent":"received";
            $sql = "INSERT INTO twilio_sms (`twilio_number_id`,`user_id`,`sid`,`type`,`target`,`message`,`status`) VALUES ('$numberId','$this->userid','$messageSid','$type','$target','$message','$status')";                       
            mysql_query($sql);
            $error = mysql_error();
            if($error) err("{$type} SMS Error: ".$error,true);
            else self::logTimeLine($numberId,$type,$source_type,$action_type,$target,$title,$data_arr,$messageSid);
	}
        
        public function logTimeLine($numberId,$type,$source_type,$action_type,$target,$title,$data_arr=array(),$sid=''){
            $data = array();
            $userId = reset($this->getAssociatedUsers($numberId));        	        	       
            $lead = Leads::findLeadByNumber($target,$userId);            
            if (!$lead) return;
            $number = self::getNumber($numberId);
            $data_arr[] = "Phone Number: ".self::format($number);

            $this->userid = ($this->userid)?$this->userid:$lead['agent_id'];
            
            $timeline = new Timeline($lead['id'],$this->userid);
            $data['action_title'] = $title;
            $data['action_color'] = 'green';
            $data['notes'] = implode(" | ", $data_arr);
            $timeline->insert($action_type,$data,'','',$sid);
        }
        
	public function updateTimeLine($sid,$data_arr=array(),$action_url=''){
            $data = implode(" | ", $data_arr);
            Timeline::updateTimelineCallLog($sid,$data,$action_url);
        }
        
        public function updateCallStatus($sid,$duration,$status){
		$sql = "UPDATE twilio_calls SET
					`duration` = '$duration',
					`status` = '$status' 
				WHERE `sid` = '$sid'";
		mysql_query($sql);
		$error = mysql_error();
		if($error){
			err('Call Update Error: '.$error,true);	
		}
	}
	public function getCall($id){
		$query = mysql_query("SELECT * FROM twilio_calls WHERE id = '$id' OR sid = '$id'");
		$data = mysql_fetch_assoc($query);
		return (object)$data;
	}
	public function assignTwilioNumber($userId,$numberId, $status = 1, $ajax=false){
		if(!$userId || !$numberId) return;
	
		if($status)
			$sql = "INSERT INTO twilio_numbers_assignments (`number_id`,`user_id`) VALUES ('$numberId','$userId')";
		else
			$sql = "DELETE FROM twilio_numbers_assignments WHERE `number_id` = '$numberId' AND `user_id`='$userId'";
		
		if($ajax){
			sql($sql);
		}
		else{
			mysql_query($sql);
			$error = mysql_error();
			return ($error)?false:true;
		}
	}
	public function twilioNumberStatus($userId,$numberId){
		list($status) = mysql_fetch_array(mysql_query("SELECT count(id) FROM twilio_numbers_assignments WHERE `number_id` = '$numberId' AND `user_id`='$userId'"));
		return $status;
	}
	public function getAssignedUsers($id){
		$userIds = array();
		$query = mysql_query("SELECT user_id FROM twilio_numbers_assignments WHERE `number_id` = '$id'");
		while(list($userId) = mysql_fetch_array($query)) $userIds[] = $userId;
		return $userIds;
	}
	public function getAssociatedUsers($id){
		$userIds = $this->getAssignedUsers($id);
		$query = mysql_query("SELECT user_id FROM twilio_numbers WHERE id='$id'");
		while(list($userId) = mysql_fetch_array($query)) $userIds[] = $userId;
		return $userIds;
	}		
	
	
	//General
	public function error($msg,$log=false){
		if($log)
			errorlog('error','Twilio API',$msg);
		err($msg);
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
}

?>