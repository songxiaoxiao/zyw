<?php
namespace Stage\Controller;
use Think\Controller;
//活动类
class ActiveController extends ComController {
    //首页显示
    public function index(){
		$this->vercklogin();

		$data['status'] = 1;
		$active = M('active');
		//分页显示
		
		$count      = $active->where($data)->count();// 查询满足要求的总记录数
		$Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(25)
		$show       = $Page->show();// 分页显示输出
		// 进行分页数据查询 注意limit方法的参数要使用Page类的属性
		$result = $active->where($data)->limit($Page->firstRow.','.$Page->listRows)->order('begin_time desc')->select();
		$this->assign('result',$result);// 赋值数据集
		$this->assign('page',$show);// 赋值分页输出


		$this->assign('cur',6);
        $this->display();
    }
    //修改活动信息
    public function upactive(){
    	$submit = I('post.submit');
    	$active = M('active');
    	if(empty($submit)){
			$id = trim(I('get.id'));
	    	$activeval = $active->where('id='.$id)->find();
	    	$this->assign('activeval',$activeval);
	    	$this->assign('cur',6);
	    	$this->display();
    	}else{

    		$data['title']        = I('post.title');
    		$data['img']          = I('post.imgpath');
    		$data['content']      = I('post.content');
    		$data['phone']        = I('post.phone');
    		$data['begin_time']   = strtotime(I('post.begin_time'));
    		$data['last_time']    = strtotime(I('post.last_time'));
    		$data['id']           = I('post.id');
    		$data['linetype']    = I('post.line_type');
    		if($data['linetype'] == 0){
				$data['line_address'] = I('post.line_address');
    		}
    		$span = $data['last_time']-$data['begin_time'];
    		if($span < 0){
    			$this->error('活动结束日期不可比开始日期早');
    		}
    		$data['week'] = $this->isWeek($data['begin_time'],$data['last_time']);

    		$data['info'] = I('post.info');
    		$a = $this->checkDump($data);
    		if(!$a){
    			$this->error('活动主体信息不可为空');
    		}
    		$data['sponsor_name'] = I('post.sponsor_name');
    		$data['sponsor_phone'] = I('post.sponsor_phone');
    		$data['sponsor_address'] = I('post.sponsor_address');
    		$data['sponsor_email'] = I('post.sponsor_email');
    		$data['order'] = I('post.order');
    		$sign = $active->save($data);
    		if($sign){
    			$this->success('活动修改成功',U('Active/index'));
    		}else{
    			$this->error('活动修改失败');
    		}
    	}
    }
    //删除活动
    public function delactive(){
    	$id = I('get.id');
    	$active = M('active');
    	$data['status'] = 0;
    	$sign = $active->where('id='.$id)->save($data);
    	if($sign){
    		$this->success('删除成功',U('Active/index'));
    	}else{
    		$this->error('未删除任何数据');
    	}
    }
	
}