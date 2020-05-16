<template>
	<view class="details">
		<view v-for="item in detailsList">
			<view class="banner">
				<image mode="aspectFill" class="image" :src="image_url"></image>
				<!-- 返回按钮 -->
				<view class="navImg" @click="backBtn">
					<image class="image" src="../static/images/details/return2.png"></image>
				</view>
			</view>
			<!-- 3.活动标题+活动内容描述 -->
			<view class="title pad20">
				<view class="ti1">{{ item.title }}</view>
				<view :class="{ ti2: ti2Show }">{{ item.content }}</view>
				<view class="titleI">
					<view class="titleImg" @click="titleImgBtn">
						<image class="image" :src="titleImage"></image>
					</view>
				</view>
			</view>
			<!-- 4.活动详情标题  -->
			<view class="text1 pad20">活动详情</view>
			<!-- 5.标签 -->
			<view class="label pad20">
				<!-- <view class="lab" v-for="(item,index) in label" :key="index">{{item}}</view> -->
				<view class="lab">{{ price }}</view>
				<view class="lab">{{ age }}</view>
				<view class="lab">{{ address }}</view>
				<view class="lab">{{ start_time }}</view>
				<view class="lab">{{ day }}</view>
				<view class="lab">{{ type }}</view>
			</view>
		</view>
		<!-- 6.活动评价标题 -->
		<view class="text2 pad20">活动评价</view>
		<!-- 7.活动评价内容 -->
		<view class="content mag20" v-for="(conItem, conIndex) in content" :key="conIndex">
			<view class="top">
				<view class="left">
					<view class="leftImg">
						<image class="image" src="../../static/images/head/Head1.png"></image>
					</view>
					<view class="leftText">
						<view class="tx1">{{ conItem.name }}</view>
						<view class="tx2">{{ conItem.timer }}</view>
					</view>
				</view>
				<view class="right">{{ conItem.time }}</view>
			</view>
			<view class="con">{{ conItem.text }}</view>
			<view class="bottom">
				<view class="boLeft">
					<view>{{ '浏览 ' + conItem.num1 }}</view>
				</view>
				<view class="boRight">
					<view class="boImg">
						<!-- <image src="../static/images/community/fabulous.png"></image> -->
						<!-- <image src="../static/images/mycommunity/fabulous.png" mode=""></image> -->
						<image class="image" src="../static/images/fabulous2.png" mode=""></image>
					</view>
					<view>{{ conItem.num2 }}</view>
				</view>
			</view>
		</view>
		<button></button>
		<button></button>
		<view v-if="confirmShow == 0" class="button" @click="applicationBtn">
			<view>立即报名</view>
		</view>
		<view v-if="confirmShow == 1" class="button btnn">
			<view>已报名</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.activity_id = option.activity_id;
			this.pageType = option.pageType;
			// 调用该用户的所有订单
			this.http
				.post('/order/getUserOrder', {
					user_id: this.$store.state.$parenting.user_id
				})
				.then(resolve => {
					if (resolve.statusCode == 200) {
						if (resolve.data.code == 'ok') {
							let array = [];
							array = resolve.data.data;
							for (var a = 0; a < array.length; a++) {
								if (array[a].state == 2) {
									this.array.push(array[a].activity_id);
								}
							}
							// 判断这个活动是否已支付
							for (let i = 0; i < this.array.length; i++) {
								if (this.array[i] == this.activity_id) {
									this.confirmShow = 1;
								}
							}
						}
					}
				});

			// 调用获取当个活动的详情数据
			this.http
				.post('/activity/getActivity', { //API的url
					activity_id: this.activity_id //传入参数
				})
				.then(resolve => {
					// console.log(resolve);
					if (resolve.statusCode == 200) {
						if (resolve.data.code == 'ok') {
							let array = resolve.data.data[0];
							// 地址
							this.address = array.address;
							// 图片
							this.image_url = array.image_url;
							this.detailsList = resolve.data.data;
							this.shop_id = array.shop_id;
							// 年龄
							this.age = `${array.min_age}-${array.max_age}岁`;
							// 价格
							this.price = `${array.price}元`;
							// 开始时间
							let start = array.start_time;
							this.start_time = start.substring(0, 10);
							//活动时长
							let end = array.end_time;
							let dif = this.difftime(start, end);
							if (dif.days == 0) {
								this.day = '1天';
							} else if (dif.days == 1) {
								this.day = '2天';
							} else if (dif.days == 2) {
								this.day = '3天';
							} else if (dif.days == 3) {
								this.day = '4天';
							} else if (dif.days == 4) {
								this.day = '5天';
							} else if (dif.days == 5) {
								this.day = '6天';
							} else if (dif.days == 6) {
								this.day = '7天';
							} else {
								this.day = '7天以上';
							}

							// for (let i = 1; i <= dif; i++) {
							// 	this.day= i + '天';
							// 	if (i >= 10) {
							// 		this.day = '10天以上';
							// 		break;
							// 	}
							// }
							// 活动类型
							if (array.type == 1) {
								array.type = '室内';
							}
							if (array.type == 2) {
								array.type = '室外';
							}
							if (array.type == 3) {
								array.type = '野外';
							}
							if (array.type == 4) {
								array.type = '其他';
							}
							this.type = array.type;
						}
					}
				});
		},
		data() {
			return {
				pageType: '',
				activity_id: '', //存储上个页面带进来的活动id
				shop_id: '',
				detailsList: [], //存储活动详情数据
				age: '', //年龄标签
				price: '', //价格标签
				start_time: '', //开始时间
				image_url: '',
				address: '',
				state: '',
				type: '',
				day: '',
				confirmShow: 0, //判断有无报名
				array: [], //存放用户已支付的活动id
				ti2Show: true,
				titleImage: '../static/images/details/down.png',
				label: ['免预约', '3-18岁', '室内活动', '北京海洋馆', '11月22日', '一天'],
				content: [{
						url: '',
						name: '用户1',
						timer: '5分钟前发布',
						time: '2019年11月23日',
						text: '活动很精彩，孩子很开心，孩子回家后考了我们一堆问题，看来他涨了不少知识。我们期待下次更加精彩的活动！',
						num1: '12345',
						num2: '37'
					},
					{
						url: '',
						name: '用户1',
						timer: '5分钟前发布',
						time: '2019年11月23日',
						text: '活动很精彩，孩子很开心，孩子回家后考了我们一堆问题，看来他涨了不少知识。我们期待下次更加精彩的活动！',
						num1: '12345',
						num2: '37'
					}
				]
			};
		},
		methods: {
			//跳转到报名界面
			applicationBtn() {
				uni.navigateTo({
					url: `../applicationOrder/applicationOrder?activity_id=${this.activity_id}&shop_id=${this.shop_id}`
				});
			},
			// 计算活动时间差的方法
			// difftime(s, e) {
			// 	// 计算开始结束时间差 导出时间
			// 	var date3 = new Date(e).getTime() - new Date(s).getTime(); //时间差的毫秒数
			// 	//计算出相差天数
			// 	var days = Math.floor(date3 / (24 * 3600 * 1000));
			// 	console.log(days)
			// 	return {
			// 		days: days,
			// 	};
			// },
			difftime(s, e) {
				// 计算开始结束时间差 导出时间
				var date3 = new Date(e).getTime() - new Date(s).getTime(); //时间差的毫秒数
				console.log(date3)
				//计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000));
				console.log(days)
				//计算出小时数
				var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000));
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000));
				//计算相差秒数
				var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000);
				return {
					days: days,
					hours: hours,
					minutes: minutes,
					seconds: seconds
				};
			},
			//返回上一个界面，即亲子活动界面
			backBtn() {
				// uni.navigateBack({
				// 	delta: 1
				// });
				if (this.pageType == 0) {
					uni.switchTab({
						url: '../../pages/other/home/home'
					});
				}
				if (this.pageType == 1) {
					uni.redirectTo({
						url: '../activity/activity'
					});
				}
			},
			// 点击小箭头事件
			titleImgBtn() {
				if (this.ti2Show == true) {
					this.ti2Show = false;
					this.titleImage = '../static/images/details/up.png';
				} else {
					this.ti2Show = true;
					this.titleImage = '../static/images/details/down.png';
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.details {
		.banner {
			width: 100%;
			height: 760rpx;
			position: relative;

			// 返回按钮
			.navImg {
				width: 46rpx;
				height: 46rpx;
				margin: 22rpx 0 20rpx 0;
				position: absolute;
				top: 30rpx;
				left: 32rpx;
			}
		}

		.title {
			font-size: 13px;
			margin: 64rpx 0 50rpx 0;
			line-height: 20px;

			.ti1 {
				font-size: 18px;
				margin-bottom: 14rpx;
				font-weight: bold;
			}

			.ti2 {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
				-webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
				-webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
			}

			.titleI {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;

				.titleImg {
					width: 32rpx;
					height: 32rpx;
					// background:#333333;
				}
			}
		}

		.text1 {
			margin: 50rpx 0 4rpx 0;
			font-size: 16px;
			font-weight: bold;
		}

		.label {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;

			.lab {
				width: 210rpx;
				height: 76rpx;
				line-height: 76rpx;
				text-align: center;
				margin-top: 28rpx;
				font-size: 13px;
				border-radius: 4px;
				background: rgba(243, 243, 243, 1);
			}
		}

		.text2 {
			font-size: 16px;
			margin: 56rpx 0 36rpx 0;
			font-weight: bold;
		}

		.content {
			padding: 32rpx;
			background: white;
			margin-bottom: 20rpx;
			border-radius: 6px;
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

			.top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				font-size: 10px;

				.left {
					display: flex;
					flex-direction: row;

					.leftImg {
						width: 76rpx;
						height: 76rpx;
						margin-right: 32rpx;
					}

					.leftText {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						font-size: 13px;

						.tx1 {
							font-size: 15px;
							font-weight: bold;
						}
					}
				}
			}

			.con {
				margin: 40rpx 0;
				line-height: 16px;
				font-size: 12px;
			}

			.bottom {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 10px;

				.boRight {
					display: flex;
					flex-direction: row;
					align-items: center;

					.boImg {
						width: 24rpx;
						height: 24rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		.button {
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.btnn {
			background: #999999;
		}
	}
</style>
