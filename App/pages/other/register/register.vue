<template>
	<view class="register pad20">
		<view class="static"></view>
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{bagDisplay:bagShow}"></view>
		<!-- 1.头部图片 -->
		<view class="top">
			<image :src="url"></image>
		</view>

		<!-- 2.注册部分 -->
		<view class="center">
			<input type="text" :placeholder="phoneText" v-model="phone" @input="phoneInput" />
			<input type="text" class="input2" placeholder="请输入验证码" v-if="textStatic" v-model="code">
			<input type="password" class="input3" placeholder="请输入密码" v-model="password" @input="passwordInputt">
			<!-- <input type="number" placeholder="请输入账号" v-model="password" @input="passwordInput"/> -->
			<view class="btn" @click="obtainBtn" v-if="textStatic">
				<view>{{obtain}}</view>
			</view>
			<view class="reg">
				<button class="button" @click="registerBtn" :class="{'blue':blueStatic,'pink':pinkStatic}">{{text}}</button>
				<view class="btnSon">
					<view class="btnSon1" @click="loginJump">登录</view>
					<view class="btnSon2" @click="mail">{{mailText}}注册</view>
				</view>
			</view>
		</view>

		<!-- 提示框 -->
		<view class="tips" v-if="tipsShow">
			<view class="tipsImg">
				<image class="image" :src="tipsImg"></image>
			</view>
			<view class="text1">{{data1}}</view>
			<view class="text2">{{data}}</view>
			<button class="goBtn" @click="tipsBtn">前往登录</button>
		</view>
		<!-- 手机号码有误提示框 -->
		<view class="error" v-if="errorShow">
			<view class="errorTop">{{phoneError}}</view>
			<view class="errorCenter">{{phoneTips}}</view>
			<view class="errorBtn" @click="errorTrue">{{phoneTrue}}</view>
		</view>
		<!-- 输入框内容空的提示框 -->
		<!-- <emptyTips :text="emptyText" :emptyTipsShow="emptyTipsShow"></emptyTips> -->
		<view class="emptyTips" v-if="emptyTipsShow">
			<view>
				<view class="emptyImg">
					<image class="image" :src="emptyImg"></image>
				</view>
				<view class="bigEmptyImg" @click="bigEmptyImgBtn">
					<image class="image" src="../../../static/images/back@2x.png"></image>
				</view>
				<view class="title">Attention</view>
				<view class="text">{{emptyText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import emptyTips from "../../../components/emptyTips.vue"
	export default {
		// 接收上个页面传进来的参数
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.identityState = this.$store.state.$identity.i
			if (this.$store.state.$identity.i == 1) {
				this.registerShow = true;
				this.url = "../../../static/images/login/logo.png"
				this.emptyImg = "../../../static/images/bg7.png"
			};
			if (this.$store.state.$identity.i == 2) {
				this.registerShow = false;
				this.text = "下一步";
				this.url = "../../../static/images/login/shangjia-logo.png"
				this.emptyImg = "../../../static/images/bg6.png"
			};

		},
		data() {
			return {
				emptyTipsShow: false,
				emptyText: "",
				emptyImg: "",
				url: "",
				obtain: "获取验证码",
				registerShow: true,
				static: "",
				phone: '',
				password: '',
				tipsShow: false,
				bagShow: false,
				text: "注册",
				blueStetic: false,
				data: "",
				errorShow: false, //手机号码错误提示框
				phoneError: "",
				phoneTips: "",
				phoneTrue: "",
				business_id: "",
				blueState: false,
				data1: "哦噢~",
				tipsImg: "../../../business/static/images/design-bg.png",
				phoneState: 0,
				passwordState: 0,
				blueStatic: false,
				pinkStatic: false,
				textStatic: false,
				identityState: "",
				mailText: "邮箱",
				phoneText: "请输入手机号",
				mailCode: "",
				code: "",
			}
		},
		methods: {
			phoneInput(event) {
				if (event.target.value == "") {
					this.phoneState = 0
					this.pinkStatic = false
					this.blueStatic = false
				} else {
					this.phoneState = 1;
					if (this.passwordState == 1) {
						if (this.identityState == 1) {
							this.pinkStatic = true
						} else {
							this.blueStatic = true
						}
					} else {
						this.pinkStatic = false
						this.blueStatic = false
					}
				}
			},
			passwordInputt(event) {
				if (event.target.value == "") {
					this.passwordState = 0
					this.pinkStatic = false
					this.blueStatic = false
				} else {
					this.passwordState = 1;
					if (this.phoneState == 1) {
						if (this.identityState == 1) {
							this.pinkStatic = true
						} else {
							this.blueStatic = true
						}
					} else {
						this.pinkStatic = false
						this.blueStatic = false
					}
				}

			},
			// 点击邮箱注册
			mail() {
				if (this.textStatic == true) {
					this.textStatic = false;
					this.mailText = "邮箱";
					this.phoneText = "请输入手机号"
				} else if (this.textStatic == false) {
					this.textStatic = true;
					this.mailText = "手机";
					this.phoneText = "请输入邮箱号"
				}
			},
			loginJump() {
				uni.navigateTo({
					url: "../login/login?id=${this.static}"
				})
			},
			// 获取验码事件
			obtainBtn() {
				var staticIng = "error";
				if (this.phone == "") {
					this.emptyTipsShow = true;
					this.bagShow = true;
					this.emptyText = "邮箱号不能为空"
				} else if (!(/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(this.phone))) {
					this.phoneError = "邮箱号错误";
					this.phoneTips = "你输入的是一个无效的邮箱号";
					this.phoneTrue = "确认";
					this.bagShow = true;
					this.errorShow = true;
				} else {
					if (this.$store.state.$identity.i == 1) {
						this.http.post("/user/getUserInfo", {
							phone: this.phone
						}).then(res => {
							let data = res.data;
							if (data.code == "ok") {
								this.data = "该邮箱已注册";
								this.tipsShow = true;
								this.bagShow = true;
								this.pinkStatic = false;
								this.blueStatic = false;
							}
							if (data.code == "error") {
								this.http.post("/verify/sendMailCode", {
									mail: this.phone
								}).then(res => {
									let data = res.data;
									if (data.code == "ok") {
										this.mailCode = data.data.mailCode
									}
									if (data.code == "error") {

									}
								})
								// 倒计时
								var This = this;
								var t = 59;
								var timer;
								clearInterval(timer);
								timer = setInterval(function() {
									This.obtain = (t--) + "秒重发";
									if (t == 0) {
										This.obtain = "获取验证码";
										clearInterval(timer);
									}
								}, 1000)
							}
						})
					} else {
						this.http.post("/business/getBusinessInfo", {
							phone: this.phone
						}).then(res => {
							let data = res.data;
							if (data.code == "ok") {
								this.data = "该邮箱已注册";
								this.tipsShow = true;
								this.bagShow = true;
								this.pinkStatic = false;
								this.blueStatic = false;
							}
							if (data.code == "error") {
								this.http.post("/verify/sendMailCode", {
									mail: this.phone
								}).then(res => {
									let data = res.data;
									if (data.code == "ok") {
										this.mailCode = data.data.mailCode
									}
									if (data.code == "error") {

									}
								})
								// 倒计时
								var This = this;
								var t = 59;
								var timer;
								clearInterval(timer);
								timer = setInterval(function() {
									This.obtain = (t--) + "秒重发";
									if (t == 0) {
										This.obtain = "获取验证码";
										clearInterval(timer);
									}
								}, 1000)

							}
						})
					}
				}
			},
			//点击注册按钮
			registerBtn() {
				if (this.phone == "") {
					this.emptyTipsShow = true;
					this.bagShow = true;
					this.emptyText = "手机号码不能为空"
				} else if (this.password == "") {
					this.emptyTipsShow = true;
					this.bagShow = true;
					this.emptyText = "密码不能为空"
					// 如果手机号码有误
				} else {
					// 手机注册
					if (this.textStatic == false) {
						if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
							this.phoneError = "手机号码错误";
							this.phoneTips = "你输入的是一个无效的手机号码";
							this.phoneTrue = "确认";
							this.bagShow = true;
							this.errorShow = true;
						} else {
							//如果是亲子用户，则跳转到亲子登录界面
							if (this.$store.state.$identity.i == 1) {

								// 请求注册的接口
								this.http.post("/user/register", {
									phone: this.phone,
									password: this.password
								}).then(res => {
									let data = res.data;
									if (data.code == "ok") {
										uni.navigateTo({
											url: `../login/login?id=${this.static}`
										});
									}
									if (data.code == "error") {
										this.data = data.data;
										this.tipsShow = true;
										this.bagShow = true;
										this.pinkStatic = false;
										this.blueStatic = false;
									}
								})
							};
							//如果是商家用户，则跳转到商家注册第一步认证界面
							if (this.$store.state.$identity.i == 2) {
								this.http.post("/business/register", {
									phone: this.phone,
									password: this.password
								}).then((res => {
									let data = res.data;
									if (data.code == "ok") {
										// ①调用商家信息的接口
										this.http.post('/business/getBusinessInfo', {
											phone: this.phone
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
												// ①调用商家店铺信息的接口
												this.http.post('/shop/getShopInfo', {
													business_id: this.business_id
												}).then(res => {
													if (res.data.code == "ok") {
														let obj = {
															shop_id: res.data.data[0].shop_id,
															shop_name: res.data.data[0].shop_name,
															address: res.data.data[0].shop_name,
														};
														this.$store.commit('setShop', obj);
														// ②进行跳转至首页
														uni.navigateTo({
															url: `../../../business/examination/examination`
														});
													}
												})
											}
										})

									}
									if (data.code == "error") {
										this.data = data.data;
										this.phoneError = "";
										this.phoneTips = data.data;
										this.phoneTrue = "前往登录";
										this.bagShow = true;
										this.errorShow = true;
										this.pinkStatic = false;
										this.blueStatic = false;
									}
								}))
							};
						}
						// 邮箱注册
					} else if (this.textStatic == true) {
						if (this.code == '') {
							this.emptyTipsShow = true;
							this.bagShow = true;
							this.emptyText = "验证码不能为空"
						} else {
							this.http.post("/verify/isVerify", {
								mail: this.phone,
								code: this.code
							}).then(res => {
								let data = res.data;
								if (data.code == "ok") {
									//如果是亲子用户，则跳转到亲子登录界面
									if (this.$store.state.$identity.i == 1) {
										// 请求注册的接口
										this.http.post("/user/register", {
											phone: this.phone,
											password: this.password
										}).then(res => {
											let data = res.data;
											if (data.code == "ok") {
												this.tipsImg = ""
												this.tipsShow = true;
												this.bagShow = true;
												this.data = "注册成功";
												this.data1 = "恭喜您"
												uni.navigateTo({
													url: `../login/login?id=${this.static}`
												});
											}
											if (data.code == "error") {
												this.data = data.data;
												this.tipsShow = true;
												this.bagShow = true;
												this.pinkStatic = false;
												this.blueStatic = false;
											}
										})
									};
									//如果是商家用户，则跳转到商家注册第一步认证界面
									if (this.$store.state.$identity.i == 2) {
										this.http.post("/business/register", {
											phone: this.phone,
											password: this.password
										}).then((res => {
											let data = res.data;
											if (data.code == "ok") {
												// ①调用商家信息的接口
												this.http.post('/business/getBusinessInfo', {
													phone: this.phone
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
														// ①调用商家店铺信息的接口
														this.http.post('/shop/getShopInfo', {
															business_id: this.business_id
														}).then(res => {
															if (res.data.code == "ok") {
																let obj = {
																	shop_id: res.data.data[0].shop_id,
																	shop_name: res.data.data[0].shop_name,
																	address: res.data.data[0].shop_name,
																};
																this.$store.commit('setShop', obj);
																// ②进行跳转至首页
																uni.navigateTo({
																	url: `../../../business/examination/examination`
																});
															}
														})
													}
												})

											}
											if (data.code == "error") {
												this.data = data.data;
												this.phoneError = "";
												this.phoneTips = data.data;
												this.phoneTrue = "前往登录";
												this.bagShow = true;
												this.errorShow = true;
												this.pinkStatic = false;
												this.blueStatic = false;
											}
										}))
									};
								}

								if (data.code == "error") {
									this.emptyTipsShow = true;
									this.bagShow = true;
									this.emptyText = "验证码有误"
								}
							})
						}
					}
				}




			},

			tipsBtn() {
				this.tipsShow = false;
				this.bagShow = false;
				// 跳转到登录界面
				uni.navigateTo({
					url: "../login/login?id=${this.static}"
				})
				this.data1 = "哦噢~";
				this.tipsImg = "../../../business/static/images/design-bg.png"
			},
			// 点击错误号码提示框中的确定按钮
			errorTrue() {
				this.errorShow = false;
				this.bagShow = false;
				if (this.phoneTips == "该手机号已注册") {
					// 跳转到登录界面
					uni.navigateTo({
						url: "../login/login?id=${this.static}"
					})
				}
				this.phoneError = "";
				this.phoneTips = "";
				this.phoneTrue = "";
			},
			// 点击输入不能为空提示框中的×时
			bigEmptyImgBtn() {
				this.emptyTipsShow = false;
				this.bagShow = false;
			},
			passwordInput() {
				// if(this.phone != "" ||this.password != ""){
				// 	if(identityState == 1){
				// 		this.btnState = ""
				// 	}else{
				// 		this.btnState = ""
				// 	}

				// }
			}
		},
		components: {
			// emptyTips

		}
	}
