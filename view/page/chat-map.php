<?php
if (!defined('FROM_INDEX')) die ('No permission');
$server_name = $ENV['SERVER_NAME'];
$port = 8082;
$nodejs_server = "http://$server_name:$port";

// XXX what's $_GET['id'] for ?
#$u_id = @$_GET['id'];
#UsSecurity::filter_xss($u_id);
UsSecurity::filter_xss($u_id_from_cookie);
?>
</head>
<body>
<div class="container_12">
    <style>
    #map .x:hover,
    #map .x:active{background:orange;cursor:pointer;}
    #layer_slides .session{cursor:pointer;}
    </style>
    <?php
    //die(var_dump($PAGE, true));
    $view_data = array(
        'PAGE' => &$PAGE,
    );
    Page::load('navbar', $view_data);
    ?>
    <div id="bd"  class="grid_12 clearfix">
    <div id="mobile_information" style="display:none">
        您好，如果您是使用 QR Code 進入到這個頁面，我們由衷向您致歉。<br>
        此頁提供線上即時聊天功能，為了提供更好的品質，目前暫不支援手機及平板電腦。<br>
        您仍然可以使用 [<a href="/<?php echo $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'];?>/program">大會議程</a>] 功能查看議程的時間、標題以及會議室資訊。
    </div>
    <div id="bd_wrap" class="clearfix onlymap">
        <?php
        Page::load('map', $view_data);
        ?>
    </div><!-- #bd_wrap -->
    </div>
    <?php include_once('view/footer_default.php');?>
</div>
<?php
if( @$ENV['MOBILE']){
    //如果是手機 不需要載入聊天功能
    //echo '<script>alert(\'mobile\');</script>';
}else{
    //PC or tablet
    echo <<<EOF
    <script src="$nodejs_server/socket.io/socket.io.js"></script>
    <script src="/assets/js/chat-map.js?ts=1375456132"></script>
    <script>
        var socket = io.connect('$nodejs_server');
        /*
        if (!io) {
            console.log('Cannot reach socket io server');
        } else if (!socket) {
            console.log('Socket connection failed. Unknown networking error.');
        }
        */

        function fb_CallBack(){
            chat_fb_login(Get_NickName);
        }


        //使用 chatMap (要載入 chat-map.js )
        chatMap().initialize();
    </script>

EOF;

}
?>
    <script>
        u_id = "{$PAGE['USER_INFO']['U_ID_FROM_COOKIE']}";
        blMobile = false;
        blEnableKeyBoard = false;
        blShowRoomSession = false;
        var iTS =  new Date().getTime();

        $(function() {
            //console.log("activity");

            load_rooms("ShowRoomsAndOtherRooms('AfterShowRooms();');");
            load_customer_nickname_tab("{$PAGE['BUDDY_INFO']['BUDDY_LIST']}");

            // FIXME workaround
            $('#map_info .date').html('08/04');

        });

        function AfterShowRooms(){
            $(".session").click(function(){
                var iRoomIndex = $(this).attr("data-id");
                //switchRoom("Room_"+iRoomIndex);
                chatMap().switchRoom("Room_"+iRoomIndex);
            });

            screenSize();
            LoadSlidesjs();
            load_programs('ShowProgram();');
        }

        function ShowProgram(){
            if(aryDate.length > 0){
                SetCurrentProgramIndex();
                ShowDateTable(aryDate);
                ShowData();
            }

        }

        function AfterShowNickname(){

        }
    </script>
</body>
</html>
