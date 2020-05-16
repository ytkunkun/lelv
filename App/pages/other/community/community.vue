<template>
	<view class="community" :class="{ pageHidden: hidden == true }">
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{ bagDisplay: bagStyle }" @click="bagBtn"></view>
		<!-- 点击加号出现 -->
		<view class="send" v-if="sendShow">
			<view class="sendTop">
				<view class="sendTopImg" @click="sendTopBtn"><image class="image" src="../../../static/images/community/returnPink.png"></image></view>
			</view>
			<view class="icon">
				<view v-for="(item, index) in iconList" :key="index" @click="sendingBtn(index)" :class="{ iconStyle: index == 1 || index == 4 }">
					<view class="iconImg"><image class="image" :src="item.img"></image></view>
					<view class="iconText">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<!-- 内容正文部分 -->
		<view v-if="conShow">
			<!-- 1.顶部个人信息 -->
			<view class="top">
				<!-- 1.1右上角图标 -->
				<view class="topRight">
					<view class="topImg" @click="plusBtn"><image class="image" src="../../../static/images/community/addSmall.png" mode="widthFix"></image></view>
				</view>
				<!-- 1.2左下角图片和文字 -->
				<view class="topLeft">
					<view class="img" @click="myBtn"><image class="image" :src="avatar" mode="aspectFill"></image></view>
					<view class="text">{{ name }}</view>
				</view>
			</view>

			<!-- 2.内容部分 -->
			<view class="content mag20" v-for="(conItem, conIndex) in conList" :key="conIndex">
				<view @click="detailsJump(conItem.article_id)">
					<!-- 2.1一些基本信息 -->
					<view class="content1">
						<view class="conImg"><image class="image hhh" :src="conItem.avatar" mode="aspectFill"></image></view>
						<view class="conText">
							<view class="title">{{ conItem.nick }}</view>
							<view>{{ conItem.article_time }}</view>
						</view>
					</view>
					<!-- 2.2文本 -->
					<view class="content2">{{ conItem.article_content }}</view>
					<!-- 2.3图片 -->
					<view class="conImg"><image class="image" :src="conItem.article_image" mode="widthFix"></image></view>
				</view>
				<!-- 2.4一些操作按钮-->
				<view class="content3">
					<view class="content3Img" v-for="(item, index) in imgList" :key="index">
						<image class="image" :src="index == 0 ? (conItem.isLike == 1 ? imgIsLike : item) : item" @click="bigImg(conIndex, index, conItem.article_id)"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="forwardTips" focus v-if="forwardShow" placeholder-style="color:pink;" adjust-position="true">
			<input cursor-spacing="20" v-model="text" type="text" placeholder="转发理由" />
			<view @click="sendBtn">发送</view>
		</view>
		<!-- 转发成功后的提示框  -->
		<view class="success" v-if="successState">
			<view class="top">
				<view class="top1">转发成功！可在我的转发中查看</view>
				<view class="top2" @click="myCommunityBtn">前往我的转发</view>
			</view>
			<button class="btnn" @click="cancel">取消</button>
		</view>
		<view class="tips" v-if="tipsStatic">{{ tipsText }}</view>
	</view>
	
</template>