</script>

<style lang="less" scoped>
	.register {
		height: 100%;
		padding-top: 100rpx;
		background: white;

		// 显示灰色背景
		.bagDisplay {
			display: block;
		}

		// 1.头部图片
		.top {
			width: 100%;
			display: flex;
			justify-content: center;
			padding-top: 120rpx;

			image {
				width: 172rpx;
				height: 172rpx;
				border-radius: 5px;
			}
		}

		// 2.登录部分
		.center {
			margin: 108rpx 0 92rpx 0;
			position: relative;

			// 2.1用户输入数据部分
			input {
				width: 100%;
				height: 80rpx;
				background: white;
				padding: 10rpx 32rpx;
				box-sizing: border-box;
				box-shadow: 0px 3px 6px rgba(46, 46, 46, 0.07);
				border-radius: 20px;

				&::-webkit-input-placeholder {
					color: #007AFF;
				}
			}

			.input2 {
				margin-top: 30rpx;
				padding-right: 150rpx;
				box-sizing: border-box;
			}

			.input3 {
				margin-top: 30rpx;
			}

			.button {
				background: #e2e0e3;
			}

			// 登录按钮
			.btn {
				font-size: 8px;
				padding: 13rpx 5rpx;
				width: 130rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 20rpx;
				top: 127rpx;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(197, 197, 197, 0.7);
				border-radius: 10px;
				color: rgba(197, 197, 197, 1);
				letter-spacing: 0.2px;
			}

			// 2.2登录按键及按钮部分
			.reg {
				margin: 84rpx 0 24rpx 0;
			}

			// 注册按钮为蓝色
			.blue {
				background: #8cbdeb;
			}

			.pink {
				background: #fc9898;
			}

			.btnSon {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 24rpx;
				font-size: 14px;
				color: #999999;
			}
		}

		// 提示框
		.tips {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 13px;
			background: white;
			border-radius: 6px;
			width: 572rpx;
			height: 640rpx;
			border-radius: 6px;
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			z-index: 15;

			.tipsImg {
				width: 572rpx;
				height: 388rpx;
				background: #fc9898;
			}

			.tipsImg1 {
				width: 0upx;
				height: 0upx;
			}

			.text1 {
				margin: 30rpx 0;
			}

			.goBtn {
				width: 236rpx;
				height: 62rpx;
				margin: 30rpx 0 48rpx 0;
				border-radius: 16px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #fc9898;
				color: white;
				font-size: 16px;
			}
		}

		// 手机号码有误的提示框
		.error {
			width: 540rpx;
			background: white;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: #333333;
			text-align: center;
			padding-top: 40rpx;
			border-radius: 6px;
			z-index: 15;

			.errorTop {
				font-size: 17px;
			}

			.errorCenter {
				padding: 30rpx 0 42rpx 0;
				font-size: 12px;
				border-bottom: 1px solid rgba(140, 189, 235, 0.13);
			}

			.errorBtn {
				color: #8CBDEB;
				font-size: 16px;
				padding: 22rpx 0;
			}
		}

		// 输入框内容空的提示框
		.emptyTips {
			// margin: 0 30rpx;
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
				// background: #4CD964;
			}
		}
	}
</style>
