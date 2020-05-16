<template>
	<view class="currency">
		<view class="static pad20"></view>
		<!--  1.顶部导航栏 -->
		<view class="nav">
			<view class="nav1Img" @click="backBtn">
				<image class="image" src="../static/images/return1.png"></image>
			</view>
		</view>
		<!-- 2.表单内容 -->
		<view class="con pad20">
			<view v-for="(item,index) in conList" :key="index">
				<view class="conText">{{item}}</view>
				<view class="conImg">
					<image class="image" src="../../static/images/returnSmall.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import parentingNav from "../components/parentingNav.vue"
	export default {
		data() {
			return {
				conList: [
					"多语言", "照片、视频、文件", "字体大小", "流量统计", "清除缓存", "所占系统空间"
				]
			}
		},
		methods: {
			backBtn() {
				uni.navigateBack({
					delta: 1
				});
			},
		},
		components:{
			parentingNav
		}
	}
</script>

<style lang="less" scoped>
	.currency {
		.nav{
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			margin-top:var(--status-bar-height) ;
			position: relative;
			height: 46rpx;
			
			.nav1Img {
				width: 46rpx;
				height: 46rpx;
				margin-right: 230rpx;
				position: absolute;
				left:24rpx;
				top:50%;
				transform: translateY(-50%);
			}
		}
		// 2.表单内容
		.con {
			>view {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 14px;
				padding: 28rpx 30rpx;
				color:rgba(102,102,102,1);
				.conText {}
				.conImg {
					width: 22rpx;
					height: 22rpx;
					
				}
			}
		}
	}
</style>
