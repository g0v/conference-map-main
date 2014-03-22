<?php
if (!defined('FROM_INDEX')) die ('No permission');
    echo <<<EOF
    <script>
        var u_id = "{$PAGE['USER_INFO']['U_ID']}";
        var fb_apid = "$fb_apid";
        var blMobile = false;
        var blShowRoomSession = false;
        $(function() {
            load_customer_nickname_tab('{$PAGE['BUDDY_INFO']['BUDDY_LIST']}');
        });

        function fb_CallBack(){

        }
    </script>
EOF;

?>
</head>
<body>
<div class="container_12">
    <?php
    $view_data = array(
        'PAGE' => $PAGE,
    );
    Page::load('navbar', $view_data);
    ?>
    <div id="bd"  class="grid_12 clearfix">
    <div id="bd_wrap" class="clearfix">
        <div id="myprogram_timeline">
            <div id="about_wrap" class="feed">
            <h3>關於</h3>
            <p>請注意，本網站無 SSL 加密，且您發表的訊息每個人都可以看到，因此請勿傳送任何隱私資訊。</p>
            <p>目前沒有查詢歷史紀錄的功能。</p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <hr />
            </div>
        </div>
    </div><!--bd_wrap-->
    </div>
    <?php include('view/footer.php');?>
</div>
</body>
</html>
