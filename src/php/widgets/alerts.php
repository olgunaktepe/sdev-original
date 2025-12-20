<?php
session_write_close();

uselib("alerts");
//$alerts = new Alerts();

usehelper('ajax::dispatch');

function getNotifications(){
	global $alerts;

	json(['res'=>'off']);
	exit;
		
	$items = $alerts->get(array('notify'=>1),3);
			
	if($items){
		$ids = array();			
		foreach($items as $i){ $ids[] = $i->id; }
			
		$alerts->markAsNotified($ids);
	}
	json(array('items'=>$items));
}
function getList(){
	global $alerts;

	json(['res'=>'off']);
	exit;
		
	$items = $alerts->get(array('unread'=>1),5);
	json(array('items'=>$items));
}
function getCount(){
	global $alerts;

	json(['res'=>'off']);
	exit;
		
	$count = $alerts->getCount(array('unread'=>1));
	json(array('count'=>$count));
}
function read(){
	global $alerts;
	
	$id = (int)$_REQUEST['id'];
	
	$alerts->read($id);
	json();	
}
function search(){
	global $alerts;
	
	$items = $alerts->get($_REQUEST['filter'],30,$_REQUEST['page']);
	json(array('items'=>$items));
}
function remove(){
	global $alerts;
	
	$id = (int)$_REQUEST['id'];
	
	$alerts->remove($id);
	json();	
}
function removeAll(){
	global $alerts;
		
	$alerts->removeAll();
	json();		
}