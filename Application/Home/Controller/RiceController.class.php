<?php
namespace Home\Controller;
use Think\Controller;
//首页类
class RiceController extends ComController {
    public function index(){
    	$this->assign('sign',6);
        $this->display();
    }


}