<template>
	<view class="success">
		<view class="static"></view>
		<!--  1.顶部导航栏 -->
		<view class="nav">
			<view class="title">
				商家认证
			</view>
		</view>
		<!-- 2.认证流程图 -->
		<view class="icon mag20">
			<view class="iconTop">
				<view>
					<image class="image" src="../static/images/icon1@2x.png"></image>
				</view>
				<view class="connect">
					<image class="image" src="../static/images/Connect.png"></image>
				</view>
				<view>
					<image class="image" src="../static/images/icon4@2x.png"></image>
				</view>
				<view class="connect">
					<image class="image" src="../static/images/Connect.png"></image>
				</view>
				<view>
					<image class="image" src="../static/images/icon5@2x.png"></image>
				</view>
			</view>
			<view class="iconTxet">
				<view class="iconTxet1">提交资质</view>
				<view>选择合作方式</view>
				<view class="iconTxet1">等待审核</view>
			</view>
		
		</view>
		<!-- 3.中间图片 -->
		<view class="con">
			<view>
				<view class="conImg">
					<image class="image" src="../static/images/icon11@2x.png"></image>
				</view>
				<view>审核成功!</view>
			</view>
		</view>
		<!-- 4.登录按钮 -->
		<button class="button btn" @click="loginBtn">登录</button>
	</view>
</template>

<script>
	export default {
		// 接收上个页面传进来的参数
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.static = option.id; //将值赋值给状态，用于跳转页面
		},
		data() {
			return {
				static:""
			}
		},
		methods: {
			loginBtn(){
				uni.navigateTo({
					url:`../../pages/other/login/login?id=${this.static}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>
.success{
	// position:relative;
	height: 100vh;
	// 1.顶部导航栏
	.nav {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 22rpx 0 20rpx 0;
		font-size: 17px;
		align-items: center;
		margin-top: var(--status-bar-height);
	}
	
	// 2.认证流程图
	.icon {
		// display: flex;
		padding: 40rpx 54rpx;
		border-radius: 12px;
		box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.07);
		border-radius: 6px;
	
		.iconTop {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 0 5rpx;
	
			>view {
				width: 88rpx;
				height: 88rpx;
			}
	
			.connect {
				width: 136rpx;
				height: 57rpx;
				background: none;
			}
		}
	
		.iconTxet {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 20rpx;
			font-size: 10px;
	
			.iconTxet1 {
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}
		}
	}
	
	// 3.中间图片
	.con{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 170rpx;
		>view{
			display: flex;
			flex-direction: column;
			align-items: center;
			.conImg{
				width: 220rpx;
				height: 220rpx;
				margin-bottom: 58rpx;
			}
		}
	}
	// 4.登录按钮 
	button{
		position: fixed;
		bottom:0;
		background: #8cbdeb;
		}
}
</style>
