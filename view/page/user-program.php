<?php
if (!defined('FROM_INDEX')) die ('No permission');

echo <<<EOF
    <script>
        var u_id = "{$PAGE['USER_INFO']['U_ID']}";
        var blMobile = false;
        var blShowRoomSession = true;

        $(function() {
            hide_map();

            $('#F1').prepend('<div id="F1_walk" class="personal_walk_icon"><span class="name">You</span></div>');
            $('#F2').prepend('<div id="F2_walk" class="personal_walk_icon"><span class="name">You</span></div>');
            $('.personal_walk_icon').hide();

            load_customer_nickname_tab('{$PAGE['BUDDY_INFO']['BUDDY_LIST']}');
            load_rooms("ShowRooms('AfterShowRooms();');");

        });

        function AfterShowRooms(){
            load_programs('ShowProgram();');
            screenSize();
            LoadSlidesjs();
        }

        function ShowProgram(){
            Switch_to_Program(u_id,'ShowMyProgramList();');
        }

        function fb_CallBack(){

        }
    </script>

EOF;
?>

<body>
<div class="container_12">
    <?php
    $view_data = array(
        'PAGE' => &$PAGE,
    );
    Page::load('navbar', $view_data);
    ?>
    <div id="bd"  class="grid_12 clearfix">
    <div id="bd_wrap" class="clearfix">
        <div id="myprogram_timeline">
            <section id="activity">
            <!-- FIXME -->
 <?php
    if ($PAGE['USER_INFO']['IS_MYSELF']) {
            echo '<h1><span id="my_program_nickname">我</span> 的 '.$PAGE['ACTIVITY_INFO']['ACTIVITY_ID'].' 趕場路線';
            echo ' <a href="/'.$PAGE['ACTIVITY_INFO']['ACTIVITY_ID'].'/program?reset=1" class="custom_btn reset_btn">重設</a>';
            echo ' <a href="javascript:play_program(\''. $PAGE['USER_INFO']['U_ID'] .'\');" class="custom_btn play_btn"><i class="icon play"></i>播放</a>';
            echo ' <a class="fb_share" href="javascript:FB_SHARE();"><i class="icon fb_share">分享</i></a>';
            echo ' <div id="my_msg" style="display:none;" class="custom_btn"></div>';
    } else {
            echo '<h1><span id="my_program_nickname">匿名</span>的 '.$PAGE['ACTIVITY_INFO']['ACTIVITY_ID'].' 趕場路線';
            echo ' <a href="/action/save_friends_program.php?f_id='. $PAGE['USER_INFO']['U_ID'] . '&activity_id='.$PAGE['ACTIVITY_INFO']['ACTIVITY_ID'].'" class="custom_btn">存到分頁</a>';
            echo ' <a href="javascript:play_program(\''. $PAGE['USER_INFO']['U_ID'] .'\');" class="custom_btn play_btn"><i class="icon play"></i>播放</a>';
    }
 ?>
            </h1>
            <nav id="my_program_list" data-currentSelected="2013/8/3">
                <div id="fb-like-myprogram" class="fb-like" data-href="<?php echo $CONFIG['WEB_URL'] ?>" data-send="false" data-layout="button_count" data-width="450" data-show-faces="true"></div>
            </nav>
            <div class="feed">
            </div>
            </section>
        </div><?php # myprogram_timeline?>
        <?php
        Page::load('map-slider');
        Page::load('map', $view_data);
        ?>
        <div id="my_program_box">
            <ul id="my_program_list"></ul>
        </div>
        </div><!--bd_wrap-->
    </div>
    <?php include('view/footer_my.php');?>
</div>
