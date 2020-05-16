<template name="manager">
	<view class="manager">
		<view class="static mag20"></view>
		<!-- 1.nav-->
		<!-- #ifndef MP-WEIXIN -->
		<view class="nav">
			<view class="navImg" @click="backBtn">
				<image class="image" src="../static/images/return1.png"></image>
			</view>
			<view>订单管理</view>
			<view class="navImg" v-if="search1Show" @click="search1Btn">
				<image class="image" src="../../static/images/search1.png"></image>
			</view>
			<!-- 搜索框 -->
			<view class="search" v-if="search2Show">
				<input type="text" focus="true" confirm-type="search" @input="topSearch" v-model="valueText">
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="navWeixin">
			<view class="con1">
				<view class="navImg" @click="backBtn">
					<image class="image" src="../static/images/return1.png"></image>
				</view>
				<view>订单管理</view>
			</view>
			<view class="con2">
				<view class="navImg">
					<image class="image" src="../../static/images/search1.png"></image>
				</view>
				<!-- 搜索框 -->
				<view class="search">
					<input type="text" focus="true" confirm-type="search" @input="topSearch" v-model="valueText">
				</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- 2.功能图标 -->
		<view class="icon">
			<view class="con" @click="iconBtn(0)">
				<view class="conImg">
					<image class="image" :src="image1"></image>
				</view>
				<view>全部订单</view>
			</view>
			<view class="con" @click="iconBtn(1)">
				<view class="conImg">
					<image class="image" :src="image2"></image>
				</view>
				<view>待付款</view>
			</view>
			<view class="con" @click="iconBtn(2)">
				<view class="conImg">
					<image class="image" :src="image3"></image>
				</view>
				<view>已付款</view>
			</view>
			<view class="con" @click="iconBtn(3)">
				<view class="conImg">
					<image class="image" :src="image4"></image>
				</view>
				<view>退款处理</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
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
		},
		data() {
			return {
				search1Show: true,
				search2Show: false,
				valueText: ""
			}
		},
		methods: {
			topSearch() {
				this.$emit("returnData", "valueText")
			},
			//点击返回按钮，跳回首页
			backBtn() {
				if (this.search1Show == true) {
					uni.redirectTo({
						url: "../home/home"
					})
				}
				if (this.search1Show == false) {
					this.search2Show = !this.search2Show;
					this.search1Show = !this.search1Show;
				}

			},
			//点击四个图标，进行页面跳转
			iconBtn(i) {
				//跳转到全部订单页面
				// 全部订单
				if (i == 0) {
					uni.navigateTo({
						url: "../manage/manage?pageIndex=1"
					})
				}
				//待付款
				if (i == 1) {
					uni.navigateTo({
						url: "../manage/manage?pageIndex=2"
					})
				}
				// 已付款
				if (i == 2) {
					uni.navigateTo({
						url: "../manage/manage?pageIndex=3"
					})
				}
				//跳转到退款处理界面
				if (i == 3) {
					// this.conList[0].url="../../../static/images/business/icon34@2x.png";
					uni.navigateTo({
						url: "../refund/refund"
					})
				}
			},
			search1Btn() {
				this.search2Show = !this.search2Show;
				this.search1Show = !this.search1Show;
			}
		},
	}
</script>

<style lang="less" scoped>
	.manager {
		position: fixed;
		top: var(--status-bar-height);
		background: white;
		z-index: 12;

		/* #ifndef MP-WEIXIN */
		// 1.nav
		.nav {
			width: 100vw;
			height: 46rpx;
			padding: 22rpx 22rpx 20rpx 22rpx;
			margin: 22rpx 0 20rpx 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 17px;
			font-weight: bold;
			position: relative;
			color: rgba(51, 51, 51, 1);

			.navImg {
				width: 46rpx;
				height: 46rpx;
			}

		}

		/* #endif */
		//1.nav
		/* #ifdef MP-WEIXIN */
		.navWeixin {
			width: 100vw;
			height: 120rpx;
			padding: 22rpx 22rpx 0 22rpx;
			margin: 22rpx 0 20rpx 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			// align-items: ;
			font-size: 17px;
			font-weight: bold;
			position: relative;
			color: #666666;

			>view {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
			}

			.con1 {
				.navImg {
					width: 46rpx;
					height: 46rpx;
					margin-right: 32rpx;
				}

				padding-bottom: 20rpx;
			}

			.con2 {
				position: relative;
				top: 20rpx;

				.navImg {
					width: 32rpx;
					height: 32rpx;
					margin-right: 32rpx;
					position: absolute;
					top: -15rpx;
					left: 30rpx;
					z-index: 1;
				}

				input {
					width: 666rpx;
				}
			}


		}

		/* #endif */
		// 2.四个功能图标
		.icon {
			width: 100vw;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 24rpx 42rpx 30rpx 42rpx;
			font-size: 10px;
			box-sizing: border-box;

			.con {
				display: flex;
				flex-direction: column;
				align-items: center;

				.conImg {
					width: 84rpx;
					height: 84rpx;
					margin-bottom: 30rpx;
				}
			}
		}

		.search {
			position: absolute;
			right: 24upx;

			input {
				width: 640rpx;
				background: rgba(232, 232, 232, 1);
				padding: 5rpx 12rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
