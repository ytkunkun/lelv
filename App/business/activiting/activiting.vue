<template>
	<view class="activiting">
		<view class="static"></view>
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{bagDisplay:bagStyle}"></view>

		<activity :image1="image1" :image2="image2" :image3="image3" :image4="image4" :image5="image5"></activity>
		<view class="seat"></view>
		<view class="pad20 change">
			<view class="data mag20">{{data}}</view>
			<view class="con">
				<view class="li" v-for="(item,index) in conList" :key="index">
					<view class="top">{{item.title}}</view>
					<view class="content">{{item.content}}</view>
					<view class="center">
						<view>{{item.start_time}}</view>
						<view>{{item.type}}活动</view>
					</view>
					<view class="bottom">
						<view>参与人数：{{item.number}}人</view>
						<view>{{item.address}}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import activity from "../components/activity.vue";
	const uploadImg = require('@/components/util/upload.js');
	export default {
		onLoad(option) {
			this.index = option.index;
			// 审核中的活动
			if (this.index == 2) {
				this.image2 = "../../static/images/activityManager/icon23.png"
				this.image3 = "../../static/images/activityManager/icon26@2x.png"
				this.image4 = "../../static/images/activityManager/icon27@2x.png"
				this.image5 = "../../static/images/activityManager/icon28@2x.png"
			}
			//审核通过但未开始的活动
			if (this.index == 3) {
				this.image2 = "../../static/images/activityManager/icon25@2x.png"
				this.image3 = "../../static/images/activityManager/icon38.png"
				this.image4 = "../../static/images/activityManager/icon27@2x.png"
				this.image5 = "../../static/images/activityManager/icon28@2x.png"
			}
			// 正在进行中的活动
			if (this.index == 4) {
				this.image2 = "../../static/images/activityManager/icon25@2x.png"
				this.image3 = "../../static/images/activityManager/icon26@2x.png"
				this.image4 = "../../static/images/activityManager/h1@2x.png"
				this.image5 = "../../static/images/activityManager/icon28@2x.png"
			}
			//已完成的活动
			if (this.index == 5) {
				this.image2 = "../../static/images/activityManager/icon25@2x.png"
				this.image3 = "../../static/images/activityManager/icon26@2x.png"
				this.image4 = "../../static/images/activityManager/icon27@2x.png"
				this.image5 = "../../static/images/activityManager/icon40.png"
			}

			// 调用获取全部活动的接口
			this.http.post("/activity/getAllActivity").then((resolve) => {
				if (resolve.statusCode == 200) {
					if (resolve.data.code == "ok") {
						let array = [];
						let array1 = [];
						let array2 = [];
						array = resolve.data.data;
						for (let i = 0; i < array.length; i++) {
							if (array[i].shop_id == this.$store.state.$shop.shop_id) {
								array1.push(array[i]);
								if (array[i].type == 0) {
									array[i].type = "室内"
								}
								if (array[i].type == 1) {
									array[i].type = "室外"
								}
								if (array[i].type == 2) {
									array[i].type = "野外"
								}
								if (array[i].type == 3) {
									array[i].type = "其他"
								}
							}
						}
						for (let j = 0; j < array1.length; j++) {
							// 审核中的活动
							if (this.index == 2) {
								if (array1[j].state == 0) {
									array2.push(array1[j])
								}
							}
							//审核通过但未开始的活动
							if (this.index == 3) {
								if (array1[j].state == 1) {
									array2.push(array1[j])
								}
							}
							// 正在进行中的活动
							if (this.index == 4) {
								if (array1[j].state == 2) {
									array2.push(array1[j])
								}
							}
							//已完成的活动
							if (this.index == 5) {
								if (array1[j].state == 3) {
									array2.push(array1[j])
								}
							}
						}
						this.conList = array2;
						if (array2.length == 0) {
							this.data = "暂无数据"
						}
					}
				}
			})
		},
		data() {
			return {
				index: "",
				conList: [],
				data: "",
				image1: "../../static/images/activityManager/h2@2x.png",
				image2: "",
				image3: "",
				image4: "",
				image5: "",
				bagStyle: false,
			}
		},
		components: {
			activity
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.activiting {
		.data {
			font-size: 15px;
			color: #666666;
		}

		.seat {
			height: var(--status-bar-height);
			background: white;
		}

		.change {
			margin-top: 300rpx;

			.con {
				.li {
					font-size: 11px;
					color: #666666;
					box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
					border-radius: 6px;
					padding: 48rpx 30rpx;
					margin-bottom: 20rpx;

					.top {
						color: #333333;
						font-size: 15px;
						text-align: center;
						font-weight: bold;
					}

					.content {
						color: #666666;
						font-size: 13px;
						margin: 22rpx 0 28rpx 0;
						line-height: 21px;
					}

					.center {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-bottom: 20rpx;
					}

					.bottom {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
					}
				}

			}
		}


	}
</style>
