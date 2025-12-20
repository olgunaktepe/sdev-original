<?php
include_once(__DIR__.'../../helpers/cli.php');

set_time_limit(120);
uselib('twilio::twilio');

//$_REQUEST['CallStatus'] == 'completed';
//$_REQUEST['Direction'] = 'inbound';
//$_REQUEST['CallSid'] = 'CA5584915fcd086b3050f5e6d543a75280';
//$_REQUEST['To'] = '+13232892517';
//$_SESSION['user'] = new stdclass();
//$_SESSION['user']->id = 1;

$twilio = new Twilio();

//log2file(json_encode($_REQUEST));

if( isset($_REQUEST)& !empty($_REQUEST) ){
    if($_REQUEST['action']) usehelper('ajax::dispatch');
    if($_REQUEST['ApplicationSid'] == $GLOBALS['SETTINGS']['twilio_app_sid']){    	
        //if($_REQUEST['ErrorCode']) $twilio->error('Outbound Live Call: '.$_REQUEST['ErrorCode'], true);
        if($_REQUEST['voicemailRecordingEnded'] == '1') saveVoicemailMessage();
        else if($_REQUEST['voicemailRecording'] == '1') recordVoicemailMessage(); 
        else if($_REQUEST['CallStatus'] == 'ringing') placeOutboundCall();
        else updateLiveCallStatus();        
    }
    else{ 
        if ($_REQUEST['CallSid']) {
            if($_REQUEST['CallStatus'] == 'ringing') processIncomingCall();
            else updateLiveCallStatus();
        }
		else if($_REQUEST['ConferenceSid']){
			updateConferenceCallStatus();
		}
        else processSms($_REQUEST);
    }
}


