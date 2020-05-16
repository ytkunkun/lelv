<template>
	<view class="query">
		<!-- 1.nav-->
		<view class="nav">
			<view class="navImg">
				<image class="image"></image>
			</view>
			<view>订单查询</view>
			<view class="navImg">
				<image class="image"></image>
			</view>
		</view>
		<!-- 2.订单详情 -->
		<view class="con">
			<view class="top">
				用户1订单
			</view>
			<view class="conCon">
				<view>
					<view>
						<view class="name">1234</view>
						<view class="text">45</view>
					</view>
					<view>
						<view class="name">1234</view>
						<view class="text">45125</view>
					</view>
				</view>
				<view>
					<view>
						<view class="name">5678</view>
						<view class="text">85</view>
					</view>
					<view>
						<view class="name">1234</view>
						<view class="text">455</view>
					</view>
				</view>
			</view>
			<view class="foot">
				<view class="name">活动地址</view>
				<view>福州市台江区世茂国际中心2号门</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.query {

		//1.nav
		.nav {
			height: 46rpx;
			background: #4CD964;
			padding: 22rpx 32rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 34rpx;
			.navImg {
				width: 46rpx;
				height: 46rpx;
				background: #2C405A;
			}
		}

		// 2.订单详情
		.con {
			padding: 26rpx 50rpx 50rpx 50rpx;
			background: #808080;
			font-size: 14px;
			border-radius:12px;
			margin: 20rpx;
			.top {
				text-align: center;
				font-size: 14px;
				font-weight: bold;
				margin-bottom: 26rpx;
			}
			.conCon {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				>view {
					>view {
						display: flex;
						flex-direction: row;
						margin-bottom: 22rpx;
						.name {
							margin-right: 20rpx;
						}
					}

				}
			}
			.foot{
				display: flex;
				flex-direction: row;
				.name{
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
