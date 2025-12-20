<?php
uselib('users');
uselib("sessions");
uselib('menu');
uselib('users'); 
uselib('deal'); 
uselib('filters'); 
uselib('contacts'); 
uselib('twilio::twilio'); 

mysql_query("SET SQL_MODE = ''");

foreach($_REQUEST as $k=>$v){ if(!is_array($v)){$_REQUEST[$k] = mysql_real_escape_string($v);} }

$GLOBALS["states"] = array("AL" => "Alabama","AK" => "Alaska","AS" => "American Samoa","AZ" => "Arizona","AR" => "Arkansas","AF" => "Armed Forces Africa","AA" => "Armed Forces Americas","AC" => "Armed Forces Canada","AE" => "Armed Forces Europe","AM" => "Armed Forces Middle East","AP" => "Armed Forces Pacific","CA" => "California","CO" => "Colorado","CT" => "Connecticut","DE" => "Delaware","DC" => "District of Columbia","FM" => "Federated States Of Micronesia","FL" => "Florida","GA" => "Georgia","GU" => "Guam","HI" => "Hawaii","ID" => "Idaho","IL" => "Illinois","IN" => "Indiana","IA" => "Iowa","KS" => "Kansas","KY" => "Kentucky","LA" => "Louisiana","ME" => "Maine","MH" => "Marshall Islands","MD" => "Maryland","MA" => "Massachusetts","MI" => "Michigan","MN" => "Minnesota","MS" => "Mississippi","MO" => "Missouri","MT" => "Montana","NE" => "Nebraska","NV" => "Nevada","NH" => "New Hampshire","NJ" => "New Jersey","NM" => "New Mexico","NY" => "New York","NC" => "North Carolina","ND" => "North Dakota","MP" => "Northern Mariana Islands","OH" => "Ohio","OK" => "Oklahoma","OR" => "Oregon","PW" => "Palau","PA" => "Pennsylvania","PR" => "Puerto Rico","RI" => "Rhode Island","SC" => "South Carolina","SD" => "South Dakota","TN" => "Tennessee","TX" => "Texas","UT" => "Utah","VT" => "Vermont","VI" => "Virgin Islands","VA" => "Virginia","WA" => "Washington","WV" => "West Virginia","WI" => "Wisconsin","WY" => "Wyoming");

//Load Menu
$menu = getUserMenu();
$GLOBALS['menu'] = new Menu($menu);

function getUserMenu(){	
	if($_SESSION['user']->type_id <= 2){
		$menu =  array(	
			'controlpanel/index' => array(
				'title' => 'Control Panel',
				'icon' => 'fa fa-pie-chart',
				'submenu' => array()
			),
			/*
			'listings' => array(
				'title' => 'Listings',
				'icon' => 'fa fa-list',
				'submenu' => array()
			),
			*/
			/*
			'listings2' => array(
				'homepage' => 1,
				'title' => 'Listings',
				'icon' => 'fa fa-list',
				'submenu' => array()
			),
			*/
			'listingsDev' => array(
				'homepage' => 1,
				'title' => 'Listings V2',
				'icon' => 'fa fa-list',
				'submenu' => array()
			),
			'stats' => array(
				'homepage' => 1,
				'title' => 'Stats Tool',
				'icon' => 'fa fa-area-chart',
				'submenu' => array()
			),
			'dups' => array(
				'homepage' => 1,
				'title' => 'De-duping Engine',
				'icon' => 'fa fa-files-o',
				'beta' => 1,
				'submenu' => array()
			),
			'scrapedemails' => array(
				'title' => 'Scraped Emails',
				'icon' => 'fa fa-envelope',
				'submenu' => array()
			),
			'phonemanager' => array(
				'title' => 'Phone Manager',
				'icon' => 'fa fa-phone',
				'submenu' => array()
			),
			'settings' => array(
				'title' => 'Settings',
				'icon' => 'fa fa-cogs',		
				'submenu' => array()
			)
		);	
		if($_SESSION['user']->type_id == 1){
			$menu['team'] = array(
				'title' => 'Manage Team',
				'icon' => 'fa fa-users',
				'submenu' => array()
			);
		}
	}
	else if($_SESSION['user']->type_id == 3 || $_SESSION['user']->type_id == 4){
		$menu =  array(		
			'phonemanager' => array(
				'homepage' => 1,
				'title' => 'Phone Manager',
				'icon' => 'fa fa-phone',
				'submenu' => array()
			),		
		);
	}

	return $menu;
}

//Load Admin Settings
$query = mysql_query("SELECT * FROM admin_settings");
while($data = mysql_fetch_assoc($query)){		
	$GLOBALS['SETTINGS'][$data['name']] = $data['value'];	
}

$GLOBALS["category_map"] = [];
$query = mysql_query("SELECT * FROM category_mapper");
while($data = mysql_fetch_assoc($query)){		
	$GLOBALS["category_map"][$data['label']] = $data['category'];	
}

//Set the current IP for the user.
$curIP = getIP();
$curSession = Users::getIp();
if($curSession != $curIP) Users::setIp();
