/*
 *Global Variable:
 *$edit_my_program   規劃我的趕場路線
 *$myprogram_timeline  我的議程清單
 *$DateTable 日期按鈕
 *$program_edit 當規劃我的議程時,所有的會議室都會有這個class
 */
var $edit_my_program = $("#edit_my_program"),
    $myprogram_timeline = $('#myprogram_timeline'),
    $program_edit = $(".program_edit"),
    $DateTable = $("#DateTable"),
    $TimeTable = $('#TimeTable'),
    $linkGoPreProgram = $('#linkGoPreProgram'),
    $linkGoNextProgram = $('#linkGoNextProgram'),
    $map_info_floor = $('#map_info .floor');

//定義鍵盤快速鍵keydown事件
$(document).keydown(function(event) {
    if (blEnableKeyBoard == true) {
        switch (event.keyCode) {
            case 87:
                ShowPreProgram(); //上一場
                break;
            case 83:
                ShowNextProgram(); //下一場
                break;
            case 65:
                ShowPreDate(); //前一天
                $DateTable.find('li:eq(0)').trigger('click');
                break;
            case 68:
                ShowNextDate(); //後一天
                $DateTable.find('li:eq(1)').trigger('click');
                break;
            case 49:
                trigger_slider_floor(1); //左地圖
                $map_info_floor.html(get_user_selected_floor());
                break;
            case 50:
                trigger_slider_floor(2); //右地圖
                $map_info_floor.html(get_user_selected_floor());
        }
    }
});


$("#btn_use_default").click(function() {
    //POST_TO_MYPROGRAM();
});

$("#btn_use_personal").click(function() {

});

$('#play_my_program').on('click', function() {
    show_map();
});

//如果有要看我的議程清單,再綁定事件
if ($myprogram_timeline.length > 0) {
    $('#myprogram_timeline nav').on('click', 'time', function() {
        $(this).siblings().removeClass('cur'); //移除另外一個的cur class
        $(this).addClass('cur');
        $('nav').attr('data-currentselected', $(this).data('date'));
        ShowMyProgram($(this).data('date'));
    })
}

//重新編輯我的議程function
function re_edit_my_program() {
    if (blSelectedProgram == false) {
        blSelectedProgram = true;

        $("#nav li").removeClass("cur");
        //$(".edit_my_program").html("<span>下一步>></span>").fadeIn();
        $edit_my_program.addClass("cur");
        $edit_my_program.html("<span><i class=\"icon add_my_program\"></i>規劃我的趕場路線</span>");
        //$(this).html("下一步>>");

        $(".session").addClass("program_edit");
        $(".program_edit").bind("click", SelectProgram);

        show_diy_tip('請直接點選您欲前往的議程，<br /> 點選完畢後，請按 <a href="javascript:SaveMyProgram();">下一步</a>', false, -1);
        selectedDateIndex = 0;
        selectedProgramIndex = -1;
        SetNextProgramIndex();
        ShowData();
    } else {
        SaveMyProgram();
    }
}

$("#edit_my_program a").click(function() {
    $('#map .session').on('click', function() {
        $(this).effect("transfer", {
            to: ".timeline_selected"
        }, 500, function() {});
    });
    //console.log("blSelectedProgram"+blSelectedProgram);
    if (blSelectedProgram == false) {
        blSelectedProgram = true;

        $("#nav li").removeClass("cur");
        $edit_my_program.addClass("cur");
        $edit_my_program.html("<span><i class=\"icon add_my_program\"></i>規劃我的趕場路線</span>");

        $(".session").addClass("program_edit");

        $(".program_edit").bind("click", SelectProgram);

        show_diy_tip('<div class="mr10">點選會議室，來規劃您欲前往的議程。<br>註：點選 1F, 2F 切換樓層</div>', false, -1);

        selectedDateIndex = 0;
        selectedProgramIndex = -1;
        SetNextProgramIndex();
        ShowData();
    } else {
        show_diy_tip('<div class="mr10">請繼續點選.</div>', false, -1);
        SaveMyProgram();
    }
});




$DateTable.on('click', 'li', function() {
    var sDate = $(this).attr("data-date");
    var dFrom = new Date(sDate + " 00:00:00");
    var tFrom = ConverToTimestamp(dFrom);
    var iSearch = aryDate.indexOf(tFrom);
    if (iSearch >= 0) {
        if (aryTimeFrom[iSearch].length <= selectedProgramIndex) {
            selectedProgramIndex = aryTimeFrom[iSearch].length - 1;
        }
        selectedDateIndex = iSearch;
        ShowData();
    }
    $('#date_name').html($(this).html()).show().delay(600).fadeOut(200);
    $('#map_info .date').html(get_user_selected_date());
});


