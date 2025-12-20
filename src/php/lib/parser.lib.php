<?php
uselib('AWS::mturk');

Class Parser{
    private $mturk, $settings;

    public function __construct(){
        $this->settings = (object)array(
            'default_workers'   => 3
        );
        $this->mturk = new mTurk();
    }
    public function isMturkPending($id){
		$r = mysql_fetch_assoc(mysql_query("SELECT * FROM emails WHERE id='{$id}'"));
		if(!$r)return false;
		
		if($r['mturk_status'] && $r['mturk_status'] != 'ready'){
			return true;
		}
		return false;		
	}
    public function mTurkQueueEmail($id,$type='pdf'){        
		$q = mysql_query("SELECT * FROM emails WHERE id='{$id}'");
		$r = mysql_fetch_assoc($q);        
        if(!$r)return false;

        if($type == 'png'){
            $pngFile = $GLOBALS['system']['path'].'/emailsRenderings/'.$id.'.png';
            $res = html2png($r['html'],$pngFile);
            if(!$res || !file_exists($pngFile))return false;     
            $pngUrl = path2url($pngFile,true);                       
            $srcUrl = $pngUrl;
        }
        else{
            $pdfFile = $GLOBALS['system']['path'].'/emailsRenderings/'.$id.'.pdf';
            $res = html2pdf($r['html'],$pdfFile);
            if(!$res || !file_exists($pdfFile))return false;     
            $pdfUrl = path2url($pdfFile,true);                       
            $srcUrl = $pdfUrl;
        }
        $srcUrl = str_replace('http://','https://',$srcUrl);
        
        t($srcUrl,1);

		$status = $r['mturk_status']; 
		$requeues = $r['mturk_requeues'];				 					
		if($status == 'requeued')$requeues++;
		$uId = 'email.'.$r['id'].'.'.$requeues;				
				
		$tries = 0;
		do{
			t("Trying hit...{$tries}",1);
			$hitId = $this->mturk->createHit($uId,['src'=>$srcUrl],$this->settings->default_workers);	
			$tries++;		
		}while(!$hitId && $tries<3);

		$updatesql = array();
		if($hitId){
			$mturkFailed = 0;
			$updatesql[] = "mturk_id='$hitId'";		
			$updatesql[] = "mturk_status='pending'";
			$updatesql[] = "mturk_completed=NOW()";
					
			if($status == 'requeued'){				
				$updatesql[] = "mturk_requeues=mturk_requeues+1";
			}
			else{
				$updatesql[] = "mturk_details=null";
			}
		}
		else{			
			$updatesql[] = "mturk_status='error'";					
		}					
		$sql = "UPDATE emails SET ".implode(",",$updatesql)." WHERE id='{$r['id']}'";	
        //t($sql,1);				
		mysql_query($sql);
		return $hitId;
	}
    public function mTurkCheck(){
		list($total) = mysql_fetch_array(mysql_query("SELECT count(id) FROM emails WHERE mturk_status='pending'"));

		$done = 0;
		$pending = 0;
		$q = mysql_query("SELECT * FROM emails WHERE mturk_status='pending'");
		while($r = mysql_fetch_assoc($q)){
				t("----->Progress: {$done}/{$total}...".number_format((100*$done)/$total,2),1);
																
				$found = true;
				$requeue = false;
				$localId = $r['id'];
				$hitId = $r['mturk_id'];
				$oldData = json_decode($r['mturk_details']);
				$mapperId = $r['mapper_id'];
				$matchedId = $r['match_mapper_id'];
				$matchedScore = $r['match_score'];
				
				t("Checking: ".$hitId,1);
				
				$hit = $this->mturk->getHit($hitId);								            								
				$res = $this->mturk->getHitResults(array('HITId'=>$hitId));		

                $hitData = $hit->get('HIT');

                $hitStats = array();
                foreach($hitData as $k=>$v){                    
                    if(strtolower($k) == 'numberofassignmentspending'){ $hitStats['busy']= $v;}
                    if(strtolower($k) == 'numberofassignmentsavailable')$hitStats['pending']= $v;
                    if(strtolower($k) == 'numberofassignmentscompleted')$hitStats['done']= $v;                    
                }
                t("res: ".$res->get('NumResults'),1);
                //waitForMe();
           
				if($res->get('NumResults') < $this->settings->default_workers){	
                    $status = $hit->get('HIT')['HITStatus'];
                    t("Hit Status: ".$status,1);
					if($status != 'Assignable'){
                        
                        if($hitStats['busy']>0){
                            t($hitStats,1);
                            t('Waiting on answers',1);
                            continue;                            
                        }
                        else{
                            t('Stale....requeue',1);
                            $requeue = true;                        
                        }                        						
					}

					//if(strtotime($r['mturk_completed']) < strtotime("-4 hours")){
						/* 						
						*/
						//t('Stale....requeue',1);
						//$requeue = true;
					//}
					
					if(!$requeue){										
						$pending++; 																									
						t('Not Ready',1); 					
						continue;
					}
				}

				$asg = $res->get('Assignments');				                  
				if(!$asg){ $pending++; t('Not Ready',1); continue;}		                
				$done++;
				
				if($oldData){												//Requeued hit. Need to recalculate total score.					
					$data = array("workers"=>$oldData->workers);													
				}
				else{														//New hit.
					$data = array("workers"=>array());
				}

				$stats = array();
				foreach($asg as $i=>$a){
					$wId = $a["WorkerId"];					
					$a = simplexml_load_string($a['Answer']);	
                    $a = json_decode(json_encode($a));

                    $worker = (object)array(
                        'id'		=> $wId,
                        'answer'	=> $a
                    );
                    $data["workers"][] = $worker;
					/*
					foreach($a->Answer as $answer){
						$key = reset($answer->QuestionIdentifier);
						$value = reset($answer->FreeText);																					
					}
                    */					
				}

                /*
				foreach($data["workers"] as $w){
					$stats[$w->answer]++;
				}
																				
				arsort($stats);
				$dec = reset(array_keys($stats));
				$count = reset($stats); 				
				$data["decision"] = $dec = (strpos($dec,'Yes,') === false)?0:1; 
				$data["score"] = $score = number_format((100*$count)/count($data["workers"]),2);								
				if( ( ($matchedScore<60 && $data["decision"]==1) || ($matchedScore>=65 && $data["decision"]==0) || $score<$this->settings->mturk_confidence_min) && $r['mturk_requeues']<$this->settings->mturk_requeues_max)$requeue=true;				
                */

                //Need to implement scoring.
                $dec = '';
                $score = 0;
                $data["decision"] = '';
                $data["score"] = 0;
																
				if($requeue){
					$decision = '';
					$status = 'requeued';
				}
				else{
					$decision = $dec;
					$status = 'ready';
				}				
													
				$data = mysql_real_escape_string(json_encode($data));
				$sql = "UPDATE emails SET mturk_status='{$status}', mturk_completed=NOW(), mturk_details='{$data}' WHERE id='{$localId}'";
							                
				mysql_query($sql);                     

                //Cache is off for now.
				//if($status=='ready') $this->mTurkSaveCache($mapperId,$matchedId,$hitId,$data,$decision,$score);

				
		}	
		return $pending;	
	}


































	
	public function mTurkCheckCache($mapperId,$matchedId){
		$q = mysql_query("SELECT * FROM events_mapper_mturk_cache WHERE mapper_id='{$mapperId}' AND matched_mapper_id='{$matchedId}'");
		$r = mysql_fetch_assoc($q);
		if($r) $r = (object)$r;
		return $r;		
	}
	private function mTurkSaveCache($mapperId,$matchedId,$hitId,$data,$decision,$score){
		$updatesql = array();
				
		$updatesql[] = "mapper_id='{$mapperId}'";
		$updatesql[] = "matched_mapper_id='{$matchedId}'";		
		$updatesql[] = "mturk_id='{$hitId}'";		
		$updatesql[] = "timestamp=NOW()";
		$updatesql[] = "mturk_details='{$data}'";
		$updatesql[] = "mturk_decision='{$decision}'";
		$updatesql[] = "mturk_confidence='{$score}'";
		
		mysql_query("INSERT INTO events_mapper_mturk_cache SET ".implode(",",$updatesql));
	}
	private function mTurkgetQueueSql($source,$portal,$start=false,$end=false,$max=10000){
		//$start = dbDate($start);
		//$end = dbDate($end);
		
		if(!$start) $start = dbDate('now');
			
		$wheresql = array();
		$wheresql[] = "mm.match_score between {$this->settings->rulebased_score_min} AND ".($this->settings->rulebased_score_max-0.1);
		$wheresql[] = "(mm.mturk_status IS null OR mm.mturk_status='' OR mm.mturk_status='requeued')";
		//$wheresql[] = "m.date BETWEEN '{$start} 00:00:00' AND '{$end} 00:00:00'";
		$wheresql[] = "m.date >= '{$start} 00:00:00'";
		if($end)$wheresql[] = "m.date <= '{$end} 23:59:59'";

		$wheresql[] = "m.source='{$source}'";
		
		$sql = "SELECT SQL_CALC_FOUND_ROWS mm.*,m.*, mm.id AS mappingId FROM events_mapper AS m
				LEFT JOIN events_mapper_mappings AS mm ON mm.mapper_id=m.id AND mm.portal='{$portal}'
				WHERE ".implode(" AND ",$wheresql)." LIMIT {$max}";
		
		return $sql;
	}
	public function mTurkQueueStats($source,$portal,$start=false,$end=false){
		$sql = $this->mTurkgetQueueSql($source,$portal,$start,$end); 
		$q = mysql_query($sql);		

		$totalNew = 0;
		$totalCache = 0;
		while($r = mysql_fetch_assoc($q)){						
			$mturkCache = $this->mTurkCheckCache($r['mapper_id'],$r['match_mapper_id']);
			if($mturkCache) $totalCache++;
			else $totalNew++;
		}
				
		return array('Total New'=>$totalNew,'Total Cache'=>$totalCache);
	}
	
	public function getWorkerStats(){
		$workers = array();
		$q = mysql_query("SELECT * FROM events_mapper_mappings WHERE mturk_status='ready'");
		while($r = mysql_fetch_assoc($q)){
			$data = json_decode($r['mturk_details']);
			foreach($data->workers as $w){
				if(!$workers[$w->id])$workers[$w->id] = (object)array('id'=>$w->id,'hits'=>0,'bad'=>0,'yes'=>0,'no'=>0,'score'=>0);
										
				$workers[$w->id]->hits++;
				$ans = (strpos($w->answer,'Yes,') === false)?0:1;
				
				if($ans) $workers[$w->id]->yes++;
				else $workers[$w->id]->no++;
				
				if($ans != $data->decision){
					$workers[$w->id]->bad++;
					
					if($data->score>75){
						$workers[$w->id]->severe++;
					}
				}
		
			}
		}
		
		t("Total Workers: ".count($workers),1);
		
		$bad = array();
		foreach($workers as $w){			
			$w->miss = (100*$w->bad)/$w->hits;
			if($w->hits>20 && $w->miss>20){
				list($w->blocked) = mysql_fetch_array(mysql_query("SELECT id FROM mturk_blocked WHERE worker_id='{$w->id}'"));
				if(!$w->blocked)$bad[] = $w;
			}
		}
		
		//usort($workers,function($a,$b){ return $a->hits<$b->hits; });
		usort($bad,function($a,$b){ return $a->miss>$b->miss; });
		return $bad;
	}
	public function getWorker($wId){
		$workers = array();
		$q = mysql_query("SELECT * FROM events_mapper_mappings WHERE mturk_details LIKE '%{$wId}%'");
		while($r = mysql_fetch_assoc($q)){
			$data = json_decode($r['mturk_details']);
			foreach($data->workers as $w){
				if($w->id != $wId) continue;
													
				$ans = (strpos($w->answer,'Yes,') === false)?0:1;					
																
				if($ans != $data->decision){					
					$e1 = (object)mysql_fetch_assoc(mysql_query("SELECT * FROM events_mapper WHERE id='{$r['mapper_id']}'"));
					$e2 = (object)mysql_fetch_assoc(mysql_query("SELECT * FROM events_mapper WHERE id='{$r['match_mapper_id']}'"));
					
					t($e1->title.": ".$e1->date." :".$e1->venue,1);
					t($e2->title.": ".$e2->date." :".$e2->venue,1);
					t($w->answer." ({$ans})",1);
					t("{$e1->id} Decision: ".$data->decision.' By '.count($data->workers).", {$data->score}",1);
					t("------------",1);
				}
			}
		}				
	}
	public function blockWorker($id,$reason){
		$res = $this->mturk->blockWorker($id,$reason);
		if($res){
			$reason = mysql_real_escape_string($reason);
			mysql_query("INSERT INTO mturk_blocked SET worker_id='{$id}', reason='{$reason}'");
			return true;
		}	
		return false;	
	}
}