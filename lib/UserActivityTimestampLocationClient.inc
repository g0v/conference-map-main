<?php
/**
 * 會員參與事件 Client
 * 存放會員特定時間點在哪裡
 * User, U
 * Location, L
 * Timestamp, T
 * Activity, A
*/
include_once dirname(__FILE__) . '/UsRedisClient.inc';
include_once dirname(__FILE__) . '/UsConfig.inc';

class UserActivityTimestampLocationClient extends UsRedisHashClient {
    public static $key_prefix = 'UserActivity:TimestampLocation:';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }
}
