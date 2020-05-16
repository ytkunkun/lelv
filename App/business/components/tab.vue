<template name="tab">
	<!-- 底部tabber -->
	<view class="tab">
		<view @click="tab1Btn">
			<view class="tabImg">
				<image class="image" :src="image1"></image>
			</view>
			<view>首页</view>
		</view>
		<view @click="tab2Btn">
			<view class="tabImg">
				<image class="image" :src="image2"></image>
			</view>
			<view>闲置市场</view>
		</view>
		<view @click="tab3Btn">
			<view class="tabImg">
				<image class="image" :src="image3"></image>
			</view>
			<view>个人中心</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props:{
			image1:{
				type:String
			},
			image2:{
				type:String
			},
			image3:{
				type:String
			},
			
		},
		methods: {
			// 跳转到首页
			tab1Btn(){
				uni.navigateTo({
					url: "../home/home"
				});
			},
			// 跳转到闲置市场
			tab2Btn(){
				uni.navigateTo({
					url: "../leaveUnused/leaveUnused"
				});
			},
			// 跳转到个人中心
			tab3Btn(){
				uni.navigateTo({
					url: "../personalCenter/personalCenter"
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	/* 底部tabber */
	.tab {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 5px 0;
		position: fixed;
		bottom: 0;
		width: 750rpx;
		background: white;
		box-shadow: 0px -1px 1px rgba(187, 187, 187, 0.16);
		z-index: 11;
		>view {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 9px;

			& view:first-child {
				width: 24px;
				height: 24px;
				margin-bottom: 5px;
			}
		}
	}
</style>
