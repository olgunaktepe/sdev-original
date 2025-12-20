<?
abstract class Types extends BasicEnum {
    const NewOrder = 1;    
    const Cancellation = 2;
}

Class Alerts{
	private $userId, $settings;
	public function __construct($uId=0){
		$this->userId = ($uId)?$uId:$_SESSION['user']->id;	
		
		$this->settings = (object)array(
			'alerts_rate'		=> 1
		);
	}	
	public function get($filter=array(),$limit=0, $offset=0){
		$res = $this->fetch($filter,$limit,$offset);
		return $res['alerts'];
	}
	public function getCount($filter=array()){
		$res = $this->fetch($filter);
		return $res['total'];
	}
	public function fetch($filter=array(),$limit=0, $offset=0){
		$userId = $_SESSION['user']->id;		
		$this->cleanup();
		$alerts = array();
		
		$offset = (int)$offset*(int)$limit;
		$limit = ((int)$limit)?" LIMIT $offset,$limit":'';
		
		$wheresql = array();
		$wheresql[] = "a.deleted=0";
		$wheresql[] = "a.user_id='".Users::getOwnerId($this->userId)."'";
		foreach($filter as $k=>$v){					
			if(!is_string($v) || trim($v)){
				switch($k){				
					case 'type':					
						$tId = Types::isValidName($v); 								
						$wheresql[] = "a.type_id = '$tId'";
						break;
					case 'range':					
						$range = explode(" - ",$v);						
						$wheresql[] = "a.`timestamp` BETWEEN '".dbdate($range[0])." 00:00:00' AND '".dbdate($range[1])." 23:59:59'";
						break;
					case 'notify':						
						$wheresql[] = "n.id IS NULL";
						break;
					default:
						$wheresql[] = "a.`{$k}` = '$v'";
						break;
				}			
			}			
		}
		
		$sql = "SELECT SQL_CALC_FOUND_ROWS t.*,a.* FROM alerts AS a
							LEFT JOIN alerts_types AS t ON t.id=a.type_id	
							LEFT JOIN alerts_notifications AS n ON n.alert_id=a.id AND n.user_id='{$userId}'						
							WHERE ".implode(" AND ",$wheresql)."
							ORDER BY a.timestamp DESC
							$limit";
		//t($sql);
		$q = mysql_query($sql);
		list($total) = mysql_fetch_array(mysql_query("SELECT FOUND_ROWS()"));
		while($r = mysql_fetch_assoc($q)){
			$alerts[] = $this->format($r);
		}		
		return array('alerts'=>$alerts,'total'=>$total);
	}
	private function cleanup(){
		mysql_query("DELETE FROM alerts WHERE timestamp <'".date('Y-m-d 00:00:00',strtotime("-10 days"))."'");
		//mysql_query("DELETE FROM alerts AS a LEFT JOIN events AS e ON e.id=a.event_id WHERE e.date < DATE(NOW())");
		/*
		$orderIds = array();
		$q = mysql_query("SELECT DISTINCT order_id FROM alerts");								
		while(list($oId) = mysql_fetch_array($q)){
			list($pending) = mysql_fetch_array(mysql_query("SELECT id FROM events_sales WHERE portal_remote_id='{$oId}' AND status='pending'"));
			if(!$pending) mysql_query("DELETE FROM alerts WHERE order_id='{$oId}'");
		}
		*/		
	}
	private function format($r){				
		$r['event'] = $this->getEvent($r['event_id']);
		$r['notification'] = $this->getAlertNotificationStatus($r['id']);
			
		return (object)$r;
	}
	public function markAsNotified($aIds){
		$userId = $_SESSION['user']->id;
		if(!$userId)return false;
		
		if($aIds && !is_array($aIds))$aIds = array($aIds);
		foreach($aIds as $aId){
			mysql_query("INSERT INTO alerts_notifications SET alert_id='{$aId}',user_id='{$userId}'");
		}
		
	}
	private function getAlertNotificationStatus($aId){
		$userId = $_SESSION['user']->id;		
		if(!$userId)return false;
		
		list($status) = mysql_fetch_array(mysql_query("SELECT * FROM alerts_notifications WHERE alert_id='{$aId}' AND user_id='{$userId}'"));
		return ($status)?true:false;
	}
	private function getEvent($eId){
		if(!$eId)return false;
		
		$q = mysql_query("SELECT * FROM event WHERE id='$eId'");
		$r = mysql_fetch_assoc($q);		
		return $r;
	}
	public function create($type,$eventId,$orderId,$title,$description,$data=array()){
		//$res = Types::isValidValue(1);
		
//		$found = $this->checkAlertRate($type,$eventId);
//		if($found)return false;		
				
		$tId = Types::isValidName($type); 			
		if(!$tId){ 			
			throw new Exception('Type not found');
			return false;
		}
		
		$updatesql = array();
		$updatesql[] = "type_id='$tId'";
		$updatesql[] = "user_id='{$this->userId}'";
		$updatesql[] = "event_id='{$eventId}'";				
		$updatesql[] = "order_id='{$orderId}'";
		$updatesql[] = "title='".mysql_real_escape_string($title)."'";
		$updatesql[] = "description='".mysql_real_escape_string($description)."'";
		$updatesql[] = "data='".base64_encode(json_encode($data))."'";
		
		$sql = "INSERT INTO alerts SET ".implode(", ",$updatesql);
		//t($sql);
		mysql_query($sql);		
		$error = mysql_error();

		if($error){
			throw new Exception('Unexpected error');
			return false;
		}
		$id = mysql_insert_id();
		return $id;
	}
	public function checkAlertRate($type,$eventId){
		$tId = Types::isValidName($type); 										
		#t("SELECT id FROM alerts WHERE type_id='$tId' AND inv_id='$invId' AND event_id='$eventId' AND `timestamp` > DATE_SUB(now(), INTERVAL ".$this->settings->alerts_rate." DAY) LIMIT 1",1);
		list($alert) = mysql_fetch_array(mysql_query("SELECT id FROM alerts WHERE type_id='$tId' AND event_id='$eventId' AND `timestamp` > DATE_SUB(now(), INTERVAL ".$this->settings->alerts_rate." DAY) LIMIT 1"));						
		return ($alert)?true:false;
	}
	public function read($id){
		mysql_query("UPDATE alerts SET unread = 0 WHERE id='$id'");
	}	
	public function remove($id){
		mysql_query("UPDATE alerts SET deleted=1 WHERE id='$id'");
	}
	public function removeAll(){
		mysql_query("UPDATE alerts SET deleted=1 WHERE user_id='{$this->userId}'");
	}
	
	public function generateOrderAlert($orderId,$portal,$data){
		$title = "New Order";		
		$description = "New {$portal} Order {$orderId}: {$s->section}, {$s->row}, {$s->seatNumbers}";	
		$this->create('NewOrder',0,$orderId,$title,$description);			
	}			
	public function generateCancellationAlert($orderId,$data){
		$title = "ORDER CANCELLED!";
		$description = "{$data->portal} Order cancelled. Order ID: {$data->portal_remote_id}, Status: {$data->status}";
		$this->create('Cancellation',0,$orderId,$title,$description);
	}
	
	public function generateAlerts(){						
	}	
}

abstract class BasicEnum {
    private static $constCacheArray = NULL;

    private static function getConstants() {
        if (self::$constCacheArray == NULL) {
            self::$constCacheArray = [];
        }
        $calledClass = get_called_class();
        if (!array_key_exists($calledClass, self::$constCacheArray)) {
            $reflect = new ReflectionClass($calledClass);
            self::$constCacheArray[$calledClass] = $reflect->getConstants();
        }
        return self::$constCacheArray[$calledClass];
    }

    public static function isValidName($name) {
        $constants = self::getConstants();

        $keys = array_map('strtolower', array_keys($constants));		
		$index = array_search(strtolower($name), $keys);		
		
		$values = array_values(self::getConstants());		
		return $values[$index];
    }

    public static function isValidValue($value) {
        $values = array_values(self::getConstants());				
		$index = array_search(strtolower($value), $values);
		$keys = array_keys(self::getConstants());		
		return $keys[$index];		
    }
}