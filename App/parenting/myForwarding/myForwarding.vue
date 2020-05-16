<template>
	<view class="myCommunity" :class="{pageHidden:hidden == true}">
		<view class="static"></view>
		<view class="bag" :class="{bagDisplay:bagStyle}"></view>
		<view class="fixed">
			<!-- 1.导航栏 -->
			<parentingNav title="我的转发"></parentingNav>
			<!-- 2.四个图标导航 -->
			<view class="icon">
				<view v-for="(item,index) in iconList" :key="index">
					<view class="iconImg">
						<image class="image" :src="item.img" @click="iconJump(index)"></image>
					</view>
					<view>{{item.text}}</view>
				</view>
			</view>
		</view>
		<view class="pad20 change">
			<!-- 3.内容部分 -->
			<view class="noDataTips">{{data}}</view>
			<view class="content" v-for="(conItem,conIndex) in conList" :key="conIndex">
				<view @click="detailsJump(conItem[0].article_id)">
					<!-- 2.1一些基本信息 -->
					<view class="content1">
						<view class="conImg">
							<image class="image" :src="conItem[0].avatar" mode="aspectFill"></image>
						</view>
						<view class="conText">
							<view class="title">{{conItem[0].nick}}</view>
							<view>{{conItem[0].article_time}}</view>
						</view>
					</view>
					<!-- 2.2文本 -->
					<view class="content2">{{conItem[0].article_content}}</view>
					<!-- 2.3图片 -->
					<view class="bg">
						<view>
							<image class="image" :src="conItem[0].article_image" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<!-- 2.4一些操作按钮-->
				<view class="content3">
					<view class="img" v-for="(item,index) in imgList" :key="index" @click="bigImg(index,conIndex)">
						<image class="image" :src="item"></image>
					</view>
				</view>
			</view>
			<!-- 删除成功的提示框  -->
			<view class="successDelete" v-if="successState">
				<view class="title">删除成功啦~</view>
				<view class="sure" @click="deleteSure">确定</view>
			</view>
			<!-- 点击删除确认删除的提示框 -->
			<view class="delete" v-if="deleteTips">
				<view class="top">
					<!-- <view>确认删除</view> -->
					<view class="con">是否确认删除？</view>
				</view>
				<view class="btn">
					<view @click="closeList">取消</view>
					<view @click="sureList" class="sure">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import parentingNav from "../components/parentingNav.vue"
	export default {
		onLoad() {
			// 调用该用户的转发文章
			this.http.post("/follow/getFollowInfo", {
				user_id: this.$store.state.$parenting.user_id,
				type: 5
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						if (resolve.data.data == "暂无记录") {
							this.data = "暂无记录";
						} else {
							// this.conList = resolve.data.data;
							let array = [];
							let array1 = [];
							let array2 = [];
							let array3 = [];
							array = resolve.data.data;
							for (let i = 0; i < array.length; i++) {
								array1.unshift(array[i].firend_id);//存储所有转发的文章id，用于页面显示
								array3.unshift(array[i].follow_id);//存储所有转发的id序号，用于删除
							}
							for (let j = 0; j < array1.length; j++) {
								// 调用文章接口
								this.http.post("/article/getArticle", {
									article_id: array1[j]
								}).then((resolve) => {
									if (resolve.statusCode == 200) {
										if (resolve.data.code == "ok") {
											array2.push(resolve.data.data)
										}
									}
								})
							}
							this.conList = array2;
							this.followArray = array3;
						}

					}
				}
			})
		},
		data() {
			return {
				data: "",
				successState: false, //删除成功的提示框
				bagStyle: false, //控制灰色背景显隐
				deleteTips: false, //是否确认删除提示框
				follow_id: "", //存储文章id
				hidden: false,
				followArray: [],
				iconList: [{
						img: "../static/images/mycommunity/aicon2002.png",
						text: "我的社区"
					},
					{
						img: "../static/images/mycommunity/aicon2001.png",
						text: "我的转发"
					},
					{
						img: "../static/images/mycommunity/aicon2003.png",
						text: "我的回复"
					},
					{
						img: "../static/images/mycommunity/aicon2004.png",
						text: "我的点赞"
					}
				],
				conList: [],
				imgList: [
					"../static/images/mycommunity/k1.png",
					"../static/images/mycommunity/fabulous.png",
					"../static/images/mycommunity/comment.png",
				]
			}
		},
		methods: {
			backBtn() {
				uni.switchTab({
					url: "../../pages/other/community/community"
				})
			},
			// 点击跳转到说说详情界面
			detailsJump(article_id) {
				uni.navigateTo({
					url: `../communityDetails/communityDetails?article_id=${article_id}`
				})
			},
			// 点击四个图标,进行页面跳转
			iconJump(i) {
				// 点击跳转到我的社区页面
				if (i == 0) {
					uni.redirectTo({
						url: "../myCommunity/myCommunity"
					})
				}
			},
			// 点击小图标事件
			bigImg(i, conIndex) {
				// 点击删除按钮
				if (i == 0) {
					// 把对应删除id赋值给follow_id
					this.follow_id = this.followArray[conIndex];
					this.deleteTips = true;
					this.hidden = true;
					this.bagStyle = true;
				}
			},
			// 是否确认删除时,点击取消按钮
			closeList() {
				this.deleteTips = false;
				this.hidden = false;
				this.bagStyle = false;
			},
			// 是否确认删除时,点击确定按钮
			sureList() {
				// 调用删除文章接口
				this.http.post("/follow/deleteForward", {
					follow_id: this.follow_id
				}).then((resolve) => {
					if (resolve.statusCode == 200) {
						if (resolve.data.code == "ok") {
							// 成功提示框显示
							this.deleteTips = false;
							this.successState = true;
							// 调用该用户的转发文章
							this.http.post("/follow/getFollowInfo", {
								user_id: this.$store.state.$parenting.user_id,
								type: 5
							}).then((resolve) => {
								if (resolve.statusCode == 200) {
									if (resolve.data.code == "ok") {
										if (resolve.data.data == "暂无记录") {
											this.data = "暂无记录";
											this.conList = ""
										} else {
											let array = [];
											let array1 = [];
											let array2 = [];
											let array3 = [];
											array = resolve.data.data;
											for (let i = 0; i < array.length; i++) {
												array1.unshift(array[i].firend_id);//存储所有转发的文章id，用于页面显示
												array3.unshift(array[i].follow_id);//存储所有转发的id序号，用于删除
											}
											for (let j = 0; j < array1.length; j++) {
												// 调用文章接口
												this.http.post("/article/getArticle", {
													article_id: array1[j]
												}).then((resolve) => {
													if (resolve.statusCode == 200) {
														if (resolve.data.code == "ok") {
															array2.push(resolve.data.data)
														}
													}
												})
											}
											this.conList = array2;
											this.followArray = array3;
										}

									}
								}
							})
						}
					}
				})
			},
			// 点击删除成功后的确定按钮
			deleteSure() {
				this.successState = false;
				this.bagStyle = false;
				this.hidden = false;
			}
		},
		components: {
			parentingNav
		}
	}
