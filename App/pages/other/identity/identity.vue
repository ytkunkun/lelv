<template>
	<view class="identity">
		<view class="top">
			<view class="img" @click="parenting('1')"><image class="image" src="../../../static/images/identity/Parentchildportrait.png"></image></view>
			<view>亲子用户</view>
		</view>
		<view class="bottom">
			<view class="img" @click="parenting('2')"><image class="image" src="../../../static/images/identity/BusinessHead.png"></image></view>
			<view>商家用户</view>
		</view>
		<view class="tips" v-if="tipsShow">
			<view class="con">
				<view class="text">为了更好的体验及新功能的使用,请升级到最新版本,更新中的几秒等待十分抱歉!</view>
				<view class="button">
					<view class="btn1" @click="updata">立即更新</view>
					<view class="btn2" @click="cancel">稍后更新</view>
				</view>
			</view>
		</view>

		<view class="hello-bg" v-if="helloShow">
			<request-loading></request-loading>
			<view class="timer" @click="loadingTextClick">{{ loadingText }}</view>
			<view class="hello-content">
				<image src="../../../static/images/identity/helloBG.png" mode=""></image>
				<view class="text1">乐旅亲子</view>
				<view class="text2">与孩子共度美好时光</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onLoad(res) {
						this.redirect();
		this.helloShow = false;
		// #ifdef APP-PLUS
		// 设置启动页,当jumpStatic为0时才有欢迎页
		if (res.jumpStatic != 1) {
			this.helloShow = true;
			this.$showLoading();
			setTimeout(() => {
				this.helloShow = false;
				this.$hideLoading();
				this.redirect();
			}, 2000);
		}
		// 获取当前版本号
		plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
			var wgtStr = wgtinfo.version;
		});
		// 调用接口
		this.http.post('/notice/isUpdated').then(res => {
			if (res.data.code == 'ok') {
				// 获取最新版本号
				let data = res.data.data;
				if (wgtStr != data.version) {
					this.tipsShow = true;
					this.url = data.download;
				}
			}
		});
		// #endif
	},
	data() {
		return {
			loadingText: '跳过',
			helloShow: true,
			version: '',
			wgtStr: '',
			tipsShow: false,
			url: ''
		};
	},
	methods: {
		redirect(){
			/* **********缓存登陆 */
			let $parenting = uni.getStorageSync('$parenting');
			if ($parenting) {
				$parenting = JSON.parse($parenting);
				console.log($parenting);
				this.$store.commit('setParenting', $parenting);
				uni.switchTab({
					url: '../home/home'
				});
			}
			let $business = uni.getStorageSync('$business');
			let $shop = uni.getStorageSync('$shop');
			if ($business) {
				$business = JSON.parse($business);
				$shop = JSON.parse($shop);
				this.$store.commit('setBusiness', $business);
				this.$store.commit('setShop', $shop);
				uni.redirectTo({
					url: '../../../business/home/home'
				});
			}
			/* **********缓存登陆 */
		},
		loadingTextClick() {
			this.helloShow = false;
			this.$hideLoading();
		},
		parenting(i) {
			let obj = {
				i: i
			};
			this.$store.commit('setIdentity', obj);
			uni.navigateTo({
				url: `../login/login`
			});
		},
		cancel() {
			this.helloShow = false;
			this.tipsShow = false;
		},

		updata() {
			this.tipsShow = false;
			// #ifdef APP-PLUS
			plus.runtime.openURL(this.url);
			// #endif
		}
	}
};
</script>

<style lang="less" scoped>
.hello-bg {
	position: fixed;
	background: #fff;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;

	.hello-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.text1 {
			font-size: 48rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(252, 152, 152, 1);
			opacity: 1;
			margin-top: 26rpx;
		}

		.text2 {
			margin-top: 24rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;

			color: rgba(254, 208, 208, 1);
			opacity: 1;
		}

		image {
			width: 750rpx;
			height: 660rpx;
		}
	}

	.timer {
		// width: 60rpx;
		// height: 40rpx;
		padding: 18rpx 28rpx;
		border: 1px solid #fff;
		background: rgba(0, 0, 0, 0.6);
		position: absolute;
		top: 50rpx;
		right: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		z-index: 99;
		border-radius: 3px;
	}
}

.identity {
	display: flex;
	flex-direction: column;
	height: 100vh;
	font-size: 20px;
	background: #8f8f94;
	color: white;

	.top {
		background: #fc9898;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50%;

		// 使用选中想要子集的写法
		// & view:nth-child(2){
		// 	font-size: 50px;
		// 	background: red;
		// }
		.img {
			width: 208rpx;
			height: 208rpx;
			background: white;
			border-radius: 104rpx;
			margin-bottom: 38rpx;
		}
	}

	.bottom {
		background: #8cbdeb;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50%;

		.img {
			width: 208rpx;
			height: 208rpx;
			background: white;
			border-radius: 104rpx;
			margin-bottom: 38rpx;
		}
	}

	.tips {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 573rpx;
		height: 640rpx;
		background: url(../../../static/images/tips.png) no-repeat;
		background-size: 573rpx 640rpx;
		z-index: 12;

		.con {
			margin: 0 72rpx;

			.text {
				margin: 330rpx 0rpx 32rpx 0rpx;
				text-align: center;
				color: #333333ff;
				font-size: 14px;
				line-height: 30px;
			}

			.button {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				height: 60rpx;
				background: white;

				> view {
					width: 200rpx;
					background: #fa9899;
					font-size: 13px;
					text-align: center;
					border-radius: 6px;
					line-height: 30px;
				}

				.btn2 {
					background: #fec7c9;
				}
			}
		}
	}
}
</style>
