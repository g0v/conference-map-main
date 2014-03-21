<?php
require_once dirname(__FILE__) . '/../../conf/config.inc';
require_once dirname(__FILE__) . '/../../lib/UsRedisClient.inc';
require_once dirname(__FILE__) . '/../../lib/UsConfigCache.inc';
require_once dirname(__FILE__) . '/../../lib/UsSecurity.inc';

// TODO 404
isset($_GET['activity_id']) || exit (1);

$activity_id = $_GET['activity_id'];
UsSecurity::filter_xss($activity_id);

if (in_array($activity_id, $CONFIG['ACTIVITY_ARRAY'])) {
    include_once dirname(__FILE__) . '/../../data/activity/'.$activity_id.'/room.inc';
} else {
    //TODO 404
    error_log('No such activity_id');
    exit (1);
}

$UsConfigCache = UsConfigCache::getInstance($REDIS_CONFIG);

header('Content-Type: application/json; charset=utf-8');

$cache_data = false;
$UsRedisClient = NULL;
try {
    $UsRedisClient = new UsRedisClient($UsConfigCache);
    $cache_data = $UsRedisClient->redis_get('cache:rooms');
} catch (Exception $e) {
    // do nothing
}

if ($cache_data && false) {
    echo $cache_data;
} else {
    $resp_array = array(
        'response_data' => array(
            'rooms' => $room_data_array,
        ),
        'response_status' => array(
            'code' => 20000,
            'message' => "OK",
        ),
    );

    $json = json_encode($resp_array);
    try {
        if ($UsRedisClient) {
            $UsRedisClient->redis_set('cache:rooms', $json);
            $UsRedisClient->redis_setTimeout('cache:rooms', 60); // cache for 60 seconds
        }
    } catch (Exception $e) {
        // do nothing
    }
    echo $json;
}
