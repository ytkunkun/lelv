<template>
	<view class="issueMaterials">
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{bagDisplay:bagStyle}"></view>
		<!-- 类型选择提示框 -->
		<view class="typeTips" v-if="typeTipsShow">
			<view class="typeSon" v-for="(item,index) in typeList" :key="index" @click="typeSonBtn(index)" :class="{typeSon2:index == 1||index == 3}">{{item}}</view>
		</view>
		<!-- 闲置资源发布成功提示框 -->
		<view class="success" v-if="successState">
			<view class="top">
				<view class="top1">添加闲置资源成功！可在闲置市场中查看</view>
				<view class="top2" @click="employeeListBtn">前往闲置市场</view>
			</view>
			<button class="button btnn" @click="cancel">取消</button>
		</view>
		<view class="con">
			<view class="static"></view>
			<businessNav title="发布物资"></businessNav>
			<view class="pad20">
				<view class="top" @click="addImgBtn">
					<image class="image" src="../static/images/addimge.png"></image>
				</view>
				<view class="center">
					<input placeholder="名称" v-model="inputTitle"></input>
					<input placeholder="描述" v-model="inputDescribe"></input>
					<!-- <input placeholder="场地类型"></input> -->
					<view class="centerSon3">
						<view class="left">类型</view>
						<view class="right">
							<view class="con">{{typeText}}</view>
							<view class="img" @click="imgBtn">
								<image class="image" src="../../static/images/returnDown.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom" @click="sendBtn">确认发布</view>
	</view>
</template>

<script>
	import businessNav from "../components/businessNav.vue";
	const requireAPI = require("../../static/requestAPI.js");
	const $upload = require('@/components/util/upload.js');
	export default {
		data() {
			return {
				bagStyle: false,
				typeList: ["策划", "场地", "物料", "影像", "其他"],
				typeTipsShow: false,
				successState: false,
				typeText: "策划",
				inputDescribe: "",
				inputTitle: "",
				tmp: ""
			};
		},
		methods: {
			// 点击灰色北背景处
			imgBtn() {
				this.bagStyle = true;
				this.typeTipsShow = true;
			},
			typeSonBtn(i) {
				if (i == 0) {
					this.typeText = "策划"
				} else if (i == 1) {
					this.typeText = "场地"
				} else if (i == 2) {
					this.typeText = "物料"
				} else if (i == 3) {
					this.typeText = "影像"
				} else if (i == 4) {
					this.typeText = "其他"
				}
				this.bagStyle = false;
				this.typeTipsShow = false;
			},
			// 点击成功后的前往员工列表页面按钮,进行页面跳转
			employeeListBtn() {
				this.successState = true;
				this.bagStyle = true;
				uni.navigateTo({
					url: "../leaveUnused/leaveUnused"
				})
			},
			// 点击成功后的取消按钮,提示框消失
			cancel() {
				this.successState = false;
				this.bagStyle = false;
			},

			// 点击添加图片的图标
			addImgBtn() {
				uni.chooseImage({
					// 调用选择图片的方法
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// sessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址
						this.tmp = tempFilePaths[0]; // 储存图片临时地址
					}
				});
			},
			//点击发表,发布资源
			sendBtn() {
				let path = this.tmp; //  获取刚刚存的图片临时地址
				if (this.typeText == "策划") {
					this.typeText = 0
				} else if (this.typeText == "场地") {
					this.typeText = 1
				} else if (this.typeText == "物料") {
					this.typeText = 2
				} else if (this.typeText == "影像") {
					this.typeText = 3
				} else if (this.typeText == "其他") {
					this.typeText = 4
				}
				// 发表闲置资源需要传入的参数
				let data = {
					business_id: this.$store.state.$business.business_id,
					title: this.inputDescribe,
					type: this.typeText,
				};
				// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,成功返回的数据，失败返回的数据)
				$upload.upload(this.baseURL + '/resource/addResource', path, data, res => {
					if (res.code == "ok") {
						this.typeText = "策划"
						if (res.data = "添加资源成功") {
							this.successState = true;
							this.bagStyle = true;
							this.map = "";
							this.inputDescribe = "";
							this.inputTitle = "";
						}
					}
				});
			},
		},
		components: {
			businessNav
		}
	}
</script>

<style lang="less">
	.issueMaterials {
		.bagDisplay {
			display: block;
		}

		// 类型选择提示框 
		.typeTips {
			position: fixed;
			bottom: 0;
			z-index: 20;
			background: white;
			width: 100%;
			color: #8dbcec;

			.typeSon {
				width: 100%;
				height: 80rpx;
				// border: 1px solid #B3B3B3;
				text-align: center;
				line-height: 80rpx;
			}

			.typeSon2 {
				border-top: 1px solid #8dbcec;
				border-bottom: 1px solid #8dbcec;
			}
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

		.con {
			.top {
				width: 366rpx;
				height: 310rpx;
				padding-bottom: 110rpx;
			}

			.center {
				font-size: 15px;
				color: #333333;
				font-weight: bold;

				input {
					width: 100%;
					background: white;
					height: 128rpx;
					box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
					margin-bottom: 20rpx;
					border-radius: 6px;
					padding: 20rpx;
					box-sizing: border-box;
				}

				.centerSon3 {
					width: 100%;
					background: white;
					height: 128rpx;
					box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
					margin-bottom: 20rpx;
					border-radius: 6px;
					padding: 20rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					.right {
						display: flex;
						flex-direction: row;

						.img {
							width: 23rpx;
							height: 23rpx;
							padding-left: 26rpx;
						}
					}
				}
			}

		}

		.bottom {
			width: 100%;
			height: 98rpx;
			font-size: 20px;
			color: white;
			background: #8dbcec;
			position: fixed;
			bottom: 0;
			text-align: center;
			line-height: 98rpx;
		}
	}
</style>
