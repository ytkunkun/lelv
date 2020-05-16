<template>
	<view class="leaveUnused">
		<view class="static"></view>
		<!-- 1.nav -->
		<view class="nav">
			<input type="text">
		</view>
		<!-- 2.用户评价 -->
		<view class="pad20 change">
			<view class="evaluate">
				<view v-for="(item,index) in evaluatList" :key="index">
					<view class="top">
						<view class="left">
							<view class="topImg">
								<image class="image" :src="item.avatar"></image>
							</view>
							<view class="topText">
								<view>{{item.nick}}</view>
								<view>{{item.create_time}}</view>
							</view>
						</view>
						<view class="type">
							<view class="typeImg">
								<image class="image" src="../static/images/leaveUnused/place.png"></image>
							</view>
							<view>{{item.type}}</view>
						</view>
					</view>
					<view class="bottom">
						<view>
							<image class="image" :src="item.image_url" mode="widthFix"></image>
						</view>
					</view>
					<view class="text">
						<view class="text1">
							<view class="textImg">
								<image class="image" src="../static/images/leaveUnused/information.png"></image>
							</view>
							<view class="t">{{item.title}}</view>
						</view>
						<view class="text2">
							<view class="textImg">
								<image class="image" src="../static/images/leaveUnused/lianxi.png"></image>
							</view>
							<view class="t">联系他</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 使用自定义的tabbar组件 -->
		<tab :image1="image1" :image2="image2" :image3="image3"></tab>
	</view>
</template>

<script>
	// 导入自定义的tabbar组件
	import tab from "../../components/tab.vue";
	export default {
		onLoad() {
			// 获取全部闲置资源
			this.http.post("/resource/getAllResource").then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let array = [];
						let data = resolve.data.data;
						for (let i = 0; i < data.length; i++) {
							if (data[i].type == 0) {
								data[i].type = "策划"
							} else if (data[i].type == 1) {
								data[i].type = "场地"
							} else if (data[i].type == 2) {
								data[i].type = "物料"
							} else if (data[i].type == 3) {
								data[i].type = "影像"
							} else if (data[i].type == 4) {
								data[i].type = "其他"
							}
							array.unshift(data[i]);
						}
						this.evaluatList = array;
					}
				}
			})
		},
		data() {
			return {
				image1: "../static/images/aaaa2.png",
				image2: "../static/images/b2.png",
				image3: "../static/images/aa8.png",
				evaluatList: []
			}
		},
		methods: {

		},
		// 组件挂载
		components: {
			tab
		}
	}
</script>

<style lang="less" scoped>
	.leaveUnused {
		padding-bottom: 160rpx;
		margin-top: var(--status-bar-height);

		// 1.顶部导航栏
		.nav {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding: 22rpx 0 20rpx 0;
			font-size: 15px;
			margin-bottom: 32rpx;
			position: fixed;
			width: 100vw;
			background-color: white;
			z-index: 12;
			input {
				background: #e8e8e8;
				border-radius: 3px;
				width: 576rpx;
				box-sizing: border-box;
				padding: 0rpx 12rpx;
			}
		}
		.change{
			padding-top: 120rpx;
		}
		// 2.用户评价
		.evaluate {
			>view {
				padding: 20rpx 30rpx 30rpx 30rpx;
				box-shadow: 0px 3rpx 6rpx rgba(72, 72, 72, 0.16);
				margin-bottom: 20rpx;
				border-radius: 6rpx;
				box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);

				.top {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					.left {
						display: flex;
						flex-direction: row;
						align-items: center;

						.topImg {
							width: 92rpx;
							height: 92rpx;
							margin-right: 32rpx;

							image {
								border-radius: 50%;
							}
						}

						.topText {
							font-size: 12px;

							& view:first-child {
								font-size: 16px;
								margin-bottom: 20rpx;
								font-weight: bold;
							}
						}
					}

					.type {
						font-size: 12px;
						display: flex;
						flex-direction: row;
						align-items: center;

						.typeImg {
							width: 28rpx;
							height: 28rpx;
							margin-right: 20rpx;
						}
					}
				}

				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin: 38rpx 0 32rpx 0;

					>view {
						width: 320rpx;
						border-radius: 6px;

						image {
							width: 320rpx;
							border-radius: 6px;
						}
					}
				}

				.text {
					>view {
						display: flex;
						flex-direction: row;
						align-items: center;
						font-size: 10px;

						.textImg {
							width: 28rpx;
							height: 28rpx;
							margin-right: 20rpx;
						}

						.t {
							text-align: center;
						}
					}

					.text1 {
						margin-bottom: 32rpx;
					}
				}
			}

		}

	}
</style>
