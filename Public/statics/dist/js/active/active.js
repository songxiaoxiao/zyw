$(function(){var e={now:0,timer:null,type:0,time:0,pageNum:1,imgUrl:"",activeType:""},t={init:function(){$("#dotList").on("click","li",t.tabBanner),$("#groupByType").on("click","li",t.tabGroupByType),$("#groupByTime").on("click","li",t.tabGroupByTime),$("#imgList").on("mouseover",t.mouseover),$("#imgList").on("mouseout",t.mouseout),$("#newActive").on("click",t.createActive),$(".close").on("click",t.closeAlert),$(".activeType").on("change",t.SelectChange),$("form").on("submit",t.submit),tabinit(),t.getPage(function(){pageInit(parseInt(e.pageNum),10,function(e){return 0==e?!1:void t.getActiveData(e)})}),$("#file_upload").uploadify({swf:"./Public/statics/js/uploadify/uploadify.swf",uploader:"./Public/statics/js/uploadify/uploadify.php",buttonText:"活动图片",onUploadSuccess:function(t,a,i){console.log(t,a,i);var s=a.match(/\.\\\/Uploads.+"/)[0];e.imgUrl=s.substring(0,s.length-1)}})},submit:function(){if(/^.+$/.test($(":text[name=activeName]").val()))if(/^.+$/.test($(":text[name=fromTime]").val()))if(/^.+$/.test($(":text[name=toTime]").val()))if(/^.+$/.test($(":text[name=activebrief]").val()))if(/^.+$/.test($("textarea[name=activeinfo]").val()))if(/^.+$/.test($(":text[name=hostname]").val()))if(/^.+$/.test($(":text[name=hosttel]").val()))if(/^.+$/.test($(":text[name=hostaddress]").val()))if(/^.+$/.test($(":text[name=hostemail]").val())){var t=$(this).find("option:selected").val();if("0"==t&&!/^.+$/.test($(".activeAdress").val()))return $(".errorsubmit").html("活动地址不能为空"),!1;$.ajax({type:"post",url:"./index.php?m=Home&c=Active&a=useraddactive",data:{title:$(":text[name=activeName]").val(),img:e.imgUrl,content:$(":text[name=activebrief]").val(),info:$("textarea[name=activeinfo]").val(),phone:$(":text[name=hosttel]").val(),begin_time:$(":text[name=fromTime]").val(),last_time:$(":text[name=toTime]").val(),line_type:t,line_address:$(".activeAdress").val(),sponsor_name:$(":text[name=hostname]").val(),sponsor_phone:$(":text[name=hosttel]").val(),sponsor_address:$(":text[name=hostaddress]").val(),sponsor_email:$(":text[name=hostemail]").val()},dataType:"json",success:function(e){console.log(e.msg),0===e.status?($("#mask").hide(),alert("活动发起成功静待审核")):101===e.status?$(".errorsubmit").html("系统错误，请稍后再试"):102===e.status?$(".errorsubmit").html("请检查信息是否填完整"):103===e.status&&$(".errorsubmit").html("活动日期有误")},error:function(){}})}else $(".errorsubmit").html("主办人邮箱不能为空");else $(".errorsubmit").html("主办人地址不能为空");else $(".errorsubmit").html("主办人电话不能为空");else $(".errorsubmit").html("主办人姓名不能为空");else $(".errorsubmit").html("活动信息不能为空");else $(".errorsubmit").html("活动简介不能为空");else $(".errorsubmit").html("活动结束时间不能为空");else $(".errorsubmit").html("活动起始时间不能为空");else $(".errorsubmit").html("活动名称不能为空");return!1},SelectChange:function(){var e=$(this).find("option:selected").val();"0"==e?$(".activeAdress").prop("placeholder","请输入活动地址").removeAttr("disabled","disabled"):$(".activeAdress").prop("placeholder","无需活动地址").val("").attr("disabled","disabled")},closeAlert:function(){$(this).parents(".mask").hide()},tabBanner:function(){clearTimeout(e.timer),e.now=$(this).index();var a=$("#dotList"),i=$("#imgList");a.find("li").removeClass("active"),$(this).addClass("active"),i.find("a").removeClass("active"),i.find("a").eq($(this).index()).addClass("active"),t.autoTab()},autoTab:function(){e.timer=setInterval(function(){var t=$("#dotList"),a=$("#imgList");e.now++,e.now>=t.find("li").length&&(e.now=0),t.find("li").removeClass("active"),t.find("li").eq(e.now).addClass("active"),a.find("a").removeClass("active"),a.find("a").eq(e.now).addClass("active")},3e3)},tabGroupByType:function(){$("#groupByType").find("li").removeClass("active"),$(this).addClass("active"),e.type=$(this).data("type"),t.getPage(function(){pageInit(e.pageNum,10,function(e){t.getActiveData(e)})})},tabGroupByTime:function(){$("#groupByTime").find("li").removeClass("active"),$(this).addClass("active"),e.time=$(this).data("time"),t.getPage(function(){pageInit(e.pageNum,10,function(e){t.getActiveData(e)})})},mouseover:function(){clearTimeout(e.timer)},mouseout:function(){t.autoTab()},createActive:function(){$("#mask").show()},getPage:function(t){$.ajax({url:"./index.php?m=Home&c=Active&a=activetype",type:"get",dataType:"json",data:{type:e.type,time:e.time,p:1},success:function(a){e.pageNum=a.data.page,t()},error:function(){}})},getActiveData:function(t){$.ajax({url:"./index.php?m=Home&c=Active&a=activetype",type:"get",dataType:"json",data:{type:e.type,time:e.time,p:t},success:function(e){var t=e.data.data,a="";if(0==e.data.page)return $("#itemlist").html(a),!1;for(var i=0,s=t.length;s>i;i++)a+='<li><a href="./index.php?m=Home&c=Active&a=active_details&id='+t[i].id+'"><img src="./Uploads'+t[i].img+'"><div class="tags"><h3>'+t[i].title+"</h3><p>"+t[i].begin_time+"-"+t[i].last_time+'</p></div><sub></sub></a><div class="desc"><span class="txt">'+t[i].content+'</span><div><span class="num">'+t[i].concern+'</span><i class="focus"></i></div></div></li>';$("#itemlist").html(a)},error:function(){}})}};t.init()});