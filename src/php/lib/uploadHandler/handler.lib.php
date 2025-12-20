<?php
include_once 'uploadHandler.php';

class CustomUploadHandler extends UploadHandler {
    protected function get_user_id() {
        $userId = $_SESSION['user']->owner_id;
        if($userId)return $userId;

        $userId = $_SESSION['user']->id;
        if($userId)return $userId;

        @session_start();
        return session_id();
    }
}  
