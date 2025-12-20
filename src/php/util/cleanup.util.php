<?php
set_time_limit(0);
$path = '/home/sdev/public_html/php';
include_once($path.'/helpers/cli.php');

mysql_query("DELETE FROM traffic_log WHERE timestamp < now() - interval 168 HOUR");

system('rm -rf /home/sdev/public_html/tmp/*');