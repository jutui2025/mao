<!-- 猫和老鼠创建活动活动范围设置页面 -->
<template>
	<view style="
    position: absolute;
    width: 100%;
    height: 100%;
	">
		<map style="width: 100%; height: calc(100% - 200px);"
		ref="myMap"
		:markers="markers_fencePanel"
		:polygons="polygons"
		:latitude="location_my.latitude"
		:longitude="location_my.longitude"
		@tap="createMarkersFencePanel"
		@callouttap="removeMarker"
		id="map"
		></map>
		<view style="padding: 10px;" v-if="res.type==1">当前选择位置：</view>
		<view style="padding: 10px;color: #7b5206;" v-show="location_info.name" v-if="res.type==1">{{location_info.name}}</view>
		
		<view style="padding: 10px;font-size: 16px;color: #4a4a4a;" v-if="res.type==2">【活动围栏设置提示】</view>
		<view style="padding: 10px;font-size: 16px;color: #4a4a4a;" v-if="res.type==2">
			1、调整地图大小，可获取较大范围活动地区；<br>
			2、在地图中进行“点击”，至少三个点位；<br>
			3、设置的围栏可限制活动范围，如参与者离开活动范围5分钟将会自动淘汰；
		</view>
		
		<view class="but-box" v-if="res.type==1">
			<view class="b-box" @click="click_goback">选择地址</view>
		</view>
		<view class="but-box" v-if="res.type==2 && markers_fencePanel.length>2">
			<view class="b-box" @click="click_goback">确定</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from "@/static/js/qqmap-wx-jssdk.min.js";
	// 实例化API核心类


	// #ifdef H5
		import geolocation from "@/static/js/geolocation.min.js";
	// #endif 
	
	export default {
		data() {
			return {
				markers_fencePanel:[],
				res:{
					type:1,//1=等于选择位置，2=选择区域
				},
				polygons:[],
				map:null,//上一个页面传递过来的
				location_my:{//我的位置
					latitude:0,
					longitude:0,
				},
				location_info:{//逆解析的存储
					name:'',
					latitude:0,
					longitude:0,
				},
				maps:null,//地图实例方法
				qqmapsdk:null,
				geolocation_class:null,
			}
		},
		onLoad(e) {
			var that = this
			console.log(e)
			if(!e.t || !e.map){
				
				uni.showModal({
					title:'提示',
					content:'获取地图KEY失败',
					showCancel:false,
					confirmText:'知道啦',
					success: () => {
						that.$common.goback()
					}
				});
				return
			}
			
			
			
			//#ifdef MP-WEIXIN
				this.qqmapsdk = new QQMapWX({
					key: e.map // 必填
			});
			// #endif
			
			// #ifdef H5
				// 实例化API核心类
				this.geolocation_class = new Geolocation(e.map, "myapp");
			// #endif 
			
			this.res.type = e.t
			
			
			
			
			// 查看是否已经选择活动地点,如果已经选择则在这个地图中心移动到这个坐标上
			if(e.latitude!='' && e.longitude!=''){
				this.location_my.latitude = Number(e.latitude)
				this.location_my.longitude = Number(e.longitude)
			}else{
				// #ifdef H5
					this.H5_getLocation()
				// #endif 
				// #ifdef MP-WEIXIN
					this.click_getLocation()
				// #endif
			}
		},
		methods: {
			callouttap(e){
				console.log(e)
			},
			// 创建围栏标记点
			createMarkersFencePanel(e) {
				var that = this;
				
				if(that.res.type == 1){//如果是选择地点的话就只能存在一个
					that.markers_fencePanel = [];
				}

				let markerItem = {
					id: that.markers_fencePanel.length,
					latitude: e.detail.latitude,
					longitude: e.detail.longitude,
					iconPath: '/static/img/dingwei.png',
					width: '50px',
					height: '50px',
					rotate: 0,
					alpha: 1,
					zIndex: 4,
					distance: 0,//距离自己多少米
					callout:{
						color:'#01bb75',
						content: '删除',
						display: that.res.type == 1 ?'BYCLICK' : 'ALWAYS',//'BYCLICK':点击显示; 'ALWAYS':常显
						borderRadius:50,
						padding:10,
					}
				}
				that.markers_fencePanel.push(markerItem)//加入公共坐标数组
				if(that.res.type == 1){
					//逆解析地址
					that.reverseGeocoder(e);
				}else{
					if (that.markers_fencePanel.length > 2) {
						that.creatPolygons()
					}
				}
				
			},
			//逆解析地址
			reverseGeocoder(e){
				var that = this;
				
				let location =  {
					 latitude:e.detail.latitude,
					 longitude: e.detail.longitude
			   }
				that.qqmapsdk.reverseGeocoder({
				  //Object格式
					   location:location, 
					   get_poi:1,
					   poi_options:'address_format=short;radius=1000;policy=2',
					   
					success: function(res) {//成功后的回调
						
						that.location_info.name = res.result.formatted_addresses.recommend;
						that.location_info.latitude = location.latitude,
						that.location_info.longitude = location.longitude
						
						
				   },fail: function(error) {
					   console.error(error);
					 },
					 complete: function(res) {
					   //console.log(res);
					 }
				});
			},
			//定位自己的坐标点
			click_getLocation(){
				var that = this
				uni.getLocation({
					type:'gcj02',
					altitude:true,//传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
					isHighAccuracy:true,//开启高精度定位
					success:function(res){
					
						that.location_my = res
						console.log(res)
					},
					fail:function(res){
						console.log(res)
					}
					
				})
			},			
			//H5-定位自己的坐标点
			H5_getLocation(){
				var that = this
				that.geolocation_class.getLocation(
				(e)=>{
					console.log("geolocation_class_1",e)
					
					that.location_my.latitude = e.lat
					that.location_my.longitude = e.lng
				}, 
				(e)=>{
					console.log("geolocation_class_2",e)
				}, 
				{timeout: 8000},
				)
			},
			click_goback(){
				var that = this
				if(that.res.type==1){
					var tmp = that.location_info
				}else{
					var tmp = that.polygons[0].points
				}
				uni.$emit('creation',{value:tmp,t:that.res.type})
				that.$common.goback()
			},
			// 删除重复点击的标记点
			removeMarker(e) {
				let id = e.markerId
				
				let markers = JSON.parse(JSON.stringify(this.markers_fencePanel))
				for (let i in markers) {
					if (markers[i].id == id) {
						markers.splice(i, 1)
					}
				}
				/* // 重置marker数组的id
				for (let j = 0; j < markers.length; j++) {
					markers[j].id = j;
				} */
				this.markers_fencePanel = markers
				
				
					 markers = JSON.parse(JSON.stringify(this.markers_fencePanel))
					for (let i in markers) {
						if (markers[i].id == id) {
							markers.splice(i, 1)
						}
					}
					/* // 重置marker数组的id
					for (let j = 0; j < markers.length; j++) {
						markers[j].id = j;
					} */
					this.markers = markers
				
				if (this.markers_fencePanel.length <= 2) {
					this.polygons = []
				} else {
					this.creatPolygons()
				}
			},
			// 绘制多边形围栏
			creatPolygons() {
			
					if (this.markers_fencePanel.length < 3) {
						return false
					}
					uni.showLoading({
						title:'绘制中',
						mask:true
					})
					let polygons = this.polygons;
					let markers_tmp = this.coordinateSort(this.markers_fencePanel)
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
					uni.hideLoading();
					console.log(JSON.stringify(newArray))
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

.but-box{
	position: fixed;
    width: 100%;
    left: 0px;
    background-color: #fff;
    bottom: 20rpx;
    height: 160rpx;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
	z-index: 10;
}
.b-box{
	flex-shrink: 0;
	height: 60rpx;
	line-height: 2rpx;
	font-size: 28rpx;
	color: #fff;
	background: #0186ff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10rpx;
	border-radius: 14rpx;
	text-align: center;
	width: 85%;
	margin: auto;
}
</style>
