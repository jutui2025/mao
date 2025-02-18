<!-- 猫和老鼠个人中心页 -->
<template>
	<view>
		<chong-login ref="popupRef" :AppBaseInfoIsWeChat="login.AppBaseInfoIsWeChat" @formsubmit="formsubmit">
		</chong-login>
		<section class="aui-scrollView">
			<view class="aui-mer-list">
				<view class="user-header">
					<view class="user-header-info"  @click="$refs.popupRef.show()">
						<view class="user-header-avatar">
							<image v-if="resData.user.nickname!=0" :src="resData.user.avatar"></image>
							<image v-if="resData.user.nickname==0" src="/static/img/Tom.png"></image>
						</view>
						<h2 v-if="resData.user.nickname!=0">{{resData.user.nickname}}</h2>
						<h2 v-if="resData.user.nickname==0">点击登录</h2>
					</view>
					<view class="code" @click="qrcode.show=true">
						<image src="../static/img/user/code.png" mode=""></image>
					</view>	
					<view class="user-header-right" @click="$common.goto('/pages/camera')">
						<image src="../static/img/user/scan.png" mode=""></image>
					</view>
				</view>
	
				<view class="my-info">
					<view class="my-info-item" @click="$common.goto('/pages/record?title=我的创建&t=1')">
						<view class="my-info-item-number">
							<h2 v-if="resData.data">{{resData.data.creation}}</h2>
							<h2 v-if="!resData.data">0</h2>
						</view>
						<view class="my-info-item-title">
							我的创建
						</view>
					</view>
					<view class="my-info-item" @click="$common.goto('/pages/record?title=我的报名&t=2')">
						<view class="my-info-item-number">
							<h2 v-if="resData.data">{{resData.data.record}}</h2>
							<h2 v-if="!resData.data">0</h2>
						</view>
						<view class="my-info-item-title">
							我的报名
						</view>
					</view>
					<view class="my-info-item" @click="$common.goto('/pages/record?title=已结束&t=3')">
						<view class="my-info-item-number">
							<h2 v-if="resData.data">{{resData.data.theme_close}}</h2>
							<h2 v-if="!resData.data">0</h2>
						</view>
						<view class="my-info-item-title">
							已结束
						</view>
					</view>
<!-- 					<view class="my-info-item">
						<view class="my-info-item-number">
							10
						</view>
						<view class="my-info-item-title">
							我被扫码
						</view>
					</view> -->
				</view>
				<view class="aui-with-bg">
					<view class="common-title">
						<view class="common-title-left">
							我的报名
						</view>
						<view class="common-title-right">
							查看全部
							<uni-icons type="right" size="14" class="#999999"></uni-icons>
						</view>
					</view>
					<view class="aui-palace clearfix">
						<view class="aui-palace-grid" @click="$common.goto('/pages/record?title=我的报名&t=2')">
							<image src="../static/img/user/meun/meun1.png" mode="widthFix"></image>
							<view class="aui-palace-text">
								已报名
							</view>
							<!-- <view class="aui-palace-grid-text">
								<h2 v-if="resData.data">{{resData.data.record}}</h2>
								<h2 v-if="!resData.data">0</h2>
							</view> -->
						</view>
						<view class="aui-palace-grid" @click="$common.goto('/pages/record?title=我的创建&t=1')">
							<image src="../static/img/user/meun/meun2.png" mode="widthFix"></image>
							<view class="aui-palace-text">
								已签到
							</view>
							<!-- <view class="aui-palace-grid-text">
								<h2 v-if="resData.data">{{resData.data.creation}}</h2>
								<h2 v-if="!resData.data">0</h2>
							</view> -->
						</view>
						<view class="aui-palace-grid" @click="$common.goto('/pages/record?title=我的创建&t=1')">
							<image src="../static/img/user/meun/meun3.png" mode="widthFix"></image>
							<view class="aui-palace-text">
								进行中
							</view>
							<!-- <view class="aui-palace-grid-text">
								<h2 v-if="resData.data">{{resData.data.creation}}</h2>
								<h2 v-if="!resData.data">0</h2>
							</view> -->
						</view>
						<view class="aui-palace-grid" @click="$common.goto('/pages/record?title=已结束&t=3')">
							<image src="../static/img/user/meun/meun4.png" mode="widthFix"></image>
							<view class="aui-palace-text">
								已结束
							</view>
							<!-- <view class="aui-palace-grid-text">
								<h2 v-if="resData.data">{{resData.data.theme_close}}</h2>
								<h2 v-if="!resData.data">0</h2>
							</view> -->
						</view>
					</view>
				</view>
			</view>
			<view class="create-box">
				<view class="create-box-item" @click="$common.goto('/pages/creation')">
					<image src="/static/img/user/create_active.png" mode="widthFix"></image>
				</view>
				<view class="create-box-item" @click="$common.goto('/pages/record?title=我的创建&t=1')">
					<image src="/static/img/user/my_active.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="active-box">
				<view class="active-box-item" v-for="(item,index) in activeList" :key="index">
					<image :src="item.imgUrl" mode="widthFix"></image>
					<view class="active-box-item-text">
						{{item.title}}
					</view>
				</view>
			</view>
		</section>
		
		<!-- 个人中心页广告 -->
		<ad unit-id="adunit-8ee29029800709cf" ad-type="video" ad-theme="white" bindload="adLoad" binderror="adError" bindclose="adClose"></ad>
	</view>

