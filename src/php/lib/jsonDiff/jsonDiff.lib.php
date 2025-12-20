<?php
require 'vendor/autoload.php';

use Swaggest\JsonDiff\JsonDiff;
use Swaggest\JsonDiff\JsonPatch;
   
Class jsonDiff2{		
	static public function diff($json1,$json2){
		$res = new JsonDiff($json1, $json2,JsonDiff::COLLECT_MODIFIED_DIFF);				
		//$res = new JsonDiff($json1, $json2);		
		return $res;
	}		
	static public function getPatch($res){
		return JsonPatch::export($res->getPatch());
	}
	static public function applyPatch($json,$patch){				
		$diff = new JsonDiff(json_decode($originalJson), json_decode($newJson), JsonDiff::REARRANGE_ARRAYS);
		$this->assertEquals(json_decode($patchJson), $diff->getPatch()->jsonSerialize());

		$original = json_decode($originalJson);
		$patch = JsonPatch::import(json_decode($patchJson));
		$patch->apply($original);
		$this->assertEquals($diff->getRearranged(), $original);
	}
}