<template>
	<view class="home">
		<view class="static"></view>
		<!-- 选择城市功能 -->
		<transition name="city mag20">
			<view class="choose" v-if="cityStatic">
				<view class="title">
					<view @click="backBtn">
						<image class="image" src="../../../static/images/return1.png"></image>
					</view>
					<view>选择城市</view>
				</view>
				<view class="sear">
					<view>
						<image class="image" src="../../../static/images/search1.png"></image>
					</view>
					<input type="text" />
				</view>
				<view class="city">
					<view v-for="(item, index) in cityList" :key="index">
						<view class="letter">{{ item.name }}</view>
						<view class="con">
							<view v-for="(element, i) in item.con" :key="i">
								<view>
									<view class="a" :class="{ cityClick: i == clickStatic1 && index == clickStatic2 }" @click="clickBtn(index, i)">{{ element }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</transition>

		<view v-if="conShow">
			<!-- 1.顶部搜索非微信版 -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="search">
				<view class="searchIcon">
					<image class="image" :src="searchIcon"></image>
				</view>
				<input @input="topSearch" type="text" @focus="searchFocus" @blur="searchBlur" />
				<view @click="cityBtn">
					<image class="image" src="../../../static/images/home/region@2x.png"></image>
				</view>
				<view @click="newsJump">
					<image class="image" src="../../../static/images/home/missage@2x.png"></image>
				</view>
			</view>
			<!-- #endif -->
			<!-- 1.顶部搜索微信版 -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="search weixinSearch mag20">
				<view @click="cityBtn">
					<image class="image" src="../../../static/images/home/region@2x.png"></image>
				</view>
				<view class="searchIcon">
					<image class="image" :src="searchIcon"></image>
				</view>
				<input @input="topSearch" type="text" @focus="searchFocus" @blur="searchBlur" />
			</view>
			<!-- #endif -->
			<view class="mag20">
				<!-- 2.轮播图 -->
				<view class="top">
					<swiper :indicator-dots="true" :autoplay="true" class="carousel" skip-hidden-item-layout=" true" indicator-color="rgba(228,228,228,1)"
					 indicator-active-color="white">
						<swiper-item v-for="(item, index) in topImg" :key="index">
							<image :src="item.url" class="carousel" @click="topImgBtn(item.id)"></image>
						</swiper-item>
					</swiper>
				</view>

				<!-- 3.四个功能图标 -->
				<view class="content">
					<view class="con" v-for="(item, index) in conList" :key="index">
						<view class="conImg" @click="iconBtn(index)">
							<image class="image" :src="item.url"></image>
						</view>
						<view>{{ item.txte }}</view>
					</view>
				</view>
				<!-- 4.标题tab -->
				<view class="bottom">
					<view v-for="(tabitem, tabindex) in tabList" :key="tabindex" :class="{ active: tabindex == tabStatic }" @click="tabBtn(tabindex)">{{ tabitem }}</view>
				</view>
				<!-- 5.内容 -->
				<view v-if="noDataStatic" class="noDataTips">暂无符合该条件活动~</view>
				<view class="con acitivity_content">
					<topSearchData class="topSearchData" v-if="topSearchDataShow">暂无数据哦~</topSearchData>
					<view class="left">
						<view v-for="(item, index) in acvitilyConList1" :key="index">
							<image mode="widthFix" :src="item.image_url" class="leftImg" @click="detailsBtn(item.activity_id)"></image>
							<view class="title">{{ item.title }}</view>
							<view class="foot">
								<view>
									<view class="nameImg">
										<image :src="item.avatar" class="image" mode="aspectFill" @click="chatBtn(item.shop_name, item.business_id)"></image>
									</view>
									<view class="name">{{ item.shop_name }}</view>
								</view>
								<view>
									<view class="likeImg">
										<image class="image" src="../../../static/images/home/like.png"></image>
									</view>
									<view>{{ item.followCount }}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="right">
						<view v-for="(item, Rindex) in acvitilyConList2" :key="Rindex">
							<image mode="widthFix" :src="item.image_url" class="leftImg" @click="detailsBtn(item.activity_id)"></image>
							<view class="title">{{ item.title }}</view>
							<view class="foot">
								<view>
									<view class="nameImg">
										<image :src="item.avatar" class="image" mode="aspectFill" @click="chatBtn(item.shop_name, item.business_id)"></image>
									</view>
									<view class="name">{{ item.shop_name }}</view>
								</view>
								<view>
									<view class="likeImg">
										<image class="image" src="../../../static/images/home/like.png"></image>
									</view>
									<view>{{ item.followCount }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<!-- 筛选功能 -->
			<transition name="creen">
				<view class="creen" v-if="creenStatic">
					<view>
						<view class="cre1">
							<view class="title">年龄范围(岁)</view>
							<view class="label label_nput" v-if="filter.ageInput">
								<input type="number" placeholder="最低年龄" v-model="filter.condition.ageInputMin" />
								<view>——</view>
								<input type="number" placeholder="最高年龄" v-model="filter.condition.ageInputMax" />
							</view>
							<view class="label">
								<view v-for="(item, index) in ageList" :key="index" :class="{ labelStyle: index == ageStatic }" @click="ageBtn(index)">{{ item }}</view>
							</view>
							<view class="title">价格区间(元)</view>
							<view class="label label_input" v-if="filter.priceInput">
								<input type="number" placeholder="最低价格" v-model="filter.condition.priceInputMin" />
								<view>——</view>
								<input type="number" placeholder="最高价格" v-model="filter.condition.priceInputMax" />
							</view>
							<view class="label">
								<view v-for="(item, index) in moneyList" :key="index" :class="{ labelStyle: index == moneyStatic }" @click="moneyBtn(index)">{{ item }}</view>
							</view>
							<view class="title">活动类型</view>
							<view class="label">
								<view v-for="(item, index) in activityList" :key="index" :class="{ labelStyle: index == acvitilyStatic }"
								 @click="acvitilyBtn(index)">
									{{ item }}
								</view>
							</view>
							<view class="title">时间选择</view>
							<view class="label">
								<view v-for="(item, index) in timeList" :key="index" :class="{ labelStyle: index == timeStatic }" @click="timeBtn(index)">{{ item }}</view>
							</view>
						</view>
					</view>
					<view class="lastBtn">
						<div @click="returnBtn">返回</div>
						<div @click="sureBtn">确定</div>
					</view>
				</view>
			</transition>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<transition name="creen">
				<view class="creen" v-show="creenStatic">
					<view>
						<view class="cre1">
							<view class="title">年龄范围(岁)</view>
							<view class="label">
								<view v-for="(item, index) in ageList" :key="index" :class="{ labelStyle: index == ageStatic }" @click="ageBtn(index)">{{ item }}</view>
							</view>
							<view class="title">价格区间(元)</view>
							<view class="label">
								<view v-for="(item, index) in moneyList" :key="index" :class="{ labelStyle: index == moneyStatic }" @click="moneyBtn(index)">{{ item }}</view>
							</view>
							<view class="title">活动类型</view>
							<view class="label">
								<view v-for="(item, index) in activityList" :key="index" :class="{ labelStyle: index == acvitilyStatic }"
								 @click="acvitilyBtn(index)">
									{{ item }}
								</view>
							</view>
							<view class="title">时间选择</view>
							<view class="label">
								<view v-for="(item, index) in timeList" :key="index" :class="{ labelStyle: index == timeStatic }" @click="timeBtn(index)">{{ item }}</view>
							</view>
						</view>
					</view>
					<view class="btn">
						<button @click="returnBtn">返回</button>
						<button @click="sureBtn">确定</button>
					</view>
				</view>
			</transition>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// 调用全部活动的接口
			this.http.post('/activity/getAllActivity').then(res => {
				// 状态为ok
				if (res.data.code == 'ok') {
					let array = [];
					let arrayImg = [];
					var con1 = [];
					var con2 = [];
					array = res.data.data;
					this.srcData = array;
					for (let i = 0; i < array.length; i++) {
						if (i % 2 == 0) {
							con1.push(array[i]);
						}
						if (i % 2 == 1) {
							con2.push(array[i]);
						}
						if (i < 3) {
							arrayImg.push({
								url: array[i].image_url,
								id: array[i].activity_id
							});
						}
					}
					this.acvitilyConList1 = con1;
					this.acvitilyConList2 = con2;
					this.topImg = arrayImg;
				}
			});
		},
		data() {
			return {
				topInputValue: '', //顶部搜索框的实时值
				topSearchDataShow: false, //顶部搜索无记录时显示
				acvitilyConList1: [],
				acvitilyConList2: [],
				active: 0,
				creenStatic: false,
				tabStatic: 0,
				cityStatic: false,
				ageStatic: 0,
				moneyStatic: 0,
				acvitilyStatic: 0,
				timeStatic: 0,
				clickStatic1: 0,
				clickStatic2: 0,
				noDataStatic: false,
				searchIcon: '../../../static/images/search1.png',
				topImg: [],
				conShow: true,
				tabList: ['推荐', '附近', '筛选'],
				conList: [{
						url: '../../../static/images/home/ReservationCenter.png',
						txte: '预约中心'
					},
					{
						url: '../../../static/images/home/Parentchildactivities.png',
						txte: '亲子活动'
					},
					{
						url: '../../../static/images/home/Freeexperience.png',
						txte: '免费体验'
					},
					{
						url: '../../../static/images/home/Parentchildteaching.png',
						txte: '亲子教学'
					}
				],
				activity_id: '',
				ageList: ['无限制', '3-5', '6-12', '13-16', '17-19', '自定义'],
				activityList: ['无限制', '室内', '室外', '野外', '其他'],
				moneyList: ['无限制', '1-150', '151-300', '301-500', '500-1000', '自定义'],
				timeList: ['无限制', '1天', '2天', '3天', '5天', '7天', '其他'],
				srcData: [], // 定义一个保存源数据的数组 --dk
				filter: {
					// 筛选条件
					ageInput: false,
					priceInput: false,
					condition: {
						maxAge: 0,
						minAge: 0,
						maxPrice: 0,
						minPrice: 0,
						type: 0,
						time: 0,
						ageInputMax: '',
						ageInputMin: '',
						priceInputMax: '',
						priceInputMin: ''
					}
				},
				cityList: [{
						name: 'A',
						con: [
							'阿城市',
							'阿尔山市',
							'阿克苏市',
							'阿勒泰市',
							'阿图什市',
							'安达市',
							'安国市',
							'安康市',
							'安陆市',
							'安宁市',
							'安庆市',
							'安丘市',
							'安顺市',
							'安阳市',
							'鞍山市',
							'澳门'
						]
					},
					{
						name: 'B',
						con: [
							'巴中市',
							'霸州市',
							'白城市',
							'白山市',
							'白银市',
							'百色市',
							'蚌埠市',
							'包头市',
							'宝鸡市',
							'保定市',
							'保山市',
							'北安市',
							'北海市',
							'北京市',
							'北流市',
							'北宁市',
							'北票市',
							'本溪市',
							'毕节市',
							'滨州市',
							'泊头市',
							'亳州市',
							'博乐市'
						]
					},
					{
						name: 'C',
						con: [
							'沧州市',
							'岑溪市',
							'昌吉市',
							'昌邑市',
							'长春市',
							'长葛市',
							'长乐市',
							'长沙市',
							'长治市',
							'常德市',
							'常宁市',
							'常熟市',
							'常州市',
							'巢湖市',
							'朝阳市',
							'潮州市',
							'郴州市',
							'成都市',
							'承德市',
							'赤壁市',
							'赤峰市',
							'赤水市',
							'崇州市',
							'滁州市',
							'楚雄市',
							'慈溪市',
							'从化市'
						]
					},
					{
						name: 'D',
						con: ['添加', '上海']
					},
					{
						name: 'E',
						con: ['添加', '上海']
					},
					{
						name: 'F',
						con: ['添加', '上海']
					},
					{
						name: 'G',
						con: ['添加', '上海']
					}
				]
			};
		},
		methods: {
			searchFocus() {
				this.searchIcon = '';
			},
			searchBlur() {
				this.searchIcon = '../../../static/images/search1.png';
			},
			// 点击商家头像,跳转到商家聊天界面
			chatBtn(name, id) {
				uni.navigateTo({
					url: `../chat/chat?name=${name}&id=${id}`
				});
			},
			// 顶部的搜索框内容改变时触发
			topSearch(event) {
				this.inputValue = event.target.value;
				// 调用全部活动的接口
				this.http
					.post('/search/activity', {
						keyword: event.target.value,
						type: 'title'
					})
					.then(res => {
						// 状态为ok
						if (res.data.code == 'ok') {
							if (res.data.data.length == 0) {
								this.topSearchDataShow = true;
								this.acvitilyConList2 = '';
								this.acvitilyConList1 = '';
							} else if (res.data.data.length > 0) {
								this.topSearchDataShow = false;
								let array = [];
								let arrayImg = [];
								var con1 = [];
								var con2 = [];
								array = res.data.data;
								for (let i = 0; i < array.length; i++) {
									if (i % 2 == 0) {
										con1.push(array[i]);
									}
									if (i % 2 == 1) {
										con2.push(array[i]);
									}
									if (i <= 2) {
										arrayImg.push(array[i].image_url);
									}
								}
								this.acvitilyConList1 = con1;
								this.acvitilyConList2 = con2;
								this.topImg = arrayImg;
							}
						}
					});
			},
			topImgBtn(i) {
				this.activity_id = i;
				uni.navigateTo({
					url: `../../../parenting/details/details?activity_id=${this.activity_id}&pageType=0`
				});
			},
			//控制中部三个标签点击样式变化事件
			tabBtn(i) {
				//i是循环列表的下标
				//让tabStatic=当前点击的元素下标，从而控制元素样式的添加与否
				this.tabStatic = i;
				//筛选框的显隐事件
				if (i == 0 || i == 1) {
					this.creenStatic = false;
					this.noDataStatic = false;
					// 调用全部活动的接口
					this.http.post('/activity/getAllActivity').then(res => {
						// 状态为ok
						if (res.data.code == 'ok') {
							let array = [];
							let arrayImg = [];
							var con1 = [];
							var con2 = [];
							array = res.data.data;
							this.srcData = array;
							for (let i = 0; i < array.length; i++) {
								if (i % 2 == 0) {
									con1.push(array[i]);
								}
								if (i % 2 == 1) {
									con2.push(array[i]);
								}
								if (i < 3) {
									arrayImg.push({
										url: array[i].image_url,
										id: array[i].activity_id
									});
								}
							}
							this.acvitilyConList1 = con1;
							this.acvitilyConList2 = con2;
							this.topImg = arrayImg;
						}
					});
					
				}
				//如果点击的元素是筛选（下标为2）时，触发
				if (i == 2) {
					//改变creenStatic的状态，从而控制筛选框的显示与否
					this.creenStatic = !this.creenStatic;
				}
			},
			sureBtn() {
				// 筛选确认按钮
				this.creenStatic = false;
				// #ifndef MP-WEIXIN 
				let [...data] = this.srcData; // 深拷贝源数组
				let filter = this.filter.condition;
				let max_a, min_a, max_p, min_p, time, type;
				if (this.filter.ageInput) {
					if (filter.ageInputMin == '') {
						min_a = 'null';
					} else {
						min_a = filter.ageInputMin;
					}

					if (filter.ageInputMax == '') {
						max_a = 'null';
					} else {
						max_a = filter.ageInputMax;
					}
				} else {
					max_a = filter.maxAge;
					min_a = filter.minAge;
				}
				if (this.filter.priceInput) {
					if (filter.priceInputMin == '') {
						min_p = 'null';
					} else {
						min_p = filter.priceInputMin;
					}

					if (filter.priceInputMax == '') {
						max_p = 'null';
					} else {
						max_p = filter.priceInputMax;
					}
				} else {
					max_p = filter.maxPrice;
					min_p = filter.minPrice;
				}
				type = filter.type;
				time = filter.time;

				// 这里开始执行筛选
				// 筛选活动类型
				let f1 = data.filter(e => {
					// type 0 不筛选 1室内 2室外 3野外 4其他
					if (type == 0) {
						return true;
					} else {
						if (e.type == type) {
							return true;
						}
					}
				});

				// 筛选价格
				let f2 = f1.filter(e => {
					if (max_p == 0 && min_p == 0) {
						return true;
					} else {
						if (e.price <= max_p && e.price >= min_p) {
							return true;
						}
					}
				});
				// 筛选年龄
				let f3 = f2.filter(e => {
					if (max_a == 0 && min_a == 0) {
						return true;
					} else {
						if (e.max_age <= max_a && e.min_age >= min_a) {
							return true;
						}
					}
				});

				let f4 = f3.filter(e => {
					let diff = this.difftime(e.start_time, e.end_time);
					let day = diff.days + 1;
					if (time == 0 && time == 0) {
						return true;
					} else {
						if (day == time) {
							return true;
						} else if (day > time) {
							return true;
						}
					}
				});
				// 以下是上面原封不动复制过来数组改成筛选后的
				this.topSearchDataShow = false;
				let array = [];

				var con1 = [];
				var con2 = [];
				if(f4.length == 0){
					this.noDataStatic = true;
				} else{
					this.noDataStatic = false;
				}
				for (let i = 0; i < f4.length; i++) {
					if (i % 2 == 0) {
						con1.push(f4[i]);
					}
					if (i % 2 == 1) {
						con2.push(f4[i]);
					}
				}
				this.acvitilyConList1 = con1;
				this.acvitilyConList2 = con2;
				this.creenStatic = false;
				let str = `筛选条件:最大年龄${max_a} 最小年龄${min_a} 最大价格${max_p} 最小价格${min_p} 类型${type} 时间${time}`;
				// #endif
			},
			difftime(s, e) {
				// 计算开始结束时间差 导出时间
				var date3 = new Date(e).getTime() - new Date(s).getTime(); //时间差的毫秒数
				//计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000));
				//计算出小时数
				var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000));
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000));
				//计算相差秒数
				var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000);
				return {
					days: days,
					hours: hours,
					minutes: minutes,
					seconds: seconds
				};
			},
			// 点击筛选面板的返回按钮,使筛选面板隐
			returnBtn() {
				this.creenStatic = false;
				this.creenStatic = false;
				this.topSearchDataShow = false;
				let array = [];
				var con1 = [];
				var con2 = [];
				for (let i = 0; i < this.srcData.length; i++) {
					if (i % 2 == 0) {
						con1.push(this.srcData[i]);
					}
					if (i % 2 == 1) {
						con2.push(this.srcData[i]);
					}
				}
				this.acvitilyConList1 = con1;
				this.acvitilyConList2 = con2;
				this.creenStatic = false;
			},

			cityBtn() {
				this.cityStatic = !this.cityStatic;
				this.conShow = !this.conShow;
			},

			backBtn() {
				this.cityStatic = false;
				this.conShow = !this.conShow;
			},
			//四个图标的跳转事件
			iconBtn(i) {
				//亲子活动的跳转界面
				if (i == 1) {
					uni.navigateTo({
						url: '../../../parenting/activity/activity'
					});
				}
				if (i == 0) {
					uni.getSystemInfo({
						success: function(res) { // res - 各种参数
							let info = uni.createSelectorQuery().select('.static');
							info.boundingClientRect(function(height) {}).exec();
						}
					});
				}
			},
			//点击活动内容进入该活动详情页面
			detailsBtn(activity_id) {
				uni.navigateTo({
					url: `../../../parenting/details/details?activity_id=${activity_id}&pageType=0`
				});
			},
			ageBtn(i) {
				this.ageStatic = i;

				if (i == 5) {
					this.filter.ageInput = true;
				} else {
					this.filter.ageInput = false;
				}
				// 点击筛选年龄
				if (i == 0) {
					this.filter.condition.maxAge = 0;
					this.filter.condition.minAge = 0;
				} else if (i == 1) {
					this.filter.condition.maxAge = 5;
					this.filter.condition.minAge = 3;
				} else if (i == 2) {
					this.filter.condition.maxAge = 12;
					this.filter.condition.minAge = 6;
				} else if (i == 3) {
					this.filter.condition.maxAge = 16;
					this.filter.condition.minAge = 13;
				} else if (i == 4) {
					this.filter.condition.maxAge = 19;
					this.filter.condition.minAge = 17;
				}
			},
			moneyBtn(i) {
				this.moneyStatic = i;
				if (i == 5) {
					this.filter.priceInput = true;
				} else {
					this.filter.priceInput = false;
				}
				// 点击筛选价格
				if (i == 0) {
					this.filter.condition.maxPrice = 0;
					this.filter.condition.minPrice = 0;
				} else if (i == 1) {
					this.filter.condition.maxPrice = 150;
					this.filter.condition.minPrice = 1;
				} else if (i == 2) {
					this.filter.condition.maxPrice = 300;
					this.filter.condition.minPrice = 151;
				} else if (i == 3) {
					this.filter.condition.maxPrice = 500;
					this.filter.condition.minPrice = 301;
				} else if (i == 4) {
					this.filter.condition.maxPrice = 1000;
					this.filter.condition.minPrice = 500;
				}
			},
			acvitilyBtn(i) {
				this.acvitilyStatic = i;
				if (i == 0) {
					this.filter.condition.type = 0;
				} else if (i == 1) {
					this.filter.condition.type = 1;
				} else if (i == 2) {
					this.filter.condition.type = 2;
				} else if (i == 3) {
					this.filter.condition.type = 3;
				} else if (i == 4) {
					this.filter.condition.type = 4;
				}
			},
			timeBtn(i) {
				this.timeStatic = i;
				if (i == 0) {
					this.filter.condition.time = 0;
				} else if (i == 1) {
					this.filter.condition.time = 1;
				} else if (i == 2) {
					this.filter.condition.time = 2;
				} else if (i == 3) {
					this.filter.condition.time = 3;
				} else if (i == 4) {
					this.filter.condition.time = 5;
				} else if (i == 5) {
					this.filter.condition.time = 7;
				} else if (i == 6) {
					this.filter.condition.time = 8;
				}
			},
			// 点击选择城市页面中的某一城市
			clickBtn(index, i) {
				this.clickStatic1 = i;
				this.clickStatic2 = index;
				this.cityStatic = false;
				this.conShow = !this.conShow;
			},
			// 点击消息图标进行页面跳转
			newsJump() {
				uni.switchTab({
					url: '../news/news'
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.home {
		// margin-top: 40rpx;
		top: var(--status-bar-height);
		position: relative;
		letter-spacing: 1px;

		// 筛选框的动画样式
		// 出现前的位置
		.creen-enter,
		.creen-leave-to {
			transform: translateX(400rpx);
			opacity: 1;
		}

		.creen-enter-active,
		.creen-leave-active {
			transition: all 3s;
		}

		// 城市框的动画样式
		// 出现前的位置
		.city-enter,
		.city-leave-to {
			transform: translateX(-750rpx);
			opacity: 1;
		}

		.city-enter-active,
		.city-leave-active {
			transition: all 2s;
		}

		//顶部搜索
		.search {
			height: 54rpx;
			padding: 22rpx 0 30rpx 0;
			width: 100vw;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			top: var(--status-bar-height);
			background: white;
			z-index: 12;

			input {
				height: 54rpx;
				padding: 10rpx 0 10rpx 70rpx;
			}

			image {
				width: 46rpx;
				height: 46rpx;
			}

			.searchIcon {
				position: absolute;
				top: 31rpx;
				left: 50rpx;

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}

			input {
				background: rgba(232, 232, 232, 1);
				width: 500rpx;
				border-radius: 3px;
				padding: 2rpx 15rpx;
				box-sizing: border-box;
				font-size: 13px;
			}
		}

		.weixinSearch {
			justify-content: flex-start;

			image {
				margin-right: 40rpx;
			}

			.searchIcon {
				left: 110rpx;
			}
		}

		//轮播图
		.top {
			width: 100%;
			height: 320rpx;
			margin: 90rpx 0 0 0;

			.carousel {
				image {
					width: 100%;
					height: 100%;
					border-radius: 6px;
				}
			}
		}

		// 3.四个功能图标
		.content {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 20rpx 20rpx 60rpx;
			font-size: 8px;

			.con {
				display: flex;
				flex-direction: column;
				align-items: center;

				.conImg {
					width: 84rpx;
					height: 84rpx;
					margin-bottom: 28rpx;
				}
			}
		}

		// 4.标题tab
		.bottom {
			display: flex;
			flex-direction: row;
			font-size: 14px;
			justify-content: center;
			margin-top: 12rpx;
			align-items: baseline;

			view {
				padding-bottom: 8rpx;
			}

			//tab点击后的样式
			.active {
				font-size: 18px;
				font-weight: bold;
				border-bottom: #fc9898 2px solid;
				border-radius: 1px;
			}

			>view {
				margin: 0 20rpx;
			}
		}

		.acitivity_content {
			min-height: 1100rpx !important;
		}

		// 5.内容
		.con {
			font-size: 10px;
			margin-top: 28rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.topSearchData {
				width: 300rpx;
				// background: pink;
				font-size: 16px;
				// color: ;
			}

			.left,
			.right {
				width: 335rpx;
				background: white;

				>view {
					margin-bottom: 30rpx;
					box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
					border-radius: 6px;
				}

				.leftImg {
					width: 335rpx;
					border-radius: 6px 6px 0 0;
				}

				.title {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					font-size: 12px;
					margin: 14rpx 20rpx 20rpx 20rpx;
				}

				.foot {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin: 0 20rpx;
					padding-bottom: 20rpx;

					>view {
						display: flex;
						flex-direction: row;
						align-items: center;

						.nameImg {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							margin-right: 12rpx;

							image {
								border-radius: 50%;
							}
						}

						.name {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 160rpx;
						}

						.likeImg {
							width: 40rpx;
							height: 40rpx;
							margin-right: 3rpx;
						}
					}
				}
			}
		}

		// 筛选框
		.creen {
			padding: 0 10rpx;
			font-size: 10px;
			width: 370rpx;
			box-shadow: 0px 3px 12px rgba(97, 97, 97, 0.16);
			border-radius: 6px 0px 0px 6px;
			position: absolute;
			background: white;
			top: 630rpx;
			left: 370rpx;

			>view {
				>view {
					padding: 20rpx 0 4rpx 0;
					border-bottom: 1px solid #8f8f94;
				}

				& view:last-child {
					border-bottom: none;
				}
			}

			.title {
				margin-bottom: 18rpx;
			}

			.label {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				letter-spacing: 0.1px;
				font-size: 10px;

				>view,
				input {
					flex: 0 0 31%;
					box-sizing: border-box;
					font-size: 10px;
					// width: 105rpx;
					margin: 0 5rpx;
					// padding: 5rpx;
					height: 46rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 16rpx;
					border: 1px solid rgba(243, 243, 243, 1) !important;
					border-radius: 2px;
					text-align: center;
				}
			}

			.label_input {
				view {
					border: none !important;
				}

				input {
					text-align: center;
				}
			}

			.lastBtn {
				padding: 20rpx 0;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;

				>div {
					padding: 0px;
					margin: 0px;
					width: 90rpx;
					height: 48rpx;
					background: #fc9898;
					font-size: 10px;
					color: white;
					border-radius: 2px;
					line-height: 48rpx;
					text-align: center;
					border: 2px solid #fc9898;
					// display: flex;
					// justify-content: center;
					// align-items: center;
				}

				& div:nth-child(2) {
					margin: 0 10rpx 0 20rpx;

				}
			}
			.btn {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
				padding: 20rpx 0;
			
				>button {
					margin: 0;
					padding: 0;
					width: 90rpx;
					height: 48rpx;
					background: #fc9898;
					font-size: 10px;
					line-height: 41rpx;
					color: white;
					border-radius: 2px;
					display: flex;
					justify-content: center;
					align-items: center;
					// border: 1px solid #fc9898;
				}
			
				& button:nth-child(2) {
					margin-left: 20rpx;
				}
			}
		}

		// 筛选框点击后的样式
		.labelStyle {
			background-color: #fc9898;
			color: white;
		}

		//选择城市功能
		.choose {
			position: absolute;
			z-index: 11;
			left: -10rpx;
			background: white;
			overflow-y: auto;
			padding: 0 24rpx;

			.title {
				display: flex;
				flex-direction: row;
				font-size: 20px;
				align-items: center;
				font-weight: bold;
				padding-top: 38rpx;
				color: rgba(51, 51, 51, 1);

				& view:first-child {
					width: 46rpx;
					height: 46rpx;
					margin-right: 42rpx;
				}
			}

			.sear {
				display: flex;
				flex-direction: row;
				font-size: 15px;
				align-items: center;
				padding: 26rpx 0 15rpx 0;

				& view:first-child {
					width: 46rpx;
					height: 46rpx;
					margin-right: 42rpx;
				}

				input {
					background: #e8e8e8;
					width: 536rpx;
					height: 46rpx;
					padding: 5rpx 15rpx;
					box-sizing: border-box;
					border-radius: 3px;
					font-size: 14px;
					display: flex;
					align-items: center;
				}
			}

			.city {
				>view {
					.letter {
						padding: 18rpx 0 14rpx 16rpx;
						font-size: ;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
					}

					.con {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						align-items: center;
						font-size: 12px;
						justify-content: flex-start;

						>view {
							width: 25%;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-bottom: 20rpx;

							.a {
								background: #f3f3f3;
								width: 144rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								height: 76rpx;
								border-radius: 3px;
							}

							// 点击城市后的样式
							.cityClick {
								background: #fc9898;
								color: white;
							}
						}
					}
				}
			}
		}

		// 选择城市后更改背景颜色
		.show {
			background: #fc9898;
			color: white;
		}
	}
</style>
