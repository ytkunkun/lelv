const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const defaultInfo = require('../core/util/default');
const md5 = require('../core/util/md5');
const upload = require('../core/util/upload');
const log = require('../core/util/log');

/**
 * @api {post} user/login 登录
 * @apiDescription 登录
 * @apiName login
 * @apiGroup User
 * @apiParam {int} phone 手机号
 * @apiParam {string} password 密码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
    "data": {
        "msg": "登录成功",
        "info": {
            "user_id": 44,
            "phone": "822202522@qq.com",
            "pwd": "41543f13b1de57f6e02a2eb519d8d47d",
            "nick": "亲子用户_19546",
            "sex": "男",
            "pay_pwd": null,
            "birthday": "2000-01-01 00:00:00",
            "avatar": "/images/default_avatar_user.png",
            "qq": null,
            "coin": 100,
            "state": 1,
            "create_time": "2020-03-19 22:35:27"
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
    mysqlHandle.exec('SELECT * FROM user WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
        log.debug('用户登录 -> 用户名正确 -> 开始验证密码');

        if (res.length > 0) {
            let info = res[0];
            info.avatar="http://"+req.headers.host +info.avatar;
            mysqlHandle.exec('SELECT * FROM user WHERE phone = ? AND pwd = ?', mysqlHandle.formatParams(body.phone, body.password), (res) => {

                if (res.length === 0) {
                    log.debug('用户登录 -> 密码错误 ');
                    resp.json(msgResult.errorResp('密码错误'));
                } else {
                    log.debug('用户登录 -> 密码正确');
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
 * @api {post} user/register 注册
 * @apiDescription 亲子用户注册
 * @apiName register
 * @apiGroup User
 * @apiParam {int} phone 手机号
 * @apiParam {string} password 密码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
    "data": "注册成功"
}
 * @apiSampleRequest http://dkcloud.xyz/user/register
 * @apiVersion 1.0.0
 */

let register = (req, resp) => {
    let body = qs.parse(req.body);

    if (body.phone === undefined || body.password === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    body.password = md5.md5Salt(body.password);// 调用md5 加密
    console.log(body.password);
    mysqlHandle.exec('SELECT * FROM user WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
        if (res.length === 0) {
            log.debug('用户注册 -> 用户名不存在,可以注册...');
            let _default = defaultInfo;
            mysqlHandle.exec('INSERT INTO \`user\` (phone,pwd,nick,sex,birthday,avatar,coin,state,create_time) VALUES (?,?,?,?,?,?,?,?,NOW()) ',
                mysqlHandle.formatParams(body.phone, body.password, _default.nick(), _default.sex,
                    _default.birthday, _default.avatar_user, _default.coin, _default.state), (res) => {
                    if (res.affectedRows >= 1) {
                        log.debug(`用户注册 -> 注册成功：${body.phone}--${body.password}`);
                        resp.json(msgResult.successResp('注册成功'));
                    }
                }, (err) => {
                    log.error('用户注册 -> 数据库插入错误', err);
                });
        } else {
            log.debug('用户注册 -> 用户名已存在');
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
    mysqlHandle.exec('UPDATE user SET phone = ? WHERE phone= ?',
        mysqlHandle.formatParams(body.newphone, body.phone), (res) => {

            resp.json(msgResult.successResp(
                {
                    msg: '手机号修改成功'
                }));
            log.debug('手机号修改成功');
        });
};

/**
 * @api {post} /user/updatePhoneByUserID 通过用户id修改手机号码
 * @apiDescription 通过用户id修改手机号码
 * @apiName updatePhoneByUserID
 * @apiGroup User
 * @apiParam {int} newphone 新手机号
 * @apiParam {string} user_id 用户id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 *  {"code":"ok","data":"修改成功"}
 * @apiSampleRequest http://dkcloud.xyz/user/updatePhoneByUserID
 * @apiVersion 1.0.0
 */
let updatePhoneByUserID = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.newphone === undefined || body.user_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE user SET phone = ? WHERE user_id= ?',
        mysqlHandle.formatParams(body.newphone, body.user_id), (res) => {
            resp.json(msgResult.successResp(
                {
                    msg: '手机号修改成功'
                }));
            log.debug('手机号修改成功');

        });

};

let updateAvatar = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.avatar === undefined || body.phone === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE user SET avatar = ? WHERE phone= ?',
        mysqlHandle.formatParams(body.avatar, body.phone), (res) => {
            resp.json(msgResult.successResp(
                {
                    msg: '头像修改成功'
                }));
            log.debug('头像修改成功');

        });

};
let updateNick = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.nick === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE user SET nick = ? WHERE phone= ?', mysqlHandle.formatParams(body.nick, body.phone), (res) => {
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
    mysqlHandle.exec('UPDATE user SET pwd = ? WHERE phone= ?', mysqlHandle.formatParams(body.password, body.phone), (res) => {
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

    mysqlHandle.exec('UPDATE user SET sex = ? WHERE phone= ?', mysqlHandle.formatParams(body.sex, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '性别修改成功'
            }));
        log.debug('性别修改成功');
    });

};
let updatePayPassword = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.payPassword === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    body.payPassword = md5.md5Salt(body.payPassword);// 调用md5 加密密码
    mysqlHandle.exec('UPDATE user SET pay_pwd = ? WHERE phone= ?', mysqlHandle.formatParams(body.payPassword, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '支付密码修改成功'
            }));
        log.debug('支付密码修改成功');
    });

};
let updateBirthday = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.birthday === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE user SET birthday = ? WHERE phone= ?', mysqlHandle.formatParams(body.birthday, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '生日修改成功'
            }));
        log.debug('生日修改成功');
    });

};
let updateQQ = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.qq === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE user SET qq = ? WHERE phone= ?', mysqlHandle.formatParams(body.qq, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: 'qq修改成功'
            }));
        log.debug('qq修改成功');
    });

};
let updateCoin = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.coin === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE user SET coin = ? WHERE phone= ?', mysqlHandle.formatParams(body.coin, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '乐旅币修改成功'
            }));
        log.debug('乐旅币修改成功');
    });

};
let updateState = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.state === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec('UPDATE user SET state = ? WHERE phone= ?', mysqlHandle.formatParams(body.state, body.phone), (res) => {
        resp.json(msgResult.successResp(
            {
                msg: '账号状态修改成功'
            }));
        log.debug('账号状态修改成功');
    });
};

