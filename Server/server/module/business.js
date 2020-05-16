const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const md5 = require('../core/util/md5');
const future = require('../core/util/future');
const defaultInfo = require('../core/util/default');
const upload = require('../core/util/upload');
const log = require('../core/util/log');

/**
 * @api {post} business/login 登录
 * @apiDescription 登录
 * @apiName login
 * @apiGroup Business
 * @apiParam {int} phone 手机号
 * @apiParam {string} password 密码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 *  {
"code": "ok",
"data": {
    "msg": "登录成功",
         "info": {
            "business_id": 3,
            "phone": "123321",
            "pwd": "123321",
            "nick": "商家用户_13246",
            "avatar": "http://127.0.0.1/images/default.jpg",
            "sex": "男",
            "birthday": "2000-01-01 00:00:00",
            "state": 1,
            "create_time": "2019-12-07 14:23:23",
            "money": 0,
            "qualification_front": null,
            "qualification_back": null,
            "idcard_front": null,
            "idcard_back": null,
            "cooperation_type": null,
            "is_qualification": 0
     }
    }
}
 * @apiSampleRequest http://dkcloud.xyz/user/login
 * @apiVersion 1.0.0
 */
let login = (req, resp) => {

    let body = qs.parse(req.body);

    if (body.phone === undefined || body.password === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    body.password = md5.md5Salt(body.password);// 调用md5 加密密码
    mysqlHandle.exec('SELECT * FROM business WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
        log.debug('login...用户名正确...');

        if (res.length > 0) {
            let info = res[0];
            info.avatar="http://"+req.headers.host +info.avatar;
            mysqlHandle.exec('SELECT * FROM business WHERE phone = ? AND pwd = ?', mysqlHandle.formatParams(body.phone, body.password), (res) => {
                if (res.length === 0) {
                    log.debug('login...密码错误...');
                    resp.json(msgResult.errorResp('密码错误'));
                } else {
                    log.debug('login...密码正确...登录成功...');
                    resp.json(msgResult.successResp({
                        msg: '登录成功',
                        info: info
                    }));
                }
            })
        } else {
            log.debug('用户名不存在...');
            resp.json(msgResult.errorResp('用户名不存在'));
        }
    });
};
/**
 * @api {post} business/register 注册
 * @apiDescription 商家用户注册
 * @apiName register
 * @apiGroup Business
 * @apiParam {int} phone 手机号
 * @apiParam {string} password 密码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 *  {"code":"ok","data":"注册成功"}
 * @apiSampleRequest http://dkcloud.xyz/business/register
 * @apiVersion 1.0.0
 */
