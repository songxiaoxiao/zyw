$(function(){var e={provinceid:"440000",btrue:!0},t={init:function(){$(".sublist").on("click","li",t.leftClick),$(".group").on("click","li",t.upClick),$("#changeNum").on("click",t.toStep2),$("#sendverify").on("click",t.getVerInSetting),$("#confirmmb").on("click",t.confirmMb),$("#province").on("change",t.changeProvince),$("#codesendverify").on("click",t.codesendverify),$("#codesendmbverify").on("click",t.codesendmbverify),$("#confirmmbcode").on("click",t.confirmmbcode)},confirmmbcode:function(){$(":password[name=newcode]").val()!==$(":password[name=repeatnewcode]").val()?alert("两次输入的新密码不等，请重新输入"):/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test($(":password[name=newcode]").val())?$.ajax({type:"post",url:"./index.php?m=Home&c=User&a=modipasswd",data:{oldpasswd:$(":text[name=oldcode]").val(),newpasswd:$(":password[name=newcode]").val()},dataType:"json",success:function(e){console.log(e.msg),0===e.status?window.location.reload():101===e.status?alert("服务器错误，请稍后再试"):102===e.status&&alert("旧密码错误，请重新输入")},error:function(){}}):alert("至少8位，至少包含数字和字符")},codesendmbverify:function(){$.ajax({type:"get",url:"./index.php?m=Home&c=User&a=checkphver",data:{phone:$(":text[name=codemb]").val(),version:$(":text[name=recode]").val()},dataType:"json",success:function(e){0===e.status?(console.log(e.msg),$("#changecode .step1").hide(),$("#changecode .step2").show()):104===e.status&&(console.log(e.msg),$(".error").html("验证码错误，请重新输入"))},error:function(){}})},codesendverify:function(){$.ajax({type:"get",url:"./index.php?m=Home&c=User&a=yzm",data:{phone:$(":text[name=codemb]").val()},dataType:"json",success:function(e){0===e.status?(console.log(e.msg),$(".error").html("发送成功，请注意查收")):101===e.status?(console.log(e.msg),$(".error").html("发送失败，请稍后再试")):102===e.status&&(console.log(e.msg),$(".error").html("手机号码格式不正确，请重新输入"))},error:function(){}})},changeProvince:function(){e.provinceid=$("#province option:selected").data("id"),t.getCity()},getProvince:function(){$.ajax({url:"./index.php?m=Home&c=Area&a=province",type:"get",dataType:"json",success:function(e){for(var t=e.data,n="",o=0,a=t.length;a>o;o++)n+='<option data-id="'+t[o].provinceid+'" value="'+t[o].provinceid+"|"+t[o].province+'">'+t[o].province+"</option>";$("#province").html(n)},error:function(){}})},getCity:function(){$.ajax({url:"./index.php?m=Home&c=Area&a=city",type:"get",dataType:"json",data:{provinceid:e.provinceid},success:function(e){for(var t=e.data,n="",o=0,a=t.length;a>o;o++)n+='<option value="'+t[o].cityid+"|"+t[o].city+'">'+t[o].city+"</option>";$("#city").html(n)},error:function(){}})},getVerInSetting:function(){console.log($(":text[name=mbchange]").val()),e.btrue&&(e.btrue=!1,$.ajax({url:"./index.php?m=Home&c=User&a=yzm",type:"get",dataType:"json",data:{phone:$(":text[name=mbchange]").val()},success:function(t){"0"==t.status?$("#error").html("验证码已发送，请注意查收"):"101"==t.status?$("#error").html("发送失败，请稍后再试"):"102"==t.status&&$("#error").html("手机号码错误，请检查后再试"),e.btrue=!0},error:function(){alert("系统错误，请稍后再试"),e.btrue=!0}}))},confirmMb:function(){$.ajax({url:"./index.php?m=Home&c=User&a=phonebinding",type:"post",dataType:"json",data:{phone:$(":text[name=mbchange]").val(),code:$(":text[name=veri]").val()},success:function(e){"0"==e.status?($("#error").html("绑定成功"),$("#changemb .step2").hide(),$("#changemb .step3").show(),$("#changemb .step3 .newmb").html($(":text[name=mbchange]").val())):"101"==e.status?$("#error").html("验证码错误"):"102"==e.status?$("#error").html("绑定失败，请稍后再试"):"105"==e.status&&$("#error").html("验证码与手机号码不匹配，请重新尝试")}})},toStep2:function(){$("#changemb .step1").hide(),$("#changemb .step2").show()},leftClick:function(){$(this).parent().find("li").removeClass("active"),$(this).addClass("active"),$(this).parents(".bottomitem").find(".item").removeClass("active"),$(this).parents(".bottomitem").find(".item").eq($(this).index()).addClass("active")},upClick:function(){$(this).parent().find("li").removeClass("active"),$(this).addClass("active"),$(".list").find(".bottomitem").removeClass("active"),$(".list").find(".bottomitem").eq($(this).index()).addClass("active")}};t.init()});