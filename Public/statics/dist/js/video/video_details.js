$(function(){var e={userdata:{},pageNum:1},t={init:function(){$.testLogin(function(t){e.userdata=t}),t.getPage(function(){pageInit(parseInt(e.pageNum),10,function(e){return console.log(e,1),0==e?!1:void t.getData(e)})}),$("#J_CommentSendbox .submit").on("click",t.addComments)},getPage:function(t){$.ajax({url:"./index.php?m=Home&c=Comment&a=commentlist",type:"get",dataType:"json",data:{type:2,id:$.getId(),p:1},success:function(a){e.pageNum=a.data.page,t()},error:function(){}})},getData:function(e){$.ajax({url:"./index.php?m=Home&c=Comment&a=commentlist",type:"get",dataType:"json",data:{type:2,id:$.getId(),p:e},success:function(e){var t=e.data.data,a="";if(0==e.data.page)return $("#itemlist").html(a),!1;for(var n=0,i=t.length;i>n;n++)a+='<div class="item clearFix"><div class="head"><img src="'+t[n].namehead+'"></div><div class="info"><span>'+t[n].name+" 发表日期："+t[n].instime+"</span><p>"+t[n].content+"</p></div></div>";$("#J_CommentList").html(a)},error:function(){}})},addComments:function(){var t=$("#J_CommentSendbox textarea").val();$.ajax({type:"post",dataType:"json",url:"./index.php?m=Home&c=Comment&a=addcomment",data:{content:t,href:window.location.href,pagename:$(".videoname").html()},success:function(a){console.log(a.msg),0===a.status?($("#J_CommentList").prepend('<div class="item clearFix"><div class="head"><img src="'+e.userdata.headpic+'"></div><div class="info"><span>'+e.userdata.nickname+" 发表日期："+(new Date).toLocaleString()+"</span><p>"+t+"</p></div></div>"),$("#J_CommentList .item").eq(5).remove()):alert(a.msg)},error:function(){}})}};t.init()});