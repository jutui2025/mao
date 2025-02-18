//定义全局变量
const baseUrl     = 'https://m.sungua.net/admin/api/api_1010.php';//'http://127.0.0.1/admin/api/api.php'//
var TimerInit     = null;
var token    = '';//全局的登录TOKEN
var setStorageKEY ={
	wx_token :'token',//储存微信登录的状态的key 值为Boolean值
}

/**
 * 检查微信登录
 */
const checkLogin=()=>{
	// // #ifdef H5
	// 	return true;
	// // #endif
	console.log("getStorageSync")
	var tmp = uni.getStorageSync(setStorageKEY.wx_token);
	if (!tmp) {
		return false;
	}
	token = tmp.value;
	return token=='' ? false:true;
}


  /**
   * 数组序列化URL
   */
const converToUrl = (requestParams,isUrl=true) => {
  let params = [];
  Object.entries(requestParams).forEach(([key, value]) => {
      let param = key + '=' + value;
      params.push(param);
  });
  if(isUrl==true){
	return '?' + params.join('&');
  }
  
  return  params.join('&');
}
 
 /**
  * 保存token
  */
  const setToken= (key) =>{
 	token = key;
 	uni.setStorage({
 		key: setStorageKEY.wx_token,
 		data: {value:key},
 		success: function () {
 			console.log("登录成功"+key)
 		}
 	});
  }
/**
 * 消息弹窗
 * @author yj
 * 
 * @param {String} title: 标题
 * @param {String} icon: toast显示的图标, 可选值: success/error/fail/exception/loading/none
 * @param {Number} duration: 窗口动画持续时间, 单位为ms
 */
const toast = (title, icon = 'none', duration = 2000) => {
  uni.showToast({
    title,
    duration,
    icon
  });
}
/**
 * 显示模态弹窗
 * @author yj
 * 
 * @param {String} title: 标题
 * @param {String} icon: toast显示的图标, 可选值: success/error/fail/exception/loading/none
 * @param {Number} duration: 窗口动画持续时间, 单位为ms
 */
const showModal = (title,content, success,showCancel=false) => {
  uni.showModal({
    title,
	content,
	showCancel,
	success
  });
}
 
 
/**
 * 保留当前页面，跳转到应用内的某个页面
 * @author yj
 * 
 * @param {String} url: 需要跳转的应用内非 tabBar 的页面的路径
 * @param {String} animationType: 窗口显示的动画效果
 * @param {Number} animationDuration: 窗口动画持续时间，单位为 ms
 */
const goto = (url, emit='',animationType = 'pop-in', animationDuration = 300) => {
  uni.navigateTo({
    url:url,
    animationType:animationType,
    animationDuration:animationDuration,
    success: function(res) {
		if(emit){
			res.eventChannel.emit(emit.emit_name,emit.emit_value)
		}
	},
    fail: function(e) {}
  })
}
 /**
  * 关闭当前页面，跳转到应用内的某个页面。
  * @author yj
  * 
  * @param {String} url: 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
  */
const redirectTo = (url,success_fun) => {
   uni.redirectTo({
     url:url,
     success: function(res) {
		 if(success_fun){
			 success_fun()
		 }
	 },
     fail: function(e) {console.log(e)}
   })
 }
/**
 * 关闭当前页面，返回上一页面或多级页面
 * @author yj
 * 
 * @param {String} url: 需要跳转的应用内非 tabBar 的页面的路径
 * @param {String} animationType: 窗口显示的动画效果
 * @param {Number} animationDuration: 窗口动画持续时间，单位为 ms
 */
const goback = (emit='',delta = 1, animationType = 'pop-out', animationDuration = 300) => {
 
 
  uni.navigateBack({
    delta,
    animationType,
    animationDuration,
    success: function(res) {
		
	},
    fail: function(e) {}
  })
}
/**
 * 跳转tab页面
 * @param {string} url:欲跳转的tab地址。不是tab地址会跳转失败
 * @param {string} emit_nama:向跳转页面发送信息的name键
 * @param {string} emit_value:向跳转页面发送信息的value值 json格式 ：{content:that.optionData.text}
 * */