function updateConferenceCallStatus(){
	global $twilio;

	if($_REQUEST['FriendlyName']){
		mysql_query("UPDATE twilio_log SET conf_sid='{$_REQUEST['ConferenceSid']}' WHERE conf_id='{$_REQUEST['FriendlyName']}' AND conf_sid=''");
	}
	if($_REQUEST['ReasonConferenceEnded']){
		list($ts) = mysql_fetch_array(mysql_query("SELECT timestamp FROM twilio_log WHERE conf_sid='{$_REQUEST['ConferenceSid']}'"));
		$dur = (strtotime('now')-strtotime($ts));

		$recSid = $twilio->getConverenceRecording($_REQUEST['ConferenceSid']);
		
		$updatesql = ["duration='{$dur}'"];
		if($recSid) $updatesql[] = "recording_sid='{$recSid}'";
		mysql_query("UPDATE twilio_log SET ".implode(",",$updatesql)." WHERE conf_sid='{$_REQUEST['ConferenceSid']}'");
	}

	$twiml = $twilio->getTwimlClient();
	header('Content-Type: text/xml');
	print $twiml;
	exit;
}
function joinConference(){
	global $twilio;
	
	$confId = $_REQUEST['confId'];
	$owner = $_REQUEST['owner']?true:false;
	$userId = $_REQUEST['userId'];

	try{		
		$twiml = $twilio->getTwimlClient();
		$tags = '';
		if($_REQUEST['number']){
			$number = $twilio->getNumberByNumber($_REQUEST['number']);	
			$tags = ($number->call_tags)?implode(",",array_filter($number->call_tags)):'';
		}		
						
		$options = array();
		$options['callerId'] = $number->number;
		$options['record'] = ($number->record)?'record-from-ringing':'false';
		$options['action'] = $GLOBALS['SETTINGS']['twilio_setup_url'];		

		$dial = $twiml->dial(NULL, $options);	
		$dial->conference($confId,[
			'startConferenceOnEnter' => true,
            'endConferenceOnExit' => true,
			'beep' => false,
			'participantLabel' => ($owner)?'Owner':'',
			'record' => 'record-from-start',
			'statusCallback' => $GLOBALS['SETTINGS']['twilio_setup_url'],
			'statusCallbackEvent' => 'start end'
		]);		

		if($owner)
			$twilio->logOutboundCall($userId,$_REQUEST['CallSid'],Twilio::strip($_REQUEST['number']),Twilio::strip($_REQUEST["target"]),0,$_REQUEST['CallStatus'],$tags,0,$confId);				
	} catch (Exception $e) { $twilio->error('Outbound Live Call: '.$e->getMessage(), true); }
	
	header('Content-Type: text/xml');
	print $twiml;
	exit;		
}
function checkRemoteDialPermissions($userPhone,$systemNumber){
	global $twilio;

	$userPhone = Twilio::strip($userPhone);

	list($uId,$typeId) = mysql_fetch_array(mysql_query("SELECT id,type_id FROM users WHERE status=1 AND phone = '{$userPhone}'"));
	if(!$uId)return false;

	$type = $twilio->getNumberAssignedType($systemNumber->id);
	if($typeId>2 && $type->type_id != $typeId) return false;

	return $uId;
}
function processSms($data){
	global $twilio;		
	
	try{		
		$twiml = $twilio->getTwimlClient();
		$number = $twilio->getNumberByNumber($_REQUEST['To']);												
		$listingId = 0;
				
		if(preg_match("/dial:( |)(\d+)/i",$_REQUEST["Body"],$matches)){
			$action = 'dial';
			$num = $matches[2];
		}
		else if(preg_match("/(update_ip|update ip|updateip):/i",$_REQUEST["Body"])){
			$action = 'update_ip';
			preg_match("/\b(?:\d{1,3}\.){3}\d{1,3}\b/", $_REQUEST["Body"], $matches);
			$ipAddress = $matches[0];					
		}
		else{
			preg_match("/sms:( |)(\d+)/i",$_REQUEST["Body"],$matches);
			if($matches){
				$action = 'sms';
				$num = $matches[2];
				$smsBody = $_REQUEST["Body"];

				$smsBody = preg_replace("/sms/i","sms",$smsBody);

				$smsBody = trim(str_replace('sms: '.$num,'',$smsBody));
				$smsBody = trim(str_replace('sms:'.$num,'',$smsBody));
				$smsBody = stripslashes(preg_replace('/^(\\\\n)+/',"",$smsBody));
			}
		}				

		if($action=='dial'){
			$userId = checkRemoteDialPermissions($_REQUEST['From'],$number);			
			if(!$userId){ $twilio->sendSsytemSms($_REQUEST['To'],$_REQUEST['From'],'Unauthorized'); }
			else{
				if(!$num || !$_REQUEST['From']){ $twilio->sendSsytemSms($_REQUEST['To'],$_REQUEST['From'],'Unexpected Error'); }			
				else $twilio->createConferenceRoom($_REQUEST['To'],$_REQUEST['From'],$num,$userId);			
			}
		}
		else if($action=='sms'){			
			$userId = checkRemoteDialPermissions($_REQUEST['From'],$number);			
			if(!$userId){ $twilio->sendSsytemSms($_REQUEST['To'],$_REQUEST['From'],'Unauthorized'); }
			else{				
				if(!$num || !$_REQUEST['From']){ $twilio->sendSsytemSms($_REQUEST['To'],$_REQUEST['From'],'Unexpected Error'); }			
				else{
					$twilio->sendSms($_REQUEST['To'],$num,$smsBody,$listingId,true,$userId);
				} 
			}
		}
		else if($action=='update_ip'){
			$userId = checkRemoteDialPermissions($_REQUEST['From'],$number);			
			if(!$userId){ $twilio->sendSsytemSms($_REQUEST['To'],$_REQUEST['From'],'Unauthorized'); }
			else{
				if ($ipAddress){
					list($ips) = mysql_fetch_array(mysql_query("SELECT ip_whitelist FROM users WHERE id='{$userId}'"));
					$ips = array_filter(explode(",", $ips));					
					$ips[] = $ipAddress;
					$ips = array_unique($ips);
					$ips = implode(",",$ips);
					mysql_query("UPDATE users SET ip_whitelist='$ips' WHERE id='{$userId}'");
					$msg = 'IP address '.$ipAddress.' has been whitelisted';
				} 
				else $msg = 'No IP address found in the message';				
				$twilio->sendSsytemSms($_REQUEST['To'],$_REQUEST['From'],$msg);
			}
		}
		else{
			$body = $_REQUEST["Body"];
			$media = [];
			if($_REQUEST['NumMedia']>0){
				for($i = 0; $i<(int)$_REQUEST['NumMedia']; $i++){
					$url = $_REQUEST['MediaUrl'.$i];
					if($url)$media[] = $url;
				}
			}			
			$twilio->logInboundSms($_REQUEST['SmsMessageSid'],$_REQUEST['From'],$_REQUEST['To'],$body,$listingId,$media);		

			if($number->forward){						//If # is forwarded. Forward SMS.				
				$twilio->sendSms($_REQUEST['To'],$number->forward,"SMS received from ".Twilio::format($_REQUEST['From']),$listingId,false);
				$twilio->sendSms($_REQUEST['To'],$number->forward,$_REQUEST["Body"],$listingId,false,0,$media);
			}
		}		
	} catch (Exception $e) { t($e,1); }
	
	header('Content-Type: text/xml');
	print $twiml;
	exit;	   
}	
function processIncomingCall(){
	global $twilio;
		
	$timeout = 30;
					
	try {
		$twiml = $twilio->getTwimlClient();
		
		$from = $twilio->strip($_REQUEST['From']);

		$to = $_REQUEST['To'];	
		$number = $twilio->getNumberByNumber($to);
		$users = $twilio->getActiveUsers();	
		
		if($number->assigned_type){
			$filteredUsers = [];
			foreach($users as $u){
				if($u->type_id <= 2 || $number->assigned_type->type_id == $u->type_id){
					$filteredUsers[] = $u;
				}
			}
			$users = $filteredUsers;
		}		
		
		//if ($blacklist->checkBlacklist(reset($userIds), $from)){
		//	$response->hangup();
		//}
		
		if(!$_REQUEST['ParentCallSid'])		//Don't log incoming child calls
			$twilio->logInboundCall('',$_REQUEST['CallSid'],$from,$to,$_REQUEST['CallDuration'],$_REQUEST['CallStatus'],implode(",",array_filter($number->call_tags)));					

		if($number->forward){															//If # is forwarded. Forward call.
			$twilio->sendSms($_REQUEST['To'],$number->forward,"A phone call is being forwarded from ".Twilio::format($_REQUEST['From']),0,false);
			sleep(1);
			$twiml->dial(Twilio::strip($number->forward),array(
				'record'=> ($number->record)?'true':'false',
				'action'	=> $GLOBALS['site']['url'].$_SERVER['REQUEST_URI']
			));			
		}
		else if($number->stv){
			callVoicemail(0);
		}
		else if(!empty($users)){
			$twiml->pause(array('length'=>5));
			$dial = $twiml->dial(NULL,array(
					'record'	=> ($number->record)?'true':'false',
					'timeout'	=> $timeout,
					'action'	=> $GLOBALS['site']['url'].$_SERVER['REQUEST_URI']
			));
			foreach($users as $u){
				$dial->client($u->id,['statusCallback' => $GLOBALS['SETTINGS']['twilio_setup_url'], 'statusCallbackEvent' => 'initiated ringing answered completed']);
			}						
		}
		else{
			callVoicemail($timeout);		
		}		
	} catch (Exception $e) { t('Inbound Call: '.$e->getMessage()); }
	
	header('Content-Type: text/xml');
	print $twiml;		
	exit;
}
function updateCallLogRecording(){
	if($_REQUEST['RecordingSid'])
		mysql_query("UPDATE twilio_log SET recording_sid='{$_REQUEST['RecordingSid']}' WHERE remote_id='{$_REQUEST['CallSid']}'");
}
function placeOutboundCall(){
	global $twilio;	
	try{		
		$twiml = $twilio->getTwimlClient();
		$number = $twilio->getNumberByNumber($_REQUEST['From']);		
						
		$options = array();
		$options['callerId'] = $number->number;
		$options['record'] = ($number->record)?'record-from-ringing':'false';		
		$options['action'] = $GLOBALS['SETTINGS']['twilio_setup_url'];		
		$options['recordingStatusCallback'] = $GLOBALS['SETTINGS']['twilio_setup_url'].'?action=updateCallLogRecording';
		$options['recordingStatusCallbackEvent'] = 'in-progress completed absent';
		
		$userId = str_replace('client:','',$_REQUEST['Caller']);		

		$dial = $twiml->dial(NULL, $options);	

		$dial->number('+1'.Twilio::strip($_REQUEST["To"]),[
							'statusCallback' => $GLOBALS['SETTINGS']['twilio_setup_url'], 
							'statusCallbackEvent' => 'initiated ringing answered completed',							
						]);	
		
		
		if(!$_REQUEST['ParentCallSid'])
			$twilio->logOutboundCall($userId,$_REQUEST['CallSid'],$options['callerId'],$_REQUEST["To"],$_REQUEST['CallDuration'],$_REQUEST['CallStatus'],implode(",",array_filter($number->call_tags)),$_REQUEST['listingId']);				
	} catch (Exception $e) { $twilio->error('Outbound Live Call: '.$e->getMessage(), true); }
	
	header('Content-Type: text/xml');
	print $twiml;
	exit;		
}
function updateLiveCallStatus(){ 
	global $twilio;
	$sid = $_REQUEST['CallSid'];
	if($_REQUEST['ParentCallSid'])$sid = $_REQUEST['ParentCallSid'];
	$status = ($_REQUEST['DialCallStatus'])?$_REQUEST['DialCallStatus']:$_REQUEST['CallStatus'];
	
	if($_REQUEST['Direction'] == 'outbound-dial' && $_REQUEST['ParentCallSid']){
		$userId = 0;
		if(strpos($_REQUEST['Called'],'client:') !== false)$userId = str_replace('client:','',$_REQUEST['Called']);		
		if($_REQUEST['CallStatus'] == 'in-progress'){
			$twilio->updateLog($sid,$status,$_REQUEST['CallDuration'],$_REQUEST['RecordingSid'],$userId);		
		}		
	}
	else{
		$twilio->updateLog($sid,$status,$_REQUEST['CallDuration'],$_REQUEST['RecordingSid']);	
	}	

	if($_REQUEST['Direction'] == 'inbound'){
		switch($_REQUEST['DialCallStatus']){
			case 'no-answer':
				callVoicemail();
			case 'busy':
				callVoicemail();
			case 'completed':
				//notify();
				break;
			default:
				//notify();
				break;
		}
	}
	else{						
		//notify();
	}	

	$twiml = $twilio->getTwimlClient();
	header('Content-Type: text/xml');
	print $twiml;
	exit;
}

