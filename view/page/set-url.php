<?php
echo <<<EOF
<script>
    u_id = "{$PAGE['USER_INFO']['U_ID']}";
    blEnableKeyBoard = false;
    blMobile = false;
    blShowRoomSession = false;

    $(function() {
        load_customer_nickname_tab('{$PAGE['BUDDY_INFO']['BUDDY_LIST']}');
        $("#save_box").css("display","block");
        $("#edit_my_program").html("<span>設定個人網址</span>").fadeIn();
    });

    function fb_CallBack(){

    }
</script>

EOF;
$personal_url = $CONFIG['BASE_URL']  . "/" . $PAGE['ACTIVITY_INFO']['ACTIVITY_ID'] . "/{$PAGE['USER_INFO']['U_ID']}";
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
            <div id="save_box">
                <div id="step2">
                    <!--div class="confirm_box notice_tip alert alert-block"-->
                    <div>
                        <!--button type="button" class="close" data-dismiss="alert">×</button-->
                        <h3>設定個人顯示名稱</h3>
                        <span>顯示名稱</span>：<input type="text" id="personal_nickname" maxlength="20" placeholder="John"/>
                        <a class="icon fb_login" href="javascript:void(0);" onClick="javascript:facebook_login();">從 FB 帶入名稱及圖像</a>
                        <input type="text" id="personal_fb_id" style="display:none;" />
                        <!--i class="question fb_question" title=""></i-->
                        <p>
                            <button id="btn_use_default" class="custom_btn" onClick="javascript:SavePersonalNickName();" >確認</button>
                            <button id="btn_use_default" class="custom_btn" onClick="javascript:GoToPersonalPage('<?php echo $personal_url;?>');" >跳過</button>
                        </p>
                        <hr />
                        <ul class="info">
                            <li>Facebook 登入資訊僅用來帶入您的 Facebook <u>顯示名稱</u>及<u>個人圖像</u>，不做其它用途。</li>
                            <li>個人顯示名稱與圖像的顯示範例如下圖：</li>
                        </ul>
                        <img src="/assets/images/why-fb.png" alt="Why facebook login" />
                    </div>
                </div> <!-- step2 -->
                <div id="step1">
                    <h3>您的趕場路線網址是:</h3>
                        <!--<i class="delete disapper"></i>-->
                        <p>
                            <a id="personal_default_url" href="<?php echo $personal_url; ?>" target="_blank"><?php echo $personal_url;?><span id="random_id"></span><i class="icon target_blank"></i></a>
                        </p>
                        <input type="text" id="personal_u_id" value="<?php echo $PAGE['USER_INFO']['U_ID'];?>" style="display:none;" />
                        <p>
                            <button id="next_step" class="custom_btn">下一步</button>
                        </p>
                </div><!-- step1 -->
            </div> <!-- save_box -->
        </div><!--#bd_wrap-->
    </div>
    <?php include('view/footer_setting.php');?>
</div>
</body>
</html>
