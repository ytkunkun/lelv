<template>
	<view class="storeManager">
		<view class="static"></view>
		<businessNav title="店铺管理"></businessNav>
		<view class="pad20">
			<!-- 2.店铺名及头像 -->
			<view class="store">
				<view class="left">
					<view class="name">{{shop_name}}</view>
					<!-- <image src="../static/images/return1.png" mode=""></image> -->
					<view>ID:{{shop_id}}</view>
				</view>
				<view class="storeImg">
					<image class="image" :src="avatar" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 3.店铺地址-->
			<view class="address">
				{{address}}
			</view>
			<!-- 4.店铺数据 -->
			<view class="data">
				<view>
					<view>128</view>
					<view>粉丝数</view>
				</view>
				<view>
					<view>6358</view>
					<view>关注度</view>
				</view>
				<view>
					<view>165</view>
					<view>访问量</view>
				</view>
			</view>
			<!-- 5.前三个基本信息 -->
			<view class="news">
				<view class="new" v-for="(item,index) in news1List" :key="index" @click="editoBtn(item,index)">
					<view class="newLeft">
						<view class="leftImg">
							<image class="image" :src="item.img"></image>
						</view>
						<view class="leftText">{{item.name}}</view>
					</view>
					<view class="newRight">
						<view class="rightText" :class="{gry:index == 2}">{{item.text}}</view>
						<view class="rightImg">
							<image class="image" src="../../static/images/returnSmall.png"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 6.后三个基本信息 -->
			<view class="news">
				<view class="new" v-for="(item,index) in news2List" :key="index">
					<view class="newLeft">
						<view class="leftImg">
							<image class="image" :src="item.img"></image>
						</view>
						<view>{{item.name}}</view>
					</view>
					<view class="newRight">
						<view>{{item.text}}</view>
						<view class="rightImg">
							<image class="image" src="../../static/images/returnSmall.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import businessNav from "../components/businessNav.vue";
	export default {
		onLoad() {
			// 调用获取店铺信息
			this.http.post("/shop/getShopInfo", {
				business_id: this.$store.state.$business.business_id
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						this.shop_name = resolve.data.data[0].shop_name;
						this.news1List[0].text = resolve.data.data[0].shop_name;
						this.address = resolve.data.data[0].address;
						this.shop_id = resolve.data.data[0].shop_id;
						// this.news2List[0].text="￥"+resolve.data.data[0].money;

					}
				}
			})
			// 调用商家信息
			this.http.post("/business/getBusinessInfo", {
				phone: this.$store.state.$business.phone
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						this.news1List[1].text = resolve.data.data.nick;
						this.news1List[2].text = resolve.data.data.phone;
						this.avatar = resolve.data.data.avatar;
					}
				}
			})
			// 调用店铺账单接口
			this.http.post("/shop/getBill", {
				shop_id: this.$store.state.$shop.shop_id
			}).then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let array = [];
						array = resolve.data.data;
						for (let i = 0; i < array.length; i++) {
							if (resolve.data.data[i].type = 1) {
								this.collect = this.collect + resolve.data.data[i].money
							} else if (resolve.data.data[i].type = 2) {
								this.out = this.out + resolve.data.data[i].money

							}
							if (this.collect - this.out != 0) {
								this.news2List[0].text = "￥" + (this.collect - this.out);
							}


							// this.money
						}
					}
					// if(resolve.data.code == "error"){
					// 	this.news2List[0].text
					// }
				}
			})
		},
		data() {
			return {
				money: 0,
				shop_name: "",
				address: "",
				shop_id: "",
				nick: "",
				avatar: "",
				collect: 0,
				out: 0,
				news1List: [{
						img: "../static/images/storeManager/Shopname.png",
						name: "店名",
						text: ""
					},
					{
						img: "../static/images/storeManager/Shopkeeper.png",
						name: "店主",
						text: ""
					},
					{
						img: "../static/images/storeManager/telphone.png",
						name: "手机号",
						text: ""
					}
				],
				news2List: [{
						img: "../static/images/storeManager/balance.png",
						name: "店铺余额",
						text: "￥0"
					},
					{
						img: "../static/images/storeManager/agreement.png",
						name: "平台协议",
						text: ""
					},
					{
						img: "../static/images/storeManager/opinion.png",
						name: "意见反馈",
						text: ""
					}
				]
			}
		},
		methods: {
			//点击列表跳转到编辑列表
			editoBtn(item, i) {
				if (i == 0 || i == 1) {
					uni.redirectTo({
						//传入三个参数
						url: `../../pages/other/edit/edit?name=${item.name}&text=${item.text}&id=${i}&page=storeManager&type=0`
					})
				}

			}
		},
		components: {
			businessNav
		}
	}
</script>

<style lang="less" scoped>
	.storeManager {

		// 2.店铺名及头像
		.store {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx 0;
			font-size: 12px;
			border-bottom: 1px solid rgba(246, 246, 246, 1);

			.left {
				display: flex;
				flex-direction: column;
				color: rgba(185, 185, 185, 1);

				.name {
					font-weight: bold;
					font-size: 16px;
					margin-bottom: 16rpx;
					color: #333333;
				}
			}

			.storeImg {
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;

				image {
					border-radius: 50%;
				}
			}
		}

		// 3.店铺地址
		.address {
			font-size: 14px;
			margin: 32rpx 0;
			color: rgba(185, 185, 185, 1);
		}

		// 4.店铺数据
		.data {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 36rpx 88rpx;
			font-size: 15px;
			box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
			border-radius: 6px;
			margin-bottom: 40rpx;
			font-weight: bold;

			>view {
				display: flex;
				flex-direction: column;
				align-items: center;

				& view:nth-child(2) {
					font-size: 14px;
					margin-top: 12rpx;
				}
			}
		}

		.news {
			padding: 16rpx 40rpx 24rpx 40rpx;
			box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
			opacity: 1;
			border-radius: 6rpx;
			margin-bottom: 20rpx;
			font-size: 15px;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);

			.new {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 32rpx 0;
				border-bottom: 1px solid rgba(246, 246, 246, 0.44);

				.newLeft {
					display: flex;
					flex-direction: row;
					align-items: center;

					.leftImg {
						width: 48rpx;
						height: 48rpx;
						margin-right: 24rpx;
					}

					.leftText {
						display: flex;
						justify-content: center;
						align-items: center;
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
						align-items: center;
						justify-content: center;
					}

					.rightText {
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 13px;
					}

					.gry {
						color: #C0C0C0;
					}
				}

			}
		}
	}
</style>
