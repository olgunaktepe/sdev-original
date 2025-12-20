<?php
include 'curl-easy-master/vendor/autoload.php';

Class CurlEasy{
	public $q;
	public function __construct(){
		$this->q = new \cURL\RequestsQueue;				
	}
}