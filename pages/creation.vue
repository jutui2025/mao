<!-- 猫和老鼠创建活动页 -->
<template>
	<view class="container">
		<view class="ui-all">
			<!-- <view class="ui-list">
				<text>分类</text>
				<view class="ui-list-right">
					<label class="radio">
						<radio value="r1" checked="true" />猫鼠游戏
					</label>
					<label class="radio" style="margin-left: 20rpx;">
						<radio value="r2" />其他活动
					</label>
				</view>
			</view>
			<view class="ui-list">
				<text>活动类型</text>
				<view class="ui-list-right">
					<input type="text" placeholder="请选择活动类型" v-model="body.title" cursor-spacing="100"
						placeholder-class="place" />
				</view>
			</view> -->
			<view class="ui-list">
				<text>活动主题</text>
				<view class="ui-list-right">
					<input type="text" placeholder="请填写活动主题" v-model="body.title" cursor-spacing="100"
						placeholder-class="place" />
				</view>
			</view>
			<view class="ui-list">
				<text>活动口令</text>
				<view class="ui-list-right">
					<!-- <image src="/static/img/tips.png" class="ico"
						@click="$common.showModal('提示','参与者想要报名加入活动则需要正确输入你设置的口令才可以报名活动')"></image> -->
					<input placeholder="用户输入口令方可加入" v-model="body.paskey" cursor-spacing="100"
						placeholder-class="place money" type="digit" />
				</view>
			</view>
			<view class="ui-list">
				<text>活动地点</text>
				<view class="ui-list-right">
					<!-- <image src="/static/img/tips.png" class="ico" @click="$common.showModal('提示','活动地点')"></image> -->
					<!-- <view placeholder="请选择活动地点" @click="onclickGoto(1)" class="display bun"> -->
					<view class="address" @click="onclickGoto(1)">
						{{body.location_name.length==0 ? '请选择活动地点':body.location_name}}
					</view>
					<uni-icons class="icon" color="#cccccc" type="right" size="16"></uni-icons>
					<!-- </view> -->
					<!-- <image src="/static/img/dingwei.png" class="ico"></image> -->

				</view>
			</view>
			<view class="ui-list">
				<text>活动范围</text>
				<view class="ui-list-right">
					<!-- <image src="/static/img/tips.png" class="ico"
						@click="$common.showModal('提示','参与者需在圈定的范围内进行活动，离开5分钟后将会自动转变成为杰瑞')"></image> -->
					<view class="address" @click="onclickGoto(2)">
						{{polygons.length==0?'点击设置获得范围':'已选择'}}
					</view>
					<uni-icons class="icon" color="#cccccc" type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="ui-list">
				<text>活动人数</text>
				<view class="ui-list-right">
					<input type="number" placeholder="默认为50人" v-model="body.max_participants" cursor-spacing="100" placeholder-class="place" />
				</view>
			</view>
			

			<view class="ui-list">
				<text>活动时长</text>
				<view class="ui-list-right">
					<input :placeholder="placeholder" v-model="body.duration" placeholder-class="place" type="number" />
					<text>分钟</text>
				</view>
			</view>
			<view class="ui-list right">
				<text>活动时间</text>
				<view class="ui-list-right">
					<picker mode="date" :value="body.date" :disabled="false" @change="bindPickerChange">
						<view class="picker">
							{{body.date}}
						</view>
					</picker>
					<picker style="margin-left: 10rpx;" mode="time" v-model="body.time" :disabled="false"
						@change="bindPickerChangetime">
						<view class="picker">
							{{body.time}}
						</view>
					</picker>
				</view>
			</view>

			<view class="ui-list" v-for="(item,index) in effects" :key="index">
				<text>{{item.name}}</text>
				<view class="ui-list-right">
					<radio-group>
					    <label class="radio">
					        <radio value="1" color="red"/>有
					    </label>
					    <label class="radio" style="margin-left: 20rpx;">
					        <radio value="0" color="#5585ff" checked="true"/>没有
					    </label>
					</radio-group>
				</view>
			</view>





			<!-- <view class="ui-list">
				<text>技能玩法</text>
				<image src="/static/img/tips.png" class="ico"
					@click="$common.showModal('提示','某个杰瑞会获得某个技能，汤姆捕猎到之后会获得此杰瑞的相应技能。\n\n结果会在勋章榜展示\n\n至于伙伴们问我这技能有什么用...我也不知道其实。\n\n可以自行协商某某技能对应什么奖励...嗯就这样')">
				</image>
				<view class="ui-list" style="padding: 0;">
					<view style="width: 100%;">
						<view class="horde" v-for="(item,index) in effects" :key="index">
							<input type="text" maxlength="15" :placeholder="placeholder" v-model="item.name"
								:id="item.id" cursor-spacing="100" placeholder-class="place" />
							<image src="/static/img/close.png" class="ico" @click="effectsSplice(index)"></image>
						</view>
					</view>
				</view>
			</view> -->

			<!-- 		<view>
				<view class="ui-list" >
					<text>阵营设置</text>
					<view  class="imgAvatar" v-for="(item,index) in theme_horde" :key="index" >
						<image class="iavatar"  :src="item.img" @tap="settingChoose_horde(index)"></image>
						
						<input type="text" :placeholder="placeholder" v-model="item.name" placeholder-class="place" />
					</view>
					
				</view>
			</view> -->

			<view class="ui-list">
				<text>阵营设置</text>
				<!-- <image src="/static/img/tips.png" class="ico"
					@click="$common.showModal('提示','是否允许参与者自行选择阵营？反之则系统内部随机分配')">
				</image> -->
				<view class="ui-list-right">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="0" color="#5585ff" checked="true" />随机分配
						</label>
						<label class="radio" style="margin-left: 20rpx;">
							<radio color="red" value="1" />自行选择
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		<view class="active-rules">
			<view class="active-title">
				<view class="active-title-left">活动规则</view>
			</view>
			<view class="active-rules-content">
				<textarea :auto-height="true" :placeholder="placeholder" placeholder-class="place" cursor-spacing="150"
					v-model="body.description" maxlength="-1"></textarea>
			</view>
		</view>

		<!-- <view class="active-rules">
			<view class="active-title">
				<view class="active-title-left">报名须知</view>
				<view class="active-title-right">生成模板</view>
			</view>
			<view class="active-rules-content">
				<textarea :auto-height="true" :placeholder="placeholder" placeholder-class="place" cursor-spacing="150"
					v-model="body.description" maxlength="-1"></textarea>
			</view>
		</view> -->


		<!-- <view class="active-rules">
			<view class="active-title">
				<view class="active-title-left">报名须知</view>
				<view class="active-title-right">生成模板</view>
			</view>
			<view class="active-rules-content">
				<textarea :auto-height="true" :placeholder="placeholder" placeholder-class="place" cursor-spacing="150"
					v-model="body.description" maxlength="-1"></textarea>
			</view>
		</view> -->


		<view class="active-rules">
			<view class="active-title">
				<view class="active-title-left">主图</view>
				<view class="active-title-right" @tap="useDefaultImage">使用参考图</view>
			</view>
			<view class="imgAvatar" @tap="chooseImage">
				<view class="imgAvatar-item">
					<image v-if="image_reduce" :src="image_reduce" class="iavatar"></image>
					<template v-else>
						<uni-icons type="camera" size="30"></uni-icons>
						<view class="iavatar-title">添加图片</view>
					</template>
				</view>
			</view>
		</view>

		<!-- <view class="active-rules">
			<view class="active-title">
				<view class="active-title-left">展示图</view>
				<view class="active-title-right">使用参考图</view>
			</view>
			<view class="imgAvatar">
				<view class="imgAvatar-item" >
					<image v-if="image_reduce!=''" class="iavatar" :src="image_reduce"></image>
					<template v-else>
						<uni-icons type="camera" size="30"></uni-icons>
						<view class="iavatar-title" >添加图片</view>
					</template>
				</view>
			</view>
		</view> -->
		<view class="tips-box">
			<checkbox value="select" />
			<view class="tips-box-text">
				阅读并同意
			</view>
			<view class="tips-box-publish">《发布协议》</view>
		</view>
		<button class="save" @tap="savaInfo">立即发布</button>
	</view>
