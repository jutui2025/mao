<!-- 猫和老鼠活动主页 -->
<template>
	<view>
		<!-- 蒙层 -->
		<view class="mask" v-show="leaderboard.show==true||qrcode.show==true "
			@click="leaderboard.show=false,qrcode.show=false,chat.show=false"></view>



		<view class="box">
			<map style="width: 100%; height: calc(100% - 9.5em);" class=""
				v-show="resData.config && location_my.latitude>0" :polygons="polygons" :markers="markers"
				:latitude="map_location.latitude" :longitude="map_location.longitude" :enable-rotate="true"
				:enable-building="true" @tap="map_tap" id="map">

				<!-- <view class="active-num">
					<view class="active-num-on">
						1在线
					</view>
					<view class="active-num-now">
						当前活动2
					</view>
					<view class="active-num-out">
						1离线
					</view>
				</view>-->

				<!-- 闪烁屏幕警报 -->
				<view v-if="risk.risk" class="ptInPoly">{{risk.text}}</view>
				<view class="bcak" @click="Back" :style="{'top': customTop + 'px'}">
					<uni-icons type="back" size="26" color="#fff"></uni-icons>
				</view>
				<!-- 离开安全区 -->
				<view v-if="onPtInPoly.len>0" class="ptInPoly">已离开活动区域，请返回。否则将会淘汰</view>

				<!-- 公屏消息 -->
				<view v-if="chat.endMsg!='' && chat.show==false" class="global-msg" @click="chat.show=true">
					<image src="/static/img/trumpet.png" style="width: 20px;height: 20px;margin: auto 5px;"></image>
					{{chat.endMsg}}
				</view>
				<!-- 排行榜 -->
				<view class="leaderboard" v-if="leaderboard.show">
					<uni-table :border="false" stripe emptyText="暂无更多数据">
						<!-- 表格数据行 -->
						<uni-tr v-for="(item,index) in userList" :key="index">
							<uni-td v-if="index==0" width="30">
								<image src="/static/img/list-top1.png" class="top"></image>
							</uni-td>
							<uni-td v-if="index==1" width="30">
								<image src="/static/img/list-top2.png" class="top"></image>
							</uni-td>
							<uni-td v-if="index==2" width="30">
								<image src="/static/img/list-top3.png" class="top"></image>
							</uni-td>
							<uni-td v-if="index>2">{{index+1}}</uni-td>
							<uni-td>
								<image :src="item.avatar" class="image"></image>
							</uni-td>
							<uni-td class="name">{{item.nickname}}</uni-td>
							<uni-td class="rank">{{item.hunting_count}}</uni-td>
						</uni-tr>
					</uni-table>
				</view>
				<!-- 捕猎后的特效 -->
				<view class="effects" v-show="effects.show" @click="effects.show=false">
					<image v-if="resData.img" :src="resData.img.bulie"></image>
					<view class="title">
						恭喜您
					</view>
					<view class="content">
						恭喜您发现一只{{effects.content}}
					</view>
				</view>
			</map>
			<!-- 底部操作 -->
			<!-- 逃跑闪烁优先级要比危险接近等级高，因为还处于逃跑时间的话也是处于保护期的 -->
			<view class="active-box"
				:class="resData.user &&  duration_user.value>0 ? 'duration_user': risk.risk==true ? 'risk':''">
				<!-- 红蓝双方 -->
				<view class="camp">
					<view v-for="(item,index) in resData.horde" :key="index" style="display: flex;">
						<view v-if="index==1" class="text">{{item.count}}</view>
						<image class="ico" :src="item.horde_ico"></image>
						<view v-if="index==0" class="text">{{item.count}}:</view>
					</view>
				</view>
				<view class="user-info">
					我的角色：鼠（普通身份）
				</view>
				<view class="bottom-box">
					<!-- <view class="qr-box" >
						<image class="qrcode" mode="widthFix" src="/static/img/messages.png"></image>
						<view class="text">消息</view>
					</view>
					<view class="qr-box" >
						<image class="qrcode" mode="widthFix" src="/static/img/message.png"></image>
						<view class="text">状态</view>
					</view> -->
					<view class="qr-box" @click="qrcode.show=true">
						<image class="qrcode" mode="widthFix" src="/static/img/qrcode-1.png"></image>
						<view class="text">牌子</view>
					</view>
					<view class="qr-box" @click="leaderboard.show=true">
						<image class="qrcode" src="/static/img/list-1.png"></image>
						<view class="text">排行</view>
					</view>
					<view class="qr-box" @click="$common.goto('/pages/camera')">
						<image class="qrcode" src="/static/img/richScan-1.png"></image>
						<view class="text">捕获</view>
					</view>
				</view>
				<view class="active-box-bottom">
					<view class="active-box-btn">
						结束游戏
					</view>
					<!-- 闪烁屏幕逃跑 -->
					<view class="active-box-time" v-if="duration!=''">
						<view class="active-box-time-top">
							{{duration}}
						</view>
						<view class="active-box-time-bottom">
							倒计时
						</view>
					</view>
				</view>

			</view>
			<!-- 弹出二维码 -->
			<image v-if="qrcode.show && resData.qrcode" class="qr-img" :src="resData.qrcode"></image>
			<!-- 弹出二维码 -->
			<view class="right-box">
				<view class="right-box-item" @click="sendMessages">
					<image class="right-box-item-icon" src="/static/img/message.png" mode=""></image>
					<view class="right-box-item-title">
						状态
					</view>
				</view>
				<view class="right-box-item">
					<image class="right-box-item-icon" src="/static/img/messages.png" mode=""></image>
					<view class="right-box-item-title">
						通知
					</view>
				</view>
				<view class="right-box-item">
					<image class="right-box-item-icon" src="../../static/img/muyu.png" mode=""></image>
					<view class="right-box-item-title">
						控制台
					</view>
				</view>
				<view class="right-box-item">
					<image class="right-box-item-icon" src="../../static/img/muyu.png" mode=""></image>
					<view class="right-box-item-title">
						排行榜
					</view>
				</view>
				<view class="right-box-item">
					<image class="right-box-item-icon" src="../../static/img/muyu.png" mode=""></image>
					<view class="right-box-item-title">
						刷新
					</view>
				</view>
				<view class="right-box-item">
					<image class="right-box-item-icon" src="../../static/img/muyu.png" mode=""></image>
					<view class="right-box-item-title">
						活动规则
					</view>
				</view>
				<view class="right-box-item" @click="chat.show=true">
					<image class="right-box-item-icon" src="/static/img/messages.png" mode=""></image>
					<view class="right-box-item-title">
						聊天室
					</view>
				</view>
			</view>
		</view>

		<!-- 聊天蒙层 --><!-- 关闭此弹窗 -->
		<view style="width: 100%;height: 100%;position: absolute;background-color: #0000;" v-show="chat.show"
			@click="chat.show=false"></view>
		<view v-if="chat.show" class="chat">


			<view style="height:100%;width:100%;display: flex;">
				<scroll-view class="content" scroll-y="true" :scroll-into-view="chat.scrollInto">
					<view class="pop__clearfix" v-for="(item,index) in chat.list" :key="index" :id="'s'+item.msg_id">
						<!-- 自己 -->
						<view class="pop__chat-msg-me li" v-if="item.type==0">
							<view class="pop__chat-msg-msg" v-if="item.message"><span>{{item.message}}</span></view>
							<view class="pop__chat-msg-avatar">
								<image :src="item.avatar"></image>
								<!-- <img src="xxx.jpg" large="xxx_3x.jpg" preview="2" preview-text="描述文字"> -->
							</view>
						</view>
						<!-- 好友 -->
						<view class="pop__chat-msg-me2 li" v-if="item.type==1">
							<view class="pop__chat-msg-avatar"
								:style="item.user_id==0 ? 'height:30px;width:30px;margin-right: 30px;':''">
								<image :src="item.avatar"></image>
							</view>
							<view class="pop__chat-msg-msg2" v-if="item.message">
								<view class="nickname">{{item.nickname}}</view>
								<span>{{item.message}}</span>
							</view>

						</view>
						<!-- 显示最近一次的聊天时间 -->
						<view class="time li" v-if="item.id==0">{{item.time}}</view>
					</view>
				</scroll-view>
				<view class="Bottom">
					<view class="state">
						<!-- 语音切换 -->
						<!-- <button class="voice" @click='voice'>
							<img :src="Texts?'../Image/y.png':'../Image/j.png'" alt="">
						</button> -->
						<!-- 输入框 -->
						<textarea id="t" autofocus ref="myInput" v-model="chat.TentText" cursor-spacing="100"
							placeholder="和大家吹吹牛皮..."></textarea>
						<!-- 点击录音 -->
						<!-- <button class="Press" v-if="Press">按住 说话</button> -->
						<!-- 表情 -->
						<!-- <view class="expression but" @click="chat_expression">
							<image :src="chat.expsion.show?'/static/img/chat/j.png':'/static/img/chat/b.png'"  ></image>
						</view> -->
						<!-- 发送图片 -->
						<!-- <view class="file but" @click="file" v-if="chat.TentText?false:true"></view> -->
						<!-- capture="camera" 相机拍照 -->
						<input type="file" style="display: none;" accept="image/*" multiple id="p" name="file"
							@change="onChooseImage($event)" />
						<!-- 发送文字内容 -->
						<view class="sendout but" @click="chat_sendout">发送</view>
					</view>
					<!-- <view class="express" v-if="chat.expsion.show">
						<view style="font-size: 24px; padding: 0.1rem 0.12rem; " @click="copy(item,index)"
							v-for="(item,index) in chat.expsion.emolis" :key="index">{{item.char}}</view>
					</view> -->
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	// #ifdef MP-WEIXIN
	const custom = wx.getMenuButtonBoundingClientRect()
	// #endif
	export default {
		data() {
			return {
				customTop: custom?.top || 0,
				chat: {
					show: false, //是否显示聊天面板
					// {
					// 	msg_id: 1,//消息ID
					// 	content: '山不在高，有仙则名。' ,
					// 	uid:1,//用户ID
					// 	avatar:'',//用户头像
					// 	type:1,//区分自己和对方；0=对方 1=自己
					//  },
					list: [],
					TentText: '', //欲发送的内容
					msg_id: 0, //消息id
					scrollInto: '', //滚动至的id
					endMsg: ''
				},
				location_my: { //我的位置
					latitude: 0,
					longitude: 0,
				},
				map_location: { //作为地图中间的坐标点，触摸地图的一分钟后移动到当前坐标点
					latitude: 0,
					longitude: 0,
					len: 0, //计次
				},
				loadLocation: {
					len: 2, //实时更新了多少次后上传当前位置至后台
					index: 0, //当前次数
				},
				markers: [],
				markers_fencePanel: [], //标记的围栏
				markers_user: [], //用户的标记点
				polygons: [],
				mapContext: { //创建并返回 map 上下文 mapContext 对象

				},
				menuButtonInfo: {}, //胶囊位置
				resData: {}, //返回的活动数据
				theme_id: '', //活动ID,由上一个页面传递
				qrcode: { //是否展示二维码位置
					show: false
				},
				leaderboard: { //是否展示排行榜
					show: false,
				},
				userList: [], //参与用户列表
				risk: {
					risk: false,
					text: '附近100米有可疑敌情~',
				}, //距离过近警报
				open: '开发者WX：majiaoshou2023',
				duration: '', //倒计时
				theme_type: 2, //活动状态
				duration_user: { //游戏开始后的逃跑时间
					value: 0,
					values: ''
				}, //
				effects: {
					show: false,
					content: ''
				}, //捕猎后的特效
				onPtInPoly: {
					len: 0, //越界的秒数
				},
				device_locationData: {}, //每一次上传定位返回的数据将缓存在这里
			}
		},

		onLoad(res) {
			if (res.theme_id) {
				this.theme_id = res.theme_id;
				this.onload_theme_info()
				this.mapContext = uni.createMapContext('map', this);

				// #ifdef H5
				this.menuButtonInfo.height = 25
				this.menuButtonInfo.top = 10
				// #endif

				// #ifdef MP-WEIXIN
				this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				// #endif

				//监控扫码事件回调
				uni.$on('scanCode', this.callback_scanCode)


			}
		},
		methods: {
			Back() {
				//uni.navigateBack()//默认delta:1
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			Timer() {
				var that = this
				that.device_location()
				that.$common.recordingTimer(true, () => {
					that.device_location()
					//记录离开活动范围数据
					if (that.resData.polygons.polygons.length > 0 && that.isPtInPoly(that.location_my.latitude,
							that.location_my.longitude, that.resData.polygons.polygons) == false) {
						that.onPtInPoly.len++;
						console.log("你已离开活动区域：" + (that.onPtInPoly.len * 5) + "秒了")
					} else {
						that.onPtInPoly.len = 0
					}
				}, -1, () => {
					console.log("定时器停止")
				}, parseInt(that.resData.config.uploadDeviceTimer.value))
			},
			/**
			 * 自动滚动到底部最新的消息位置
			 * @param {string} id :消息的唯一ID 可空(则滚动到消息列表的最后一条)
			 * */
			setScroll(id = '') {
				var that = this;
				let len = 0;
				setTimeout(() => {

					that.chat.scrollInto = 's' + id;
				}, 100)


			},
			// 发送
			chat_sendout() {
				var that = this

				that.$common.get_request({
						type: 'send_message',
						theme_id: that.theme_id,
						content: that.chat.TentText,
					},
					function(res) {
						var msg_id = that.chat.list.length
						that.chat.list.push({
							msg_id: msg_id, //消息ID
							message: that.chat.TentText,
							uid: that.resData.user.id, //用户ID
							avatar: that.resData.user.avatar, //用户头像
							type: 0, //区分自己和对方；0=自己 1=对方 
							test: true, //临时的
						})
						that.chat.TentText = '';
						that.setScroll(msg_id)
					},
					function() {
						that.chat.TentText = '';
					}, false)
			},
			/**
			 * 处理消息记录， */
			message_data(res) {
				var that = this

				var count = res.list.length;
				for (var i = 0; i < count; i++) {

					that.chat.list.push(
						res.list[i]
					)
				}
				if (count > 0) { //缓存最后的一条信息用户展示公屏
					that.chat.endMsg = res.list[count - 1].nickname + ': ' + res.list[count - 1].message
				}
				that.chat.msg_id = res.msg_id
				//删除用户发送的消息，因为发送成功的话服务器会返回刚刚所发的信息
				for (var i = 0; i < that.chat.list.length; i++) {
					if (that.chat.list[i].test) {
						that.chat.list.splice(i, 1)
					}
				}
				if (that.chat.list.length - 80 > 0) {
					//删除超过80 条的消息，保存流畅
					that.chat.list.splice(0, that.chat.list.length - 80)
				}
				if (that.chat.show == false) {
					return
				}
				that.setScroll(that.chat.msg_id)
			},
			/**
			 * 更新打断将地图中心点移动到屏幕中间， */
			map_tap(e) {
				console.log(e)
				//detail: {latitude: 21.917840468162645, longitude: 110.8549736925047}

				this.map_location.len = 0
				console.log('更新打断将地图中心点移动到屏幕中间')
			},
			/**
			 * 发送状态消息文本 */
			sendMessages() {
				var that = this
				uni.showModal({
					title: '修改个人位置上方的状态',
					content: '',
					editable: true,
					placeholderText: '来呀~抓我呀',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if (res.content) {
								that.$common.get_request({
										type: 'update_messages',
										id: that.theme_id,
										content: res.content,
									},
									function(e) {

									},
									function() {})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/**
			 * 扫码事件回调 */
			callback_scanCode(res) {
				var that = this
				console.log('callback_scanCode', res)
				if (res.value == undefined) {

					console.log('扫码出错')
					return;
				}
				var tmp = res.value;
				that.$common.get_request({
						type: 'hunting',
						id: that.theme_id,
						key: tmp,
					},
					function(e) {
						if (e.effects.type == true) {
							that.effects.show = true
							that.effects.content = e.effects.name
						} else {
							uni.showModal({
								title: '提示',
								content: '成功捕猎',
								showCancel: false,
								confirmText: '确定',
								success: (res) => {
									if (res.confirm) {

									}
								}
							})
						}
					},
					function(e) {
						if (e && e.msg) {
							uni.showModal({
								title: '提示',
								content: e.msg,
								confirmText: '确定',
								success: (res) => {
									if (res.confirm) {
										//uni.openAppAuthorizeSetting()
									}
								}
							})
						}
					}, true)
			},
			/**
			 * 打开扫码 */
			openCamera(mode = 'scanCode') {
				var that = this
				const {
					cameraAuthorized,
					microphoneAuthorized,
					osName
				} = uni.getSystemInfoSync()

				if (!cameraAuthorized) {
					uni.showModal({
						title: '提示',
						content: '您关闭了摄像头权限，请允许微信使用摄像头权限',
						confirmText: '去设置',
						success: (res) => {
							if (res.confirm) {
								uni.openAppAuthorizeSetting()
							}
						}
					})
					return
				}
				// ios 摄像头&麦克风绑定
				if (!microphoneAuthorized && osName === 'ios') {
					uni.showModal({
						title: '提示',
						content: '您关闭了麦克风权限，请允许微信使用麦克风权限',
						confirmText: '去设置',
						success: (res) => {
							if (res.confirm) {
								uni.openAppAuthorizeSetting()
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: `/pages/camera?mode=${mode}`
				})
			},
			/**
			 * 加载活动详情 */
			onload_theme_info() {
				var that = this
				this.$common.get_request({
						type: 'theme_info',
						id: that.theme_id,
					},
					function(res) {
						if (res.polygons.polygons.length > 0) {
							var t_polygons = JSON.parse(res.polygons.polygons)
							that.creatPolygons(t_polygons) //绘制活动范围
							res.polygons.polygons = t_polygons

						}
						Boolean
						that.resData = res;
						//that.resData.config.showLocationIco.value = Boolean(that.resData.config.showLocationIco.value);
						that.Timer()
						// #ifdef MP-WEIXIN
						that.startLocationUpdateBackground()
						that.startLocationUpdate()
						that.onLocationChange()
						// #endif
						// #ifdef H5
						//that.H5getLocation()
						// #endif
					},
					function() {}, false)
			},
			/**
			 * 获取当前所在地理位置，调用一次即重新定位一次，定位数据比较精确。，
			 *  */
			H5getLocation() {},
			//监听实时地理位置变化事件，需结合 uni.startLocationUpdate 或 uni.startLocationUpdateBackground 使用。
			onLocationChange() {
				var that = this
				uni.onLocationChange(function(res) {
					//console.log("onLocationChange:",res)
					// 赋值当前位置至地图组件
					that.location_my = res
					if (that.map_location.latitude == 0) { //首次打开地图的时候需要赋值一个经纬度，否则地图不刷新
						that.map_location.latitude = res.latitude
						that.map_location.longitude = res.longitude
					}

					//开始记录当前的次数，手指不触摸地图的一分钟后将地图中间移动到当前的坐标点
					that.map_location.len++;
					if (that.map_location.len >= 30) {
						that.map_location.latitude = res.latitude
						that.map_location.longitude = res.longitude
						that.loadLocation.len = 0;



					}
				})
			},
			/**
			 * 位置信息上传
			 * */
			device_location() {
				var that = this

				this.$common.get_request({
						type: 'device_location',
						theme_id: that.theme_id,
						location: JSON.stringify(that.location_my),
						msg_id: that.chat.msg_id,
						isPtInPoly: that.onPtInPoly.len > 60 ? 1 : 2, //如果用户离开活动范围5分钟将默认淘汰
					},
					function(res) {
						//更新所有的用户标记点
						var locationJson = null;

						for (var i = 0; i < res.list.length; i++) {
							locationJson = JSON.parse(res.list[i].location);
							if (null != locationJson) {

								//查询次用户是否已被创建，未创建则创建，否则移动位置
								if (that.checkUserCreate(res.list[i].user_id) == false) {
									that.createMarkersUser(locationJson, res.list[i].user_id, res.list[i].nickname, res
										.list[i].avatar, res.list[i].horde_id)
									console.log("创建用户标记")
								} else {
									//更新标记点数组里面的经纬度信息，否则会来回跳动坐标
									for (var ii = 0; ii < that.markers_user.length; ii++) {
										if (that.markers_user[ii].id == res.list[i].user_id) {
											that.markers_user[ii].online = res.list[i].online == 1 ? '离线' : ''

											that.markers_user[ii].messages = res.list[i].messages

											that.markers_user[ii].latitude = locationJson.latitude //服务器下发的经纬度信息
											that.markers_user[ii].longitude = locationJson.longitude //服务器下发的经纬度信息
											//改变阵营头像
											if (that.markers[ii].horde_id != res.list[i].horde_id) {
												that.markers[ii].iconPath = res.list[i].avatar
											}
											break
										}
									}
									//更新标记点数组里面的经纬度信息，否则会来回跳动坐标
									for (var ii = 0; ii < that.markers.length; ii++) {
										if (that.markers[ii].id == res.list[i].user_id) {

											that.markers[ii].latitude = locationJson.latitude //服务器下发的经纬度信息
											that.markers[ii].longitude = locationJson.longitude //服务器下发的经纬度信息
											//改变阵营头像
											if (that.markers[ii].horde_id != res.list[i].horde_id) {
												that.markers[ii].iconPath = res.list[i].avatar
											}
											break
										}
									}

									that.moveLocation(res.list[i].user_id, locationJson);

								}
							}
						}
						that.message_data(res.messages)

						//更新阵营用户量
						var id = ''
						for (var i = 0; i < that.resData.horde.length; i++) {
							id = that.resData.horde[i].id;
							that.resData.horde[i].count = res['horde_info'][id]['count']
							//this.$set(this.res_data.list,iii,this.res_data.list[iii])
							//console.log(that.resData.horde[i].count)
						}

						that.userList = res.list
						that.distance();

						//活动开始时间5分钟内禁止捕猎
						that.duration_user.value = res.duration_user
						that.duration_user.values = that.second(res.duration_user)


						that.duration = that.second(res.duration)
						that.theme_type = res.type.value
						if (that.theme_type != 2) { //活动已结束
							//关闭监听
							uni.stopLocationUpdate()
							uni.offLocationChange()
							that.$common.recordingTimer(false)
							uni.showModal({
								title: '提示',
								content: res.type.tips,
								showCancel: false,
								success: (e) => {
									console.log(e) //confirm
									if (e.confirm == true) {
										that.$common.goback()
									}
								}
							});
						}
						//检测身份转换
						if (that.device_locationData.theme_user != undefined && that.device_locationData.theme_user
							.horde_id != res.theme_user.horde_id) {
							that.qrcode.show = false; //隐藏二维码
							that.$common.toast("当前你的身份阵营已转换啦")

						}
						that.device_locationData = res
					},
					function(res) {

					}, false, )
			},
			//开始监听实时地理位置信息变化事件，小程序进入前后台时均接收实时地理位置信息。
			startLocationUpdateBackground() {
				uni.startLocationUpdateBackground({
					type: 'gcj02', //指定坐标系类型，可以是 wgs84 或 gcj02
					success: function(res) {
						//console.log("startLocationUpdateBackground:",res)
					},
					fail: function(res) {
						//console.log("startLocationUpdateBackground:",res)

					},
				})
			},
			//开启小程序进入前台时接收位置消息。
			startLocationUpdate() {
				uni.startLocationUpdate({
					type: 'gcj02', //指定坐标系类型，可以是 wgs84 或 gcj02
					needFullAccuracy: true, //针对 iOS14/Android12 及以上的新特性，其他情况本参数忽略。默认情况宿主是精确定位就返回精确定位信息。传入 true 会强制使用精确定位信息，iOS14/Android12 及以上如果没有精确定位权限，会弹出精确定位授权弹框。
					success: function(res) {
						//console.log("startLocationUpdate:",res)
					},
					fail: function(res) {
						//console.log("startLocationUpdate:",res)

					},
				})
			},
			//移动用户坐标点
			moveLocation(markerId, res) {
				//console.log("moveLocation",markerId)
				this.mapContext.translateMarker({
					markerId: markerId,
					destination: {
						latitude: res.latitude,
						longitude: res.longitude
					}, //指定 marker 移动到的目标点
					autoRotate: false, //移动过程中是否自动旋转 marker
					rotate: 0, //marker 的旋转角度
					fail: function(e) {
						//console.log('移动用户坐标点失败',e)
					},
					success: function(e) {
						//console.log('移动用户坐标点成功',markerId,res,e)
					}
				})
			},

			updated() {
				var that = this

			},
			/**
			 * 查找userid是否已被创建 */
			checkUserCreate(uid) {
				let markers_tmp = this.markers_user
				for (var i = 0; i < markers_tmp.length; i++) {
					if (markers_tmp[i].id == uid) {
						return true;
					}
				}
				return false;
			},

			/**
			 * m秒格式化时分秒 */
			second(duration) {

				var theTime = parseInt(duration); // 秒
				var middle = 0; // 分
				var hour = 0; // 小时

				if (theTime >= 60) {
					middle = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					if (middle >= 60) {
						hour = parseInt(middle / 60);
						middle = parseInt(middle % 60);
					}
				}
				var result = "" + parseInt(theTime) //+"秒";
				result = result.length == 1 ? '0' + result : result; //补位

				if (middle > 0) {
					middle = parseInt(middle)
					middle = middle.length == 1 ? '0' + middle : middle; //补位
					result = "" + middle + ":" + result;

				} else {
					result = "00" + ":" + result;
				}
				if (hour > 0) {
					hour = parseInt(hour)
					hour = hour.length == 1 ? '0' + hour : hour; //补位
					result = "" + hour + ":" + result;
				} else {
					result = "00" + ":" + result;
				}
				return result;
			},
			/**
			 * 计算距离 */
			distance() {
				var that = this

				// 构建链接
				var pam = {}
				let markers_tmp = that.markers_user
				//markers_tmp.push({latitude:21.91438594640249,longitude:110.85250765211777})
				pam.to = ''
				for (var i = 0; i < markers_tmp.length; i++) {

					pam.to += `${markers_tmp[i].latitude},${markers_tmp[i].longitude}`
					if (i + 1 < markers_tmp.length) {
						pam.to = pam.to + ';'
					}

				}
				//console.log(pam.to)
				pam.key = that.resData.map //"VPSBZ-SY6CU-YE5VL-GRWJO-G3CZ3-M4FWP"
				pam.from = `${that.location_my.latitude},${that.location_my.longitude}`
				pam.mode = "walking"


				var url = 'https://apis.map.qq.com/ws/distance/v1/matrix' + that.$common.converToUrl(pam)
				//console.log(url)


				uni.request({
					url: url,
					method: 'GET',
					success: (res) => {
						//console.log(res)
						if (res.data.result == undefined) {
							//console.log('res.result == undefined')
							return
						}
						//console.log('计算距离',res)
						var tmp_risk = false;
						//动态刷新距离
						for (var i = 0; i < markers_tmp.length; i++) {
							if (markers_tmp[i].id != that.resData.user.theme_user.user_id) { //把自己给排除掉
								markers_tmp[i].distance = res.data.result.rows[0].elements[i].distance

								markers_tmp[i].callout.content =
									`${markers_tmp[i].messages}\n距你${markers_tmp[i].distance}米\n${markers_tmp[i].online}`

								// 距离小于100米的时候发出警报
								if (markers_tmp[i].distance < 100) {
									tmp_risk = true;
								}

							} else {

								markers_tmp[i].callout.content = `${markers_tmp[i].messages}`
							}
						}

						that.risk.risk = tmp_risk;

						that.markers_user = markers_tmp
					}
				});
			},

			/**
			 * 判断点击的点位是否在polygon之内 */

			isPtInPoly(aLat, aLon, pointList) {
				/* 
				:param aLat: double 纬度 
				:param aLon: double 经度 
				:param pointList: list [{latitude: 22.22, longitude: 113.113}...] 多边形点的顺序需根据顺时针或逆时针，不能乱 
				*/
				let iSum = 0
				let iCount = pointList.length

				if (iCount < 3) {
					console.log('退出检测')
					return false
				}
				console.log('进入检测')
				for (let i = 0; i < iCount; i++) {
					let pLat1 = pointList[i].latitude
					let pLon1 = pointList[i].longitude
					let pLat2 = 0,
						pLon2 = 0;
					if (i == iCount - 1) {
						pLat2 = pointList[0].latitude
						pLon2 = pointList[0].longitude
					} else {
						pLat2 = pointList[i + 1].latitude
						pLon2 = pointList[i + 1].longitude
					}
					if (((aLat >= pLat1) && (aLat < pLat2)) || ((aLat >= pLat2) && (aLat < pLat1))) {
						if (Math.abs(pLat1 - pLat2) > 0) {
							let pLon = pLon1 - ((pLon1 - pLon2) * (pLat1 - aLat)) / (pLat1 - pLat2);
							if (pLon < aLon) {
								iSum += 1
							}
						}
					}
				}
				if (iSum % 2 != 0) {
					return true
				} else {
					return false
				}
			},

			/**
			 * 创建用户标记点 */
			createMarkersUser(location, user_id, username, avatar, horde_id) {
				console.log("createMarkersUser", user_id)
				var that = this
				var isuid = user_id != that.resData.user.theme_user.user_id ? false : true;
				let markers_tmp = this.markers_user
				let markerItem = {
					id: parseInt(user_id),
					latitude: null,
					longitude: null,
					iconPath: avatar,
					width: '34px',
					height: '34px',
					rotate: 0,
					alpha: 1,
					zIndex: 4,
					distance: 0, //距离自己多少米
					nickname: username, //用户名
					messages: '', //消息
					horde_id: horde_id,
					online: '', //(在线)
					callout: {
						color: isuid == false ? '#000' : '#01bb75',
						content: isuid == false ? `${username}\n距你0m` : `${username}`,
						display: 'ALWAYS', //'BYCLICK':点击显示; 'ALWAYS':常显
						borderRadius: 10,
						padding: 5,
					},
				}
				markerItem.latitude = location.latitude;
				markerItem.longitude = location.longitude;
				markers_tmp.push(markerItem) //加入用户标记点数组
				this.markers_user = markers_tmp
				this.markers.push(markerItem) //加入公共坐标数组

			},
			// 绘制多边形围栏
			creatPolygons(markers) {
				if (markers.length < 3) {
					return false
				}
				let polygons = this.polygons;
				let markers_tmp = this.coordinateSort(markers)
				let newArray = [];
				let params = {
					fillColor: "#3336fc2b",
					strokeColor: "#ff383b",
					strokeWidth: 2,
					zIndex: 3
				}
				for (let j = 0; j < markers_tmp.length; j++) {
					let obj = {
						latitude: markers_tmp[j].latitude,
						longitude: markers_tmp[j].longitude
					};
					newArray.push(obj);
				}
				polygons[0] = {};
				polygons[0].points = newArray;
				newArray = Object.assign(polygons[0], params);
				this.polygons[0] = newArray
				this.$emit("getPointsArr", newArray)
			},


			// 使用reduce获取中心（平均值）
			coordinateSort(points) {
				const center = points.reduce((acc, {
					latitude,
					longitude
				}) => {
					acc.latitude += latitude / points.length;
					acc.longitude += longitude / points.length;
					return acc;
				}, {
					latitude: 0,
					longitude: 0
				});
				// 使用tan（angle）=y/x将角度特性添加到每个点
				const angles = points.map(({
					latitude,
					longitude
				}) => {
					return {
						latitude,
						longitude,
						angle: Math.atan2(longitude - center.longitude, latitude - center.latitude) * 180 / Math.PI
					};
				});
				// 按角度排序
				const pointsSorted = angles.sort((a, b) => a.angle - b.angle);
				return pointsSorted
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "@/static/css/leaderboard.css";

	.bcak {
		background-color: rgba(0, 0, 0, 0.3);
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 30rpx;
	}

	.active-num {
		background-color: rgba(0, 0, 0, 0.3);
		width: 500rpx;
		height: 60rpx;
		border-radius: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 150rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 40rpx;
		box-sizing: border-box;
		color: #fff;

		.active-num-on {
			font-size: 26rpx;
			position: relative;
		}

		.active-num-on::before {
			display: block;
			content: '';
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background-color: #01bb75;
			position: absolute;
			left: -25rpx;
			top: 50%;
			transform: translateY(-50%);
		}

		.active-num-now {
			font-size: 30rpx;
		}

		.active-num-out {
			font-size: 26rpx;
			position: relative;
		}

		.active-num-out::before {
			display: block;
			content: '';
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background-color: #FF5753;
			position: absolute;
			left: -25rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.right-box {
		position: fixed;
		right: 40rpx;
		top: 50%;
		transform: translateY(-65%);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 650rpx;

		.right-box-item {
			text-align: center;
			font-size: 24rpx;
			background-color: #fff;
			height: 80rpx;
			width: 80rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.right-box-item-icon {
				width: 40rpx;
				height: 40rpx;
			}

			.right-box-item-title {
				transform: scale(0.7);
				white-space: nowrap;
				font-weight: bold;
			}
		}
	}

	.active-box {
		position: fixed;
		background-color: #fff;
		bottom: 0;
		width: 100%;
		border-radius: 30rpx 30rpx 0 0;
		padding: 0 30rpx 30rpx;
		box-sizing: border-box;

		.bottom-box {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;

			.qr-box {
				text-align: center;
				justify-content: center;
				color: #000;
				border-radius: 20rpx;

				.text {
					justify-content: center;
					display: flex;
					flex-direction: column;
					font-size: 24rpx;
				}

				.qrcode {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}

		.user-info {
			text-align: center;
			font-size: 30rpx;
		}

		.active-box-bottom {
			display: flex;
			align-items: center;
			margin-top: 30rpx;

			.active-box-btn {
				background: linear-gradient(0deg, #76beff, #1d94ff);
				width: 200rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 80rpx;
				color: #fff;
				font-size: 32rpx;
				font-weight: bold;
			}

			.active-box-time {
				margin-left: 50rpx;
				text-align: center;

				.active-box-time-top {
					color: #000;
					font-weight: bold;
					font-size: 36rpx;
				}

				.active-box-time-bottom {
					color: #999;
				}
			}
		}
	}

	.global-msg {
		color: #ffffff;
		position: absolute;
		width: calc(100% - 10px);
		display: flex;
		font-size: 28rpx;
		bottom: 0px;
		padding: 10rpx;
		/* background-color: #fff; */
		background: #0000008c;
	}

	.chat {
		position: absolute;
		width: 100%;
		height: 75%;
		bottom: 0px;
		z-index: 111;
		// box-shadow: 0px -3px 2px 1px #00000078;

		image {
			width: 100%;
			height: 100%;
			vertical-align: top;
		}

		.li {
			list-style: none;
		}

		.time {
			text-align: center;
			font-size: 24rpx;
			margin: 20rpx 0;
			font-weight: 500;
		}

		.content {
			background: #000000bf;
			overflow: scroll;
			box-sizing: border-box;
			height: calc(90% - 20px);
			width: 100%;
			padding: 10rpx 0rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
		}

		.nickname {
			position: absolute;
			top: -36rpx;
			color: #ccc;
			left: 0px;
			font-size: 24rpx;
			height: 36rpx;
		}

		span {
			word-wrap: break-word;
			font-weight: 500;
			letter-spacing: 2rpx;
			justify-content: center;
			display: flex;
			flex-direction: column;
			width: -webkit-fill-available;
		}

		.pop__chat-msg-me,
		.pop__chat-msg-me2 {
			display: flex;
			margin-bottom: 40rpx;
		}

		.pop__chat-msg-msg {
			float: right;
			background-color: #4cb4e7;
			border-color: #4cb4e7;
			display: flex;
		}

		.pop__chat-msg-msg {
			background-color: #4cb4e7;
			border-color: #4cb4e7;
			border-style: solid;
			border-width: 0.02rem;
			border-radius: 10rpx;
			color: #333;
			float: left;
			font-size: 28rpx;
			margin: 0 16rpx;
			padding: 10rpx;
			position: relative;
			color: #fff;
			min-width: 120rpx;
			max-width: calc(100% - 182rpx);
			width: auto;
			margin-left: auto;
		}


		.pop__chat-msg-msg2 {
			background-color: #fff;
			border-color: #fff;
			border-style: solid;
			border-width: 2rpx;
			border-radius: 10rpx;
			color: #333;
			float: left;
			font-size: 28rpx;
			margin: 0 16rpx;
			padding: 10rpx;
			position: relative;
			justify-content: center;
			display: flex;
			min-width: 200rpx;
			max-width: calc(100% - 182rpx);
			width: auto;
		}


		.pop__chat-msg-avatar {
			display: block;
			overflow: hidden;
			height: 70rpx;
			width: 70rpx;
			border-radius: 50%;
		}

		.pop__clearfix:after {
			content: "";
			clear: both;
			display: block;
		}

		.pop__chat-msg-msg:before {
			background: inherit;
			border-color: inherit;
			right: -12rpx;
			transform: translate(0, -50%) rotate(45deg);
		}

		.pop__chat-msg-msg:before {
			content: '';
			display: inline-block;
			border-style: solid;
			border-width: .01rem .01rem 0 0;
			height: 20rpx;
			width: 20rpx;
			position: absolute;
			top: 20rpx;
		}

		.pop__chat-msg-msg2:before {
			background: inherit;
			border-color: inherit;
			left: -12rpx;
			transform: translate(0, -50%) rotate(45deg);
		}

		.pop__chat-msg-msg2:before {
			content: '';
			display: inline-block;
			border-style: solid;
			border-width: .01rem .01rem 0 0;
			height: 20rpx;
			width: 20rpx;
			position: absolute;
			top: 20rpx;
		}

		.pop__chat-msg-msg1:before {
			background: inherit;
			border-color: inherit;
			right: -20rpx;
			transform: translate(0, -50%) rotate(45deg);
		}

		.Bottom {
			width: calc(100% - 60rpx);
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 10rpx 30rpx 30rpx 30rpx;
			height: 10%;
			background-color: #000000cf;
		}

		.Bottom .but {
			// width: 40px;
			height: 80rpx;
			display: flex;
			align-self: center;
			text-align: center;
			// border-radius: 50%;
			border: none;
			outline: none;
			flex: 1;
		}

		/* .expression {
		background-image: url(../Image/b.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	} */


		.sendout {
			// width: 1rem !important;
			// height: 0.6rem !important;
			min-width: 100rpx;
			border-radius: 20rpx;
			font-size: 28rpx;
			font-weight: 500;
			background: #0BA198;
			color: #fff;
			flex-direction: column;
			justify-content: center;
			display: flex;
		}

		.Bottom input {
			width: 63%;
			height: calc(100% - 20rpx);
			line-height: calc(100% - 20rpx);
			display: flex;
			align-self: center;
			border: none;
			border-radius: 0.1rem;
			outline: none;
			font-size: 0.32rem;
			padding-left: 0.1rem;
			word-wrap: break-word;
		}

		.Bottom textarea {
			width: calc(100% - 200rpx);
			height: 60rpx;
			padding: 10rpx;
			display: flex;
			align-self: center;
			border: none;
			border-radius: 20rpx;
			outline: none;
			font-size: 28rpx;
			word-wrap: break-word;
			resize: none;
			background-color: #fff;
		}

		.Press {
			width: 65% !important;
			height: 0.76rem !important;
			border-radius: 0.1rem !important;
			background: #fff !important;
			padding: 0.16rem 1.75rem !important;
			font-size: 0.32rem !important;
			text-align: center !important;
			font-weight: 500;
			margin: 0 !important;
		}

		.Press:active {
			background: #EBEBEB !important;
		}

		.state {
			height: 100%;
			display: flex;
		}

		.express {
			transition: all 2s;
			height: 500rpx;
			display: flex;
			justify-content: flex-start;
			box-sizing: border-box;
			padding: 0.2rem 0.1rem 0;
			flex-wrap: wrap;
			overflow: scroll;
		}
	}

	.duration {
		display: flex;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		/* left: 5px; */
		background-color: #ffffff61;
		padding: 0px 20rpx;
		border-radius: 40rpx;
		/* border: solid 1px #c1c1c1; */
		top: 102rpx;
		height: 64rpx;
		color: #ff0000;
		font-size: 24rpx;
	}

	.effects {
		position: absolute;
		z-index: 100;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 50%;

		.title {
			position: absolute;
			top: 40rpx;
			width: 100%;
			text-align: center;
			font-size: 3em;
			color: #FF5753;
			font-weight: 600;
		}

		.content {
			position: absolute;
			top: 3.7em;
			width: 100%;
			text-align: center;
			font-size: 1.5em;
			color: #FF5753;
			font-weight: 600;
		}
	}

	.mask {

		position: absolute;
		z-index: 10;
		bottom: 0px;
		width: 100%;
		height: 100%;
		background: #000000ba;
	}

	@keyframes duration_user-animation {
		0% {
			box-shadow: inset 0px 0px 0px 0px #01bb75;
		}

		50% {
			box-shadow: inset 0px 0px 30rpx 12rpx #01bb75;
		}

		100% {
			box-shadow: inset 0px 0px 0px 0px #01bb75;
		}
	}

	.duration_user {
		animation: duration_user-animation 3s 0s linear infinite;
	}

	.ptInPoly {
		color: #fff;
		text-align: center;
		position: absolute;
		width: 80%;
		top: 50%;
		background-color: #0a0a0ac9;
		left: 10%;
		border-radius: 20rpx;
		padding: 10rpx 0rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		pointer-events: none;
		/* bottom:0px; */
		font-size: 24rpx;
		animation: duration-ptinpoly 1s 0s linear infinite;
	}

	@keyframes duration-ptinpoly {
		0% {
			box-shadow: inset 0px 0px 0px 0px #f10101;
		}

		50% {
			box-shadow: inset 0px 0px 30rpx 12rpx #f10101;
		}

		100% {
			box-shadow: inset 0px 0px 0px 0px #f10101;
		}
	}

	@keyframes risk-animation {
		0% {
			box-shadow: inset 0px 0px 0px 0px #f10101;
		}

		50% {
			box-shadow: inset 0px 0px 30rpx 12rpx #f10101;
		}

		100% {
			box-shadow: inset 0px 0px 0px 0px #f10101;
		}
	}

	.risk {
		// position: absolute;
		// width: 100%;
		// height: 100%;
		// z-index: 100;
		// pointer-events: none;
		animation: risk-animation 3s 0s linear infinite;
	}

	.qr-img {
		width: 400rpx;
		height: 400rpx;
		margin: auto;
		display: flex;
		z-index: 100;
		left: calc(50% - 200rpx);
		top: calc(50% - 200rpx);
		position: absolute;
	}

	.box {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.camp {
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		flex-direction: initial;
		padding: 20rpx 10rpx;
	}

	.camp .text {
		justify-content: center;
		display: flex;
		flex-direction: column;
		font-size: 40rpx;
		padding: 4rpx;
	}

	.camp .ico {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
</style>