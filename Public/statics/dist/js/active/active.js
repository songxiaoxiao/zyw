$(function(){var t={now:0,timer:null,type:0,time:0,pageNum:1},e={init:function(){$("#dotList").on("click","li",e.tabBanner),$("#groupByType").on("click","li",e.tabGroupByType),$("#groupByTime").on("click","li",e.tabGroupByTime),$("#imgList").on("mouseover",e.mouseover),$("#imgList").on("mouseout",e.mouseout),$("#newActive").on("click",e.createActive),tabinit(),e.getPage(function(){pageInit(parseInt(t.pageNum),12,function(t){return 0==t?!1:void e.getActiveData(t)})})},tabBanner:function(){clearTimeout(t.timer),t.now=$(this).index();var i=$("#dotList"),a=$("#imgList");i.find("li").removeClass("active"),$(this).addClass("active"),a.find("a").removeClass("active"),a.find("a").eq($(this).index()).addClass("active"),e.autoTab()},autoTab:function(){t.timer=setInterval(function(){var e=$("#dotList"),i=$("#imgList");t.now++,t.now>=e.find("li").length&&(t.now=0),e.find("li").removeClass("active"),e.find("li").eq(t.now).addClass("active"),i.find("a").removeClass("active"),i.find("a").eq(t.now).addClass("active")},3e3)},tabGroupByType:function(){$("#groupByType").find("li").removeClass("active"),$(this).addClass("active"),t.type=$(this).data("type"),e.getPage(function(){pageInit(t.pageNum,12,function(t){e.getActiveData(t)})})},tabGroupByTime:function(){$("#groupByTime").find("li").removeClass("active"),$(this).addClass("active"),t.time=$(this).data("time"),e.getPage(function(){pageInit(t.pageNum,12,function(t){e.getActiveData(t)})})},mouseover:function(){clearTimeout(t.timer)},mouseout:function(){e.autoTab()},createActive:function(){$("#mask").show()},getPage:function(e){$.ajax({url:"./index.php?m=Home&c=Active&a=activetype",type:"get",dataType:"json",data:{type:t.type,time:t.time,p:1},success:function(i){t.pageNum=i.data.page,e()},error:function(){}})},getActiveData:function(e){$.ajax({url:"./index.php?m=Home&c=Active&a=activetype",type:"get",dataType:"json",data:{type:t.type,time:t.time,p:e},success:function(t){var e=t.data.data,i="";if(0==t.data.page)return $("#itemlist").html(i),!1;for(var a=0,n=e.length;n>a;a++)i+='<li><a href="./index.php?m=Home&c=Active&a=active_details&id='+e[a].id+'"><img src="./Uploads'+e[a].img+'"><div class="tags"><h3>'+e[a].title+"</h3><p>"+e[a].begin_time+"-"+e[a].last_time+'</p></div><sub></sub></a><div class="desc"><span class="txt">'+e[a].content+'</span><div><span class="num">'+e[a].concern+'</span><i class="focus"></i></div></div></li>';$("#itemlist").html(i)},error:function(){}})}};e.init()});