const switchTab =(url,emit='')=>{
	uni.switchTab(
	{
		url:url,
		success:function(res){
			if(emit){
				uni.$emit(emit.emit_nama,emit.emit_value)
			}
		}
	})
}

			/**
			 * 获取系统信息，用以判断是否微信内或其他sdk
			 * */
			function getAppBaseInfo(){
				var AppBaseInfo = uni.getAppBaseInfo();
				console.log(JSON.stringify(AppBaseInfo))
				//QQ的返回
				//{"fontSizeSetting":17,"language":"zh_CN","fontSizeScaleFactor":1,"version":"8.0.15","SDKVersion":"2.20.3","enableDebug":false,"host":{"env":"SDK","appId":"wxf0a80d0ac2e82aa7","version":302056976},"mode":"default","appId":"__UNI__39356A3","appName":"抽签助手","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","hostVersion":"8.0.15","hostLanguage":"zh-CN","hostName":"SDK","hostSDKVersion":"2.20.3"}
				//微信的返回
				//{"fontSizeSetting":17,"language":"zh_CN","fontSizeScaleFactor":1,"version":"8.0.32","SDKVersion":"2.30.0","enableDebug":false,"host":{"env":"WeChat","appId":"","version":402661426},"mode":"default","appId":"__UNI__39356A3","appName":"抽签助手","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","hostVersion":"8.0.32","hostLanguage":"zh-CN","hostName":"WeChat","hostSDKVersion":"2.30.0"}
				//微信模拟器返回
				//{"version":"8.0.5","language":"zh_CN","SDKVersion":"2.29.1","enableDebug":false,"fontSizeScaleFactor":0.75,"fontSizeSetting":16,"mode":"default","host":{"appId":"wxb812e2697195c7e7","env":"devtools","version":"1.06.2301160"},"appId":"__UNI__F847AC0","appName":"祝福语","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","hostVersion":"8.0.5","hostLanguage":"zh-CN","hostName":"devtools","hostSDKVersion":"2.29.1"}
				//浏览器返回
				//{"appId":"__UNI__39356A3","appName":"抽签助手","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","enableDebug":false,"hostName":"safari","hostVersion":"11.0","hostLanguage":"zh-CN","language":"zh-CN","SDKVersion":"","version":""}
				if(AppBaseInfo.host == undefined){
					return ''
				}else{
					return AppBaseInfo.host.appId
				}
				
			}
			
			
			
const wx_login = (type='wx_login',retFun,fn_complete)=>{
	
	// #ifdef H5
		setToken('rCqYbSsXdaXGEvVGNnTMvCNRVFsmYNEI');
		if(retFun){
			retFun();
		}
	// #endif
	
	// #ifdef MP-WEIXIN
		wx.login({
		  success (res) {
			if (res.code) {
				get_request(
				 {
					 type:type,
					 js_code:res.code,
					 app : 1
				 },
				 (e)=>{
					setToken(e.token);
					if(retFun){
						retFun();
					}
				 },
				 ()=>{
					if(fn_complete){
						fn_complete();
					}
				 }
				 );
			} else {
				toast('登录失败！' + res.errMsg)
			}
		  }
		})
	// #endif
}
/**
 * 获取使用次数并回调
 * @author yj
 * 
 * @param {String} data: {type: type}
 * @param {String} retFun: 返回的数据
 */
const get_request = (data ,retFun,fn_complete,showLoading=true,host="") => {

	if(showLoading==true){
		uni.showLoading({
			title: '加载中',
			mask : true
		});
	}
	lib (data,retFun,fn_complete,showLoading,host);
}
	function lib (data ,retFun,fn_complete,showLoading=true,host=""){
		var tmp_data = data;
		tmp_data.token = token;
		// #ifndef H5
			tmp_data.appid = uni.getAccountInfoSync().miniProgram.appId;
		// #endif
		// #ifdef H5
			tmp_data.appid = 1;
		// #endif
		var body = converToUrl(tmp_data,false)
		var urlHost = host=="" ? baseUrl:host;
		uni.request({
			url: urlHost, 
			method:'POST',
			data: body,
			header: {
				'content-type':'application/x-www-form-urlencoded' ,
			},
			success: (res) => {
				if(showLoading==true){
					uni.hideLoading({
						  fail: function(e) {}
					});
				}
				if(res.data.code == 301){
					uni.removeStorageSync(setStorageKEY.wx_token);
					token =''
					toast(res.data.msg);
					goto('/pages/list');
					return ;
					
				}
				if(undefined == res.data.code){
					toast("网络出错了...");
					if(fn_complete){
						fn_complete();
					}
					return ;
				}
				if(res.data.code == 101010){
					uni.showModal({
						title:'提示',
						content:res.data.msg,
						showCancel:false,
						confirmText:'知道啦',
						success: () => {
							if(fn_complete){
								fn_complete(res.data);
							}
						}
					});
					return ;
				}
				if(res.data.code != 0){
					toast(res.data.msg);
					if(fn_complete){
						fn_complete(res.data);
					}
					return ;
				}
				retFun && retFun(res.data);
			}
		});
	}
/**
 * 保存数据至本地缓存
* @param {string} key :保存的标志，- id
* @param {string} data :保存的数，
 */
