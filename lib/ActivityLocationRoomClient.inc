<?php
/**
 * 活動事件地點 Client
 * 存放攤位、會議室等地點資訊
 * 例, 某某座標，有著哪個會議室
 * key: x:y:z, value: json { type, name }
*/
include_once 'UniSharp/client/UsRedisClient.inc';
include_once 'UniSharp/config/UsConfig.inc';

class ActivityLocationRoomClient extends UsRedisHashClient {
    public static $key_prefix = 'Activity:LocationRoom:';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }
}

