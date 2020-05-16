<template>
	<view class="addPersonnel" :class="{pageHidden:successState == true}">
		<view class="static"></view>
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{bagDisplay:bagStyle}"></view>
		<!-- 点击输入账号面板 -->
		<view class="eject" v-if="tips">
			<view class="box">
				<view class="top">请输入账号</view>
				<view class="con">请输入正确的中国大陆电话号码，错误号码可能导致无法分配账号</view>
				<input type="text" v-model="phoneText" placeholder="请输入">
			</view>
			<view class="btn">
				<view @click="closeList">取消</view>
				<view @click="sureList" class="sure">确认</view>
			</view>

		</view>
		<businessNav title="添加员工"></businessNav>
		<view class="pad20">
			<!-- 2.基本信息 -->
			<view class="news">
				<view class="new" v-for="(item,index) in newsList" :key="index" @click="newBtn(item,index)">
					<view class="newLeft">
						<view class="leftImg">
							<image class="image" :src="item.img"></image>
						</view>
						<view class="leftText">{{item.name}}</view>
					</view>
					<view class="newRight">
						<view class="rightText">{{item.text}}</view>
						<view class="rightImg">
							<image class="image" src="../../static/images/returnRight.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 员工添加成功提示框 -->
		<button class="button define" @click="srueBtn">确定</button>
		<view class="success" v-if="successState">
			<view class="top">
				<view class="top1">添加员工操作成功！可在员工列表中查看</view>
				<view class="top2" @click="employeeListBtn">前往员工列表</view>
			</view>
			<button class="button btnn" @click="cancel">取消</button>
		</view>
		<!-- 用户信息有重复提示框 -->
		<view class="error" v-if="errorShow">
			<view class="errorTop">操作限制</view>
			<view class="errorCenter">{{errorData}}</view>
			<view class="errorBtn" @click="errorTrue">确认</view>
		</view>
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
	import businessNav from "../components/businessNav.vue"
	export default {
		onLoad(option) {
			this.newsList[0].text = this.$store.state.$addPersonnel.username;
			this.newsList[1].text = this.$store.state.$addPersonnel.nick;
			this.newsList[2].text = this.$store.state.$addPersonnel.permissions;
		},
		data() {
			return {
				errorData: "",
				errorShow: false,
				tips: false,
				emptyText: "",
				emptyTipsShow: false,
				newsList: [{
						img: "../static/images/personnelManager/Loginaccount.png",
						name: "登录账号",
						text: ""
					},
					{
						img: "../static/images/personnelManager/name.png",
						name: "员工姓名",
						text: ""
					},
					{
						img: "../static/images/personnelManager/post.png",
						name: "权限",
						text: ""
					},

				],
				bagStyle: false, //控制灰色背景显隐
				phoneText: "",
				permissions: "",
				successState: false
			}
		},
		methods: {
			backBtn() {
				uni.redirectTo({
					url: "../personnelManager/personnelManager"
				})
			},
			// 点击添加成员账号
			newBtn(item, i) {
				if (i == 0) {
					this.tips = true;
					this.bagStyle = true;
				};
				if (i == 1) {
					uni.redirectTo({
						url: `../../pages/other/edit/edit?name=${item.name}&text=${item.text}&id=${i}&page=addPersonnel&type=0`
					})
				}
				if (i == 2) {
					uni.redirectTo({
						url: `../../pages/other/edit/edit?name=${item.name}&text=${item.text}&id=${i}&page=addPersonnel&type=1`
					})
				}
			},
			// 添加成员账号面板，按取消，将面板消失
			closeList() {
				this.tips = false;
				this.bagStyle = false;

			},
			// 点击确认后,将文本传到表单中
			sureList() {
				var obj = {
					username: this.phoneText,
					nick: this.$store.state.$addPersonnel.nick,
					permissions: this.$store.state.$addPersonnel.permissions
				};
				this.$store.commit('setAddPersonnel', obj);
				this.newsList[0].text = this.$store.state.$addPersonnel.username
				this.bagStyle = false;
				this.tips = false;
			},
			// 点击确定时,调用添加员工接口
			srueBtn() {
				if (this.$store.state.$addPersonnel.permissions == "客服") {
					this.permissions = 1
				} else if (this.$store.state.$addPersonnel.permissions == "管理员") {
					this.permissions = 2
				}
				if (this.$store.state.$addPersonnel.username == "") {
					this.emptyTipsShow = true;
					this.bagStyle = true;
					this.emptyText = "请输入员工登录账号"
				} else if (this.$store.state.$addPersonnel.nick == "") {
					this.emptyTipsShow = true;
					this.bagStyle = true;
					this.emptyText = "请输入员工姓名"
				} else if (this.$store.state.$addPersonnel.permissions == "") {
					this.emptyTipsShow = true;
					this.bagStyle = true;
					this.emptyText = "请选择权限"
				} else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.$store.state.$addPersonnel.username))) {
					this.errorData = "登录账号格式不符合中国大陆电话号码"
					this.bagStyle = true;
					this.errorShow = true;

				} else {
					// 调用添加员工的接口
					this.http.post("/shop/addEmployee", {
						shop_id: this.$store.state.$shop.shop_id,
						username: this.$store.state.$addPersonnel.username, //yonghuming(hoama)
						nick: this.$store.state.$addPersonnel.nick, //nicheng
						permissions: this.permissions
					}).then((resolve) => {
						if (resolve.statusCode == 200) {
							if (resolve.data.code == "ok") {
								this.successState = true;
								this.bagStyle = true;
							}
							if (resolve.data.code == "error") {
								this.errorData = resolve.data.data
								this.errorShow = true;
								this.bagStyle = true;
							}
						}
					})
				}

			},
			// 点击成功后的前往员工列表页面按钮,进行页面跳转
			employeeListBtn() {
				this.successState = false;
				this.tips = false;
				this.bagStyle = false;
				var obj = {
					username: "",
					nick: "",
					permissions: ""
				};
				this.$store.commit('setAddPersonnel', obj);
				uni.navigateTo({
					url: "../employeeList/employeeList"
				})
			},
			// 点击成功后的取消按钮,提示框消失
			cancel() {
				this.successState = false;
				this.tips = false;
				this.bagStyle = false;
				this.newsList[0].text = "";
				this.newsList[1].text = "";
				this.newsList[2].text = "";
			},
			// 点击信息有误提示框中的确定按钮
			errorTrue() {
				this.errorData = ""
				this.errorShow = false;
				this.bagStyle = false;
			},
			// 点击输入不能为空提示框中的×时
			bigEmptyImgBtn() {
				this.emptyTipsShow = false;
				this.bagStyle = false;
			}
		},
		components: {
			businessNav
		}
	}
