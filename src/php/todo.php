<?php	
session_write_close();

t("Don't use this page anymore");

usehelper("ajax::dispatch");

function getSources(){
	$items = array();
	$q = mysql_query("SELECT DISTINCT source FROM events");
	while(list($s) = mysql_fetch_array($q))$items[]=$s;

	return $items;
}
function closeTodo(){
	$id = $_REQUEST['id'];
	sql("UPDATE todo SET closed=1 WHERE id='{$id}'");
}
function saveTodo(){
	$notes = $_REQUEST['notes'];
	$refunded = $_REQUEST['refunded'];
	$id = $_REQUEST['id'];
	sql("UPDATE todo SET notes='{$notes}',refunded='{$refunded}' WHERE id='{$id}'");
}
function loadTodo($id=0,$ajax=true){
	if(!$id)$id = $_REQUEST['id'];
	
	$q = mysql_query("SELECT t.*, s.source FROM todo AS t							
						LEFT JOIN events_sales AS s ON s.id=t.sale_id						
						LEFT JOIN events AS e ON e.remote_id=s.event_remote_id
						LEFT JOIN events_inventory AS i ON i.sale_id=t.sale_id					
						WHERE t.id='$id'");
	$item = mysql_fetch_assoc($q);
	if($item)$item = formatTodo($item);

	if($ajax){
		json(array('item'=>$item));
	}
	else{
		return $item;
	}
}
function loadTodos(){		
	$sortColumns = array('t.timestamp','t.title','t.event_remote_id','s.source','t.sale_id','s.portal_remote_id','s.date','s.status','s.status_transfer','','t.closed','t.refunded','');
	
		
	$array = array();
	
	$offset = (int)$_REQUEST['start'];
	$length = (int)$_REQUEST['length'];
	
	if($_REQUEST['todo'])$orderby = array('col'=>$sortColumns[$_REQUEST['todo'][0]['column']],'dir'=>$_REQUEST['todo'][0]['dir']);
	
	$offset = $offset;
	$length = (int) $length;
	if ($length)
		$limit = "LIMIT $offset,$length";
	else
		$limit = "";
	
	if (!$orderby)
		$orderby = array('t.timestamp DESC');
	else
		$orderby = array($orderby['col'] . " " . $orderby['dir']);
			
	$wheresql = array("1=1");
	
	$filter = $_REQUEST['filter'];
	if($filter){
		foreach($filter as $k=>$v){
			if(!is_string($v) || strlen(trim($v))){
				switch($k){		
					case 'order_id':
						$wheresql[] = "s.portal_remote_id='{$v}'";
						break;
					case 'status':						
						$wheresql[] = "t.closed = '{$v}'";
						break;
					case 'source':
						$wheresql[] = "s.source = '{$v}'";
						break;
					case 'edate':
						$range = explode(" - ",$v);
						$wheresql[] = "e.date BETWEEN '".dbdate($range[0])." 00:00:00' AND '".dbdate($range[1])." 23:59:59'";
						break;
					case 'refunded':
						if($v == 1)$wheresql[] = "t.refunded>0";
						if($v == -1)$wheresql[] = "t.refunded=0";
						break;
					case 'needtolist':
						if($v == 1){
							$wheresql[] = "e.date>=now()";
							$wheresql[] = "i.id IS NULL";
							$wheresql[] = "s.processed_user_id>0";
						}
						break;
					case 'date':
						$range = explode(" - ",$v);
						$wheresql[] = "t.timestamp BETWEEN '".dbdate($range[0])." 00:00:00' AND '".dbdate($range[1])." 23:59:59'";
						break;					
					default:
						break;
				}
			}
		}
	}	
	
	$sql = "SELECT SQL_CALC_FOUND_ROWS t.*,s.source FROM todo AS t	
				LEFT JOIN events_sales AS s ON s.id=t.sale_id						
				LEFT JOIN events AS e ON e.remote_id=s.event_remote_id
				LEFT JOIN events_inventory AS i ON i.sale_id=t.sale_id
				WHERE ".implode(" AND ",$wheresql)." 	
				GROUP BY t.id 			
				ORDER BY  " . implode(' ', $orderby) . " $limit";
	//t($sql);
	$q = mysql_query($sql);
	list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS();"));
	while($r = mysql_fetch_assoc($q)){
		$array[] = formatTodo($r);
	}
	json(array(
		'data'=> $array,
		'total' => $total,
		'page' => $offset,
		'sort'	=> ($sortby)?$sortby['col']:$_REQUEST['todo'][0]['column'],
		'sortDir' => ($sortby)?$sortby['dir']:$_REQUEST['todo'][0]['dir'],
		'length' => $length,
	));
}
function formatTodo($r){
	$r['timestamp_ago'] = xTimeAgo($r['timestamp'],'now');
	$r['timestamp'] = date('m/d/Y h:iA',strtotime($r['timestamp']));

	list($r['listed']) = mysql_fetch_array(mysql_query("SELECT SUM(qty) FROM events_inventory WHERE sale_id='{$r['sale_id']}'"));
	$r['listed'] = (int)$r['listed'];
	$r['refunded'] = number_format($r['refunded'],2);
	
	$r['sale'] = mysql_fetch_assoc(mysql_query("SELECT * FROM events_sales WHERE id='{$r['sale_id']}'"));
	if($r['sale']){
		$r['sale']['timestamp_ago'] = xTimeAgo($r['sale']['timestamp'],'now');
		$r['sale']['timestamp'] = date('m/d/Y h:iA',strtotime($r['sale']['timestamp']));
		$r['sale']['status'] = ucfirst($r['sale']['status']);

		if($r['sale']['manual_confirm_user_id']) list($r['sale']['manual_confirm_user']) = mysql_fetch_array(mysql_query("SELECT username FROM users WHERE id='{$r['sale']['manual_confirm_user_id']}'"));
		if($r['sale']['processed_user_id']) list($r['sale']['processed_user']) = mysql_fetch_array(mysql_query("SELECT username FROM users WHERE id='{$r['sale']['processed_user_id']}'"));
		if($r['sale']['status_details_user_id']) list($r['sale']['status_details_user']) = mysql_fetch_array(mysql_query("SELECT username FROM users WHERE id='{$r['sale']['status_details_user_id']}'"));
		
		$r['updates'] = array();
		$q = mysql_query("SELECT u.*, us.username FROM events_sales_updates AS u
						LEFT JOIN users AS us ON us.id=u.user_id 
						WHERE sale_id='{$r['sale_id']}'  
						ORDER BY u.id DESC");
		while($u = mysql_fetch_assoc($q)){
			$u['timestamp'] = date('m/d/Y h:iA',strtotime($u['timestamp']));
			$u['ago'] = xTimeAgo($u['timestamp'],'now');
			
			$r['updates'][] = (object)$u;
		}
		
		$r['charges'] = array();		
		$r['charges_total'] = 0; //$r['sale']['price'];
		//$r['charges'][] = (object)array("amount"=>$r['sale']['price'],"description"=>"Payout reversal");		
		$q = mysql_query("SELECT * FROM events_sales_charges WHERE sale_id='{$r['sale_id']}'");
		while($c = mysql_fetch_assoc($q)){ $r['charges_total']+=$c['amount']; $r['charges'][] = (object)$c; }
		$r['charges_total'] = number_format($r['charges_total'],2);				
		
	}
	$r['event'] = mysql_fetch_assoc(mysql_query("SELECT * FROM events WHERE remote_id='{$r['sale']['event_remote_id']}'"));
	return (object)$r;
}