<div id="ft_wrap" class="clearfix"><div id="ft"  class="grid_12 clearfix">目前線上聊天功能無法在平板及手機上提供完整的服務，請您暫時使用電腦來瀏覽本網站。對您造成不便請見諒。<b</div></div>

<?php
#popup_tooltip 預設應為隱藏,且mobile沒有此功能
// FIXME 抽出
function display_popup_tooltip($has_other_msg_demo){
    $ret='';
    $ret.='<div class="left_triangle"></div>';
    $ret.='<div id="popup_tooltip">';

    $ret.='<div class="command_msg">欲更改主題，請輸入 /topic 新主題</div>';
    if( $has_other_msg_demo ==1 ){
        $ret.='<ul id="users_message"><!--li class="clearfix"><img src="/assets/images/people.png"/><p class="content_txt"><span class="name">win:</span>我在這！</p></li-->
            </ul>';

    }
    $ret.='
    <div class="txt_and_btn_wrap clearfix">
    <input id="user_msg_input" type="text" class="custom_input_text" placeholder="輸入留言，按 Enter 送出。" maxlength="100"/><br />
    <input id="chat_nickname" type="text" class="custom_input_text" placeholder="暱稱?" maxlength="20"/>
    <a id="chat_fb_icon" class="icon fb_login" href="javascript:void(0);" onclick="javascript:facebook_login();">從 FB 帶入</a>
    <input type="button" id="datasend"  class="custom_btn" value="送出" />
    </div>
    </div>

<!--popup_tooltip-->';
    return $ret;
}

echo display_popup_tooltip(1);
?>
<div id="all_wrap_bg"></div>
<div id="animation_map_box"></div>
<input id="personal_fb_id" name="personal_fb_id" type="hidden" value="">

<div id="fb-root"></div>
<script src="/assets/js/event.js?ts=1375589732"></script>
<script src="/assets/js/facebook.js?08021115"></script>
