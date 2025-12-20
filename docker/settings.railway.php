<?php
date_default_timezone_set('America/New_York');

###########################DB Settings (Railway Environment Variables)
$GLOBALS['db_host'] = getenv('MYSQLHOST') ?: 'localhost';
$GLOBALS['db_user'] = getenv('MYSQLUSER') ?: 'root';
$GLOBALS['db_pass'] = getenv('MYSQLPASSWORD') ?: '';
$GLOBALS['db_name'] = getenv('MYSQLDATABASE') ?: 'railway';

###########################Site Settings
$railwayDomain = getenv('RAILWAY_PUBLIC_DOMAIN') ?: 'localhost';
$GLOBALS['site']['title'] = 'SDEV Test';
$GLOBALS['site']['url'] = 'https://' . $railwayDomain . '/';
$GLOBALS['site']['redirect'] = $GLOBALS['site']['url'];
$GLOBALS['site']['defaultpage'] = 'map';
$GLOBALS['site']['signature'] = "<br><br>Thanks,<br>{$GLOBALS['site']['title']} team";

##########################System Settings
$debugmain = true;
if($debugmain){
	error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);
	ini_set('display_errors', '1');
};

$GLOBALS['system']['path'] 					= '/var/www/html/';
$GLOBALS['system']['js_path'] 				= 'js';
$GLOBALS['system']['template_path'] 		= 'template';
$GLOBALS['system']['email_template_path'] 	= $GLOBALS['system']['path'].$GLOBALS['system']['template_path'].'/emails';
$GLOBALS['system']['script_path'] 			= 'php';
$GLOBALS['system']['href_base'] 			= '/site/';
$GLOBALS['system']['theme_base'] 			= '/theme/Minton/Admin/blue-horizontal/assets/';
$GLOBALS['system']['lib_path'] 				= $GLOBALS['system']['path'].'php/lib';
$GLOBALS['system']['util_path'] 			= $GLOBALS['system']['path'].'php/util';
$GLOBALS['system']['util_href'] 			= $GLOBALS['site']['url'].'bot/util';
$GLOBALS['system']['helper_path'] 			= $GLOBALS['system']['path'].'php/helpers';
$GLOBALS['system']['tmp_path']				= '/tmp';
$GLOBALS['system']['upload_path']			= '/tmp/uploads';
$GLOBALS['system']['upload_href']			= $GLOBALS['system']['href_base'] .'uploads';
$GLOBALS['system']['public_path'] 			= 'public';
$GLOBALS['system']['images_path']			= $GLOBALS['system']['path'] .'images/';
$GLOBALS['system']['images_href']			= $GLOBALS['system']['href_base'] .'images/';
$GLOBALS['system']['snapshots_href']		= $GLOBALS['system']['href_base'] .'snapshots/';
$GLOBALS['system']['snapshots_path']		= $GLOBALS['system']['path'] .'snapshots/';
$GLOBALS['system']['font_path']				= $GLOBALS['system']['path'] .'fonts';

##########################Emails Settings
$GLOBALS['emails']['from'] 					= $GLOBALS['site']['title'];
$GLOBALS['emails']['from_email'] 			= '';
$GLOBALS['emails']['smtp_host'] 			= '';
$GLOBALS['emails']['smtp_username'] 		= '';
$GLOBALS['emails']['smtp_password'] 		= '';
$GLOBALS['emails']['admins']				= array();
$GLOBALS['emails']['defaultTemplate']		= $GLOBALS['system']['email_template_path'] . '/default.phtml';

##########################Widgets
$GLOBALS['widgets']['js_path'] 				= 'js/widgets';
$GLOBALS['widgets']['js_href'] 				= $GLOBALS['widgets']['js_path'];
$GLOBALS['widgets']['script_path'] 			= $GLOBALS['system']['script_path'].'/widgets';
$GLOBALS['widgets']['template_path'] 		= $GLOBALS['system']['template_path'].'/widgets';

##########################Page Settings
$GLOBALS['pages']['public']					= array('login','resetpassword');

##########################Admin Settings
$GLOBALS['superusers'] = array(1);
$GLOBALS['SETTINGS'] = array();
$GLOBALS['DEFAULTS'] = array();

##########################Railway Test Environment
$GLOBALS['bypass_ipblock'] = true;
