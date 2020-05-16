<template>
	<view class="activityManager" :class="{pageHidden:pageState == true}">
		<!-- 点击弹出框后的灰色背景效果 -->
		<view class="bag" :class="{bagDisplay:bagStyle}"></view>
		<view class="static"></view>
		<activity :image1="image1" :image2="image2" :image3="image3" :image4="image4" :image5="image5"></activity>
		<!-- 3.发布活动 -->
		<view class="data"></view>
		<view class="change pad20">
			<view class="release">
				<view v-for="(item,index) in releaseList" :key="index" @click="releaseBtn(item,index)">
					<view class="name">{{item.name}}</view>
					<input :type="item.type?'number':'text'" :placeholder="item.text" v-model="item.con">
					<!-- <input :type="index==2||index==5||index==6||index==7?'number':'text'" :placeholder="item.text" v-model="item.con" class="releaseInput"> -->
				</view>
				<view @click="imgBtn">
					<view class="name">活动图片</view>
					<view class="text">{{imgText}}</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left name">
						开始时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input date text">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left name">
						结束时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date1" :start="startDate1" :end="endDate1" @change="bindDateChange1">
							<view class="uni-input date text">{{date1}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<button class="button btn" @click="addActivityBtn">确认发布</button>
		<view class="success" v-if="successState">
			<view class="top">
				<view class="top1">添加活动操作成功！可在审核中活动查看</view>
				<view class="top2" @click="employeeListBtn">前往审核中活动</view>
			</view>
			<button class="button btnn" @click="cancel">取消</button>

		</view>
		<view class="emptyTips" v-if="emptyTipsShow">
			<view>
				<view class="emptyImg">
					<image class="image" src="../../static/images/bg6.png"></image>
				</view>
				<view class="bigEmptyImg" @click="bigEmptyImgBtn">
					<image class="image" src="../../parenting/static/images/back2@2x.png"></image>
				</view>
				<view class="title">Attention</view>
				<view class="text">{{ emptyText }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入弹出层ui
	import activity from "../components/activity.vue";
	const $upload = require('@/components/util/upload.js');
	export default {
		onLoad() {
			if (this.$store.state.$addActivity.start_time != "") {
				this.date = this.$store.state.$addActivity.start_time;
			}
			if (this.$store.state.$addActivity.end_time != "") {
				this.date1 = this.$store.state.$addActivity.end_time;
			}
			if (this.$store.state.$addActivity.price != "") {
				this.imgText = this.$store.state.$addActivity.price
			}
			this.releaseList[0].con = this.$store.state.$addActivity.title;
			this.releaseList[1].con = this.$store.state.$addActivity.content;
			this.releaseList[2].con = this.$store.state.$addActivity.number;
			this.releaseList[3].con = this.$store.state.$addActivity.address;
			this.releaseList[4].con = this.$store.state.$addActivity.type;
			this.releaseList[6].con = this.$store.state.$addActivity.min_age;
			this.releaseList[7].con = this.$store.state.$addActivity.max_age;
			// this.releaseList[9].con =this.$store.state.$addActivity.start_time;
			// this.releaseList[10].con = this.$store.state.$addActivity.end_time;
		},
		data() {
			//日期选择
			const currentDate = this.getDate({
				format: true
			})
			//日期选择
			const currentDate1 = this.getDate1({
				format: true
			})
			return {
				imgText: "请选择",
				date: currentDate, //日期选择
				date1: currentDate1, //日期选择
				image1: "../../static/images/activityManager/icon24@2x.png",
				image2: "../../static/images/activityManager/icon25@2x.png",
				image3: "../../static/images/activityManager/icon26@2x.png",
				image4: "../../static/images/activityManager/icon27@2x.png",
				image5: "../../static/images/activityManager/icon28@2x.png",
				bagStyle: false,
				type: "",
				successState: false, //添加活动成功后的提示框
				pageState: false,
				emptyTipsShow: false,
				emptyText: "",
				dateError:0,
				releaseList: [{
						name: "活动名称",
						text: "请输入",
						con: "",
					},
					{
						name: "活动内容",
						text: "请输入",
						con: "",
					},
					{
						name: "活动人数",
						text: "请输入",
						con: "",
						type:"number"
						
					},
					{
						name: "活动地点",
						text: "请输入",
						con: "",
					},
					{
						name: "活动类型",
						text: "请选择",
						con: "",
					},
					{
						name: "适合最小年龄",
						text: "请输入",
						con: "",
						type:"number"
					},
					{
						name: "适合最大年龄",
						text: "请输入",
						con: "",
						type:"number"
					},
					{
						name: "单价",
						text: "请输入",
						con: "",
						type:"number"
					},
				]
			}
		},
		computed: {
			//日期选择
			startDate() {
				return this.getDate('start');
			},
			//日期选择
			endDate() {
				return this.getDate('end');
			},
			//日期选择
			startDate1() {
				return this.getDate1('start');
			},
			//日期选择
			endDate1() {
				return this.getDate1('end');
			}
		},
		components: {
			activity
		},
		methods: {
			//日期选择
			bindDateChange: function(e) {
				this.date = e.target.value;
			},
			//日期选择
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//日期选择
			bindDateChange1: function(e) {
				this.date1 = e.target.value
			},
			//日期选择
			getDate1(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 点击选择活动图片
			imgBtn() {
				uni.chooseImage({
					// 调用选择图片的方法
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// sessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址
						this.tmp = tempFilePaths[0]; // 储存图片临时地址
						this.imgText = "图片添加成功"
					}
				});
			},
			releaseBtn(item, i) {
				// 如果为活动类型
				if (i == 4) {
					var obj = {
						"title": this.releaseList[0].con,
						"content": this.releaseList[1].con,
						"number": this.releaseList[2].con,
						"address": this.releaseList[3].con,
						"type": this.releaseList[4].con,
						"min_age": this.releaseList[5].con,
						"max_age": this.releaseList[6].con,
						"price": this.releaseList[7].con,
						"start_time": this.date,
						"end_time": this.date1
					};
					this.$store.commit("setAddActivity", obj);
					uni.navigateTo({
						// url:"../../pages/other/edit/edit"
						url: `../../pages/other/edit/edit?name=${item.name}&text=${item.text}&id=${i}&page=activityManager&type=1`
					})
				}
			},
			// 发布活动按钮点击事件
			addActivityBtn() {
				// 调用添加活动的接口
				this.emptyTipsShow = true;
				this.bagStyle = true;
				this.pageState = true;
				this.dateError = 0;
				console.log(this.date,this.date1)
				// 2020=20=20 
				console.log(this.date.substr(0, 4),this.date1.substr(0, 4))
				console.log(this.date.substr(5, 2),this.date1.substr(5, 2))
				console.log(this.date.substr(8, 4),this.date1.substr(8, 4))
				if (this.date.substr(0, 4) <= this.date1.substr(0, 4)) {
					console.log('开始时间年份小于结束时间年份时间')
					this.dateError = 0;
					if (this.date.substr(5, 2) <= this.date1.substr(5, 2)) {
						console.log('开始时间月份小于结束时间月份时间')
						this.dateError = 0;
						if (this.date.substr(8, 4) <= this.date1.substr(8, 4)) {
							console.log('开始时间日小于结束时间日')
							this.dateError = 0;
						} else {
							this.dateError = 1;
						}
					} else {
						this.dateError = 1;
					}
				} else {
					this.dateError = 1;
				}
				console.log(this.dateError)
				if (this.releaseList[0].con == '') {
					this.emptyText = "活动标题不能为空"
				} else if (this.releaseList[1].con == '') {
					this.emptyText = "活动内容不能为空"
				} else if (this.releaseList[2].con == '') {
					this.emptyText = "活动人数不能为空"
				} else if (this.releaseList[3].con == '') {
					this.emptyText = "活动地点不能为空"
				} else if (this.releaseList[4].con == '') {
					this.emptyText = "请选择活动类型"
				} else if (this.releaseList[5].con == '') {
					console.log('年龄')
					this.emptyText = "适合最小年龄不能为空"
				} else if (this.releaseList[6].con == '') {
					this.emptyText = "适合最大年龄不能为空"
				} else if (this.releaseList[7].con == '') {
					this.emptyText = "活动单价不能为空"
				} else if (this.tmp == '') {
					this.emptyText = "活动图片不能为空"
				} else if (this.releaseList[5].con > this.releaseList[6].con) {
					this.emptyText = "所填年龄范围不对"
				} else if (this.dateError == 1) {
					console.log(this.dateError)
					this.emptyText = "所填日期范围不对";
				} else {
					this.emptyTipsShow = false;
					this.bagStyle = false;
					this.pageState = false;
					let path = this.tmp; //  获取刚刚存的图片临时地址
					if (this.releaseList[4].con == "室内") {
						this.type = 0
					}
					if (this.releaseList[4].con == "室外") {
						this.type = 1
					}
					if (this.releaseList[4].con == "野外") {
						this.type = 2
					}
					if (this.releaseList[4].con == "其他") {
						this.type = 3
					}
					let data = {
						// 添加活动接口需要传入的参数
						// this.$store.state.$shop.shop_id
						shop_id: this.$store.state.$shop.shop_id,
						title: this.releaseList[0].con,
						content: this.releaseList[1].con,
						number: this.releaseList[2].con,
						address: this.releaseList[3].con,
						type: this.type,
						state: 0,
						min_age: this.releaseList[5].con,
						max_age: this.releaseList[6].con,
						price: this.releaseList[7].con,
						start_time: this.date,
						end_time: this.date1,
						image_url: this.tmp
					};
					// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,成功返回的数据，失败返回的数据)
					$upload.upload(this.baseURL + '/activity/addActivity', path, data, res => {
						if (res.code == "ok") {
							if (res.data = "添加了一个新的活动") {
								this.pageState = true;
								this.successState = true;
								this.bagStyle = true;
							}
						}

					});
				}


			},
			// 点击输入不能为空提示框中的×时
			bigEmptyImgBtn() {
				this.emptyTipsShow = false;
				this.bagStyle = false;
				this.pageState = false;
			},
			// 点击成功后的前往员工列表页面按钮,进行页面跳转
			employeeListBtn() {
				var obj = {
					title: "",
					content: "",
					address: "",
					type: "",
					number: "",
					max_age: "",
					min_age: "",
					price: "",
					image_url: ""
				};
				this.$store.commit("setAddActivity", obj)
				this.releaseList[0].con = "";
				this.releaseList[1].con = "";
				this.releaseList[2].con = "";
				this.releaseList[3].con = "";
				this.releaseList[4].con = "";
				this.releaseList[6].con = "";
				this.releaseList[7].con = "";
				this.date = "";
				this.date1 = "";
				uni.redirectTo({
					url: "../activiting/activiting?index=2"
				})
			},
			// 点击成功后的取消按钮,提示框消失
			cancel() {
				var obj = {
					title: "",
					content: "",
					address: "",
					type: "",
					number: "",
					max_age: "",
					min_age: "",
					price: "",
					start_time: "",
					end_time: "",
					image_url: ""
				};
				this.$store.commit("setAddActivity", obj)
				this.releaseList[0].con = "";
				this.releaseList[1].con = "";
				this.releaseList[2].con = "";
				this.releaseList[3].con = "";
				this.releaseList[4].con = "";
				this.releaseList[5].con = "";
				this.releaseList[6].con = "";
				this.releaseList[7].con = "";
				this.date = "";
				this.date1 = "";
				this.successState = false;
				this.bagStyle = false;
				this.pageState = false;
			}
		},
	}
</script>

<style lang="less" scoped>
	.activityManager {
		// 点击修改时间框
		margin-bottom: 140rpx;

		.data {
			height: var(--status-bar-height);
			width: 100vw;
		}

		.change {
			margin-top: 300upx;
			margin-bottom: 150upx;
		}

		.uni-padding-wrap {
			display: none;
			background-color: #FFFFFF;
			z-index: 11;
			width: 200px;
			height: 200px;
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			margin: auto;

		}

		.bagDisplay {
			display: block;
		}



		.release {
			padding-bottom: 120upx;

			>view {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 32upx;
				margin-bottom: 20upx;
				font-size: 13px;

				.releaseInput {
					text-align: right;
					font-size: 13px;
					border: none;
					width: 450rpx;
				}

				.name {
					font-weight: bold;
					color: rgba(102, 102, 102, 1);
				}
			}

			margin-bottom: 150upx;

			.name {
				font-weight: bold;
				color: rgba(102, 102, 102, 1);
			}
		}

		.btn {
			background: #8cbdeb;
			position: fixed;
			bottom: 0;
			z-index: 12;
		}

		// 成功提示框
		.success {
			height: 318rpx;
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
					text-align: center;

				}
			}

			.btnn {
				background: white;
				color: #666666;
				border-radius: 0;
			}
		}

		// 输入框内容空的提示框
		.emptyTips {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 15;

			>view {
				position: relative;
				width: 634rpx;
				height: 262rpx;
			}

			.emptyImg {
				width: 626rpx;
				height: 262rpx;
			}

			.bigEmptyImg {
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				top: -1rpx;
				right: -6rpx;
				z-index: 13;
			}

			.title {
				background: white;
				color: #333333;
				font-size: 17px;
				position: absolute;
				top: 140rpx;
				left: 50%;
				transform: translateX(-50%);
			}

			.text {
				background: white;
				position: absolute;
				top: 205rpx;
				left: 50%;
				transform: translateX(-50%);
				font-size: 13px;
				color: #666666;
			}
		}
	}

	.pageHidden {
		height: 100vh;
		overflow: hidden; //设置超出隐藏,若要有效果,则要设置一个高度
	}
</style>
