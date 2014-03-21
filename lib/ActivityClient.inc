<?php
/**
 * 活動資訊 Client
*/
include_once dirname(__FILE__) . '/UsRedisClient.inc';
include_once dirname(__FILE__) . '/UsConfig.inc';

class ActivityClient extends UsRedisHashClient {
    public static $key_prefix = 'Activity:info:';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }
}
