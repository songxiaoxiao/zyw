$(function(){var t={provinceid:"440000"},i={init:function(){$(".sublist").on("click","li",i.leftClick),$(".group").on("click","li",i.upClick),$("#changeNum").on("click",i.toStep2),$("#sendverify").on("click",i.getVerInSetting),$("#confirmmb").on("click",i.confirmMb),$("#province").on("change",i.changeProvince),i.getProvince(),i.getCity()},changeProvince:function(){t.provinceid=$("#province option:selected").data("id"),i.getCity()},getProvince:function(){$.ajax({url:"./index.php?m=Home&c=Area&a=province",type:"get",dataType:"json",success:function(t){for(var i=t.data,e="",n=0,o=i.length;o>n;n++)e+='<option data-id="'+i[n].provinceid+'">'+i[n].province+"</option>";$("#province").html(e)},error:function(){}})},getCity:function(){$.ajax({url:"./index.php?m=Home&c=Area&a=city",type:"get",dataType:"json",data:{provinceid:t.provinceid},success:function(t){for(var i=t.data,e="",n=0,o=i.length;o>n;n++)e+='<option data-id="'+i[n].cityid+'">'+i[n].city+"</option>";$("#city").html(e)},error:function(){}})},getVerInSetting:function(){$.ajax({url:"./index.php?m=Home&c=User&a=yzm",type:"get",dataType:"json",data:{Phone:$(":text[name=mbchange]").val()},success:function(t){"0"==t.status?$("#error").html("验证码已发送，请注意查收"):"101"==t.status?$("#error").html("发送失败，请稍后再试"):"103"==t.status&&$("#error").html("手机号码错误，请检查后再试")},error:function(){}})},confirmMb:function(){$.ajax({url:"./index.php?m=Home&c=Login&a=yzm",type:"get",dataType:"json",data:{},success:function(t){"0"==t.status||"1"==t.status}}),$(".step2").hide(),$(".step3").show()},toStep2:function(){$(".step1").hide(),$(".step2").show()},leftClick:function(){$(this).parent().find("li").removeClass("active"),$(this).addClass("active"),$(this).parents(".bottomitem").find(".item").removeClass("active"),$(this).parents(".bottomitem").find(".item").eq($(this).index()).addClass("active")},upClick:function(){$(this).parent().find("li").removeClass("active"),$(this).addClass("active"),$(".list").find(".bottomitem").removeClass("active"),$(".list").find(".bottomitem").eq($(this).index()).addClass("active")}};i.init()});