<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

/*
long/Lat
Address


Acerage
Sqft
Building name
price

lng/lat within a 0.5 miles


--------------
Stuff that tell you it's the same listing across site:
* Agent name/agent cell phone 
* Check if images are the same
*/


#$q = mysql_query("SELECT * FROM listings WHERE source='commercialexchange.com' AND timestamp BETWEEN '2021-01-01' AND '2021-01-31' ");
$q = mysql_query("SELECT * FROM listings WHERE source='crexi.com' AND timestamp BETWEEN '2021-01-01' AND '2021-01-31' LIMIT 1");
$crexi = (object)mysql_fetch_assoc($q);
$data = json_decode($crexi->data);

$zip = $data->Locations[0]->Zip;

//t($data);

//t($crexi);



// @params - will be bound to named query parameters
$criteria = [];
$latitude = $crexi->lat;
$longitude = $crexi->lng;
$distance = 10;


$sql = '
               SELECT m.id,(((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
              cos((m.lat*pi()/180)) * 
              cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515*1.609344) AS distance FROM listings AS m                
               WHERE (((acos(sin(('.$latitude.'*pi()/180)) * sin((m.lat*pi()/180))+cos(('.$latitude.'*pi()/180)) * 
              cos((m.lat*pi()/180)) * 
              cos((('.$longitude.' - m.lng)*pi()/180))))*180/pi())*60*1.1515*1.609344) <= '.$distance.' ORDER BY distance
               ';
t($sql);
$q = mysql_query($sql);




t($data);