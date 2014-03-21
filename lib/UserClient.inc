<?php
/**
 * 會員資訊 Client
*/
include_once dirname(__FILE__) . '/UsRedisClient.inc';
include_once dirname(__FILE__) . '/UsConfig.inc';

class UserClient extends UsRedisHashClient {
    public static $key_prefix = 'User:info:';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }
}
