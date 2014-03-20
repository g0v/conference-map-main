<?php
/*
 * Add user program, return the program url.
 * Usage:
 *  1. Get user program
 *      HTTP GET http://domain/api/myprogram/?id={user_id}
 *
 *  2. Insert user program
 *      HTTP POST http://domain/api/myprogram/
 *      data={json_data}
 *
 * TODO: handle update.
 * TODO: make it restful
*/
require_once 'UniSharp/client/UsRedisClient.inc';

require_once dirname(__FILE__) . '/../../lib/UserActivityTimestampLocationClient.inc';
require_once dirname(__FILE__) . '/../../lib/UsSecurity.inc';
require_once dirname(__FILE__) . '/../../conf/config.inc';
require_once 'UniSharp/config/UsConfigCache.inc';

function do_response($http_code, $status_code, $message, $data = NULL) {
    header('Content-Type: application/json; charset=utf-8');
    header('X-PHP-Response-Code: '. $http_code, true, $http_code);
    $response['response_status'] = array(
        "code" => $status_code,
        "message" => "$message",
    );
    if ($data) {
        $response['response_data'] = $data;
    }
    $json =  json_encode($response);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('Internal Error');
    }
    echo $json;
    exit();
}


// Source from: http://stackoverflow.com/questions/6768793/php-get-the-full-url
// XXX need SECURITY review.
function full_url()
{
    $s = empty($_SERVER["HTTPS"]) ? '' : ($_SERVER["HTTPS"] == "on") ? "s" : "";
    $sp = strtolower($_SERVER["SERVER_PROTOCOL"]);
    $protocol = substr($sp, 0, strpos($sp, "/")) . $s;
    $port = ($_SERVER["SERVER_PORT"] == "80") ? "" : (":".$_SERVER["SERVER_PORT"]);
    return $protocol . "://" . $_SERVER['SERVER_NAME'] . $port . $_SERVER['REQUEST_URI'];
}
$UaClient = NULL;
$http_request_method = $_SERVER['REQUEST_METHOD'];

$UsConfigCache = UsConfigCache::getInstance($REDIS_CONFIG);

//////////////////////////////
///////// HTTP GET ///////////
//////////////////////////////

if ($http_request_method == 'GET') {
    /*
    // XXX for future restful API implementation
    $url = full_url();
    $url_data =  parse_url($url);
    if (!$url_data) {
        do_response(500, 50000, "Internal error");
    }
    */

    // user_id
    $id = @$_GET['id'];
    $id = UsSecurity::filter_xss($id);
    if (!$id) {
        do_response(400, 400, 'Incorrect Input.');
    }
    // TODO ID validator

    // activity_id
    $activity_id = @$_GET['activity_id'];
    $activity_id = UsSecurity::filter_xss($activity_id);
    if (!in_array($activity_id, $CONFIG['ACTIVITY_ARRAY'])) {
        do_response(404, 40400, 'No such activity_id.');
    }
    if (!$activity_id) {
        do_response(400, 40000, 'Incorrect Input.');
    }

    $UaClient = new UserActivityTimestampLocationClient($UsConfigCache);

    // XXX what is this for?
    $data = $UaClient->getAll("tmp:$id:$activity_id");
    $is_registered = false;

    if (!is_array($data) || count($data) < 1) {
        $data = $UaClient->getAll("$id:$activity_id");
        $is_registered = true;
    }

    if (!is_array($data) || count($data) < 1) {
        do_response(404, 40400, 'Data not found');
    } else {
        $resp_arr['user_id'] = $id;
        $resp_arr['is_registered'] = $is_registered;
        $resp_arr['user_activities'] = array(
            'activity_id' => $activity_id,
            'locations' => $data,
        );
        do_response(200, 20000, 'OK', $resp_arr);
    }
}

//////////////////////////////
///////// HTTP POST ///////////
//////////////////////////////

