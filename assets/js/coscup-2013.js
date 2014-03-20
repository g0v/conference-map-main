/*
coscup-2013.js 主要用在大會議程頁面
TODO: 確認 coscup-2013.js 只需要用在 大會議程(view/page/program.php)頁面
TODO: 既然有一堆變數都是定義在 bacis.js, 為什麼要分 basic.js 跟 coscup.js?
*/


/*jshint eqeqeq:false */
/*jshint -W020 */
/*jshint unused:false*/

/*globals ShowData*/
/*globals SetPrePassBreak*/


/*globals SetPreProgramIndex_NoBreak */
/*globals SetNextProgramIndex_NoBreak */
/*globals SetNextPassBreak */
/*globals GetTimeRange */
/*globals ShowClick */
/*globals SetSessionPopup */
/*globals ShowProgramByIndex */
/*globals ShowProgramByTimeStamp */
/*globals GetProgramTag */
/*globals ShowProgramByTimeStamp */
/*globals GetProgramContent */
/*globals oSearch */
/*globals ConverToTimestamp*/



/*globals aryTimeTo */
/*globals currTimeFrom*/
/*globals UDateFormat*/
/*globals aryTimeFrom*/
/*globals currTimeTo*/
/*globals selectedProgramIndex*/
/*globals selectedDateIndex*/
/*globals aryDate*/
/*globals currProgramIndex*/
/*globals blMobile*/
/*globals FadeInRooms*/
/*globals arySID*/
/*globals obj_Program*/
/*globals ConverToDate*/
/*globals blPlayMyProgram*/
/*globals blSelectedProgram*/
/*globals LengthMax*/
/*globals get_user_selected_date*/
/*globals iPlayTime*/
/*globals ShowMyProgramOnMap*/
/*global ShowMyProgramOnTimeline*/
/*globals blShowRoomSession*/
/*globals preDateIndex*/
/*globals preProgramIndex*/
/*globals get_user_selected_floor*/
/*globals sRoomName*/
/*globals aryRoom*/

/*
    UDateFormat,ConverToTimestamp,LengthMax     定義在 utility.js
    aryTimeTo, currTimeFrom, aryTimeFrom,currTimeTo,selectedProgramIndex,selectedDateIndex, aryDate, currProgramIndex, FadeInRooms,arySID, obj_Program ,ConverToDate, blPlayMyProgram,blSelectedProgram, get_user_selected_date, iPlayTime, ShowMyProgramOnMap, ShowMyProgramOnTimeline,preDateIndex,preProgramIndex,get_user_selected_floor,sRoomName,aryRoom      定義在 basic.js
    blMobile,blShowRoomSession    定義在幾乎所有的 .php
 */


function SetCurrentProgramIndex() {
    /*
    取得現在時間在 Porgram 的 Index (目前所選取的 coscup 時段 index)
    比方說
    08:15~09:00 是 0
    09:00~09:10 是 1
    09:10~09:40 是 2

    呼叫時機 : 大會議程(/program)頁面
    基本上只會呼叫一次，一呼叫就是取得 8/3 or 8/4 你當下的時間對應到的議程時間
    */
    currTimeFrom = aryTimeFrom[0];
    currTimeTo = aryTimeTo[0];

    var currDate = new Date();
    //'currStamp' is defined but never used
    //var currStamp = ConverToTimestamp(currDate);
    var currTime = UDateFormat(currDate, "HM");
    var sFirstTime = UDateFormat(currTimeFrom[0], "HM");
    var sLastTime = UDateFormat(currTimeTo[currTimeFrom.length - 1], "HM");

    if (currTime < sFirstTime) {
        currProgramIndex = 0;
    } else if (currTime > sLastTime) {
        currProgramIndex = 0; //currTimeFrom.length - 1;
    } else {
        for (var i = 0; i < currTimeFrom.length; i = i + 1) {
            var sFrom = UDateFormat(currTimeFrom[i], "HM");
            var sTo = UDateFormat(currTimeTo[i], "HM");

            if (sFrom <= currTime && currTime < sTo) {
                currProgramIndex = i;
                break;
            }
        }
    }
    selectedProgramIndex = currProgramIndex;
}