function callVoicemail($pause=0){
	global $twilio;
		
	try {
		$from = $twilio->strip($_REQUEST['From']);
		$to = $_REQUEST['To'];
		$number = $twilio->getNumberByNumber($to);

		$twiml = $twilio->getTwimlClient();
		if($pause)$twiml->pause(array('length'=>$pause));

		if($number->voicemail){			
			$twiml->play($number->voicemail);
		}
		else if($number->voicemail_text){			
			$twiml->say($number->voicemail_text);
		}
		else{
			$twiml->say($GLOBALS['SETTINGS']['twilio_default_voicemail']);
		}
		$twiml->record(array(
				'transcribe' => 'false',
				'transcribeCallback' => $url
		));
	} catch (Exception $e) { $twilio->error('Inbound Call: '.$e->getMessage(), true); }

	header('Content-Type: text/xml');
	print $twiml;
	exit;
}





























function transferExternal(){	
	$dialNumber = $_REQUEST['dialNumber'];
	
	try {
		$response = new Services_Twilio_Twiml();
		$response->dial(Twilio::strip($dialNumber), array(
				'callerId' 	=> $_REQUEST['From'],
				'record'	=>	true
		));
	} catch (Exception $e) { $twilio->error('PowerDialer: '.$e->getMessage(), true); }

	header('Content-Type: text/xml');
	print $response;
	exit;
}
function hangupMessage(){
	$message = $_REQUEST['audioMessage'];
	try {
		$response = new Services_Twilio_Twiml;
		$response->play($message);
		$response->hangup();
	} catch (Exception $e) { $twilio->error('PowerDialer: '.$e->getMessage(), true); }
	header('Content-Type: text/xml');
	print $response;
	exit;
}
function liveCallAction($sid=0,$cmd=0,$params=array()){
	global $twilio;
	
	$userId = $_REQUEST['userId'];
	$user = Users::getUsersData($userId);	
	$twilio2 = new Twilio($user);
	

	if(!$cmd) $cmd = $_REQUEST['cmd'];
	if(!$sid) $sid = $_REQUEST['sid'];

	$params['action'] = $cmd;
	$params['agentId'] = $_REQUEST['agentId'];
	$params['confId'] = $_REQUEST['confId'];
	$params['guest'] = $_REQUEST['guest'];
	$params['mod'] = $_REQUEST['mod'];
	$params['dialNumber'] = $_REQUEST['dialNumber'];
	$params['audioMessage'] = $_REQUEST['audioMessage'];
		
	$call = $twilio->getRemoteCall($sid);
	switch($_REQUEST['targetCall']){
		case 'parent':
			$target_call = $twilio2->getRemoteCall($call->parent_call_sid);
			break;
		case 'child':
			$target_call = $twilio2->findRemoteCall(array('ParentCallSid'=>$sid));
			break;
		default:
			$target_call='';
			break;
	}
	if($target_call){ $call = $target_call; }
		
	$postdata = http_build_query($params);

	//log2file('cmd: '.$cmd.', Call: '.$call->sid.", Target Call: ".$target_call->sid.", Update: ".$GLOBALS['SETTINGS']['twilio_setup_url'].'?'.$postdata);
	$call->update(array('Url' => $GLOBALS['SETTINGS']['twilio_setup_url'].'?'.$postdata, 'Method' => 'POST'));
}

