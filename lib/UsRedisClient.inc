<?php
include_once dirname(__FILE__) . '/UsConfig.inc';

class UsRedisClient {
    private static $_instance;
    private static $_prefix = 'redis_';

    public function __construct($conf = NULL) {
        if (!self::$_instance) {
            if ($conf === NULL) {
                return NULL;
            } else if ($conf === FALSE) {
                $host = '127.0.0.1';
                $port = 6379;
            } else {
                $host = $conf->get('redis_host');
                $port = $conf->get('redis_port');
            }

            if (!$port) {
                $port = 6379;
            }
            self::$_instance = new Redis();
            $status = self::$_instance->connect($host, $port);
            if (false === $status) {
                throw new RedisException('Redis server went away.');
                return NULL;
            }
            return self::$_instance;
        } else {
            return self::$_instance;
        }
    }

    public function __call($name, $args = NULL)
    {
        if (substr($name, 0, strlen(self::$_prefix)) == self::$_prefix) {
            $real_func_name = substr($name, strlen(self::$_prefix));
            return call_user_func_array( array( self::$_instance, $real_func_name ), $args );
        }
        throw new Exception("No such function $name");
    }
}

class UsRedisHashClient extends UsRedisClient {
    const STRUCTURE_TYPE = 'hash';

    public function __construct($config = NULL) {
        return parent::__construct($config);
    }

    public function is_exists($id) {
        if (!$id || count($id) <= 0) {
            return false;
        }
        $key = static::$key_prefix . $id;
        return parent::redis_exists($key);
    }

    public function getAll($id) {
        $key = static::$key_prefix . $id;
        $data = parent::redis_hGetAll($key);
        if (!is_array($data)) {
            return array();
        }
        foreach($data as $k => $v) {
            $data[$k] = self::_json_decode($v);
        }
        return $data;
    }

    public function set($id, $data) {
        if (!is_array($data)) {
            return false;
        }
        foreach($data as $k => $v) {
            if (is_array($v)) {
                $data[$k] = json_encode($v);
            }
        }
        $key = static::$key_prefix . $id;
        return parent::redis_hMset($key, $data);
    }

    public function get($id, $field)
    {
        $key = static::$key_prefix . $id;
        $data = parent::redis_hGet($key, $field);
        return self::_json_decode($data);
    }

    private static function _json_decode($str) {
        if (is_string($str)
        && ('{' == substr($str, 0, 1) || '[' == substr($str, 0, 1)))
        {
            $arr = json_decode($str, true);
            $err = json_last_error();
            if ($err == JSON_ERROR_NONE) {
                return $arr;
            } else {
                return $str;
            }
        } else {
            return $str;
        }
    }
}
