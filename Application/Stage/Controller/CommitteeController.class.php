<?php
// 
namespace Stage\Controller;
use Think\Controller;
class CommitteeController extends ComController {
	//首页显示
	public function index(){
		$committee  = M('committee');
		$commitval = $committee->where('status = 1')->select();
		$this->assign('commitval',$commitval);
		var_dump($commitval);
		$this->assign('cur',7);
		$this->display();
		//echo $ip = get_client_ip();
	}
	public function add(){

	}

}