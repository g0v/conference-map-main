<?php
class UsConfig {
    protected $_config_array = array();

    public function init($arr) {
        $this->_config_array = $arr;
    }

    public function get($key)
    {
        return @$this->_config_array[$key];
    }
}
