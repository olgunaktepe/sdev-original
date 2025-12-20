<?php
require 'vendor/autoload.php';
   
use Aws\S3\S3Client;   
use Aws\Exception\AwsException;

Class S3{
	private $client,$settings;
	
	function __construct(){
		$this->settings = (object)array(
			'bucket'	=> $GLOBALS['SETTINGS']['aws_bucket'],
			'key'		=> $GLOBALS['SETTINGS']['aws_username'],
			'secret'	=> $GLOBALS['SETTINGS']['aws_password'],
		);
		
		
		$credentials = new Aws\Credentials\Credentials($this->settings->key,$this->settings->secret);
		$this->client = new Aws\S3\S3Client([
    		'version' => 'latest',
    		'region' => 'us-east-2',
			'credentials' => $credentials
		]);				
	}
	public function test(){
		$iterator = $this->client->getIterator('ListObjects', array('Bucket' => $this->settings->bucket));		
		foreach ($iterator as $obj) {
			//t($obj['Key']);
			$url = $this->client->getObjectUrl($this->settings->bucket, $obj['Key']);
			t($url,1);
		}

		
	}

	public function testUpload($file){
		$keyName = basename($file);
			
		$res = $this->client->putObject(
				array(
						'Bucket'=>$this->settings->bucket,
						'Key' =>  $keyName,
						'SourceFile' => $file,
						'StorageClass' => 'REDUCED_REDUNDANCY'
				)
		);
		t($res);
		
	}
	public function send($file){
		if (!file_exists($file)) return false;
		try {		
			$keyName = basename($file);
			
			$res = $this->client->putObject(
					array(
						'Bucket'=>$this->settings->bucket,
						'Key' =>  $keyName,
						'SourceFile' => $file,
						'StorageClass' => 'REDUCED_REDUNDANCY'
					)
			);			
		} catch (S3Exception $e) {			
			return false;
		} catch (Exception $e) {			
			return false;
		}
		
		return true;
	}
	public function getSignedURL($key,$lifespan=5){		
		$cmd = $this->client->getCommand('GetObject', [
    		'Bucket' => $this->settings->bucket,
			'Key' => $key
		]);
		$request = $this->client->createPresignedRequest($cmd, '+'.$lifespan.' minutes');
		$url = (string)$request->getUri();
		return $url;
	}
	
	
}