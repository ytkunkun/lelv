<template>
	<view class="evaluateManager">
		<view class="static"></view>
		<businessNav title="评价管理"></businessNav>
		<view class="pad20">
			<!-- 2.用户评价 -->
			<view class="evaluate">
				<view v-for="(item,index) in evaluatList" :key="index">
					<view class="top">
						<view class="left">
							<view class="topImg">
								<image class="image" :src="item.head"></image>
							</view>
							<view class="topText">
								<view>{{item.name}}</view>
								<view>{{item.text}}</view>
							</view>
						</view>
						<view class="time">
							{{item.time}}
						</view>
					</view>
					<view class="con">
						{{item.con}}
					</view>
					<view class="bottom">
						<view>
							<image class="image" :src="item.img[0]"></image>
						</view>
						<view>
							<image class="image" :src="item.img[1]"></image>
						</view>
					</view>
					<view class="btn">
						<button>回复</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import businessNav from "../components/businessNav.vue"
	export default {
		data() {
			return {
				evaluatList: [{
						head: "../../static/images/head/Head1.png",
						img: ["../static/images/evaluateManager/picture1.png", "../static/images/evaluateManager/picture2.png"],
						name: "胡安安",
						text: "对海底世界城的活动发起的评论",
						con: "这次的海底世界之旅真的很值，一家人都玩得很开心。",
						time: "11月20日"
					},
					{
						head: "../../static/images/head/Head3.png",
						img: ["../static/images/evaluateManager/picture3.png", "../static/images/evaluateManager/picture4.png"],
						name: "林颖",
						text: "篝火晚会",
						con: "儿子一直想去参加一次篝火晚会，这次终于圆梦了，儿子很开心，对这次旅行感到非常满意",
						time: "11月21日"
					}
				]
			}
		},
		methods: {},
		components: {
			businessNav
		}
	}
</script>

<style lang="less" scoped>
	.evaluateManager {
		padding-bottom: 110rpx;

		// 2.用户评价
		.evaluate {
			margin-top: 10rpx;

			>view {
				padding: 20rpx 30rpx 30rpx 30rpx;
				box-shadow: 0px 3px 6px rgba(72, 72, 72, 0.16);
				margin-bottom: 20rpx;
				border-radius: 6rpx;

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
							border-radius: 50%;

							image {
								border-radius: 50%;
							}
						}

						.topText {
							font-size: 12px;

							& view:first-child {
								font-size: 15px;
								margin-bottom: 20rpx;
								font-weight: bold;

							}
						}
					}

					.time {
						font-size: 10px;
					}
				}

				.con {
					font-size: 15px;
					margin: 20rpx 0;
					line-height: 48rpx;
				}

				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					>view {
						width: 300rpx;
						height: 260rpx;
						background: #3F536E;
						border-radius: 6px;
					}
				}

				.btn {
					display: flex;
					justify-content: flex-end;
					margin-top: 32rpx;

					button {
						margin: 0;
						padding: 0;
						font-size: 10px;
						padding: 6rpx 26rpx;
						line-height: 20px;
						border-radius: 10px;
						color: white;
						background: #8cbdeb;
					}
				}
			}
		}
	}
</style>
