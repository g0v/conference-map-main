<?php
class Page
{
    public static $view_dir = null;
    public static function load($file_name, &$data = array()) {
        if (!self::$view_dir) {
            self::$view_dir = __DIR__ . '/../view/';
        }
        if ($data) {
            extract($data);
        }
        include self::$view_dir . $file_name . '.php';
    }
}
