/*global FB, my_fb_id, appId, fb_apid*/
/*jshint unused: false*/

var fbRelatedView = {
    personal_nickname_input: $("#personal_nickname"),
    personal_fb_id: $("#personal_fb_id"),
    chat_fb_icon: $("#chat_fb_icon"), //從 facebook 帶入的 icon
    chat_nickname: $("#chat_nickname"), //帶入聊天區域的暱稱 input

    fbme_func: function(response) {
        this.personal_nickname_input.val(response.name);
        this.personal_fb_id.val(response.id);
        this.chat_fb_icon.hide();
        this.chat_nickname.val(response.name);
    }
};


window.fbAsyncInit = function() {
    FB.Event.subscribe('auth.authResponseChange', function(response) {
        // Here we specify what we do with the response anytime this event occurs.
        if (response.status === 'connected') {
            FB.api('/me', function(response) {
                //TODO: 全站根本沒有這個 DOM $("#personal_account").val(response.name);
                fbRelatedView.fbme_func(response);
            });
            /*
        FB.api('/me', function (response) {
            $("#personal_account").val(response.username);
            $("#personal_nickname").val(response.username);
            var img_src = "http://graph.facebook.com/"+response.id+"/picture";
            //$("#F1_walk").html("<img src='"+img_src+"' />");
            //$("#F2_walk").html("<img src='"+img_src+"' />");
            $(".personal_walk_icon").css("background-image","url('"+img_src+"')")
            //$(".personal_walk_icon span.name").html(response.username);
            $(".personal_walk_icon span.name").html(response.name);
            console.log(response);

        });
      */
        } else if (response.status === 'not_authorized') {
            // In this case, the person is logged into Facebook, but not into the app, so we call
            // FB.login() to prompt them to do so.
            // In real-life usage, you wouldn't want to immediately prompt someone to login
            // like this, for two reasons:
            // (1) JavaScript created popup windows are blocked by most browsers unless they
            // result from direct interaction from people using the app (such as a mouse click)
            // (2) it is a bad experience to be continually prompted to login upon page load.
            FB.login();
        } else {
            // In this case, the person is not logged into Facebook, so we call the login()
            // function to prompt them to do so. Note that at this stage there is no indication
            // of whether they are logged into the app. If they aren't then they'll see the Login
            // dialog right after they log in to Facebook.
            // The same caveats as above apply to the FB.login() call here.
            FB.login();
        }
    });

    FB.Event.subscribe('auth.statusChange', function(response) {
        //$(document).trigger('fbStatusChange', response);
    });

    FB.init({
        appId: fb_apid, // App ID
        channelUrl: '/channel.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true // parse XFBML
    });
};

// Load the SDK Asynchronously
(function(d) {
    var js, id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + fb_apid;
    ref.parentNode.insertBefore(js, ref);
}(document));

function facebook_login() {
    /*
    FB.login(function(response) {
    }, {scope: 'publish_actions'});
    */

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            //console.log("己登入facebook而且之前己登錄過這個應用程式");
            FB.api('/me', function(response) {
                //$("#personal_account").val(response.name);
                fbRelatedView.fbme_func(response);

            });
        } else if (response.status === 'not_authorized') {
            //console.log("己登入未授權");
            FB.login(function(response) {});
        } else {
            //console.log("連登都還沒登入");
            FB.login(function(response) {});
        }
    });
    return false;
}

function chat_fb_login(paramFunc) {
    //會用到 chat_fb_login 且帶 paramFunc 只有 chat-map.php:  chat_fb_login(Get_NickName)
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            //console.log("己登入facebook而且之前己登錄過這個應用程式");
            FB.api('/me', function(response) {
                //my_fb_id = response.id;
                fbRelatedView.personal_fb_id.val(response.id);
                fbRelatedView.chat_fb_icon.hide();
                fbRelatedView.chat_nickname.val(response.name);

                if (paramFunc && (typeof paramFunc == "function")) {
                    //why use eval()??? plz don't use eval anymore...
                    //eval(paramFunc);
                    paramFunc();
                }
            });
        } else if (response.status === 'not_authorized') {
            //console.log("己登入未授權");
            if (paramFunc && (typeof paramFunc == "function")) {
                paramFunc();
            }
        } else {
            //console.log("連登都還沒登入");
            if (paramFunc && (typeof paramFunc == "function")) {
                paramFunc();
            }
        }
    });
    return false;
}

function get_fb_picture(u_fb_id) {
    var img_src = "/assets/images/people.png";
    if (u_fb_id === "" || u_fb_id == "undefined" || typeof(u_fb_id) == "undefined") {} else {
        img_src = "http://graph.facebook.com/" + u_fb_id + "/picture";
    }
    return img_src;
}
