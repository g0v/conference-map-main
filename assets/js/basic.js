var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var arySID = []; //幫每個Program編一個 SID
var aryDate = []; //儲存日期
var aryTimeFrom = []; //儲存每個日期的時段 二維陣列
var aryTimeTo = []; //儲存每個日期的時段 二維陣列


var obj_Rooms = [];
var obj_OtherRooms = [];
var obj_MyProgram = [];
//var aryProgram = []; //儲存 Program  二維陣列
var obj_Program = []; //儲存 Program  二維陣列


var currTimeFrom = []; // 所選擇日期的時段 二維陣列
var currTimeTo = []; // 所選擇日期的時段 二維陣列

var currProgramIndex = 0;
var currentDateIndex = 0;

var selectedDateIndex = undefined;
var selectedProgramIndex = 0; //目前所選取的時段 index
var preDateIndex = -1;
var preProgramIndex = -1;
var blEnableKeyBoard = true;

var iMaxDesc = 100;

var aryRoom = []; //

var blSelectedProgram = false;
var selectedFloor = 1;
var blPlayMyProgram = false;
var iPlayTime = 0;
var sPlayLocation;


//var json_rooms_name;
//var json_programs;

var my_program_locations = [];
var my_program_ts = [];
var aryMyProgram = [];

var $slidesjs_container = $('.slidesjs-container'),
    $slidesjs_pagination = $('.slidesjs-pagination'),
    slidesjs_container_width = $('.slidesjs-container').width();
//fix for firefox, in ff, slidesjs-pagination's width will be too large
$slidesjs_pagination.width(slidesjs_container_width),
$container_12 = $('.container_12'),
$nav = $('#nav'),
$mobile_cover_bg = $('#mobile_cover_bg');

function play_program(sU_ID) {
    show_map();
    //
    //$(".play_my_program").html("<a href='" + document.URL + "'>回清單</a>");
    //$('#nav').append("<li id='back_list'><a href='" + document.URL + "'>回清單</a></li>");
    if ($('#back_list').length <= 0) {
        $('#nav').append("<li id='back_list'><a href='javascript:hide_map();'>回清單</a></li>");
    }
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

}

function Switch_to_Program(sU_ID, sFunction) {
    $("#nav li").removeClass("cur");
    $("#program_" + sU_ID).addClass("cur");
    load_customer_nickname(sU_ID);
    load_user_program(sU_ID, sFunction);
}

function load_rooms(sFunction) {
    var activity_id = $("#activity_id").html();
    $.ajax({
        url: '/api-static/rooms/?activity_id=' + activity_id,
        type: 'GET',
        error: function(xhr) {
            console.log(xhr);
        },
        success: function(json_data) {
            var json_rooms = json_data.response_data.rooms;
            for (var iRoom in json_rooms) {

                var sKey = iRoom;
                var obj_detail = json_rooms[iRoom];
                var sRoomName = json_rooms[iRoom].name;
                var iRoomIndex = json_rooms[iRoom].index;
                if (json_rooms[iRoom].type == "room") {
                    obj_Rooms.push(new oRoom(iRoom, obj_detail.width, obj_detail.height, obj_detail.type, obj_detail.name, obj_detail.index));
                } else {
                    obj_OtherRooms.push(new oRoom(iRoom, obj_detail.width, obj_detail.height, obj_detail.type, obj_detail.name, obj_detail.index));
                }
            }
            if (sFunction != "") {
                eval(sFunction);
            }
        }
    });
}


