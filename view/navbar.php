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
            <li class="<?php echo ($cur_tab == 'chat-map') ? 'cur': '';?> mobile_float_r"><a href="<?php echo $base_url;?>">聊天地圖</a></li>
            <li class="<?php echo ($cur_tab == 'program') ? 'cur': '';?> mobile_float_r"><a href="<?php echo $base_url;?>/program">大會議程</a></li>
            <?php if ($PAGE['USER_INFO']['U_ID_FROM_COOKIE']): ?>
            <li id="program_<?php echo $PAGE['USER_INFO']['U_ID_FROM_COOKIE'];?>" class="<?php echo ($cur_tab == 'myprogram') ? 'cur' : '' ;?>"><a href="<?php echo $base_url;?>/<?php echo $PAGE['USER_INFO']['U_ID_FROM_COOKIE'];?>">我的趕場路線</a></li>
            <?php endif; ?>
            <?php foreach ($buddy_list as $buddy_id): ?>
            <li id="program_<?php echo $buddy_id;?>" class="<?php echo ($cur_tab == 'XXX') ? 'cur': ''; ?> mobile_float_r"><a href="<?php echo $base_url;?>/<?php echo $buddy_id;?>"><?php echo $buddy_id;?></a></li>
            <?php endforeach; ?>
            <li class="<?php echo ($cur_tab == 'about') ? 'cur': '';?>"><a href="/about">關於我們</a></li>
            <li class="<?php echo ($cur_tab == 'free-ticket') ? 'cur': ''; ?>"><a href="/free-ticket">贈票活動</a></li>
            <li id="edit_my_program" class="edit_my_program <?php echo ($cur_tab == 'edit_my_rogram') ? 'cur' : '' ;?>"><a href="javascript:void(0);" title="規劃我的趕場路線"><i class="icon add_my_program"></i>規劃我的趕場路線</a></li>
            <li class="play_my_program"></li>
        </ul>
    </div>
</div><!--#hd_wrap-->
