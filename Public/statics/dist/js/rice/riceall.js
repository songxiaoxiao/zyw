$(function(){var e={type:"fanssum",pageNum:1},t={init:function(){$(".group").on("click","li",t.tab),$(".creatRice").on("click",t.showCreateRice),$(".create-mask form").on("submit",t.formSubmit),$(".close").on("click",t.closeCreateRice),$(".confirm").on("click",t.closeConfirm),$("#file_upload").uploadify({swf:"public/statics/js/uploadify/uploadify.swf",uploader:"public/statics/js/uploadify/uploadify.php",buttonText:"上传粉丝团封面图",onUploadSuccess:function(e){console.log(e)}}),t.getPage(function(){pageInit(e.pageNum,10,function(e){t.getData(e)})})},getActor:function(){$.ajax({type:"post",url:"./index.php?m=Home&c=Rice&a=actors"})},closeConfirm:function(){$(this).parent().parent().hide()},closeCreateRice:function(){$(this).parent().parent().hide()},formSubmit:function(){return console.log($(":text[name=name]").val()),/^.+$/.test($(":text[name=name]").val())?($.ajax({type:"get",url:"",data:{},dataType:"json",success:function(){},error:function(){}}),!1):(alert("请填入明星名字"),!1)},showCreateRice:function(){$(".create-mask").show()},tab:function(){e.type=$(this).data("type"),$(".group li").removeClass("active"),$(this).addClass("active"),t.getPage(function(){pageInit(e.pageNum,10,function(e){t.getData(e)})})},getPage:function(t){$.ajax({type:"get",url:"./index.php?m=Home&c=Rice&a=morefans",data:{condition:e.type,p:1},dataType:"json",success:function(a){e.pageNum=a.data.page,t()},error:function(){}})},getData:function(t){$.ajax({url:"./index.php?m=Home&c=Rice&a=morefans",type:"get",dataType:"json",data:{condition:e.type,p:t},success:function(e){var t=e.data.data,a="";if(0==e.data.page)return $("#itemlist").html(a),!1;for(var i=0,n=t.length;n>i;i++)a+='<div class="item"><img src="'+t[i].img+'" alt="" /><p>'+t[i].name+'</p><div class="cover"><div class="info">粉丝数 '+t[i].fanssum+"&nbsp;&nbsp;贴&nbsp;量 "+t[i].posts+'</div><br/><a href="/zyw/index.php?m=Home&c=Rice&a=homepage&id='+t[i].id+'">我要报名</a></div></div>';$("#itemlist").html(a)},error:function(){}})}};t.init()});