function checkBalance(){
	global $twilio;
		
	$twilio->updateCallStatus($_REQUEST['CallSid'],$_REQUEST['CallDuration'],$_REQUEST['CallStatus']);
	
	uselib('payment::authorizenet');
	uselib('notification');
		
	$payment = new authorizeNET();	

	$account = $twilio->getAccount($_REQUEST['AccountSid']);
	$res = clearFunds($account->user_id);
	print json_encode($res);	
}	

function downloadRecording(){
	global $twilio;

	if($_REQUEST['callSid']){
		$recs = $twilio->getRecordings($_REQUEST['callSid'],$_REQUEST['accountSid']);			
		if($recs){
			$file = reset($recs);
			$filename = $_REQUEST['callSid'].'.wav';			
			$localfile = downloadRemoteFile($file,$filename);
			
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header('Content-Disposition: attachment; filename="'.$filename.'"'); // adding quotes and stripping full path
			header('Content-Transfer-Encoding: binary');
			header('Connection: Keep-Alive');
			header('Expires: 0');
			header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			header("Cache-Control: private",false); // required for certain browsers
			header('Pragma: public');

			ob_clean();
			flush();
			readfile($localfile);
			unlink($localfile);
			exit;						
		}
	}
}
function downloadRemoteFile($url,$filename){
	$localfile = $GLOBALS['system']['tmp_path']."/$filename";
	$curl = curl_init($url);
	curl_setopt_array($curl, array(
	CURLOPT_URL            => $url,
	CURLOPT_BINARYTRANSFER => 1,
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_FILE           => fopen($localfile, "w")
	));
	$response = curl_exec($curl);
	return ($response)?$localfile:false;	
}
function recordVoicemailMessage(){
	global $twilio;
					
	try {
		$response = new Services_Twilio_Twiml();		
		$response->pause(array('length'=>2));
		$response->say('Please record your message at the beep.');							
		$response->record(array(
			'action' => $GLOBALS['SETTINGS']['twilio_setup_url'].'?voicemailRecordingEnded=1&numberId='.$_REQUEST['numberId'],
			'method' => 'POST',
			'finishOnKey' => '#',
			'maxLength'	=> 60*5
		));				
		$response->say('I did not hear a recording.  Goodbye.');		
	} catch (Exception $e) { $twilio->error('Voicemail Recording: '.$e->getMessage(), true); }
	
	header('Content-Type: text/xml');
	print $response;		
	exit;		
}
function saveVoicemailMessage(){	
	global $twilio;
					
	try {
		$response = new Services_Twilio_Twiml();
		$res = $twilio->saveVoicemail($_REQUEST['numberId'],$_REQUEST['RecordingUrl']);
		if($res){						
			$response->say('Thanks for your recording. The following voicemail message was recorded');							
			$response->play($_REQUEST['RecordingUrl']);
			$response->pause(array('length'=>2));
			$response->say('Goodbye');		
		}
		else{
			$response->say('An unknown error has occured. Please contact the system administrator');
			$twilio->error('Saving Voicemail Recording: SQL ERROR', true);
		}
		$response->hangup();		
					
	} catch (Exception $e) { $twilio->error('Saving Voicemail Recording: '.$e->getMessage(), true); }
	
	header('Content-Type: text/xml');
	print $response;		
	exit;		
}

