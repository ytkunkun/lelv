<template>
	<view class="employeeList" :class="{pageHidden:bagStyle == true}">
		<view class="static"></view>
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{bagDisplay:bagStyle}"></view>

		<businessNav title="员工列表"></businessNav>
		<view class="mag20">
			<view class="con">
				<view class="noDataTips" v-if="tipsShow">暂无员工</view>
				<view class=" li" v-for="(item,index) in conList" :key="index" @longpress="edit(index)">
					<view class="left">
						<view class="leftImg">
							<image :src="item.image_url" class="image"></image>
						</view>
						<view class="leftCon">
							<view class="name">{{item.nick}}</view>
							<view>{{item.username}}</view>
						</view>
					</view>
					<view class="right">{{item.permissions}}</view>
				</view>
			</view>
		</view>
		<!-- 确认删除的提示框 -->
		<view class="delete" v-if="deleteTips">
			<view class="top">
				<view>确认删除</view>
				<view class="con">删除后，此账户所有信息将被清理干净</view>
			</view>
			<view class="btn">
				<view @click="closeList">取消</view>
				<view @click="sureList" class="sure">确认</view>
			</view>
		</view>
		<!-- 长按后跳出的提示框 -->
		<view class="longTips" v-if="longTipsShow">
			<view class="longTipsEdit">编辑</view>
			<view class="longTipsDelete" @click="longTipsDelete">删除</view>
		</view>

	</view>
</template>

<script>
	import businessNav from "../components/businessNav.vue"
	export default {
		onLoad() {
			// 调用全部员工的接口
			this.http.post("/shop/getAllEmployee").then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let array = [];
						var array1 = [];
						array = resolve.data.data;
						for (let i = 0; i < array.length; i++) {
							if (array[i].shop_id == this.$store.state.$shop.shop_id) {
								array1.push(array[i]);
								if (array[i].permissions == 1) {
									array[i].permissions = "客服";
								}
								if (array[i].permissions == 2) {
									array[i].permissions = "管理员";
								}
							}
						}
						if (array1.length == 0) {
							this.tipsShow = true;
							this.conList = array1;
						} else {
							this.tipsShow = false;
							this.conList = array1;
						}

					}
				}
			})
		},
		data() {
			return {
				conList: [],
				deleteTips: false,
				bagStyle: false, //灰色背景
				id: "", //存储选中列的下标
				longTipsShow: false, //长按后的提示框
				tipsShow: false,
			};
		},
		methods: {
			// 长按后的事件
			edit(i) {
				this.bagStyle = true;
				this.id = i;
				this.longTipsShow = true;

			},
			// 点击长按提示框中的删除按钮
			longTipsDelete() {
				this.deleteTips = true;
				this.longTipsShow = false;
			},
			// 确认删除面板,点击确认
			sureList() {
				// 调用删除员工接口
				this.http.post("/shop/deleteEmployee", {
					employee_id: this.conList[this.id].employee_id
				}).then((resolve) => {
					if (resolve.statusCode == 200) {
						if (resolve.data.code == "ok") {
							this.deleteTips = false;
							this.bagStyle = false;
							// 调用全部员工的接口
							this.http.post("/shop/getAllEmployee").then((resolve) => {
								if (resolve.statusCode == 200) {
									if (resolve.data.code == "ok") {
										let array = [];
										var array1 = [];
										array = resolve.data.data;
										for (let i = 0; i < array.length; i++) {
											if (array[i].shop_id == this.$store.state.$shop.shop_id) {
												array1.push(array[i]);
												if (array[i].permissions == 1) {
													array[i].permissions = "客服";
												}
												if (array[i].permissions == 2) {
													array[i].permissions = "管理员";
												}
											}
										}
										if (array1.length == 0) {
											this.conList = "";
											this.tipsShow = true;
										} else {
											this.tipsShow = false;
											this.conList = array1;
										}
									}
								}
							})
						}
					}
				})
			},
			// 确认删除面板,点击取消
			closeList() {
				this.deleteTips = false;
				this.bagStyle = false;
			}
		},
		components: {
			businessNav
		}
	}
</script>

<style lang="less">
	.employeeList {

		// 显示灰色背景
		.bagDisplay {
			display: block;
		}

		.con {
			margin-top: 32rpx;
			.li {
				padding: 48rpx 32rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
				border-radius: 6px;
				margin-bottom: 20rpx;
				color: #666666;

				.left {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					font-size: 13px;

					.leftImg {
						width: 92rpx;
						height: 92rpx;
						margin-right: 24rpx;
						border-radius: 50%;
					}

					.leftCon {
						.name {
							font-size: 14px;
							margin-bottom: 20rpx;
							color: #333333;
						}
					}
				}
			}
		}

		// 确认删除的提示框 
		.delete {
			z-index: 15;
			width: 560rpx;
			height: 220rpx;
			color: #333333;
			font-size: 17px;
			font-weight: bold;
			text-align: center;
			background: white;
			opacity: 1;
			border-radius: 6px;
			padding-top: 50rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;

			.top {
				margin: 0 55rpx;
			}

			.con {
				font-size: 12px;
				margin: 25rpx 0 45rpx 0;
			}

			.btn {
				display: flex;
				flex-direction: row;
				font-size: 16px;

				>view {
					width: 50%;
					background: white;
					padding: 26rpx 0;
					color: #C5C5C5;
				}

				.sure {
					color: #8cbdeb;
				}
			}
		}

		.longTips {
			color: #FF3939;
			font-size: 20px;
			text-align: center;
			font-weight: bold;
			position: fixed;
			bottom: 0;
			width: 100vw;
			z-index: 15;

			>view {
				background: white;
				padding: 22rpx 0;
			}

			.longTipsEdit {
				color: #333333;
				margin-bottom: 20rpx;
			}
		}
	}

	.pageHidden {
		overflow: hidden; //设置超出隐藏,若要有效果,则要设置一个高度
		height: 100vh;

	}
</style>
