<?php

usehelper("ajax::dispatch");

function getSelectOptions(){
    $notallowed = array(
        /*
        'users.subtype',
        'users.team',
        'questionnaires_forms.category',
        'packages_subscriptions_execs.role',
        */
    );

    $key = $_REQUEST['key'];    
    if(in_array($key,$notallowed))err('Invalid Key');
    list($table,$col) = explode('.',$key);

    $wheresql = array("1=1");
    $condition = $_REQUEST['condition'];
    if($condition){
        list($cTable,$cRow,$cValue) = explode(".",$condition);                
        if(!validateOptionString($cTable))$cTable = '';
        if(!validateOptionString($cRow))$cRow = '';
        if(!validateOptionString($cValue))$cValue = '';  
                
        if($cTable && $cRow && $cValue !== ''){ 
            $wheresql[] = "{$cTable}.{$cRow} = {$cValue}";            
        }        
    }

    $items = array();
    $q = mysql_query("SELECT DISTINCT {$col} FROM {$table} WHERE ".implode(" AND ",$wheresql)." ORDER BY {$col} ASC");
    while(list($r) = mysql_fetch_array($q)){
        if(!$r)continue;
        $items[] = $r;
    } 

    json(array('items'=>$items));
}