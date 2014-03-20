<?php
// XXX what is this?
//$u_id = @$_GET['id'];

    echo <<<EOF
    <script>
        var u_id = "$u_id";
        var fb_apid = "$fb_apid";
        var blMobile = false;
        var blShowRoomSession = false;
        $(function() {
            load_customer_nickname_tab('$tmp_fp_list');
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
        'u_id' => $u_id,
    );
    Page::load('navbar', $view_data);
    ?>
    <div id="bd"  class="grid_12 clearfix">
    <div id="bd_wrap" class="clearfix">
        <div class="empty_wrap">
            <div id="introduce_wrap" class="static_page">
            <hr />
            <h1>關於我的活動地圖</h1>
            <hr />
            <div>
                <ul><?php #Unnumbered List ?>
                    <li><a href="/COSCUP_2013/program/" class="custom_btn special_btn" target="_blank">我的活動地圖 for COSCUP 2013</a> 已圓滿落幕。我們未來將持續開發新功能，歡迎您留下 Email，我們將在新功能推出後，優先通知您。</li>
                </ul>
            </div>
            <iframe class="google_form" src="https://docs.google.com/forms/d/1VtcYWb03xt6lQCPsksxpCVijvhKm-OJuhHb3qhlnP48/viewform?embedded=true"  height="190" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">載入中…</iframe>
            <div>
                <ul>
                    <li>成果展示：<a href="/COSCUP_2013/program/" class="custom_btn special_btn" target="_blank">我的活動地圖 for COSCUP 2013</a></li>
                </ul>
            </div>
            <h3>輕鬆的製作活動日程表、議程表、功課表</h3>
            <hr />
            <p>
                <img id="schdeule_light" src="/assets/images/schedule_light.png">
            </p>
            <h3>與朋友即時交談</h3>
            <hr />
            <p>
                <img id="chat" src="/assets/images/chat.png"/>
            </p>
            <hr />
            <div><a href="http://www.unisharp.com">Powered by <img alt="UniSharp - 悠夏爾科技股份有限公司" src="http://www.unisharp.com/images/unisharp.gif" /></a></div>
            </div><!--#introduce_wrap.static_page-->
        </div>
    </div><!--bd_wrap-->
    </div>
    <?php include('view/footer_my.php');?>
</div>
</body>
</html>



