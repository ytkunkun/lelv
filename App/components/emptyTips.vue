<template name="emptyTips">
	<view class="emptyTips" v-if="emptyTipsShow">
		<view>
			<view class="emptyImg">
				<image class="image" src="../../../static/images/bg6.png"></image>
			</view>
			<view class="bigEmptyImg" @click="bigEmptyImgBtn">
				<image class="image" src="../../../static/images/back@2x.png"></image>
			</view>
			<view class="title">Attention</view>
			<view class="text">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "emptyTips",
		methods: {
			// backBtn() {
			// 	uni.navigateBack({
			// 		delta:1
			// 	})
			// },
			bigEmptyImgBtn(){
				this.emptyTipsShow = ! this.emptyTipsShow
			}
		},
		props: {
			// 自定义一个变量,用于接收父组件传入的参数值
			text: "",
			emptyTipsShow:true
		}
	}
</script>

<style lang="less" scoped>
	.emptyTips {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 11;
		>view{
			position: relative;
		}
		.emptyImg {
			width: 626rpx;
			height: 262rpx;

		}

		.bigEmptyImg {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			top: -6rpx;
			right: -6rpx;
		}

		.title {
			color: #333333;
			font-size: 17px;
			position: absolute;
			top: 140rpx;
			left: 50%;
		    transform: translateX(-50%);
		}

		.text {
			position: absolute;
			top: 205rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 13px;
			color: #666666;
		}
	}
</style>
