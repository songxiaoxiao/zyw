$(function(){var t={init:function(){$(".join").on("click",t.join),$(".submitmessage").on("click",t.submit),t.testJoin()},submit:function(){var t=editor.html();editor.sync(),t=$("#editor_id").val();var o=$(".articletitle").val();console.log(o,t),$.ajax({type:"post",url:"./index.php?m=Home&c=Rice&a=postini",data:{fansclubid:$(".webmain").data("id"),title:o,content:t},dataType:"json",success:function(t){0===t.status?(console.log(t.msg),window.location.reload()):101===t.status?(console.log(t.msg),alert("发送失败，请稍后再试")):102===t.status&&(console.log(t.msg),alert("请填写全相关信息"))},error:function(){}})},join:function(){$.ajax({type:"get",url:"./index.php?m=Home&c=Rice&a=joinfans",data:{fansid:$(".webmain").data("id")},dataType:"json",success:function(t){0===t.status?(console.log(t.msg),$(".join").html("已入团")):101===t.status?(console.log(t.msg),alert("加入失败，请稍后再试")):102===t.status?(console.log(t.msg),alert("加入失败，请稍后再试")):103===t.status?(console.log(t.msg),alert("加入失败，请稍后再试")):104===t.status&&console.log(t.msg)},error:function(){}})},testJoin:function(){$.ajax({type:"get",url:"./index.php?m=Home&c=Rice&a=checkjoin",data:{fansid:$(".webmain").data("id")},dataType:"json",success:function(t){1===t.status?($(".join").html("已入团"),console.log(t.msg)):0===t.status&&($(".join").html("+ 入团"),console.log(t.msg))},error:function(){}})}};t.init()});