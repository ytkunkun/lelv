<template name="manager">
	<view class="nav1">
		<view class="nav1Img" @click="backBtn">
			<image class="image" src="../static/images/return1.png"></image>
		</view>
		<view class="title">
			{{title}}
		</view>
	</view>
</template>

<script>
	export default{
		name:"nav1",
		methods:{
			backBtn() {
				uni.navigateBack({
					delta:1
				})
			},
		},
		props:{
			// 自定义一个变量,用于接收父组件传入的参数值
			title:""
		}
	}
</script>

<style lang="less" scoped>
	/* // 1.顶部导航栏 */
	.nav1 {
		display: flex;
		flex-direction: row;
		padding: 22rpx 0 20rpx 0;
		font-size: 17px;
		align-items: center;
		justify-content: center;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-top:var(--status-bar-height) ;
		position: relative;
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
</style>