function notify(){
	global $twilio, $am, $amv2, $blacklist;
        
	$to = $_REQUEST['To'];
	$from = $twilio->strip($_REQUEST['From']);
	$number = $twilio->findNumber($to);
	$userIds = $twilio->getAssociatedUsers($number->id);
 	
	$lead = Leads::findLeadByNumber($from,reset($userIds));

        if(!$lead){
            $user_id = (is_array($userIds))?$userIds[0]:$userIds;
            $leadObj = new Leads($user_id);
            $source = 'Voice Blast';
            $lead_data = array("agent_id"=>$user_id,"phone"=>$from,"source"=>$source, "system_created_leads"=>0, "unread"=>1);
            $lead_id = Leads::createLead($user_id,$lead_data);
            $leadObj->createAssignTags($lead_id,'System Generated Call-In Lead');
            
            $twilio->logInboundCall($number->id,$_REQUEST['CallSid'],$from,$_REQUEST['CallDuration'],$_REQUEST['CallStatus']);
        }
        else{
            if ($lead['system_created_leads']==1){ //check for the first time response from lead
                $userId = reset($userIds);
                $source = 'Voice Blast';

                if ($lead['am_campaign_id']){
                    $campaign = $am->getCampaign($lead['am_campaign_id']);
                    $lead_data = array("source"=>$source, "system_created_leads"=>0, "unread"=>1, "tags"=>explode(",",$campaign['tags']) );
//                    $is_am = true;
                }
                if ($lead['amv2_campaign_id']){
                    $campaign = $amv2->getCampaign($lead['amv2_campaign_id']);
                    $lead_data = array("source"=>$source, "system_created_leads"=>0, "unread"=>1, "tags"=>explode(",",$campaign['tags']) );
                    $is_amv2 = true;
                }

                if ($lead_data){
                    if($campaign['buyer_seller'] == 'buyer'){ $lead_data['is_buyer']=1; $lead_data['is_seller']=0; }
                    else if($campaign['buyer_seller'] == 'seller'){ $lead_data['is_buyer']=0; $lead_data['is_seller']=1; }
                    else{ $lead_data['is_buyer']=0; $lead_data['is_seller']=0; }
                    Leads::updateLeadInfo($userId, $lead['id'], $lead_data);
                }
            }
        }
        
        list($agent_number_id) = mysql_fetch_array(mysql_query("SELECT agent_number_id FROM leads WHERE id='{$lead['id']}'"));
        if (!$agent_number_id && $number->id) mysql_query("UPDATE leads SET agent_number_id='".$number->id."' WHERE id='{$lead['id']}'");
        
        if ($lead['id']) Leads::updateLeadTimestamp($lead['id']);
        
        if ($lead['id'] && $lead['active']==0) { //make archived leads to un-archived
            $userId = reset($userIds);
            $lead_archive_data = array("active"=>1, "unread"=>1);
            Leads::updateLeadInfo($userId, $lead['id'], $lead_archive_data);
        }
        
        if ($lead['id'] && $lead['is_deleted']==1) { //make archived leads to un-archived
            $userId = reset($userIds);
            $lead_restore_data = array("is_deleted"=>0);
            Leads::updateLeadInfo($userId, $lead['id'], $lead_restore_data);
        }
        
        //get recording and transcription of the recording
        $recs = $twilio->getRecordings($_REQUEST['CallSid']);
 	$checkTranscribe = $twilio->checkTranscribe($number->id);
 	$call = $twilio->getCall($_REQUEST['CallSid']);	
	
	if(!empty($recs)) $rec = reset($recs);
	else $rec = '';	
	$text = false;		
	
        //get the transcription of the recording
	if($checkTranscribe && $rec && $rec != '' && $call->id){
            uselib('transcription::transcription');
            $trans = new Transcription($call->id,$rec,false);
            $text = $trans->text;
            $text = mysql_real_escape_string($text);
            
            if ($text) {
                $data_arr[] = "Message: ".$text;
                $twilio->updateTimeLine($_REQUEST['CallSid'],$data_arr,$rec);
                $found = $blacklist->checkBlackListKeyword(reset($userIds),$from,$text);
                if ($found) return;                
            }	
	}
	
        uselib('notification');
        $notify = new Notification();
        $fromNumber  = Twilio::format($from);
        $toNumber    = Twilio::format($to);

        $attachments = array();
        $recordingFile = $duration = '';

        if($rec){
            $audio = file_get_contents_curl($rec);
            $file = $GLOBALS['system']['audio_path'] . '/' . uniqId() .'.wav';
            file_put_contents($file , $audio );
            $attachments[] = $file;
            $recordingFile = $GLOBALS['SETTINGS']['twilio_setup_url'].'?action=downloadRecording&callSid='.$_REQUEST['CallSid'].'&accountSid='.$_REQUEST['AccountSid'];
            $duration = date('i:s',$duration);
        }

        //notify user
        if ($is_amv2) $res = $amv2->checkClassificationRules(reset($userIds),$from,$text,"Voice");
        if ($is_am) $res = $am->checkClassificationRules(reset($userIds),$from,$text,"Voice");
        if(!empty($res['notifyUsers'])){
            $notifyUsers = $res['notifyUsers'];
            $leadId = $res['leadId'];

            $subject = "New Automarketer Lead";
            $message = array('file'=>$GLOBALS['system']['email_template_path'].'/amLead.phtml');

            $fromNumber  = Twilio::format($from);
            $toNumber    = Twilio::format($to);

            $data = array(
                'campaignId'	=> $res['campaign']['id'],
                'campaignTitle'	=> $res['campaign']['title'],
                'fpCampaigns'	=> $res['fpCampaigns'],
                'leadId'	=> $leadId,			
                'recording'	=> $recordingFile,
                'text'          => $text,
                'fromNumber'    => $fromNumber,
                'toNumber'      => $toNumber,
                'direction'        => $_REQUEST['Direction'],
                'type'          => 'voice'
            );			
            $notify->notify($notifyUsers,$message,$subject,$data,false,$attachments,$fromNumber);
        }
        else{
            $message = array('file'=>$GLOBALS['system']['email_template_path'].'/voicemail.phtml');
            $subject = '{from}: New Voicemail';
            $fromNumber  = Twilio::format($from);
            $toNumber  = Twilio::format($to);
            
            // $data = array(
            //     'from'		=> $fromNumber,
            //     'number'        => $toNumber,
            //     'recording'     => $recordingFile,
            //     'leadId'        => $lead['id'],
            //     'text' 		=> $text
            // );
            
            
            if($lead['id']) $leadId = $lead['id'];
            else if ($lead_id) $leadId = $lead_id;
            
            $data = array(
                'from'		=> $fromNumber,
                'number'        => $toNumber,
                'recording'     => $recordingFile,
                'leadId'        => $leadId,
                'text' 		=> $text
            );
            
            
            if($number) {
                $query = mysql_query("SELECT a.user_id FROM `twilio_numbers_assignments` AS a INNER JOIN users as u ON u.id=a.user_id WHERE a.number_id={$number->id} AND u.status=1 group by a.user_id");
                while($n = mysql_fetch_assoc($query)){
                    $users_ids[] = $n['user_id'];
                }
                
                if(count($users_ids)>1){
                    $userIds = $users_ids;
                }
                else $userIds = reset($userIds);

            }
            else $userIds = reset($userIds);

            $notify->notify($userIds,$message,$subject,$data,false,$attachments,$fromNumber);
        }
}
function log2file($msg){
	$fh = fopen('/home/admin/public_html/php/util/test.txt', 'a');
	fwrite($fh, "--------------------------------------------------------------------------\n".$msg."\n--------------------------------------------------------------------------\n\n");
	fclose($fh);
}










