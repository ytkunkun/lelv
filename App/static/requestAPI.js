let baseURL = "http://111.229.142.145";
const axios = require('axios');
const qs = require('qs');

// 亲子登录接口
let parentingLogin = (phone, password) => {
	return new Promise((reslove) => {
		let data = {
			phone: phone,
			password: password
		}
		axios.post(baseURL + "/user/login", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {
				// console.log();
			})
	})
}


// 获取用户信息
let getUserInfo = (phone) => {
	return new Promise((reslove) => {
		let data = {
			phone: phone,
		}
		axios.post(baseURL + "/user/getUserInfo", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}

// 上传头像的接口
let uploadAvatar = (phone, formData) => {
	return new Promise((reslove) => {
		let data = {
			phone: phone,
			formData: formData
		}
		axios.post(baseURL + "/user/uploadAvatar", qs.stringify(data))
			.then((res) => {
				reslove(res);
				// console.log(res);
			})
			.catch((err) => {
				// console.log();
			})
	})
}
// 修改用户信息的接口
// 1.修改手机号码
let updatePhone = (phone, newPhone) => {
	return new Promise((reslove) => {
		let data = {
			type: 0,
			phone: phone,
			newPhone: newPhone
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 2.修改密码
let updatePassword = (phone, password) => {
	return new Promise((reslove) => {
		let data = {
			type: 1,
			phone: phone,
			password: password
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 3.修改昵称
let updateNick = (phone, nick) => {
	return new Promise((reslove) => {
		let data = {
			type: 2,
			phone: phone,
			nick: nick
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 4.修改性别
let updateSex = (phone, sex) => {
	return new Promise((reslove) => {
		let data = {
			type: 3,
			phone: phone,
			sex: sex
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 5.修改支付密码
let updatePayment = (phone, payment) => {
	return new Promise((reslove) => {
		let data = {
			type: 4,
			phone: phone,
			payment: payment
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 6.修改生日
let updateBirthday = (phone, birthday) => {
	return new Promise((reslove) => {
		let data = {
			type: 5,
			phone: phone,
			birthday: birthday
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 7.修改qqq号
let updateQQ = (phone, qq) => {
	return new Promise((reslove) => {
		let data = {
			type: 6,
			phone: phone,
			qq: qq
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 8.修改乐旅币
let updateGold = (phone, gold) => {
	return new Promise((reslove) => {
		let data = {
			type: 7,
			phone: phone,
			gold: gold
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {
				// console.log(res);
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 9.修改账号状态
let updateAccountNumber = (phone, accountNumber) => {
	return new Promise((reslove) => {
		let data = {
			type: 8,
			phone: phone,
			accountNumber: accountNumber
		}
		axios.post(baseURL + "/user/updateUserInfo", qs.stringify(data))
			.then((res) => {})
			.catch((err) => {})
	})
}

// 获取单个活动
let getActivity = (activity_id) => {
	return new Promise((reslove) => {
		let data = {
			activity_id: activity_id
		}
		axios.post(baseURL + "/activity/getActivity", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {
				console.log();
			})
	})
}
// 获取全部活动
let getAllActivity = () => {
	return new Promise((reslove) => {
		axios.post(baseURL + "/activity/getAllActivity")
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}
// 获取某个用户的全部文章
let getUserArticle = (user_id) => {
	let data = {
		user_id: user_id
	}
	return new Promise((reslove) => {
		axios.post(baseURL + "/article/getUserArticle", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}
// 获取全部文章
let getAllArticle = () => {
	return new Promise((reslove) => {
		axios.post(baseURL + "/article/getAllArticle")
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}
// 添加文章
let addArticle = (() => {
	return new Promise((reslove) => {
		axios.post(baseURL + "/article/addArticle")
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
})


// 亲子注册接口
let parentingRegister = (phone, password) => {
	return new Promise((reslove) => {
		let data = {
			phone: phone,
			password: password
		}
		axios.post(baseURL + "/user/register", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}
// 商家登录接口
let businessLogin = (phone, password) => {
	return new Promise((reslove) => {
		let data = {
			phone: phone,
			password: password
		}
		axios.post(baseURL + "/business/login", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}

// 商家注册接口
let businessRegister = (phone, password) => {
	return new Promise((reslove) => {
		let data = {
			phone: phone,
			password: password
		}
		axios.post(baseURL + "/business/register", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}
// 获取商家信息
let getBusinessInfo = (phone) => {
	return new Promise((reslove) => {
		let data = {
			phone: phone,
		}
		axios.post(baseURL + "/business/getBusinessInfo", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}

// 获取店铺信息
let getShopInfo = (business_id) => {
	return new Promise((reslove) => {
		let data = {
			business_id: business_id,
		}
		axios.post(baseURL + "/shop/getShopInfo", qs.stringify(data))
			.then((res) => {
				reslove(res);
			})
			.catch((err) => {})
	})
}
//导出
module.exports = {
	parentingLogin,
	parentingRegister,
	businessLogin,
	businessRegister,
	uploadAvatar,
	getUserInfo,
	updatePhone,
	updatePassword,
	updateNick,
	updateSex,
	updatePayment,
	updateBirthday,
	updateQQ,
	updateGold,
	updateAccountNumber,
	getActivity,
	getAllActivity,
	getUserArticle,
	getAllArticle,
	addArticle,
	getBusinessInfo,
	getShopInfo
}
