$(function(){var t={userdata:{},pageNum:1},e={init:function(){$.testLogin(function(e){t.userdata=e}),e.getPage(function(){pageInit(parseInt(t.pageNum),10,function(t){return console.log(t,1),0==t?!1:void e.getData(t)})}),$("#J_CommentSendbox .submit").on("click",e.addComments)},getPage:function(e){$.ajax({url:"./index.php?m=Home&c=Comment&a=commentlist",type:"get",dataType:"json",data:{type:2,id:$.getId(),p:1},success:function(a){t.pageNum=a.data.page,e()},error:function(){}})},getData:function(t){$.ajax({url:"./index.php?m=Home&c=Comment&a=commentlist",type:"get",dataType:"json",data:{type:3,id:$.getId(),p:t},success:function(t){var e=t.data.data,a="";if(0==t.data.page)return $("#itemlist").html(a),!1;for(var n=0,o=e.length;o>n;n++)a+='<div class="item clearFix"><div class="head"><img src="./Uploads'+e[n].namehead+'"></div><div class="info"><span>'+e[n].name+" 发表日期："+e[n].instime+"</span><p>"+e[n].content+"</p></div></div>";$("#J_CommentList").html(a)},error:function(){}})},addComments:function(){var e=$("#J_CommentSendbox textarea").val();$.ajax({type:"post",dataType:"json",url:"./index.php?m=Home&c=Comment&a=addcomment",data:{content:e,href:window.location.href,pagename:$(".videoname").html()},success:function(a){0===a.status?($("#J_CommentList").prepend('<div class="item clearFix"><div class="head"><img src="./Uploads'+t.userdata.headpic+'"></div><div class="info"><span>'+t.userdata.nickname+" 发表日期："+(new Date).toLocaleString()+"</span><p>"+e+"</p></div></div>"),$("#J_CommentList .item").eq(5).remove()):101===a.status?console.log(a.msg):102===a.status?console.log(a.msg):105===a.status&&console.log(a.msg)},error:function(){}})}};e.init()});