function load_programs(sFunction) {
    var sCOSCUP_Program_URL = "/assets/js/program.json.js?ts=1375435419";
    $.ajax({
        url: sCOSCUP_Program_URL,
        type: 'GET',
        dataType: 'json',
        error: function(xhr) {
            console.log("ERROR" + xhr);
        },
        success: function(json_data) {
            var dFrom;
            var dTo;
            var aTimeFrom = [];
            var aTimeTo = [];

            $.each(json_data.room, function(i, item) {
                aryRoom.push(item["zh-tw"]);
            });

            $.each(json_data.program, function(i, item) {
                var dProgram = new Date(item.from * 1000);
                var sYear = dProgram.getYear() + 1900;
                var sMonth = dProgram.getMonth() + 1;
                var sDate = dProgram.getDate();
                var sYMD = sYear + "/" + sMonth + "/" + sDate;
                var sPID = item.from + ":" + item.room;

                var oPro = new oProgram(item.id, sPID, item.name, item.from, item.to, item.room, item.type,
                    item.community, item.speaker, item.speakerTitle, item.bio, item.abstract, item.lang, item.isBreak, item.isMultiSlot);

                arySID.push(sPID);
                obj_Program.push(oPro);

                dFrom = new Date(sYMD + " 00:00:00");
                tFrom = ConverToTimestamp(dFrom);

                //第一個時段或是換日
                if (i == 0 || dFrom.getTime() > dTo.getTime()) {
                    aTimeFrom = new Array(); //清空 時間 array ，重新存
                    aTimeTo = new Array(); //清空 時間 array ，重新存


                    aTimeFrom.push(item.from);
                    aTimeTo.push(item.to);

                    aryTimeFrom.push(aTimeFrom);
                    aryTimeTo.push(aTimeTo);

                    aryDate.push(tFrom); // 因為是換日，所以日期也要加入
                } else {
                    //未換日
                    var iSearch = aTimeFrom.indexOf(item.from); //檢查這個時段是不是有存入(不需重複存)
                    if (iSearch < 0) { //沒有這個時段
                        aTimeFrom.push(item.from);
                        aTimeTo.push(item.to);

                        aryTimeFrom[aryTimeFrom.length - 1] = aTimeFrom; //把這個時段存入
                        aryTimeTo[aryTimeTo.length - 1] = aTimeTo; //把這個時段存入
                    }
                }

                dTo = new Date(sYMD + " 23:59:59");
                //dTo.setDate(dTo.getDate() + 1);


            });

            /*
            if(aryDate.length > 0){
                SetCurrentProgramIndex();
                ShowDateTable(aryDate);
                ShowData();
            }
            */

            if (sFunction != "") {
                eval(sFunction);
            }
        }
    });
}


function load_user_program(sU_ID, sFunction) {
    if (sU_ID != "") {
        $.ajax({
            url: '/api/myprogram/',
            type: 'GET',
            data: {
                id: sU_ID,
                activity_id: $("#activity_id").html(),
            },
            error: function(xhr) {
                console.log(xhr);
            },
            success: function(json_data) {
                obj_MyProgram = new Array();
                var response_data = json_data.response_data;
                var user_id = response_data.user_id;
                var is_registered = response_data.is_registered;
                var user_activities = response_data.user_activities;
                var activity_id = user_activities.activity_id;
                var locations = user_activities.locations;

                for (var i in locations) {
                    var sTS = i;
                    var sLocation = locations[i];
                    var o_Room = GetRoomByLocation(sLocation);
                    obj_MyProgram.push(new oMyProgram(sTS, sLocation, o_Room.roomindex));

                }
                obj_MyProgram.sort(sortByTS);

                if (sFunction != "") {
                    eval(sFunction);
                }
            }
        });
    }
}

/* FIXME duplicate code */
function load_myprogram(sFunction) {
    // FIXME add prefix to global variable u_id
    if (u_id != "") {
        $.ajax({
            url: '/api/myprogram/',
            type: 'GET',
            data: {
                id: u_id,
                activity_id: $("#activity_id").html(),
            },
            error: function(xhr) {
                console.log(xhr);
            },
            success: function(json_data) {
                obj_MyProgram = new Array();
                var response_data = json_data.response_data;
                var user_id = response_data.user_id;
                var is_registered = response_data.is_registered;
                var user_activities = response_data.user_activities;
                var activity_id = user_activities.activity_id;
                var locations = user_activities.locations;

                for (var i in locations) {
                    var sTS = i;
                    var sLocation = locations[i];
                    var o_Room = GetRoomByLocation(sLocation);
                    obj_MyProgram.push(new oMyProgram(sTS, sLocation, o_Room.roomindex));
                }
                obj_MyProgram.sort(sortByTS);
                if (sFunction != "") {
                    eval(sFunction);
                }
            }
        });
    }
}

function GetRoomByLocation(sLocation) {
    var iRoomIndex = 0;
    var o_Room;
    for (var i in obj_Rooms) {
        if (sLocation == obj_Rooms[i].location) {
            o_Room = obj_Rooms[i];
            break;
        }
    }
    return o_Room;
}

