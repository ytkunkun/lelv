<template>
	<view class="manage">
		<manager :image1="image1" :image2="image2" :image3="image3" :image4="image4"></manager>
		<view class="occupy"></view>
		<view class="change">
			<!-- 4.订单详情 -->
			<view v-if="noData" class="noDataTips">暂无订单噢~</view>
			<view class="message pad20">
				<view v-for="(item,index) in mangeList" :key="index" v-if="yesData">
					<view class="title">
						<view>{{item.nick}}</view>
						<view class="right">
							<view :class="{redStyle:item.state=='申请退款'}">{{item.state}}</view>
							<view class="titleImg">
								<image class="image" src="../../static/images/returnRight.png"></image>
							</view>
						</view>
					</view>
					<view class="con">
						<view>
							<view class="conImg">
								<image class="image" :src="item.user_avatar"></image>
							</view>
							<view class="conText">
								<view>{{item.create_time}}</view>
								<view>{{item.title}}</view>
							</view>
						</view>
						<view class="money">￥{{item.money}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import manager from "../components/manager.vue"
	export default {
		onLoad(option) {
			this.pageIndex = option.pageIndex;
			if (this.pageIndex == 1) {
				this.image1 = "../../static/images/manage/icon105.png"
				this.image2 = "../../static/images/manage/icon102.png"
				this.image3 = "../../static/images/manage/icon103.png"
				//待付款
			} else if (this.pageIndex == 2) {
				this.image1 = "../../static/images/manage/icon101.png"
				this.image2 = "../../static/images/manage/icon106.png"
				this.image3 = "../../static/images/manage/icon103.png"
				// 已付款         
			} else if (this.pageIndex == 3) {
				this.image1 = "../../static/images/manage/icon101.png"
				this.image2 = "../../static/images/manage/icon102.png"
				this.image3 = "../../static/images/manage/icon107.png"
			}
			// 获取某个店铺的详情订单
			this.http.post("/order/getShopOrderDetails", {
				shop_id: this.$store.state.$shop.shop_id
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let array = resolve.data.data;
						let array1 = []
						for (let i = 0; i < array.length; i++) {
							if (array[i].state == 0) {
								array[i].state = "申请退款";
							}
							if (array[i].state == 1) {
								array[i].state = "未支付";
							}
							if (array[i].state == 2) {
								array[i].state = "已支付";
							}
							if (array[i].state == 3) {
								array[i].state = "交易完成";
							}
							if (this.pageIndex == 1) {
								array1.push(array[i])
								//待付款
							} else if (this.pageIndex == 2) {
								if (array[i].state == "未支付") {
									array1.push(array[i])
								}
								// 已付款         
							} else if (this.pageIndex == 3) {
								if (array[i].state == "已支付") {
									array1.push(array[i])
								}
							}
						}
						// this.mangeList = resolve.data.data;
						this.mangeList = array1;
						if (array1.length == 0) {
							this.noData = true;
							this.yesData = false;
						}
					}
				}
			})
		},
		data() {
			return {
				image1: "../../static/images/manage/icon105.png",
				image2: "../../static/images/manage/icon102.png",
				image3: "../../static/images/manage/icon103.png",
				image4: "../../static/images/manage/icon104.png",
				mangeList: [],
				redStyle: 1,
				noData: false,
				yesData: true,
				pageIndex: ""
				// activity_state:"交易完成"//订单状态
			}
		},
		components: {
			manager
		},
	}
</script>

<style lang="less" scoped>
	.manage {
		margin-bottom: 110rpx;
		.change{
			margin-top: 285rpx;
		}
		/* #ifdef MP-WEIXIN */
		.change{
			margin-top: 350rpx;
		}
		/* #endif */
		.occupy{
			height:var(--status-bar-height) ;
		}

		// 3.订单详情
		.message {
			>view {
				padding: 24rpx 32rpx 38rpx 32rpx;
				margin-bottom: 20rpx;
				box-shadow: 0px 6px 12px rgba(97, 97, 97, 0.16);
				border-radius: 6px;

				.title {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding-bottom: 20rpx;
					border-bottom: 1px solid white;
					font-size: 13px;
					border-bottom: rgba(140, 189, 235, 0.1) 1px solid;
					color: #8CBDEB;

					.titleTxex {
						font-weight: bold;
						color: #333333;
					}

					.right {
						display: flex;
						flex-direction: row;
						align-items: center;

						.redStyle {
							color: red;
							font-weight: bold;
						}

						.titleImg {
							width: 23rpx;
							height: 23rpx;
							margin-left: 22rpx;
						}

						.red {
							color: red;
							font-weight: bold;
						}
					}

				}

				.con {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin-top: 32rpx;
					font-size: 12px;

					& view:first-child {
						display: flex;
						flex-direction: row;
						align-items: center;

						.conImg {
							margin-right: 32rpx;
							width: 76rpx;
							height: 76rpx;

						}

						.conText {
							display: flex;
							flex-direction: column;
							justify-content: center;

							& view:first-child {
								margin-bottom: 15rpx;
							}
						}
					}

					.money {
						color: #8CBDEB;
					}
				}
			}

		}
	}
</style>