<script>
export default {
	onShow() {
		// 初始化一个动画
		var animation = uni.createAnimation({
			duration: 1000,
			timingFunction: 'ease'
		});
		this.animation = animation;
		this.name = this.$store.state.$parenting.nick;
		// this.sendShow = false;
		this.avatar = this.$store.state.$parenting.avatar;
		// 调用全部文章接口
		this.getAllArticle();
	},
	data() {
		return {
			sendShow: false, //用于判断是否显示发帖界面
			conShow: true,
			forwardShow: false, //点击转发出现的内容输入框
			firend_id: '', //存储点击的列表所带的文章id
			successState: false, //转发成功后的提示框
			bagStyle: false, //灰色背景
			hidden: false, //去除滚动
			text: '',
			avatar: '',
			name: '',
			conList: [],
			tipsText: '',
			tipsStatic: false,
			imgList: ['../../../static/images/community/fabulous.png', '../../../static/images/community/forward.png', '../../../static/images/community/comment.png'],
			imgIsLike: '../../../static/images/community/fabulous2.png',
			iconList: [
				{
					img: '../../../static/images/community/Posting.png',
					text: '发帖'
				},
				{
					img: '../../../static/images/community/Reply.png',
					text: '回复'
				},
				{
					img: '../../../static/images/community/thumbs.png',
					text: '点赞'
				},
				{
					img: '../../../static/images/community/Signin.png',
					text: '签到'
				},
				{
					img: '../../../static/images/community/Journal.png',
					text: '日志'
				},
				{
					img: '../../../static/images/community/Album.png',
					text: '相册'
				}
			],
			inconStatic: 1,
			animationData: {},
			off: false
		};
	},
	methods: {
		getAllArticle() {
			// 调用全部文章接口
			this.http.post('/article/getAllArticle', { user_id: this.$store.state.$parenting.user_id }).then(resolve => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == 'ok') {
						console.log(resolve.data.data)
						let array = [];
						array = resolve.data.data;
						let array1 = [];
						for (let i = 0; i < array.length; i++) {
							array1.unshift(array[i]);
						}
						this.conList = array1;
					}
				}
			});
		},
		// 点击加号跳出发帖界面
		plusBtn() {
			this.sendShow = true;
			this.conShow = false;
		},
		// 点击发帖界面的×
		sendTopBtn() {
			this.sendShow = false;
			this.conShow = true;
		},
		//点击发帖跳转到发帖界面
		sendingBtn(i) {
			if (i == 0) {
				this.sendShow = false;
				this.conShow = true;
				uni.navigateTo({
					url: '../../../parenting/sending/sending'
				});
			}
		},
		// 点击头像跳转至我的社区界面
		myBtn() {
			uni.navigateTo({
				url: '../../../parenting/myCommunity/myCommunity'
			});
		},
		// 点击跳转到说说详情界面
		detailsJump(article_id) {
			uni.navigateTo({
				url: `../../../parenting/communityDetails/communityDetails?article_id=${article_id}`
			});
		},
		// 点击小图标事件
		bigImg(conIndex, i, firend_id) {
			// 阻止事件冒泡
			// window.event ? window.event.cancelBubble = true : e.stopPropagation();
			// 点击点赞按钮
			// if (i == 0) {
			// if(this.imgList[0] == "../../../static/images/community/fabulous.png"){
			// 	this.imgList[0] = "../../../static/images/community/k2.png"
			// }
			// }
			// 点击转发按钮
			if (i == 1) {
				this.forwardShow = true;
				this.firend_id = firend_id;
				this.hidden = true;
				this.bagStyle = true;
			}
			// 点击点赞图标
			if (i == 0) {
				this.http
					.post('/follow/likeArticle', {
						user_id: this.$store.state.$parenting.user_id,
						firend_id: firend_id
					})
					.then(resolve => {
						console.log(resolve.data.data)
						if (resolve.statusCode == 200) {
							if (resolve.data.code == 'ok') {
								this.tipsText = resolve.data.data;
								this.tipsStatic = true;
								let timer;
								timer = setTimeout(() => {
									this.tipsStatic = false;
									clearInterval(timer);
								}, 600);
								this.getAllArticle();
							}
						}
					});
			}
		},
		// 点击转发图标后的输入框中的发送按钮
		sendBtn() {
			// 调用转发的接口
			this.http
				.post('/follow/forwardArticle', {
					user_id: this.$store.state.$parenting.user_id,
					firend_id: this.firend_id,
					forward_account: this.text
				})
				.then(resolve => {
					if (resolve.statusCode == 200) {
						if (resolve.data.code == 'ok') {
							this.forwardShow = false;
							this.successState = true;
							this.text = '';
						}
					}
				});
		},
		// 转发成功后，点击前往我的社区，进行页面跳转
		myCommunityBtn() {
			this.forwardShow = false;
			this.successState = false;
			this.tips = false;
			this.bagStyle = false;
			this.hidden = false;
			uni.navigateTo({
				url: '../../../parenting/myForwarding/myForwarding'
			});
		},
		// 转发成功后，点击成功后的取消按钮,提示框消失
		cancel() {
			this.forwardShow = false;
			this.successState = false;
			this.tips = false;
			this.bagStyle = false;
			this.hidden = false;
		},
		bagBtn() {
			this.bagStyle = false;
			this.successState = false;
			this.forwardShow = false;
			this.tips = false;
			this.hidden = false;
			this.text = '';
		}
	}
};
</script>

