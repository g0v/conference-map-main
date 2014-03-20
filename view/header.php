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

<meta name="og:description" content="我的活動地圖，您辦活動的好幫手。" />
<meta property="og:type" content="website" />
<?php
    echo "<meta property=\"og:url\" content=\"{$CONFIG['BASE_URL']}/{$PAGE['ACTIVITY_INFO']['ACTIVITY_ID']}/$share_id\" />";
?>
<meta property="og:site_name" content="我的活動地圖" />
<meta property="og:image" content="<?php echo $CONFIG['BASE_URL'] ?>/confmap-logo-fb.png" />
<meta property="og:description" content="我的活動地圖，您辦活動的好幫手。" />
<meta property="fb:admins" content="759634366" />
<meta property="fb:admins" content="668979731" />
<meta property="fb:app_id" content="<?php echo $fb_apid ?>" />
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

if (!empty($nickname)) {
    echo "<meta property=\"og:title\" content=\"{$nickname} 的 COSCUP 2013 趕場地圖\" />";
    echo "\n<title>{$nickname} 的 COSCUP 2013 趕場地圖</title>";
} else {
    echo "<meta property=\"og:title\" content=\"我的活動地圖\" />";
    echo "\n<title>我的活動地圖</title>";
}
?>

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
<script src="/assets/js/js_plugins.min.js"></script>
<script src="/assets/js/basic.js?ts=1375589732"></script>
<script src="/assets/js/utility.js?ts=1375462882"></script>
<script src="/assets/js/coscup-2013.js?ts=1375589732"></script>
<script>
<?php
echo <<<EOF
    var u_id = "";
    var fb_apid = "$fb_apid";
    var blMobile = false;
    var blShowRoomSession = false;
    //var BASE_URL = "$BASE_URL";
    var config_web_url = "$BASE_URL";
    var blEnableKeyBoard = true;
    var my_fb_id = "";
EOF;
?>
</script>
<?php #if($ENV['MOBILE']== 1){ ?>
  <script>
  /*
  update by Win,暫時不使用,因為在手機版的活動贈票頁及關於我們會有問題
  防止用戶拉動網頁
  document.addEventListener("touchmove", function(event){
    event.preventDefault();
  }, false);
  */
  //網頁載入完成時隱藏最頂的網址列
  window.onload = function(){
    setTimeout(function(){
       window.scrollTo(0, 1);
    }, 100);
    fb_CallBack();
  }
  </script>
<?php #} ?>
<!-- UserVoice JavaScript SDK (only needed once on a page) -->
<script>(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/yFEac7W0la7Ps6uE9Z2rQQ.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})()</script>
