<!DOCTYPE html>
<?php
include_once dirname(__FILE__) . '/../lib/UserClient.inc';
include_once dirname(__FILE__) . '/../lib/UsSecurity.inc';

define('BASE_URL',$CONFIG['BASE_URL']);
define('FB_FansUrl',$CONFIG['FB_FansUrl']);

UsSecurity::filter_xss($tmp_fp_list);

$share_id = null;
if (isset($u_id)) {
    $share_id = $u_id;
}
$fb_apid = $CONFIG["FB_APID"];
$BASE_URL = $CONFIG['BASE_URL'];
$FB_FansUrl = $CONFIG['FB_FansUrl'];

UsSecurity::filter_xss($share_id);
if ($share_id && !ctype_alnum($share_id)) {
    header ('location: /');
    exit();
}

if (isset($ENV['WITHCACHE'])) {
    echo '<html lang="zh-tw" manifest="/unisharp-map.appcache">';
} else {
    echo '<html lang="zh-tw">';
}

?>
<head>
<meta charset="utf-8" />
<meta http-equiv="x-ua-compatible" content="ie=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
<meta name="author" content="UniSharp Inc." />
<meta name="description" content="我的活動地圖，您辦活的的好幫手。" />
<meta name="keywords" content="活動地圖, 辦活動, COSCUP">
<meta name="apple-mobile-web-app-capable" content="yes" />
<?php
$nickname = '';
$UserClient = NULL;

if ($share_id) {
    try {
        $UserClient = new UserClient(false);
    } catch (Exception $e) {
        // ignore
    }
    if ($UserClient) {
        $val = $UserClient->get($share_id, 'nickname');
        $val = trim($val);
        if ($val) {
            $nickname = $val;
        }
    }
}
if (empty($nickname)) {
    $nickname = $share_id;
}
UsSecurity::filter_xss($nickname);
?>

<title>我的活動地圖</title>;
<link rel="stylesheet" href="/assets/css/master.css?ts=999" />
<link rel="stylesheet" href="/assets/css/default.css?ts=1375456132" />
<link rel="apple-touch-icon" href="/assets/images/unisharp-map-icon.png"/>
<link rel="shortcut icon" href="/assets/images/unisharp-map-icon.png"/>
<noscript>
<link rel="stylesheet" href="/assets/css/mobile.min.css?ts=1375456132" />
</noscript>
<link rel="stylesheet" href="/assets/css/ui-lightness/jquery-ui-1.10.3.custom.min.css" />
<script type="text/javascript">
// Edit to suit your needs.
var ADAPT_CONFIG = {
  // Where is your CSS?
  path: '/assets/css/',

  // false = Only run once, when page first loads.
  // true = Change on window resize and page tilt.
  dynamic: true,

  // First range entry is the minimum.
  // Last range entry is the maximum.
  // Separate ranges by "to" keyword.
  range: [
    '0px    to 760px  = mobile.css?1375092209',
    '760px  to 980px  = 720.css',
    '980px  to 1280px = 1200.css',
    '1280px to 1600px = 1200.css',
    '1600px to 1940px = 1200.css',
    '1940px to 2540px = 1200.css',
    '2540px           = 1200.css'
  ]
};
</script>
<script src="/assets/js/lib/jquery-1.9.1.js"></script>
<script src="/assets/js/js_plugins.min.js"></script>
<script src="/assets/js/lib/jquery.bpopup.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.71/jquery.csv-0.71.min.js"></script>
<script src="/assets/ls/g0v.js"></script>
<script>
function LoadSlidesjs(){

    //SlidesJS Required: Initialize SlidesJS with a jQuery doc ready
    //use http://slidesjs.com/
    $(function() {
        $('#layer_slides').slidesjs({
            width: 940,
            height: 528,
            navigation: {
                //effect: "fade"
            },
            pagination: {
                //effect: "fade"
            },
            effect: {
                fade: {
                    // speed: 400
                }
            }
        });
    });
}
</script>