/**
 * @api {post} user/updateUserInfo 修改用户信息
 * @apiDescription 修改用户信息
 * @apiName updateUserInfo
 * @apiGroup User
 * @apiParam {int} type 类型
 * (0:修改手机号 1:修改密码,2:修改昵称,3:修改性别,4:修改支付密码,5:修改生日,6:修改qq,7:修改乐旅币,8:修改账号状态)
 * @apiParam {int} phone 手机号(可选)  type=0
 * @apiParam {string} password 密码(可选) type=1
 * @apiParam {string} nick 昵称(可选) type=2
 * @apiParam {string} sex 性别(可选) type=3
 * @apiParam {int} payPassword 支付密码(可选) type=4
 * @apiParam {datetime} birthday 生日(可选) type=5
 * @apiParam {int} qq qq账号(可选) type=6
 * @apiParam {int} coin 乐旅币(可选) type=7
 * @apiParam {int} state 账号状态(0:冻结，1:正常)(可选) type=8
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} 修改手机号
 * request：
   data: {
         type:0,
         phone:17759131234,
         newphone:18344991234
    }

 response：
 {
    "code": "ok",
    "data": {
        "msg": "手机号修改成功"
    }
  }
 * @apiSuccessExample {json} 修改密码
 * request：
 data: {
    type: 1
    phone: 17759131234
    password: 123456
}
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "密码修改成功"
        }
     }

 * @apiSuccessExample {json} 修改昵称
 * request：
 data: {
    type: 2
    phone: 17759131234
    nick: 林小锟
}
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "昵称修改成功"
        }
    }
 * @apiSuccessExample {json} 修改性别
 * request：

 data: {
    type: 3
    phone: 17759131234
    sex: '男'
}
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "性别修改成功"
        }
    }
 * @apiSuccessExample {json} 修改支付密码
 * request：
 *
 *
 data: {
    type: 4
    phone: 17759131234
    payPassword: 666666
}
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "支付密码修改成功"
        }
    }

 * @apiSuccessExample {json} 修改生日
 * request：

 data: {
    type: 5
    phone: 1777778822
    birthday: '1997-12-21'

}
 * response：
 {
        "code": "ok",
        "data": {
            "msg": "生日修改成功"
        }
    }

 * @apiSuccessExample {json} 修改qq
 * request：
 *
 data: {
    type: 6
    phone: 1777778822
    qq: 88888888
}

response：
 {
    "code": "ok",
    "data": {
        "msg": "qq修改成功"
    }
}
 * @apiSuccessExample {json} 修改乐旅币
 * request：
 *  data: {
    type: 7
    phone: 1777778822
    coin: 666
}

 * response：
 {
        "code": "ok",
        "data": {
            "msg": "乐旅币修改成功"
        }
    }

 * @apiSuccessExample {json} 修改账号状态
 * request：

 data: {
    type: 8
    phone: 1777778822
    state: 0
}
 * response：
 {
       "code": "ok",
            "data": {
            "msg": "账号状态修改成功"
        }
    }

 * @apiSampleRequest http://dkcloud.xyz/user/updateUserInfo
 * @apiVersion 1.0.0
 */

