<template>
	<view class="sending">
		<!--  1.顶部导航栏 -->
		<view class="nav">
				<view class="navImg">
					<image class="image"></image>
				</view>
			<view class="title">
				<button>发表</button>
			</view>
		</view>
		<!-- 2.输入框 -->
		<view class="text">
			<textarea placeholder="说出你的想法......" name="" id=""></textarea>
		</view>
		<!-- 3.添加图片 -->
		<view class="Img">
			<image class="image"></image>
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
	.sending {
		// 1.顶部导航栏
		.nav {
			display: flex;
			flex-direction: row;
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			align-items: center;
			background: #555555;
			justify-content: space-between;

			.navImg {
				width: 46rpx;
				height: 46rpx;
				margin-right: 230rpx;
				background: #4CD964;
				margin-right: 32rpx;
			}

			.title {
				button {
					margin: 0;
					padding: 0;
					padding: 20rpx 15rpx;
					line-height: 9rpx;
					font-size: 13px;
				}
			}
		}
		// 2.输入框
		.text{
			margin: 24rpx 0;
			textarea{
				width: 750rpx;
				height: 320rpx;
			}
		}
		.Img{
			width: 276rpx;
			height: 264rpx;
			background: #C0C0C0;
		}
		
	}
</style>
