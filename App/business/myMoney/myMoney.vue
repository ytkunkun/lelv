<template>
	<view class="myMoney">
		<view class="static"></view>
		<businessNav title="我的钱包"></businessNav>
		<view class="pad20">
			<!-- 2.资金详情 -->
			<view class="money">
				<view class="top">
					<view class="topImg">
						<image class="image" src="../static/images/myMoney/Account.png"></image>
					</view>
					<view>账户余额</view>
				</view>
				<view class="con">{{money}}.00</view>
				<view class="bottom">
					<view>
						<view class="title">累计收益</view>
						<view class="num">{{collect}}.00</view>
					</view>
					<view>
						<view class="title">已提现金额</view>
						<view class="num">{{out}}.00</view>
					</view>
				</view>
			</view>
			<!-- 3.余额提现按钮 -->
			<button class="button">余额提现</button>
			<!-- 4.提现记录 -->
			<view class="record mag20">
				<view>提现记录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import businessNav from "../components/businessNav.vue"
	export default {
		onLoad() {
			// 调用店铺账单接口
			this.http.post("/shop/getBill", {
				shop_id: this.$store.state.$shop.shop_id
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let array = [];
						array = resolve.data.data;
						for (let i = 0; i < array.length; i++) {
							if (resolve.data.data[i].type = 1) {
								this.collect = this.collect + resolve.data.data[i].money
							} else if (resolve.data.data[i].type = 2) {
								this.out = this.out + resolve.data.data[i].money
							}
							this.money = this.collect - this.out;

							// this.money
						}
					}
				}
			})
		},
		data() {
			return {
				collect: 0,
				out: 0,
				money: 0,
				//点击返回按钮，返回到上一个页面
				backBtn() {
					uni.navigateBack({
						delta: 1
					});
				}
			}
		},
		methods: {

		},
		components: {
			businessNav
		}
	}
</script>

<style lang="less" scoped>
	.myMoney {

		// 2.资金详情
		.money {
			padding: 86rpx 92rpx;
			box-shadow: 0px 3px 12px rgba(187, 187, 187, 0.16);

			.top {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				font-size: 18px;

				.topImg {
					width: 40rpx;
					height: 40rpx;
					margin-right: 24rpx;
				}
			}

			.con {
				text-align: center;
				font-size: 38px;
				margin: 18rpx 0 58rpx;
				color: #8CBDEB;
				font-weight: bold;
			}

			.bottom {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				>view {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 15px;
					color: rgba(130, 130, 130, 1);

					.num {
						font-size: ;
						font-weight: bold;
						font-size: 24px;
						margin-top: 18rpx;
						color: rgba(51, 51, 51, 1);
					}
				}
			}
		}

		.button {
			width: 100%;
			height: 84rpx;
			background: rgba(140, 189, 235, 1);
			border-radius: 27px;
			font-size: 19px;
			margin: 60rpx 0 32rpx 0;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.record {
			text-align: center;
			font-size: 19px;
		}
	}
</style>