let updateUserInfo = (req, resp) => {

    let body = qs.parse(req.body);
    console.log(body);
    if (body.type === undefined || body.phone === undefined) {
        resp.json('传入参数不合法');
        return
    }

    if (parseInt(body.type) < 0 || parseInt(body.type) > 10) {
        resp.json('type数值不合法');
        return;
    }

    mysqlHandle.exec('SELECT * FROM user WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
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
                    updatePayPassword(req, resp);
                    break;
                case 5 :
                    updateBirthday(req, resp);
                    break;
                case 6 :
                    updateQQ(req, resp);
                    break;
                case 7 :
                    updateCoin(req, resp);
                    break;
                case 8 :
                    updateState(req, resp);
                    break;
                case 9 :
                    updateAvatar(req, resp);
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
 * @api {post} user/getUserInfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName getUserInfo
 * @apiGroup User
 * @apiParam {int} phone 手机号
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
        "data": {
            "user_id": 1,
            "phone": 1775913932,
            "pwd": "123456",
            "nick": "林小锟",
            "sex": "男",
            "pay_pwd": 123456,
            "birthday": "1997-12-21 00:00:00",
            "avatar": "",
            "qq": 822202522,
            "coin": 9999,
            "state": 1,
            "create_time": "2019-12-18 00:00:00"
        }
}

 * @apiSampleRequest http://dkcloud.xyz/user/getUserInfo
 * @apiVersion 1.0.0
 */


let getUserInfo = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.phone === undefined) {
        resp.json('传入参数不合法');
        return
    }

    mysqlHandle.exec('SELECT * FROM user WHERE phone = ?', mysqlHandle.formatParams(body.phone), (res) => {
        if (res.length > 0) {
            let tmp = res[0];
            tmp.avatar = 'http://' + req.headers.host + tmp.avatar;
            resp.json(msgResult.successResp(tmp));
            log.debug(tmp);
        } else {
            resp.json(msgResult.errorResp('用户信息不存在'));
            log.debug('用户不存在...');
        }

    });
};


/**
 * @api {post} user/getAllUserInfo 获取全部用户信息
 * @apiDescription 获取全部用户信息
 * @apiName getAllUserInfo
 * @apiGroup User
 * @apiParam {int} page 页数(可选参数)
 * @apiParam {int} size 一页展示多少(可选参数)
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
        "data": {
            "user_id": 1,
            "phone": 1775913932,
            "pwd": "123456",
            "nick": "林小锟",
            "sex": "男",
            "pay_pwd": 123456,
            "birthday": "1997-12-21 00:00:00",
            "avatar": "",
            "qq": 822202522,
            "coin": 9999,
            "state": 1,
            "create_time": "2019-12-18 00:00:00"
        }
}

 * @apiSampleRequest http://dkcloud.xyz/user/getAllUserInfo
 * @apiVersion 1.0.0
 */
