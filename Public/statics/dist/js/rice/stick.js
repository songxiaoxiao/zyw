$(function(){var t={init:function(){$(".comment").on("click",".itemreplybutton",t.replycomment),$(".comment").on("click",".replybutton",t.subreply),$("#mainreply").on("click",t.reply)},reply:function(){$.ajax({type:"post",url:"./index.php?m=Home&c=Rice&a=comment",data:{fid:0,postid:$(".webmain").data("id"),content:$("#mainreplycontent").val()},dataType:"json",success:function(t){0===t.status?(console.log(t.msg),window.location.reload()):101===t.status?(console.log(t.msg),alert("发布失败，请稍后再试")):102===t.status&&(console.log(t.msg),alert("请登录"))},error:function(){}})},replycomment:function(){$(this).parents(".outeritem").find(".inputsection").show().find(".replytext")[0].focus(),$(this).parents(".outeritem").find(".replytext").val("")},subreply:function(){$(this).parents(".outeritem").find(".replytext").val("@"+$(this).parents(".itemreply").data("name")+" "),$(this).parents(".outeritem").find(".inputsection").show().find(".replytext")[0].focus()}};t.init()});