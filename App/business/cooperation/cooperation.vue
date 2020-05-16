<template>
	<view class="cooperation">
		<view class="static"></view>
		<!--  1.顶部导航栏 -->
		<view class="nav mag20">
			<view class="navImg" @click="backBtn">
				<image class="image" src="../static/images/return1.png"></image>
			</view>
			<view class="title">商家认证</view>
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
					<image class="image" src="../static/images/icon3@2x.png"></image>
				</view>
			</view>
			<view class="iconTxet">
				<view>提交资质</view>
				<view class="iconTxet1">选择合作方式</view>
				<view>等待审核</view>
			</view>
		</view>
		<!-- 3.中间圆圈部分 -->
		<view class="round">
			<!-- 大圈背景 -->
			<view class="bag">
				<view></view>
			</view>
			<!-- 第一行的圆 -->
			<view class="first">
				<view class="Img" @click="img1">
					<image class="image" :src="iconImg1"></image>
				</view>
			</view>
			<!-- 第二行的圆 -->
			<view class="second">
				<view class="Img" @click="img2">
					<image class="image" :src="iconImg2"></image>
				</view>
				<view class="Img" @click="img3">
					<image class="image" :src="iconImg3"></image>
				</view>
			</view>
			<!-- 第三行的圆 -->
			<view class="end">
				<view class="Img" @click="img4">
					<image class="image" :src="iconImg4"></image>
				</view>
				<view class="Img" @click="img5">
					<image class="image" :src="iconImg5"></image>
				</view>
			</view>
		</view>
		<!-- 4.底部文字 -->
		<view class="footer">
			<view>至少选择一种合作方式</view>
		</view>
		<!-- 5.下一步按钮 -->
		<button class="button btn" @click="nextBtn" :class="{ blueStyle: blueShow }">下一步</button>
	</view>
</template>

