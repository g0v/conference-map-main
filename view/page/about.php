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
<a href="https://github.com/UniSharp/conference-map-main/"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://github-camo.global.ssl.fastly.net/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
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
    <?php include('view/footer_my.php');?>
</div>
</body>
</html>
