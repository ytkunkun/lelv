<template>
	<view class="news">
		<view class="static"></view>
		<view class="fixed">
			<view class="top">消息</view>
			<!-- 头部标题栏 -->
			<view class="title">
				<view class="text" v-for="(item, index) in textList" :key="index" @click="textBtn(index)" :class="{ textSelectionPink: index == textSelectionStatePink }">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="pad20 change">
			
			<!-- 通知 -->
			<view class="content1" v-if="content0Show">
				<view class="noDataTips" v-if="tipsState1">暂无记录</view>
				<view class="content11" v-for="(item, index) in conList0" :key="index">
					<view class="conFirst">
						<image class="image" :src="item.sender_avatar"></image>
					</view>
					<view class="conSecond">
						<view class="conS1">
							<view class="conS11">{{ item.sender_nick }}</view>
							<view class="conS12">{{ item.sender_time }}</view>
						</view>
						<view class="conS2">
							<view class="conS21">{{ item.content }}</view>
							<view class="conS22">1</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 私信-->
			<view class="content1" v-if="content1Show">
				<view class="noDataTips" v-if="tipsState2">暂无记录</view>
				<view class="content11" v-for="(item, index) in conList1" :key="index" @click="chatBtn(item.receive_nick, item.receive_id)">
					<view class="conFirst">
						<image class="image" :src="item.receive_avatar"></image>
					</view>
					<view class="conSecond">
						<view class="conS1">
							<view class="conS11">{{ item.receive_nick }}</view>
							<view class="conS12">{{ item.last_time }}</view>
						</view>
						<view class="conS2">
							<view class="conS21">{{ item.content }}</view>
							<view class="conS22">1</view>
						</view>
					</view>
				</view>
			</view>
			<view class="content2" v-if="content2Show">
				<view class="left">
					<view class="leftLi" v-for="(item, index) in leftList" :key="index">
						<view class="top">{{ item.top }}</view>
						<view class="leftCon">
							<view class="conLi" v-for="(itemI, indexI) in item.con" :key="indexI">
								<view class="conImg">
									<image class="image" :src="itemI.img" mode=""></image>
								</view>
								<view>{{ itemI.text }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<view :class="{ rightSelect: index == rightSelsctState }" v-for="(item, index) in rightList" :key="index" @click="rightSelsct(index)">{{ item }}</view>
				</view>
				<!-- <image src="../../static/images/head/Head1.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		filters: {
			fomatTime: function(valueTime) {
				// 时间过滤器
				if (valueTime) {
					var newData = Date.parse(new Date());
					var diffTime = Math.abs(newData - valueTime);
					if (diffTime > 7 * 24 * 3600 * 1000) {
						var date = new Date(valueTime);
						var y = date.getFullYear();
						var m = date.getMonth() + 1;
						m = m < 10 ? '0' + m : m;
						var d = date.getDate();
						d = d < 10 ? '0' + d : d;
						var h = date.getHours();
						h = h < 10 ? '0' + h : h;
						var minute = date.getMinutes();
						var second = date.getSeconds();
						minute = minute < 10 ? '1' + minute : minute;
						second = second < 10 ? '0' + second : second;
						return m + '-' + d + ' ' + h + ':' + minute;
					} else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
						// //注释("一周之内");

						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
						return dayNum + '天前';
					} else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
						// //注释("一天之内");
						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
						return dayNum + '小时前';
					} else if (diffTime < 3600 * 1000 && diffTime > 0) {
						// //注释("一小时之内");
						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (60 * 1000));
						return dayNum + '分钟前';
					}
				}
			}
		},
		onShow: function(option) {

			if (this.content0Show == true) {
				this.http.post('/notice/getAllNotice').then(res => {
					if (res.data.code == 'ok') {
						let data = res.data.data;
						for (let i = 0; i < data.length; i++) {
							let a = data[i].sender_time;
							data[i].sender_time = a.substring(0, 10);
						}
						this.conList0 = data;
						if (data.length == 0) {
							this.tipsState1 = true;
						}
					}
				});
			} else if (this.content1Show == true) {}
			// 获取用户的聊天记录对象
			this.http
				.post('/chat/getBusinessChatObj', {
					business_id: this.$store.state.$business.business_id
				})
				.then(res => {
					if (res.data.code == 'ok') {
						let data = res.data.data;
						data.forEach(e => {
							let t = e.last_time.replace("-", "/").replace("-", "/");
							e.last_time = this.ft(new Date(t).getTime())
						})
						this.conList1 = data;
						if (data.length == 0) {
							this.tipsState2 = true;
						}
					}
				});
		},
		data() {
			return {
				textList: ['通知', '私信', '好友'],
				rightSelsctState: 0,
				content1Show: false,
				content2Show: false,
				content0Show: true,
				textSelectionStatePink: 0,
				conList0: [],
				conList1: [],
				tipsState1: false,
				tipsState2: false,
				leftList: [{
						top: 'A',
						con: [{
								img: '../../static/images/head/Head1.png',
								text: '阿青'
							},
							{
								img: '../../static/images/head/Head2.png',
								text: '阿丽'
							},
							{
								img: '../../static/images/head/Head3.png',
								text: '阿琨'
							}
						]
					},
					{
						top: 'B',
						con: [{
							img: '../../static/images/head/Head4.png',
							text: '毕诔'
						}]
					},
					{
						top: 'C',
						con: [{
								img: '../../static/images/head/Head5.png',
								text: '陈坤'
							},
							{
								img: '../../static/images/head/Head6.png',
								text: '陈铭'
							},
							{
								img: '../../static/images/head/Head7.png',
								text: '策琳'
							}
						]
					},
					{
						top: 'D',
						con: [{
								img: '../../static/images/head/Head8.png',
								text: '弟弟'
							},
							{
								img: '../../static/images/head/Head3.png',
								text: '邓佳'
							},
							{
								img: '../../static/images/head/Head1.png',
								text: '丁丁'
							}
						]
					}
				],
				rightList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
					'V', 'W', 'X', 'Y', 'Z'
				]
			};
		},
		methods: {
			ft: function(valueTime) {
				// 时间过滤器
				if (valueTime) {
					var newData = Date.parse(new Date());
					var diffTime = Math.abs(newData - valueTime);
					if (diffTime > 7 * 24 * 3600 * 1000) {
						var date = new Date(valueTime);
						var y = date.getFullYear();
						var m = date.getMonth() + 1;
						m = m < 10 ? '0' + m : m;
						var d = date.getDate();
						d = d < 10 ? '0' + d : d;
						var h = date.getHours();
						h = h < 10 ? '0' + h : h;
						var minute = date.getMinutes();
						var second = date.getSeconds();
						minute = minute < 10 ? '1' + minute : minute;
						second = second < 10 ? '0' + second : second;
						return m + '-' + d + ' ' + h + ':' + minute;
					} else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
						// //注释("一周之内");

						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
						return dayNum + '天前';
					} else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
						// //注释("一天之内");
						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
						return dayNum + '小时前';
					} else if (diffTime < 3600 * 1000 && diffTime > 0) {
						// //注释("一小时之内");
						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (60 * 1000));
						return dayNum + '分钟前';
					}
				}
			},
			textBtn(i) {
				this.textSelectionStatePink = i;
				if (i == 0) {
					this.content0Show = true;
					this.content2Show = false;
					this.content1Show = false;
				} else if (i == 1) {
					this.content0Show = false;
					this.content2Show = false;
					this.content1Show = true;
				} else {
					this.content0Show = false;
					this.content2Show = true;
					this.content1Show = false;
				}
			},
			rightSelsct(i) {
				this.rightSelsctState = i;
			},
			chatBtn(name, id) {
				uni.navigateTo({
					url: `../chat/chat?name=${name}&id=${id}`
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.news {

		//固定住的内容样式
		.fixed {
			position: fixed;
			top: var(--status-bar-height);
			width: 100vw;
			z-index: 12;
			background: white;
		}

		.top {
			font-size: 20px;
			padding: 16rpx 32rpx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		// 1.头部标题栏
		.title {
			font-size: 14px;
			display: flex;
			flex-direction: row;
			align-items: baseline;
			margin: 10rpx 0 25rpx 32rpx;

			>view {
				margin: 0 15rpx;
			}

			// 1.1选中的文字样式
			.textSelectionPink {
				// margin: 0 30rpx;
				border-radius: 15px;
				padding: 13rpx 17rpx;
				background: #8cbdeb;
				color: white;
			}
		}

		.change {
			margin-top: 220rpx;
		}

		// 2.消息栏样式
		.content11 {
			display: flex;
			flex-direction: row;
			// padding: 8rpx;
			// margin: 30rpx 0;
			padding: 30rpx 8rpx;
			box-sizing: border-box;
			// border-bottom: 1px solid #b5b5b5;

			// 2.1图片样式
			.conFirst {
				padding-right: 24rpx;
				height: 84rpx;
				width: 84rpx;
				border-radius: 50%;

				image {
					border-radius: 50%;
				}
			}

			// 2.2文字样式
			.conSecond {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 1;
				font-size: 12px;
				color: rgba(153, 153, 153, 1);
				width: 80%;

				// width: 270rpx;
				//2.2.1中间部分的文字样式
				.conS1 {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: baseline;

					.conS11 {
						font-size: 14px;
						font-weight: bold;
						line-height: 21px;
						color: rgba(51, 51, 51, 1);
					}
				}

				//2.2.2右边部分的文字样式
				.conS2 {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: baseline;
					height: 15px;

					.conS21 {
						font-size: 12px;
						width: 90%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.conS22 {
						font-size: 9px;
						background: #ff3939;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;
						width: 30rpx;
						height: 30rpx;
						// padding: 5rpx 8rpx;
					}
				}
			}
		}

		.content2 {
			display: flex;
			flex-direction: row;
			padding: 0 20rpx;

			.left {
				width: 654rpx;

				.top {
					height: 40rpx;
					line-height: 40rpx;
					color: #696969;
					font-size: 14px;
					font-weight: normal;
					padding: 0;
					margin: 0;
				}

				.leftCon {
					font-size: 16px;
					font-weight: bold;

					.conLi {
						height: 140rpx;
						display: flex;
						flex-direction: row;
						align-items: center;

						.conImg {
							width: 84rpx;
							height: 84rpx;
							margin-right: 24rpx;

							.image {
								border-radius: 50%;
							}
						}
					}
				}
			}

			.right {
				margin-left: 5rpx;
				margin-top: 50rpx;

				>view {
					margin-bottom: 10rpx;
					color: #a5a4a7;
					border-radius: 50%;
					width: 32rpx;
					height: 32rpx;
					font-size: 12px;
					text-align: center;
					line-height: 32rpx;
				}

				.rightSelect {
					background: #8cbdeb;
					color: white;
				}
			}
		}
	}
</style>
