$(function(){var i={},t={init:function(){$("#group").on("click","li",t.changeGroup)},changeGroup:function(){$("#group").find("li").removeClass("active"),$(this).addClass("active")},getActiveData:function(t){$.ajax({url:"./index.php?m=Home&c=Active&a=activetype",type:"get",dataType:"json",data:{type:i.type,time:i.time,p:t},success:function(i){var t=i.data.data,a="";if(0==i.data.page)return $("#itemlist").html(a),!1;for(var e=0,s=t.length;s>e;e++)a+='<li><a href="./index.php?m=Home&c=Active&a=active_details&id='+t[e].id+'"><img src="./Uploads'+t[e].img+'"><div class="tags"><h3>'+t[e].title+"</h3><p>"+t[e].begin_time+"-"+t[e].last_time+'</p></div><sub></sub></a><div class="desc"><span class="txt">'+t[e].content+'</span><div><span class="num">'+t[e].concern+'</span><i class="focus"></i></div></div></li>';$("#itemlist").html(a)},error:function(){}})}};t.init()});