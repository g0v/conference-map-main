<?php
require_once __DIR__ . '/../conf/env.inc';
require_once __DIR__ . '/../conf/config.inc';
require_once __DIR__ . '/../lib/UsSecurity.inc';

#$f_id = @$_POST['f_id'];
$f_id = @$_GET['f_id'];
$activity_id = @$_GET['activity_id'];
UsSecurity::filter_xss($f_id);
UsSecurity::filter_xss($activity_id);

if (!in_array($activity_id, $CONFIG['ACTIVITY_ARRAY'])) {
    die('no such activity');
}

$MAX_FRIEND_PROGRAM_LIST = 3;

// FIXME SECURITY open redirect issue.

if (!$f_id || !$activity_id) {
    error_log('No f_id or activity_id');
    header('location: /' . $activity_id);
    exit();
}

$token = @$_COOKIE['token'];
if (!$token) {
    error_log('[add to friend] No token');
    header('location: /' . $activity_id);
    exit();
}

$string = $CONFIG['CRUMB_CREDENTIAL'] . $f_id;

$pass = false;
if (UsSecurity::is_pass_crumb($token, $string)) {
    $pass = true;
}

if (!$pass) {
    error_log('Not pass crumb check, f_id=' . $f_id);
    header('location: /' . $activity_id);
    exit();
}


// do not catch this page
send_do_not_cache_header();


$str_friend_program_list = @$_COOKIE['tmp_fp_list'];
$arr_friend_program_list = array();

if ($str_friend_program_list) {
    $arr_friend_program_list = explode(',', $str_friend_program_list);
    if (count($arr_friend_program_list) >= $MAX_FRIEND_PROGRAM_LIST) {
        array_shift($arr_friend_program_list);
    }
}

if (!in_array($f_id, $arr_friend_program_list)) {
    array_push($arr_friend_program_list, $f_id);
}


$new_str_friend_program_list = implode(',', $arr_friend_program_list);
setcookie('tmp_fp_list', $new_str_friend_program_list, $CONFIG['USER_COOKIE_EXPIRE_TIME'], '/');
// redirect
header('location: /' . $activity_id . '/'.$f_id . '?nc=1');