function ShowSelectedDate(iIndex) {
    //會被 ShowSelectedDateByDate 內部呼叫
    $("#DateTable li").removeClass("cur");
    var $this = $("#DateTable li:eq(" + iIndex + ")");
    $this.addClass("cur");
}

function ShowSelectedDateByDate(sDate) {
    $("#DateTable li").removeClass("cur");
    $("#DateTable li").each(function(i, item) {
        if ($(this).attr("data-date") == sDate) {
            selectedDateIndex = i;
            ShowSelectedDate(selectedDateIndex);
        }
    });
}


function SetPreProgramIndex() {
    var hasData = false;
    hasData = SetPreProgramIndex_NoBreak();
    /*
      if(selectedProgramIndex > 0){
      selectedProgramIndex -= 1;
      hasData = true;
      }else{
      if(selectedDateIndex > 0){
      selectedDateIndex -=1;
      selectedProgramIndex = aryTimeFrom[selectedDateIndex].length -1;
      hasData = true;
      }
      }
    */
    return hasData;
}


function SetNextProgramIndex() {

    var hasData = false;
    hasData = SetNextProgramIndex_NoBreak();
    /*
      if(aryTimeFrom[selectedDateIndex].length -1 > selectedProgramIndex){
      selectedProgramIndex += 1;
      hasData = true;
      }else{
      if(aryDate.length -1 > selectedDateIndex){
      selectedDateIndex +=1;
      selectedProgramIndex = 0;
      hasData = true;
      }
      }
    */
    return hasData;
}


function SetPreProgramIndex_NoBreak() {
    var hasData = false;
    if (selectedProgramIndex > 0) {
        selectedProgramIndex -= 1;
        hasData = SetPrePassBreak();
    } else {
        if (selectedDateIndex > 0) {
            selectedDateIndex -= 1;
            selectedProgramIndex = aryTimeFrom[selectedDateIndex].length - 1;
            hasData = SetPrePassBreak();
        }
    }
    return hasData;
}


function SetNextProgramIndex_NoBreak() {
    var hasData = false;
    if (aryTimeFrom[selectedDateIndex].length - 1 > selectedProgramIndex) {
        selectedProgramIndex += 1;
        hasData = SetNextPassBreak();
    } else {
        if (aryDate.length - 1 > selectedDateIndex) {
            selectedDateIndex += 1;
            selectedProgramIndex = 0;
            hasData = SetNextPassBreak();
        }
    }
    return hasData;
}


function SetNextPassBreak() {
    var hasData = false;
    var orgProgramIndex = selectedProgramIndex;
    for (var iIndex = selectedProgramIndex; iIndex < aryTimeFrom[selectedDateIndex].length; iIndex += 1) {
        var targetTimestamp = aryTimeFrom[selectedDateIndex][selectedProgramIndex];
        var sPID = targetTimestamp + ":0";
        var iSearch = arySID.indexOf(sPID);
        if (iSearch >= 0) {
            var oSearch = obj_Program[iSearch];
            if (oSearch.isBreak === true) {} else {
                hasData = true;
                break;
            }
        } else {
            hasData = true;
            break;
        }
        selectedProgramIndex += 1;

        if (selectedProgramIndex >= aryTimeFrom[selectedDateIndex].length) {
            if (aryDate.length - 1 > selectedDateIndex) {
                selectedDateIndex += 1;
                selectedProgramIndex = 0;
            } else {
                selectedProgramIndex = orgProgramIndex - 1;
            }
            iIndex = selectedProgramIndex;
        }
    }
    return hasData;
}





