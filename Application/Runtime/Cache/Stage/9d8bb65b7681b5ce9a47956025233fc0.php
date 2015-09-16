<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE HTML>
<!--[if lt IE 7 ]><html class="ie6 ieOld"><![endif]-->
<!--[if IE 7 ]><html class="ie7 ieOld"><![endif]-->
<!--[if IE 8 ]><html class="ie8 ieOld"><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html><!--<![endif]-->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>首页</title>
<meta name="Keywords" content="">
<meta name="Description" content="">
<link href="/zyw/Public/login/style/reset.css" rel="stylesheet" type="text/css" />
<link href="/zyw/Public/login/style/base.css" rel="stylesheet" type="text/css" />
<style>html, body { height: 100%; overflow: hidden;}</style>

</head>
  <script type="text/javascript">
    function changeVerify(){
        var randomnum = Math.random();
        var img       = document.getElementById('codepic');
        img.src       = "/index.php?m=Ding&c=Index&a=verify";
    }
    </script>
<body>

	

	<div class="loginBox" id="loginBox">
		<div class="header">
			<h1>中演网后台登陆</h1>
			<h2><span>LOGIN</span>登录</h2>
		</div>
		<div class="inner">
			<form class="form" id="form" method='post' action='/index.php?m=Ding&c=Index&a=index'>
				<fieldset>
					<div class="l">
						<div class="i"><input type="text" id="username" name="user" class="input w320" placeholder="用户名" /></div>
					</div>
					<div class="l">
						<div class="i"><input type="password" id="password" name="pw" class="input w320" placeholder="密码" /></div>
					</div>
					<div class="l c">
						<div class="i mr10">
							<input type="text" class="input w170" id="code" name="code" placeholder="验证码" />
						</div>
						<div class="i mr0">

							<img id="codepic" src="/index.php?m=Ding&c=Index&a=verify" onclick="changeVerify()"/>

						</div>
					</div>
					
					<div class="l submit">
						<div class="i">
								
							<input type="submit" class="btnA" value="登录" id="submit" name='submit'/>
						</div>
					</div>
				</fieldset>
			</form>
		</div>
	</div>



	
	
	<script type="text/javascript" src="/zyw/Public/login/js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="/zyw/Public/login/js/common.js"></script>
	<script type="text/javascript" src="/zyw/Public/login/js/login.js"></script>







</body>
</html>