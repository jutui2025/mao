<!-- 猫和老鼠报名活动详情页 -->
<template>
	<view v-if="resData.data" class="background-img">
		<view class="header">
			<image class="theme-img" :src="resData.data.theme_ico" @click="onClickPreviewImage"></image>
		</view>
		<view class="detail">
			<view class="detail-title">{{resData.data.title}}</view>
			<view class="detail-tip">
				<view class="detail-tip-left">男女不限</view>
				<view class="detail-tip-right">限{{resData.data.max_participants}}人</view>
				<view class="detail-tip-right">{{Math.floor(resData.data.duration / 60)}}分钟</view>
			</view>
			<!-- 			<view class="detail-number">
				报名人数：{{resData.user_list.length}}/{{resData.data.max_participants}}
			</view> -->
			<view class="detail-time">
				<view class="detail-time-l">
					<view class="detail-time-top">
						{{resData.data.closeTime}}
					</view>
					<view class="detail-time-bottom">
						报名截至时间
					</view>
				</view>
				<view class="detail-time-c">

				</view>
				<view class="detail-time-r">
					<view class="detail-time-top">
						{{resData.data.date}}
					</view>
					<view class="detail-time-bottom">
						活动开始时间
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="publish">
			<view class="publish-title">
				发起人：
			</view>
			<image class="publish-image" :src="resData.user.avatar" mode=""></image>
			<view class="publish-name">
				{{resData.data.user_id}}
			</view>
		</view> -->
		<view class="address">
			<image src="../static/img/index/map.png" mode=""></image>
			<view class="address-info">
				<view class="address-title2">
					{{resData.data.location_name}}
				</view>
				<view class="address-button" @click="openLocation()">
					<image src="../static/img/index/address_btn.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 当前报名20240414修改 -->
		<view class="entry">
			<view class="entry-title">
				当前报名（{{resData.user_list.length}}/{{resData.data.max_participants}}）
			</view>
			<view class="entry-users">
				<view class="user-box" v-for="(item,index) in resData.user_list" :key="index">
					<image :src="item.avatar" mode=""></image>
					<view class="user-name">{{item.nickname}}</view>
				</view>
			</view>
		</view>

		<view class="active">
			<view class="active-title">活动规则</view>
			<view class="active-content">{{resData.data.context}}</view>
			<view class="active-title">玩家须知</view>
			<view class="date" v-if="effects.length>0">
				<!-- <image src="/static/img/muyu.png" class="limited-size"></image> -->
				<view class="active-content">技能：{{effects}}
					<image src="/static/img/tips.png" class="limited-size"
						@click="$common.showModal('提示','某个杰瑞会获得某个技能，汤姆捕猎到之后会获得此杰瑞的相应技能。\n\n结果会在勋章榜展示\n\n至于伙伴们问我这技能有什么用...我也不知道其实。\n\n可以自行协商某某技能对应什么奖励...嗯就这样')">
					</image>
				</view>
			</view>
			<view class="data-v-29c33797">
				<view class="date">
					<!-- <image src="/static/img/forbid.png" class="limited-size"></image> -->
					<view class="active-content">限制：活动开始{{resData.blocking}}分钟内限制捕猎
						<image src="/static/img/tips.png" class="limited-size"
							@click="$common.showModal('提示','开始后的5分钟内是杰瑞的逃跑时间，汤姆是不可以进行捕捉的。\n\n当然,你可以不信...')">
						</image>
					</view>

				</view>
			</view>
			<view class="active-title">
				活动照片
			</view>
			<view class="date">
				<!-- <image src="/static/img/forbid.png" class="limited-size"></image> -->
				<view class="active-content">阵营：阵营由{{resData.data.radio==1?'玩家自行选择':'系统随机分配'}}
					<image src="/static/img/tips.png" class="limited-size"
						@click="$common.showModal('提示','阵营的分配方式是由发起者在创建的时候设定的')">
					</image>
				</view>
			</view>
		</view>
		<!-- TAB栏目1 -->
		<!-- <view v-show="tab_index==0">
				<view class="theme-data">
					<view class="date">
						<image src="/static/img/time.png"></image>
						<view class="text">活动开始时间：{{resData.data.date}}</view>
					</view>
					<view class="date">
						<image src="/static/img/time.png"></image>
						<view class="text">预计结束时间：{{resData.data.closeTime}}</view>
					</view>
					<view class="location" @click="openLocation()">
						<image src="/static/img/location-set.png"></image>
						<view class="text">地址：{{resData.data.location_name}}</view>
						<image src="/static/img/location-open.png" class="ico"></image>
					</view>
					<view class="date" v-if="effects.length>0">
						<image src="/static/img/muyu.png"></image>
						<view class="text">技能：{{effects}}</view>
						<image src="/static/img/tips.png" class="ico"
							@click="$common.showModal('提示','某个杰瑞会获得某个技能，汤姆捕猎到之后会获得此杰瑞的相应技能。\n\n结果会在勋章榜展示\n\n至于伙伴们问我这技能有什么用...我也不知道其实。\n\n可以自行协商某某技能对应什么奖励...嗯就这样')">
						</image>
					</view>
					<view class="date">
						<image src="/static/img/forbid.png"></image>
						<view class="text">限制：活动开始{{resData.blocking}}分钟内限制捕猎</view>
						<image src="/static/img/tips.png" class="ico"
							@click="$common.showModal('提示','开始后的5分钟内是杰瑞的逃跑时间，汤姆是不可以进行捕捉的。\n\n当然,你可以不信...')"></image>
					</view>
					<view class="date">
						<image src="/static/img/forbid.png"></image>
						<view class="text">阵营：阵营由{{resData.data.radio==1?'玩家自行选择':'系统随机分配'}}</view>
						<image src="/static/img/tips.png" class="ico"
							@click="$common.showModal('提示','阵营的分配方式是由发起者在创建的时候设定的')"></image>
					</view>
				</view>
				<view class="theme-data">
					<view style="margin: 10px auto;color: #BFBFBF;">活动规则</view>
					<text>
						{{resData.data.context}}
					</text>
				</view>
			</view> -->
		<!-- </view> -->
		<!-- 底部 -->
		<view class="bottom">
			<view class="bottom-box">
				<!-- 				<view class="bottom-box-fav">
					<view class="bottom-box-top">
						<image src="../static/img/index/detailsc.png" mode=""></image>
					</view>
					<view class="bottom-box-bottom">
						收藏
					</view>
				</view> -->
				<view class="bottom-box-share">
					<button open-type="share" style="border: #fff !important;background-color: #fff;border-radius:0;">
						<view class="bottom-box-top">
							<image src="../static/img/index/share.png" mode=""></image>
						</view>
						<view class="bottom-box-bottom">
							分享
						</view>
					</button>
				</view>
				<view class="bottom-box-entry" @click="startDuoMaoMao">
					{{resData.join.but_name.name}}
				</view>
			</view>
		</view>

		<chong-login ref="popupRef" :AppBaseInfoIsWeChat="login.AppBaseInfoIsWeChat" @formsubmit="formsubmit">

		</chong-login>
		<!--弹出输入口令-->
		<uni-popup ref="popup" type="center">
			<view class="popup-box">
				<!-- 关闭此弹窗 -->
				<image src="/static/img/close.png" @click="this.$refs.popup.close()"
					style="width: 40rpx;height: 40rpx;position: absolute;top: 30rpx;right: 30rpx;"></image>
				<view class="title">选择阵营及输入口令以加入活动</view>
				<view v-if="resData.data.radio==1">
					<view class="imgAvatar" v-for="(item,index) in horde.array" :key="index"
						@click="selest_hordeId =item.id"
						:style="selest_hordeId == item.id ?'border: solid 1px #01bb75;':''">
						<image class="iavatar" :src="item.horde_ico"></image>

						<view class="place">{{item.horde_name}}</view>
					</view>
				</view>
				<view class="key">
					<input placeholder="输入活动口令" v-model="addTheme.key" />
					<view class="but_key" @click="selectHorde()">加入</view>
				</view>
				<view class="tips" @click="$common.showModal('提示','活动口令由发起者设置，可咨询发起者索要')">
					口令小提示
					<image src="/static/img/tips.png"></image>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import popupLayer from '@/components/chong-login/chong-login.vue';
	export default {
		data() {
			return {
				theme_id: '', //活动ID,由上一个页面传递
				resData: {}, //活动详情
				selest_hordeId: '', //用户自行选择的阵营ID

				tab_index: 0,
				effects: '',
				login: {
					AppBaseInfoIsWeChat: false, //系统基础信息，用户判断程序运行在微信里面还是搭载了微信SDK的应用上面

				},
				horde: {
					array: []
				},
				addTheme: {
					show: false,
					key: ''
				},
				open: '',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500

			}
		},

		onLoad(res) {
			if (res.theme_id) {
				this.theme_id = res.theme_id;
				if (this.$common.checkLogin() == false) {
					console.log("wx_login")
					this.$common.wx_login('wx_login', () => {
						this.onload_theme_info()
					})
				} else {

					this.onload_theme_info()
				}
				this.login.AppBaseInfoIsWeChat = this.$common.getAppISWeChat()

			}
		},

		onPullDownRefresh() {
			if (this.theme_id) {
				if (this.$common.checkLogin() == false) {
					console.log("wx_login")
					this.$common.wx_login('wx_login', () => {
						this.onload_theme_info()
					})
				} else {

					this.onload_theme_info()
				}

				this.login.AppBaseInfoIsWeChat = this.$common.getAppISWeChat()

				uni.stopPullDownRefresh();
			}
		},
		onShareAppMessage(res) {
			var that = this;
			return {
				title: that.resData.data.title,
				path: '/pages/theme_info?theme_id=' + that.theme_id + "&share=1",
			}

		},
		onShareTimeline() {
			var that = this;
			return {
				title: that.resData.data.title,
				path: '/pages/theme_info?theme_id=' + that.theme_id + "&share=1",
			}
		},
		methods: {
			formsubmit() {
				this.addTheme.show = true
			},
			/**
			 * 预览图片。
			 * */
			onClickPreviewImage() {
				var urls = [];
				urls.push(this.resData.data.theme_ico)
				uni.previewImage({
					urls: urls,
					loop: true, //是否可循环预览，默认值为 false
					//longPressActions:
				});
			},
			/**
			 * 使用应用内置地图查看位置。
			 * */
			openLocation() {
				var that = this
				var res = JSON.parse(that.resData.data.location)
				console.log(res)
				uni.openLocation({
					latitude: parseFloat(res.latitude),
					longitude: parseFloat(res.longitude),
					name: that.resData.data.location_name,
					success: () => {}
				})
			},


			// 开始活动
			startDuoMaoMao() {
				var that = this
				// that.$common.goto('/pages/index/index?theme_id='+this.theme_id)
				// return;
				if (that.resData.join.join == false) {
					if (that.resData.user.nickname == 0) {
						that.$refs.popupRef.show()
						return;
					}
					this.$refs.popup.open('center')
					//return
				} else {
					if (that.resData.join.type == 1 && that.resData.data.user_id == that.resData.user.id) { //游戏发起者点击开启活动
						uni.showModal({
							title: '提示',
							content: '开始活动后，未报名的将无法报名加入活动，是否现在开始？',
							confirmText: '开始',
							success: (res) => {
								if (res.confirm) {
									this.$common.get_request({
											type: 'start_theme',
											id: that.theme_id,
										},
										function(res) {
											that.onload_theme_info()
										})
								}
							}
						})

					} else if (that.resData.join.type == 2) { //已报名且已开始游戏直接进入
						that.$common.goto('/pages/index/index?theme_id=' + this.theme_id)
					} else {
						that.$common.toast(that.resData.join.but_name.name) //游戏已结束||游戏未开始
					}
				}
			},
			// 加载活动详情
			onload_theme_info() {
				var that = this
				// this.$refs.popup.close()
				this.$common.get_request({
						type: 'theme_info',
						id: that.theme_id,
					},
					function(res) {
						that.resData = res
						if (res.horde) {
							that.horde.array = res.horde
						}
						that.effects = ''
						for (var i = 0; i < res.effects.length; i++) {
							if (i == res.effects.length - 1) {
								that.effects += res.effects[i].name
							} else {
								that.effects += res.effects[i].name + '、'
							}
						}

					})
			},
			// 申请加入活动
			selectHorde() {
				var that = this
				if (that.addTheme.key == '') {
					that.$common.toast("未填写口令")
					return;
				}
				if (that.resData.data.radio == 1 && that.selest_hordeId == '') {
					that.$common.toast("请先选择上方展示的阵营以加入活动")
					return;
				}
				this.$common.get_request({
						type: 'add_theme',
						id: that.theme_id,
						horde_id: that.selest_hordeId,
						key: that.addTheme.key,
					},
					function(res) {
						this.$refs.popup.close()

						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: false,
							confirmText: '知道啦',
							success: () => {
								that.onload_theme_info()
							}
						});

					})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/login.css";

	page {
		background: #f8fff5;
		padding: 30rpx;
	}

	.popup-box {
		background-color: #ffffff;
		width: 650rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			font-size: 32rpx;
			color: #000;
			font-weight: bold;
		}

		.key {
			display: flex;
			margin: 10% auto;
			width: 90%;

			input {
				flex: 3;
				background-color: #ececec;
				padding: 0.6em;
				border-top-left-radius: 30rpx;
				border-bottom-left-radius: 30rpx;
			}

			.but_key {
				background-color: #ececec;
				padding: 0.6em;
				border-top-right-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
				margin-left: 4rpx;
				text-align: center;
				flex: 1;
			}
		}

		.tips {
			font-size: 26rpx;
			color: #BFBFBF;
			display: flex;
			justify-content: center;

			image {
				border-radius: 20rpx;
				right: 20rpx;
				width: 40rpx;
				height: 40rpx;
				margin: auto 10rpx;
			}
		}

		.iavatar {
			width: 100px;
			height: 100px;
			margin: auto;
			display: flex;
		}

		.title {
			width: 100%;
			text-align: center;
			font-size: 1em;
			font-weight: 600;
			margin: 10px auto;
		}

		.imgAvatar {
			width: 200rpx;
			display: inline-block;
			vertical-align: middle;
			overflow: hidden;
			margin: 10rpx 20rpx;

			.iavatar {
				width: 200rpx;
				height: 200rpx;
				display: block;
			}

			.place {
				text-align: center;
				color: #bb750d;
			}
		}

		.tips {
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 30rpx;
				height: 30rpx;
			}

		}

	}

	.limited-size {
		width: 30px;
		/* 设置你需要的宽度 */
		height: 30px;
		/* 设置你需要的高度 */
	}

	.header {
		height: 422rpx;
		border-radius: 24rpx 24rpx 0rpx 0rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.detail {
		background-color: #fff;
		border-radius: 0 0 24rpx 24rpx;
		margin: 0 auto;
		padding: 30rpx;

		.detail-title {
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333;
		}

		.detail-tip {
			display: flex;

			.detail-tip-left {
				padding: 10rpx 20rpx;
				background: #f0f8ff;
				border-radius: 10rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0186ff;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}

			.detail-tip-right {
				padding: 10rpx 20rpx;
				background: #f0f8ff;
				border-radius: 10rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0186ff;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}

		.detail-number {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333;
			margin-top: 20rpx;
		}

		.detail-time {
			display: flex;
			justify-content: space-between;
			background: #eaeaea;
			border-radius: 16rpx;
			padding: 20rpx 30rpx;
			align-content: center;
			border: 2rpx solid #01afff;
			margin: 0 auto;
			margin-top: 38rpx;

			.detail-time-l {
				text-align: center;
			}

			.detail-time-c {
				width: 2rpx;
				height: 40rpx;
				background: rgb(230, 230, 230);
				margin-top: 20rpx;
			}

			.detail-time-r {
				text-align: center;
			}

			.detail-time-top {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 700;
				color: #333;
			}

			.detail-time-bottom {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999;
				margin-top: 14rpx;

			}
		}
	}

	.publish {
		display: flex;
		align-items: center;
		background: #fff;
		border-radius: 24rpx;
		margin: 0 auto;
		padding: 30rpx;
		margin: 20rpx 0;
		display: flex;
		align-items: center;

		.publish-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999;
		}

		.publish-image {
			width: 50rpx;
			height: 50rpx;
			border-radius: 50rpx;
		}

		.publish-name {
			margin-left: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333;
		}
	}

	.address {
		height: 100rpx;
		border-radius: 24rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		position: relative;

		image {
			width: 100%;
			top: 0;
			height: 100%;
			position: absolute;
		}

		.address-info {
			position: absolute;
			z-index: 9;
			width: 100%;
			height: 100%;
			padding-left: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 20rpx;

			.address-title {
				width: 700rpx;
				/* 容器宽度增加，以适应更大的字体 */
				font-size: 100rpx;
				/* 字体大小增加 */
				font-family: PingFang SC;
				font-weight: 700;
				color: #333;
				text-overflow: ellipsis;
				/* 文字过长时的处理方式，保留...显示 */
				white-space: nowrap;
				/* 文字不换行 */
				overflow: hidden;
				/* 隐藏超出部分 */
			}

			.address-title2 {
				width: 480rpx;
				/* 容器宽度增加，以适应更大的字体 */
				font-size: 30rpx;
				/* 字体大小增加 */
				font-family: PingFang SC;
				font-weight: 700;
				color: #333;
				text-overflow: ellipsis;
				/* 文字过长时的处理方式，保留...显示 */
				white-space: nowrap;
				/* 文字不换行 */
				overflow: hidden;
				/* 隐藏超出部分 */
			}



			.address-button {
				width: 128rpx;
				height: 56rpx;
				position: absolute;
				right: 70rpx;
				top: 20rpx;

				image {
					width: 128rpx;
					height: 56rpx;
				}
			}
		}

	}

	.entry {
		background: #fff;
		border-radius: 24rpx;
		margin: 0 auto;
		padding: 1rpx 30rpx 30rpx;
		margin-top: 20rpx;

		.entry-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 700;
			color: #333;
			margin-top: 30rpx;
		}

		.entry-swiper {
			height: 180rpx;
			position: relative;
			width: 100%;
			padding: 10rpx 0;

			.swiper-item {
				display: flex;
				height: 180rpx;

				.swiper-item-box {
					height: 180rpx;
					text-align: center;
					width: 20%;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 10rpx 0 0;

					image {
						width: 84rpx;
						height: 84rpx;
						border-radius: 50%;
					}

					.swiper-item-name {
						width: 80rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						font-size: 22rpx;
						color: #666;
					}
				}

			}
		}
	}

	.active {
		background: #fff;
		border-radius: 24rpx;
		margin: 0 auto;
		padding: 1rpx 30rpx 30rpx;
		margin-top: 20rpx;
		margin-bottom: 200rpx;

		.active-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 700;
			color: #333;
			margin-top: 30rpx;
		}

		.active-content {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666;
			margin-top: 10rpx;
		}
	}


	.bottom {
		position: fixed;
		bottom: 0px;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 120rpx;
		padding: 30rpx 30rpx;
		z-index: 9999;
		align-items: center;
		box-sizing: border-box;

		.bottom-box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.bottom-box-fav {
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.bottom-box-share {
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;

				button::after {
					border: none;
				}
			}

			.bottom-box-entry {
				width: 450rpx;
				height: 78rpx;
				background: #0186ff;
				border-radius: 38rpx;
				margin-left: 30rpx;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fff;
			}

			.bottom-box-top {
				width: 42rpx;
				height: 42rpx;

				image {
					width: 35rpx;
					height: 35rpx;
				}
			}

			.bottom-box-bottom {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333;
			}
		}
	}

	.entry-users {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 10rpx 0;
	}

	.user-box {
		width: calc(100% / 8);
		/* 一行显示5个头像，可以根据需要调整 */
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.user-box image {
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
	}

	.user-name {
		font-size: 22rpx;
		color: #666;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		/* 确保名字在头像下方完整显示 */
	}
</style>