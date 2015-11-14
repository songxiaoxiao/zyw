$(function(){
  var scope = {
    verStatus: true
  };
  var page = {
    init: function(){
      $("#getVer").on("click", page.gerVer);
      $("#checkmb").on("click", page.checkmb);
      $("#confirmcode").on("click",page.confirmcode);
    },
    confirmcode: function(){
      if(!/^.+$/.test($(":text[name=oldcode]").val())){
        $(".step2 .error")("请输入旧密码")
      }else if(!/^.+$/.test($(":text[name=code]").val())){
        $(".step2 .error")("请输入新密码")
      }else if(!/^.+$/.test($(":text[name=recode]").val())){
        $(".step2 .error")("请再次输入新密码")
      }else if($(":text[name=code]").val() !== $(":text[name=recode]").val()){
        $(".step2 .error")("两次输入的密码不相等, 请检查后重新输入")
      }else{
        $.ajax({
          type: "post",
          url: "./index.php?m=Home&c=User&a=modipasswd",
          data: {
            oldpasswd: $(":text[name=oldcode]").val(),
            newpasswd: $(":text[name=code]").val()
          },
          dataType: "json",
          success: function(json){
            if(json.status === 0){
              console.log(json.msg);
              $(".step2").hide();
              $(".step3").show();
            }else if(json.status === 102){
              $(".step2 .error")("旧密码输入错误");
              console.log(json.msg);
            }else{
              console.log(json.msg);
            }
          },
          error: function(){}
        })
      }
    },
    checkmb: function(){
      $.ajax({
        type: "get",
        url: "./index.php?m=Home&c=User&a=checkphver",
        data: {
          phone: $(":text[name=tel]").val(),
          version: $(":text[name=ver]").val()
        },
        dataType: "json",
        success: function(json){
          if(json.status === 0){
            console.log(json.msg);
            $(".step1").hide();
            $(".step2").show();
          }else if(json.status === 103){
            alert("验证码错误")
            console.log(json.msg);
          }else{
            console.log(json.msg)
          }
        },
        error: function(){}
      })
    },
    gerVer: function(){
      if(/^.+$/.test($(":text[name=tel]").val())){
        scope.verStatus = false;
        $.ajax({
          type: "get",
          url: "./index.php?m=Home&c=User&a=yzm",
          data: {
            phone: $(":text[name=tel]").val()
          },
          dataType: "json",
          success: function(json){
            if(json.status === 0){
              $(".step1 .error").html("发送成功，请注意查收")
              console.log(json.msg)
            }else if(json.status === 101){
              $(".step1 .error").html("服务器错误，请稍后再试")
              console.log(json.msg)
            }else if(json.status === 102){
              console.log(json.msg)
              $(".step1 .error").html("手机号码错误，请检查错误后再试")
            }
            scope.verStatus = true;
          },
          error: function(){}
        })
      }else{
        alert("手机号不能为空");
      }
    }
  };
  page.init();
})