<?php
define('FROM_INDEX', true);

require_once 'conf/env.inc';
require_once 'conf/config.inc';
require_once 'lib/UsSecurity.inc';
require_once 'lib/UserClient.inc';
require_once 'lib/Page.inc';

send_do_not_cache_header();

/***************************
 Initialize variables
 ***************************/
$path_arr = explode('/', $ENV['PATH_INFO']);

// http://hostname/PATH_1/PATH_2
$PAGE = array(
    'PATH_INFO' => array(
        'PATH_1' => @$path_arr[1],
        'PATH_2' => @$path_arr[2],
    ),
    'USER_INFO' => array(
        'IS_VERIFIED_USER' => false,
        'IS_MYSELF'        => false,
        'U_ID'             => @$_path_arr[2], // http://hostname/COSCUP_2013/{uid}
        'U_ID_FROM_COOKIE' => null,
    ),
    'ACTIVITY_INFO' => array(
        'ACTIVITY_ID' => null,
        'ACTION_ID'   => null,
    ),
    'BUDDY_INFO' => array(
        'BUDDY_LIST' => @$_COOKIE['tmp_fp_list'],
    ),
);


if (@$_GET['nc']) { // no cache
    send_do_not_cache_header();
}


/***************************
   User Validation
***************************/

// try to get U_ID from http://hostname/{activity_id}/{user_id}
$PAGE['USER_INFO']['U_ID'] = $PAGE['PATH_INFO']['PATH_2'];

if (isset($ENV['RESET']) && $ENV['RESET']) {
    // remove cookies
    setcookie('user_id', '', time() - 3600, '/');
    setcookie('key', '', time() - 3600, '/');
} else {
    $u_id_cookie = @$_COOKIE['user_id'];
    UsSecurity::filter_xss($u_id_cookie);

    $key = @$_COOKIE['key'];
    if (strlen($u_id_cookie) > 0) {
        // TODO add user agent to credential string.
        $credential_string = $CONFIG['USER_CREDENTIAL'] . $u_id_cookie;
        if (UsSecurity::is_pass_crumb($key, $credential_string)) {
            $PAGE['USER_INFO']['IS_VERIFIED_USER'] = true;
            $PAGE['USER_INFO']['U_ID_FROM_COOKIE'] = $u_id_cookie;
            if ($PAGE['USER_INFO']['U_ID'] == $PAGE['USER_INFO']['U_ID_FROM_COOKIE']) {
                $PAGE['USER_INFO']['IS_MYSELF'] = true;
            }
        }
    }
}



/**********************
  Global View Bag
*********************/
$view_data = array(
    'PAGE' => &$PAGE,
    'CONFIG' => &$CONFIG,
    'ENV' => &$ENV,
    'fb_apid' => null,
);

/*************************
     Special Page Routing
**************************/
$PAGE['ACTIVITY_INFO']['ACTION_ID'] = $PAGE['PATH_INFO']['PATH_1'];
//$PAGE['ACTIVITY_INFO']['ACTIVITY_ID'] = $CONFIG['DEFAULT_ACTIVITY_ID'];


switch ($PAGE['PATH_INFO']['PATH_1']) {
case 'about':
    Page::load('header', $view_data);
    Page::load('page/about', $view_data);
    exit (0);
    break;

case 'free-ticket':
    Page::load('header', $view_data);
    Page::load('page/free-ticket', $view_data);
    exit (0);
    break;

default:
    $PAGE['ACTIVITY_INFO']['ACTION_ID'] = null;
    if (in_array($PAGE['PATH_INFO']['PATH_1'], $CONFIG['ACTIVITY_ARRAY'])) {
        $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'] = $PAGE['PATH_INFO']['PATH_1'];
    } else {
        // go to default Activity
        $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'] = $CONFIG['DEFAULT_ACTIVITY_ID'];
    }
    // go to Acvitity Page Routing
    break;
}


/**************************
     Activity Page Routing
***************************/
if ($PAGE['ACTIVITY_INFO']['ACTION_ID'] === null) {
    $PAGE['ACTIVITY_INFO']['ACTION_ID'] = $PAGE['PATH_INFO']['PATH_2'];
}

switch ($PAGE['PATH_INFO']['PATH_2']) {
case 'program':
    // 議程
    $PAGE['USER_INFO']['U_ID'] = $PAGE['USER_INFO']['U_ID_FROM_COOKIE'];
    Page::load('header', $view_data);
    Page::load('page/program', $view_data);
    break;

case 'chat-map':
case '':
    // 聊天地圖
    $PAGE['ACTIVITY_INFO']['ACTION_ID'] = 'chat-map';
    $PAGE['USER_INFO']['U_ID'] = $PAGE['USER_INFO']['U_ID_FROM_COOKIE'];
    Page::load('header', $view_data);
    Page::load('page/chat-map', $view_data);
    break;

case 'set-url':
    isset($_GET['id']) or die('No id');
    isset($_COOKIE['token']) or die('No token');

    $PAGE['USER_INFO']['U_ID'] = $_GET['id'];
    UsSecurity::filter_xss($PAGE['USER_INFO']['U_ID']);
    if (strlen($PAGE['USER_INFO']['U_ID']) <= 0) {
        error_log('incorrect U_ID');
        header( 'Location: /' );
        exit();
    }

    $token = $_COOKIE['token'];

    // CSRF protection
    $string = $CONFIG['CRUMB_CREDENTIAL'] . $PAGE['USER_INFO']['U_ID'];
    $pass = false;
    if (UsSecurity::is_pass_crumb($token, $string)) {
        $pass = true;
    }
    if (!$pass) {
        error_log('Not pass crumb check, u_id=' . $PAGE['USER_INFO']['U_ID']);
        header( 'Location: /' );
        exit();
    }

    // issue crumb
    $string = $CONFIG['USER_CREDENTIAL'] . $PAGE['USER_INFO']['U_ID'];
    $crumb = UsSecurity::issue_crumb($string);
    setcookie('user_id',$PAGE['USER_INFO']['U_ID'], $CONFIG['USER_COOKIE_EXPIRE_TIME'], '/');
    setcookie('key', $crumb, $CONFIG['USER_COOKIE_EXPIRE_TIME'], '/');

    Page::load('header', $view_data);
    Page::load('page/set-url', $view_data);
    exit (0);
    break;

default:
    // 使用者趕場時間表
    // http://hostname/{ACTIVITY_ID}/{USER_ID}
    $PAGE['ACTIVITY_INFO']['ACTION_ID'] = 'user-program';
    //$PAGE['USER_INFO']['U_ID'] = $PAGE['USER_INFO']['U_ID_FROM_COOKIE'];
    if (!is_string($PAGE['USER_INFO']['U_ID'])) {
        error_log('U_ID is not string');
        exit(1);
    }

    UsSecurity::filter_xss($PAGE['USER_INFO']['U_ID']);

    if (!is_string($PAGE['USER_INFO']['U_ID'])) {
        error_log('U_ID is not string');
        exit(1);
    }

    if (strlen($PAGE['USER_INFO']['U_ID']) <= 0 ) {
        error_log('incorrect U_ID');
        exit(1);
    }

    $credential_string = $CONFIG['CRUMB_CREDENTIAL'] . $PAGE['USER_INFO']['U_ID'];
    $crumb = UsSecurity::issue_crumb($credential_string);
    setcookie('token', $crumb, time() + 3600, '/');


    Page::load('header', $view_data);
    Page::load('page/user-program', $view_data);
    break;
}

if (isset($ENV['DEBUG'])) {
    include 'debug.inc';
}
