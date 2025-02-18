<!-- 授权用户头像，昵称页 -->
<template>
	<view>
		<!-- 蒙层 -->
		<view class="mask" v-show="ifshow"></view>
			<view class="getuserinfo" v-show="ifshow" @touchmove.stop.prevent>
				<text class="name-title " style="margin-bottom: 5px;">设置头像、昵称与其他用户区分辨识</text>
				<view class="flex border-bottom">
					<image :src="avatarUrl"></image>
					
					<!--仅微信端以及安装有微信的SDK(例如QQ)使用-->
					<button v-if="AppBaseInfoIsWeChat==true" class="avatarUrl" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						选择头像
					</button>
					<button v-if="AppBaseInfoIsWeChat==false" class="avatarUrl" @click="SDKGetAvatarUrl">
						上传头像
					</button>
				</view>
				<form  @submit="formsubmit">
					<view class="flex border-bottom">
						<input 
						type="nickname" 
						class="nickname" 
						v-model="nickname"
						@change="getNickname"
						name="nickname"
						placeholder="请输入昵称,点击后下方获取微信昵称"/>
					</view>
					<button form-type="submit" class="but confirm-button">确 定</button>
				</form>
				<button  class="but" style="background-color: #838483;" @click="close">取消</button>
			</view>
	</view>
</template>

<script>
	export default {
		name:"chong-login",
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			showPop: {
				type: Boolean,
				default: false
			},
			AppBaseInfoIsWeChat: {//区分 仅微信端以及安装有微信的SDK(例如QQ)使用
				type: Boolean,
				default: false, 
			},
		},
		watch:{
			showPop(value){
				console.log(value)
				if(value){
					this.show();
				}else{
					this.close();
				}
			}	
		},
		data() {
			return {
				ifshow:false,//是否显示
				avatarUrl:'',//头像地址
				nickname:'',//头像地址
			};
		},
		methods:{
			getNickname(e){
				this.nickname = e.detail.value
			},
			show(events) {
				this.ifshow = true;
				console.log("显示")
			},
			close() {
				this.ifshow = false;
			},
			/**
			 * 微信应用内获取头像方式
			 * */
			onChooseAvatar(res){
				var that = this
				that.avatarUrl = res.detail.avatarUrl
			},
			/**
			 * 除了微信其他平台下获取头像的方式-
			 * */
			SDKGetAvatarUrl(){
				var that = this
				uni.chooseImage({
					count:1,
					success:(e)=>{
						console.log(e.tempFiles)
						that.avatarUrl = e.tempFiles[0].path
					},
					fail:(e)=>{
						that.$common.toast("获取头像失败，请重试")
					},
				})
			},
			formsubmit(e){
				var that = this
				e.nickname = that.AppBaseInfoIsWeChat == false ? that.nickname : e.detail.value.nickname
				e.avatarUrl = that.avatarUrl
				// 
				that.$common.uploadFile(
				e.avatarUrl,
				{
					type:'upload',
					nickname:e.nickname
				},
				(res)=>{
					that.close();
					// that.addTheme.show = true;
					that.$emit('formsubmit',e) //(父组件中触发的事件名，要传的变量名)
				})
			}
		}
	}
</script>

<style>
	.confirm-button {
	    background-color: #5585ff !important; /* 使用!important来确保优先级高于其他CSS规则 */
	    color: white; /* 设置文字颜色为白色，如果需要的话 */
	}

	.mask {
	    position: absolute;
	    z-index: 10;
	    bottom: 0px;
	    width: 100%;
	    height: 100%;
	    background: #000000ba;
	}
.getuserinfo-shade{
	width: 100%;height: 100%;position: fixed;z-index: 900;top: 0px;left: 0px;background-color: #0000008c;
}

.getuserinfo{
	z-index: 105;
    width: 80%;
    background-color: #fff;
    margin: auto;
    position: fixed;
    top: 25%;
    left: calc(10% - 20rpx);
    padding: 20rpx;
    border-radius: 20rpx;
}
.getuserinfo image{
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	border-radius: 50%;  
	transform: translateX(50rpx);  /* 往右偏移50rpx */  
}

.bottom-but image{
	height: 40rpx;
	width: 40rpx;
	display: flex;
}
.getuserinfo .avatarUrl{
    width: 40%;
    justify-content: center;
    flex-direction: column;
    display: flex;
	font-size: 28rpx;
    background-color: #5585ff;
    color: #fff;
	padding: inherit;
	position: absolute;
	right: 10%;
	height: 80rpx;
	top: 30rpx;
}
.getuserinfo .avatarUrl:after{border:none}
.getuserinfo .nickname{
	margin: 10rpx 10px;
	height: 70rpx;
	padding: 6rpx;
	font-size: 28rpx;
	flex: 1; 
}
.getuserinfo .name-title {  
    justify-content: center;  
    display: flex;  
    flex-direction: column;  
    font-size: 28rpx;  
    position: relative;   
    top: 10rpx;    
    align-items: center;  
}
	.but{
	    height: 80rpx;
	    width: 80%;
	    background-color: #5585ff;
	    color: #fff;
	    justify-content: center;
	    flex-direction: column;
	    display: flex;
		margin-top: 20rpx;
		font-size: 28rpx;
		transition: transition(-50%,-50%);
		margin: 20rpx auto;
	}
	.border-bottom{
		border-bottom: solid 2rpx #eaeaea;
		padding: 10rpx 50rpx;
		position: relative;
		flex: 1;
		justify-content: center;
		flex-direction: column;
	}
.flex{display:flex}
</style>