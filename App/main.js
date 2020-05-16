import Vue from 'vue'
import App from './App'
// 引入vuex
import store from './store';
const http = require('@/components/util/http.js');
const upload = require('@/components/util/upload.js');
// 把vue定义成全局组件
Vue.prototype.$store = store;
Vue.prototype.http = http;
Vue.prototype.$upload = upload;
Vue.config.productionTip = false;


 
//请求加载组件
import requestLoading from './components/loading.vue';
//组件挂载到全局，方便每个页面使用
Vue.component('request-loading', requestLoading);
 
//挂载全局显示/隐藏请求加载动画
function showLoading(){
	store.commit('request_show_loading');
}
function hideLoading(){
	store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();




const baseURL = "http://127.0.0.1";

Vue.prototype.baseURL = baseURL;

App.mpType = 'app'

const app = new Vue({
	...App,
	//挂载
	store
})
app.$mount()
