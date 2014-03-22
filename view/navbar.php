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
<a href="https://github.com/g0v/conference-map-main/"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://github-camo.global.ssl.fastly.net/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>

<div id="mobile_cover_bg"></div>
<div id="hd_wrap" class="clearfix">
    <div id="hd" class="grid_12 clearfix">
        <h1><a class="logo" style="border-style:none;" href="/"></a><p>for <?php echo $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'];?></p></h1>
        <span id="activity_id"><?php echo $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'];?></span>
        <ul id="nav">
            <li class="<?php echo ($cur_tab == 'program') ? 'cur': '';?> mobile_float_r"><a href="/congressoccupied/program">Schedule</a></li>
            <li class="<?php echo ($cur_tab == 'about') ? 'cur': '';?> mobile_float_r"><a href="/about">About</a></li>
        </ul>
    </div>
</div><!--#hd_wrap-->