function LoadSlidesjs() {

    //SlidesJS Required: Initialize SlidesJS with a jQuery doc ready
    //use http://slidesjs.com/
    $(function() {
        $('#layer_slides').slidesjs({
            width: 940,
            height: 528,
            navigation: {
                //effect: "fade"
            },
            pagination: {
                //effect: "fade"
            },
            effect: {
                fade: {
                    // speed: 400
                }
            }
        });
    });
}
//去trigger 1f跟2f的function
function trigger_slider_floor(floor_num) {
    $('#popup_tooltip').hide(); //換樓層時隱藏
    selectedFloor = floor_num;
    ShowFloorName(floor_num);
    /*floor must be Int*/
    switch (floor_num) {
        case '1':
        case 1:
            $('.slidesjs-pagination-item.custom_triangle0').find('a').trigger('click');
            break;
        case '2':
        case 2:
            $('.slidesjs-pagination-item.custom_triangle1').find('a').trigger('click');
            break;
        default:
            $('.slidesjs-pagination-item.custom_triangle0').find('a').trigger('click');
    }
}


function ShowFloorName(floor_num) {
    $("#floor_name").html(floor_num + "F").show();
    setTimeout(function() {
        $("#floor_name").fadeOut(200);
    }, 600);
}

function load_customer_nickname(sUID) {
    var fb_u_id = "";
    var sNickName = "";
    if (sUID != "") {
        $.ajax({
            url: '/api/users/',
            type: 'GET',
            data: {
                id: sUID
            },
            error: function(xhr) {
                console.log(xhr);
            },
            success: function(json_data) {
                fb_u_id = json_data.response_data.facebook_id;
                sNickName = json_data.response_data.nickname;
                if (fb_u_id == "" || typeof(fb_u_id) == "undefined") {

                } else {
                    var img_src = "http://graph.facebook.com/" + fb_u_id + "/picture";
                    $(".personal_walk_icon").css("background-image", "url('" + img_src + "')");
                }

                $("#my_program_nickname").html(sNickName);
                $(".personal_walk_icon span.name").html(sNickName);
                //$('#program_'+u_id+' a').html(sNickName);
            }
        });
    }
}

function load_customer_nickname_tab(sU_ID_s) {
    if (!sU_ID_s) {
        return true;
    }
    var aryUID = sU_ID_s.split(',');
    for (var iIndex = 0; iIndex < aryUID.length; iIndex++) {
        if (aryUID[iIndex] != "") {
            $.ajax({
                url: '/api/users/',
                type: 'GET',
                data: {
                    id: aryUID[iIndex]
                },
                error: function(xhr) {
                    console.log(xhr);
                },
                success: function(json_data) {
                    var sUID = json_data.response_data.user_id;
                    var sNickName = json_data.response_data.nickname;
                    $('#program_' + sUID + ' a').html(sNickName);
                }
            });
        }
    }
}

function ShowMyProgramList() {
    ShowMyProgramDate();
    var sSelectedDate = UDateFormat(ConverToDate(aryDate[0]), "md");
    ShowMyProgram(sSelectedDate);
}

function ShowMyProgramDate() {
    var sSelectedDate = "";
    for (var iDate in aryDate) {
        var sYMD = UDateFormat(ConverToDate(aryDate[iDate]), "ymd");
        var sDate = UDateFormat(ConverToDate(aryDate[iDate]), "md");
        var sCur = "";
        if (iDate == 0) {
            sSelectedDate = sDate;
            sCur = "cur";
        }
        var sAppend = '<time class="' + sCur + '" data-date="' + sYMD + '">' + sDate + '</time>';
        $("#my_program_list").append(sAppend);
    }
}

