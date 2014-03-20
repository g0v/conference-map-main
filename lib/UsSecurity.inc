<?php
Class UsSecurity {
    public static function is_pass_crumb($key, $string)
    {
        if (crypt($string, $key)  == $key) {
            return true;
        } else {
            return false;
        }
    }

    public static function issue_crumb($string)
    {
        $salt = crypt($string);
        return $salt;
    }

    public static function filter_xss(&$input, $do_trim = true)
    {
        if ($do_trim) {
            $input = trim($input);
        }
        $input = filter_var($input, FILTER_SANITIZE_STRING);
        return $input;
    }

}