</script>

<style lang="less" scoped>
	.myCommunity {
		padding-bottom: 24rpx;

		// 显示灰色背景
		.bagDisplay {
			display: block;
		}

		//固定住的内容样式
		.fixed {
			position: fixed;
			// top: var(--status-bar-height);
			width: 100vw;
			z-index: 12;
			background: white;
		}

		//1.导航栏
		.nav {
			height: 46rpx;
			padding: 16rpx 32rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background: white;

			.navImg {
				width: 46rpx;
				height: 46rpx;
			}
		}

		// 2.四个图标导航
		.icon {
			margin-top: 28rpx;
			padding: 0 10rpx 26rpx 10rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100vw;
			justify-content: space-around;
			font-size: 11px;

			>view {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.iconImg {
				width: 84rpx;
				height: 84rpx;
				margin-bottom: 50rpx;
				border-radius: 3px;
			}
		}

		.change {
			padding-top: 330rpx;
		}

		// 3.内容部分
		.content {
			padding: 30rpx;
			background: white;
			border-radius: 6px;
			margin-top: 20rpx;
			box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

			// 2.1一些基本信息
			.content1 {
				display: flex;
				flex-direction: row;

				.conImg {
					width: 64rpx;
					height: 64rpx;
					margin-right: 18rpx;
				}

				.conText {
					display: flex;
					flex-direction: column;
					font-size: 12px;
					justify-content: center;

					.title {
						font-size: 14rpx;
						margin-bottom: 10rpx;
						font-weight: bold;
						line-height: 20rpx;
						color: rgba(51, 51, 51, 1);
					}

				}
			}

			// 2.2文本
			.content2 {
				margin: 14rpx 0 20rpx 0;
				line-height: 38rpx;
				font-size: 12px;
			}

			// 2.3图片
			.bg {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				>view {
					width: 306rpx;
					height: 204rpx;
				}
			}

			// 2.4一些操作按钮
			.content3 {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				margin-top: 24rpx;

				.img {
					width: 32rpx;
					height: 32rpx;

					margin: 14rpx;
				}
			}
		}

		// 删除成功的提示框
		.successDelete {
			color: #333333;
			font-size: 17px;
			padding-top: 40rpx;
			text-align: center;
			font-weight: bold;
			width: 540rpx;
			border-radius: 6px;
			background: white;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 15;

			.sure {
				color: #8CBDEB;
				font-size: 16px;
				border-top: 1px solid rgba(140, 189, 235, 0.3);
				padding: 24rpx 0;
				margin-top: 23rpx;
			}
		}

		// 确认删除的提示框
		.delete {
			z-index: 15;
			width: 560rpx;
			height: 200rpx;
			color: #333333;
			font-size: 17px;
			font-weight: bold;
			text-align: center;
			background: white;
			opacity: 1;
			border-radius: 6px;
			padding-top: 30rpx;
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
				font-size: 15px;
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
	}

	.pageHidden {
		overflow: hidden; //设置超出隐藏,若要有效果,则要设置一个高度
		height: 90vh;
	}
</style>
