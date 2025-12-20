<?php
include(__DIR__ . "/anticaptcha/anticaptcha.php");
include(__DIR__ . "/anticaptcha/nocaptchaproxyless.php");

Class AntiCaptchaAPI{
	private $api;
	public function __construct(){
		$this->api = new NoCaptchaProxyless();
		$this->api->setVerboseMode(false);
		$this->api->setKey("465a4077af4e74f2799ce2330036bcaa");				
	}
	
	public function getCaptcha($gkey,$url){
		$this->api->setWebsiteURL($url);
		$this->api->setWebsiteKey($gkey);
		
		if (!$this->api->createTask()) {
			print "API v2 send failed - ".$this->api->getErrorMessage(). "red";
			$this->api->debout("API v2 send failed - ".$this->api->getErrorMessage(), "red");
			return false;
		}		
		$taskId = $this->api->getTaskId();
		
		if (!$this->api->waitForResult()) {
			$api->debout("could not solve captcha", "red");
			$api->debout($this->api->getErrorMessage());
			return false;
		} else {
			$recaptchaToken =   $this->api->getTaskSolution();
			return $recaptchaToken;
		}		
	}
}
