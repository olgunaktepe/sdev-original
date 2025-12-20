<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

$user = 'thomas.hickman58@gmail.com';

uselib('AWS::mturk');
uselib('parser');


/*
$mturk = new mTurk();
$pr = new Parser();

$res = $pr->mTurkCheck();
t($res);

//Queue mturk listings
$q = mysql_query("SELECT * FROM emails WHERE subject LIKE 'New Listing%' AND mturk_id IS NULL ORDER BY id DESC LIMIT 50");
while($r = mysql_fetch_assoc($q)){
    $res = $pr->mTurkQueueEmail($r['id'],'png'); 
    t($res,1);
}
t('stop');

//$mturk->rejectResults('3OONKJ5DKCI8AADERT7C9KJZ3J0BOD','Worker filled all answers with NA');
//$res = $mturk->getBalance();
//$res = $pr->mTurkQueueEmail('11861','png');     //Walgreens
//$res = $pr->mTurkQueueEmail('11856','png');  
//$res = $pr->mTurkQueueEmail('11853','png');  
$res = $pr->mTurkCheck();
t($res);
*/



uselib('gmail::gmail');
// Get the API client and construct the service object.
$client = getClient($user);
$service = new Google_Service_Gmail($client);

$filter = ' ';
#$filter = 'after:'.date("m/d/Y",strtotime("today")).'  ("You Just Scored Tickets" OR "You Got Tickets")';
#$filter = 'after:'.date("m/d/Y",strtotime("-60 days"));
$filter = "from: GilesStevens@outlook.com";
//t("Filter: ".$filter,1);

$token = NULL;
do{
    list($messages,$token) = listMessagesPaginated($service,$user,$filter,$token);
    
    foreach($messages as $m){
        $mId = $m->getId();    
        //$message = $service->users_messages->get($user, $mId);
        $email = getMessage($service,$user,$mId);
        
        $text = $email->text;
        $html = $email->html;
        $date = $email->date;    
        $subject = $email->subject;
        $from = $email->from;

        t($html);
    
        preg_match("/(.*?) <(.*?)>/",$email->from,$matches);
        if($matches){
            $from = $matches[2];
        }
    
        mysql_query("INSERT INTO emails SET remote_id='{$email->remoteId}',
                                            email='{$from}',
                                            date = '".dbTimestamp($date)."',
                                            subject='".mysql_real_escape_string($subject)."',
                                            text='".mysql_real_escape_string($text)."',
                                            html='".mysql_real_escape_string($html)."'");
        t(mysql_error(),1);
    }
}while($messages && $token);

