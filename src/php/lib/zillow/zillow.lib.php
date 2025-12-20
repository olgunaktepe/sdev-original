<?php

Class Zillow{
    public function __construct(){
        $this->settings = (object)[
            'proxy' => '95.211.175.167:13200',
        ];
    }


    

    public function search($box){
        $data = [
            'searchQueryState'=> (object)[
                "pagination"=>(object)[],
                "usersSearchTerm"=>"",
                "mapBounds"=>(object)["west"=>$box['west'],"east"=>$box['east'],"south"=>$box['south'],"north"=>$box['north']],
                "isMapVisible"=>true,
                "filterState"=>(object)[
                    "sortSelection"=>(object)["value"=>"days"],
                    "isAllHomes"=>(object)["value"=>true]
                ],
                "isListVisible"=>true,
                "mapZoom"=>18],
            'wants'=> (object)["cat1"=>["listResults","mapResults"],"cat2"=>["total"]],
            'requestId'=> 28,
            ];
        $q = [];
        foreach($data as $k=>$v){        
            $v = urlencode(json_encode($v));
            $q[] = "{$k}={$v}";
        }
        $q = implode("&",$q);
        //t($q);

        #$url = 'https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%2211808%20161st%20St%20Norwalk%2C%20CA%2090650%22%2C%22mapBounds%22%3A%7B%22west%22%3A-118.08577001094818%2C%22east%22%3A-118.07801842689514%2C%22south%22%3A33.88353625367549%2C%22north%22%3A33.886061289809945%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sortSelection%22%3A%7B%22value%22%3A%22days%22%7D%2C%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A18%7D&wants={%22cat1%22:[%22mapResults%22]}&requestId=2';
        $url = 'https://www.zillow.com/search/GetSearchPageState.htm?'.$q;
        #$url = 'https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%22%22%2C%22mapBounds%22%3A%7B%22west%22%3A%22-118.08885532577928%22%2C%22east%22%3A%22-118.07458597382005%22%2C%22south%22%3A%2233.881615385287716%22%2C%22north%22%3A%2233.89052190572857%22%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sortSelection%22%3A%7B%22value%22%3A%22days%22%7D%2C%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A18%7D&wants=%7B%22cat1%22%3A%5B%22mapResults%22%5D%7D&requestId=28';
        //t($url,1);
        $proxy = $this->settings->proxy;      
        $headers = [];

        $tries = 0;
		do{				
			$res = pw_get($url,$headers,$proxy,'zillow.js');
            //t($res);
			$res = json_decode($res);
			$tries++;
			if(!$res)sleep(1);
		}while(!$res && $tries<5);        
        return $res;
    }
}