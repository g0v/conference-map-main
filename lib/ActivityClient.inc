<?php
/**
 * 活動資訊 Client
*/
include_once 'UniSharp/client/UsRedisClient.inc';
include_once 'UniSharp/config/UsConfig.inc';

class ActivityClient extends UsRedisHashClient {
    public static $key_prefix = 'Activity:info:';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }
}