try {
    $UaClient = new UserActivityTimestampLocationClient($UsConfigCache);
} catch (Exception $e) {
    // ignore exception.
}


require_once 'UniSharp/client/UsRedisClient.inc';


$json = @$_POST['data'];
//$json = filter_var($json,);
//die($json);

// 2013.08.03 11:45 = 1375501500
// 2013.08.03 13:30 = 1375507800
// room 102 = 1:0:4:1
// room 101CD = 1:11:9:1
$sample_json = <<<EOF
{
    "request_data": {
        "user_id": "test",
        "is_registered": false,
        "user_activities":
        {
            "activity_id": "COSCUP_2013",
            "locations":
                [
                    {
                        "location": "1:0:4:1",
                        "ts": "1375501500"
                    },
                    {
                        "location": "1:11:9:1",
                        "ts": "1375507800"
                    }
                ]
        }
    }
}
EOF;

// Uncomment it only when debugging
//$json = $sample_json;

$req_array = NULL;
if (empty($json) || ($req_array = json_decode($json, true)) === NULL) {
    do_response(400, 40000, "Incorrect input");
}

// When request not empty
$status = 20000;
isset($req_array['request_data']) || $status = 40001;
isset($req_array['request_data']['is_registered']) || $status = 40002 ;
isset($req_array['request_data']['user_id']) || $status = 40003;
isset($req_array['request_data']['user_activities']['activity_id']) || $status = 40004;
isset($req_array['request_data']['user_activities']['locations']) || $status = 40005;
//isset($req_array['request_data']['nickname']) || $status = 40006;

if (20000 !== $status) {
    do_response(400, $status, "Incorrect input");
}
$is_registered = $req_array['request_data']['is_registered'];
$user_id = $req_array['request_data']['user_id'];
//$nickname = $req_array['request_data']['nickname'];
$activity_id = $req_array['request_data']['user_activities']['activity_id'];
$orig_location_array = $req_array['request_data']['user_activities']['locations'];

// filter XSS
UsSecurity::filter_xss($is_registered);
UsSecurity::filter_xss($user_id);
UsSecurity::filter_xss($activity_id);

$token = @$_COOKIE['token'];
if (!$token) {
    // FIXME show something better
    die('No token');
}

$string = $CONFIG['CRUMB_CREDENTIAL'] . $user_id;

$pass = false;
if (UsSecurity::is_pass_crumb($token, $string)) {
    $pass = true;
}

if (!$pass) {
    // FIXME show something better
    die('Not pass crumb check');
}
$location_array = array();

if (!is_array($orig_location_array) || count($orig_location_array) <= 0 ) {
    do_response(400, 40001, "Input empty");
}

foreach ($orig_location_array as $sub_arr) {
    $ts = $sub_arr['ts'];
    $location = $sub_arr['location'];
    UsSecurity::filter_xss($ts);
    UsSecurity::filter_xss($location);

    $location_array[$ts] = $location;
}
$res = asort($location_array);
if (!$res) {
    do_response(500, 50000, "Internal error");
}

if ($UaClient) {
    if ($is_registered) {
        $key = "$user_id:$activity_id";
    } else {
        $key = "tmp:$user_id:$activity_id";
    }

    // Duplication protection
    $res = $UaClient->redis_sAdd('SET:User', $user_id);
    if ($res !== 1 ) {
        do_response(400, 40001, "Oops, user_id exists");
    }

    // insert
    $res = $UaClient->set($key, $location_array);
    // TODO imlement update
    if ($res) {
        // TODO remember user cookie.
        $string = $CONFIG['CRUMB_CREDENTIAL'] . $user_id;
        $crumb = UsSecurity::issue_crumb($string);
        setcookie('token', $crumb, time() + 3600, '/');

        do_response(200, 20000, "OK");
    } else {
        do_response(500, 50000, "Internal error");
    }
} else {
    do_response(500, 50001, "Storage error");
}
