<template>
	<view class="successfulPayment">
		<view class="top">
			<view class="static"></view>
			<view class="nav1 mag20">
				<view class="nav1Img" @click="backBtn">
					<image class="image" src="../../static/images/returnWhite.png"></image>
				</view>
				<view class="title">报名订单</view>
			</view>
			<view class="topImg">
				<view class="bigImg">
					<image class="image" src="../static/images/successFulPayment/g2.png"></image>
				</view>
				<view class="smallImg">
					<image class="image" src="../static/images/successFulPayment/g1.png"></image>
				</view>
				<view>支付成功~</view>
			</view>
		</view>
		<!-- 装饰物 -->
		<view class="decorate"></view>
		<view class="con">
			<view class="title">￥{{money}}</view>
			<view class="details">
				<view>订单编号：{{serial}}</view>
				<view>下单时间：{{time}}</view>
				<view>支付方式：支付宝</view>
			</view>
		</view>
	</view>
</template>

<script>
	import nav1 from "../../components/nav1.vue"
	export default {
		onLoad(option){
			this.money = option.money;
			this.time = option.time;
			this.serial = option.serial;
			this.activity_id = option.activity_id;
		},
		data() {
			return {
				order_id:"",
				money:"",
				time:"",
				name:"",
				activity_id:"",
				serial:"",
			}
		},
		methods: {
			backBtn(){
				uni.redirectTo({
					url:`../details/details?activity_id=${this.activity_id}&pageType=0`
				})
				// uni.navigateBack({
				// 	delta:2
				// })
			}
		},
		components: {
			nav1
		}
	}
</script>

<style lang="less">
	.successfulPayment {
		.static{
			background: #fc9898;
		}
		.top {
			background: #fc9898;
			// height: 626rpx;
			padding-bottom: 96rpx;
			z-index: 11;

			/* // 1.顶部导航栏 */
			.nav1 {
				display: flex;
				flex-direction: row;
				padding: 22rpx 0 20rpx 0;
				font-size: 17px;
				align-items: center;
				font-weight: bold;
				color: white;
				margin-top: var(--status-bar-height);
				.nav1Img {
					width: 46rpx;
					height: 46rpx;
					margin-right: 230rpx;
				}
			}

			.topImg {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: white;
				position: relative;

				.bigImg {
					width: 320rpx;
					height: 248rpx;
					margin: 52rpx 0 10rpx 0;
				}

				.smallImg {
					width: 180rpx;
					height: 180rpx;
					position: absolute;
					top: 100rpx;
					left: 50%;
					transform: translateX(-50%);
					z-index: 11;
				}

			}
		}

		.decorate {
			margin: 0 30rpx;
			height: 16px;
			background: rgba(235, 144, 144,1);
			box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
			opacity: 0.7;
			border-radius: 18px;
			position: relative;
			top: -50rpx;
			z-index: 13;
		}

		.con {
			position: relative;
			top: -64rpx;
			margin: 0 40rpx;
			z-index: 12;
			color: #999999;
			font-size: 12px;
			box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.16);
			border-radius: 0px 0px 6px 6px;
			box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
			background: white;
			padding: 0 20rpx;
			.title {
				text-align: center;
				color: #333333;
				font-size: 21px;
				line-height: 26px;
				padding: 44rpx 0 14rpx 0;
				border-bottom: 1px solid rgba(222, 222, 222, 1);
			}

			.details {
				padding: 42rpx 0 20rpx 0;

				view {
					margin-bottom: 36rpx;
				}
			}
		}
	}
</style>
