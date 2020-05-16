<template>
	<view class="puls">
		<!--  1.顶部导航栏 -->
		<view class="nav">
			<view class="navImg">
				<image class="image"></image>
			</view>
		</view>
		<!-- 2.图标选项 -->
		<view class="con">
			<view v-for="(item,index) in conList" :key="index">
				<view class="conImg">
					<image class="image"></image>
				</view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conList:[
					{img:"",text:"发帖"},
					{img:"",text:"回复"},
					{img:"",text:"点赞"},
					{img:"",text:"签到"},
					{img:"",text:"日志"},
					{img:"",text:"相册"}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.puls {
		background-color: pink;
		z-index: 11;
		width:540rpx;
		height:356rpx;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		// 1.顶部导航栏
		.nav {
			display: flex;
			justify-content: flex-end;

			.navImg {
				width: 46rpx;
				height: 46rpx;
				margin: 22rpx 0 20rpx 0;
				background: #007AFF;
			}
		}

		// 2.图标选项
		.con {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			font-size: 12px;
			background: #8F8F94;
			>view{
				width: 33.3%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.conImg {
				width: 100rpx;
				height: 100rpx;
				background: #4CD964;
				margin: 60rpx 0 36rpx 0;
			}
		}

	}
</style>
