<!-- 猫和老鼠扫码页 -->
<template>
	<view v-if="showCamera" class="camera-box">
		<camera device-position="back" flash="off" style="width: 100%; height: 100vh" mode="scanCode" @scancode="scancode"
			@error="error">
			<cover-image 
				class="close-btn" 
				src="@/static/img/close.png" 
				:style="{
					top: statusBarHeight + 'px',
				}" 
				@click="back" 
			/>
			
			<cover-image class="image" src="@/static/img/scan-remark.png" />
			<cover-image  class="scan-bar" src="@/static/img/scan-bar.png" />

		</camera>
	</view>
</template>

<script>
	import {
		getPermission
	} from '@/common/utils.js'
	export default {
		data() {
			return {
				showCamera: false,
				statusBarHeight: 44,
				scanCodeValue:'',
			}
		},
		onLoad(options) {
		},
		onShow() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 10
			this.getPermission()
		},
		methods: {
			getPermission() {
				getPermission({
					permission: 'camera',
					permissionName: '摄像头',
					success: () => {
						this.showCamera = true
					},
					cancel: () => {
						this.back()
					}
				})
			},
			
			// 扫码结果
			scancode(e) {
				this.scanCodeValue = e.detail.result
				this.playMusic()
			},
			
			// 扫码提示音
			playMusic() {
				var that = this
				const innerAudioContext = wx.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = '/static/img/scan-video.mp3'
				innerAudioContext.onPlay(() => {
					that.back(that.scanCodeValue)
				})
				innerAudioContext.onError(() => {
					that.back()
					
				})
			},
			back(value) {
				//uni.navigateBack()
				//this.$common.goback({emit_nama:'scanCode',emit_value:{value:value}})
				uni.navigateBack({
				  success: function(res) {
						uni.$emit('scanCode',{value:value})
					},
				  fail: function(e) {}
				})
			},
			
			error(e) {
				console.error('相机初始化失败', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.camera-box {
		width: 100%;
		height: 100vh;
		text-align: center;
		color: white;
		position: fixed;

		.close-btn {
			position: fixed;
			width: 50rpx;
			height: 50rpx;
			left: 30rpx;
			z-index: 999;
		}

		.image {
			width: 100%;
			height: 100vh;
			z-index: 1;
		}

		.scan-bar {
			position: absolute;
			left: 50%;
			top: 23vh;
			width: 428rpx;
			height: 12rpx;
			transform: translateX(-50%);
			z-index: 1;
			animation: scan 1.6s linear infinite;
		}

		.btn-group {
			width: 100%;
			z-index: 999;
			position: fixed;
			bottom: 100rpx;

			.take-photos {
				font-size: 24rpx;
				font-weight: 400;

				&_img {
					width: 120rpx;
					height: 120rpx;
					margin-bottom: 30rpx;
				}
			}

			.album {
				position: absolute;
				bottom: 0rpx;
				right: 100rpx;
				font-size: 24rpx;
				font-weight: 400;

				&_img {
					width: 88rpx;
					height: 88rpx;
					margin-bottom: 30rpx;
				}
			}

			&.check-box {
				padding: 0 110rpx;
				box-sizing: border-box;

				.icon {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}

		.flex_center {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.flex_between {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		@keyframes scan {
			0% {
				top: 23vh;
				opacity: 0;
			}

			15% {
				opacity: 1;
			}

			90% {
				opacity: 1;
			}

			100% {
				top: 55.5vh;
				opacity: 0;
			}
		}
	}
</style>