/*
function callTransribed(){
	try {		
		if(isset($_REQUEST['TranscriptionUrl'])){
			$message = mysql_real_escape_string($_REQUEST['TranscriptionText']);
			
			mysql_query("UPDATE voice_received SET 
							message = '$message',
							message_url = '$_REQUEST[RecordingUrl]',
							status = '$_REQUEST[CallStatus]'
						WHERE sid = '$_REQUEST[CallSid]'");
													
			$error = mysql_error();
			if(!empty($error)){ error($error); }
			else{
						
				$sql = "SELECT voice_received.id,voice_received.campaign FROM voice_received 
						LEFT JOIN voice_sent ON voice_sent.to=voice_received.from_digits 
						WHERE 						
						(
							(voice_sent.answeredBy='machine' AND voice_sent.duration > 3)
							OR
							(voice_sent.qid is NULL)
						)
						AND voice_received.message!='(blank)' AND voice_received.sid = '$_REQUEST[CallSid]'";					
						
				$query = mysql_query($sql);
				$data = mysql_fetch_assoc($query);
				if($data['id']>0){	
					$ads = getAds($from,$_REQUEST['FromState'],$data['campaign']);
					notify($_REQUEST['CallSid'],$ads); 
				}
				
			}
			
		}
	} catch (Exception $e) {
		error($e->getMessage());		
	}
				
	header('Content-Type: text/xml');
	print $response;
	exit;
}
function callRecorded(){
	try {
		if(isset($_REQUEST['RecordingUrl'])){
			mysql_query("UPDATE voice_received SET 
							status = '$_REQUEST[CallStatus]',
							message_url = '$_REQUEST[RecordingUrl]'
						WHERE sid = '$_REQUEST[CallSid]'");
													
			$error = mysql_error();
			if(!empty($error)){ error($error); }
		}
	} catch (Exception $e) {
		error($e->getMessage());		
	}
				
	header('Content-Type: text/xml');
	print $response;
	exit;
}
*/

?>