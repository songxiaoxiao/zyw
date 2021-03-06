<?php
namespace Stage\Controller;
use Think\Controller;
//首页类
class IndexController extends Controller {
    //登陆 zyw916
    public function index (){
        $submit= I('post.submit');
        if(empty($submit)){
            $this->assign('verify',$verify);
            $this->display('login');
        }else{
        $code=I('post.code');
            $a=$this->check_verify($code);
            if($a){
                $data['name']= I('post.user');
                $data['passwd']=md5(I('post.pw'));
                $user = M('admin');
                $userval = $user->where($data)->find();
                //echo $user->getlastsql();die();
                if($userval){
                   // $uid = md5('xxxzyw916');
                    session('uid',$userval['id']);
                    session('name',$data['name']);
                    $admin_online = M('admin_online');
                    $line['admin'] = $data['name'];
                    $line['admid'] = $userval['id'];
                    $line['instime'] = time();
                    $line['outime'] = time();
                    $id = $admin_online->add($line);
                    session('outimeid',$id);
                    $this->success('登陆成功',U('Gactor/index'),2);
                    //$this->redirect('New/category', array('cate_id' => 2), 5, '页面跳转中...');
                }else{
                    //echo $user->getlastsql();die();
                    $this->error('登陆失败',U('Index/index'),2);
                }
            }else{
                $this->error('验证码输入错误',U('Index/index'),2);
            }
            
        }
        
    }
    //退出
    public function loginout(){
        $online = M('admin_online');
        $data['outime'] = time();
        $online->where('id='.session('outimeid'))->save($data);
        session(null);
        //echo '退出';

        $this->success('安全退出',U('Index/index'));
    }
    //修改密码
    public function uppasswd(){
        $oldp = I('post.oldp','','md5');
        $data['passwd'] = I('post.newp','','md5');
        $admin = M('admin');
        $where = array(
            'name'   =>session('name'),
            'passwd' =>$oldp
            );
        $adminval = $admin->where($where)->find();
       
        if($adminval){
            $sign = $admin->where('id='.$adminval['id'])->save($data);

            if($sign){
                ajaxReturn(0,'修改成功','');
            }else{
                ajaxReturn(1,'未修改成功',$admin->getlastsql());
            }
            
        }else{
            ajaxReturn(102,'旧密码不正确','');
        }

    }
    //验证码
    public function verify(){
        //ob_start();
        ob_end_clean();
        $Verify = new \Think\Verify();
        $Verify->entry();
    }
    function check_verify($code){  
        $verify = new \Think\Verify();   
        return $verify->check($code);
    }

}