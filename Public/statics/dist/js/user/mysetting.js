$(function(){var e={provinceid:"440000",btrue:!0,ver:!0},t={init:function(){$(".sublist").on("click","li",t.leftClick),$(".group").on("click","li",t.upClick),$("#changeNum").on("click",t.toStep2),$("#sendverify").on("click",t.getVerInSetting),$("#confirmmb").on("click",t.confirmMb),$("#province").on("change",t.changeProvince),$("#codesendverify").on("click",t.codesendverify),$("#codesendmbverify").on("click",t.codesendmbverify),$("#confirmmbcode").on("click",t.confirmmbcode),$("#photo").on("change",t.photoChange)},photoChange:function(){var e=window.URL.createObjectURL(this.files[0]);e?$(".uploadimg").attr("src",e):$(".uploadimg").attr("src","./Public/statics/images/default_fans_headpic.jpg")},confirmmbcode:function(){$(":password[name=newcode]").val()!==$(":password[name=repeatnewcode]").val()?alert("两次输入的新密码不等，请重新输入"):/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test($(":password[name=newcode]").val())?$.ajax({type:"post",url:"./index.php?m=Home&c=User&a=modipasswd",data:{oldpasswd:$(":password[name=oldcode]").val(),newpasswd:$(":password[name=newcode]").val()},dataType:"json",success:function(e){console.log(e.msg),0===e.status?window.location.reload():101===e.status?alert("服务器错误，请稍后再试"):102===e.status?alert("旧密码错误，请重新输入"):alert(e.msg)},error:function(){}}):alert("至少8位，至少包含数字和字符")},codesendmbverify:function(){$.ajax({type:"get",url:"./index.php?m=Home&c=User&a=checkphver",data:{phone:$(":text[name=codemb]").val(),version:$(":text[name=recode]").val()},dataType:"json",success:function(e){console.log(e.msg),0===e.status?($("#changecode .step1").hide(),$("#changecode .step2").show()):104===e.status?$(".error").html("验证码错误，请重新输入"):alert(e.msg)},error:function(){}})},codesendverify:function(){if(e.ver){e.ver=!1;var t=30,o=setInterval(function(){$("#codesendverify").html(t+"秒后重新获得"),t--,0===t&&(clearInterval(o),e.ver=!0,$("#codesendverify").html("发送验证码")),console.log(t)},1e3);$.ajax({type:"get",url:"./index.php?m=Home&c=User&a=yzm",data:{phone:$(":text[name=codemb]").val()},dataType:"json",success:function(e){console.log(e.msg),0===e.status?$(".error").html("发送成功，请注意查收"):101===e.status?$(".error").html("发送失败，请稍后再试"):103===e.status?$(".error").html("手机号码格式不正确，请重新输入"):$(".error").html(e.msg)},error:function(){}})}},changeProvince:function(){e.provinceid=$("#province option:selected").data("id"),t.getCity()},getProvince:function(){$.ajax({url:"./index.php?m=Home&c=Area&a=province",type:"get",dataType:"json",success:function(e){for(var t=e.data,o="",n=0,a=t.length;a>n;n++)o+='<option data-id="'+t[n].provinceid+'" value="'+t[n].provinceid+"|"+t[n].province+'">'+t[n].province+"</option>";$("#province").html(o)},error:function(){}})},getCity:function(){$.ajax({url:"./index.php?m=Home&c=Area&a=city",type:"get",dataType:"json",data:{provinceid:e.provinceid},success:function(e){for(var t=e.data,o="",n=0,a=t.length;a>n;n++)o+='<option value="'+t[n].cityid+"|"+t[n].city+'">'+t[n].city+"</option>";$("#city").html(o)},error:function(){}})},getVerInSetting:function(){if(console.log($(".mbchange").val()),e.btrue){e.btrue=!1;var t=30,o=setInterval(function(){$("#sendverify").html(t--),0===t&&(clearInterval(o),e.btrue=!0,$("#sendverify").html("发送验证码")),console.log(t)},1e3);$.ajax({url:"./index.php?m=Home&c=User&a=yzm",type:"get",dataType:"json",data:{phone:$(".mbchange").val()},success:function(e){console.log(e.msg),"0"==e.status?$("#error").html("验证码已发送，请注意查收"):"101"==e.status?$("#error").html("发送失败，请稍后再试"):"102"==e.status?$("#error").html("手机号码错误，请检查后再试"):$("#error").html(e.msg)},error:function(){alert("系统错误，请稍后再试")}})}},confirmMb:function(){$.ajax({url:"./index.php?m=Home&c=User&a=phonebinding",type:"post",dataType:"json",data:{phone:$(".mbchange").val(),code:$(":text[name=veri]").val()},success:function(e){console.log(e.msg),"0"==e.status?($("#error").html("绑定成功"),$("#changemb .step2").hide(),$("#changemb .step3").show(),$("#changemb .step3 .newmb").html($(".mbchange").val())):"101"==e.status?$("#error").html("验证码错误"):"102"==e.status?$("#error").html("绑定失败，请稍后再试"):"103"==e.status?$("#error").html("改手机号码已被注册，请更换号码后再试"):"105"==e.status?$("#error").html("验证码与手机号码不匹配，请重新尝试"):$("#error").html(e.msg)}})},toStep2:function(){$("#changemb .step1").hide(),$("#changemb .step2").show()},leftClick:function(){$(this).parent().find("li").removeClass("active"),$(this).addClass("active"),$(this).parents(".bottomitem").find(".item").removeClass("active"),$(this).parents(".bottomitem").find(".item").eq($(this).index()).addClass("active")},upClick:function(){$(this).parent().find("li").removeClass("active"),$(this).addClass("active"),$(".list").find(".bottomitem").removeClass("active"),$(".list").find(".bottomitem").eq($(this).index()).addClass("active")}};t.init()});