function ShowMyProgram(sDate) {

    var what_show_time = sDate;
    $('#myprogram_timeline .feed').empty(); //先清空 在重塞資料
    for (var i in obj_MyProgram) {
        var sDate = UDateFormat(ConverToDate(obj_MyProgram[i].ts), "ymd");
        var sTime = UDateFormat(ConverToDate(obj_MyProgram[i].ts), "HM");

        var match_str = sDate;

        if (match_str.match(what_show_time)) { //ex:假如符合2012/8/3才顯示
            var sPID = obj_MyProgram[i].ts + ":" + obj_MyProgram[i].roomindex;
            var iSearch = arySID.indexOf(sPID);
            var o_Room = GetRoomByLocation(obj_MyProgram[i].location);

            if (iSearch >= 0) {
                //有選到
                $('#myprogram_timeline .feed').append('<article class="clearfix">' +
                    '<time>' + sTime + '</time>' +
                    '<div class="current_session"><p><span class="room_tag">' + o_Room.name + "</span> - " + obj_Program[iSearch].name + '</p></div>' +
                    '</article>');

            } else {
                //選擇全場聯撥的其他會議室

                sPID = obj_MyProgram[i].ts + ":0";
                iSearch = arySID.indexOf(sPID);
                if (iSearch >= 0) {

                    //$("#my_program_list").append('<li>'+ i+"=" + sTime +":"+obj_Program[iSearch].name+'</li>');
                    $('#myprogram_timeline .feed').append('<article class="clearfix">' +
                        '<time>' + sTime + '</time>' +
                        '<div class="current_session"><p><span class="room_tag">' + o_Room.name + "</span> - " + obj_Program[iSearch].name + '</p></div>' +
                        '</article>');
                } else {
                    //沒有選到會議室
                    $('#myprogram_timeline .feed').append('<article class="clearfix">' +
                        '<time>' + sTime + '</time>' +
                        '<div class="current_session"><span class="room_tag">' + o_Room.name + "</span> - " + ' <span class="notice">這個時段你沒有選哦..</span> ' + '</div>' +
                        '</article>');
                }
            }
        }
    }
    //$("#my_program_list").append('<li>'+sTS+'</li>');
    $('#myprogram_timeline .feed').find('article:last').css('background', 'none'); //最後一顆時間要移除背景的底線
}

function hide_map() {
    blPlayMyProgram = false;
    window.clearInterval(iPlayTime);
    $("#back_list").hide();
    $('#diy_controller').hide();
    $('#map_slider').css('visibility', 'hidden');
    $('#map').css({
        'visibility': 'hidden',
        'height': '0'
    });
    $('#layer_slides').css('height', '0');
    $('#bd .timeline').css('display', 'none');
    $("#myprogram_timeline").show();
}

function show_map() {
    $("#back_list").show();
    $("#myprogram_timeline").hide();
    $('#diy_controller').show();
    $('#map').css({
        'visibility': 'visible',
        'height': 'auto'
    });
    $('#map_slider').css({
        'visibility': 'visible'
    });
    $('#myprogram_timeline').css('display', 'none');
    $('#layer_slides').css('height', 'auto');
    $('#bd .timeline').css('display', 'block');
}

