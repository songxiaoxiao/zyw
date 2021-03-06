$(function(){
  var scope = {
    followId : 0
  };
  var page = {
    init: function(){
      $(".comment").on("click",".itemreplybutton",page.replycomment);
      $(".comment").on("click",".replybutton",page.subreply);
      $("#mainreply").on("click",page.submit);
      $(".inputsection form").on("submit",page.subSubmit)
    },
    subSubmit: function(){
      if(!/^.+$/.test($(this).find(".replytext").val())){
        alert("请输入内容");
        return false;
      }
      var _this = this;
      $.ajax({
        type: "post",
        url: "./index.php?m=Home&c=Rice&a=comment",
        data: {
          fid: $(_this).data("id"),
          cid: $(_this).data("cid"),
          postid: $(".webmain").data("id"),
          content: $(_this).find(".replytext").val()
        },
        dataType: "json",
        success: function(json){
            console.log(json.msg);
          if(json.status === 0){
            window.location.reload()
          }else if(json.status === 101){
            alert("发布失败，请稍后再试")
          }else if(json.status === 102){
            alert("请登录或稍后再试")
          } else {
            alert(json.msg)
          }
        },
        error: function(){

        }
      })
      return false;
    },
    submit: function(){
      if(!$("#mainreplycontent").val()){
        alert("请输入内容");
        return false;
      }
      $.ajax({
        type: "post",
        url: "./index.php?m=Home&c=Rice&a=comment",
        data: {
          fid: 0,
          postid: $(".webmain").data("id"),
          content: $("#mainreplycontent").val()
        },
        dataType: "json",
        success: function(json){
            console.log(json.msg);
          if(json.status === 0){
            window.location.reload()
          }else if(json.status === 101){
            alert("发布失败，请稍后再试")
          }else if(json.status === 102){
            alert("请登录或稍后再试");
          } else {
            alert(json.msg)
          }
        },
        error: function(){

        }
      })
    },
    replycomment: function(){
      if($(this).parents(".outeritem").find(".inputsection").css("display") === "none"){
      $(this).parents(".outeritem").find(".inputsection").show().find(".replytext")[0].focus();
      $(this).parents(".outeritem").find(".replytext").val("@"+$(this).parents(".outeritem").data("name")+" ")
      $(this).parents(".outeritem").find(".replytext").val("");
      $(this).parents(".outeritem").find(".inputsection").find("form").data("id",$(this).data("id"))
      $(this).parents(".outeritem").find(".inputsection").find("form").data("cid",$(this).data("cid"))

    }else{
      $(this).parents(".outeritem").find(".inputsection").hide();
      $(this).parents(".outeritem").find(".replytext").val("");
    }
    },
    subreply: function(){
      $(this).parents(".outeritem").find(".replytext").val("@"+$(this).parents(".itemreply").data("name")+" ")
      $(this).parents(".outeritem").find(".inputsection").show().find(".replytext")[0].focus();
      $(this).parents(".outeritem").find(".inputsection").find("form").data("id",$(this).data("id"))
      $(this).parents(".outeritem").find(".inputsection").find("form").data("cid",$(this).data("cid"))
    }

  };
  page.init();
})
