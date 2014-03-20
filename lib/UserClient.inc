<?php
/**
 * 會員資訊 Client
*/
include_once 'UniSharp/client/UsRedisClient.inc';
include_once 'UniSharp/config/UsConfig.inc';

class UserClient extends UsRedisHashClient {
    public static $key_prefix = 'User:info:';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }
}

