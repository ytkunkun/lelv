<template>
	<view class="applicationOrder">
		<view class="static"></view>
		<!--  1.顶部导航栏 -->
		<view class="nav mag20">
			<view class="navImg" @click="backBtn">
				<image class="image" src="../static/images/return1.png"></image>
			</view>
			<view class="title">
				报名订单
			</view>
		</view>
		<!-- 2.订单基本信息 -->
		<view class="con pad20">
			<view class="conChirdlen">
				<view class="title">用户</view>
				<view class="text">{{nick}}</view>
			</view>
			<picker class="conChirdlen" @change="bindPickerChange" :value="index" :range="array">
				<view class="picker">
					人数
				</view>
				<view class="text">{{array[index]}}</view>
			</picker>
			<view class="conChirdlen">
				<view class="title">状态</view>
				<view class="text">待支付</view>
			</view>
		</view>
		<!-- 3.装饰物 -->
		<view class="decorate mag20">
			<view></view>
		</view>
		<!-- 4.订单详细信息 -->
		<view class="news mag20">
			<view class="title1">
				<view>店铺名称</view>
				<view>支付状态</view>
			</view>
			<view class="newsCon1">
				<view>{{shop_name}}</view>
				<view>待支付</view>
			</view>
			<view class="title2">
				<view class="left">活动名称</view>
				<view>数量</view>
				<view class="right">总计</view>
			</view>
			<view class="newsCon2">
				<view class="money1">
					<view>
						<view>
							<view class="left">{{title}}</view>
						</view>
						<view>{{array[index]}}</view>
						<view>
							<view class="right">￥{{array[index]*price}}</view>
						</view>
					</view>
				</view>
				<s class="money2">￥{{array[index]*price}}</s>
				<view class="money3">
					<view class="money3L">乐旅币抵扣￥{{coin}}.00</view>
					<view class="money3R"> ￥{{array[index]*price-coin}}</view>
				</view>

			</view>
			<view class="title3">详细信息</view>
			<view class="newsCon3">
				<view>订单编号 12345678</view>
				<view>{{address}}</view>
				<view>{{time}}</view>
			</view>
			<view class="footer">备注</view>
			<input type="text" v-model="remarks">
		</view>
		<view class="button btn" @click="payment">
			<view>确认支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			// 获取当前时间的方法
			function getTimes() {
				var thisDay = new Date();
				var year = thisDay.getFullYear(); //年
				var month = thisDay.getMonth() + 1; //月
				var day = thisDay.getDate(); //日
				var hh = thisDay.getHours(); //时
				var mm = thisDay.getMinutes(); //分
				var timer = year + "-";
				if (month < 10)
					timer += "0";
				timer += month + "-";
				if (day < 10)
					timer += "0";
				timer += day + " ";
				if (hh < 10)
					timer += "0";
				timer += hh + ":";
				if (mm < 10)
					timer += '0';
				timer += mm;
				return (timer);
			}
			this.activity_id = option.activity_id;
			this.shop_id = option.shop_id;
			// 调用某个活动接口
			this.http.post("/activity/getActivity", {
				activity_id: this.activity_id
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						this.shop_name = resolve.data.data[0].shop_name;
						this.address = resolve.data.data[0].address;
						this.title = resolve.data.data[0].title;
						this.price = resolve.data.data[0].price;
						this.nick = resolve.data.data[0].nick;
						this.coin = parseInt(this.$store.state.$parenting.coin / 100);
						this.time = getTimes()
					}
				}
			})
		},
		data() {
			return {
				shop_name: "",
				shop_id: "",
				address: "",
				title: "",
				price: "",
				selection: "1",
				coin: "",
				time: "",
				remarks: "", //用户填写的备注文本
				order_id: "",
				index: 0,
				serial: "", //存储订单编号
				money: "", //实付金额
				array: [1, 2, 3, 4, 5, 7, 8, 9, 10],
				nick:"",
				topList: [{
						name: "活动名称",
						text: "亲子绘画班"
					},
					{
						name: "支付状态",
						text: "待支付"
					},
				],
				content1List: ["产品", "产品", "总计"],
				activity_id: ""
			}
		},
		methods: {
			backBtn() {
				uni.navigateBack({
					delta: 1
				})
			},
			bindPickerChange(e) {
				this.index = e.detail.value
			},
			// 点击付款时,触发的方法
			payment() {
				let index = this.index
				this.money = this.array[index] * this.price - this.coin
				// 调用添加订单的接口
				this.http.post("/order/addOrder", {
					shop_id: this.shop_id,
					activity_id: this.activity_id,
					user_id: this.$store.state.$parenting.user_id,
					money: this.price * this.selection - this.coin,
					count: this.selection,
					price: this.price,
					total: this.price * this.selection,
					note: this.remarks,

				}).then((resolve) => {
					if (resolve.statusCode == 200) {
						if (resolve.data.code == "ok") {
							// 将订单号存起来
							this.serial = resolve.data.data.serial
							// 支付成功后,调用修改乐旅币的接口
							this.http.post("/user/updateUserInfo", {
								type: 7,
								phone: this.$store.state.$parenting.phone,
								coin: (this.$store.state.$parenting.coin - this.coin * 100) + (this.price * this.selection - this.coin)
							}).then((resolve) => {
								if (resolve.statusCode == 200) {
									if (resolve.data.code == "ok") {
										// 修改完后,将数据库更新后的信息,同步到本地存储中
										// 调用用户信息的接口,将其存储到本地
										this.http.post('/user/getUserInfo', {
											phone: this.$store.state.$parenting.phone
										}).then(res => {
											if (res.data.code == "ok") {
												let obj = {
													user_id: res.data.data.user_id,
													phone: res.data.data.phone,
													pwd: res.data.data.pwd,
													nick: res.data.data.nick,
													sex: res.data.data.sex,
													pay_pwd: res.data.data.pay_pwd,
													birthday: res.data.data.birthday,
													avatar: res.data.data.avatar,
													qq: res.data.data.qq,
													state: res.data.data.state,
													coin: res.data.data.coin,
													create_time: res.data.data.create_time
												};
												this.$store.commit('setParenting', obj);
												// 获取某个用户的所有订单
												this.http.post("/order/getUserOrder", {
													user_id: this.$store.state.$parenting.user_id,
												}).then((resolve) => {
													if (resolve.statusCode == 200) {
														if (resolve.data.code == "ok") {
															let array = [];
															array = resolve.data.data;
															for (let i = 0; i < array.length; i++) {
																if (array[i].serial == this.serial) {
																	// 调用支付订单的接口
																	this.http.post("/order/pay", {
																		pay_type: 1,
																		order_id: array[i].order_id
																	}).then((resolve) => {
																		if (resolve.statusCode == 200) {
																			if (resolve.data.code == "ok") {
																				// 页面跳转
																				uni.navigateTo({
																					url: `../successfulPayment/successfulPayment?money=${this.money}&time=${this.time}&serial=${this.serial}&activity_id=${this.activity_id}`
																				})
																			}
																		}
																	})
																}
															}
														}
													}
												})


											}
										})
									}
								}
							})
						}
					}
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	.applicationOrder {
		color: rgba(153, 153, 153, 1);

		// 1.顶部导航栏
		.nav {
			display: flex;
			flex-direction: row;
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			align-items: center;
			position: relative;
			margin-top: var(--status-bar-height);;
			.navImg {
				width: 46rpx;
				height: 46rpx;
			}

			.title {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				font-size: 17px;
			}
		}

		// 2.订单基本信息
		.con {
			display: flex;
			flex-direction: row;
			margin: 52rpx 100rpx;
			font-size: 12px;
			justify-content: space-between;

			.conChirdlen {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.con12 {
					display: flex;
					flex-direction: row;
					align-items: center;
				}
			}

			.text {
				font-size: 14px;
				font-weight: bold;
				margin-top: 15rpx;
				text-align: center;
			}
		}

		// 3.装饰物
		.decorate {
			width: 615rpx;
			height: 38rpx;
			box-shadow: 0px -3px 6px rgba(255, 235, 235, 1);
			opacity: 1;
			border-radius: 6px 6px 0 0;
			margin: 0 auto;
			background: rgba(255, 229, 229, 1);
			opacity: 0.36;
		}

		// 4.订单详细信息
		.news {
			padding: 60rpx 48rpx 48rpx 48rpx;
			border-radius: 6px;
			position: relative;
			top: -20rpx;
			margin: 0 14rpx;
			font-size: 12px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 3px 12px rgba(220, 174, 174, 0.64);

			.title1 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			.newsCon1 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 16px;
				margin: 18rpx 0 62rpx;
				font-weight: bold;
				color: rgba(102, 102, 102, 1);
			}

			.title2 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.left {
					width: 250rpx;
					text-align: left;
				}

				.right {
					width: 250rpx;
					text-align: right;
				}
			}

			.newsCon2 {
				margin: 24rpx 0;
				padding: 24rpx 0;
				border-top: 1px solid #C8C7CC;
				border-bottom: 1px solid #C8C7CC;

				.money1 {
					font-size: 14px;

					>view {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-bottom: 24rpx;

						.left {
							width: 250rpx;
							text-align: left;
						}

						.right {
							width: 250rpx;
							text-align: right;
						}
					}
				}

				.money2 {
					display: flex;
					justify-content: flex-end;
					align-items: flex-end;
					padding-bottom: 22rpx;
					font-size: 16px;
				}

				.money3 {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					align-items: flex-end;

					.money3R {
						font-size: 16px;
						margin-left: 46rpx;
						font-weight: bold;
						color: rgba(153, 153, 153, 1);
					}
				}
			}

			.newsCon3 {
				margin: 24rpx 0 14rpx 0;

				>view {
					margin-bottom: 12rpx;
				}
			}

			.footer {
				margin-top: 20rpx;
			}

			input {
				border-bottom:solid 1px #C8C7CC;
				margin-top: 5rpx;
				font-size: 12px;
			}
		}

		.btn {
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.confirm {}
	}
</style>