function SetPrePassBreak() {
    var hasData = false;
    var orgProgramIndex = selectedProgramIndex;

    for (var iIndex = selectedProgramIndex; iIndex >= 0; iIndex -= 1) {
        var targetTimestamp = aryTimeFrom[selectedDateIndex][selectedProgramIndex];
        var sPID = targetTimestamp + ":0";
        var iSearch = arySID.indexOf(sPID);
        if (iSearch >= 0) {
            var oSearch = obj_Program[iSearch];
            if (oSearch.isBreak === true) {} else {
                hasData = true;
                break;
            }
        } else {
            hasData = true;
            break;
        }
        selectedProgramIndex -= 1;
        if (selectedProgramIndex < 0) {
            if (selectedDateIndex > 0) {
                selectedDateIndex -= 1;
                selectedProgramIndex = aryTimeFrom[selectedDateIndex].length - 1;
            } else {
                selectedProgramIndex = orgProgramIndex + 1;
            }
            iIndex = selectedProgramIndex;
        }
    }
    return hasData;
}



//顯示上一個時段議程(按下鍵盤W所執行的)
function ShowPreProgram() {
    //更新下一次的上一個時段應該是多少
    var hasData = SetPreProgramIndex();
    if (hasData) {
        ShowData();
        $('#linkGoPreProgram').fadeOut(10);
        $('#linkGoPreProgram').fadeIn(10);
    }
}


//顯示下一個時段議程(按下鍵盤W所執行的)
function ShowNextProgram() {
    //更新下一次的下一個時段應該是多少
    var hasNext = SetNextProgramIndex();

    if (hasNext) {
        ShowData();
        $('#linkGoNextProgram').fadeOut(10);
        $('#linkGoNextProgram').fadeIn(10);
    } else {
        $("#play_my_program").html("重新播放");
        blPlayMyProgram = false;
        window.clearInterval(iPlayTime);
        iPlayTime = 0;
    }
}




function ShowSelectedTime(iIndex) {
    $("#TimeTable li").removeClass("timeline_selected");
    $("#TimeTable li:eq(" + iIndex + ")").addClass("timeline_selected");
    $("#SelectedTime").html(GetTimeRange(iIndex)); //-->only for mobile
    $('#map_info .time').html(GetTimeRange(iIndex));
    $('#map_info .date').html(get_user_selected_date());
    $('#map_info .floor').html(get_user_selected_floor());
    $("#SelectedTime").attr("data-ts", aryTimeFrom[selectedDateIndex][iIndex]);
}

function GetTimeRange(iIndex) {
    /*jshint unused:false*/
    var sFrom = UDateFormat(currTimeFrom[selectedProgramIndex], "HM");
    var sTo = UDateFormat(currTimeTo[selectedProgramIndex], "HM");
    return sFrom + "~" + sTo;
}



function ShowDateTable(aDate) {
    $('#DateTable').html("");

    var sClass = "";
    for (var i = 0; i < aDate.length; i = i + 1) {
        var sDate = UDateFormat(aDate[i], "md");
        var sYMD = UDateFormat(aDate[i], "ymd");
        var sItem = "<li data-date='" + sYMD + "' " + sClass + " >" + sDate + "</li> ";
        $('#DateTable').append(sItem);
    }

}

function ShowTimeTable(index) {
    var aTimeFrom = aryTimeFrom[index];
    var aTimeTo = aryTimeTo[index];
    currTimeFrom = aTimeFrom;
    currTimeTo = aTimeTo;


    $('#TimeTable').html("");
    for (var i = 0; i < aTimeFrom.length; i = i + 1) {
        var sTimeRange = UDateFormat(aTimeFrom[i], "HM") + "~" + UDateFormat(aTimeTo[i], "HM");
        var targetTimestamp = aTimeFrom[i];
        var sIcon = "";
        var sPID = targetTimestamp + ":0";
        var iSearch = arySID.indexOf(sPID);
        if (iSearch >= 0) {
            var oSearch = obj_Program[iSearch];
            if (oSearch.isBreak === true) {
                sIcon = '<i class="icon break"></i>';
            }
        }

        var sTimeItem = '<li data-ts="' + aTimeFrom[i] + '">' + sIcon + sTimeRange + '</li>';

        $('#TimeTable').append(sTimeItem);
    }
}




