<?php
if (!defined('FROM_INDEX')) die ('No permission');
    echo <<<EOF
    <script>
        u_id = "{$PAGE['USER_INFO']['U_ID']}";
        blMobile = false;
        blShowRoomSession = false;
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
        'PAGE' => &$PAGE,
    );
    Page::load('navbar', $view_data);
    ?>
    <div id="bd"  class="grid_12 clearfix">
    <div id="bd_wrap" class="clearfix">
        <div class="empty_wrap">
            <div id="free_ticket_activity_wrap" class="static_page">
            <h3>這應該是 COSCUP 2013 最後一個免費贈票活動了！(咦?)</h3>
            <hr />
            <p>
            <ol>
                <li>活動期間：即刻起 ~ 2013/08/01 13:00 止</li>
                <li>活動內容：完成以下 1~4 步驟，且被按讚次數最多的前三名，就可以拿到<a  class="custom_btn special_btn"  href="http://www.unisharp.com/" target="_blank">悠夏爾科技</a>所提供的<a href="http://coscup.org/2013/zh-tw/" class="custom_btn special_btn" target="_blank">COSCUP 2013</a>開源人年會門票乙張。</li>
                <li>名單公布辦法：將於 2013/08/01 15:00 在<a href="https://www.facebook.com/confmap" class="custom_btn special_btn" target="_blank">我的活動地圖粉絲專頁</a> 公布得獎名單，得獎人請在 2013/08/02 20:00 之前跟悠夏爾科技聯絡，聯絡方式將一併公布在粉絲專頁。
</li>
            </ol>
            </p>

            <h3>1. 加入我的活動地圖粉絲專頁</h3>
            <hr />
            <p>
            <ol>
                <li><a href="https://www.facebook.com/confmap" class="custom_btn special_btn" target="_blank">https://www.facebook.com/confmap</a></li>
            </ol>
            </p>

            <h3>2. 請至我的活動地圖網站，規劃並且分享您的趕場路線。</h3>
            <hr />
            <p>

            <ol class="lower_alpha step">
                <li>
                    <div class="pic"><img src="/assets/images/free_ticket/step_1.png"/></div>
                    <p class="content"><i class="item_icon">A</i>連到：<br><a style="color:#fff" class="" href="http://map.unisharp.net/COSCUP_2013" target="_blank">http://map.unisharp.net/COSCUP_2013 <i class="icon target_blank"></i></a></p></li>
                <li>
                    <div class="pic"><img src="/assets/images/free_ticket/step_2.png"/></div>
                    <p class="content"><i class="item_icon">B</i>點選：「+規劃我的趕場路線」</p></li>
                <li>
                    <div class="pic"><img src="/assets/images/free_ticket/step_3.png"/></div>
                    <p class="content"><i class="item_icon">C</i>依次選擇你感興趣的議程後，按「儲存」</p></li>
                <li>
                    <div class="pic"><img src="/assets/images/free_ticket/step_4.png"/></div>
                    <p  class="content"><i class="item_icon">D</i>按 「下一步」到 「設定個人顯示名稱」頁面</p></li>
            </ol>
            </p>
            <h3 class="clearfix" style="clear:both">3. 請在我的活動地圖粉絲專頁上，留下您的趕場路線網址。</h3>
            <hr />
            <ol class="lower_alpha step">
                <li>
                    <div class="pic"><img src="/assets/images/free_ticket/step_5.png"/> </div>
                    <p  class="content"><i class="item_icon">E</i>點選 「從 Facebook 帶入名稱及圖像」，帶入完成後，請點選「確認</p></li>
                <li>
                    <div class="pic"><img src="/assets/images/free_ticket/step_6.png"/> </div>
                    <p  class="content"><i class="item_icon">F</i>接下來您會看到「（您的名字）的 COSCUP 2013 趕場路線」頁面，請將此網址 http://map.unisharp.net/COSCUP_2013/{一串亂碼} 貼到的我的活動地圖粉絲專頁（歡迎您也轉貼到自己的塗鴉牆，讓更多朋友看到喔！)。</p></li>
            </ol>

            <h3>4. 通知您的朋友來幫你按讚吧！</h3>
            <hr />
            <ul>
                <li>2013.07.30 補充：有使用者反應，Facebook 分享連結後，同連結的按讚的數字無法在不同的分享之間累積。為求公平統計，我們決議以個人趕場地圖中右方的 Like （讚）累積數字為判斷依據。（請參考以下連結的白色背景右方的小 Like 數字 <a href="http://map.unisharp.net/COSCUP_2013/d64afypx4uf4" class="custom_btn special_btn" target="_blank">http://map.unisharp.net/COSCUP_2013/d64afypx4uf4</a>。這個數字可以用 <a href="https://graph.facebook.com/?ids=http://map.unisharp.net/COSCUP_2013/d64afypx4uf4" class="custom_btn special_btn" target="_blank">Facebook Graph API</a> 查詢得知。</li>
            </ul>

            <h3>5. 公布得獎名單及確認取票方式。</h3>
            <hr />
            <p>
            <ul>
                <li>別忘了在 2013/08/01 15:00 之後到我的活動地圖粉絲專頁查看自己有沒有得到前三名，並 Email 給我們確認取票流程。</li>
            </ul>
            </p>
            <hr />
            <div><a href="http://www.unisharp.com">Powered by <img alt="UniSharp - 悠下爾科技股份有限公司" src="http://www.unisharp.com/images/unisharp.gif" /></a></div>
            </div>
        </div>
    </div><!--bd_wrap-->
    </div>
    <?php include('view/footer_my.php');?>
</div>
</body>
</html>
