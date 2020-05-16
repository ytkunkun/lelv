<template>
	<view class="means">
		<view class="bg-color">
			<image class="bg" :src="avatar" mode="aspectFill"></image>
		</view>
		<view class="navImgyy" @click="backBtn">
			<image class="image" src="../../static/images/returnWhite.png"></image>
		</view>
		<!-- 2.背景图和头像 -->

		<view class="bbb">
			<view class="bb">
				<view class="bagImg" @click="headBtn">
					<image class="image head" :src="avatar" mode="aspectFill"></image>
					<view class="c">
						<image class="image" src="../static/images/means/camera.png"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 3.个人信息 -->
		<view class="from pad20">
			<view v-for="(item,index) in fromList" :key="index" @click="editBtn(item,index)">
				<view class="name">{{item.name}}</view>
				<view class="text" :class="{gay:index == 2 || index == 1}">{{item.text}}</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					出生年月
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input date">{{date}}</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 4.退出登录按钮-->
		<button class="button btn" @click="sginBtn">退出登录</button>

	</view>
</template>

<script>
	const $upload = require('@/components/util/upload.js');

	export default {

		//页面加载时触发
		onLoad() {
			// 调用用户信息接口,及时更新修改数据
			this.http.post("/user/getUserInfo", {
				phone: this.$store.state.$parenting.phone
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let data = resolve.data.data;
						this.avatar = resolve.data.data.avatar;
						this.fromList[0].text = data.nick;
						this.fromList[1].text = data.phone;
						this.fromList[2].text = data.user_id;
					}
				}
			})
		},
		data() {
			//日期选择
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate, //日期选择
				avatar: "",
				fromList: [{
						name: "昵称",
						text: ""
					},
					{
						name: "手机号码",
						text: ""
					},
					{
						name: "用户ID",
						text: ""
					},

				],
			}
		},
		computed: {
			//日期选择
			startDate() {
				return this.getDate('start');
			},
			//日期选择
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 1.点击返回按钮,返回上一个页面
			backBtn() {
				uni.switchTab({
					url: "../../pages/other/me/me"
				})
			},
			// 2.获取用户手机相册的图片
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
							phone: this.$store.state.$parenting.phone
						}
						// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,成功返回的数据，失败返回的数据)
						$upload.upload(this.baseURL + '/user/uploadAvatar', path, data, res => {
							if (res.code == "ok") {
								// ①调用用户信息的接口
								this.http.post("/user/getUserInfo", {
									phone: this.$store.state.$parenting.phone
								}).then((resolve) => {
									if (resolve.statusCode == 200) {
										if (resolve.data.code == "ok") {
											let data = resolve.data.data;
											this.avatar = resolve.data.data.avatar;
											this.fromList[0].text = data.nick;
											this.fromList[1].text = data.phone;
											this.fromList[2].text = data.user_id;
										}
									}
								})
							}

						});
					}
				});


			},
			// 3.点击列表,跳转到编辑页面
			editBtn(item, i) {
				if (i == 0) {
					uni.navigateTo({
						url: `../../pages/other/edit/edit?name=${item.name}&text=${item.text}&id=${i}&page=means&type=0`
					})
				}
			},
			//日期选择
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			//日期选择
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 点击退出登录,返回到登录界面
			sginBtn() {
				/****清楚本地缓存***/
				uni.removeStorageSync('$parenting');
				// window.localStorage.clear();
				uni.redirectTo({
					url: "../../pages/other/identity/identity?jumpStatic=1"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.means {
		height: 100vh;

		// 1.顶部背景图
		// 灰色遮罩
		.bg-color {
			// opacity: 0.6;
			// position: relative;
			background: #000;
			z-index: 13;
			height: 540rpx;

			.bg {
				width: 100%;
				height: 540rpx;
				opacity: 0.6;
				background: #DD524D;
				position: relative;
				// left: 0;
				// right: 0;
				// top: 0;
				// bottom: 0;
				// background-size: 100%;
				// z-index: -1;

			}
		}

		.navImgyy {
			width: 46rpx;
			height: 46rpx;
			position: absolute;
			top: 88rpx;
			left: 34rpx;
			z-index: 11;
		}

		// 2.背景图和头像
		.bb {
			background: #000;
			z-index: 13;
			position: relative;
			top: -160rpx;
			border-radius: 50%;
		}

		.bbb {
			display: flex;
			justify-content: center;
			align-items: flex-end;

			.bagImg {
				width: 240rpx;
				height: 240rpx;
				border-radius: 120rpx;
			}

			.head {
				opacity: 0.6;
				border-radius: 50%;
			}

			.c {
				width: 60rpx;
				height: 60rpx;
				position: relative;
				left: 0;
				right: 0;
				top: -150rpx;
				margin: auto;
			}
		}

		// 3.个人信息
		.from {
			>view {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 38rpx 32rpx;
				font-size: 13px;
				color: #333333;
			}

			.text {
				font-weight: bold;
			}

			.gay {
				color: #C0C0C0;
				font-weight: bold;
			}

			.date {
				font-size: 13px;
				color: #333333;
				font-weight: bold;
			}

			// 不可修改的列表样式
			.no {
				font-weight: normal;
			}
		}

		// 4.退出登录按钮
		.btn {
			position: fixed;
			bottom: 0;
		}

	}
</style>
