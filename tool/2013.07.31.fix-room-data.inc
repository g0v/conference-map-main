<?php
include_once 'UniSharp/client/UsRedisClient.inc';

$client = new UsRedisClient(false);

$key = 'UserActivity:TimestampLocation:tmp:*';

$data =  $client->redis_keys($key);

echo "before:\n";
foreach ($data as $each_key) {
    $d = $client->redis_hGetAll($each_key);
    print_r($d);
}

foreach ($data as $each_key) {
    $d = $client->redis_hGetAll($each_key);
    foreach ($d as $k => $v) {
        if ($v == '1:0:10:1') {
            $new_v = '1:0:4:1';
            $client->redis_hSet($each_key, $k, $new_v);
        }
        if ($v == '1:0:4:1') {
            $new_v = '1:0:10:1';
            $client->redis_hSet($each_key, $k, $new_v);
        }
    }
}

echo "after:\n";
foreach ($data as $each_key) {
    $d = $client->redis_hGetAll($each_key);
    print_r($d);
}
