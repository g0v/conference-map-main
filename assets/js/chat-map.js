/*jshint unused:false*/
/*jshint -W068*/
/*globals oRoomUnit */
/*globals socket */
/*globals get_fb_picture*/
/*globals UDateFormat*/
/*globals oRequestData*/

/*
    原始檔名為 chat_coscup.js，做用到的頁面是 /COSCUP_2013 (聊天地圖頁籤頁)
    oRoomUnit       定義在 utility.js
    UDateFormat     定義在 utility.js
    oRequestData    定義在 utility.js
    socket          定義在 view/page/chat-map.php
    get_fb_picture  定義在 facebook.js

*/


//var chatMap = (function() {
//fix Wrapping non-IIFE function literals in parens is unnecessary
var chatMap = (function() {

    var windowWidth = window.innerWidth;

    /*jslint evil: true*/
    var controller = {

        switchRoom: function(room) {
            view.user_messages.empty();
            $('#popup_tooltip .command_msg').empty().text(model.command_msg_str);
            if (room === 'Room_0' || room === 'Room_1' || room === 'Room_2' || room === 'Room_3' || room === 'Room_4' || room === 'Room_5' || room === 'Room_6' || room === 'Room_7' || room === 'Room_8' || room === 'Room_9') {
                var $e = $('#' + room),
                    location_ary = $e.attr('data-location').split(":"),
                    f = location_ary[0],
                    x = location_ary[1],
                    y = location_ary[2],
                    z = 1 || location_ary[3];
                $('.y.' + y + ' .x.' + x).eq(f - 1).trigger('click');
                //如果是點會議室
                socket.emit('switchRoom', f + ':' + x + ':' + y + ':' + z);
            } else {
                socket.emit('switchRoom', room);
            }
        },
        sendMessage: function() {
            var loc_f = view.popup_tooltip.attr('loc_f'),
                loc_y = view.popup_tooltip.attr('loc_y'),
                loc_x = view.popup_tooltip.attr('loc_x'),
                nickname = view.chat_nickname.val(),
                message = view.user_msg_input.val(),
                my_fb_id = view.personal_fb_id.val();
            /*function forMessageTrimSetTimeout(){
                $('#user_msg_input').attr('placeholder','現在這裡發生了什麼事呢？').removeClass('warning_style');
            }*/
            /*jslint browser: true, devel: true*/
            if (message.trim() === "") {
                view.user_msg_input.attr('placeholder', '請留言').addClass('warning_style');
                setTimeout("$('#user_msg_input').attr('placeholder','現在這裡發生了什麼事呢？').removeClass('warning_style')", 2000);
                return false;
            } else if (nickname.trim() === "") {
                view.chat_nickname.attr('placeholder', '請輸入暱稱').addClass('warning_style');
                setTimeout(" $('#chat_nickname').attr('placeholder','暱稱').removeClass('warning_style')", 2000);
                return false;
            }

            var current_room = loc_f + ':' + loc_x + ':' + loc_y + ':' + '0'; //format: f:x:y:z

            // FIXME SECURITY XSS filter for nickname and message
            view.user_msg_input.val('');

            //加入讓li自動卷到最下方的function
            view.set_dom_scroll_to_bottom();

            var data_obj = {
                nickname: nickname,
                message: message,
                room: current_room,
                facebook_id: my_fb_id
            };

            var command_status = controller.checkCommandMsg(message);

            if (command_status === 'topic') {
                socket.emit('command_msg', data_obj);
            } else if (command_status === true) {
                view.user_msg_input.attr('placeholder', 'Oops...我們發現你好像沒有輸入正確 ex: /topic 發生的事').addClass('warning_style');
                setTimeout(" $('#user_msg_input').attr('placeholder','輸入留言，按 Enter 送出。').removeClass('warning_style')", 1000);
            } else {
                //因為user送出自己的留言 自己卻看不到 要從這裡加
                var date = new Date().getTime();
                var img_src = get_fb_picture(my_fb_id);
                view.user_messages.append('<li class="clearfix"><img src="' + img_src + '"/><p class="content_txt"><span class="name">' + view.htmlDecode(data_obj.nickname) + '@' + UDateFormat(date, "HMs") + ' <span style="color:red">say:</span></span> ' + view.htmlDecode(data_obj.message) + '</p></li>');
                socket.emit('add_data', data_obj);
                var s_temp_nickname = view.chat_nickname.val();
                if (model.hasNickname === false || model.g_nickname != s_temp_nickname) {
                    model.g_nickname = s_temp_nickname;
                    controller.POST_NickName(s_temp_nickname);
                    model.hasNickname = true;
                }
            }
        },


        //check_command_msg
        checkCommandMsg: function(message) {
            /**
             * true: it is a command message, but unknown
             * false: not a command message
             * 'topic': a topic command message
             */
            if (message.charAt(0) == '/') {
                if (message.match(/\/topic .*/i)) {
                    return 'topic';
                }
                return true;
            } else {
                return false;
            }
            return false;
        },

        showNewMessage: function(o_RoomUnit, iCount, iTS) {
            /*jshint unused:false*/
            var $room = $(".session[name='" + o_RoomUnit.location + "']");
            var $this_room;
            if ($room.length > 0) {
                //會議室
                $this_room = $room.find(".room_name");
                $this_room.fadeIn().addClass("new_talk");
            } else {
                //地圖上的x,y
                var iFloor = o_RoomUnit.floor;
                $this_room = $('#F' + iFloor + ' .y.' + o_RoomUnit.y + ' .x.' + o_RoomUnit.x);
                $this_room.fadeIn().addClass("new_talk");

            }
        },

        showOldMessage: function(o_RoomUnit, iCount, iTS) {
            /*jshint unused:false*/
            var $room = $(".session[name='" + o_RoomUnit.location + "']");
            var $this_room;
            if ($room.length > 0) {
                //會議室
                $this_room = $room.find(".room_name");
                if ($this_room.hasClass("new_talk")) {
                    $this_room.fadeIn().removeClass("new_talk");
                }
            } else {
                //地圖上的x,y
                var iFloor = o_RoomUnit.floor;
                $this_room = $('#F' + iFloor + ' .y.' + o_RoomUnit.y + ' .x.' + o_RoomUnit.x);
                if ($this_room.hasClass("new_talk")) {
                    //var $icons = $this_room.find("i");
                    //$this_room.html($icons).fadeIn().removeClass("new_talk");
                    $this_room.fadeIn().removeClass("new_talk");
                }
            }
        },
        POST_NickName: function(sNickName) {
            /*
                var o_UserData = new Object();
                fix for jshint:  The object literal notation {} is preferable.
            */
            var o_UserData = {};
            o_UserData.nickname = sNickName;
            var o_RequestData = new oRequestData(o_UserData);
            var jsonStr = JSON.stringify(o_RequestData);
            $.ajax({
                url: '/api/nickname/',
                type: 'POST',
                data: {
                    data: jsonStr
                },
                error: function(xhr) {
                    console.log(xhr);
                },
                success: function(response) {
                    console.log(response);
                }
            });
        }
    };

    var view = {

        //跳出來的對話框
        popup_tooltip: $('#popup_tooltip'),
        //所有對話的集合(ul)
        user_messages: $('#users_message'),
        user_message_item: $('#users_message li'),
        //送出按鈕
        datasend_btn: $('#datasend'),
        //留言對畫框
        user_msg_input: $('#user_msg_input'),
        chat_nickname: $('#chat_nickname'),
        personal_fb_id: $('#personal_fb_id'),

        htmlDecode: function(value) {
            return $('<div/>').html(value).text();
        },
        users_message_append_string_generator: function(data_obj) {
            //data_obj MUST have nickname, message, room
            var date = new Date().getTime();
            var img_src = get_fb_picture(data_obj.facebook_id);
            var $this = '<li class="clearfix"><img src="' + img_src + '"/>' +
                '<p class="content_txt"><span class="name">' +
                data_obj.nickname + '@' + UDateFormat(date, "HMs") +
                ' <span style="color:red">say:</span></span> ' +
                data_obj.message + '</p></li>';
            return $this;
        },

        set_dom_scroll_to_bottom: function() {
            /*
             * set_dom_scroll_to_bottom:每當新增一筆留言,要偵測li的總高,動態一到下方最新一筆
             * scroll_dom 要捲動高度的dom
             * counted_dom 要計算的對象
             */
            var total_height = 0;
            $('#users_message li').each(function() {
                total_height = total_height + parseInt($(this).height());
            });
            $('#users_message').scrollTop(total_height);
        }

    };

    var model = {
        objSawRoom: [],
        arySawRoom: [],
        hasNickname: false,
        g_nickname: "",
        command_msg_str: '欲更改主題，請輸入 /topic 新主題',
        user_msg_input_str: '現在這裡發生了什麼事呢？',

        get_rooms_info: function(rooms_id, f_or_x_or_y_or_z) {

            var room = rooms_id,
                target_value = f_or_x_or_y_or_z,
                location_ary = rooms_id.split(":"),
                f = location_ary[0],
                x = location_ary[1],
                y = location_ary[2],
                z = 1 || location_ary[3];

            if (target_value == 'f') {
                return f;
            } else if (target_value == 'x') {
                return x;
            } else if (target_value == 'y') {
                return y;
            } else if (target_value == 'z') {
                return z;
            } else {
                return 'error,你沒丟第二參數';
            }
        }
    };


    function bindEvents() {
        /*
         listener, whenever the server emits 'updatechat', this updates the chat body
         當server發出updatechat就會觸發產生li等相關
         */
        socket.on('updatechat', function(data_obj) {
            view.user_messages.append(view.users_message_append_string_generator(data_obj));
            view.set_dom_scroll_to_bottom();
        });

        // when the client clicks SEND
        view.datasend_btn.click(function() {
            controller.sendMessage();
            view.set_dom_scroll_to_bottom();
        });

        view.user_msg_input.keypress(function(e) {
            if (e.which == 13) {
                controller.sendMessage();
                view.set_dom_scroll_to_bottom();
            }
        });

        // when the client hits ENTER on their keyboard
        view.chat_nickname.keypress(function(e) {
            if (e.which == 13) {
                $(this).blur();
                controller.sendMessage();
                //$('#datasend').focus().click();
                view.set_dom_scroll_to_bottom();
            }
        });

        socket.on('updatehistory', function(rooms, chat_history_obj) {
            view.user_messages.empty();

            var iTS = new Date().getTime();
            var iSearch = model.arySawRoom.indexOf(rooms);
            if (iSearch < 0) {
                model.arySawRoom.push(rooms);
                model.objSawRoom.push(new Array(iTS, rooms));
            } else {
                model.arySawRoom[iSearch] = rooms;
                model.objSawRoom[iSearch] = new Array(iTS, rooms);
            }
            //console.log('這是從chat-map.js所發出來的訊息 之 要抓的資料是哪一間會議室?' + rooms);

            $.each(chat_history_obj, function(key, value) {
                //fix: json_obj' is not defined
                var json_obj = JSON.parse(value);
                //nickname 暱稱
                //message  訊息

                var u_fb_id = json_obj.facebook_id;
                var img_src = get_fb_picture(u_fb_id);
                // FIXME parse ts to readable date string

                view.user_messages.append('<li class="clearfix"><img src="' + img_src + '"/><p class="content_txt"><span class="name">' + json_obj.nickname + '@' + UDateFormat(json_obj.ts, "HMs") + ' <span style="color:red">say:</span></span> ' + json_obj.message + '</p></li>');
            });

            //點過之後，要把這個地方設定為已閱讀
            var o_RoomUnit = new oRoomUnit(rooms);
            controller.showOldMessage(o_RoomUnit, 0, 0);
            //view.set_dom_scroll_to_bottom(view.user_messages, view.user_message_item);
            //view.set_dom_scroll_to_bottom($('#users_message'), $('#users_message li'));
            view.set_dom_scroll_to_bottom();

        });

        socket.on('command_msg', function(data_obj) {
            /*
            var room = data_obj.room;
            var message = data_obj.message;
            var ts = data_obj.ts;
            var nickname = data_obj.nickname;
            */
            var show_str = data_obj.message.replace('/topic', '').trim(); //把/topic裁掉
            view.popup_tooltip.find('.command_msg').text(show_str);
        });

        socket.on('status_update', function(StatusObj) {

            // TODO check not NULL / not empty / not array
            $.each(StatusObj, function(key, st) {
                // Timestamp (microsecond)
                //console.log('ts=' + st.ts +' room=' + st.room);
                // How many new messages in this interval.
                //console.log('count=' + st.count);
                // TODO Implement ME

                var o_RoomUnit = new oRoomUnit(st.room);
                //搜尋看這個地點有沒有看過
                var iSearch = model.arySawRoom.indexOf(st.room);
                if (iSearch < 0) {
                    //沒找到，代表沒看過
                    controller.showNewMessage(o_RoomUnit, st.count, st.ts);

                } else {
                    //有找到，代表看過，要在去檢查看過的時間跟訊息的時間
                    var oSaw = model.objSawRoom[iSearch];
                    var sTS = oSaw[0];
                    //var sRoom = oSaw[1];
                    if (st.ts >= sTS) {
                        controller.showNewMessage(o_RoomUnit, st.count, st.ts);
                    } else {
                        //舊訊息
                        controller.showOldMessage(o_RoomUnit, st.count, st.ts);
                    }
                }

            });
        });
        /*
        socket.on('connect', function () {
            //console.log('socket.on connect');
        });

        socket.on('connecting', function () {
            //console.log('socket.on connecting');
        });

        socket.on('disconnect', function () {
            //console.log('socket.on disconnect');
        });

        socket.on('connect_failed', function () {
            //console.log('socket.on connect_failed');
        });

        socket.on('error', function () {
            //console.log('socket.on error');
        });

        socket.on('reconnect_failed', function () {
            //console.log('socket.on reconnect_failed');
        });

        socket.on('reconnect', function () {
            //console.log('socket.on reconnect');
        });

        socket.on('reconnecting', function () {
            //console.log('socket.on reconnecting');
        });
        */
    }

    return {
        initialize: function() {
            bindEvents();

            function show_popup_tooltip_on_map() {
                var show_popup_tooltip = false,
                    map_x_and_y = $('#map .x').width(),
                    toggle_all_wrap_bg_switch = $('#all_wrap_bg'),
                    each_animation_map_box_w = $('#map .x').width(),
                    $animation_map_box = $('#animation_map_box'),
                    $left_triangle = $('.left_triangle');
                //地圖上x坐標的事件綁定  重要:只有我的大會議程有這個功能
                $('#map').delegate(".x", "click", function() {
                    var $e = $(this),
                        parent_htmlid = $e.parent().parent().attr('id'),
                        //所主樓層為？
                        eq_index = parent_htmlid == 'F1' ? 0 : 1;

                    //取得f:x:y:z
                    var $popup_tooltip = $('#popup_tooltip');
                    var get_room_id = $e.attr('data-room');
                    //在取得此物件的y,x點
                    var this_y = model.get_rooms_info(get_room_id, 'y');
                    var this_x = model.get_rooms_info(get_room_id, 'x');

                    controller.switchRoom(get_room_id);
                    toggle_all_wrap_bg_switch.show();
                    //console.log('你現在按的坐標哪一個點' + get_room_id);
                    $('#popup_tooltip').toggle(function() {
                        if ($(this).css('display') !== 'none') {
                            toggle_all_wrap_bg_switch.show();
                            $left_triangle.show();
                        }
                        $(this).addClass('no_shadow');
                    });


                    $('#popup_tooltip').attr('loc_y', this_y).attr('loc_x', this_x).attr('loc_f', eq_index + 1);
                    //將樓層 x y點位子都存到留言對話框屬性
                    var $this_dom = $('.y.' + this_y + ' .x.' + this_x).eq(eq_index);
                    var this_document_top = $this_dom.offset().top - 2;
                    var this_document_left = $this_dom.offset().left + 27 + 27;
                    /*靜態定位*/
                    $popup_tooltip.css({
                        'left': this_document_left + 'px',
                        'top': this_document_top + 'px'
                    });

                    $left_triangle.css({
                        'left': (this_document_left - 15) + 'px',
                        'top': (this_document_top + 3) + 'px'

                    });
                    // Self-executing recursive animation
                    $animation_map_box.css({
                        'top': $this_dom.offset().top,
                        'left': $this_dom.offset().left,
                        'width': each_animation_map_box_w,
                        'height': each_animation_map_box_w,
                    });

                    //$animation_map_box.delay(200).fadeOut('slow').delay(50).fadeIn('slow');
                    $animation_map_box.fadeOut('slow').fadeIn('slow');
                    $("#user_msg_input").focus();

                    $(document).keydown(function(event) {
                        switch (event.keyCode) {
                            case 27:
                                all_wrap_bg_hide();
                                break;
                        }
                    });

                }); //end $('#map').delegate("...

                //當在大會活動時,移除鍵盤快速鍵
                $('#hotkey_info').remove();

                $("#user_msg_input").keyup(function(e) {
                    while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
                        $(this).height($(this).height() + 1);
                    }
                });

                function all_wrap_bg_hide() {
                    $("#all_wrap_bg").css('display', 'none');
                    $('#popup_tooltip').hide();
                    $animation_map_box.hide();
                    $left_triangle.hide();
                }

                $('#all_wrap_bg').on('click', function() {
                    all_wrap_bg_hide();
                });
            }

            //如果螢幕大小事可以容納對話框的
            if (windowWidth > 760) {
                show_popup_tooltip_on_map();
            }

            //手機不能聊天
            if (windowWidth < 760) {
                $('#bd_wrap').remove();
                $('#mobile_information').show();
            }
        },
        //switchRoom 開放給 html inline javascript 呼叫
        switchRoom: function(room) {
            controller.switchRoom(room);
        }
    };

});

//use it
//chatMap().initialize(); at view/page/chat-map.php
