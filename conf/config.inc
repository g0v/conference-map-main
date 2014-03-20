<?php
require_once dirname(__FILE__) . '/env.inc';

function &get_activity_array() {
    $activity_array = array();
    // TODO cache the result in redis
    $dir = __DIR__ . '/../data/activity/';
    $handle = opendir($dir);
    while (false !== ($activity_id = readdir($handle))) {
        if (! is_dir($dir . $activity_id)) {
            continue;
        }
        switch ($activity_id) {
        case '.':
        case '..':
            continue;
        default:
            array_push($activity_array, $activity_id);
            break;
        }
    }
    closedir($handle);
    return $activity_array;
}

$CONFIG['ACTIVITY_ARRAY'] = get_activity_array();
$CONFIG['DEFAULT_ACTIVITY_ID'] = 'COSCUP_2013';

$REDIS_CONFIG['redis_host'] = '127.0.0.1';
$REDIS_CONFIG['redis_port'] = 6379;


// XXX not in use
$CONFIG['MAP']              = 'TICC';
$CONFIG['MAP_URL']          = array(
        'url1',
        'url2',
        );
$CONFIG['HOST'] = $_SERVER['HTTP_HOST'];
if (!$CONFIG['HOST']) {
    $CONFIG['HOST'] = $_SERVER['SERVER_NAME'];
}
$CONFIG['BASE_URL']      = 'http://' . $CONFIG['HOST'];
$CONFIG['WEB_URL']      = $CONFIG['BASE_URL'] .  $ENV['PATH_INFO'];


// XXX facebook application id
$CONFIG['FB_APID']      = '' ;


$CONFIG['FB_channelUrl']      = 'channel.php';
$CONFIG['FB_FansUrl']= 'https://www.facebook.com/confmap';
$CONFIG['USER_CREDENTIAL'] = 'unisharp-user';
$CONFIG['CRUMB_CREDENTIAL'] = 'unisharp-crumb';

$CONFIG['USER_COOKIE_EXPIRE_TIME'] = time() + (86400 * 14);
