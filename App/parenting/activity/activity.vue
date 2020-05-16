<template>
	<view class="activity">
		<view class="static"></view>
		<!-- 2.头部标题部分 -->
		<view class="title">
			<view class="right">
				<image @click="backBtn" class="image" src="../../static/images/return1.png"></image>
			</view>
			<view class="left">
				<navigator class="nav1" url="">活动</navigator>
				<navigator class="nav2" url="">教学</navigator>
				<navigator class="nav3" url="">免费</navigator>
			</view>
			
		</view>
		<view class="occupy mag20"></view>
		<!-- 2.活动部分 -->
		<view class="acviti" v-for="(item,index) in conList" :key="index">
			<!-- 2.1活动头部标题信息部分 -->
			<view class="top">
				<view class="topImg">
					<image class="image" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="text">
					<view class="titl">{{item.title}}</view>
					<view class="con">
						<view class="con1">{{item.type}}</view>
						<view class="con2">{{item.min_age}}-{{item.max_age}}岁</view>
					</view>
				</view>
			</view>
            <!-- 2.2展示图片部分 -->
			<view class="img" @click="contentBtn(item.activity_id)">
				<image class="image" mode="top" :src="item.image_url"></image>
				<view>{{item.number}}人</view>
			</view>
			<!-- 2.3活动内容文字部分 -->
			<view class="content">{{item.content}}</view>
			<!-- 2.4活动内容底部 -->
			<view class="foot">
				<view class="con">
					<view class="footImg">
						<image class="image" src="../static/images/activity/place.png"></image>
					</view>
					<view class="text">{{item.address}}</view>
				</view>
				<view class="con">
					<view class="footImg">
						<image class="image" src="../static/images/activity/time.png"></image>
					</view>
					<view class="text">{{item.start_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// 调用全部活动的接口
			this.http.post('/activity/getAllActivity').then((res =>{
					// 状态为ok
					if (res.data.code == "ok") {
						let array = res.data.data;
						this.activity_id = res.data.data.activity_id
						for(let i = 0;i<array.length;i++){
							if(array[i].type == 0){
								array[i].type = "室内"
							}
							if(array[i].type == 1){
								array[i].type = "室外"
							}
							if(array[i].type == 2){
								array[i].type = "野外"
							}
							if(array[i].type == 3){
								array[i].type = "其他"
							}
							array[i].start_time = array[i].start_time.substring(0,11);
						}
						this.conList = array;
					}
			}))
		},
		data() {
			return {
				conList:[],
				activity_id:""
			}
		},
		methods: {
			//活动详情的跳转事件
			contentBtn(i) {
				//亲子活动的跳转界面
				uni.navigateTo({
					url:  `../details/details?activity_id=${i}&pageType=1`
				});
			},
			//跳转到搜索界面
			// searchBtn(){
			// 	uni.navigateTo({
			// 		url: '../details/details'
			// 	});
			// },
			//返回上一级界面，即首页
			backBtn(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.activity {
		
		// 1.头部标题部分
		.title {
			width: 100vw;
			display: flex;
			flex-direction: row;
			padding: 20rpx 0 20rpx 24rpx;
			position: fixed;
			top: var(--status-bar-height);
			background: white;
			z-index: 13;
			// 1.1左边文字部分
			.left {
				font-size: 14px;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-left: 10rpx;
				.nav1 {
					font-size: 20px;
					font-weight: bold;
				}

				.nav2 {
					margin: 0 40rpx;

				}
			}

			// 1.2右边图片部分
			.right {
					width: 46rpx;
					height: 46rpx;
			}
		}
		.occupy{
			height:  var(--status-bar-height);
		}
		// 2.活动部分
		.acviti {
			padding: 40rpx 32rpx;
			border-radius: 5px;
			background: white;
			box-shadow:0px 3px 12px rgba(97,97,97,0.16);
			margin-bottom: 20rpx;
			margin-top: 100rpx;
			// 2.1活动头部标题信息部分
			.top {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom:38rpx ;
				// 2.1.1左边图片
				.topImg {
					margin-right: 32rpx;
					width: 76rpx;
					height: 76rpx;
					border-radius: 5px;
					image{
						border-radius: 50%;
					}
				}
				// 2.1.1右边文字部分
				.text {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 12px;
					.titl {
						font-weight: bold;
						font-size: 18px;
						margin-bottom: 10rpx;
					}

					.con {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin: 0;
					}
				}
			}

			// 2.2展示图片部分
			.img {
				margin-bottom:28rpx;
				background: pink;
				border-radius: 5px;
				position: relative;
				width: 100%;
				height: 340rpx;
				//图片上的文字部分
				view {
					font-size: 12px;
					padding: 10rpx 16rpx;
					position: absolute;
					left: 32rpx;
					top: 32rpx;
					border-radius: 3px;
					background:rgba(222,222,222,0.5);
					color:rgba(255,255,255,1);
				}
			}
			// 2.3活动内容文字部分
			.content {
				padding: 0;
				font-size: 13px;
				line-height: 21px;
			}
			// 2.4活动内容底部
			.foot {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 10px;
				margin: 52rpx 0 8rpx 0;

				.con {
					display: flex;
					flex-direction: row;
					align-items: center;
					.footImg {
						width: 28rpx;
						height: 28rpx;
						margin: 0 32rpx 0 0;
					}
				}
			}

		}
	}
</style>
