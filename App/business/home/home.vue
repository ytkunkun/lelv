<template>
	<view class="Bhome">
		<view class="static"></view>
		<!-- 1.图标选项 -->
		<view class="change">
			<view class="top mag20">
				<view v-for="(item,index) in topList" :key="index" @click="iconBtn(index)">
					<view class="topImg">
						<image class="image" :src="item.img"></image>
					</view>
					<view class="text">{{item.text}}</view>
				</view>
			</view>
			<!-- 2.标题1 -->
			<view class="title pad20">
				<view>营收统计</view>
			</view>
			<!-- 3.标题1的内容 -->
			<view class="con1">
				<image class="image" src="../static/images/home/statistics.png"></image>
				<view class="slip">
					<view class="s1" :class="{s:slipStatic==1}" @click="slipBtn(1)">今日</view>
					<view :class="{s:slipStatic==2}" @click="slipBtn(2)">近7日</view>
					<view class="s3" :class="{s:slipStatic==3}" @click="slipBtn(3)">近30日</view>
				</view>
				<view class="white"></view>
			</view>
			<!-- 4.标题2 -->
			<view class="title pad20">
				<view>最新动态</view>
			</view>
			<!-- 5.标题2的内容 -->
			<view class="con2 pad20">
				<view v-for="(item,index) in conList" :key="index">
					<view class="left">
						<view class="LeftImg">
							<image class="image" :src="item.img"></image>
						</view>
						<view class="phone">{{item.phone}}</view>
						<view class="big">
							<view>{{item.text}}</view>
						</view>
					</view>
					<view class="right">{{item.time}}</view>
				</view>
			</view>
		</view>
		<!-- 使用组件 -->
		<tab :image1="image1" :image2="image2" :image3="image3"></tab>
	</view>
</template>

<script>
	// 导入自定义的tabbar组件
	import tab from "../../components/tab.vue";
	export default {
		data() {
			return {
				image1: "../static/images/b1.png",
				image2: "../static/images/b3.png",
				image3: "../static/images/aa8.png",
				slipStatic: 1, //滑动条的点击状态
				topList: [{
						img: "../static/images/home/icon18@2x.png",
						text: "店铺管理"
					},
					{
						img: "../static/images/home/icon19@2x.png",
						text: "活动管理"
					},
					{
						img: "../static/images/home/icon20@2x.png",
						text: "发布物资"
					},
					{
						img: "../static/images/home/icon21@2x.png",
						text: "订单管理"
					},
					{
						img: "../static/images/home/icon22@2x.png",
						text: "人员管理"
					},
					{
						img: "../static/images/home/icon23@2x.png",
						text: "评论管理"
					}
				],
				conList: [{
						img: "../../static/images/head/Head1.png",
						phone: "123****4567",
						text: "关注了店铺",
						time: "2分钟前"
					},
					{
						img: "../../static/images/head/Head4.png",
						phone: "123****4567",
						text: "取消了关注店铺",
						time: "2分钟前"
					},
					{
						img: "../../static/images/head/Head6.png",
						phone: "123****4567",
						text: "向你提问",
						time: "2分钟前"
					}
				]
			}
		},
		methods: {
			// 点击图标的跳转事件
			iconBtn(i) {
				// 跳转到店铺管理
				if (i == 0) {
					uni.navigateTo({
						url: "../storeManager/storeManager"
					})
				};
				// 跳转到活动管理
				if (i == 1) {
					uni.navigateTo({
						url: "../activityManager/activityManager"
					})
				};
				// 跳转到发布物资
				if (i == 2) {
					uni.navigateTo({
						url: "../issueMaterials/issueMaterials"
					})
				};
				// 跳转到订单管理
				if (i == 3) {
					uni.navigateTo({
						url: "../manage/manage"
					})
				};
				// 跳转到人员管理
				if (i == 4) {
					uni.navigateTo({
						url: "../personnelManager/personnelManager"
					})
				};
				// 跳转到评论管理
				if (i == 5) {
					uni.navigateTo({
						url: "../evaluateManager/evaluateManager"
					})
				};

			},
			// 滑动条的点击事件
			slipBtn(i) {
				this.slipStatic = i;
			}
		},
		// 组件注册
		components: {
			tab
		}
	}
</script>

<style lang="less" scoped>
	.Bhome {
		padding-bottom: 180rpx;
		.change{
			padding-top:var(--status-bar-height);
		}
		// 2.图标选项
		.top {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			font-size: 12px;
			box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
			border-radius: 6px;
			margin-top: 50rpx;
			padding-bottom: 50rpx;
			

			>view {
				width: 33.3%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.topImg {
				width: 100rpx;
				height: 100rpx;
				margin: 50rpx 0 16rpx 0;
				background: white;
			}
		}

		// 标题1 和标题2的样式
		.title {
			font-size: 18px;
			margin: 80rpx 0 32rpx 0;
			font-weight: bold;
			line-height: 22px;
			color: rgba(102, 102, 102, 1);
		}

		// 3.标题1的内容
		.con1 {
			width: 100%;
			height: 552rpx;
			position: relative;

			// 滑动条
			.slip {
				width: 300rpx;
				height: 43rpx;
				background: #8cbdeb;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				color: white;
				font-size: 12px;
				border-radius: 25rpx;
				position: absolute;
				top: 50rpx;
				right: 50rpx;

				.s1 {
					padding-left: 17rpx;
				}

				.s3 {
					padding-right: 16rpx;
				}

				// 点击后的滑动条样式
				.s {
					display: flex;
					align-items: center;
					justify-content: center;
					background: white;
					padding: 14rpx 16rpx;
					border-radius: 12px;
					color: #666666;
				}


				// & view:first-child{
				// 	background: #4CD964;
				// 	// padding: 10rpx 0 10rpx 0rpx;
				// }
			}

			// 点击后的样式
			.white {
				background: white;
				color: #666666;

			}


		}

		// 5.标题2的内容
		.con2 {

			// 每个动态的样式
			>view {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				font-size: 10px;
				padding: 26rpx 0;
				margin-bottom: 20rpx;

				// 左边样式
				.left {
					display: flex;
					flex-direction: row;
					align-items: center;

					>view {
						margin-right: 12rpx;
					}

					.LeftImg {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}

					.phone {
						font-weight: bold;
						line-height: 27px;
						color: rgba(102, 102, 102, 1);
					}

					// 消息类型样式
					.big {
						border-radius: 10px;
						padding: 5rpx 10rpx;
						background: #8cbdeb;
						font-size: 9px;
						color: white;
					}
				}
			}
		}
	}
</style>
