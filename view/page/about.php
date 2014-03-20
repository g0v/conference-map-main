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
            <h3>關於「我的活動地圖」：</h3>
            <hr />
            <p>
            <ol>
                <li>感謝您關注我們的產品 - <a href="/" class="custom_btn special_btn" target="_blank">我的活動地圖 for COSCUP 2013</a>。</li>
                <li>有感於 <a href="http://coscup.org/2013/zh-tw/" class="custom_btn" target="_blank">COSCUP 2013</a> 的八軌議程實在讓人太難抉擇，促成了這個小工具，希望您會喜歡。如果有任何覺得需要改進的地方，歡迎您 <a href="https://docs.google.com/forms/d/1LkO0cvJXG9882LtNIdRKLDtFOZpbHqrjtABr9117mUM/viewform?edit_requested=true" target="_blank" class="custom_btn special_btn">提供意見</a>給我們，或是加入我們的 <a href="https://www.facebook.com/confmap" class="custom_btn special_btn" target="_blank">Facebook 粉絲團</a>，持續關注我們。</li>
                <li>我們是 <a class="custom_btn" href="http://coscup.org/2013/zh-tw/" target="_blank">COSCUP 2013</a> 的贊助商之一，但不是籌備單位。以下的聲明，均是我們的私人立場，與 COSCUP 主辦單位無關。</li>
            </ol>
            </p>

            <h3>給正常人：</h3>
            <hr />
            <p>
            <ol>
                <li><a class="custom_btn" href="http://coscup.org/2013/zh-tw/about/" target="_blank">COSCUP</a> 是全台灣最大的自由軟體、開放原始碼軟體研討會。詳細的介紹請參考<a class="custom_btn" href="http://coscup.org/2013/zh-tw/about/" target="_blank">COSCUP 官方網站</a>。</li>
                <li><a href="/" class="custom_btn special_btn" target="_blank">我的活動地圖</a> 是一個幫助研討會參與者選擇並記錄自己想參加的議程、規劃動線的小工具。</li>
            </ol>
            </p>

            <h3>給工程師：</h3>
            <hr />
            <p>
            <ol>
                <li>我們鼓勵您多選擇朋友沒參加的議程，每一個 <a class="custom_btn" href="http://coscup.org" target="_blank">COSCUP</a> 演講內容，都是講者與其他眾多開發者多年奉獻的心血結晶，希望您與您的朋友們利用這個工具，分散彼此參與的議程，並於 <a class="custom_btn" href="http://coscup.org" target="_blank">COSCUP</a> 會後彼此分享，確保這些心血被廣泛的散播與吸收。我們雖提供每個人設定自己感興趣的議程，但為了避免講者與主辦單位困擾，本網站不做議程熱門程度統計。</li>
                <li>本網站的議程資料來自 <a class="custom_btn" href="http://coscup.org/2013/zh-tw/api/" target="_blank">COSCUP API</a> 。為了不影響 <a class="custom_btn" href="http://coscup.org" target="_blank">COSCUP</a> 的網站流量，我們不會即時從 <a class="custom_btn" href="http://coscup.org" target="_blank">COSCUP</a> 網站更新議程資訊。如果您發現議程資訊錯誤，歡迎您告訴我們。</li>
                <li>本網站會使用 Cookie 來記錄您的趕場路線圖 ID, 以及被您加入頁籤的朋友趕場路線圖 ID （目前只會保留最近的三個朋友頁籤）</li>

                <?php #<!-- //this is buggy, use it only when you read this line <li> * 我們支援 Application Cache 技術，確保您能在網路連線狀況不佳的環境，也能觀看地圖以及議程資訊。因此建議您可以在有網路的地方，點選「使用 cache」瀏覽一次網站，並同意瀏覽器使用離線瀏覽功能，讓您的瀏覽器先 cache 住議程資訊。您也可以手動在網址後面加上 ?cache=1 來啟用 cache。</li>-->?>
            </ol>
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
