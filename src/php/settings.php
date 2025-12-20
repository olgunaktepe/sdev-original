<?php
//$userId = 1419;
//$userId = 1403;
//$userId = 1448;
//$userId = 1449;
$userId = 1;
//$userId = 2;

usehelper('ajax::dispatch');

$system_settings = Users::getUserSettings($userId);

function panicOn(){
	sql("UPDATE admin_settings SET value=1 WHERE name='panic_mode'");
}
function panicOff(){
	sql("UPDATE admin_settings SET value=0 WHERE name='panic_mode'");
}

function systemsave(){
	global $userId;
	
	unset($_POST['action']);
	mysql_query("DELETE FROM user_settings WHERE user_id='{$userId}'");
	foreach($_POST as $k=>$v){ 		
		mysql_query("INSERT INTO user_settings SET `name`='{$k}', `value`='{$_REQUEST[$k]}', user_id='$userId'");	
	}	
	json();
}
?>