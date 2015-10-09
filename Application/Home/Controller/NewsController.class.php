<?php
namespace Home\Controller;
use Think\Controller;
class NewsController extends ComController {
    public function index(){
		$news=  M('news');
		//echo $_SERVER['DOCUMENT_ROOT'];
		//var_dump($_SERVER);
		//形象指数
		$resultX=$news->where('type=1 and status!=0')->limit('0,13')->order(array('order'=>'desc','instime'=>'desc'))->select();
		//var_dump($resultX);
		$this->assign('resultX',$resultX);
		//形象指数end
		
		
		//星闻动向
		$resultD=$news->where('type=2 and status!=0')->limit('0,9')->order(array('order'=>'desc','instime'=>'desc'))->select();
		//echo $news->getLastsql();
		//var_dump($resultD);
		$this->assign('resultD',$resultD);
		//星闻动向end
		
		
		//艺术中国梦
		$resultM=$news->where('type=3 and status!=0')->limit('0,3')->order(array('order'=>'desc','instime'=>'desc'))->select();
		$this->assign('resultM',$resultM);
		//艺术中国梦end

		//banner
		$banner = M('banner');
		$bannerval = $banner->select();
		
		//
		foreach ($bannerval as $key => $value) {
			$bannerval[$key]['href'] = 'http://m2.nadoo.cn/p/zyw/index.php?m=Home&c=News&a=news_details&id='.$value['newsid'];
		}
		$this->assign('bannerval',$bannerval);
		
		$this->display('news');
    }
    /*新闻详情页
	
    */
	 public function news_details(){
		 //内容
		 $id=intval($_GET['id']);
		 $news=  M('news');
		 $result=$news->where('id ='.$id)->find();
		 $this->assign('result',$result);
		 //热点
		 $hotnews=$news->limit('0,5')->order(array('order'=>'desc','instime'=>'desc'))->select();
		 $this->assign('hotnews',$hotnews);
		 $this->display('news_details');
	 }
	 //艺术中国梦
	 public function news_dream(){

	 	$this->display();
	 }
	 //今日焦点
	 public function news_fans(){
	 	$news = M('news');
	 	$newsval = $news->where('type=1')->select();
	 	$this->assign('newsval',$newsval);
	 	
	 	$this->display();
	 }
	 //星闻动向
	 public function news_star(){
	 	$this->display();
	 }
}