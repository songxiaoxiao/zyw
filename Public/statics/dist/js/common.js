$(function(){var n={init:function(){$("#login").on("click",n.showInfo),$("body").on("click",n.hideInfo),n.addLogin()},showInfo:function(n){return $("#myinfoalert").show(),!1},hideInfo:function(){$("#myinfoalert").hide()},addLogin:function(){$.extend({testLogin:function(){$.ajax({url:"./index.php?m=Home&c=Login&a=checklogin",dataType:"json",success:function(){},error:function(){}})}})}};n.init()});