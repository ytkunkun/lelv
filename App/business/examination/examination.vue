<template>
	<view class="examination" :class="{pageHidden:hiddenShow == true}">
		<view class="static"></view>
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{bagDisplay:bagShow}"></view>
		<view class="pad20">
			<view class="static"></view>
			<!--  1.顶部导航栏 -->
			<view class="nav">
				<view class="navImg" @click="backBtn">
					<image class="image" src="../static/images/return1.png"></image>
				</view>
				<view class="title">
					商家认证
				</view>
			</view>
			<!-- 2.认证流程图 -->
			<view class="icon">
				<view class="iconTop">
					<view>
						<image class="image" src="../static/images/icon1@2x.png"></image>
					</view>
					<view class="connect">
						<image class="image" src="../static/images/Connect.png"></image>
					</view>
					<view>
						<image class="image" src="../static/images/icon2@2x.png"></image>
					</view>
					<view class="connect">
						<image class="image" src="../static/images/Connect.png"></image>
					</view>
					<view>
						<image class="image" src="../static/images/icon3@2x.png"></image>
					</view>
				</view>
				<view class="iconTxet">
					<view class="iconTxet1">提交资质</view>
					<view>选择合作方式</view>
					<view>等待审核</view>
				</view>

			</view>
			<!-- 3.商家信息 -->
			<view class="top">
				<input v-model="shop_name" type="text" placeholder="请输入商家名称" placeholder-style="color:#BEBEBE;font-weight:normal">
				<!-- <view>
					<view>{{address}}</view>
					<view class="text3">请选择</view>
				</view> -->
				<!-- 选择省市 -->
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db text3">
							商家所在具体位置
						</view>
						<view class="uni-list-cell-db name3">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input" custom-item="123">{{array[index]}}省</view>
							</picker>
						</view>

					</view>
				</view>
			</view>
			<!-- 4.身份证照片上传 -->
			<view class="content">
				<view class="title">
					<view>身份证</view>
					<view>（请上传经营者的证件信息）</view>
				</view>
				<view>
					<view>
						<view @click="upload(1)">
							<image class="image" :src="img1"></image>
							<image class="camera" :src="img2"></image>
							<view class="text1">{{text1}}</view>
						</view>
						<view>身份证正面</view>
					</view>
					<view>
						<view @click="upload(2)">
							<image class="image" :src="img3"></image>
							<image class="camera" :src="img4"></image>
							<view class="text1">{{text2}}</view>
						</view>
						<view>身份证反面</view>

					</view>
				</view>
			</view>
			<!-- 5.营业照片上传 -->
			<view class="bottom">
				<view class="title">
					<view>上传营业执照</view>
					<view>（请上传商家营业执照正面照）</view>
				</view>
				<view class="con" @click="upload(3)">
					<image class="image" :src="img5"></image>
					<image class="camera" :src="img6"></image>
					<view class="text1">{{text3}} </view>
				</view>
			</view>
		</view>

		<!-- 6.登录按钮-->
		<button class="button btn" @click="nextBtn">下一步</button>
		<!-- 输入框内容空的提示框 -->
		<view class="emptyTips" v-if="emptyTipsShow">
			<view>
				<view class="emptyImg">
					<image class="image" src="../../static/images/bg6.png"></image>
				</view>
				<view class="bigEmptyImg" @click="bigEmptyImgBtn">
					<image class="image" src="../../static/images/back@2x.png"></image>
				</view>
				<view class="title">Attention</view>
				<view class="text">{{emptyText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	const $upload = require('@/components/util/upload.js');
	export default {
		// 接收上个页面传进来的参数
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.static = option.id; //将值赋值给状态，用于跳转页面
		},
		data() {
			return {
				static: "",
				shop_name: "",
				emptyTipsShow: false,
				bagShow: false,
				hiddenShow: false,
				emptyText: "",
				array: ['河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','四川','贵州','云南','陕西','甘肃','青海'],
				index: 0,
				img1: "",
				img3: "",
				img5: "",
				img2: "../static/images/camera.png",
				img4: "../static/images/camera.png",
				img6: "../static/images/camera.png",
				text1: "",
				text2: "",
				text3: "",
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			upload(type) {
				uni.chooseImage({
					// 调用选择图片的方法
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// sessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址
						// this.tmp = // 储存图片临时地址
						let path = tempFilePaths[0]; //  获取刚刚存的图片临时地址
						let data = {
							// 添加上传头像需要传入的参数
							phone: this.$store.state.$business.phone,
							type: type
						}
						// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,成功返回的数据，失败返回的数据)
						$upload.upload(this.baseURL + '/business/uploadCertificates', path, data, res => {
							if (res.code == "ok") {
								if (type == 1) {
									// this.img1 = tempFilePaths[0];
									this.img2 = "";
									this.text1 = res.data.msg + "!"
								} else if (type == 2) {
									// this.img3 = tempFilePaths[0];
									this.img4 = "";
									this.text2 = res.data.msg + "!"
								} else {
									// this.img5 = tempFilePaths[0];
									this.img6 = "";
									this.text3 = res.data.msg + "!"
								}
							}

						});

					}
				});
			},
			//点击下一步，跳转到选择合作模式页面
			nextBtn() {

				if (this.shop_name == "") {
					this.emptyText = "商家名称不能为空"
					this.emptyTipsShow = true;
					this.bagShow = true;
					this.hiddenShow = true;
				} else if (this.text1 == "" || this.text2 == "" || this.text3 == "") {
					this.emptyText = "请上传相关证件照"
					this.emptyTipsShow = true;
					this.bagShow = true;
					this.hiddenShow = true;
				}
				else {
					// 调用修改店铺名称的接口
					this.http.post("/shop/setShopName", {
						business_id: this.$store.state.$business.business_id,
						shop_name: this.shop_name
					}).then((resolve) => {
						if (resolve.statusCode == 200) {
							if (resolve.data.code == "ok") {
								// 调用修改店铺地址的接口
								this.http.post("/shop/setShopAdress", {
									business_id: this.$store.state.$business.business_id,
									address: this.array[this.index]
								}).then((resolve) => {
									if (resolve.statusCode == 200) {
										if (resolve.data.code == "ok") {
											let obj = {
												shop_id: this.$store.state.$shop.shop_id,
												shop_name: this.shop_name,
												address: this.array[this.index]
											};
											this.$store.commit('setShop', obj);
											uni.navigateTo({
												url: `../cooperation/cooperation?id=${this.static}`
											});

										}
									}
								})

							}
						}
					})

				}


			},
			// 点击返回键,跳转到上一个页面,即商家注册页面
			backBtn() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 点击输入不能为空提示框中的×时
			bigEmptyImgBtn() {
				this.emptyTipsShow = false;
				this.bagShow = false;
				this.hiddenShow = false;
			}
		},
	}
</script>

<style lang="less" scoped>
	.examination {

		// 显示灰色背景
		.bagDisplay {
			display: block;
		}

		// 1.顶部导航栏
		.nav {
			margin-top: var(--status-bar-height);
			display: flex;
			flex-direction: row;
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			align-items: center;
			
			.navImg {
				width: 46rpx;
				height: 46rpx;
				margin-right: 230rpx;
			}
		}

		// 2.认证流程图
		.icon {
			// display: flex;
			padding: 40rpx 54rpx;
			border-radius: 12px;
			box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.07);
			border-radius: 6px;

			.iconTop {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin: 0 5rpx;

				>view {
					width: 88rpx;
					height: 88rpx;
				}

				.connect {
					width: 136rpx;
					height: 57rpx;
					background: none;
				}
			}

			.iconTxet {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 20rpx;
				font-size: 10px;

				.iconTxet1 {
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		// 3.商家信息
		.top {
			padding: 36rpx 32rpx;
			margin: 52rpx 0 80rpx 0;
			font-size: 14px;
			box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.07);

			input {
				margin-bottom: 10rpx;
				font-weight: bold;
				color: rgba(102, 102, 102, 1);
				box-sizing: border-box;
				font-size: 14px;
			}

			>view {
				>view {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					font-size: 10px;

					.text3 {
						font-weight: bold;
						color: #666666;
					}
				}


			}
		}

		// 4.身份证照片上传 
		.content {
			font-size: 12px;
			color: #666666;
			font-weight: bold;

			// 身份证标题部分样式
			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: rgba(102, 102, 102, 1);

				& view:nth-child(1) {
					font-size: 17px;
					font-weight: bold;
				}
			}

			// 身份证图片和相应文字样式
			& view:nth-child(2) {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				>view {
					display: flex;
					flex-direction: column;
					align-items: center;

					// 身份证图片盒子样式
					& view:nth-child(1) {
						width: 332rpx;
						height: 228rpx;
						background: rgba(140, 189, 235, 1);
						border-radius: 6px;
						margin: 30rpx 0 32rpx 0;
						opacity: 0.2;
						position: relative;
					}

					.camera {
						width: 68rpx;
						height: 68rpx;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
						border-radius: 50%;

					}
				}
			}
		}

		// 5.营业照片上传 
		.bottom {
			font-size: 12px;
			margin: 68rpx 0 140rpx 0;

			// 营业标题部分样式
			.title {
				display: flex;
				flex-direction: row;
				align-items: center;

				& view:nth-child(1) {
					font-size: 17px;
					font-weight: bold;
				}
			}

			.con {
				height: 302px;
				background: rgba(140, 189, 235, 1);
				width: 100%;
				border-radius: 6px;
				margin: 38rpx 0 112rpx 0;
				position: relative;
				opacity: 0.2;

				.camera {
					width: 68rpx;
					height: 68rpx;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					border-radius: 50%;
				}
			}
		}

		.btn {
			background: #8cbdeb;
		}

		// 输入框内容空的提示框
		.emptyTips {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 15;

			>view {
				position: relative;
				width: 634rpx;
				height: 262rpx;
			}

			.emptyImg {
				width: 626rpx;
				height: 262rpx;

			}

			.bigEmptyImg {
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				top: -1rpx;
				right: -6rpx;
				z-index: 13;
			}

			.title {
				color: #333333;
				font-size: 17px;
				position: absolute;
				top: 140rpx;
				left: 50%;
				transform: translateX(-50%);
			}

			.text {
				position: absolute;
				top: 205rpx;
				left: 50%;
				transform: translateX(-50%);
				font-size: 13px;
				color: #666666;
			}
		}

		.text1 {
			// width: 80%;
			width: 320rpx;
			height: 34rpx;
			text-align: center;
			// padding: 0px 20rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			color: #000000;
			z-index: 11;
			font-size: 14px;

		}
	}

	.pageHidden {
		overflow: hidden; //设置超出隐藏,若要有效果,则要设置一个高度
		height: 100vh;
	}
</style>