let getAllUserInfo = (req, resp) => {
    // 先查询总数 再分页
    let body = qs.parse(req.body);
    let sql = `SELECT * FROM user`;
    let params = '';


    mysqlHandle.exec(sql, params, (res) => {
        if (res.length > 0) {
            let total = res.length;
            if (body.page != undefined && body.size != undefined) {
                let page = (parseInt(body.page) - 1) * parseInt(body.size);
                let size = parseInt(body.size);
                sql = `SELECT * FROM user LIMIT ${page}, ${size} `;

                mysqlHandle.exec(sql, params, res => {
                    let tmp = [];
                    res.forEach(item => {
                        let obj;
                        obj = item;
                        obj.avatar = 'http://' + req.headers.host + item.avatar;
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
                    let obj;
                    obj = item;
                    obj.avatar = 'http://' + req.headers.host + item.avatar;
                    tmp.push(obj);
                });
                resp.json(msgResult.successResp(tmp));
                log.debug(tmp);
            }

        } else {
            resp.json(msgResult.errorResp('暂无用户'));
            log.debug('暂无用户...');
        }

    });
};


/**
 * @api {post} search/user 通过手机号或昵称搜索用户信息
 * @apiDescription   通过手机号或昵称搜索用户信息
 * @apiName searchUser
 * @apiParam {string} keyword 搜索内容
 * @apiParam {string} type  phone、nick
 * @apiGroup Search
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/search/user
 * @apiVersion 1.0.0
 */
let searchUser = (req, resp) => {
    let body = qs.parse(req.body);
    let keyword = body.keyword;
    let type = body.type;
    if (type === "phone" || type === "nick") {
        let sql = `select * from user where ${type} LIKE '%${keyword}%'`;
        mysqlHandle.exec(sql, mysqlHandle.formatParams(''),
            res => {
                // let total = res.length;
                // if (body.page != undefined && body.size != undefined) {
                //     let page = (parseInt(body.page) - 1) * parseInt(body.size);
                //     let size = parseInt(body.size);
                //     sql = `select * from user where ${type} LIKE '%${keyword}% LIMIT ${page}, ${size} `;
                //     mysqlHandle.exec(sql, mysqlHandle.formatParams(''), res => {
                //         let tmp = [];
                //         res.forEach(item => {
                //             let obj;
                //             obj = item;
                //             obj.avatar = 'http://' + req.headers.host + item.avatar;
                //             tmp.push(obj);
                //         });
                //         let obj = {
                //             data: tmp,
                //             total: total
                //         };
                //         resp.json(msgResult.successResp(obj));
                //         log.debug(tmp);
                //     });
                // } else {
                let tmp = [];
                res.forEach(item => {
                    let obj;
                    obj = item;
                    obj.avatar = 'http://' + req.headers.host + item.avatar;
                    tmp.push(obj);
                });
                resp.json(msgResult.successResp(tmp));
                log.debug(tmp);
                // }
                // 删除这个1！！！！！！！1
            });
    } else {
        log.debug('type不合法，type应为phone、nick');
        resp.json(msgResult.errorResp('type不合法，type应为phone、nick'));
    }

};


/**
 * @api {post} user/uploadAvatar 上传头像
 * @apiDescription 上传用户头像
 * @apiName uploadAvatar
 * @apiGroup User
 * @apiParam {int} phone 手机号
 * @apiParam {object} formData formData
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 前端：
 <input type="file" name="file" id="file">
 var baseURL = "http://dkcloud.xyz/user/uploadAvatar";
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
        mysqlHandle.exec('UPDATE user SET avatar = ? WHERE phone= ?', mysqlHandle.formatParams(data.relativePath, body.phone), (res) => {
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
 * @api {post} user/deleteUser 删除用户
 * @apiDescription 删除用户
 * @apiName deleteUser
 * @apiGroup User
 * @apiParam {int} user_id 用户id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/user/deleteUser
 * @apiVersion 1.0.0
 */
let deleteUser = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec('select * from user where user_id = ?',
        mysqlHandle.formatParams(body.user_id), res => {
            if (res.length > 0) {
                mysqlHandle.exec(`delete from user where user_id = ?`,
                    mysqlHandle.formatParams(body.user_id), res => {
                        log.debug(res);
                        resp.json(msgResult.successResp('删除成功！'));
                    });
            } else {
                log.debug('user_id 不存在')
                resp.json(msgResult.errorResp('user_id 不存在'));
            }
        });
};


module.exports = {
    login,
    register,
    updateUserInfo,
    getUserInfo,
    uploadAvatar,
    getAllUserInfo,
    updatePhoneByUserID,
    deleteUser,
    searchUser
};