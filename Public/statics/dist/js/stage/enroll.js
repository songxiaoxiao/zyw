$(function(){var e={faceReview:"",expReview:"",representReview:""},t={init:function(){$("#form").on("submit",t.formSubmit),$("#face").on("change",t.changeFace),$("#exp").on("change",t.changeExp),$("#represent").on("change",t.changeRepresent)},changeFace:function(){e.faceReview=window.URL.createObjectURL(this.files[0]),$("#faceReview").attr("src",e.faceReview)},changeExp:function(){e.expReview=window.URL.createObjectURL(this.files[0]),$("#expReview").attr("src",e.expReview)},changeRepresent:function(){e.representReview=window.URL.createObjectURL(this.files[0]),$("#representReview").attr("src",e.representReview)},intitCropper:function(){var e=new Cropper({element:document.getElementById("mypic-target"),aspectRatio:.6875,previews:[document.getElementById("mypic-large")],onCroppedRectChange:function(e){console.log(e)}}),t=document.getElementById("mypic");t.onchange=function(){if("undefined"!=typeof FileReader){var a=new FileReader;a.onload=function(t){e.setImage(t.target.result)},t.files&&t.files[0]&&a.readAsDataURL(t.files[0])}else{t.select(),t.blur();var n=document.selection.createRange().text;e.setImage(n)}}},formSubmit:function(){return/^.+$/.test($(":text[name=acname]").val())?$(":radio[name='acsex']:checked").length?/^.+$/.test($(":text[name='acbirthday']").val())?/^\d+$/.test($(":text[name='acheight']").val())?/^\d+$/.test($(":text[name='acweight']").val())?/^.+$/.test($(":text[name='acschool']").val())?/^1[345678]\d{9}$/.test($(":text[name='phone']").val())?/^.+$/.test($(":text[name='accity']").val())?e.faceReview?e.expReview?e.representReview?e.faceReview?/^.+$/.test($(":text[name='title']").val())?/^http.+$/.test($(":text[name='href']").val())?/^.+$/.test($("textarea[name='comment']").val())?void 0:(alert("请填入代表作简介"),!1):(alert("请填入代表作视频链接"),!1):(alert("请填入代表作标题"),!1):(alert("请上传个人照片"),!1):(alert("请上传代表作封面"),!1):(alert("请上传演艺经历"),!1):(alert("请上传个人照片"),!1):(alert("请填入联系地址"),!1):(alert("请填入手机"),!1):(alert("请填入最高学历"),!1):(alert("请填入体重"),!1):(alert("请填入身高"),!1):(alert("请填入生日"),!1):(alert("选择性别"),!1):(alert("请填入姓名"),!1)}};t.init()});