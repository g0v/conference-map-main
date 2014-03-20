<?php
/**
 * 地點資訊 Client
 * 存放活動地點，例如 TICC
*/
include_once 'UniSharp/client/UsRedisClient.inc';
include_once 'UniSharp/config/UsConfig.inc';


class MapClient extends UsRedisHashClient {
    public static $key_prefix = 'Map:info:';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }

}

