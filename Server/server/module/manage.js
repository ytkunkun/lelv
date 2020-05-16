const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const future = require('../core/util/future');
const upload = require('../core/util/upload');
const log = require('../core/util/log');
const md5 = require('../core/util/md5');
const _default = require('../core/util/default');
/**
 * @api {post} manage/login 管理员登录
 * @apiDescription 管理员登录
 * @apiName  managelogin
 * @apiGroup Manage
 * @apiParam {int} username   用户名
 * @apiParam {int} pwd  密码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/manage/login
 * @apiVersion 1.0.0
 */
let login = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.username === undefined || body.pwd === undefined) {
        log.debug('传入参数不合法');
        resp.json(msgResult.errorResp('传入参数不合法'));
    }
    body.pwd = md5.md5Salt(body.pwd);// 加密
    mysqlHandle.exec(`select * from manage where username = ?`, mysqlHandle.formatParams(body.username),
        res => {
            if (res.length > 0) {
                let info = res[0];
                info.avatar = 'http://' + req.headers.host + info.avatar;
                mysqlHandle.exec(`select pwd from manage where username = ?`,
                    mysqlHandle.formatParams(body.username), res => {
                        if (res[0].pwd == body.pwd) {
                            mysqlHandle.exec(`UPDATE manage SET last_time = NOW() WHERE username = ?`
                                , mysqlHandle.formatParams(body.username), res => {
                                    resp.json(msgResult.successResp({
                                        msg: '登入成功',
                                        info: info
                                    }));
                                });
                        } else {
                            resp.json(msgResult.errorResp('密码错误'));
                        }
                    })
            } else {
                resp.json(msgResult.errorResp('账号不存在'));
            }
        })
};

/**
 * @api {post} manage/setPassword 修改管理员密码
 * @apiDescription 修改管理员密码
 * @apiName  setPassword
 * @apiGroup Manage
 * @apiParam {int} username   用户名
 * @apiParam {int} pwd  密码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/manage/setPassword
 * @apiVersion 1.0.0
 */
let setPassword = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.username === undefined || body.pwd === undefined) {
        log.debug('传入参数不合法');
        resp.json(msgResult.errorResp('传入参数不合法'));
    }
    body.pwd = md5.md5Salt(body.pwd); // 加密
    mysqlHandle.exec(`select * from manage where username = ?`, mysqlHandle.formatParams(body.username),
        res => {
            if (res.length > 0) {
                let info = res[0];
                info.avatar = 'http://' + req.headers.host + info.avatar;
                mysqlHandle.exec(`update manage set pwd = ?  where username = ?`,
                    mysqlHandle.formatParams(body.pwd, body.username), res => {
                        resp.json(msgResult.successResp('修改成功'));
                    })
            } else {
                resp.json(msgResult.errorResp('账号不存在'));
            }
        })
};

/**
 * @api {post} manage/register 注册管理员
 * @apiDescription 注册管理员
 * @apiName  register
 * @apiGroup Manage
 * @apiParam {int} username   用户名
 * @apiParam {int} password  密码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/manage/register
 * @apiVersion 1.0.0
 */
let register = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.username === undefined || body.password == undefined) {
        log.debug('传入参数不合法');
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    log.debug('' + body.password);
    body.password = md5.md5Salt(body.password); // 加密
    mysqlHandle.exec(`select * from manage where username = ?`, mysqlHandle.formatParams(body.username), res => {
        if (res.length > 0) {
            resp.json(msgResult.successResp({
                msg: '用户已存在'
            }));
        } else {
            mysqlHandle.exec(`insert into manage (username,pwd,nick,avatar,last_time) values (?,?,?,?,now())`,
                mysqlHandle.formatParams(body.username, body.password, body.username, _default.manage_avatar),
                res => {
                    log.debug(res);
                    resp.json(msgResult.successResp({
                        msg: `注册成功`,
                        info: `管理员${body.username}注册成功`
                    }));
                }, err => {
                    log.error(err)
                });
        }
    });
};

let getManage = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.username === undefined) {
        log.debug('传入参数不合法');
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select * from  manage where username  = ? `,
        mysqlHandle.formatParams(body.username), res => {
            if (res.length > 0) {
                resp.json(msgResult.successResp({
                    info: res,
                    code: 1
                }));
            } else {
                resp.json(msgResult.successResp(
                    {
                        msg: '用户不存在',
                        code: 0
                    }
                ));
            }
        });
};
/**
 * @api {post} manage/getAllManage 获取管理员信息
 * @apiDescription 获取管理员信息
 * @apiName  getAllManage
 * @apiGroup Manage
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/manage/getAllManage
 * @apiVersion 1.0.0
 */
let getAllManage = (req, resp) => {
    mysqlHandle.exec(`select * from manage`, mysqlHandle.formatParams(''),
        res => {
            if (res.length > 0) {
                let tmp = [];
                res.forEach(item => {
                    let obj;
                    obj = item;
                    obj.avatar = 'http://' + req.headers.host + item.avatar;
                    tmp.push(obj);
                });
                resp.json(msgResult.successResp(tmp));
            }
        }, err => {
            log.error(err);
        })

};

module.exports = {
    login, getAllManage, register, setPassword, getManage
};