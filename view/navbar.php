<?php
/* die(var_dump($PAGE, true)); */
$buddy_list = explode(',', $PAGE['BUDDY_INFO']['BUDDY_LIST']);
if (!is_array($buddy_list)) {
    $buddy_list = array();
}

$cur_tab = $PAGE['ACTIVITY_INFO']['ACTION_ID'];
$base_url = '';
if (strlen($PAGE['ACTIVITY_INFO']['ACTIVITY_ID']) > 0) {
    $base_url = '/' . $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'];
}

?>
<div id="mobile_cover_bg"></div>
<div id="hd_wrap" class="clearfix">
    <div id="hd" class="grid_12 clearfix">
        <h1><a class="logo" style="border-style:none;" href="/"></a><p>for <?php echo $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'];?></p></h1>
        <span id="activity_id"><?php echo $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'];?></span>
        <ul id="nav">
            <li class="<?php echo ($cur_tab == 'chat-map') ? 'cur': '';?> mobile_float_r"><a href="/">聊天地圖</a></li>
            <li class="<?php echo ($cur_tab == 'about') ? 'cur': '';?> mobile_float_r"><a href="/about">About</a></li>
        </ul>
    </div>
</div><!--#hd_wrap-->
