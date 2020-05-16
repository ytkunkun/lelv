import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		requestLoading: false, //加载等待是否显示
		$identity: {
			i:""
		},
		$parenting: {
			user_id:"",
			phone: "",
			pwd: "",
			nick: "",
			sex: "",
			pay_pwd: "",
			birthday: "",
			avatar: "",
			qq: "",
			coin: "",
			state: "",
			create_time: "",
		},
		$business: {
			business_id: "",
			phone: "",
			pwd: "",
			nick: "",
			avatar: "",
			sex: "",
			birthday: "",
			pay_pwd: "",
			state: "",
			create_time: "",
		},
		$shop: {
			shop_id: "",
			shop_name: "",
			address:""
		},
		// $addpwesonnel: {
		// 	phone: "",
		// 	namne: "",
		// 	opst: "",
		// },
		// 添加活动
		$addActivity: {
			shop_id: "",
			title: "",
			content: "",
			address: "",
			type: "",
			state: "",
			number: "",
			image_url: "",
			max_age: "",
			min_age: "",
			price: "请选择",
			start_time: "",
			end_time: "",
		},
		// 添加员工
		$addPersonnel: {
			shop_id: "",
			username: "",
			nick: "",
			permissions: ""
		},
		// 发表文章
		$addArticle:{
			img:"",
			content:"",
			isview:""
		},
	},
	mutations: {
		setParenting(state, params) {
			state.$parenting = params;
		},
		setBusiness(state, params) {
			state.$business = params;
		},
		setShop(state, params) {
			state.$shop = params;
		},
		setAddpwesonnel(state, params) {
			state.$addpwesonnel = params;
		},
		setIdentity(state, params) {
			state.$identity = params;
		},
		setAddActivity(state, params) {
			state.$addActivity = params;
		},
		setAddPersonnel(state, params) {
			state.$addPersonnel = params;
		},
//显示请求加载动画
		request_show_loading(state) {
			state.requestLoading = true;
		},
		//隐藏请求加载动画
		request_hide_loading(state) {
			state.requestLoading = false;
		}

	},





	// state: {
	// 	$identity: JSON.parse(localStorage.getItem('identity')) || {
	// 		i:""
	// 	},
	// 	// 判断在本地存储中是否已经存在一个名为parenting的对象,若不存在则使用下面的默认数据
	// 	$parenting: JSON.parse(localStorage.getItem('parenting')) || {
	// 		user_id: '',
	// 		phone: "",
	// 		pwd: "",
	// 		nick: "",
	// 		sex: "",
	// 		pay_pwd: "",
	// 		birthday: "",
	// 		avatar: "",
	// 		qq: "",
	// 		coin: "",
	// 		state: "",
	// 		create_time: "",
	// 	},
	// 	$business: JSON.parse(localStorage.getItem('business')) || {
	// 		business_id: "",
	// 		phone: "",
	// 		pwd: "",
	// 		nick: "",
	// 		avatar: "",
	// 		sex: "",
	// 		birthday: "",
	// 		pay_pwd: "",
	// 		state: "",
	// 		create_time: "",
	// 	},
	// 	$shop: JSON.parse(localStorage.getItem('shop')) || {
	// 		shop_id: "2",
	// 		shop_name: ""
	// 	},
	// 	$addpwesonnel: JSON.parse(localStorage.getItem('addpwesonnel')) || {
	// 		phone: "",
	// 		namne: "",
	// 		opst: "",
	// 	},
	// 	// 添加活动
	// 	$addActivity:JSON.parse(localStorage.getItem('addpwesonnel')) || {
	// 		shop_id: "",
	// 		title: "",
	// 		content: "",
	// 		address: "",
	// 		type: "",
	// 		state: "",
	// 		number: "",
	// 		namne: "",
	// 		opst: "",
	// 		image_url: "",
	// 		max_age: "",
	// 		min_age: "",
	// 		price: "",
	// 		start_time: "",
	// 		end_time: "",
	// 	},
	// 	// 添加员工
	// 	$addPersonnel:JSON.parse(localStorage.getItem('addPersonnel')) || {
	// 		shop_id:"",
	// 		username: "",
	// 		nick: "",
	// 		permissions: ""
	// 	},
	// },
	// mutations: {
	// 	setParenting(state, params) {
	// 		state.$parenting = params;
	// 		// 在本地存储中添加一个名为parenting的数据,但是由于传入的参数不能为一个对象,所以需要用JSON.stringify将对象转为字符串
	// 		localStorage.setItem('parenting', JSON.stringify(params));
	// 	},
	// 	setBusiness(state, params) {
	// 		state.$business = params;
	// 		localStorage.setItem('business', JSON.stringify(params));
	// 	},
	// 	setShop(state, params) {
	// 		state.$shop = params;
	// 		localStorage.setItem('shop', JSON.stringify(params));
	// 	},
	// 	setAddpwesonnel(state, params) {
	// 		state.$addpwesonnel = params;
	// 		localStorage.setItem('addpwesonnel', JSON.stringify(params));
	// 	},
	// 	setIdentity(state, params) {
	// 		state.$identity = params;
	// 		localStorage.setItem('identity', JSON.stringify(params));
	// 	},
	// 	setAddActivity(state, params) {
	// 		state.$addActivity = params;
	// 		localStorage.setItem('addActivity', JSON.stringify(params));
	// 	},
	// 	setAddPersonnel(state, params) {
	// 		state.$addActivity = params;
	// 		localStorage.setItem('addPersonnel', JSON.stringify(params));
	// 	}

	// },
	// actions: {}
})
export default store;
