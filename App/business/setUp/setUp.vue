<template>
	<view class="setUp">
		<view class="static pad20"></view>
		<!--  1.顶部导航栏 -->
		<view class="nav pad20">
			<view class="navImg" @click="backBtn">
				<image class="image" src="../static/images/return1.png"></image>
			</view>
		</view>
		<!-- 2.表单内容 -->
		<view class="con pad20">
			<view v-for="(item,index) in conList" :key="index">
				<view class="conText">{{item}}</view>
				<view class="conImg">
					<image class="image" src="../../static/images/returnSmall.png"></image>
				</view>
			</view>
		</view>
		<!-- 4.退出登录按钮-->
		<button class="button btn" @click="sginBtn">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				conList: [
					"账号与安全", "消息中心", "客服咨询", "通知", "清除缓存", "所占系统空间"
				]
			}
		},
		methods: {
			backBtn() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 点击退出登录,返回到登录界面
			sginBtn() {
				/****清楚本地缓存***/
				uni.removeStorageSync('$business');
				uni.removeStorageSync('$shop');
				uni.redirectTo({
					url: "../../pages/other/identity/identity?jumpStatic=1"
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	.setUp {

		// 1.顶部导航栏
		.nav {
			display: flex;
			margin-top:var(--status-bar-height);
			.navImg {
				width: 46rpx;
				height: 46rpx;
				margin: 22rpx 0 20rpx 0;
			}
		}

		// 2.表单内容
		.con {
			>view {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 14px;
				padding: 35rpx 30rpx;
				color:rgba(102,102,102,1);
				.conText {}
				.conImg {
					width: 22rpx;
					height: 22rpx;
					
				}
			}
		}
		// 3.退出登录按钮
		.btn {
			position: fixed;
			bottom: 0;
			background: #8bbdec;
		}
	}
</style>
