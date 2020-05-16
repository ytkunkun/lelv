<template>
	<view class="me">
		<!-- 1.头部头像和个人消息 -->
		<view class="top">
			<image id="bg" class="image" :src="avatar" mode="aspectFill"></image>
			
			<view class="con">
				<view class="topImg"><image class="image" :src="avatar" mode="aspectFill"></image></view>
				<view class="topText">{{ nick }}</view>
				<view class="topFoot">
					<view class="topFootImg"><image class="image" src="../../../static/images/me/edit.png"></image></view>
					<view @click="editBtn">编辑资料</view>
				</view>
			</view>
		</view>
		<!-- 2.四宫格 -->
		<view class="four">
			<view class="con" v-for="(fouritem, fouri) in fourList" :key="fouri">
				<view class="conImg"><image class="image" :src="fouritem.url"></image></view>
				<view>{{ fouritem.text }}</view>
			</view>
		</view>
		<!-- 3.八宫格 -->
		<view class="eight">
			<view v-for="(eightitem, eighti) in eightList" :key="eighti" @click="eightiBtn(eighti)">
				<view class="con">
					<view class="conImg"><image class="image" :src="eightitem.url"></image></view>
					<view :class="eightitem.class">{{ eightitem.text }}</view>
				</view>
			</view>
		</view>

		<view class="foot" v-for="(footitem, footi) in footList" :key="footi" @click="currencyBtn(footi)">
			<view class="footLeft">
				<view class="footImg"><image class="image" :src="footitem.url"></image></view>
				<view>{{ footitem.text }}</view>
			</view>
			<view class="footRight"><image class="image" src="../../../static/images/returnRight.png"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	//页面加载时触发
	onShow() {
		// 调用用户信息接口,及时更新修改数据
		this.http
			.post('/user/getUserInfo', {
				phone: this.$store.state.$parenting.phone
			})
			.then(resolve => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == 'ok') {
						let data = resolve.data.data;
						this.avatar = resolve.data.data.avatar;
						this.nick = resolve.data.data.nick;
					}
				}
			});
	},
	data() {
		return {
			avatar: '',
			nick: '',
			fourList: [
				{
					url: '../../../static/images/me/act1.png',
					text: '我的活动'
				},
				{
					url: '../../../static/images/me/act3.png',
					text: '待支付'
				},
				{
					url: '../../../static/images/me/act4.png',
					text: '待出行'
				},
				{
					url: '../../../static/images/me/act2.png',
					text: '待评价'
				}
			],
			eightList: [
				{
					url: '../../../static/images/me/icon01.png',
					text: '我的社区',
					class: 'text1'
				},
				{
					url: '../../../static/images/me/icon02.png',
					text: '预约中心',
					class: 'text2'
				},
				{
					url: '../../../static/images/me/icon03.png',
					text: '浏览足迹',
					class: 'text3'
				},
				{
					url: '../../../static/images/me/icon04.png',
					text: '我的拼团',
					class: 'text4'
				},
				{
					url: '../../../static/images/me/icon05.png',
					text: '我的关注',
					class: 'text5'
				},
				{
					url: '../../../static/images/me/icon06.png',
					text: '免费体验',
					class: 'text6'
				},
				{
					url: '../../../static/images/me/icon07.png',
					text: '优惠券',
					class: 'text7'
				},
				{
					url: '../../../static/images/me/icon08.png',
					text: '其他',
					class: 'text8'
				}
			],
			footList: [
				{
					url: '../../../static/images/me/we.png',
					text: '关于我们'
				},
				{
					url: '../../../static/images/me/idea.png',
					text: '意见反馈'
				},
				{
					url: '../../../static/images/me/currency.png',
					text: '通用'
				}
			]
		};
	},
	methods: {
		//跳转到编辑页面
		editBtn() {
			uni.navigateTo({
				url: '../../../parenting/means/means'
			});
		},
		//跳转到通用页面
		currencyBtn(i) {
			if (i == 2) {
				uni.navigateTo({
					url: '../../../parenting/currency/currency'
				});
			}
		},
		//8宫格页面跳转
		eightiBtn(i) {
			if (i == 0) {
				uni.navigateTo({
					url: '../../../parenting/myCommunity/myCommunity'
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.me {
	// 1.头部头像和个人消息
	#bg{
		filter:blur(10px);
		-webkit-filter:blur(10px);
		-moz-filter:blur(10px);
		-ms-filter:blur(10px);
		-o-filter:blur(10px);
	}
	.top {
		width: 100%;
		height: 610rpx;
		position: relative;
		color: white;
		font-size: 17px;

		.con {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 50;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// margin: auto;
		}

		// background: url(../../../static/images/me/myBg.jpg);
		// background-size: 100% 100%;
		.topImg {
			width: 140rpx;
			height: 140rpx;
			image {
				border-radius: 50%;
			}
		}

		.topText {
			margin: 18rpx 0 6rpx;
		}

		// 1.3编辑资料
		.topFoot {
			display: flex;
			flex-direction: row;
			font-size: 13px;
			align-items: center;

			.topFootImg {
				width: 36rpx;
				height: 36rpx;
				margin-right: 8rpx;
			}
		}
	}

	// 2.四宫格
	.four {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		font-size: 10px;
		padding: 38rpx 0;
		border-radius: 6px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
		//相对定位，让其相对于自己往上偏移一些
		position: relative;
		top: -90rpx;
		margin: 0 24rpx;

		.con {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.conImg {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 16rpx;
			}
		}
	}

	// 3.八宫格
	.eight {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		font-size: 10px;
		padding: 0 0 42rpx 0;
		flex-wrap: wrap;

		> view {
			width: 25%;

			.con {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.conImg {
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 20rpx;
				}

				.text1,
				.text2,
				.text3,
				.text4 {
					margin-bottom: 60rpx;
				}
			}
		}
	}

	//4.底部的页面跳转信息
	.foot {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 32rpx 60rpx;
		margin-bottom: 20rpx;
		align-items: center;

		.footLeft {
			font-size: 16px;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);

			.footImg {
				width: 38rpx;
				height: 38rpx;
				margin-right: 32rpx;
			}
		}

		.footRight {
			width: 30rpx;
			height: 30rpx;
		}
	}
}
</style>
