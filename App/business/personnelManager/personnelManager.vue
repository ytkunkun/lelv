<template>
	<view class="personnelManager">
		<view class="static"></view>
		<businessNav title="人员管理"></businessNav>
		<view class="pad20">
			<!-- 2.基本信息 -->
			<view class="news">
				<view class="new" v-for="(item,index) in newsList" :key="index" @click="newsBtn(index)">
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
	</view>
</template>

<script>
	import businessNav from "../components/businessNav.vue"
	export default {
		data() {
			return {
				newsList: [{
						img: "../static/images/personnelManager/c1@2x.png",
						name: "店员姓名",
						text: "杨芤蔻"
					},
					{
						img: "../static/images/personnelManager/c2@2x.png",
						name: "员工ID",
						text: "457862"
					},
					{
						img: "../static/images/personnelManager/c3@2x.png",
						name: "账号状态",
						text: "正常"
					},
					{
						img: "../static/images/personnelManager/c4@2x.png",
						name: "权限",
						text: ""
					},
					{
						img: "../static/images/personnelManager/c5@2x.png",
						name: "添加员工",
						text: ""
					},
					{
						img: "../static/images/personnelManager/c7@2x.png",
						name: "员工列表",
						text: ""
					}

				]

			}
		},
		methods: {
			//点击返回按钮，返回到首页
			backBtn() {
				uni.navigateTo({
					url: "../home/home"
				})
			},
			// 点击列表中的每一行,跳转到相应的页面
			newsBtn(i) {
				if (i == 4) {
					uni.navigateTo({
						url: "../addPersonnel/addPersonnel"
					})
				}
				if (i == 5) {
					uni.navigateTo({
						url: "../employeeList/employeeList"
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
	.personnelManager {
		.new {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 32rpx;
			margin-bottom: 20rpx;
			color: rgba(187, 187, 187, 1);

			.newLeft {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 15px;

				.leftImg {
					width: 48rpx;
					height: 48rpx;
					margin-right: 32rpx;
				}

				.leftText {
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
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
	}
</style>
