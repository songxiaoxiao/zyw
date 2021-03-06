(function($) {
  // 增加$.testLogin函数验证登陆
  // jq插件 增加testLogin函数验证登陆
  $.testLogin = function(fn) {
    $.ajax({
      url: "./index.php?m=Home&c=Login&a=checklogin",
      dataType: "json",
      type: "get",
      success: function(json) {
        if (json.status == "1") {
          $(".myinfoalert-header-content .name").html(json.data.nickname);
          $(".myinfoalert-header-face").attr("src", json.data.headpic);
          $(".islogin .face").attr("src", json.data.headpic);
          $("#login").html(json.data.nickname)
          $("#nologin").hide();
          $("#islogin").show();
          fn(json.data);
        } else if (json.status == "0") {
          $("#nologin").show();
          $("#islogin").hide();
        }
      },
      error: function() {}
    });
  }
  $.getId = function() {
    var _str = window.location.href;
    var _arr = _str.split("id=");
    return _arr[1];
  }
})(jQuery);

$(function() {

  var scope = {
    ver: true
  };
  var page = {
    init: function() {
      // 点击#login 显示登陆框
      $("#login").on("click", page.showInfo);
      // 点击body隐藏登录框
      $("body").on("click", page.hideInfo);
      // 未登陆时，点击#reg 注册框出来
      $("#reg").off().on("click", page.regShow);
      // 未登陆时，点击#log 登录框出来
      $("#log").off().on("click", page.logShow);
      // 上面两个框的关闭按钮
      $("body").on("click", "#close", page.closeAlert);
      // 刷新二维码
      $("body").on("click", "#img1", page.changePic);
      $("body").on("click", "#img2", page.changePic);
      // 获取二维码
      $("body").on("click", "#getfreemesg", page.getVer);
      // 注册提交
      $("body").on("submit", ".registerform", page.regSubmit);

      $(".logout").on("click", page.logOut);

      // 用户登陆检测判断
      $.testLogin(function() {});


    },
    logOut: function() {
      window.location.href = "./index.php?m=Home&c=Login&a=logout";

    },
    regSubmit: function() {
      if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test($(":password[name=password]").val())) {
        $("#error").html("密码至少8位，至少包含数字和字符");
      } else if (!/^1[23456789]\d{9}$/.test($(":text[name=mb]").val())) {
        $("#error").html("手机号码输入错误，请重新输入");
      }else if (!/^.+$/.test($(":text[name=idcode2]").val())) {
        $("#error").html("验证码输入错误，请重新输入");
      } else {
        $.ajax({
          url: "./index.php?m=Home&c=Login&a=register",
          type: "get",
          dataType: "json",
          data: {
            phone: $(":text[name=mb]").val(),
            passwd: $(":password[name=password]").val(),
            verify: $(":text[name=idcode2]").val()
          },
          success: function(json) {
            console.log(json.msg)
            if (json.status == "0") {
              $("#error").html("注册成功,请去登陆");
            } else if (json.status == "101") {
              $("#error").html("注册失败,请稍后再试");
            } else if (json.status == "102") {
              $("#error").html("手机号码输入错误，请重新输入");
            } else if (json.status == "103") {
              $("#error").html("该手机账号已被注册过");
            } else if (json.status == "105") {
              $("#error").html("密码不符合规则");
            }
          },
          error: function() {}
        })
      }
      return false;
    },
    getVer: function() {
      if(!/^1[3456789]\d{9}$/.test($(":text[name=mb]").val())){
        $("#error").html("手机号码错误");
      }else if(!/^.+$/.test($(":text[name=idcode1]").val())){
        $("#error").html("请输入验证号码");
      }else if (scope.ver) {
        scope.ver = false;
         var _time = 30;
         var _timer = setInterval(function(){
           $("#getfreemesg").html(_time + "秒后继续");
           _time--;
           if(_time === 0){
             clearInterval(_timer);
             scope.ver = true;
             $("#getfreemesg").html("免费获取短信");
           }
           console.log(_time);
         },1000)
        $.ajax({
          url: './index.php?m=Home&c=Login&a=yzm',
          type: 'get',
          dataType: 'json',
          data: {
            code: $(":text[name=idcode1]").val(),
            phone: $(":text[name=mb]").val()
          },
          success: function(json) {
            console.log(json.msg);
            if (json.status == "0") {
              $("#error").html("验证已发送,请注意查收");
            } else if (json.status == "101") {
              $("#error").html("服务器错误,请稍后再试");
            } else if (json.status == "102") {
              $("#error").html("验证码输入错误，请重新输入");
            } else if (json.status == "103") {
              $("#error").html("手机号码输入错误，请重新输入");
            }
          },
          error: function(d) {
          }
        });
      }
    },
    changePic: function() {
      $("#img1").prop("src", "./index.php?m=Home&c=Login&a=verify&refles="+new Date());
    },
    closeAlert: function() {
      // $(this).parent().parent().hide();
      $(this).parent().parent().remove();
    },
    regShow: function() {
      // $("#registeralert").show();
      var $reg = $('<div class="registeralert" id="registeralert"></div>');
      $reg.html('<div class="registeralert-main">' +
        '<div class="close" id="close">' +
        '</div>' +
        '<form class="registerform" action="index.html" method="post">' +
        '<div class="registeralert-main-item">' +
        '<label for="mb">手&nbsp;&nbsp;机：</label>' +
        '<input type="text" name="mb" value="" id="mb" placeholder="请输入手机号码">' +
        '</div>' +
        '<div class="registeralert-main-item">' +
        '<label for="password">密&nbsp;&nbsp;码：</label>' +
        '<input type="password" name="password" value="" id="password" placeholder="密码至少8位，至少包含数字和字符">' +
        '</div>' +
        '<div class="registeralert-main-item">' +
        '<label for="idcode">验证码：</label>' +
        '<input type="text" class="idcode1" name="idcode1" value="" id="idcode1" placeholder="请输入右侧字母">' +
        '<div class="pic">' +
        '<img src="./index.php?m=Home&c=Login&a=verify" alt="" id="img1" />' +
        '</div>' +
        '<span class="reflesh">' +
        '<span class="img" id="img2"></span>' +
        '</span>' +
        '</div>' +
        '<div class="registeralert-main-item">' +
        '<input type="text" name="idcode2" value="" id="idcode2" placeholder="请输入验证码"><span class="getfreemesg" id="getfreemesg">免费获取短信</span>' +
        '</div>' +
        '<span id="error"></span>' +
        '<div class="registeralert-main-item customstyle1">' +
        // '<input type="checkbox" name="rulechecked" value="">'+
        '<!-- <span class="agree">&nbsp;&nbsp;我同意<em><用户协议></em></span> -->' +
        '<span class="login" id="go2login">立即登录</span>' +
        '</div>' +
        '<div class="registeralert-main-item">' +
        '<input type="submit" name="name" value="注册" id="regsubmit">' +
        '</div>' +
        '<div class="registeralert-main-item">' +
        '<a href="javascript:;" class="login-weibo"></a>' +
        '<a href="javascript:;" class="login-qq"></a>' +
        '<a href="javascript:;" class="login-weichat"></a>' +
        '</div>' +
        '</form>' +
        '</div>')
      $("body").append($reg);
      $("#go2login").off().on("click", function() {
        $("#registeralert").remove();
        page.logShow();
      })
      $(".login-qq").on("click", page.toLoginQQ);
      $(".login-weibo").on("click", page.toLoginWeiBo);
      $(".login-weichat").on("click", page.toLoginWeiChat);

    },
    logShow: function() {
      // $("#loginalert").show()
      var $log = $('<div class="loginalert" id="loginalert"></div>');
      $log.html('<div class="loginalert-main">' +
        '<div class="close" id="close">' +
        '</div>' +
        '<form class="logform" action="index.html" method="post">' +
        '<div class="loginalert-main-item">' +
        '<label for="mb">用户名：</label>' +
        '<input type="text" name="mb" value="" id="mb" placeholder="请输入手机号码">' +
        '</div>' +
        '<div class="loginalert-main-item">' +
        '<label for="password">密&nbsp;&nbsp;码：</label>' +
        '<input type="password" name="password" value="" id="password" placeholder="请输入密码">' +
        '</div>' +
        '<span id="error"></span>' +
        '<div class="loginalert-main-item customstyle1">' +
        // '<input type="checkbox" name="rulechecked" value="">'+
        '<!-- <span class="remenber">&nbsp;&nbsp;记住我</span> -->' +
        '<span class="register" id="go2reg">立即注册</span>' +
        '<a href="./index.php?m=Home&c=User&a=codeback" class="searchpass">找回密码</a>' +
        '</div>' +
        '<div class="loginalert-main-item">' +
        '<input type="submit" name="name" value="登陆">' +
        '</div>' +
        '<div class="loginalert-main-item">' +
        '<a href="javascript:;" class="login-weibo"></a>' +
        '<a href="javascript:;" class="login-qq"></a>' +
        '<a href="javascript:;" class="login-weichat"></a>' +
        '</div>' +
        '</form>' +
        '</div>');
      $("body").append($log);
      $(".logform").on("submit", page.logSubmit);
      $("#go2reg").on("click", function() {
        $("#loginalert").remove();
        page.regShow();
      });
      $(".login-qq").on("click", page.toLoginQQ);
      $(".login-weibo").on("click", page.toLoginWeiBo);
      $(".login-weichat").on("click", page.toLoginWeiChat);

    },
    logSubmit: function() {
      $.ajax({
        url: "./index.php?m=Home&c=Login&a=login",
        type: "get",
        dataType: "json",
        data: {
          name: $(":text[name=mb]").val(),
          passwd: $(":password[name=password]").val()
        },
        success: function(json) {
          console.log(json.msg);
          if (json.status == "1") {
            $("#loginalert").remove();
            console.log("登陆成功")
            $.testLogin();
          } else if (json.status == "0") {
            $("#error").html("账号密码输入错误")
          }
        },
        error: function() {}
      })
      return false;
    },
    showInfo: function(e) {
      $("#myinfoalert").show();
      return false;
    },
    hideInfo: function() {
      $("#myinfoalert").hide();
    },
    toLoginQQ: function() {
      //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
      //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
      var A = window.open("./index.php?m=Home&c=Login&a=qqlogin", "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1, resizable = 1, status = 1, titlebar = 0, toolbar = 0, location = 1 ");

    },
    toLoginWeiBo: function() {
      var A = window.open("./index.php?m=Home&c=Login&a=weibologin", "TencentLogin", "width=450,height=320,menubar=0,scrollbars=1, resizable = 1, status = 1, titlebar = 0, toolbar = 0, location = 1 ");
    },
    toLoginWeiChat: function() {
      var A = window.open("./index.php?m=Home&c=Login&a=weixinlogin", "TencentLogin", "width=450,height=520,menubar=0,scrollbars=1, resizable = 1, status = 1, titlebar = 0, toolbar = 0, location = 1 ");
    }
  };
  page.init();



})
