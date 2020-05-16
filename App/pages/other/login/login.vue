<template>
	<view class="login pad20">
		<view class="static"></view>
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{ bagDisplay: bagShow }"></view>
		<!-- 1.头部图片 -->
		<view class="top">
			<view class="topImg"><image :src="url" class="image"></image></view>
		</view>
		<!-- 2.登录部分 -->
		<view class="center">
			<input type="text" v-model="phone" placeholder="请输入手机号或邮箱" @input="phoneInput" />
			<input type="password" v-model="password" class="input2" placeholder="请输入密码" @input="passwordInput" />

			<view class="reg">
				<button class="button" :class="{ blue: blueStatic, pink: pinkStatic }" @click="homeBtn">登录</button>
				<view class="btnSon">
					<view class="btnSon1" @click="loginBtn">注册</view>
					<view class="btnSon2">忘记密码？</view>
				</view>
			</view>
		</view>

		<!-- 3.第三方登录 -->
		<view class="bottom" v-show="registerShow">
			<view class="botTop">
				<view class="line"></view>
				<view class="title">第三方登录</view>
			</view>
			<view class="botCenter">
				<view class="botImg"><image class="image" src="../../../static/images/login/QQ@2x.png"></image></view>
				<view class="botImg"><image class="image" src="../../../static/images/login/wechat@2x.png"></image></view>
				<view class="botImg"><image class="image" src="../../../static/images/login/weibo@2x.png"></image></view>
			</view>
		</view>
		<view class="botBottom" @click="setclass">登录即代表同意《用户协议》和《隐私政策》</view>

		<!-- 亲子提示框 -->
		<!--  -->
		<view class="tips" v-if="tipsShow">
			<view class="tipsImg"><image class="image" src="../../../business/static/images/design-bg.png"></image></view>
			<view class="text1">哦噢~</view>
			<view class="text2">{{ data }}</view>
			<view class="btn">
				<button class="goBtn" @click="tipsBtn1">重新输入</button>
				<button class="goBtn goBtn2" @click="tipsBtn2" v-if="tipsStatic2">前往注册</button>
			</view>
		</view>
		<!-- 商家提示框 -->
		<view class="error" v-if="errorShow">
			<view class="errorTop">操作限制</view>
			<view class="errorCenter">{{ errorData }}</view>
			<view class="btn">
				<view class="errorBtn" @click="errorTrue1">重新输入</view>
				<view class="errorBtn" @click="errorTrue2" v-if="errorBtnStatic2">前往注册</view>
			</view>
		</view>
		<!-- 输入框内容空的提示框 -->
		<!-- <emptyTips :text="emptyText" :emptyTipsShow="emptyTipsShow"></emptyTips> -->
		<view class="emptyTips" v-if="emptyTipsShow">
			<view>
				<view class="emptyImg"><image class="image" :src="emptyImg"></image></view>
				<view class="bigEmptyImg" @click="bigEmptyImgBtn"><image class="image" src="../../../static/images/back@2x.png"></image></view>
				<view class="title">Attention</view>
				<view class="text">{{ emptyText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	// 接收上个页面传进来的参数//option为object类型，会序列化上个页面传递的参数
	onLoad: function(option) {

		this.identity = this.$store.state.$identity.i;

		if (this.$store.state.$identity.i == 1) {
			this.registerShow = true;
			this.url = '../../../static/images/login/logo.png';
			this.emptyImg = '../../../static/images/bg7.png';
		}
		if (this.$store.state.$identity.i == 2) {
			this.registerShow = false;
			this.url = '../../../static/images/login/shangjia-logo.png';
			this.emptyImg = '../../../static/images/bg6.png';
		}
	},
	data() {
		return {
			errorShow: false,
			errorData: '',
			url: '',
			obtain: '获取验证码',
			registerShow: true,
			loginShow: false,
			static: '',
			phone: '',
			password: '',
			tipsShow: false, //是否显示登录错误面板
			data: '', //登录错误的信息是啥
			blueStatic: false,
			pinkStatic: false,
			btnTextS: '前往注册',
			business_id: '',
			bagShow: false,
			emptyTipsShow: false,
			emptyImg: '',
			emptyText: '',
			phoneState: 0,
			passwordState: 0,
			btnpink: false,
			identity: '',
			tipsStatic2: false,
			errorBtnStatic2: false
		};
	},
	methods: {
		setclass() {
			return 'blue';
		},
		phoneInput(event) {
			if (event.target.value == '') {
				this.phoneState = 0;
				this.pinkStatic = false;
				this.blueStatic = false;
			} else {
				this.phoneState = 1;
				if (this.passwordState == 1) {
					if (this.identity == 1) {
						this.pinkStatic = true;
					} else {
						this.blueStatic = true;
					}
				} else {
					this.pinkStatic = false;
					this.blueStatic = false;
				}
			}
		},
		passwordInput(event) {
			if (event.target.value == '') {
				this.passwordState = 0;
				this.pinkStatic = false;
				this.blueStatic = false;
			} else {
				this.passwordState = 1;
				if (this.phoneState == 1) {
					if (this.identity == 1) {
						this.pinkStatic = true;
					} else {
						this.blueStatic = true;
					}
				} else {
					this.pinkStatic = false;
					this.blueStatic = false;
				}
			}
		},

		//点击登录按钮跳转到相应首页
		homeBtn() {
			let mailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			let phoneReg = /^1[3456789]\d{9}$/;

			if (this.phone == '') {
				this.emptyTipsShow = true;
				this.bagShow = true;
				this.emptyText = '手机号码不能为空';
			} else if (this.password == '') {
				this.emptyTipsShow = true;
				this.bagShow = true;
				this.emptyText = '密码不能为空';
			} else if (!phoneReg.test(this.phone) && !mailReg.test(this.phone)) {
				this.emptyTipsShow = true;
				this.bagShow = true;
				this.emptyText = '手机号或邮箱格式不正确';
			} else {
				//static为1，跳转到亲子的首页
				if (this.$store.state.$identity.i == 1) {
					// 调用用户登录的接口
					this.http
						.post('/user/login', {
							phone: this.phone,
							password: this.password
						})
						.then(res => {
							let data = res.data;
							if (data.code == 'ok') {
								// ①调用用户信息的接口
								this.http
									.post('/user/getUserInfo', {
										phone: this.phone
									})
									.then(res => {
										if (res.data.code == 'ok') {
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
											/*********添加一个缓存 省去每次都要登陆********/
											try {
												uni.setStorageSync('$parenting', JSON.stringify(obj));
											} catch (e) {
												// error
											}

											/*****************/
											// ②进行跳转至首页
											uni.switchTab({
												url: '../home/home'
											});
										}
									});
							}
							// 如果状态码为error,则跳出提示框,并显示相应的错误信息
							if (data.code == 'error') {
								this.data = data.data;
								this.bagShow = true;
								this.tipsShow = true;
								this.password = '';
								this.pinkStatic = false;
								this.blueStatic = false;
								this.passwordState = 0;
								if (data.data == '密码错误') {
									this.tipsStatic2 = false;
								} else if (data.data == '用户名不存在') {
									this.phone = '';
									this.phoneState = 0;
									this.tipsStatic2 = true;
								}
							}
						});
				}

				//static为2，跳转到商家的首页
				if (this.$store.state.$identity.i == 2) {
					// 调用商家登录的接口
					this.http
						.post('/business/login', {
							phone: this.phone,
							password: this.password
						})
						.then(res => {
							let data = res.data;
							if (data.code == 'ok') {
								// ①调用商家信息的接口
								this.http
									.post('/business/getBusinessInfo', {
										phone: this.phone
									})
									.then(res => {
										if (res.data.code == 'ok') {
											this.business_id = res.data.data.business_id;
											let obj = {
												business_id: res.data.data.business_id,
												phone: res.data.data.phone,
												pwd: res.data.data.pwd,
												nick: res.data.data.nick,
												sex: res.data.data.sex,
												birthday: res.data.data.birthday,
												state: res.data.data.state,
												avatar: res.data.data.avatar
											};
											this.$store.commit('setBusiness', obj);
											/*********添加一个缓存 省去每次都要登陆********/
											try {
												uni.setStorageSync('$business', JSON.stringify(obj));
											} catch (e) {
												// error
											}

											/*****************/
											// ①调用商家店铺信息的接口
											this.http
												.post('/shop/getShopInfo', {
													business_id: this.business_id
												})
												.then(res => {
													if (res.data.code == 'ok') {
														let obj = {
															shop_id: res.data.data[0].shop_id,
															shop_name: res.data.data[0].shop_name,
															address: null
														};
														this.$store.commit('setShop', obj);
														/*********添加一个缓存 省去每次都要登陆********/
														try {
															uni.setStorageSync('$shop', JSON.stringify(obj));
														} catch (e) {
															// error
														}

														/*****************/
														// ②进行跳转至首页
														uni.redirectTo({
															url: '../../../business/home/home'
														});
													}
												});
										}
									});
							}
							// 如果状态码为error,则跳出提示框,并显示相应的错误信息
							if (data.code == 'error') {
								this.errorData = data.data;
								this.errorShow = true;
								this.bagShow = true;
								this.pinkStatic = false;
								this.blueStatic = false;
								this.passwordState = 0;
								this.password = '';
								if (data.data == '密码错误') {
									this.errorBtnStatic2 = false;
								} else if (data.data == '用户名不存在') {
									this.phoneState = 0;
									this.phone = '';
									this.errorBtnStatic2 = true;
								}
							}
						});
				}
			}
		},
		// 点击注册跳转到相应登录界面
		loginBtn() {
			uni.navigateTo({
				url: `../register/register`
			});
		},
		tipsBtn1() {
			this.tipsShow = false;
			this.bagShow = false;
		},
		tipsBtn2() {
			this.tipsShow = false;
			this.bagShow = false;
			uni.navigateTo({
				url: '../register/register'
			});
		},
		// 点击信息有误提示框中的确定按钮
		errorTrue1() {
			this.errorShow = false;
			this.bagShow = false;
		},
		errorTrue2() {
			this.errorShow = false;
			this.bagShow = false;
			uni.navigateTo({
				url: '../register/register'
			});
		},

		// 点击输入不能为空提示框中的×时
		bigEmptyImgBtn() {
			this.emptyTipsShow = false;
			this.bagShow = false;
		}
	}
};
</script>

<style lang="less" scoped>
page {
}

.login {
	color: rgba(153, 153, 153, 1);

	// 显示灰色背景
	.bagDisplay {
		display: block;
	}

	// 1.头部图片
	.top {
		display: flex;
		justify-content: center;
		padding: 150rpx 90rpx 0;

		.topImg {
			width: 172rpx;
			height: 172rpx;
			background: #fc9898;
			border-radius: 200rpx;
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
			padding: 15rpx 32rpx;
			box-sizing: border-box;
			box-shadow: 0px 3px 6px rgba(46, 46, 46, 0.07);
			border-radius: 20px;

			&::-webkit-input-placeholder {
				color: #007aff;
			}
		}

		.input2 {
			margin-top: 48rpx;
		}

		// 2.2登录按键及按钮部分
		.reg {
			margin: 70rpx 0 24rpx 0;

			button {
				background: #e2e0e3;
			}

			.btnSon {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 24rpx;
				font-size: 14px;
			}

			// 注册按钮为蓝色
			.blue {
				background: #8cbdeb;
			}

			.pink {
				background: #fc9898;
			}
		}
	}

	// 3.第三方登录
	.bottom {
		padding: 0 58rpx;

		// 3.1第三方登录标题
		.botTop {
			font-size: 13px;
			padding: 0 170rpx;
			margin: 92rpx auto 56rpx auto;
			text-align: center;
			position: relative;

			.title {
				background: white;
				position: relative;
				z-index: 2;
			}

			// 标题两旁的横线样式
			.line {
				height: 1px;
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
				transform: translateY(-50%);
				background: rgba(153, 153, 153, 1);
				opacity: 0.4;
			}
		}

		// 3.2第三方登录的图片样式
		.botCenter {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.botImg {
				width: 76rpx;
				height: 76rpx;
				border-radius: 50%;
			}
		}
	}

	// 3.3声明
	.botBottom {
		font-size: 12px;
		text-align: center;
		margin-top: 100rpx;
	}

	// 提示框
	.tips {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 12px;
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
		z-index: 14;

		.tipsImg {
			width: 572rpx;
			height: 388rpx;
		}

		.text1 {
			margin: 30rpx 0;
		}

		.btn {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.goBtn {
			width: 200rpx;
			height: 55rpx;
			margin: 30rpx 0 48rpx 0;
			border-radius: 16px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #fc9898;
			color: white;
			font-size: 14px;
		}

		.goBtn2 {
			margin-left: 15rpx;
		}
	}

	// 输入框内容空的提示框
	.emptyTips {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 15;

		> view {
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
			background: white;
			color: #333333;
			font-size: 17px;
			position: absolute;
			top: 140rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.text {
			background: white;
			position: absolute;
			top: 205rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 13px;
			color: #666666;
		}
	}

	// 商家提示框
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
			font-size: 16px;
			font-weight: bold;
		}

		.errorCenter {
			padding: 30rpx 0 42rpx 0;
			font-size: 12px;
			border-bottom: 1px solid rgba(140, 189, 235, 0.13);
		}

		.btn {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
		}

		.errorBtn {
			color: #8cbdeb;
			font-size: 16px;
			padding: 22rpx 0;
		}
	}
}
</style>
