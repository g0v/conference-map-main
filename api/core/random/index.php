<?php
// Expires in the past
header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
// Always modified
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
// HTTP/1.1
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
// HTTP/1.0
header("Pragma: no-cache");

require_once dirname(__FILE__) . '/../../../conf/env.inc';
require_once dirname(__FILE__) . '/../../../conf/config.inc';
require_once dirname(__FILE__) . '/../../../lib/UsSecurity.inc';

/*
// XXX skip crumb
$token = @$_COOKIE['token'];
if (!$token) {
    die('No token');
}

$hour_cur = date('G');
$hour_next = ($hour_cur == 23) ? 0 : $hour_cur + 1;

$string1 = $CONFIG['CRUMB_CREDENTIAL'] . $hour_cur;
$string2 = $CONFIG['CRUMB_CREDENTIAL'] . $hour_next;

$pass = false;
if (UsSecurity::is_pass_crumb($token, $string1) || UsSecurity::is_pass_crumb($token, $string2)) {
    $pass = true;
}

if (!$pass) {
    die('Not pass crumb check');
}
*/


require_once 'UniSharp/client/UsRedisClient.inc';
require_once 'UniSharp/config/UsConfigCache.inc';

$UsConfigCache = UsConfigCache::getInstance($REDIS_CONFIG);
$UsRedisClient = NULL;
try {
    $UsRedisClient = new UsRedisClient($UsConfigCache);
} catch (Exception $e) {
    $msg = "[ERROR]" .  __FILE__ . "|" . __LINE__ . " :" . $e->getMessage();
    error_log($msg);
    // ignore error
}
header('Content-Type: application/json; charset=utf-8');
$count = 0;
$rand = NULL;
while ( true ) {
    $rand = base_convert(mt_rand(0x1D39D3E06400000, 0x41C21CB8E0FFFFFF), 10, 36);
    // check db for duplication.
    if ($UsRedisClient) {
        $is_exists = $UsRedisClient->redis_sIsMember('SET:User', $rand);
        if (!$is_exists) {
            break;
        }

        if ($count++ > 5) {
            // XXX show ERROR
            break;
        }
    }
}


// The final protection
if (!$rand) {
    // XXX show ERROR
}

$string = $CONFIG['CRUMB_CREDENTIAL'] . $rand;
$crumb = UsSecurity::issue_crumb($string);
setcookie('token', $crumb, time() + 3600, '/');

echo <<<EOF
{
    "response_data": {
        "code": "$rand"
    },
    "response_status": {
        "code": 20000,
        "message": "OK"
   }
}
EOF;
