<template>
	<view class="refund">
		<manager :image1="image1" :image2="image2" :image3="image3" :image4="image4"></manager>
		<view class="occupy"></view>
		<view class="change">
			<!-- 3.订单信息 -->
			<view v-if="noData" class="noDataTips">暂无订单噢~</view>
			<view class="news mag20" v-for="(item,index) in refundList" :key="index" v-if="yesData">
				<view class="title">
					<view>{{item.nick}}</view>
					<view class="red">{{item.state}}</view>
				</view>
				<view class="sub">
					<view>
						<view>订单编号</view>
						<view>{{item.serial}}</view>
					</view>
					<view>
						<view>活动名称</view>
						<view>{{item.title}}</view>
					</view>
					<view>
						<view>付款时间</view>
						<view>{{item.create_time}}</view>
					</view>
					<view>
						<view>实付款</view>
						<view class="blue">￥{{item.money}}</view>
					</view>
				</view>
				<view class="btn">
					<view>确认退款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入自定义的顶部公用组件
	import manager from "../components/manager.vue"
	export default {
		onLoad(option) {
			// 获取某个店铺的详情订单
			this.http.post("/order/getShopOrderDetails", {
				shop_id: this.$store.state.$shop.shop_id
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let array = resolve.data.data[0];
						let array2 = [];
						for (let i = 0; i < array.length; i++) {
							if (array[i].state == 0) {
								array[i].state = "申请退款";
								array2.push(array[i]);
							}
						}
						this.refundList = array2;
						if (array2.length == 0) {
							this.noData = true;
							this.yesData = false;
						}

					}
				}
			})
		},
		data() {
			return {
				image1: "../../static/images/manage/icon101.png",
				image2: "../../static/images/manage/icon102.png",
				image3: "../../static/images/manage/icon103.png",
				image4: "../../static/images/manage/icon108.png",
				refundList: [],
				noData: false,
				yesData: true,

			}
		},
		methods: {},
		//挂载组件
		components: {
			manager
		}
	}
</script>

<style lang="less" scoped>
	.refund {
		.change{
			margin-top: 285rpx;
		}
		.occupy{
			height:var(--status-bar-height) ;
		}
		// 3.订单信息
		.news {
			font-size: 14px;
			padding: 32rpx 40rpx;
			border-radius: 6px;
			box-shadow: 0px 6px 24px rgba(97, 97, 97, 0.16);

			.title {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding-bottom: 20rpx;
				border-bottom: rgba(140, 189, 235, 0.2) 1px solid;

				.red {
					color: rgba(255, 57, 57, 1);
					font-weight: bold;
				}
			}

			.sub {
				display: flex;
				flex-direction: column;
				padding: 32rpx 0;

				>view {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-bottom: 30rpx;

					& view:first-child {
						font-weight: bold;
						color: rgba(102, 102, 102, 1);
					}
				}

				.blue {
					color: #8CBDEB;
				}
			}

			.btn {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;

				>view {
					font-size: 12px;
					border-radius: 12px;
					background: rgba(255, 57, 57, 1);
					text-align: center;
					padding: 10rpx 15rpx;
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}


	}
</style>
