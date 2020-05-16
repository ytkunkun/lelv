<template>
	<view class="chat" ref="test">
		<view class="static"></view>
		<view class="top">
			<!-- #ifndef MP-WEIXIN -->
			<view>
				<view class="img">
					<image class="bigImg" src="../../../static/images/return1.png" mode="" @click="backBtn"></image>
				</view>
			</view>

			<view>{{ name }}</view>
			<view>
				<view class="img"><image class="bigImg" src="../../../static/images/chat2.png"></image></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view>
				<view class="img">
					<image class="bigImg" src="../../../static/images/return1.png" @click="backBtn"></image></view>
			</view>
			<view>{{ name }}</view>
			<!-- #endif -->
		</view>
		<view class="aaa"></view>
		<view class="change">
			<view class="content">
				<view class="left" v-for="(item, index) in conList" :key="index" :class="{ right: item.type == 0 }">
					<view class="img"><img :src="item.sender_avatar" alt="" /></view>
					<view class="text1">
						<view>
							<text selectable="true">{{ item.content }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<input type="text" placeholder="请输入文字" v-model="content" />
				<view @click="send">
					<view class="img bottomImg"><image src="../../../static/images/chat3.png" mode=""></image></view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onPageScroll(e) {},
		onLoad(res) {

			this.name = res.name;
			this.id = res.id;
			// 调用聊天记录的接口
			this.http
				.post('/chat/getUserAndBusinessRecord', {
					user_id: this.$store.state.$parenting.user_id,
					business_id: this.id
				})
				.then(res => {
					// 状态为ok
					if (res.data.code == 'ok') {
						//商家发送给用户的消息
						for (let i = 0; i < res.data.data.ascending.length; i++) {
							if (res.data.data.ascending[i].type == 3) {
								res.data.data.ascending[i].type = 1;
							} else {
								res.data.data.ascending[i].type = 0;
							}
						}
						this.conList = res.data.data.ascending;
					}
				});
			this.timer = setInterval(() => {
				this.http.post('/chat/getUserAndBusinessRecord', {
					user_id: this.$store.state.$parenting.user_id,
					business_id: this.id
				}).then(res => {
					// 状态为ok
					if (res.data.code == 'ok') {
						//商家发送给用户的消息
						for (let i = 0; i < res.data.data.ascending.length; i++) {
							if (res.data.data.ascending[i].type == 3) {
								res.data.data.ascending[i].type = 1
							} else {
								res.data.data.ascending[i].type = 0
							}
						}
						this.conList = res.data.data.ascending;
					}
				})
			}, 5000);
		},
		data() {
			return {
				conList: [],
				name: '',
				id: '',
				content: '',
				timer: '',
				nowHeight: '',
				lastHeight: ''
			};
		},
		methods: {
			send() {
				// 软键盘收起
				uni.hideKeyboard();
				// 调用发送消息的接口
				this.http
					.post('/chat/sendMessage', {
						sender_id: this.$store.state.$parenting.user_id,
						receive_id: this.id,
						// sender_id: 2,
						// receive_id:2,
						content: this.content,
						type: 2
					})
					.then(res => {
						// 状态为ok
						if (res.data.code == 'ok') {
							this.content = '';
							// 调用聊天记录的接口
							this.http
								.post('/chat/getUserAndBusinessRecord', {
									user_id: this.$store.state.$parenting.user_id,
									business_id: this.id

								})
								.then(res => {
									// 状态为ok
									if (res.data.code == 'ok') {
										//商家发送给用户的消息
										for (let i = 0; i < res.data.data.ascending.length; i++) {
											if (res.data.data.ascending[i].type == 3) {
												res.data.data.ascending[i].type = 1;
											} else {
												res.data.data.ascending[i].type = 0;
											}
										}
										this.conList = res.data.data.ascending;
									}
								});
						}
					});
			},
			// 点击返回按钮
			backBtn() {
				clearTimeout(this.timer);
				uni.navigateBack({
					delta: 1
				});
			}
		}
	};
</script>

<style lang="less">
	@topHeight: 88rpx;

	page {
		background: #f7f4f8;
		overflow: hidden;
	}

	body {
		overflow: hidden;
	}

	.chat {
		background: #f7f4f8;

		.aaa {
			height: var(--status-bar-height);
			background: #f7f4f8;
		}

		.top {
			position: fixed;
			top: var(--status-bar-height);
			width: 100%;
			height: 88rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background: white;
			padding: 0 32rpx;
			box-sizing: border-box;
			z-index: 12;

			.bigImg {
				width: 46rpx;
				height: 46rpx;
				background: white;
			}
		}

		/* #ifdef MP-WEIXIN */
		.top {
			justify-content: flex-start;

			.bigImg {
				margin-right: 32rpx;
			}
		}

		/* #endif */

		.content {
			// height: 1050rpx;
			overflow: auto;
			padding: 20rpx 44rpx 150rpx 44rpx;
			// margin: 20rpx 0 150rpx 0;
			box-sizing: border-box;
			font-size: 14px;
			color: #666666;
			background: #f7f4f8;
			line-height: 21px;
			width: 100%;
			margin-top: 88rpx;

			// height: 100vh;
			.left {
				display: flex;
				flex-direction: row;
				margin-bottom: 55rpx;
				align-items: flex-end;

				.img {
					margin-right: 24rpx;

					img {
						width: 76rpx;
						height: 76rpx;
						border-radius: 50%;
						display: table-cell;
						vertical-align: bottom;
					}
				}

				.text1 {
					width: 422rpx;

					>view {
						background-color: white;
						padding: 22rpx 28rpx;
						box-shadow: 0px 3px 6px rgba(97, 97, 97, 0.16);
						opacity: 1;
						border-radius: 18px 18px 18px 0px;
						width: fit-content;
						word-break: break-all;
					}
				}
			}

			.right {
				flex-direction: row-reverse;

				.img {
					margin-left: 24rpx;
					margin-right: 0;
				}

				.text1 {
					display: flex;
					justify-content: flex-end;

					>view {
						border-radius: 18px 18px 0px 18px;
					}
				}
			}
		}

		.bottom {
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			background: #f7f4f8;
			padding: 20rpx 32rpx 40rpx 32rpx;
			box-sizing: border-box;

			input {
				height: 112rpx;
				background: white;
				border-radius: 28px;
				padding: 35rpx;
				padding-right: 112rpx;
				box-sizing: border-box;
			}

			>view {
				position: fixed;
				bottom: 62rpx;
				right: 50rpx;
				width: 72rpx;
				height: 72rpx;
				background: #e2e0e3;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.bottomImg {
					image {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}
		}
	}
</style>
