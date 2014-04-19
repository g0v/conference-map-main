function ConverToDate(sTimestamp) {
    var date = new Date();
    if (("" + sTimestamp).length <= 10) {
        date = new Date(sTimestamp * 1000);
    } else {
        date = new Date(sTimestamp);
    }

    var sYear = date.getYear() + 1900;
    var sMonth = date.getMonth() + 1;
    var sDate = date.getDate();
    var sTime = sYear + "/" + sMonth + "/" + sDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return sTime;
}

function ConverToTimestamp(sTime) {

    var targetTime;
    if (typeof sTime == "string") {
        targetTime = new Date(sTime);
    } else if (typeof sTime == "number") {
        targetTime = ConverToDate(sTime);
    } else {
        targetTime = sTime;
    }

    var targetTimestamp = targetTime.getTime() / 1000;
    targetTimestamp = Math.floor(targetTimestamp);
    return targetTimestamp;
}

function oProgram(sId, sPID, sName, sFrom, sTo, sRoom, sType, sCommunity, sSpeaker, sSpeakerTitle, sBio, sAbstract, sLang, sIsBreak, sIsMultiSlot) {
    this.id = initProperty(sId);
    this.PID = sPID;
    this.name = initProperty(sName);
    this.from = initProperty(sFrom);
    this.to = initProperty(sTo);
    this.room = initProperty(sRoom);
    this.type = initProperty(sType);
    this.community = initProperty(sCommunity);
    this.speaker = initProperty(sSpeaker);
    this.speakerTitle = initProperty(sSpeakerTitle);
    this.bio = initProperty(sBio);
    this.abstract = initProperty(sAbstract);
    this.lang = initProperty(sLang);
    this.isBreak = initProperty(sIsBreak);
    this.isMultiSlot = initProperty(sIsMultiSlot);

};



function initProperty(sProperty) {
    sProperty = typeof sProperty == "undefined" ? "" : sProperty;
    return sProperty;
}


function oRequestData(o_RequestData) {
    this.request_data = o_RequestData
}

function oUserData(sMID, blReg, o_UserActivity) {
    this.user_id = sMID;
    this.is_registered = blReg;
    this.user_activities = o_UserActivity;
}

function oUserActivity(sActivityID, oLocations) {
    this.activity_id = sActivityID;
    this.locations = oLocations;

}


function oUserSetting(sMID, sNickName, sFB_ID) {
    this.user_id = sMID;
    this.nickname = sNickName;
    this.facebook_id = sFB_ID;
}


function oMyProgram(sTS, sLocation, sRoomIndex) {
    this.ts = sTS;
    this.location = sLocation;
    this.roomindex = sRoomIndex;
}


function sortByTS(a, b) {
    //return 1, if you want b to come first
    //return -1, if you want a to come first
    //return 0, if both objects are the same

    if (a.ts > b.ts) {
        return 1;
    } else if (a.ts < b.ts) {
        return -1;
    } else {
        return 0;
    }

}

//Client Room
function oRoom(sLocation, sWidth, sHeight, sType, sName, sRoomIndex) {
    var aryTemp = sLocation.split(':');
    this.location = sLocation;
    this.width = sWidth;
    this.height = sHeight;
    this.type = sType;
    this.name = sName;
    this.roomindex = sRoomIndex;
    this.floor = aryTemp[0];
    this.x = aryTemp[1];
    this.y = aryTemp[2];
    this.z = aryTemp[3];
    if (sRoomIndex == "0") {
        this.name = "全場地聯播";
    } else {
        //this.name += "會議室";
    }

}


//Client RoomUnit
function oRoomUnit(sLocation) {
    var aryTemp = sLocation.split(':');
    this.floor = aryTemp[0];
    this.x = aryTemp[1];
    this.y = aryTemp[2];
    this.z = aryTemp[3];
    this.location = sLocation;
}


function LengthMax(sText) {
    if (sText.length > iMaxDesc) {
        sText = sText.substr(0, iMaxDesc - 1) + "...";
    }
    return sText;
}

function UDateFormat(dDate, sArgument) {
    if (typeof dDate == "string") {
        oDate = new Date(dDate)
    } else if (typeof dDate == "number") {
        oDate = new Date(ConverToDate(dDate));
    } else {
        oDate = new Date(dDate)
    }

    var sYear = oDate.getYear() + 1900;
    var sMonth = oDate.getMonth() + 1;
    var sDate = oDate.getDate();
    var sReturn = "";
    if (sArgument.indexOf("y") >= 0) {
        sReturn += " " + PadLeft(sYear, "0", 4);
    }

    if (sArgument.indexOf("m") >= 0) {
        sReturn += "/" + PadLeft(sMonth, "0", 2);
    }

    if (sArgument.indexOf("d") >= 0) {
        sReturn += "/" + PadLeft(sDate, "0", 2);
    }

    if (sArgument.indexOf("H") >= 0) {
        sReturn += " " + PadLeft(oDate.getHours(), "0", 2);
    }

    if (sArgument.indexOf("M") >= 0) {
        sReturn += ":" + PadLeft(oDate.getMinutes(), "0", 2);
    }

    if (sArgument.indexOf("s") >= 0) {
        sReturn += ":" + PadLeft(oDate.getSeconds(), "0", 2);
    }

    sReturn = sReturn.substr(1, sReturn.length - 1);

    return sReturn;
}


function PadLeft(sTarget, cChar, iLength) {
    sTarget = "" + sTarget;

    if (sTarget.length < iLength) {
        var iDiff = iLength - sTarget.length;
        for (var i = 0; i < iDiff; i++) {
            sTarget = cChar + sTarget;
        }

    }

    return sTarget;
}


function GetRoomIndex(sName) {
    var iIndex = 0;
    if (sName == 'all') {
        iIndex = 0;
    } else if (sName == '101AB') {
        iIndex = 1;
    } else if (sName == '101CD') {
        iIndex = 2;
    } else if (sName == '102') {
        iIndex = 3;
    } else if (sName == '103') {
        iIndex = 4;
    } else if (sName == '201AB') {
        iIndex = 5;
    } else if (sName == '201EF') {
        iIndex = 6;
    } else if (sName == '201C') {
        iIndex = 7;
    } else if (sName == '201D') {
        iIndex = 8;
    } else if (sName == '101AB+CD') {
        iIndex = 9;
    } else {
        iIndex = 0;
    }
    return iIndex;
}