const funsetStorage = (Key,data)=>{
		uni.setStorage({
			key: Key,
			data: data,
			success: function () {
			}
		});
	}
	
			/**
			 * 获取系统信息，用以判断是否微信内或其他sdk
			 * */
const getAppISWeChat=()=>{
				var AppBaseInfo = uni.getAppBaseInfo();
				console.log(AppBaseInfo.host)
				//QQ的返回
				//{"fontSizeSetting":17,"language":"zh_CN","fontSizeScaleFactor":1,"version":"8.0.15","SDKVersion":"2.20.3","enableDebug":false,"host":{"env":"SDK","appId":"wxf0a80d0ac2e82aa7","version":302056976},"mode":"default","appId":"__UNI__39356A3","appName":"抽签助手","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","hostVersion":"8.0.15","hostLanguage":"zh-CN","hostName":"SDK","hostSDKVersion":"2.20.3"}
				//微信的返回
				//{"fontSizeSetting":17,"language":"zh_CN","fontSizeScaleFactor":1,"version":"8.0.32","SDKVersion":"2.30.0","enableDebug":false,"host":{"env":"WeChat","appId":"","version":402661426},"mode":"default","appId":"__UNI__39356A3","appName":"抽签助手","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","hostVersion":"8.0.32","hostLanguage":"zh-CN","hostName":"WeChat","hostSDKVersion":"2.30.0"}
				//微信模拟器返回
				//{"version":"8.0.5","language":"zh_CN","SDKVersion":"2.29.1","enableDebug":false,"fontSizeScaleFactor":0.75,"fontSizeSetting":16,"mode":"default","host":{"appId":"wxb812e2697195c7e7","env":"devtools","version":"1.06.2301160"},"appId":"__UNI__F847AC0","appName":"祝福语","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","hostVersion":"8.0.5","hostLanguage":"zh-CN","hostName":"devtools","hostSDKVersion":"2.29.1"}
				//浏览器返回
				//{"appId":"__UNI__39356A3","appName":"抽签助手","appVersion":"1.0.0","appVersionCode":"100","appLanguage":"zh-Hans","enableDebug":false,"hostName":"safari","hostVersion":"11.0","hostLanguage":"zh-CN","language":"zh-CN","SDKVersion":"","version":""}
				if(AppBaseInfo.hostName == 'WeChat' || AppBaseInfo.hostName == 'devtools'){
					return true;
				}else{
					return false;
				}
				
}
	
/**
 * 录音计时
* @param {Boolean} start :是否启动或清除
* @param {Function} fn :每次计时的回调函数
* @param {number} time :持续的时长 /秒
 */
const recordingTimer=(start=false,fn,time=60,fail_fn,interval=1000)=>{ 
	clearInterval(TimerInit) 
	var that = this 
	if (start != false) { 
		TimerInit = setInterval(function() { //将计时器赋值给 TimerInit 
			time--;
			fn(time);
			//console.log("计时中")
			if(time <= 0 && time>-1){
				clearInterval(TimerInit) 
				fail_fn && fail_fn()
			}
		}, interval); 
	} else { 
		clearInterval(TimerInit) 
		fail_fn && fail_fn()
	} 
}
	
/**
 * 文件上传
* @param {string} filePath :图片路径
* @param {object} formData :上次参数
 */
const uploadFile=(filePath,formData,success_fn,complete_fn,showLoading=true,loadTitle='加载中')=>{
	if(showLoading==true){
		uni.showLoading({
			title: loadTitle,
			mask : true
		});
	}
	formData.token = token;
		// #ifndef H5
			formData.appid = uni.getAccountInfoSync().miniProgram.appId;
		// #endif
		// #ifdef H5
			formData.appid = 1;
		// #endif
	uni.uploadFile({
		url: baseUrl ,
		name:"file",
		filePath:filePath,
		formData:formData,
		success: (res) => {
			if(!res.data){
				return;
			}
			var res = JSON.parse(res.data)
			console.log(res)
			if(showLoading==true){
				uni.hideLoading({
					  fail: function(e) {}
				});
			}
			if(res.code == 0){
				success_fn(res)
			}else{
				toast(res.msg)
			}
		},
		fail(res){
			console.log(res)
			if(res.data){
				toast(res.data.msg)
			}
			
		},
		complete:(res)=>{
			if(complete_fn){
				complete_fn();
			}
			uni.hideLoading({
				  fail: function(e) {}
			});
		}
	})
}

//注册定义的方法
export const util= {
  baseUrl,
  toast,
  goto,
  goback,
  redirectTo,
  get_request,
  recordingTimer,
  token,
  switchTab,
  uploadFile,
  setStorageKEY,
  setToken,
  converToUrl,
getAppISWeChat,
  wx_login,
  checkLogin,showModal
}
