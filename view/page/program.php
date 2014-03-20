<?php
if (!defined('FROM_INDEX')) die ('No permission');
if ($PAGE['USER_INFO']['IS_VERIFIED_USER']) {
        echo <<<EOF
    <script>
        u_id = "{$PAGE['USER_INFO']['U_ID_FROM_COOKIE']}";
        blMobile = false;
        blShowRoomSession = true;
        $(function() {
            //console.log("Cookie");

            load_rooms("ShowRooms('AfterShowRooms();');");
            load_customer_nickname_tab("{$PAGE['BUDDY_INFO']['BUDDY_LIST']}");
        });

        function AfterShowRooms(){
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

        function fb_CallBack(){

        }

    </script>
EOF;
    } else {
        echo <<<EOF
    <script>
        var blMobile = false;
        var blShowRoomSession = true;
        $(function() {
            //console.log("Home");
            $("#edit_my_program").show();
            load_customer_nickname_tab("{$PAGE['BUDDY_INFO']['BUDDY_LIST']}");
            load_rooms("ShowRooms('AfterShowRooms();');");
        });

        function AfterShowRooms(){
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

        function fb_CallBack(){

        }

    </script>
EOF;
}
?>
</head>
<body>
<div id="fb-root"></div>
<div class="container_12">
    <?php
        $view_data = array(
            'PAGE' => $PAGE,
        );
        Page::load('navbar', $view_data);
    ?>

    <div id="bd"  class="grid_12 clearfix">
    <div id="bd_wrap" class="clearfix">
        <?php
        Page::load('map-slider');
        Page::load('map', $view_data);
        ?>
    </div><!-- #bd_wrap -->
    </div>

    <?php include('view/footer.php');?>

</div>