</script>

<style lang="less" scoped>
	.addPersonnel {
		// position: relative;
		height: 100vh;

		// 点击输入账号面板 
		.eject {
			background-color: white;
			z-index: 16;
			width: 540rpx;
			position: fixed;
			top: 520rpx;
			right: 0;
			left: 0;
			margin: auto;
			border-radius: 6px;
			padding-bottom: 30rpx;

			.box {
				padding: 36rpx 30rpx 0 30rpx;
				color: #333333;

				.top {
					text-align: center;
					font-size: 17px;
					font-weight: bold;
				}

				.con {
					font-size: 12px;
					text-align: center;
					margin: 16rpx 0 28rpx 0;
					line-height: 48rpx;

				}

				input {
					box-sizing: border-box;
					padding: 0 12rpx;
					border: 1px solid #8cbdeb;
					margin-bottom: 30rpx;
					font-size: 12px;
					height: 58rpx;
					border-radius: 6pxs;
				}

				input::-webkit-input-placeholder {
					/* 修改字体颜色 */
					color: red;
					/* 修改字号，默认继承input */
					font-size: 12px;
					/* 设置背景色 */
					background: #8ac6d1;
				}
			}

			.btn {
				display: flex;
				flex-direction: row;

				>view {
					text-align: center;
					width: 50%;
					background: white;

				}

				.sure {
					color: #8cbdeb;
				}
			}
		}

		// 显示灰色背景
		.bagDisplay {
			display: block;
		}

		.news {
			margin-top: 32rpx;
		}

		.new {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 32rpx 0;

			.newLeft {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.leftImg {
					width: 48rpx;
					height: 48rpx;
					margin-right: 32rpx;
				}

				.leftText {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 15px;
				}
			}

			.newRight {
				display: flex;
				flex-direction: row;
				align-items: center;

				.rightImg {
					width: 23rpx;
					height: 23rpx;
					margin-left: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.rightText {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 13px;
				}
			}
		}

		.define {
			background: #8cbdeb;
			position: absolute;
			bottom: 0rpx;
		}

		// 成功提示框
		.success {
			height: 340rpx;
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 15;
			font-weight: bold;

			.top {
				width: 100%;
				background: white;
				color: #8CBDEB;
				font-size: 20px;
				text-align: center;
				margin-bottom: 20rpx;
				border-radius: 6px 6px 0px 0px;

				.top1 {
					width: 100%;
					font-size: 15px;
					color: #333333;
					padding: 64rpx 0;
					border-bottom: 1px solid rgba(140, 189, 235, 0.3);
					letter-spacing: 0px;
				}

				.top2 {
					padding: 20rpx 0;
				}
			}

			.btnn {
				background: white;
				position: fixed;
				bottom: 0;
				color: #666666;
				border-radius: 0;
			}
		}

		// 用户信息有重复提示框
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
				padding: 20rpx 0 28rpx 0;
				font-size: 12px;
				border-bottom: 1px solid rgba(140, 189, 235, 0.13);
				line-height: 48rpx;
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
				// margin: 0 20rpx;
				width: 626rpx;
				height: 262rpx;
			}

			.emptyImg {
				width: 626rpx;
				height: 262rpx;
			}

			.bigEmptyImg {
				width: 35rpx;
				height: 32rpx;
				position: absolute;
				top: -6rpx;
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

		.define {
			position: fixed;
			bottom: 0px;
		}
	}

	.pageHidden {
		overflow: hidden; //设置超出隐藏,若要有效果,则要设置一个高度
		height: 100vh;
	}
</style>