$TimeTable.on('click', 'li', function() {
    selectedProgramIndex = $TimeTable.find('li').index($(this));
    ShowData();
});


$DateTable.on('click', 'li', function() {
    $DateTable.find('li').each(function() {
        $(this).removeClass('cur');
    });
    $(this).addClass('cur');
});

$("#play_my_program").on('click', function() {
    $(".personal_walk_icon").fadeIn();
    if (blPlayMyProgram == false) {
        blPlayMyProgram = true;

        if (iPlayTime == 0) {
            selectedDateIndex = 0;
            selectedProgramIndex = 0;
            ShowData();
        }
        $("#play_my_program").html("<img src='/assets/images/pause.png' /> 停止");
        //setTimeout("ShowNextProgram()", 10 );
        iPlayTime = setInterval("ShowNextProgram()", 2000);
    } else {
        $("#play_my_program").html("<img src='/assets/images/play.png' /> 繼續播放");
        blPlayMyProgram = false;
        window.clearInterval(iPlayTime);
    }

});

function Play() {
    //iPlayTime = setInterval("ShowNextProgram()",2000);
}

/*Custom Mobile version START*/
if (windowWidth < 760) {
    var nav_width = $('#nav').width();
    var $mobile_cover_bg = $('#mobile_cover_bg');

    $('#hd h1').before('<div id="mobile_nav_controller"><a href=""><i class="icon mobile_nav"></i><!--選單列--></a></div>');
    //copy #nav and move before container_12
    //調整dom位置
    $nav.insertBefore('.container_12');
    $('#custom_program_navi').insertBefore('.timeline');
    $DateTable.insertBefore('#SelectedTime');
    $('div.deit_my_progream').appendTo('#nav');

    $('#mobile_nav_controller').on('click', function(e) {
        e.preventDefault();
        $('#nav').css('display', 'block');
        $('.container_12').css({
            "margin-left": nav_width + 'px'
        });
        $('ul.slidesjs-pagination').css('width', $container_12.width()).css('left', '150px');
        $mobile_cover_bg.addClass('click_effect');
        $mobile_cover_bg.on('click', function() {
            $('#nav').css('display', 'none');
            $('.container_12').css({
                "margin-left": 0
            });
            $(this).removeClass('click_effect');
            $('ul.slidesjs-pagination').css('width', '100%').css('left', '0px');
        });

        $('#edit_my_program').on('click', function() {
            $mobile_cover_bg.removeClass('click_effect');
            $('#nav').css('display', 'none');
            $('.container_12').css({
                "margin-left": 0
            });
            $('ul.slidesjs-pagination').css('width', '100%').css('left', '0px');
        });

    });

    //上一場,下一場的按鈕,目前只有手機版會出現這個btn
    $linkGoPreProgram.click(function() {
        ShowPreProgram();
    });
    $linkGoNextProgram.click(function() {
        ShowNextProgram();
    });
    $linkGoNextProgram.html("下一場");
    $linkGoPreProgram.html("上一場");

}
/*Custom Mobile version END*/


/*偵測平板的方向,暫時用不到
//http://davidwalsh.name/orientation-change
//http://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad
// Listen for orientation changes
window.addEventListener("orientationchange", function() {
// Announce the new orientation number
//alert(window.orientation);
}, false);


// Listen for resize changes
window.addEventListener("resize", function() {
// Get screen size (inner/outerWidth, inner/outerHeight)

}, false);

// Find matches
var mql = window.matchMedia("(orientation: portrait)");

// If there are matches, we're in portrait
if(mql.matches){
// Portrait orientation
}else{
// Landscape orientation
}

// Add a media query change listener
mql.addListener(function(m){
if(m.matches && windowWidth>760) {
// Changed to portrait
//console.log('portrait');
//alert('請用橫的看');
}
else {
// Changed to landscape
//console.log('landscape');
}
});
*/


function update_map_info_floor_txt() {
    $('.slidesjs-pagination a').on('click', function() {
        $map_info_floor.html(+$('.slidesjs-pagination').find('a.active').attr('data-slidesjs-item') + 1 + 'F');
    });
}

trigger_slider_floor(1); //先主動碰1F
update_map_info_floor_txt();
setTimeout("update_map_info_floor_txt();", 2000);


/*
 *confirmbox 消失事件
 *Win:目前網站不需要confirmbox
 $('.confirm_box').on('click','.close',function(){
 $(this).parents().find('.confirm_box').fadeOut();
 });
*/


/*
check @ 20140318 沒有地方用到這個 funciton
function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}
*/