<script>
	export default {
		// 接收上个页面传进来的参数
		onLoad: function(option) {
			//option为object类型，会序列化上个页面传递的参数
			this.static = option.id; //将值赋值给状态，用于跳转页面
			this.iconImg1 = '../static/images/icon/icon1.png';
			this.iconImg2 = '../static/images/icon/icon2.png';
			this.iconImg3 = '../static/images/icon/icon3.png';
			this.iconImg4 = '../static/images/icon/icon4.png';
			this.iconImg5 = '../static/images/icon/icon5.png';
		},
		data() {
			return {
				static: '',
				iconImg1: '',
				iconImg2: '',
				iconImg3: '',
				iconImg4: '',
				iconImg5: '',
				blueShow: false,
				bluenumber: 0
			};
		},
		methods: {
			//点击下一步，跳转到认证成功界面
			nextBtn() {
				if (this.blueShow == true) {
					uni.navigateTo({
						url: `../success/success?id=${this.static}`
					});
				}
			},
			// 点击返回键,跳转到上一个页面,即认证界面
			backBtn() {
				uni.navigateBack({
					delta: 1
				});
			},
			img1() {
				// 如果按钮此时是灰色的
				if (this.bluenumber <= 1) {
					// 此时该按钮是亮的状态
					if (this.iconImg1 == '../static/images/icon/icon/icon6.png') {
						this.iconImg1 = '../static/images/icon/icon1.png';
						this.blueShow = false;
						this.bluenumber--;
					} else {
						this.iconImg1 = '../static/images/icon/icon6.png';
						this.blueShow = true;
						this.bluenumber++;
					} //如果此时按钮是蓝色的
				} else {
					// 此时图标是亮的状态
					if (this.iconImg1 == '../static/images/icon/icon6.png') {
						this.iconImg1 = '../static/images/icon/icon1.png';
						this.bluenumber--;
						// this.blueShow = false;
					} else {
						// 此时图标是灰色的
						this.iconImg1 = '../static/images/icon/icon6.png';
						this.bluenumber++;
						// this.blueShow = true;
					}
				}
			},
			img2() {
				// 如果按钮此时是灰色的
				if (this.bluenumber <= 1) {
					// 此时该按钮是亮的状态
					if (this.iconImg2 == '../static/images/icon/icon7.png') {
						this.iconImg2 = '../static/images/icon/icon2.png';
						this.blueShow = false;
						this.bluenumber--;
					} else {
						this.iconImg2 = '../static/images/icon/icon7.png';
						this.blueShow = true;
						this.bluenumber++;
					} //如果此时按钮是蓝色的
				} else {
					// 此时图标是亮的状态
					if (this.iconImg2 == '../static/images/icon/icon7.png') {
						this.iconImg2 = '../static/images/icon/icon2.png';
						this.bluenumber--;
						// this.blueShow = false;
					} else {
						// 此时图标是灰色的
						this.iconImg2 = '../static/images/icon/icon7.png';
						this.bluenumber++;
						// this.blueShow = true;
					}
				}
			},
			img3() {
				// 如果按钮此时是灰色的
				if (this.bluenumber <= 1) {
					// 此时该按钮是亮的状态
					if (this.iconImg3 == '../static/images/icon/icon8.png') {
						this.iconImg3 = '../static/images/icon/icon3.png';
						this.blueShow = false;
						this.bluenumber--;
					} else {
						this.iconImg3 = '../static/images/icon/icon8.png';
						this.blueShow = true;
						this.bluenumber++;
					} //如果此时按钮是蓝色的
				} else {
					// 此时图标是亮的状态
					if (this.iconImg3 == '../static/images/icon/icon8.png') {
						this.iconImg3 = '../static/images/icon/icon3.png';
						this.bluenumber--;
						// this.blueShow = false;
					} else {
						// 此时图标是灰色的
						this.iconImg3 = '../static/images/icon/icon8.png';
						this.bluenumber++;
						// this.blueShow = true;
					}
				}
			},
			img4() {
				// 如果按钮此时是灰色的
				if (this.bluenumber <= 1) {
					// 此时该按钮是亮的状态
					if (this.iconImg4 == '../static/images/icon/icon9.png') {
						this.iconImg4 = '../static/images/icon/icon4.png';
						this.blueShow = false;
						this.bluenumber--;
					} else {
						this.iconImg4 = '../static/images/icon/icon9.png';
						this.blueShow = true;
						this.bluenumber++;
					} //如果此时按钮是蓝色的
				} else {
					// 此时图标是亮的状态
					if (this.iconImg4 == '../static/images/icon/icon9.png') {
						this.iconImg4 = '../static/images/icon/icon4.png';
						this.bluenumber--;
						// this.blueShow = false;
					} else {
						// 此时图标是灰色的
						this.iconImg4 = '../static/images/icon/icon9.png';
						this.bluenumber++;
						// this.blueShow = true;
					}
				}
			},
			img5() {
				// 如果按钮此时是灰色的
				if (this.bluenumber <= 1) {
					// 此时该按钮是亮的状态
					if (this.iconImg5 == '../static/images/icon/icon10.png') {
						this.iconImg5 = '../static/images/icon/icon5.png';
						this.blueShow = false;
						this.bluenumber--;
					} else {
						this.iconImg5 = '../static/images/icon/icon10.png';
						this.blueShow = true;
						this.bluenumber++;
					} //如果此时按钮是蓝色的
				} else {
					// 此时图标是亮的状态
					if (this.iconImg5 == '../static/images/icon/icon10.png') {
						this.iconImg5 = '../static/images/icon/icon5.png';
						this.bluenumber--;
						// this.blueShow = false;
					} else {
						// 此时图标是灰色的
						this.iconImg5 = '../static/images/icon/icon10.png';
						this.bluenumber++;
						// this.blueShow = true;
					}
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.cooperation {

		// 1.顶部导航栏
		.nav {
			display: flex;
			flex-direction: row;
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			align-items: center;
			margin-top: var(--status-bar-height);
			.navImg {
				width: 46rpx;
				height: 46rpx;
				margin-right: 230rpx;
			}
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

		// 3.中间圆圈部分
		.round {
			position: relative;
			margin: 160rpx 0 100rpx 0;
			background: white;

			// 第一行的圆的布局样式
			.first {
				position: relative;
				z-index: 3;
				display: flex;
				flex-direction: row;
				justify-content: center;
				
			}

			// 第二行的圆的布局样式
			.second {
				position: relative;
				z-index: 3;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 28rpx 55rpx 144rpx 55rpx;
			}

			// 第三行的圆的布局样式
			.end {
				position: relative;
				z-index: 100;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 0 130rpx;
			}

			//五个圆形的样式
			.Img {
				width: 140rpx;
				height: 140rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				border-radius: 70rpx;
			}

			// 大圈背景
			.bag {
				display: flex;
				justify-content: center;
				align-items: center;
				opacity: 0.5;
				z-index: -1;
				background: white;

				view {
					width: 512rpx;
					height: 512rpx;
					border: 1px solid rgba(140, 189, 235, 1);
					border-radius: 50%;
					position: absolute;
					// left:50%;
					top:50%;
					transform: translate(-50%,-50%);
					z-index: 2;
				}
			}
		}

		// 4.底部文字
		.footer {
			font-size: 10px;
			display: flex;
			justify-content: center;
			margin-bottom: 182rpx;
		}

		.btn {
			background: #808080;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
		}

		.blueStyle {
			background: #8cbdeb;
		}
	}
</style>