</template>

<script>
	export default {
		data() {
		    return {
		        theme_id: null, //刚刚打开页面的时候创建活动
		        index: 0,
		        placeholder: '请填写',
		        image_reduce: '', // 存储用户选择或默认的图片路径
		        defaultImage: '/static/img/maohelaoshu.jpg', // 默认图片路径
		        theme_horde: [], // 阵营数组
		        effects: [], // 特效鼠数组
		        polygons: [], // 活动限制区域数组
		        map: null, // 后台返回的地图key
		        body: {
					max_participants: '50',  // 默认活动人数
		            time: '00:00',
		            date: '',
		            title: '',
		            paskey: '',
		            location_name: "",
		            location_latitude: '',
		            location_longitude: '',
		            description: '',
		            duration: '60',
		            effects: [], // 特效鼠数组
		            radio: 0,
		        },
		        radioHordes: [
		            { name: '随机分配', value: '0' },
		            { name: '自行选择', value: '1' }
		        ],
		        // 新增
		        typeList: [
		            { text: '猫鼠游戏', value: 0 },
		            { text: '其他活动', value: 1 }
		        ],
		    }
		},

		onLoad() {
			if (this.$common.checkLogin() == false) {
				this.$common.wx_login('wx_login', () => {
					this.onloadPage()
				})
			} else {
				this.onloadPage()

			}

			//监控扫码事件回调
			uni.$on('creation', this.callback_creation)
		},
		onReady() {

		},
		methods: {
			useDefaultImage() {
			        this.image_reduce = this.defaultImage; // 设置为默认图片
			    },
			    chooseImage() {
			        let that = this;
					const maxSize = 1024 * 1024 * 2; // 限制为2MB
					
				uni.chooseImage({
					count: 1,  // 默认为1,设置为1表示一次选择一张图片
					sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
					success(res) {
						const tempFilePaths = res.tempFilePaths;
						const tempFiles = res.tempFiles;
			
						// 检查文件大小
						if (tempFiles[0].size > maxSize) {
							uni.showToast({
								title: '图片过大，请选择不超过2MB的图片',
								icon: 'none'
							});
							return;  // 如果文件过大，提示用户并终止
						}
			
						// 设置图片路径到data变量，用于显示或上传
						if (tempFilePaths.length > 0) {
							that.image_reduce = tempFilePaths[0];
						}
					},
					fail(err) {
						console.log('选择图片失败', err);
					}
				});
			    },
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.uForm.validateField('userInfo.sex')
			},
			// 删除特效书
			effectsSplice(index) {
				this.effects.splice(index, 1);
			},
			radioChange(evt) {
				for (let i = 0; i < this.radioHordes.length; i++) {
					if (this.radioHordes[i].value === evt.detail.value) {
						this.body.radio = i;
						break;
					}
				}
			},
			activeChange(evt, index) {
				this.effects.forEach((ele, index1) => {
					if (index === index1 && evt.detail.value == '1') {
						ele.select = true
					} else if (index === index1 && evt.detail.value == '0') {
						ele.select = false
					}
				})
				this.body.effects = this.effects.filter(ele => {
					return ele.select
				})
			},
			onclickGoto(t) {
				this.$common.goto('/pages/map?t=' + t + '&map=' + this.map + '&latitude=' + this.body.location_latitude +
					'&longitude=' + this.body.location_longitude)
			},
			/**
			 * 选择地点事件回调 */
			callback_creation(res) {
				console.log(res)
				var that = this
				console.log('callback_creation', res)
				if (res.value == undefined) {

					console.log('选择地点事件回调 出错')
					return;
				}
				var tmp = res.value;
				if (res.t == 1) { //回调的时候区分是选择单一位置的回调，还是选择限制区域的回调
					that.body.location_name = tmp.name
					that.body.location_latitude = tmp.latitude
					that.body.location_longitude = tmp.longitude

				} else {
					that.polygons = tmp
				}
			},
			bindPickerChange(res) {
				this.body.date = res.detail.value
			},
			bindPickerChangetime(res) {
				this.body.time = res.detail.value
				this.$forceUpdate()
			},
			/**
			 * 页面初始化
			 *   */
			onloadPage() {
				var that = this
				that.theme_horde.push({
					img: '/static/img/a.png',
					name: '汤姆'
				}, {
					img: '/static/img/b.png',
					name: '杰瑞'
				})
				that.$common.get_request({
						type: 'creation_theme'
					},
					function(res) {
						if (res.theme_id == undefined) {
							that.$common.toast("创建活动失败")
							return;
						}
						that.theme_id = res.theme_id
						that.body = res.body
						that.effects = res.effects
						that.map = res.map
					}
				)
			},
			/**
			 * 设置活动图片
			 *   */
			settingChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						if (res.tempFilePaths.length <= 0) {
							return;
						}
						console.log(res.tempFilePaths[0])
						that.image_reduce = res.tempFilePaths[0];
						that.$forceUpdate()
					}
				});
			},
			
			/**
			 * 上传活动图片
			 *   */
			avatarChoose(successFun) {
				let that = this;

				that.$common.uploadFile(
					that.image_reduce, {
						type: 'upload_file',
						theme_id: that.theme_id,
					},
					function(res) {
						console.log(res)
						successFun()
					}
				);
			},
			/**
			 * 设置活动阵营图片
			 *   */
			settingChoose_horde(i) {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						if (res.tempFilePaths.length <= 0) {
							return;
						}
						that.theme_horde[i].img = res.tempFilePaths[0];
					}
				});
			},
			/**
			 * 上传活动阵营图片
			 *   */
			avatarChoose_horde(i, successFun) {
				let that = this;
				that.$common.uploadFile(
					that.theme_horde[i].img, {
						type: 'upload_horde',
						theme_id: that.theme_id,
						name: that.theme_horde[i].name,
					},
					function(res) {
						console.log(res)
						i++;
						if (i < that.theme_horde.length) {
							that.avatarChoose_horde(i, successFun)
						} else {
							successFun()
						}
					}
				);
			},
			/**
			 * 发布活动
			 *   */
			savaInfo() {
				var that = this
				if (that.body.date == "0000-00-00") {
					that.$common.toast("活动开始时间未填写")
					return;
				}
				if (that.body.duration == "") {
					that.$common.toast("活动持续时间未填写")
					return;
				}
				if (that.body.location_latitude <= 0) {
					that.$common.toast("活动地址未填写")
					return;
				}
				if (that.body.paskey == '') {
					that.$common.toast("活动费用未填写")
					return;
				}
				if (that.body.title == '') {
					that.$common.toast("活动标题未填写")
					return;
				}
				if (that.image_reduce == '') {
					that.$common.toast("活动图片未填写")
					return;
				}
				if (that.description == '') {
					that.$common.toast("活动详细内容未填写")
					return;
				}
				if (that.body.max_participants == "") {
					that.$common.toast("活动人数未填写，默认为50人");
					return;
				}
				for (var i = 0; i < that.theme_horde.length; i++) {
					if (that.theme_horde[i].img == '' || that.theme_horde[i].name == '') {
						that.$common.toast("活动阵营图片或阵营昵称未填写完整")
						return;
					}
				}
				var body = that.body
				body.type = 'send_theme';
				body.theme_id = that.theme_id
				body.effects = JSON.stringify(that.effects)
				body.polygons = JSON.stringify(that.polygons)
				console.log(body);
				// return
				that.avatarChoose(() => {

					that.$common.get_request(
						body,
						function(res) {
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel: false,
								confirmText: '确定',
								success: (res) => {
									if (res.confirm) {
										that.$common.goback()
									}
								}
							})
						}
					)
				})
				// that.avatarChoose(()=>{
				// 	that.avatarChoose_horde(0,()=>{
				// 		that.$common.get_request(
				// 			that.body,
				// 			function(res){
				// 				that.$common.goback()
				// 			}
				// 		)
				// 	})
				// })

			},
		},
	}
