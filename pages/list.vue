<!-- 猫和老鼠报名活动列表首页 -->
<template>
	<view>
		<view class="uni-margin-wrap">
			<!-- 			<view class="search-box" :style="{'top': customTop + 'px'}">
				<uni-icons type="search" size="22" color="#fff"></uni-icons>
				<input class="uni-input" placeholder-style="color:#fff" placeholder="搜索你想参加的活动" />
			</view> -->
			<view class="notice-bar">
				<view class="noticeBar">
					<uni-icons type="sound" size="30" color="#fff" style="margin:0 10rpx 0 15rpx;" />
					<swiper class="list" circular="true" vertical="true" autoplay="true" interval="3000"
						duration="1000">
						<swiper-item v-for="item in noticeList" :key="item.id" @click="handleInfo(item.id)">
							{{ item.title }}
						</swiper-item>
					</swiper>
				</view>
			</view>
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item class="swiper-item">
					<image src="/static/img/index/swiper1.png"></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="/static/img/index/swiper2.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 广告图 -->
		<!-- 		<image v-if="resData.img" :src="resData.img.ba" style="width: 100%;"></image> -->
		<view class="box" v-if="resDataList.length>0">

			<view class="box-tab">
				<!-- 列表页流量主广告-->
				<ad unit-id="adunit-6dc7376316decda0" bindload="adLoad" binderror="adError" bindclose="adClose"></ad>


				<!--<view class="box-tab-list">
					<scroll-view scroll-x="true">
						<view class="coach_wrap" @click="selectTab(index)" v-for="(item, index) in tabList"
							:key="index">
							<view class="coach_wrap_item" :class="index == 0?'coach_wrap_item_active':''">
								<image :class="index == 0?'image-active':''"
									v-if="item.imgUrl && (index !== 0 || index == selectTabValue)" :src="item.imgUrl"
									mode=""></image>
								<view v-if="index != selectTabValue || index !== 0" class="title"
									:class="index == selectTabValue?'active':''">
									{{item.title}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>-->
				<!--<view class="box-tab-screen">
					<view class="box-tab-screen-left">
						<view class="address">
							地区选择
							<image src="../static/img/index/down.png" mode=""></image>
						</view>
						<view class="time">

							<picker mode="date" :value="date" @change="bindDateChange">
								<view class="uni-input">{{date || '全部时间'}}</view>
							</picker>
							<image src="../static/img/index/down.png" mode=""></image>
						</view>
					</view>
					<view class="box-tab-screen-right" @click="$common.goto('/pages/camera')">
						<image src="../static/img/index/scan.png" mode=""></image>
						<view class="box-tab-screen-right-text">
							扫一扫
						</view>
					</view>
				</view>-->
			</view>
			<view class="active">
				<view class="li" v-for="(item,index) in resDataList" @click="goto_theme_info(item.id)" :key="index">
					<!-- 中间 -->
					<view class="li-content">
						<view class="li-content-left">
							<image :src="item.image_reduce" class="theme_img" mode=""></image>
						</view>
						<view class="li-content-right">
							<!-- 顶部 标题 -->
							<view class="title">
								{{item.title}}
							</view>
							<view class="font12" v-if="item.location_name">
								<image src="/static/img/index/time.png"></image>
								<view class="font12-title">
									{{item.date}}
								</view>

							</view>
							<view class="font12">
								<image src="/static/img/index/address.png"></image>
								<view class="font12-title">
									{{item.location_name}}
								</view>
							</view>
							<view class="font12">
								<image src="/static/img/index/qianbao.png"></image>
								<view class="font12-title">
									免费
								</view>
							</view>
							<view class="type" :style="{'background-color':item.but_name.color}">
								{{item.but_name.name}}
							</view>
						</view>
					</view>
					<!-- 底部 -->
					<view class="bottom-box">
						<view class="bottom-box-left" v-if="item.userCount">
							<image src="/static/img/renshu.png"></image>
							{{item.userCount}}人已报名
						</view>
						<view class="bottom-box-right" @click="goto_theme_info(item.id)">
							活动限制{{item.max_participants}}人
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// js文件，广告事件监听
	Page({
		adLoad() {
			console.log('Banner 广告加载成功')
		},
		adError(err) {
			console.error('Banner 广告加载失败', err)
		},
		adClose() {
			console.log('Banner 广告关闭')
		}
	})



	import popupLayer from '@/components/chong-login/chong-login.vue';
	// #ifdef MP-WEIXIN
	const custom = wx.getMenuButtonBoundingClientRect()
	// #endif
	export default {
		components: {
			popupLayer
		},
		data() {
			return {
				customTop: custom?.top || 0,
				resData: {},
				resDataList: [],
				location_my: {},
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				upload: { //作记录页面使用的参数
					title: '',
					t: ''
				},
				dialog: {
					content: '', //弹窗的内容
					show: false, //弹窗的可见
					buttons: [{
						text: '取消',
						color: '#7C7F7F'
					}, {
						text: '前往',
						color: '#7C7F7F'
					}],
					radius: 24,
					maskBackground: "rgba(0,0,0,.6)",
					maskClosable: false,
					color: "#333",
					contentColor: "#7F7F7F",
				},
				tabList: [{
						title: "热门",
						imgUrl: "../static/img/index/tab1.png"
					}, {
						title: "真人猫捉老鼠线下活动",
						imgUrl: "../static/img/index/tab2.png"
					},
					// {
					// // 	title: "撕名牌大战",
					// // 	imgUrl: "../static/img/index/tab3.png"
					// // }, {
					// // 	title: "电影搭",
					// // 	imgUrl: "../static/img/index/tab4.png"
					// // }, {
					// // 	title: "饭搭",
					// // 	imgUrl: "../static/img/index/tab5.png"
					// // }, {
					// // 	title: "露营",
					// // 	imgUrl: "../static/img/index/tab6.png"
					// // }, {
					// // 	title: "其他活动",
					// // 	imgUrl: "../static/img/index/tab7.png"
					// }
				],
				selectTabValue: 0,
				date: "",
				colors: '#fff',
				noticeList: [{
						id: 1,
						title: '猫捉老鼠小程序将持续不断升级'
					},
					{
						id: 2,
						title: '建立自己的小程序，联系：18052631112'
					},
					{
						id: 3,
						title: '发起活动后，由发起人提供活动口令参与活动'
					},
					{
						id: 4,
						title: '系统BUG提交微信：18052631112'
					},
					{
						id: 5,
						title: '快来参加活动吧,这里有好玩的活动'
					}
				],
			}
		},
		onLoad(res) {
			var that = this
			if (res.title && res.t) {
				that.upload.title = res.title
				that.upload.t = res.t
			}

			that.click_getLocation(() => {
				that.onload(that.upload.title != '' ? 'record_theme' : 'get_theme')
			})
		},
		onPullDownRefresh() {

			this.onload(this.upload.title != '' ? 'record_theme' : 'get_theme')
			uni.stopPullDownRefresh();
		},
		onReady() {
			if (this.upload.title != '') {
				uni.setNavigationBarTitle({
					title: this.upload.title
				})
				console.log("被修改标题", this.title)
			}
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
		/**
		 * 懒加载-滑动到底部
		 * */
		onReachBottom() {
			this.onload(this.upload.title != '' ? 'record_theme' : 'get_theme', true)
		},
		methods: {
			onload(type = 'get_theme', isReach = false) {
				var that = this;

				// 显示加载提示
				uni.showLoading({
					title: '加载中',
					mask: true // 禁止触摸穿透
				});

				if (isReach) {
					if (that.resData.more === false) {
						uni.hideLoading();
						return; // 如果没有更多数据，直接返回
					}
				} else {
					that.resData = {};
					that.resDataList = [];
				}

				// 模拟加载数据
				setTimeout(() => {
					this.$common.get_request({
						type: type,
						count: that.resData.count || 0,
						location: JSON.stringify(that.location_my)
					}, response => {
						that.resDataList = [...that.resDataList, ...response.list];
						that.resData = response;
						uni.hideLoading(); // 成功后隐藏加载提示
					}, error => {
						console.error('加载失败', error);
						uni.hideLoading(); // 失败也要隐藏加载提示
					});
				}, 1000); // 延迟1秒以模拟网络延迟
			},

			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			selectTab(index) {
				this.selectTabValue = index
			},
			ReachBottom() {
				this.onload(this.upload.title != '' ? 'record_theme' : 'get_theme', true)
			},
			formsubmit(e) {
				console.log('回传', e)
			},
			goto_theme_info(id) {
				this.$common.goto('/pages/theme_info?theme_id=' + id)
			},
			onload(type = 'get_theme', isReach = false) {
				var that = this

				if (isReach == true) {
					if (that.resData.more != undefined && that.resData.more == false) {
						//that.$common.toast("没有更多数据了")
						return;
					}
					var count = that.resData.count ? that.resData.count : 0;
				} else {
					var count = 0
					that.resData = {}
					that.resDataList = []
				}

				this.$common.get_request({
						type: type,
						t: that.upload.t,
						count: count,
						location: JSON.stringify(that.location_my)
					},
					function(res) {
						for (var i = 0; i < res.list.length; i++) {
							that.resDataList.push(res.list[i])
						}
						that.resData = res
					},
					function() {}, false)
			},
			/**
			 * 定位自己的坐标点 */
			click_getLocation(fun) {
				var that = this
				uni.getLocation({
					type: 'gcj02',
					altitude: true, //传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
					isHighAccuracy: true, //开启高精度定位
					success: function(res) {

						that.location_my = res
						fun()
					},
					fail: function(res) {
						console.log('click_getLocation', res)
					}

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: rgb(245, 245, 245);
		padding-bottom: 20px;

	}

	.uni-margin-wrap {
		position: relative;
		font-size: 28rpx;

		.bar {
			border: none;
			display: flex;
			align-items: center;
			color: #fff;
		}

		.sw_text {
			color: #fff !important;
		}
	}

	.notice-bar {
		position: absolute;
		bottom: 50rpx;
		z-index: 999;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;

		.noticeBar {
			width: 690rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #fff;
			font-size: 30rpx;
			border-radius: 50rpx;
			display: flex;

			.list {
				width: 100%;
				height: 100%;
			}
		}
	}

	.search-box {
		position: absolute;
		// top:var(--status-bar-height);
		display: flex;
		z-index: 999;
		align-items: center;
		padding: 0 20rpx;
		width: 420rpx;
		height: 68rpx;
		color: #fff;
		border-radius: 200rpx;
		margin-left: 30rpx;
		background: hsla(0, 0%, 100%, .1) !important;
		border: 1px solid #999 !important;

		.uni-input {
			color: #fff;
		}
	}

	.swiper {
		height: 500rpx;
		width: 100%;

		.swiper-item {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.box {
		position: relative;
		top: -40rpx;
		box-sizing: border-box;
		background: rgb(245, 245, 245);
		border-radius: 30rpx;
		overflow: hidden;

		.box-tab {
			background-color: #fff;
			height: 238rpx;

			.box-tab-list {
				display: flex;
				justify-content: space-between;
				height: 110rpx;
				line-height: 110rpx;
				align-items: center;
				padding: 0 30rpx;

				scroll-view {
					height: 110rpx;
					white-space: nowrap;

					::-webkit-scrollbar {
						display: none;
					}
				}

				.coach_wrap {
					margin-right: 30rpx;
					display: inline-block;
					height: 110rpx;
					line-height: 110rpx;

					.coach_wrap_item {
						display: flex;
						align-items: center;
						justify-content: center;
						height: 110rpx;
						line-height: 110rpx;

						.title {
							color: #999;
							font-size: 28rpx;
						}

						.active {
							font-size: 38rpx;
							font-weight: 600;
							margin-left: -10rpx;
							color: #0253ed;
						}

						image {
							width: 56rpx;
							height: 50rpx;
						}

						.image-active {
							width: 90rpx;
							height: 36rpx;
						}
					}

					.coach_wrap_item_active {
						position: relative;
						top: -15rpx;

						.image-active {
							position: relative;
							top: 10rpx;
							width: 90rpx;
							height: 36rpx;
						}
					}
				}

			}

			.box-tab-screen {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 68rpx;
				padding: 0 30rpx;
				color: #343546;

				.box-tab-screen-left {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;

					.address {
						display: flex;
						align-items: center;
						padding: 0 20rpx;
						height: 68rpx;
						background: #f5f5f5;
						border-radius: 34rpx;
						justify-content: center;

						image {
							width: 16rpx;
							height: 10rpx;
							margin-left: 10rpx;
						}
					}

					.time {
						display: flex;
						align-items: center;
						display: flex;
						align-items: center;
						padding: 0 20rpx;
						height: 68rpx;
						background: #f5f5f5;
						border-radius: 34rpx;
						justify-content: center;
						margin-left: 20rpx;

						image {
							width: 16rpx;
							height: 10rpx;
							margin-left: 10rpx;
						}
					}
				}

				.box-tab-screen-right {
					display: flex;
					justify-content: space-between;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}

					.box-tab-screen-right-text {
						font-size: 24rpx;
						color: #343546;
						margin-left: 5rpx;
					}
				}
			}
		}

		.active {
			padding: 30rpx;
		}

		.li {
			position: relative;
			padding: 30rpx 30rpx 10rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.title {
				height: 50rpx;
				font-size: 32rpx;
				font-weight: 700;
				color: #333;
			}

			.type {
				position: absolute;
				left: 0px;
				top: 0px;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				border-top-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				height: 40rpx;
				width: 100rpx;
				text-align: center;
				justify-content: center;
				background: linear-gradient(90deg, #0186ff, #06f);
			}



			.li-content {
				display: flex;
				position: relative;

				.li-content-left {
					width: 278rpx;
					height: 200rpx;
					border-radius: 20rpx;
					overflow: hidden;

					.theme_img {
						width: 100%;
						height: 100%;
					}
				}

				.li-content-right {
					flex: 1;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					background-color: #ffd40000;

					.font12 {
						display: flex;
						align-items: center;
						margin-top: 10rpx;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 10rpx;
						}

						.font12-title {
							flex: 1;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #666;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.use .but {
						flex-shrink: 0;
						height: 50rpx;
						font-size: 28rpx;
						color: #fff;
						background: #01bb75;
						display: flex;
						flex-direction: column;
						justify-content: center;
						padding: 10rpx 20rpx;
						border-radius: 14rpx;
						text-align: center;
						width: 80rpx;
					}
				}

			}


			.bottom-box {
				height: 60rpx;
				margin-top: 10rpx;
				padding: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bottom-box-left {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: rgb(153, 153, 153);
					font-size: 28rpx;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}
				}

				.bottom-box-right {
					color: #343546;
					font-size: 28rpx;
				}
			}
		}
	}
</style>