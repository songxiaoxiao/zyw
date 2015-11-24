<?php
namespace Home\Common;

/**
 * $qq = new \Home\Common\Weixin();*/
class Weixin{
    public $Appid;
    public $AppSecret;
    public $callback;
    public $code;
    public $state;
    public function __construct(){
        //接收从登陆页返回来的值
        //$this->code = isset($_REQUEST['code'])? $_REQUEST['code'] : '';
        //$this->state = isset($_REQUEST['state'])? $_REQUEST['state'] : '';
        //将参数赋值给成员属性
        $this->Appid = 'wx891ba79c70766c9b';
        $this->AppSecret = 'd4624c36b6795d1d99dcf0547af5443d';
        //$this->callback = '';
    }
    /**
     * 获取access_token值
     * @return array 返回包含access_token,过期时间的数组
     * */
    public function get_token(){
        $url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=".$this->app_id."&client_secret=".$this->app_key."&code=".$this->code."&redirect_uri=".urlencode($this->callback);
        $str = $this->http_get($url);//访问url获得返回值
        parse_str($str,$arr);
        return $arr;
    }
    /**
    *
    */
    /**
     * GET 请求
     * @param string $url
     */
    private function http_get($url){
        $oCurl = curl_init();
        if(stripos($url,"https://")!==FALSE){
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, FALSE);
        }
        curl_setopt($oCurl, CURLOPT_URL, $url);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
        $sContent = curl_exec($oCurl);
        $aStatus = curl_getinfo($oCurl);
        curl_close($oCurl);
        if(intval($aStatus["http_code"])==200){
            return $sContent;
        }else{
            return false;
        }
    }
    
    /**
     * POST 请求
     * @param string $url
     * @param array $param
     * @return string content
     */
    private function http_post($url,$param){
        $oCurl = curl_init();
        if(stripos($url,"https://")!==FALSE){
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, false);
        }
        if (is_string($param)) {
            $strPOST = $param;
        } else {
            $aPOST = array();
            foreach($param as $key=>$val){
                $aPOST[] = $key."=".urlencode($val);
            }
            $strPOST =  join("&", $aPOST);
        }
        curl_setopt($oCurl, CURLOPT_URL, $url);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($oCurl, CURLOPT_POST,true);
        curl_setopt($oCurl, CURLOPT_POSTFIELDS,$strPOST);
        $sContent = curl_exec($oCurl);
        $aStatus = curl_getinfo($oCurl);
        curl_close($oCurl);
        if(intval($aStatus["http_code"])==200){
            return $sContent;
        }else{
            return false;
        }
    }
 }
 
?>