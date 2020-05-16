<template>
	<view class="personalCenter">
		<!-- 1.头部样式 -->
		<view class="bg">
			<image class="image" src="../static/images/personalCenter/design02-bg.png"></image>
			<view class="top">
				<view class="topImg">
					<image class="image" :src="avatar" @click="headBtn" mode="aspectFill"></image>
				</view>
				<view>{{shop_name}}</view>
			</view>
		</view>

		<!-- 2.内容样式 -->
		<view class="con mag20">
			<view class="con1">
				<view @click="myMoneyBtn">
					<view>
						<image class="conImg" src="../static/images/personalCenter/d1@2x.png"></image>
					</view>
					<view>我的钱包</view>
				</view>
			</view>
			<view class="con2">
				<view @click="con2Btn">
					<view>
						<image class="conImg" src="../static/images/personalCenter/d2@2x.png"></image>
					</view>
					<view>消息中心</view>
				</view>
				<view>
					<view>
						<image class="conImg" src="../static/images/personalCenter/d3@2x.png"></image>
					</view>
					<view>意见</view>
				</view>
			</view>
			<view class="con3">
				<view>
					<view>
						<image class="conImg" src="../static/images/personalCenter/d4@2x.png"></image>
					</view>
					<view>常见问题</view>
				</view>
				<view @click="setUpJump">
					<view>
						<image class="conImg" src="../static/images/personalCenter/d5@2x.png"></image>
					</view>
					<view>设置</view>
				</view>
				<view>
					<view>
						<image class="conImg" src="../static/images/personalCenter/d6@2x.png"></image>
					</view>
					<view>通用</view>
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
	const $upload = require('@/components/util/upload.js');
	export default {
		onLoad() {
			// 调用该商家信息接口
			this.http.post("/business/getBusinessInfo", {
				phone: this.$store.state.$business.phone
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						this.avatar = resolve.data.data.avatar
					}
				}
			})
		},
		data() {
			return {
				image1: "../static/images/aaaa2.png",
				image2: "../static/images/b3.png",
				image3: "../static/images/b4.png",
				shop_name: this.$store.state.$shop.shop_name,
				avatar: this.$store.state.$business.avatar,
				//跳转到我的钱包页面
				myMoneyBtn() {
					uni.navigateTo({
						url: '../myMoney/myMoney',
					});
				}
			}
		},
		methods: {
			// 点击头像后，调用修改商家头像接口
			headBtn() {
				uni.chooseImage({
					// 调用选择图片的方法
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// sessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址
						// this.tmp = // 储存图片临时地址
						let path = tempFilePaths[0]; //  获取刚刚存的图片临时地址
						let data = {
							// 添加上传头像需要传入的参数
							phone: this.$store.state.$business.phone
						}
						// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,成功返回的数据，失败返回的数据)
						$upload.upload(this.baseURL + '/business/uploadAvatar', path, data, res => {
							if (res.code == "ok") {
								// 调用商家信息接口,及时更新修改数据
								this.http.post("/business/getBusinessInfo", {
									phone: this.$store.state.$business.phone
								}).then((resolve) => {
									if (resolve.statusCode == 200) {
										if (resolve.data.code == "ok") {
											let data = resolve.data.data;
											this.avatar = resolve.data.data.avatar;
										}
									}
								})
								// ①调用商家信息的接口
								this.http.post('/business/getBusinessInfo', {
									phone: this.$store.state.$business.phone
								}).then(res => {
									if (res.data.code == "ok") {
										this.business_id = res.data.data.business_id;
										let obj = {
											business_id: res.data.data.business_id,
											phone: res.data.data.phone,
											pwd: res.data.data.pwd,
											nick: res.data.data.nick,
											sex: res.data.data.sex,
											birthday: res.data.data.birthday,
											state: res.data.data.state,
											avatar: res.data.data.avatar,
										};
										this.$store.commit('setBusiness', obj);
									}
								})
							}

						});
					}
				});
			},
			// 点击设置后进行页面跳转
			setUpJump() {
				uni.navigateTo({
					url: '../setUp/setUp'
				})
			},
			con2Btn(){
				uni.navigateTo({
					url: '../news/news'
				})
				// uni.navigateTo({
				// 	url: '../../parenting/news/news'
				// })
			}

		},
		// 组件挂载
		components: {
			tab
		}
	}
</script>

<style lang="less" scoped>
	.personalCenter {
		padding-bottom: 160rpx;

		// 1.头部样式
		.bg {
			font-size: 16px;
			background: #B3B3B3;
			height: 622rpx;

			.top {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 310rpx;
				// bottom:300rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: white;

				.topImg {
					width: 120rpx;
					height: 120rpx;
					margin-bottom: 32rpx;

					>image {
						border-radius: 50%;
					}
				}
			}

		}

		// 2.内容样式
		.con {
			>view {
				// padding: 32rpx 40rpx;
				margin-top: 20rpx;
				font-size: 16px;
				box-shadow: 0px 3px 12px rgba(138, 138, 138, 0.16);
				border-radius: 6px;
				padding: 0 36rpx;

				>view {
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 32rpx 0 32rpx 0;
					border-bottom: rgba(246, 246, 246, 0.8) 1px solid;

					.conImg {
						width: 44rpx;
						height: 44rpx;
						margin-right: 32rpx;
						// transform: scale(2);
					}
				}

				& view:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
