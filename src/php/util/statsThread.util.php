<?php 
set_time_limit(60*20);
include_once('/home/sdev/public_html/php/helpers/cli.php');

uselib('deal');
$dl = new Deal();

$vars = json_decode($argv[1]);
$sql = base64_decode($vars->sql);
$rules = json_decode(json_encode($vars->rules),true);
$extractKeys = $vars->keys;

$outputfile = "/home/sdev/public_html/tmp/output.";
$pidfile = "/home/sdev/public_html/tmp/pid.";

uselib('php-parallel::parallel');    
$Parallel = new Parallel\Parallel(new \Parallel\Storage\RedisStorage(['server' => 'tcp://127.0.0.1:6379']));


$sql = str_replace('SELECT SQL_CALC_FOUND_ROWS m.* FROM listings','SELECT m.id FROM listings',$sql);

$ids = [];
$q = mysql_query($sql);
while($r = mysql_fetch_assoc($q)){
    $ids[] = $r['id'];
}
$data = [];
$time = microtime(true);
$processed = 0;
foreach(array_chunk($ids,500) as $chunk){
    t("Processing chunk...Processed: {$processed}",1);    
    $stime = microtime(true);
    $procs = [];
    $pid = [];

    
    $cmds = [];
    foreach($chunk as $id){ $cmd = 'php /home/sdev/public_html/php/util/statsThread2.util.php '.$id; if(file_exists($outputfile.$id))continue; $cmds[] = sprintf("%s > %s 2>&1 & echo $! >> %s", $cmd, $outputfile.$id, $pidfile.$id); }
    $cmds = array_filter($cmds);
    if($cmds)exec(implode(";",$cmds));   
    $procs = $chunk;
    

/*
    foreach($chunk as $id){
        
        //$Parallel->run($id, function() {global $id, $dl; $deal = $dl->getDeal($id); return $deal; });        
        
        $cmd = 'php /home/sdev/public_html/php/util/statsThread2.util.php '.$id;                  
        exec(sprintf("%s > %s 2>&1 & echo $! >> %s", $cmd, $outputfile.$id, $pidfile.$id));        

        //$cpidFile = $pidfile.$id;
        //$pid = trim(file_get_contents($cpidFile));
        //if(is_file($cpidFile))unlink($cpidFile);
        //$pids[] = $pid;

        $procs[] = $id;        
    }        
*/
    t("Threads: ".count($procs),1);

    do{
        $live = exec("ps aux | grep statsThread2 | grep -v grep | wc -l");            
        t("Live: ".$live,1);
    }while($live);
    $processed += count($procs);
    

    //$result = $Parallel->wait($procs);
    //t($result,1);

    foreach($procs as $id){
        $file = $outputfile.$id;
        $deal = trim(file_get_contents($file));
        preg_match("/\"RES_CONTENT:(.*)\"/i",$deal,$matches);        
        $deal = json_decode($matches[1]);
        
        //$pids[] = $pid;

        $res = [];        
        if(!$showAll){
            //validateListingRule($deal,$rules,$res);              
            foreach($res as $r){            
                if($r->err || !$r->valid)continue;       
            }                                                
        }             

        $keys = [];
        foreach($extractKeys as $k)$keys[] = $k->key;
        $val = getKeyValueV2($deal,$keys);
        t($val);

        foreach($extractKeys as $k){
            $val = getKeyValue($deal,$k->key);
            if($k->type == 'number') $val = (float)preg_replace("/[^0-9\-\.]/","",$val);
            if(!$val || (float)$val == 0)$val = null;
            
            //t($k->key.': '.$val,1);

            if(!$data[$k->key]) $data[$k->key] = (object)['list'=>[], 'missing'=>0, 'errors'=>0];

            $err = false;
            if(is_array($val)){ $err = 'Array found'; t($err);  }
            else if(is_object($val)){ $err = 'Object found';  t($err); }
            else if(is_null($val)){ $err = 'Property Missing'; $data[$k->key]->missing++; continue; }
            if($err){ $data[$k->key]->errors++; continue; }

            if($val)$data[$k->key]->list[] = $val;
        }
    }    


    t(microtime(true) - $stime,1);
}
t('RES_CONTENT:'.json_encode($data),1);
t(microtime(true) - $time);