function SetPreDateIndex() {
    if (selectedDateIndex > 0) {
        selectedDateIndex -= 1;
        if (aryTimeFrom[selectedDateIndex].length <= selectedProgramIndex) {
            selectedProgramIndex = aryTimeFrom[selectedDateIndex].length - 1;
        }
    }
}

function SetNextDateIndex() {
    if (selectedDateIndex < aryDate.length - 1) {
        selectedDateIndex += 1;

        if (aryTimeFrom[selectedDateIndex].length <= selectedProgramIndex) {
            selectedProgramIndex = aryTimeFrom[selectedDateIndex].length - 1;
        }

    }
}

function ShowPreDate() {
    SetPreDateIndex();
    var $this = $("#DateTable li:eq(" + selectedDateIndex + ")");
    ShowClick($this);
    ShowData();
}


function ShowClick(o_Object) {
    o_Object.fadeOut(50, function() {
        o_Object.fadeIn(50, function() {});
    });

}



function ShowNextDate() {
    SetNextDateIndex();
    var $this = $("#DateTable li:eq(" + selectedDateIndex + ")");
    ShowClick($this);
    ShowData();
}


//在/COSCUP_2013/XXXXXX 播放個人影片時需要用到....
function ShowData() {
    // FIXME workaround
    if (selectedDateIndex === undefined) {
        selectedDateIndex = 1;
    }
    if (selectedDateIndex != preDateIndex) {
        ShowSelectedDate(selectedDateIndex);
        ShowTimeTable(selectedDateIndex);
    }

    if (selectedDateIndex != preDateIndex || selectedProgramIndex != preProgramIndex) {
        ShowSelectedTime(selectedProgramIndex);
        ShowProgramByIndex(selectedProgramIndex);
    }

    preDateIndex = selectedDateIndex;
    preProgramIndex = selectedProgramIndex;

    if (blSelectedProgram === true || blPlayMyProgram === true) {
        $(".session").removeClass("hand");
    } else {
        if (blMobile === false && blShowRoomSession === true) {
            $('.session').bind('click', function(e) {
                var room_index = $(this).attr("data-id");
                SetSessionPopup(room_index);
            });
            $(".session").addClass("hand");
        }
    }

    if (blSelectedProgram === true) {
        //    ShowMyProgramOnTimeline();
        ShowMyProgramOnMap();
    }
    if (blPlayMyProgram === true) {
        ShowMyProgramOnTimeline();
        ShowMyProgramOnMap();
    }
}



function SetSessionPopup(room_index) {
    if (blSelectedProgram === false && blPlayMyProgram === false) {
        //e.preventDefault();
        $('#Room_' + room_index + '_info').bPopup();
    }
}


function ShowProgramByTime(sTime) {
    var targetTimestamp = ConverToTimestamp(sTime);
    ShowProgramByTimeStamp(targetTimestamp);
}

function ShowProgramByIndex(iIndex) {
    var targetTimestamp = currTimeFrom[iIndex];
    ShowProgramByTimeStamp(targetTimestamp);
}