let register = (req, resp) => {
    let body = qs.parse(req.body);

    if (body.phone === undefined || body.password === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    body.password = md5.md5Salt(body.password);// 调用md5 加密密码
    mysqlHandle.exec('SELECT * FROM business WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
        if (res.length === 0) {
            log.debug('用户名不存在可以注册...');
            let _default = defaultInfo;
            let sql = `INSERT business(phone,pwd,nick,avatar,sex,birthday,state,create_time,is_qualification,cooperation_type)
             VALUES (?,?,?,?,?,?,?,NOW(),?,?)`;
            let params = mysqlHandle.formatParams(body.phone, body.password, _default.businessNick(), _default.avatar_business, _default.sex, _default.birthday, _default.state, _default.is_qualification, _default.cooperation_type);
            mysqlHandle.exec(sql, params, (res) => {
                if (res.affectedRows >= 1) {
                    // 注册成功 生成一个店铺
                    createStore(req, resp);
                    log.debug(`商家注册成功：${body.phone}--${body.password}`);
                    resp.json(msgResult.successResp('注册成功'));
                }
            }, (err) => {
                log.error('数据库插入错误', err);
            });

        } else {
            log.debug('商家注册：该手机号已注册...');
            resp.json(msgResult.errorResp('该手机号已注册'));

        }
    });

};
let updatePhone = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.newphone === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec('UPDATE business SET phone = ? WHERE phone= ?', mysqlHandle.formatParams(body.newphone, body.phone), (res) => {

        resp.json(msgResult.successResp(
            {
                msg: '手机号修改成功'
            }));
        log.debug('手机号修改成功');

    });

};
let updateNick = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.nick === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec('UPDATE business SET nick = ? WHERE phone= ?', mysqlHandle.formatParams(body.nick, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '昵称修改成功'
            }));
    });

};
let updatePassword = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.password === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    body.password = md5.md5Salt(body.password);// 调用md5 加密密码
    mysqlHandle.exec('UPDATE business SET pwd = ? WHERE phone= ?', mysqlHandle.formatParams(body.password, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '密码修改成功'
            }));
        log.debug('密码修改成功');
    });

};
let updateSex = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.sex === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE business SET sex = ? WHERE phone= ?', mysqlHandle.formatParams(body.sex, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '性别修改成功'
            }));
        log.debug('性别修改成功');
    });

};
let updateBirthday = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.birthday === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE business SET birthday = ? WHERE phone= ?', mysqlHandle.formatParams(body.birthday, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '生日修改成功'
            }));
        log.debug('生日修改成功');
    });

};
let updateMoney = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.money === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE business SET money = ? WHERE phone= ?', mysqlHandle.formatParams(body.money, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '账户余额修改成功'
            }));
        log.debug('账户余额修改成功');
    });

};
let updateState = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.state === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE business SET state = ? WHERE phone= ?', mysqlHandle.formatParams(body.state, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '账号状态修改成功'
            }));
        log.debug('账号状态修改成功');
    });
};
let updateQualification = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.qualification === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec('UPDATE business SET is_qualification = ? WHERE phone= ?', mysqlHandle.formatParams(body.qualification, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '是否认证成功已修改'
            }));

        log.debug('是否认证成功已修改');
    });


};

let cooperation_type = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.cooperation_type === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec('UPDATE business SET cooperation_type = ? WHERE phone= ?', mysqlHandle.formatParams(body.cooperation_type, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '修改合作类型为' + body.cooperation_type
            }));
        log.debug('修改合作类型成功' + body.cooperation_type);
    });


};

let createStore = (req, resp) => {
    let body = qs.parse(req.body);
    let sql = 'SELECT  business_id  FROM business WHERE phone = ? ';
    let params = mysqlHandle.formatParams(body.phone);
    mysqlHandle.exec(sql, params, (res) => {
        let business_id = res[0].business_id;
        mysqlHandle.exec(`INSERT INTO  shop  (business_id,shop_name,create_time,money) VALUES (?,?,NOW(),0)`,
            mysqlHandle.formatParams(business_id, `店铺_${future.getRandom(4)}`), (res) => {
                log.debug(`商家id:${business_id}的店铺创建成功`);
            })
    });
};
/**
 * @api {post} business/updateBusinessInfo 修改用户信息
 * @apiDescription 修改商家信息
 * @apiName updateBusinessInfo
 * @apiGroup Business
 * @apiParam {int} type 类型
 * (0:修改手机号 1:修改密码,2:修改昵称,3:修改性别,4:修改生日,5:修改账户余额,6:修改账号状态，7:是否认证)
 * @apiParam {int} phone 手机号(可选)  type=0
 * @apiParam {string} password 密码(可选) type=1
 * @apiParam {string} nick 昵称(可选) type=2
 * @apiParam {string} sex 性别(可选) type=3
 * @apiParam {datetime} birthday 生日(可选) type=4
 * @apiParam {int} state 账号状态(可选) type=5  (0:冻结，1:正常)
 * @apiParam {int} qualification 是否认证(可选) type=6  (0:未认证，1:认证)
 * @apiParam {int} cooperation_type 合作方式(可选) type=7  (0商家入驻1广告佣金2团购3vip会员4其他)
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} 修改手机号
 * request：
 type:0
 phone:17759131234
 newphone:18344991234
 *
 response：
 {
        "code": "ok",
        "data": {
            "msg": "手机号修改成功"
        }
    }
 * @apiSuccessExample {json} 修改密码
 * request：
 type:1
 phone:17759131234
 password:123456
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "密码修改成功"
        }
     }

 * @apiSuccessExample {json} 修改昵称
 * request：
 type:2
 phone:17759131234
 nick:林小锟
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "昵称修改成功"
        }
    }
 * @apiSuccessExample {json} 修改性别
 * request：
 type:3
 phone:17759131234
 sex:'男'
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "性别修改成功"
        }
    }
 * @apiSuccessExample {json} 修改生日
 * request：
 type:4
 phone:1777778822
 birthday:'1997-12-21'
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "生日修改成功"
        }
    }


 * @apiSuccessExample {json} 修改账号状态
 * request：
 type:5
 phone:1777778822
 state:0
 * response：
 {
       "code": "ok",
            "data": {
            "msg": "账号状态修改成功"
        }
    }
 * @apiSuccessExample {json} 修改认证状态
 * request：
 type:6
 phone:1777778822
 qualification:1
 * response：
 {
       "code": "ok",
            "data": {
            "msg": "是否认证成功已修改"
        }
    }
 * @apiSuccessExample {json} 修改合作类型
 * request：
 type:7
 phone:1777778822
 cooperation_type:1
 * response：
 {
       "code": "ok",
            "data": {
            "msg": "修改合作类型成功"
        }
    }

 * @apiSampleRequest http://dkcloud.xyz/business/updateBusinessInfo
 * @apiVersion 1.0.0
 */

