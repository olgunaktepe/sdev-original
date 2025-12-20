<?php

Class Zillow{
    public function __construct(){
        $this->settings = (object)[
            
        ];
    }

    public function getSubmarketLayer($id){
        $r = mysql_fetch_assoc(mysql_query("SELECT * FROM submarkets_layers WHERE id='{$id}'"));
        $layers = json_decode($r['data']);
                

    }
}