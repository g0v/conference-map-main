<div id="ft_wrap" class="clearfix"><div id="ft"  class="grid_12 clearfix">悠夏爾科技股份有限公司 &copy; 2013 Unisharp. All Rights Reserved.</div></div>

<?php
#popup_tooltip 預設應為隱藏,且mobile沒有此功能
function display_popup_tooltip($has_other_msg_demo){
    $ret='';
    $ret.='<div id="popup_tooltip">';
    $ret.='<div class="left_triangle"></div>';
    if( $has_other_msg_demo ==1 ){
        $ret.='
            <ul id="users_message">
            <li class="clearfix"><img src="/assets/images/people.png"/><p class="content_txt"><span class="name">win:</span>我在這！</p></li>
            <li class="clearfix"><img src="/assets/images/people.png"/><p class="content_txt"><span class="name">JOJO:</span>我也在這</p></li>
            <li class="clearfix"><img src="/assets/images/people.png"/><p class="content_txt"><span class="name">JOJO:</span>我也在這我也在這我也在這我也在這我也在這我也在這我也在這我也在這</p></li>
            <li class="clearfix"><img src="/assets/images/people.png"/><p class="content_txt"><span class="name">JOJO:</span>我也在這</p></li>
            <li class="clearfix"><img src="/assets/images/people.png"/><p class="content_txt"><span class="name">JOJO:</span>我也在這</p></li>
            <li class="clearfix"><img src="/assets/images/people.png"/><p class="content_txt"><span class="name">JOJO:</span>我也在這</p></li>
            </ul>
            ';

    }
    $ret.='
    <form class="txt_and_btn_wrap clearfix">
    <textarea id="user_msg_textarea" placeholder="輸入留言，按 Enter 送出。" cols="20" rows="2"></textarea>
    <input type="text" class="custom_input_text" placeholder="暱稱?" maxlength="20"/>
    <a class="icon fb_login" href="javascript:void(0);" onclick="javascript:facebook_login();">從 FB 帶入</a>
    <input type="submit" class="custom_btn" value="送出"/>
    </form>
    </div><!--popup_tooltip-->';
    return $ret;
}

//echo display_popup_tooltip(rand(0,1));
echo display_popup_tooltip(1);
?>

<div id="fb-root"></div>
<script src="/assets/js/event.js?ts=1375589732"></script>
<script src="/assets/js/facebook.js"></script>
