function setCookie(e,t){var o=30,n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3),document.cookie=e+"="+escape(t)+";expires="+n.toGMTString()}function getCookie(e){var t,o=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(o))?unescape(t[2]):null}function delCookie(e){var t=new Date;t.setTime(t.getTime()-1);var o=getCookie(e);null!=o&&(document.cookie=e+"="+o+";expires="+t.toGMTString())}function setCookie(e,t,o){var n=getsec(o),i=new Date;i.setTime(i.getTime()+1*n),document.cookie=e+"="+escape(t)+";expires="+i.toGMTString()}function getsec(e){alert(e);var t=1*e.substring(1,e.length),o=e.substring(0,1);return"s"==o?1e3*t:"h"==o?60*t*60*1e3:"d"==o?24*t*60*60*1e3:void 0}var username=document.cookie.split(";")[0].split("=")[1];setCookie("name","hayden"),alert(getCookie("name")),setCookie("name","hayden","s20");