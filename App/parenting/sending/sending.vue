<template>
	<view class="sending">
		<view class="static"></view>
		<view class="bag" :class="{bagDisplay:bagStyle}"></view>
		<!--  1.顶部导航栏 -->
		<view class="nav mag20">
			<view class="navImg" @click="backBtn">
				<image class="image" src="../static/images/return1.png"></image>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="title">
				<button @click="sendBtn">发表</button>
			</view>
			<!-- #endif -->
		</view>
		<!-- 2.输入框 -->
		<view class="text">
			<textarea placeholder="说出你的想法......" name="" id="" v-model="msg" @blur="blurContent"></textarea>
		</view>
		<!-- 3.添加图片 -->
		<view class="Img" @click="addBtn">
			<image class="image" src="../static/images/addImg.png"></image>
		</view>
		<!-- 添加文章成功提示框 -->
		<view class="success" v-if="successState">
			<view class="top">
				<view class="top1">添加文章操作成功！可在我的社区中查看</view>
				<view class="top2" @click="employeeListBtn">前往我的社区</view>
			</view>
			<button class="button btnn" @click="cancel">取消</button>
		</view>
		<!-- 4.权限选择 -->
		<view class="power" @click="editJump">
			<view>权限</view>
			<view class="power2">{{text}}</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="button" @click="sendBtn">发表</view>
		<!-- #endif -->
	</view>
</template>


<script>
	const requireAPI = require("../../static/requestAPI.js");
	const $upload = require('@/components/util/upload.js');
	export default {
		onLoad(option) {
			this.msg = this.$store.state.$addArticle.content;
			if (option.text == undefined) {
				this.text = "所有人可见"
			} else {
				this.text = option.text;
			}
		},
		data() {
			return {
				msg: "", //用户输入的文章内容
				successState: false, //添加活动成功后的提示框
				bagStyle: false, //灰色背景
				text: "所有人可见", //权限的文本
				tmp: "", //储存图片临时地址
				isviewState: 1
			}
		},
		methods: {
			// 输入框失去焦点时触发
			blurContent() {
				this.$store.state.$addArticle.content = this.msg
			},
			// 点击添加图片的图标
			addBtn() {
				uni.chooseImage({
					// 调用选择图片的方法
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.tmp = tempFilePaths[0]; // 储存图片临时地址
					}
				});
			},
			//点击发表,跳转回社区页面
			sendBtn() {
				let path = this.tmp;
				// 获取用户选择的权限
				if (this.text == "仅自己可见") {
					this.isviewState = 0
				} else if (this.text == "所有人可见" || this.text == "仅旅友可见" || this.text == "仅部分可见") {
					this.isviewState = 1
				}
				let data = {
					// 发表活动需要传入的参数this.$store.state.$parenting.user_id
					user_id: this.$store.state.$parenting.user_id,
					title: "",
					content: this.$store.state.$addArticle.content,
					isview: this.isviewState
				};
				// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,成功返回的数据，失败返回的数据)
				$upload.upload(this.baseURL + '/article/addArticle', path, data, res => {
					if (res.code == "ok") {
						if (res.data = "添加文章成功") {
							this.successState = true;
							this.bagStyle = true;
							this.$store.state.$addArticle.content = "";
							this.$store.state.$addArticle.img = "";
							this.msg = "";
							this.tmp = "";
						}
					}
				});
			},
			// 点击成功后的前往员工列表页面按钮,进行页面跳转
			employeeListBtn() {
				this.successState = false;
				this.bagStyle = false;
				uni.redirectTo({
					url: "../myCommunity/myCommunity"
				})
			},
			// 点击成功后的取消按钮,提示框消失
			cancel() {
				this.successState = false;
				this.bagStyle = false;
			},
			//返回按钮，返回到社区界面
			backBtn() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 点击选择权限，跳转至编辑页面
			editJump() {
				uni.navigateTo({
					url: "../choiceJurisdiction/choiceJurisdiction"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.sending {
		.bagDisplay {
			display: block;
		}

		// 1.顶部导航栏
		.nav {
			display: flex;
			flex-direction: row;
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			align-items: center;
			justify-content: space-between;
			margin-top: var(--status-bar-height);

			.navImg {
				width: 46rpx;
				height: 46rpx;
				margin-right: 230rpx;
				margin-right: 32rpx;
			}

			.title {
				button {
					margin: 0;
					padding: 0;
					padding: 20rpx 15rpx;
					line-height: 9rpx;
					font-size: 13px;
					background: #fc9898;
					color: white;
				}
			}
		}

		// 2.输入框
		.text {
			margin: 24rpx 0;

			textarea {
				width: 750rpx;
				height: 320rpx;
				box-sizing: border-box;
				padding: 0 20rpx;
			}
		}

		.Img {
			width: 276rpx;
			height: 264rpx;
			margin-left: 20rpx;
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

		.power {
			padding: 30rpx 30rpx;
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid rgba(112, 112, 112, 0.07);
			border-bottom: 1px solid rgba(112, 112, 112, 0.07);
			color: #666666;

			.power2 {
				color: #999999;
			}
		}

		.button {
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