let updateBusinessInfo = (req, resp) => {

    let body = qs.parse(req.body);

    if (body.type === undefined || body.phone === undefined) {
        resp.json('传入参数不合法');
        return
    }

    if (parseInt(body.type) < 0 || parseInt(body.type) > 7) {
        resp.json('type数值不合法');
        return;
    }

    mysqlHandle.exec('SELECT * FROM business WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
        if (res.length > 0) {
            switch (parseInt(body.type)) {
                case 0 :
                    updatePhone(req, resp);
                    break;
                case 1 :
                    updatePassword(req, resp);
                    break;
                case 2:
                    updateNick(req, resp);
                    break;
                case 3 :
                    updateSex(req, resp);
                    break;
                case 4 :
                    updateBirthday(req, resp);
                    break;
                case 5 :
                    updateState(req, resp);
                    break;
                case 6 :
                    updateQualification(req, resp);
                    break;
                case 7 :
                    cooperation_type(req, resp);
                    break;
                default:
                    break;
            }
        } else {
            resp.json(msgResult.errorResp('修改对象不存在'));
            log.debug('type值不存在');
        }
    });

};

/**
 * @api {post} business/getBusinessInfo 获取商家信息
 * @apiDescription 获取商家信息
 * @apiName getBusinessInfo
 * @apiGroup Business
 * @apiParam {int} phone 手机号
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
        "data": {
            "business_id": 3,
            "phone": "123321",
            "pwd": "123321",
            "nick": "商家用户_13246",
            "avatar": "http://127.0.0.1/images/default.jpg",
            "sex": "男",
            "birthday": "2000-01-01 00:00:00",
            "state": 1,
            "create_time": "2019-12-07 14:23:23",
            "money": 0,
            "qualification_front": null,
            "qualification_back": null,
            "idcard_front": null,
            "idcard_back": null,
            "cooperation_type": null,
            "is_qualification": 0
    }
}
 * @apiSampleRequest http://dkcloud.xyz/business/getBusinessInfo
 * @apiVersion 1.0.0
 */