function ShowProgramByTimeStamp(sTimestamp) {
    $("#program_info").empty();
    var iIndex = currTimeFrom.indexOf(sTimestamp);

    var blSelected = false;
    selectedProgramIndex = iIndex;
    var targetTimestamp = sTimestamp;
    var sTime = UDateFormat(ConverToDate(targetTimestamp), "HM");
    var sTimeRange = GetTimeRange(iIndex);


    var blRoom0 = false;
    FadeInRooms();
    var sTitle = "";
    var sSessionBox = "";
    var sSessionBox_show = '';

    var sTag = "";
    var sSession = "";

    //var oSearch;
    for (var i = 0; i <= 9; i = i + 1) {
        $("#Room_" + i).removeClass("program_selected");
        var sPID = targetTimestamp + ":" + i;
        var iSearch = arySID.indexOf(sPID);
        if (iSearch >= 0) {
            oSearch = obj_Program[iSearch];
            sRoomName = aryRoom[i] + "會議室";
            sTag = "";

            sTag += "<span class='room_name room_tag'>" + sRoomName + "</span>";
            sTag += GetProgramTag(oSearch);


            sTitle = "";
            //if(i != 0){sRoomName += "會議室";}
            //sRoomName += "會議室";

            sTitle += "<h5 class='colorTag-" + oSearch.type + "'>";
            sTitle += oSearch.name;
            sTitle += "</h5>";


            sSession = "";



            sSession += sTag;
            sSession += sTitle;
            sSession += GetProgramContent(oSearch);


            sSessionBox = "";
            sSessionBox += '<span class="room_time room_tag">' + sTimeRange + '</span>';
            sSessionBox += sTag;
            sSessionBox += sTitle;

            sSessionBox += "<h6>內容簡介</h6>" + oSearch.abstract;
            sSessionBox += "<h6>講者簡介</h6>" + oSearch.bio;

            $('#Room_' + i + '_info').remove();
            sSessionBox_show = '<div class="session_info" " id="Room_' + i + '_info">' + sSessionBox + '</div>';
            $("#program_info").prepend(sSessionBox_show);

            $("#Room_" + i).html(sSession);


            if (i === 0) { //全場聯播
                blRoom0 = true;
                $("#Room_" + i).removeClass("program_selected");
                $("#Room_0").hide();
                $("#Room_9").hide();
                $("#Room_1").show();
                $("#Room_2").show();
                break;
            } else if (i == 9) { //101AB+101CD
                $("#Room_1").hide();
                $("#Room_2").hide();
                $("#Room_0").hide();
                $("#Room_9").show();
            } else if (i == 1 || i == 2) {
                $("#Room_0").hide();
                $("#Room_9").hide();

                $("#Room_1").show();
                $("#Room_2").show();
            }
        } else {
            //var sSession_input_radio='';
            $("#Room_" + i).html("");
        }


    }
    if (blRoom0 === true) {
        for (var v = 1; v <= 9; v++) {
            $("#Room_" + v).removeClass("program_selected");
            sRoomName = aryRoom[v] + "會議室";
            sTag = "";
            sTag += "<span class='room_name room_tag'>" + sRoomName + "</span>";
            sTag += GetProgramTag(oSearch);

            sSession = "";

            sSession += sTag;
            sSession += sTitle;
            sSession += GetProgramContent(oSearch);

            $('#Room_' + v + '_info').remove();
            sSessionBox_show = '<div class="session_info" " id="Room_' + v + '_info">' + sSessionBox + '</div>';
            $("#program_info").prepend(sSessionBox_show);

            $("#Room_" + v).html(sSession);
        }
    }

}


function GetProgramTag(oSearch) {
    var sSession = "";

    if (oSearch.speaker !== "") {
        sSession += '<span class="room_speaker room_tag">' + oSearch.speaker + '</span>';
    }
    if (oSearch.room === 0 && oSearch.isBreak === false) {
        sSession += "<span class='program_multislot notice'><i class=''>!</i>全場聯播</span>";
    }
    if (oSearch.lang !== "" && oSearch.lang !== "zh") {
        sSession += "<span class='program_lang'>Lang: <i class='lang en'>" + oSearch.lang + "</i></span>";
    }

    if (oSearch.isMultiSlot === true) {
        sSession += "<span class='program_multislot notice'><i class=''>!</i>跨時段議程</span>";
    }
    return sSession;
}



function GetProgramContent(oSearch) {
    var sSession = "";
    sSession += "<div>";

    if (oSearch.room === 0) {
        if (oSearch.isBreak === true) {
            if (oSearch.name == "break") {
                sSession += "<span class='program_break'>休息一下</span>";
            } else if (oSearch.name == "午餐 / lunch\n") {
                sSession += "<span class='program_break'>肚子餓了...</span>";
            }
        }
    }
    sSession += "<span class='program_desc'>" + LengthMax(oSearch.abstract) + "</span>";

    sSession += "</div>";

    return sSession;
}
