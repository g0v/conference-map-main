<?php
if (!defined('FROM_INDEX')) die ('No permission');
?>
    <script>
        var blMobile = false;
        var blShowRoomSession = true;

        $(function() {
            $("#edit_my_program").show();
            load_customer_nickname_tab("{$PAGE['BUDDY_INFO']['BUDDY_LIST']}");
            load_rooms("ShowRooms('AfterShowRooms();');");
        });

        function AfterShowRooms(){
            screenSize();
            LoadSlidesjs();
            load_programs_new(ShowProgram);
            console.log("after");
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