var show_floor_num_on_map = function() {
    $('.slidesjs-pagination-item.custom_triangle0 a').on('click', function() {
        selectedFloor = 1;
        ShowFloorName(1);
    });
    $('.slidesjs-pagination-item.custom_triangle1 a').on('click', function() {
        selectedFloor = 2;
        ShowFloorName(2);
    });
}


    function show_diy_tip(tip_txt, is_need_triangle, iClear) {
        //顯示tip的function
        var $diy_tip = $('.diy_tip'),
            content = tip_txt,
            triangle_height = $('.diy_tip .txt').height(),
            is_need_triangle = is_need_triangle;
        if (is_need_triangle == false) {
            $diy_tip.find('.triangle').hide();
        } else {
            $diy_tip.find('.triangle').css('top', triangle_height + 15 + 'px');
        }
        $diy_tip.fadeIn('slow');
        $diy_tip.find('.txt').empty().append(content);
        if (iClear >= 0) {
            setTimeout(function() {
                $diy_tip.fadeOut();
            }, iClear);
        }
    }


    function ShowRoomsAndOtherRooms(sFunction) {
        ShowRooms('');
        ShowOtherRooms(sFunction);
    }



    /*
2013.07.19 enhance issue, 用ＪＳＯＮ跑出議程位置
F:X:Y:Z

Confmap 專案定義名稱
Activity: 活動 (COSCUP_2013)
Map: 場地 (TICC)
User: 使用者 (account)
Location: 座標 (x:y:z)
Program: 單一議程/活動 (ex. 講者在某 Location 某 Timestamp 區間的演講)
Timestamp: 時間 (UTC unix-timestamp format)
Room: 攤位、會議室、特殊地點 (ex.充電區)
*/
    function ShowRooms(sFunction) {
        var each_width; //每隔的寬度
        var each_height; //美格的高度
        var rooms_div_padding;
        if (windowWidth < 760) {
            each_width = each_height = 20;
            rooms_div_padding = 4;
        }
        if (windowWidth < 980) { //tablet 720.css
            each_width = each_height = 15;
            rooms_div_padding = 4;
        } else { //PC  1200.css
            each_width = 27;
            each_height = 25;
            rooms_div_padding = 4;
        }


        for (var iRoom in obj_Rooms) {
            var o_item = obj_Rooms[iRoom];
            var sLocation = o_item.location;

            var floor = o_item.floor;
            var x_location = eval(o_item.x);
            var y_location = eval(o_item.y);
            var z_location = o_item.z;
            var sRoomIndex = o_item.roomindex;
            var sType = o_item.type;

            var iLeft = (x_location) * each_width;
            var iTop = (y_location * each_height);


            var this_div_style = 'top:' + iTop + 'px; left:' + iLeft + 'px; z-index:' + z_location + '; width: ' + ((o_item.width * each_width) - (rooms_div_padding * 2 /*padding:4px*/ )) + 'px; height: ' + ((o_item.height * each_height) - (rooms_div_padding * 2 /*padding:4px*/ )) + 'px';

            $('#F' + floor).prepend(
                '<div id="Room_' + sRoomIndex + '" data-id="' + sRoomIndex + '" name="' + sLocation + '" data-location="' + sLocation + '" class="session ' + 's' + o_item.name + '" style="' + this_div_style + '">' +
                '</div>'); //移除在#Room_0~#Room_9的onclick="switchRoom event"

            $('#Room_' + sRoomIndex).fadeIn();

        }
        if (sFunction != "") {
            eval(sFunction);
        }
    }

    function ShowOtherRooms(sFunction) {
        var each_width; //每隔的寬度
        var each_height; //美格的高度
        var rooms_div_padding;
        if (windowWidth < 760) {
            each_width = each_height = 20;
            rooms_div_padding = 4;
        }
        if (windowWidth < 980) { //tablet 720.css
            each_width = each_height = 15;
            rooms_div_padding = 4;
        } else { //PC  1200.css
            each_width = each_height = 25;
            rooms_div_padding = 4;
        }

        for (var iRoom in obj_OtherRooms) {
            var o_item = obj_OtherRooms[iRoom];
            var sLocation = o_item.location;
            var floor = o_item.floor;
            var x_location = o_item.x;
            var y_location = o_item.y;
            var z_location = o_item.z;
            var sRoomIndex = o_item.roomindex;
            var sType = o_item.type;



            /*
         *icon的定位方式:絕對定位版本
        var this_div_style = 'top:'+ (y_location * each_width)+ 'px; left:' + (x_location * each_height-(x_location-1)/2) +'px; z-index:' + z_location + '; width: ' + (o_item.width * each_width) + 'px; height: '+ (o_item.height * each_height) + 'px';
        $('#F'+ floor).prepend(
            '<div id="'+sType+'_'+ sRoomIndex +'" data-location="' + sLocation +'" class="icons ' + sType + '" style="'+ this_div_style +'">'+
            '</div>');    */
            //icon的定位方式:加到html板本
            $('#F' + floor).find('.y.' + y_location).find('.x.' + x_location).html('<i class="icons' + ' ' + sType + '" style="display:block;width:' + each_width + 'px;height:' + each_width + 'px"><!--icon--></i>');

        }
        if (sFunction != "") {
            eval(sFunction);
        }
    }

    function FadeInRooms() {
        //$("#Room_0").fadeIn();
        $("#Room_1").fadeIn();
        $("#Room_2").fadeIn();
        $("#Room_3").fadeIn();
        $("#Room_4").fadeIn();
        $("#Room_5").fadeIn();
        $("#Room_6").fadeIn();
        $("#Room_7").fadeIn();
        $("#Room_8").fadeIn();
        //$("#Room_9").fadeIn();
    }

    function screenSize() {
        var screenWidth = screen.width,
            screenHeight = screen.height,
            windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;

        //if user is mobile or tablet,hide slider
        if (windowWidth < 720) {
            blMobile = true;
            //alert('g');


            //$('.ui-slider-range').display('none');
        }
    }

    function SelectProgram() {
        //console.log("SelectProgram");
        var sMSG = '';

        if (obj_MyProgram.length == 0) {
            sMSG = '<div style="margin:10px">請繼續點選。</div>';
        } else if (obj_MyProgram.length == 1) {
            sMSG = '<div style="margin:10px">再多選幾個吧!</div>';
        } else {
            sMSG = '<div style="margin:10px">您可繼續選擇尚未選取的議程。<br />';
            sMSG += '若您已經完成規劃，請點選 <span style="font-size:20px"><a href="javascript:SaveMyProgram();" class="custom_btn">這裡儲存</a></span></div>';

        }

        var sTS = aryTimeFrom[selectedDateIndex][selectedProgramIndex] + "";
        var sLocation = $(this).attr("data-location");
        var sRoomID = $(this).attr("data-id");

        var o_MyProgram = new oMyProgram(sTS, sLocation, sRoomID);
        var sData = new oMyProgram(sTS, sLocation);
        var iSearch = my_program_ts.indexOf(sTS);

        if (iSearch < 0) {
            obj_MyProgram.push(o_MyProgram);
            my_program_ts.push(sTS);
            my_program_locations.push(sData);
        } else {
            my_program_locations[iSearch] = sData;
            obj_MyProgram[iSearch] = o_MyProgram;
        }


        if ($('#TimeTable li').eq(selectedProgramIndex).find('i').length == 0) {
            $('#TimeTable li').eq(selectedProgramIndex).prepend('<i class="icon checked"></i>');
        }

        var hasNext = SetNextProgramIndex();
        if (hasNext) {
            $(this).css("display", "none");
            //$(this).fadeIn(100);
            ShowData();
        } else {
            $(".session").removeClass("program_selected");
            $(this).addClass("program_selected");
            sMSG = '<div style="margin:10px">已經是最後一個議程囉！若您已經完成規劃，<br />'
            sMSG += '請點選 <span style="font-size:20px ;border:1px solid red;"><a href="javascript:SaveMyProgram();">儲存</a></span><br />';
            sMSG += '您也可以利用快速鍵 w、s、a、d 來快速檢視或重新選取您喜歡的議程';
            sMSG += '</div>';

        }

        show_diy_tip(sMSG, false, -1);
    }


    function ShowMyProgramOnTimeline() {
        for (var iProgram in obj_MyProgram) {
            $.each($("#TimeTable li"), function(key, value) {
                if ($(this).attr("data-ts") == obj_MyProgram[iProgram].ts) {
                    if ($(this).find("i").length == 0) {
                        $(this).prepend('<i class="icon checked"></i>');
                    }
                }
            });
        }
    }


    function ShowMyProgramOnMap() {
        for (var iProgram in obj_MyProgram) {
            for (var iRoom in obj_Rooms) {
                var sSelectedTS = $("#SelectedTime").attr("data-ts");
                var sLocation = obj_MyProgram[iProgram].location;
                var v_split = sLocation.split(':');
                var floor = v_split[0];
                if (obj_MyProgram[iProgram].ts == sSelectedTS && obj_Rooms[iRoom].location == sLocation) {
                    $this_walk = $("#F" + selectedFloor + "_walk");
                    if (selectedFloor != floor) {
                        Walk_Hide($this_walk, selectedFloor);
                        trigger_slider_floor(floor);
                    } else {

                    }

                    $this_walk = $("#F" + floor + "_walk");
                    Walk_Show($this_walk, selectedFloor);
                    $this_room = $('div[name="' + obj_Rooms[iRoom].location + '"]');
                    $this_room.addClass("program_selected");

                    if (sPlayLocation == sLocation) {
                        //  Walk_StayAgain($this_walk,$this_room);
                    }

                    Walk_MoveTo($this_walk, $this_room);

                    sPlayLocation = sLocation;
                }
            }
        }
    }

    function Walk_MoveTo(o_Walk, o_Room) {
        var iWidth = eval(o_Room.css("width").replace("px", ""));
        var iHeight = eval(o_Room.css("height").replace("px", ""));
        var iTop = eval(o_Room.css("top").replace("px", ""));
        var iLeft = eval(o_Room.css("left").replace("px", ""));

        var iTop
        o_Walk.animate({
            top: (iTop + 50) + "px",
            left: (iLeft + 60) + "px"
        }, 1000, function() {

        });

    }


    function Walk_StayAgain(o_Walk, o_Room) {
        var sTop = o_Room.css("top");
        var sLeft = o_Room.css("left");
        var iTop = eval(sTop.replace("px", ""));
        var iLeft = eval(sLeft.replace("px", ""));
        for (var i = 0; i <= 2; i++) {
            iLeft += 20;
            o_Walk.animate({
                left: (iLeft) + "px"
            }, 300);
        }
    }

    function Walk_Show(o_Walk, iFloor) {
        o_Walk.fadeIn(500);

    }

    function Walk_Hide(o_Walk, iFloor) {
        o_Walk.fadeOut(500);
        var sLeft = "";
        var sTop = "150px";
        if (iFloor == 1) {
            sLeft = "800px";
        } else if (iFloor == 2) {
            sLeft = "10px";
        }

        o_Walk.animate({
            top: sTop,
            left: sLeft
        });
    }

    function SaveMyProgram() {

        blSelectedProgram = false;
        $("#edit_my_program").html("<span>儲存中...</span>");

        //$(".edit_my_program").html("<span>儲存中...</span>").fadeIn();
        $(".session").removeClass("program_edit");

        var sRandom_id = "";

        $.ajax({
            url: '/api/core/random/',
            type: 'GET',
            error: function(xhr) {
                console.log(xhr);
            },
            success: function(json_data) {
                sRandom_id = json_data.response_data.code;
                POST_TO_MYPROGRAM(sRandom_id);
            }
        });
    }


    function POST_TO_MYPROGRAM(sMember_id) {
        var sActivity_id = $("#activity_id").html();

        var o_UserActivity = new oUserActivity(sActivity_id, my_program_locations);
        var o_UserData = new oUserData(sMember_id, false, o_UserActivity);
        var o_RequestData = new oRequestData(o_UserData);
        var jsonStr = JSON.stringify(o_RequestData);
        $.ajax({
            url: '/api/myprogram/',
            type: 'POST',
            data: {
                data: jsonStr
            },
            error: function(xhr) {
                show_diy_tip('你還沒有點選任何議程哦<br><a href="javascript:;" onClick="re_edit_my_program()">(重新規劃我的趕場地圖)</a>');
                console.log(xhr);
            },
            success: function(response) {
                window.location.href = config_web_url + "/" + sActivity_id + "/set-url?id=" + sMember_id;
            }
        });

    }

    function Get_NickName(sFunction) {
        $.ajax({
            url: '/api/nickname/',
            type: 'GET',
            error: function(xhr) {
                console.log(xhr);
            },
            success: function(json_data) {
                var sNickName = json_data.response_data.nickname;
                if (sNickName == "" || sNickName == null) {} else {
                    hasNickname = true;
                    g_nickname = sNickName;
                    $("#chat_nickname").val("");
                    $("#chat_nickname").val(sNickName);
                }

                if (sFunction != "") {
                    eval(sFunction);
                }
            }
        });
    }


    function SavePersonalNickName() {
        var sUserID = $("#personal_u_id").val();
        var sNickName = $("#personal_nickname").val();
        if (sNickName == "") {
            sNickName = sUserID;
        }
        var sFBID = $("#personal_fb_id").val();
        //console.log(sFBID);
        var o_UserSetting = new oUserSetting(sUserID, sNickName, sFBID);
        var o_RequestData = new oRequestData(o_UserSetting);
        var jsonStr = JSON.stringify(o_RequestData);
        $.ajax({
            url: '/api/users/',
            type: 'POST',
            data: {
                data: jsonStr
            },
            error: function(xhr) {
                show_diy_tip('設定失敗...');
                console.log(xhr);
            },
            success: function(response) {
                var sActivity_id = $("#activity_id").html();
                window.location.href = config_web_url + "/" + sActivity_id + "/" + sUserID;
                // FIXME SECURITY open redirection.
            }
        });

    }


    function GoToPersonalPage(sURL) {
        window.location.href = sURL;
    }

    function FB_SHARE(sNickName) {
        sNickName = $("#my_program_nickname").html();
        FB.ui({
                method: 'feed',
                name: sNickName + '的趕場路線',
                link: location.href,
                caption: '您辦活動的好幫手',
                description: '這是我的活動地圖，你的呢？',
                message: '這是我的活動地圖，你的呢？',
                picture: BASE_URL + '/confmap-logo-fb.png'
            },
            function(response) {
                //console.log(response);
                if (response && response.post_id) {
                    $("#my_msg").html('已經分享至您的塗鴉牆囉！').fadeIn().fadeOut(2000);
                    //alert(response.post_id);
                    //show_diy_tip('<div style="margin:10px">已經分享至您的塗鴉牆囉！</div>',false,2000);
                }
            }
        );
    }

    function get_user_selected_date() {
        //取得user所點選的日期
        return $('#DateTable .cur').html();
    }

    function get_user_selected_floor() {
        //取得user所點選的樓層
        return +$('.slidesjs-pagination').find('a.active').attr('data-slidesjs-item') + 1 + 'F';
    }
