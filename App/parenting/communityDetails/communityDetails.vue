<template>
	<view class="communityDetails">
		<view class="static"></view>
		<view class="pad20">
			<view class="nav1">
				<view class="nav1Img" @click="backBtn">
					<image class="image" src="../static/images/return1.png"></image>
				</view>
			</view>
			<view class="con" v-for="(item,index) in conList" :key="index">
				<view class="top">
					<view class="topImg">
						<image class="image" :src="item.avatar"></image>
					</view>
					<view class="text">
						<view class="title">{{item.nick}}</view>
						<view>{{item.article_time}}</view>
					</view>
				</view>
				<view class="content">
					{{item.article_content}}
				</view>
				<view class="conImg">
					<image class="image" :src="item.article_image" mode="widthFix"></image>
				</view>
				<view class="fabulous">
					<view class="fabulousImg image">
						<image class="image" :src="item.isLike==1?fabulous2:fabulous"></image>
					</view>
					<view>{{item.followCount}}</view>
				</view>
				<view class="forward">
					<view class="forwardImg image">
						<image class="image" src="../static/images/mycommunity/forward.png"></image>
					</view>
					<view>{{item.forwardCount}}</view>
				</view>
				<view class="bottom">
					<view class="bottomImg image">
						<image class="image" src="../static/images/mycommunity/comment.png"></image>
					</view>
					<input type="text">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			// 调用一条社区说说接口
			this.http.post("/article/getArticle",{
				article_id:options.article_id,
				user_id: this.$store.state.$parenting.user_id
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						if(resolve.data.data[0].followCount == 0){
							resolve.data.data[0].followCount = "暂时还未有用户点赞该帖子哦~"
						} else{
							resolve.data.data[0].followCount = resolve.data.data[0].followCount+"人点赞"
						}
						if(resolve.data.data[0].forwardCount == 0){
							resolve.data.data[0].forwardCount = "暂时还未有用户转发该帖子哦~"
						} else{
							resolve.data.data[0].forwardCount = resolve.data.data[0].forwardCount+"人转发"
						}
						this.conList = resolve.data.data;
					}
				}
			})
		},
		data() {
			return {
				conList:[],
				fabulous:'../static/images/mycommunity/fabulous.png',
				fabulous2:'../static/images/mycommunity/fabulous2.png'
			}
		},
		methods: {
			backBtn() {
				uni.navigateBack({
					delta:1
				})
			},
		},
		components: {
		}
	}
</script>

<style lang="less">
	.communityDetails {
		.nav1 {
			display: flex;
			flex-direction: row;
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			align-items: center;
			font-weight:bold;
			color:rgba(51,51,51,1);
			margin-top: var(--status-bar-height);
			.nav1Img {
				width: 46rpx;
				height: 46rpx;
				margin-right: 230rpx;
			}
		}
		.con {
			padding: 48rpx 32rpx;
			box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
			opacity: 1;
			border-radius: 6px;

			.top {
				display: flex;
				flex-direction: row;

				.topImg {
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
				}

				.text {
					display: flex;
					flex-direction: column;
					color: #666666;
					font-size: 12px;

					.title {
						color: #333333;
						font-size: 14px;
						font-weight: bold;
						margin-bottom: 10rpx;
					}
				}
			}

			.content {
				color: #333333;
				font-size: 12px;
				margin: 28rpx 0 25rpx 0;
				line-height: 18px;
			}
			
			.conImg{
				width: 450rpx;
				margin-bottom: 35rpx;
			}
			.fabulous {
				display: flex;
				flex-direction: row;
				font-size: 11px;
				align-items: center;

				.fabulousImg {
					width: 32rpx;
					height: 32rpx;
					margin-right: 18rpx;
				}
			}

			.forward {
				display: flex;
				flex-direction: row;
				font-size: 11px;
				align-items: center;
				margin: 44rpx 0 55rpx 0;

				.forwardImg {
					width: 32rpx;
					height: 32rpx;
					margin-right:18rpx;
				}
			}

			.bottom {
				display: flex;
				flex-direction: row;
				font-size: 11px;
				align-items: center;
				margin: 44rpx 0 55rpx 0;

				.bottomImg {
					width: 32rpx;
					height: 32rpx;
					margin-right: 18rpx;
				}

				input {
					background: white;
					flex: 1;
					border: 1px solid rgba(243, 238, 238, 1);
					opacity: 1;
					border-radius: 3px;
					font-size: 15px;
					box-sizing: border-box;
					padding: 5rpx 10rpx;
				}
			}
		}
	}
</style>
