<!-- 猫和老鼠历史活动列表页 -->
<template>

	<view style="width: 100%;height: 100%;background-color: #fff;">




		<!-- <image src="/static/img/Tom.png" style="position: absolute;	left: 50%;transform: translate(-50%,50%);"
			v-if="resDataList.length==0"></image> -->
		<!-- 广告图 -->
		<image v-if="resData.img" :src="resData.img.ba" style="width: 100%;"></image>

		<scroll-view scroll-x="true" class="scroll-tab-container">
			<view class="tab-item" :class="{'active': currentTab === 0}" @tap="switchTab(0)">全部</view>
			<!-- <view class="tab-item" :class="{'active': currentTab === 1}" @tap="switchTab(1)">待审核</view> -->
			<view class="tab-item" :class="{'active': currentTab === 2}" @tap="switchTab(2)">报名中</view>
			<view class="tab-item" :class="{'active': currentTab === 3}" @tap="switchTab(3)">进行中</view>
			<view class="tab-item" :class="{'active': currentTab === 4}" @tap="switchTab(4)">已结束</view>
			<!-- <view class="tab-item" :class="{'active': currentTab === 5}" @tap="switchTab(5)">已签到</view>
			<view class="tab-item" :class="{'active': currentTab === 6}" @tap="switchTab(6)">已取消</view>
			<view class="tab-item" :class="{'active': currentTab === 7}" @tap="switchTab(7)">停止报名</view>
			<view class="tab-item" :class="{'active': currentTab === 8}" @tap="switchTab(8)">已拒绝</view> -->
		</scroll-view>
		<view class="box" v-if="resDataList.length>0">








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
							{{item.userCount}}人已加入
						</view>
						<!-- 						<view class="bottom-box-right" @click="goto_theme_info(item.id)">
							活动25人
						</view> -->
					</view>
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	import popupLayer from '@/components/chong-login/chong-login.vue';
	export default {
		components: {
			popupLayer
		},
		data() {
			return {
				currentTab: 0, // 默认选中的标签
				resData: {},
				resDataList: [],
				location_my: {},
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
			switchTab(index) {
				this.currentTab = index;
				    const query = wx.createSelectorQuery();
				    query.selectViewport().scrollOffset();
				    query.select(`#tab-${index}`).boundingClientRect();
				    query.exec((res) => {
				        wx.pageScrollTo({
				            scrollTop: 0,
				            duration: 300
				        });
				        this.$refs.scrollView.scrollTo({
				            left: res[1].left + res[0].scrollLeft - (window.innerWidth / 2 - res[1].width / 2),
				            duration: 300
				        });
				    });
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
/* 页面基本设置 */
page {
    background-color: #f0f0f5;  // 统一设置为浅灰色背景
    padding-bottom: 20px;
}

/* 滚动标签栏的容器 */
.scroll-tab-container {
    display: flex;
    overflow-x: auto;
    align-items: center;
    background-color: #f0f0f5;  // 与页面背景色一致
    padding: 5px 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    white-space: nowrap;  // 确保标签在一行显示
}

/* 标签样式 */
.tab-item {
    display: inline-block;
    margin-right: 10px;
    padding: 8px 16px;
    font-size: 16px;  // 字体大小适中
    color: #333;  // 文字颜色为深灰
    border-radius: 16px;
    background-color: #ffffff;  // 白色背景突出标签
    transition: background-color 0.3s, color 0.3s;  // 平滑的颜色过渡效果
}

/* 活动标签样式 */
.tab-item.active {
    color: #ffffff;  // 活动标签文字为白色
    background-color: #007bff;  // 蓝色背景突出活动标签
    font-weight: bold;
}

/* 标签栏的滚动条隐藏设置 */
.scroll-tab-container::-webkit-scrollbar {
    display: none;
}

/* 主内容容器样式 */
.box {
    background-color: #f0f0f5;  // 主内容区背景与页面背景一致
    overflow: hidden;
    padding: 20px;  // 内边距为20px
    border-radius: 8px;  // 圆角设置
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);  // 轻微的阴影效果
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
		top: 20rpx;
		box-sizing: border-box;
		background: rgb(245, 245, 245);
		border-radius: 30rpx;
		overflow: hidden;

		.box-tab {
			background-color: #fff;
			height: 218rpx;

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