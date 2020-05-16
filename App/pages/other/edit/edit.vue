<template>
	<view class="edit">
		<view class="static"></view>
		<!--  1.顶部导航栏 -->
		<view class="pad20">
		<view class="nav">
			<view>
				<view class="navImg" @click="backBtn">
					<!-- <image class="image" src="../../../parenting/static/images/return1.png"></image> -->
					<image class="image" src="../../../static/images/return1.png" mode=""></image>
				</view>
				<view>{{name}}</view>
				
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="title">
				<button @click="preserveBtn" :class="{blue:btnState == 1}">保存</button>
			</view>
			<!-- #endif -->
		</view>
		<!-- 输入框 -->
		<view class="inp" v-if="type == 0">
			<input type="text" :placeholder="text" v-model="value" placeholder-style='color:rgb(199,199,199);'>
		</view>
		<!-- 单项选择框 -->
		<view v-if="type == 1">
			<!-- <view class="uni-title uni-common-mt uni-common-pl">推荐展示样式</view> -->
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd lab" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" color="#8cbdeb" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<!-- 3.添加图片 -->
		<view class="Img" v-if="type == 2">
			<image class="image" src="../../../parenting/static/images/addImg.png"></image>
		</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="button" :class="{blue:btnState == 1}" @click="preserveBtn">保存</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		// 接受上个页面传递过来的参数
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			if (this.$store.state.$identity.i == 2) {
				this.btnState = 1;
			}
			this.name = option.name; //标题
			if (option.text == 'undefined') {
				this.text = "";
			} else {
				this.text = option.text; //文本
			}

			this.id = option.id; //下标
			this.page = option.page; //页面的标识，用于判断调用哪个接口进行修改数据
			this.type = option.type; //编辑页面的标识，用于控制显示输入框的类型0：input；1：
			if (this.$store.state.$identity == 2) {
				this.btnState = 1;
			}
			// 判断该用什么数据的单选框
			if (this.page == 'activityManager') {
				this.items = this.activityManager;
				this.detail = "室内"
			}
			if (this.page == 'addPersonnel') {
				this.items = this.addPersonnel;
				this.detail = "客服";
				this.state = 1;
				this.backUrl = "../../../business/addPersonnel/addPersonnel";
			}
			
		},
		data() {
			return {
				items: [],
				activityManager: [{
						value: '室内',
						name: '室内'
					},
					{
						value: '室外',
						name: '室外',
						checked: 'true'
					},
					{
						value: '野外',
						name: '野外'
					},
					{
						value: '其他',
						name: '其他'
					},
				],
				addPersonnel: [{
						value: '客服',
						name: '客服',
					},
					{
						value: '管理员',
						name: '管理员',

					},
				],
				current: 0,
				id: "",
				name: "",
				text: "",
				value: "",
				btnState: 0,
				page: "",
				type: "",
				detail: "" ,//单选框选中时的value值
				state:0,//返回键是否直接返回
				backUrl:"",
				returnImg:""
			}
		},
		methods: {
			radioChange: function(evt) {
				this.detail = evt.detail.value;
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						// this.aaa = evt.target.value;
						break;
					}
				}
			},
			//返回按钮，返回上一个界面
			backBtn() {
				if (this.state == 1){
					uni.redirectTo({
						url:this.backUrl
					})
				} else{
					uni.navigateBack({
						delta: 1,
					});
				}
				
			},
			// 点击保存按钮,保存数据,并返回上一个页面
			preserveBtn() {
				if (this.page == 'means') {
					// 调用用户信息接口,更改用户信息
					// id=0说明是昵称,则调用修改昵称接口
					if (this.id == 0) {
						this.http.post("/user/updateUserInfo", {
							type: 2,
							nick: this.value,
							phone: this.$store.state.$parenting.phone
						}, ).then((resolve) => {
							if (resolve.statusCode == 200) {
								if (resolve.data.code == "ok") {
									// 修改成功后,需将数据库中的数据,存储到本地中
									this.http.post('/user/getUserInfo', {
										phone: this.$store.state.$parenting.phone
									}).then(res => {
										if (res.data.code == "ok") {
											let obj = {
												user_id: res.data.data.user_id,
												phone: res.data.data.phone,
												pwd: res.data.data.pwd,
												nick: res.data.data.nick,
												sex: res.data.data.sex,
												pay_pwd: res.data.data.pay_pwd,
												birthday: res.data.data.birthday,
												avatar: res.data.data.avatar,
												qq: res.data.data.qq,
												state: res.data.data.state,
												coin: res.data.data.coin,
												create_time: res.data.data.create_time
											};
											this.$store.commit('setParenting', obj);
										}
									})
									uni.redirectTo({
										url:"../../../parenting/means/means"
									})
								}
							}
						})
					}

				}
				// 如果是发布一个新的活动接口
				if (this.page == 'activityManager') {
					var obj = {
						"title":this.$store.state.$addActivity.title,
						"content":this.$store.state.$addActivity.content,
						"number":this.$store.state.$addActivity.number,
						"address":this.$store.state.$addActivity.address,
						"type": this.detail,
						"min_age": this.$store.state.$addActivity.min_age,
						"max_age": this.$store.state.$addActivity.max_age,
						"price": this.$store.state.$addActivity.price,
						"start_time": this.$store.state.$addActivity.start_time,
						"end_time": this.$store.state.$addActivity.end_time,
					};
					this.$store.commit("setAddActivity",obj)
					uni.redirectTo({
						url: "../../../business/activityManager/activityManager",
						// url: `../../business/addPersonnel/addPersonnel?ID2=${this.detail}`
					})
				}
				// 调用添加员工的接口
				if (this.page == 'addPersonnel') {
					if (this.id == 1) {
						var obj = {
							"username": this.$store.state.$addPersonnel.username,
							"nick": this.value,
							"permissions": this.$store.state.$addPersonnel.permissions
						};
						this.$store.commit('setAddPersonnel', obj);
						uni.redirectTo({
							url: `../../../business/addPersonnel/addPersonnel`
						})
					}
					if (this.id == 2) {
						// this.$store.state.$addpwesonnel.post = this.detail;
						var obj = {
							"username": this.$store.state.$addPersonnel.username,
							"nick": this.$store.state.$addPersonnel.nick,
							"permissions": this.detail
						};
						this.$store.commit('setAddPersonnel', obj);
						uni.redirectTo({
							url: `../../../business/addPersonnel/addPersonnel?ID2=${this.detail}`
						})
					}

				}
				// 如果是修改商店信息
				if (this.page == "storeManager") {
					// 如果下标为0，则调用修改店名的接口
					if (this.id == 0) {
						this.http.post("/shop/setShopName", {
							business_id: this.$store.state.$business.business_id,
							shop_name: this.value
						}).then((resolve) => {
							if (resolve.statusCode == 200) {
								if (resolve.data.code == "ok") {
									// 修改成功后,需将数据库中的数据,存储到本地中
									this.http.post('/shop/getShopInfo', {
										business_id: this.$store.state.$business.business_id
									}).then(res => {
										if (res.data.code == "ok") {
											let obj = {
												shop_id: this.$store.state.$business.business_id,
												shop_name: this.value,
											};
											this.$store.commit('setShop', obj);
											uni.redirectTo({
												url: "../../../business/storeManager/storeManager"
											})
										}
									})

								}
							}
						})
					}
					// 如果下标为1，则调用修改店主名的接口
					if (this.id == 1) {
						this.http.post("/business/updateBusinessInfo", {
							type: 2,
							phone: this.$store.state.$business.phone,
							nick: this.value
						}).then((resolve) => {
							if (resolve.statusCode == 200) {
								if (resolve.data.code == "ok") {
									// 修改成功后,需将数据库中的数据,存储到本地中
									this.http.post('/user/getUserInfo', {
										phone: this.$store.state.$business.phone
									}).then(res => {
										if (res.data.code == "ok") {
											let obj = {
												business_id: res.data.data.business_id,
												phone: res.data.data.phone,
												pwd: res.data.data.pwd,
												nick: this.value,
												sex: res.data.data.sex,
												birthday: res.data.data.birthday,
												state: res.data.data.state,
											};
											this.$store.commit('setParenting', obj);
											uni.redirectTo({
												url: "../../../business/storeManager/storeManager"
											})
										}
									})

								}
							}
						})
					}

				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.edit {

		// 1.顶部导航栏
		.nav {
			display: flex;
			flex-direction: row;
			padding: 22rpx 0 20rpx 0;
			font-size: 17px;
			align-items: center;
			justify-content: space-between;
			margin-top: var(--status-bar-height);
			& view:first-child {
				display: flex;
				flex-direction: row;
				align-items: center;

				.navImg {
					width: 46rpx;
					height: 46rpx;
					margin-right: 230rpx;
					margin-right: 32rpx;
				}
			}

			.title {
				button {
					margin: 0;
					padding: 0;
					padding: 20rpx 15rpx;
					line-height: 9rpx;
					font-size: 13px;
					background: #fc9898;
					color: white;
				}

				.blue {
					background: #8cbdeb;
				}
			}
		}

		// 输入框
		.inp {
			margin-top: 30rpx;

			input {
				padding: 16rpx 22rpx;
				box-sizing: border-box;
				height: 80rpx;
				font-size: 15px;
				border-bottom: 1px solid rgba(112, 112, 112, 0.5);
				border-radius: 1px;
				font-weight: bold;
			}
		}

		// 单项选择框
		.lab {
			// position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 10rpx;

			>view {
				margin-bottom: 30rpx;
				font-size: 16px;
			}
		}

		// 添加图片
		.Img {
			margin: 15rpx 0 0 15rpx;
			width: 276rpx;
			height: 264rpx;
		}
		.button{
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
