<?php 
include_once('/home/sdev/public_html/php/helpers/cli.php');

#$file = 'export_'.date('Y_m_d_H_i_s',strtotime('now')).'.csv';
$file = 'export_test.csv';
unlink($file);
$file = fopen($file,"w");

$headers = array('Title','Location','Category','Listed Spaces','Agent Name','Agent Company','Phone Number','Rent Amount','Sale Amount','Lot','Building Size');
fputcsv($file,$headers);

$q = mysql_query("SELECT * FROM listings WHERE status='ready' ANd data <>'' GROUP BY url");
while($r = mysql_fetch_assoc($q)){	
	$r = json_decode($r['data']);	
	
	$space = reset($r->listedSpaces);
	$agent = reset($space->agents);	
	
	$data = array(
		$r->name,
		$r->location->address->street->numberMin.' '.$r->location->address->street->name.', '.$r->location->address->locality.', '.$r->location->address->region.' '.$r->location->address->postalCode,
		$r->category.' '.$r->subCategory,
		count($r->listedSpaces),
		$agent->name,
		$agent->company->name,
		$agent->contactMethods[0]->value,
		$space->lease->askingRent[0]->price->amount->minimum->amount.', '.$space->lease->askingRent[0]->price->size.', '.$space->lease->askingRent[0]->price->period,
		$space->sale->price->amount,
		$r->lot->totalAcres,
		$r->buildings->size->grossSF,
	);	
	fputcsv($file,$data);	
}
fclose($file);