</script>


<style lang="scss" scoped>
	page {
		background-color: #f5f5f5;
		padding: 20rpx 30rpx;
	}

	.container {
		padding-bottom: 50rpx;
	}

	text {
		color: #303133;
		font-size: 28rpx;
		vertical-align: middle;
		min-width: 150rpx;
		font-weight: bold;
	}

	.tips-box {
		display: flex;
		color: #101b2c;
		font-size: 28rpx;
		align-items: center;
		margin: 50rpx auto;
		width: 686rpx;

		.tips-box-text {}

		.tips-box-publish {
			color: rgb(1, 117, 254);
		}
	}

	.active-title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.active-title-left {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 700;
			color: #0d0d0d;
		}

		.active-title-right {
			background: #d2eaff;
			color: #5585ff;
			border-radius: 54rpx;
			padding: 8rpx 30rpx;
		}
	}

	.active-rules {
		background: #fff;
		border-radius: 24rpx;
		padding: 30rpx;
		margin: 20rpx 0;

		.active-rules-content {
			background: rgb(245, 245, 245);
			border-radius: 18rpx;
			margin-top: 20rpx;

			textarea {
				color: #606266;
				vertical-align: middle;
				width: 100%;
				padding: 0 18rpx;
				box-sizing: border-box;
			}
		}

		.imgAvatar-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: rgb(245, 245, 245);
			width: 150rpx;
			height: 150rpx;
			margin-top: 20rpx;

			.iavatar {
				width: 150rpx;
				height: 150rpx;
			}

			.iavatar-add {
				width: 54rpx;
				height: 46rpx;
			}

			.iavatar-title {
				font-size: 20rpx;
				color: #343546;
			}
		}

	}

	.ico {
		width: 16px;
		height: 16px;
		margin: auto 5px auto auto;
	}



	.ui-all {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 10rpx 30rpx;

		.avatar {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			.imgAvatar {
				width: 100%;
				height: 240px;
				display: flex;
				vertical-align: middle;
				overflow: hidden;
				border: solid 1px #dadada;

				.iavatar {
					width: 100%;
					height: 200px;
					display: block;
				}

				.iavatar-add {
					width: 40px;
					height: 40px;
					margin: auto;
				}
			}

			text {
				display: flex;
				color: #8e8e93;
				font-size: 28rpx;
				margin: auto;
				text-align: center;
				justify-content: center;
			}
		}

		.ui-list {
			width: calc(100% - 20px);
			text-align: left;
			padding: 20rpx 20rpx;
			border-bottom: solid 2rpx #f2f2f2;
			display: flex;
			padding: 30rpx 0;

			.ui-list-right {
				text-align: right;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				flex: 1;
				font-size: 30rpx;

				.address {
					color: #999999;
					font-size: 28rpx;
				}
				.icon {
					min-width: 0;
				}
			}

			// text {
			// 	justify-content: center;
			// 	flex-direction: column;
			// 	display: flex;
			// }

			// .imgAvatar {
			// 	width: 140rpx;
			// 	display: inline-block;
			// 	vertical-align: middle;
			// 	overflow: hidden;
			// 	margin: 5px 10px;

			// 	.iavatar {
			// 		width: 140rpx;
			// 		height: 140rpx;
			// 		display: block;
			// 		margin: 5px;
			// 	}

			// 	input {
			// 		text-align: center;
			// 		color: #bb750d;
			// 	}
			// }

			// .jineng {
			// 	width: 50%;
			// 	float: left;
			// 	margin: 10rpx auto;
			// }

			// input {
			// 	color: #030303;
			// 	font-size: 30rpx;
			// 	display: inline-block;
			// 	vertical-align: middle;
			// 	flex: 1;
			// }

			// button {
			// 	color: #030303;
			// 	font-size: 30rpx;
			// 	display: inline-block;
			// 	vertical-align: middle;
			// 	background: none;
			// 	margin: 0;
			// 	padding: 0;

			// 	&::after {
			// 		display: none;
			// 	}
			// }


			// picker {
			// 	margin-right: 10px;
			// 	color: #030303;
			// 	font-size: 30rpx;
			// 	display: inline-block;
			// 	vertical-align: middle;
			// 	//top: 30rpx;
			// 	//left: 150rpx;
			// 	height: 20px;

			// 	view {
			// 		height: 20px;
			// 	}
			// }

			// textarea {
			// 	color: #030303;
			// 	font-size: 30rpx;
			// 	vertical-align: middle;
			// 	width: 100%;
			// }

			.place {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.ui-list:last-child {
			border-bottom: none;
		}
	
	}

	.display {
		color: #030303;
		font-size: 30rpx;
		display: initial;
		vertical-align: middle;
		min-height: 23px;
		flex: 1;
		width: 100%;
	}

	.horde {
		display: flex;
		margin: 5px 0px;
	}

	.save {
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 10rpx;
		background-color: #0175fe;
		color: #fff;
		font-weight: 700;
		width: 686rpx;
		margin: 0 auto 10rpx;
	}
</style> 