let getBusinessInfo = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.phone === undefined) {
        resp.json('传入参数不合法');
        return
    }

    mysqlHandle.exec('SELECT * FROM business WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
        if (res.length > 0) {
            let tmp = res[0];

            tmp.avatar = 'http://' + req.headers.host + tmp.avatar;

            if (tmp.is_qualification === 1) {
                tmp.qualification_front = 'http://' + req.headers.host + tmp.qualification_front;
                tmp.qualification_back = 'http://' + req.headers.host + tmp.qualification_back;
                tmp.idcard_front = 'http://' + req.headers.host + tmp.idcard_front;
                tmp.idcard_back = 'http://' + req.headers.host + tmp.idcard_back;
            }
            resp.json(msgResult.successResp(tmp));
            log.debug(tmp);
        } else {
            resp.json(msgResult.errorResp('用户信息不存在'));
            log.debug('用户不存在...');
        }

    });
};


/**
 * @api {post} business/getAllBusinessInfo 获取全部商家信息
 * @apiDescription 获取全部商家信息
 * @apiName getAllBusinessInfo
 * @apiGroup Business
 * @apiParam {int} page 页数(可选参数)
 * @apiParam {int} size 一页展示多少(可选参数)
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
        "data": {
            "business_id": 3,
            "phone": "123321",
            "pwd": "123321",
            "nick": "商家用户_13246",
            "avatar": "http://127.0.0.1/images/default.jpg",
            "sex": "男",
            "birthday": "2000-01-01 00:00:00",
            "state": 1,
            "create_time": "2019-12-07 14:23:23",
            "money": 0,
            "qualification_front": null,
            "qualification_back": null,
            "idcard_front": null,
            "idcard_back": null,
            "cooperation_type": null,
            "is_qualification": 0
    }
}
 * @apiSampleRequest http://dkcloud.xyz/business/getAllBusinessInfo
 * @apiVersion 1.0.0
 */
let getAllBusinessInfo = (req, resp) => {
    // 先查询总数 再分页
    let body = qs.parse(req.body);
    let sql = `SELECT * FROM business`;
    let params = '';
    mysqlHandle.exec(sql, params, (res) => {
        if (res.length > 0) {
            let total = res.length;
            if (body.page != undefined && body.size != undefined) {
                let page = (parseInt(body.page) - 1) * parseInt(body.size);
                let size = parseInt(body.size);
                sql = `SELECT * FROM business LIMIT ${page}, ${size} `;
                mysqlHandle.exec(sql, params, res => {
                    let tmp = [];
                    res.forEach(item => {
                        let obj = item;
                        obj.avatar = 'http://' + req.headers.host + obj.avatar;

                        if (obj.is_qualification === 1) {
                            obj.qualification_front = 'http://' + req.headers.host + obj.qualification_front;
                            obj.qualification_back = 'http://' + req.headers.host + obj.qualification_back;
                            obj.idcard_front = 'http://' + req.headers.host + obj.idcard_front;
                            obj.idcard_back = 'http://' + req.headers.host + obj.idcard_back;
                        }
                        tmp.push(obj);
                    });
                    let obj = {
                        data: tmp,
                        total: total
                    };
                    resp.json(msgResult.successResp(obj));
                    log.debug(tmp);
                });

            } else {
                let tmp = [];
                res.forEach(item => {
                    let obj = item;
                    obj.avatar = 'http://' + req.headers.host + obj.avatar;

                    if (obj.is_qualification === 1) {
                        obj.qualification_front = 'http://' + req.headers.host + obj.qualification_front;
                        obj.qualification_back = 'http://' + req.headers.host + obj.qualification_back;
                        obj.idcard_front = 'http://' + req.headers.host + obj.idcard_front;
                        obj.idcard_back = 'http://' + req.headers.host + obj.idcard_back;
                    }
                    tmp.push(obj);

                });
                resp.json(msgResult.successResp(tmp));
                log.debug(tmp);
            }

        } else {
            resp.json(msgResult.errorResp('用户信息不存在'));
            log.debug('用户不存在...');
        }

    });
};


/**
 * @api {post} search/business 通过手机号或昵称搜索商家信息
 * @apiDescription   通过手机号或昵称搜索商家信息
 * @apiName searchBusiness
 * @apiParam {string} keyword 搜索内容
 * @apiParam {string} type  phone、nick
 * @apiGroup Search
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/search/business
 * @apiVersion 1.0.0
 */
