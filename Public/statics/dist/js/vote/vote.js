$(function(){var a={color1:1,sex1:1,color2:1,sex2:1},t={init:function(){$("#J_CommentSendbox .submit").on("click",t.commentSendClick),$("#J_ConRule .tab a").on("click",t.ruleTabClick),$("#groupColorList").on("click","li",t.loadStar),$("#groupSexList").on("click","li",t.loadStar),$("#conStarGroup").on("click","li",t.swtichTab),$("#judgeRuleName").on("click","li",t.swtichRule),$("#colorlist1").on("click","li",t.tabType1),$("#sexlist1").on("click","li",t.tabSex1),$("#colorlist2").on("click","li",t.tabType2),$("#sexlist2").on("click","li",t.tabSex2),t.refleshgroup1(),t.refleshgroup2(),t.initStar()},tabSex1:function(){$("#sexlist1").find("li").removeClass("active"),$(this).addClass("active"),a.sex1=$(this).data("sex"),t.refleshgroup1()},tabType1:function(){$("#colorlist1").find("li").removeClass("active"),$(this).addClass("active"),a.color1=$(this).data("color"),t.refleshgroup1()},refleshgroup1:function(){$.ajax({url:"./index.php?m=Home&c=Vote&a=wininter&condition=36",type:"get",dataType:"json",data:{groupid:a.color1,sex:a.sex1},success:function(a){if(102==a.status)$(".successlist").hide();else if(0==a.status){for(var t="",e=0,i=a.data.length;i>e;e++)t+='<div class="item"><a href="#'+a.data[e].id+'" class="hover"></a><img class="img1" src="'+a.data[e].headimg+'" alt="" /><div class="text"><h1>'+a.data[e].name+"</h1><h3>当前票数:"+a.data[e].votes+"</h3></div></div>";$("#group1").html(t),$("#content1commet").hide()}}})},tabSex2:function(){$("#sexlist2").find("li").removeClass("active"),$(this).addClass("active"),a.sex2=$(this).data("sex"),t.refleshgroup2()},tabType2:function(){$("#colorlist2").find("li").removeClass("active"),$(this).addClass("active"),a.color2=$(this).data("color"),t.refleshgroup2()},refleshgroup2:function(){$.ajax({url:"./index.php?m=Home&c=Vote&a=wininter&condition=36",type:"get",dataType:"json",data:{groupid:a.color2,sex:a.sex2},success:function(a){if(102==a.status)$(".successlist").hide();else if(0==a.status){var t="";console.log(a.data);for(var e=0,i=a.data.length;i>e;e++)t+='<div class="item"><a href="#'+a.data[e].id+'" class="hover"></a><img class="img1" src="'+a.data[e].headimg+'" alt="" /><div class="text"><h1>'+a.data[e].name+"</h1><h3>当前票数:"+a.data[e].votes+"</h3></div></div>";$("#group2").html(t)}}}),$.ajax({url:"./index.php?m=Home&c=Vote&a=wininter&condition=6",type:"get",dataType:"json",data:{},success:function(a){if(console.log(a.status),102==a.status)$("#finallylist").hide();else if(0==a.status){console.log(a.data.length);for(var t="",e=0,i=a.data.length;i>e;e++)"红组"==a.data[e].groupid?t+='<div class="item"><a href="#'+a.data[e].id+'"></a><img src="'+a.data[e].headimg+'" alt="" /><div class="frame"></div><span class="name">'+a.data[e].name+'</span><div class="group redgroup">红组</div><p class="vote">总票数</p><p class="num">'+a.data[e].votes+"</p></div>":"蓝组"==a.data[e].groupid?t+='<div class="item"><a href="#'+a.data[e].id+'"></a><img src="'+a.data[e].headimg+'" alt="" /><div class="frame"></div><span class="name">'+a.data[e].name+'</span><div class="group bluegroup">蓝组</div><p class="vote">总票数</p><p class="num">'+a.data[e].votes+"</p></div>":"绿组"==a.data[e].groupid&&(t+='<div class="item"><a href="#'+a.data[e].id+'"></a><img src="'+a.data[e].headimg+'" alt="" /><div class="frame"></div><span class="name">'+a.data[e].name+'</span><div class="group greengroup">绿组</div><p class="vote">总票数</p><p class="num">'+a.data[e].votes+"</p></div>"),console.log(t),$("#finallygroup").html(t);$("#content2commet").hide()}}})},ruleTabClick:function(){var a=$(this).data("i");$("#J_ConRule .inner .content").hide(),$("#J_ConRule .inner .content"+a).show(),$("#J_ConRule .tab a.c").removeClass("c"),$(this).addClass("c")},swtichRule:function(){$("#judgeRuleName").find("li").removeClass("active"),$(this).addClass("active");var a=$(this).index();$("#judgeRuleContent").find("li").hide(),$("#judgeRuleContent").find("li").eq(a).show()},hover:function(a){"mouseenter"==a.type?$(this).find(".hover").stop(!0,!0).fadeIn(100):$(this).find(".hover").stop(!0,!0).fadeOut(100)},voteIn:function(){$(this).find(".hover").stop(!0,!0).fadeIn(300),$(this).find(".txt").stop(!0,!0).fadeOut(100)},voteOut:function(){$(this).find(".hover").stop(!0,!0).fadeOut(100),$(this).find(".txt").stop(!0,!0).fadeIn(100)},commentSendClick:function(a){var t=$.trim($("#J_CommentSendbox textarea").val());if(""==t)alert("请输入评论内容");else{var e="<div class='item clearFix'><div class='head'><img src='"+STATIC_FILE_ROOT+"statics/images/p/a10.jpeg' /></div><div class='info'><span>V网友：清晰白阳2 发表日期：2015-06-07 19:56</span><p>"+t+"</p></div></div>";$("#J_CommentList").prepend(e),$("#J_CommentSendbox textarea").val("")}},swtichTab:function(){$("#conStarGroup").find("li").removeClass("active"),$(this).addClass("active");var a=$(this).index();$("#starGroups").find(".group").hide(),$("#starGroups").find(".group").eq(a).show()},loadStar:function(){$(this).parent().find("li").removeClass("active"),$(this).addClass("active");var a=$("#groupColorList").find(".active").data("color"),e=$("#groupSexList").find(".active").data("sex");$.ajax({type:"get",dataType:"json",data:{url:"/index.php?m=Home&c=Vote&",a:a,sex:e},success:function(a){if(0==a.status){for(var e="",i=0;i<a.data.length;i++)e+='<a href="./index.php?m=Home&c=Performing&a=actorinfo&id='+a.data[i].id+'"><div class="item">                            <div class="vote hover">                                <p>扫描二维码投票</p>                                <img src="'+a.data[i].codeimg+'"/>                                </div>                                <div class="txt">                                <p>'+a.data[i].name+"</p>                        <span>当前票数："+a.data[i].votes+'</span>                        </div>                        <img src="./Uploads'+a.data[i].img+'"/>                            </div></a>';$("#insertgroup").html(e),$("#J_ConVote .inner .item").off().hover(t.voteIn,t.voteOut)}}})},initStar:function(){$.ajax({type:"get",dataType:"json",data:{url:"/index.php?m=Home&c=Vote&",a:"redgroup",sex:"2"},success:function(a){if(0==a.status){for(var e="",i=0;i<a.data.length;i++)e+='<a href="./index.php?m=Home&c=Performing&a=actorinfo&id='+a.data[i].id+'"><div class="item">                            <div class="vote hover">                                <p>扫描二维码投票</p>                                <img src="'+a.data[i].codeimg+'"/>                                </div>                                <div class="txt">                                <p>'+a.data[i].name+"</p>                        <span>当前票数："+a.data[i].votes+'</span>                        </div>                        <img src="./Uploads'+a.data[i].img+'"/>                            </div></a>';$("#insertgroup").html(e),$("#J_ConVote .inner .item").off().hover(t.voteIn,t.voteOut)}else alert(a.msg)}})}};t.init()});