<style lang="less" scoped>
.community {
	margin-bottom: 100rpx;

	.bagDisplay {
		display: block;
	}

	.send {
		margin: 65rpx 24rpx 0 24rpx;
		background: white;

		.sendTop {
			display: flex;
			justify-content: flex-end;
			margin-right: 10rpx;

			.sendTopImg {
				width: 46rpx;
				height: 46rpx;
				margin: 22rpx 15rpx 20rpx 0;
			}
		}

		/* #ifdef MP-WEIXIN */
		.sendTop {
			justify-content: flex-start;

			.sendTopImg {
				width: 46rpx;
				height: 46rpx;
				margin: 22rpx 0 20rpx 15rpx;
			}
		}
		/* #endif */

		.icon {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			font-size: 12px;
			background: white;
			width: 100;
			margin: 0 20rpx;

			> view {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.iconImg {
					width: 100rpx;
					height: 100rpx;
					margin: 60rpx 0 36rpx 0;
				}
			}

			.iconStyle {
				margin: 0 150rpx;
			}
		}
	}

	// 1.顶部个人信息
	.top {
		background: url(../../../static/images/community/bg.png) no-repeat;
		padding: 20rpx 0 50rpx 0;
		width: 100vw;
		background-size: cover;

		// 1.1右上角图标
		.topRight {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			margin-bottom: 250rpx;

			.topImg {
				width: 52rpx;
				height: 52rpx;
				padding: 50rpx 32rpx 0 0;
			}
		}

		/* #ifdef MP-WEIXIN */
		.topRight {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			margin-bottom: 250rpx;

			.topImg {
				width: 52rpx;
				height: 52rpx;
				padding: 50rpx 0 0 32rpx;
			}
		}

		/* #endif */

		// 1.2左下角图片和文字
		.topLeft {
			display: flex;
			flex-direction: column;
			font-size: 16px;
			justify-content: center;
			color: white;
			margin-left: 24rpx;

			// align-items: center;
			.img {
				width: 116rpx;
				height: 116rpx;
				border-radius: 50%;
				margin-bottom: 12rpx;

				image {
					border-radius: 50%;
				}
			}

			.text {
				padding-left: 5rpx;
			}
		}
	}

	// 2.内容部分
	.content {
		padding: 30rpx;
		border-radius: 6px;
		margin-top: 20rpx;
		box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
		font-size: 12px;
		line-height: 17px;

		// 2.1一些基本信息
		.content1 {
			display: flex;
			flex-direction: row;
			align-items: center;

			.conImg {
				width: 64rpx;
				height: 64rpx;
				margin-right: 18rpx;

				image {
					border-radius: 50%;
				}
			}

			.conText {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 12px;

				.title {
					font-size: 13px;
					margin-bottom: 3rpx;
					color: rgba(51, 51, 51, 1);
					font-weight: bold;
				}
			}
		}

		// 2.2文本
		.content2 {
			margin: 14rpx 0 20rpx 0;
		}

		.conImg {
			width: 320rpx;
		}

		// 2.3一些操作按钮
		.content3 {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;

			.content3Img {
				width: 40rpx;
				height: 40rpx;
				margin: 0 14rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	// 点击转发出现的内容输入框
	.forwardTips {
		width: 100vw;
		background: white;
		display: flex;
		flex-direction: row;
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0rpx;
		z-index: 15;
		border-top: 1px solid rgba(239, 239, 239, 1);

		input {
			border-radius: 3px;
			background: white;
			flex: 1;
			font-size: 13px;
			padding: 5rpx 10rpx;
			border: 1px solid rgba(239, 239, 239, 1);
		}

		> view {
			background: #fc9898;
			color: white;
			font-size: 16px;
			padding: 8rpx 16rpx;
			margin-left: 22rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 6px;
		}
	}

	// 转发成功提示框
	.success {
		height: 340rpx;
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		z-index: 16;
		font-weight: bold;

		.top {
			width: 100%;
			background: white;
			color: #8cbdeb;
			font-size: 20px;
			text-align: center;
			margin-bottom: 20rpx;
			padding: 0;
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
			color: #666666;
			border-radius: 0;
		}
	}
	.tips {
		// width: 200rpx;
		// height: 35rpx;
		// background: pink;
		// position: fixed;
		// bottom: 0rpx;
		// width: 100%;
		// z-index: 16;
		height: 100rpx;
		width: 300rpx;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 16;
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		// font-weight: bold;
		background: black;
		opacity: 0.7;
		border-radius: 10px;
		color: white;
		letter-spacing: 2px;
	}
}

.pageHidden {
	overflow: hidden; //设置超出隐藏,若要有效果,则要设置一个高度
	height: 100vh;
}
</style>