let searchBusiness = (req, resp) => {
    let body = qs.parse(req.body);
    let keyword = body.keyword;
    let type = body.type;
    if (type === "phone" || type === "nick") {
        let sql = `select * from business where ${type} LIKE '%${keyword}%'`;
        mysqlHandle.exec(sql, mysqlHandle.formatParams(''),
            res => {
                let tmp = [];
                res.forEach(item => {
                    let obj = item;
                    obj.avatar = 'http://' + req.headers.host + obj.avatar;

                    if (obj.is_qualification === 1) {
                        obj.qualification_front = 'http://' + req.headers.host + obj.qualification_front;
                        obj.qualification_back = 'http://' + req.headers.host + obj.qualification_back;
                        obj.idcard_front = 'http://' + req.headers.host + obj.idcard_front;
                        obj.idcard_back = 'http://' + req.headers.host + obj.idcard_back;
                    }
                    tmp.push(obj);

                });


                resp.json(msgResult.successResp(tmp));
                log.debug(tmp);
            });
    } else {
        log.debug('type不合法，type应为phone、nick');
        resp.json(msgResult.errorResp('type不合法，type应为phone、nick'));
    }

};


/**
 * @api {post} business/uploadAvatar 上传头像
 * @apiDescription 上传用户头像
 * @apiName uploadAvatar
 * @apiGroup Business
 * @apiParam {int} phone 手机号
 * @apiParam {object} formData formData
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 前端：
 <input type="file" name="file" id="file">
 var baseURL = "http://dkcloud.xyz/business/uploadAvatar";

 function uploadImg() {
        let file = document.getElementById('file');
        let formData = new FormData();
        formData.append('file', file.files[0]);
        formData.append('phone', '177');
        axios.post(baseURL, formData)
            .then(res => {
                console.log(res);
            })
    }

 response:
 {
  code: "ok"
  data: {msg: "头像修改成功"}
 }

 * @apiVersion 1.0.0
 */

let uploadAvatar = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.phone === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let uploadResult = upload.uploadImg(req, resp);
    uploadResult.then((data) => {
        mysqlHandle.exec('UPDATE business SET avatar = ? WHERE phone= ?',
            mysqlHandle.formatParams(data.relativePath, body.phone), (res) => {
                resp.json(msgResult.successResp(
                    {
                        msg: '头像修改成功',
                        url: uploadResult.imgURL
                    }));
                log.debug('头像修改成功');
            });
    })
};

/**
 * @api {post} business/uploadCertificates 上传证件
 * @apiDescription 身份证正面、身份证反面、营业执照正面、营业执照反面
 * @apiName uploadCertificates
 * @apiGroup Business
 * @apiParam {int} phone 手机号
 * @apiParam {int} type  type=1(身份证正面) type=2(身份证反面) type=3(营业执照正面) type=4(营业执照反面)
 * @apiParam {object} formData formData
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 * <template>
	<view>
		<button @click="btn(1)">身份证正面</button>
		<button @click="btn(2)">身份证反面</button>
		<button @click="btn(3)">营业执照正面</button>
		<button @click="btn(4)">营业执照反面</button>
		<button type="primary">下一步</button>
	</view>
</template>

<script>
const $upload = require('@/components/util/upload.js');
export default {
	data() {
		return {};
	},
	methods: {
		btn(e) {
			let url = this.baseURL + '/business/uploadCertificates';
			let data = {
				phone: '11111',// 手机号
				type: e//  type=1(身份证正面) type=2(身份证反面) type=3(营业执照正面) type=4(营业执照反面)
			};

			uni.chooseImage({
				// 调用选择图片的方法
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths[0]; // 获取当前选择的图片临时地址，仅选择一张。
					$upload.upload(url, tempFilePaths, data, res => {
						console.log(res);
					});
				}
			});
		}
	}
};
</script>
 * @apiVersion 1.0.0
 */