</template>

<script>
	// js文件，广告事件监听
	Page({
	  adLoad() {
	    console.log('视频广告 广告加载成功')
	  },
	  adError(err) {
	    console.error('视频广告 广告加载失败', err)
	  },
	  adClose() {
	    console.log('视频广告 广告关闭')
	  }
	})
	
	import popupLayer from '@/components/chong-login/chong-login.vue';
	export default {
		data() {
			return {
				resData: {},
				login: {
					AppBaseInfoIsWeChat: false,
				},
				// activeList: [{
				// 		title: "我的收藏",
				// 		imgUrl: "../static/img/user/active/active1.png"
				// 	},
				// 	{
				// 		title: "我的战绩",
				// 		imgUrl: "../static/img/user/active/active2.png"
				// 	},
				// 	{
				// 		title: "我的动态",
				// 		imgUrl: "../static/img/user/active/active3.png"
				// 	},
				// 	{
				// 		title: "分享好友",
				// 		imgUrl: "../static/img/user/active/active4.png"
				// 	},
				// 	{
				// 		title: "在线客服",
				// 		imgUrl: "../static/img/user/active/active5.png"
				// 	},
				// 	{
				// 		title: "投诉中心",
				// 		imgUrl: "../static/img/user/active/active6.png"
				// 	},
				// 	{
				// 		title: "帮助中心",
				// 		imgUrl: "../static/img/user/active/active7.png"
				// 	},
				// 	{
				// 		title: "设置中心",
				// 		imgUrl: "../static/img/user/active/active8.png"
				// 	}
				// ]
			}
		},
		onLoad() {
			if (this.$common.checkLogin() == false) {
				console.log("wx_login")
				this.$common.wx_login('wx_login', () => {
					this.onload()
				})
			} else {
				this.onload()
			}
			this.login.AppBaseInfoIsWeChat = this.$common.getAppISWeChat()
		},
		onPullDownRefresh() {
			if (this.$common.checkLogin() == false) {
				console.log("wx_login")
				this.$common.wx_login('wx_login', () => {
					this.onload()
				})
			} else {
				this.onload()
			}

			this.login.AppBaseInfoIsWeChat = this.$common.getAppISWeChat()
			uni.stopPullDownRefresh();
		},
		onShareAppMessage(res) {
			var that = this;
			return {
				title: '快来一起玩....',
				path: '/pages/list?share=1',
			}

		},
		onShareTimeline() {
			var that = this;
			return {
				title: '快来一起玩....',
				path: '/pages/list?share=1',
			}
		},
		methods: {
			formsubmit() {
				this.onload()
			},
			onload() {
				var that = this
				this.$common.get_request({
						type: 'info',
					},
					function(res) {
						that.resData = res
					},
					function(e) {}, false
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f4f7ff;
	}

	.create-box {
		display: flex;
		margin-top: 180rpx;
		padding: 0 30rpx;
		justify-content: space-between;
		box-sizing: border-box;

		.create-box-item {
			width: 332rpx;
			height: 180rpx;
			background: linear-gradient(0deg, #fff, #e2f1ff);
			border-radius: 12px;

			image {
				width: 100%;
				height: 180rpx;
			}
		}
	}

	.aui-mer-list {
		background: linear-gradient(0deg, #76beff, #1d94ff);
		height: 400rpx;
		position: relative;
	}

	.my-info {
		display: flex;
		justify-content: space-between;
		padding: 0 120rpx;

		.my-info-item {
			text-align: center;

			.my-info-item-number {
				font-weight: 700;
				color: #fff;
				font-size: 38rpx;
			}

			.my-info-item-title {
				color: rgb(230, 230, 230);
				margin-top: 10rpx;
				font-size: 24rpx;
			}
		}
	}

	.user-header {
		display: flex;
		padding: 50rpx 30rpx;
		justify-content: space-between;
		height: 100rpx;
		align-items: center;

		.user-header-info {
			display: flex;
			font-size: 26rpx;
			font-weight: 700;
			color: #fff;
			align-items: center;

			.user-header-avatar {
				margin-right: 20rpx;
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 100rpx;
				}
			}

		}

		.user-header-right {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			width: 140rpx;
			height: 60rpx;
			background-color: #101b2c;
			border-radius: 100rpx;

			image {
				width: 140rpx;
				height: 60rpx;
			}
		}
	}
	.code {
		margin-right: 200rpx;
		image {
			width: 40rpx;
			height: 40rpx;
	}
	}

	.aui-with-bg {
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 34rpx #ddd;
		width: 90%;
		height: 218rpx;
		margin: 50rpx auto;
		box-sizing: border-box;

		.common-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 30rpx 0;

			.common-title-left {
				font-size: 28rpx;
				color: #343546;
				font-weight: 700;
			}

			.common-title-right {
				color: rgb(153, 153, 153);
				font-size: 24rpx;

				.uni-icons {
					font-size: 24rpx;
				}
			}
		}

		.aui-palace-grid {
			width: 25%;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			.aui-palace-text {
				color: #000;
				font-size: 24rpx;
				font-weight: bold;
			}
		}
	}

	.active-box {
		display: flex;
		flex-wrap: wrap;
		background-color: #fff;
		margin: 20rpx 30rpx;
		justify-content: space-between;
		padding-top: 30rpx;

		.active-box-item {
			text-align: center;
			margin-bottom: 30rpx;
			width: 25%;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			.active-box-item-text {
				color: #000;
				font-size: 24rpx;
				font-weight: bold;
			}
		}
	}

	.aui-scrollView {
		width: 100%;
		height: 100%;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		position: relative;
		margin-top: 0;
	}

	.icon-set {
		background-image: url('data:image/png;base64,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');
	}

	.aui-palace {
		padding: 0;
		position: relative;
		overflow: hidden;
		/* margin-bottom: 15px; */
		text-align: center;
		display: flex;
	}

	.aui-palace-grid {
		position: relative;
		float: left;
		padding: 25px 1px 25px 1px;
		width: 33.333%;
		box-sizing: border-box;
		text-align: center;
	}

	.aui-palace-grid-icon {
		width: 83px;
		height: 22px;
		margin: 0 auto;
	}

	.aui-palace-grid-icon img {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
	}

	.aui-palace-grid-text {
		display: block;
		text-align: center;
		color: #333333;
		font-size: 13px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.aui-palace-grid-text h2 {
		font-size: 0.7rem;
		font-weight: normal;
		color: #ff6d1a;
	}

	.aui-palace-grid-icon span {
		color: #333;
		font-size: 0.8rem;
	}

	.aui-ad-bar img {
		width: 100%;
		height: auto;
		display: block;
		border: none;
	}

	.aui-flex-box-bd {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		min-width: 0;
		color: #333333;
		font-size: 0.8rem;
	}
</style>