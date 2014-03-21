<?php
class UsConfigCache extends UsConfig {
    private static $_inst;

    public static function getInstance($init_array)
    {
        if (self::$_inst === null) {
            self::$_inst = new self($init_array);
        }
        return self::$_inst;
    }

    private function __construct($init_array)
    {
        $this->init($init_array);
    }

    private function __clone() {}
}

