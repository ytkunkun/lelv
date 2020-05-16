<template name="activity">
	<view class="activity">
		<view class="flex">
			<view class="nav1">
				<view class="nav1Img" @click="backBtn">
					<image class="image" src="../static/images/return1.png"></image>
				</view>
				<view class="title">
					活动管理
				</view>
			</view>
			<!-- 2.功能图标 -->
			<view class="icon">
				<view class="con">
					<view class="conImg">
						<image class="image" :src="image1" @click="con1Btn"></image>
					</view>
					<view>发布活动</view>
				</view>

				<view class="con">
					<view class="conImg">
						<image class="image" :src="image2" @click="con2Btn"></image>
					</view>
					<view>待审核</view>
				</view>

				<view class="con">
					<view class="conImg">
						<image class="image" :src="image3" @click="con3Btn"></image>
					</view>
					<view>未开始</view>
				</view>

				<view class="con">
					<view class="conImg">
						<image class="image" :src="image4" @click="con4Btn"></image>
					</view>
					<view>进行中</view>
				</view>

				<view class="con">
					<view class="conImg">
						<image class="image" :src="image5" @click="con5Btn"></image>
					</view>
					<view>已完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conList: [{
						url: "../../../static/images/business/icon24@2x.png",
						txte: "发布活动"
					},
					{
						url: "../../../static/images/business/icon25@2x.png",
						txte: "待审核"
					},
					{
						url: "../../../static/images/business/icon26@2x.png",
						txte: "未开始"
					},
					{
						url: "../../../static/images/business/icon27@2x.png",
						txte: "进行中"
					},
					{
						url: "../../../static/images/business/icon28@2x.png",
						txte: "已完成"
					}
				],
			}
		},
		methods: {
			con1Btn() {
				uni.redirectTo({
					url: "../activityManager/activityManager"
				})
			},
			con2Btn() {
				uni.redirectTo({
					url: "../activiting/activiting?index=2"
				})
			},
			con3Btn() {
				uni.redirectTo({
					url: "../activiting/activiting?index=3"
				})
			},
			con4Btn() {
				uni.redirectTo({
					url: "../activiting/activiting?index=4"
				})
			},
			con5Btn() {
				uni.redirectTo({
					url: "../activiting/activiting?index=5"
				})
			},
			backBtn() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		props: {
			// 自定义一个变量,用于接收父组件传入的参数值
			image1: {
				type: String
			},
			image2: {
				type: String
			},
			image3: {
				type: String
			},
			image4: {
				type: String
			},
			image5: {
				type: String
			},
		},
	}
</script>

<style lang="less">
	.activity {
		.flex {
			position: fixed;
			top: var(--status-bar-height);
			background: white;
			width: 100vw;
			z-index: 12;
		}

		.nav1 {
			display: flex;
			flex-direction: row;
			padding: 22rpx 20rpx 20rpx 20rpx;
			font-size: 17px;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			background: white;
			position: relative;

			.nav1Img {
				width: 46rpx;
				height: 46rpx;
				margin-right: 230rpx;
				position: absolute;
				left: 24rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		// 2.五个功能图标
		.icon {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin: 24rpx 20rpx 24rpx 20rpx;
			font-size: 12px;

			.con {
				display: flex;
				flex-direction: column;
				align-items: center;

				.conImg {
					width: 84rpx;
					height: 84rpx;
					margin-bottom: 50rpx;
				}
			}
		}

	}
</style>