let uploadCertificates = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.phone === undefined || body.type === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    if (body.type == 1) {
        let uploadResult = upload.uploadImg(req, resp);
        uploadResult.then((data) => {
            mysqlHandle.exec('UPDATE business SET idcard_front = ? WHERE phone= ?',
                mysqlHandle.formatParams(data.relativePath, body.phone), (res) => {
                    log.debug('身份证正面上传成功');
                    resp.json(msgResult.successResp(
                        {
                            msg: '身份证正面上传成功',
                            img: data
                        }));
                });
        })
    } else if (body.type == 2) {
        let uploadResult = upload.uploadImg(req, resp);
        uploadResult.then((data) => {
            mysqlHandle.exec('UPDATE business SET idcard_back = ? WHERE phone= ?',
                mysqlHandle.formatParams(data.relativePath, body.phone), (res) => {
                    log.debug('身份证背面上传成功');
                    resp.json(msgResult.successResp(
                        {
                            msg: '身份证背面上传成功',
                            img: data
                        }));
                });
        })
    } else if (body.type == 3) {
        let uploadResult = upload.uploadImg(req, resp);
        uploadResult.then((data) => {
            mysqlHandle.exec('UPDATE business SET qualification_front = ? WHERE phone= ?',
                mysqlHandle.formatParams(data.relativePath, body.phone), (res) => {
                    log.debug('营业执照正面上传成功');
                    resp.json(msgResult.successResp(
                        {
                            msg: '营业执照正面上传成功',
                            img: data
                        }));
                });
        })
    } else if (body.type == 4) {
        let uploadResult = upload.uploadImg(req, resp);
        uploadResult.then((data) => {
            mysqlHandle.exec('UPDATE business SET qualification_back = ? WHERE phone= ?',
                mysqlHandle.formatParams(data.relativePath, body.phone), (res) => {
                    log.debug('营业执照背面上传成功');
                    resp.json(msgResult.successResp(
                        {
                            msg: '营业执照背面上传成功',
                            img: data
                        }));
                });
        })
    }

};


/**
 * @api {post} business/deleteBusiness 删除用户
 * @apiDescription 删除用户
 * @apiName deleteBusiness
 * @apiGroup Business
 * @apiParam {int}  business_id 商家id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/business/deleteBusiness
 * @apiVersion 1.0.0
 */
let deleteBusiness = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.business_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec('select * from business where business_id = ?',
        mysqlHandle.formatParams(body.business_id), res => {
            if (res.length > 0) {
                mysqlHandle.exec(`delete from business where business_id = ?`,
                    mysqlHandle.formatParams(body.business_id), res => {
                        log.debug(res);
                        resp.json(msgResult.successResp('删除成功！'));
                    });
            } else {
                log.debug('business_id 不存在')
                resp.json(msgResult.errorResp('business_id 不存在'));
            }
        });
};

/**
 * @api {post} /business/updatePhoneByBusinessID 通过用户id修改手机号码
 * @apiDescription 通过用户id 修改手机号码
 * @apiName updatePhoneByBusinessID
 * @apiGroup User
 * @apiParam {int} newphone 新手机号
 * @apiParam {string} business_id 商家id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/business/updatePhoneByBusinessID
 * @apiVersion 1.0.0
 */
let updatePhoneByBusinessID = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.business_id === undefined || body.newphone === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec('UPDATE business SET phone = ? WHERE business_id= ?',
        mysqlHandle.formatParams(body.newphone, body.business_id), (res) => {
            resp.json(msgResult.successResp(
                {
                    msg: '手机号修改成功'
                }));
            log.debug('手机号修改成功');
        });
};

module.exports = {
    login,
    register,
    updateBusinessInfo,
    getBusinessInfo,
    uploadAvatar,
    uploadCertificates,
    getAllBusinessInfo,
    deleteBusiness,
    updatePhoneByBusinessID,
    searchBusiness
};