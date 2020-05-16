const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const future = require('../core/util/future');
const defaultInfo = require('../core/util/default');
const upload = require('../core/util/upload');
const log = require('../core/util/log');
const common = require('./common');
/**
 * @api {post} shop/getShopInfo  获取店铺信息
 * @apiDescription   获取店铺信息
 * @apiName getShopInfo
 * @apiGroup Shop
 * @apiParam {int} business_id 商家id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/getShopInfo
 * @apiVersion 1.0.0
 */
let getShopInfo = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.business_id === undefined) {
        resp.json('传入参数不合法');
        return;
    }
    let sql = `select * from business where business_id = ?`;
    let params = mysqlHandle.formatParams(body.business_id);
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            mysqlHandle.exec(`select * from shop where business_id = ?`,
                mysqlHandle.formatParams(body.business_id), res => {
                    log.debug(res);
                    resp.json(msgResult.successResp(res));
                });
        } else {
            log.debug('business_id 不存在');
            resp.json(msgResult.errorResp('business_id 不存在'));
        }
    });
};


/**
 * @api {post} shop/getAllShopInfo  获取全部店铺信息
 * @apiDescription   获取全部店铺信息
 * @apiName getAllShopInfo
 * @apiGroup Shop
 * @apiParam {int} page 页数(可选参数)
 * @apiParam {int} size 一页展示多少(可选参数)
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/getAllShopInfo
 * @apiVersion 1.0.0
 */
let getAllShopInfo = (req, resp) => {
    let body = qs.parse(req.body);
    let sql = `select * from shop `;
    let params = '';

    mysqlHandle.exec(sql, params, res => {
        let total = res.length;
        if (body.page != undefined && body.size != undefined) {
            let page = (parseInt(body.page) - 1) * parseInt(body.size);
            let size = parseInt(body.size);
            sql = `SELECT * FROM shop LIMIT ${page}, ${size} `;
            mysqlHandle.exec(sql, params, res => {
                let obj = {
                    data: res,
                    total: total
                }
                log.debug(obj);
                resp.json(msgResult.successResp(obj));
            });
        } else {

            log.debug(res);
            resp.json(msgResult.successResp(res));
        }

    });

};


/**
 * @api {post} search/shop 通过店名搜索店铺
 * @apiDescription   通过店名搜索店铺
 * @apiName searchShop
 * @apiParam {string} keyword 搜索内容
 * @apiGroup Search
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/search/shop
 * @apiVersion 1.0.0
 */
let searchShop = (req, resp) => {
    let body = qs.parse(req.body);
    let keyword = body.keyword;
    let sql = `select * from shop where shop_name LIKE '%${keyword}%'`;
    mysqlHandle.exec(sql, mysqlHandle.formatParams(''),
        res => {
            log.debug(res);
            resp.json(msgResult.successResp(res));
        });


};

/**
 * @api {post} shop/setShopName  修改店铺名称
 * @apiDescription   修改店铺名称
 * @apiName setShopName
 * @apiGroup Shop
 * @apiParam {int} business_id 商家id
 * @apiParam {int} shop_name 店铺名称
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/setShopName
 * @apiVersion 1.0.0
 */
let setShopName = (req, resp) => {

    let body = qs.parse(req.body);
    if (body.business_id === undefined || body.shop_name === undefined) {
        resp.json('传入参数不合法');
        return;
    }
    log.error(body);
    let sql = `update shop set shop_name = ?  where business_id =?`;
    let params = mysqlHandle.formatParams(body.shop_name, body.business_id);
    mysqlHandle.exec(sql, params, res => {
        log.error(res);
        log.debug('修改店铺名称成功');
        resp.json(msgResult.successResp('修改店铺名称成功'));
    });
    mysqlHandle.exec();
};

/**
 * @api {post} shop/setShopAdress  修改店铺地址
 * @apiDescription   修改店铺地址
 * @apiName setShopAdress
 * @apiGroup Shop
 * @apiParam {int} business_id 商家id
 * @apiParam {int} address 地址
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/setShopAdress
 * @apiVersion 1.0.0
 */
let setShopAdress = (req, resp) => {

    let body = qs.parse(req.body);
    if (body.business_id === undefined || body.address === undefined) {
        resp.json('传入参数不合法');
        return;
    }

    let sql = `update shop set address = ?  where business_id =?`;
    let params = mysqlHandle.formatParams(body.address, body.business_id);
    mysqlHandle.exec(sql, params, res => {
        log.debug('修改店铺地址成功');
        resp.json(msgResult.successResp('修改店铺地址成功'));
    });

};


/**
 * @api {post} shop/addMoney  添加金额、收益金额
 * @apiDescription   添加金额、收益金额
 * @apiName addMoney
 * @apiGroup Shop
 * @apiParam {int} business_id 商家id
 * @apiParam {int} money 收益金额
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/addMoney
 * @apiVersion 1.0.0
 */
let addMoney = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.business_id === undefined || body.money === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select  * from shop where business_id= ?`,
        mysqlHandle.formatParams(body.business_id, body.money), res => {
            if (res.length > 0) {
                let shop_id = res[0].shop_id;
                let money = parseInt(res[0].money);
                common.billRecord(shop_id, body.money, 1);

                money += parseInt(body.money);
                let sql = "UPDATE  shop  SET money = ? WHERE business_id = ?";
                let params = mysqlHandle.formatParams(money, body.business_id);
                mysqlHandle.exec(sql, params, res => {


                    log.debug(`收益了${body.money}`);
                    resp.json(msgResult.successResp(`收益了${body.money}`));
                });
            } else {
                resp.json(msgResult.errorResp('business_id不存在'));
            }
        });
};


/**
 * @api {post} shop/drawMoney  提现
 * @apiDescription   提现
 * @apiName drawMoney
 * @apiGroup Shop
 * @apiParam {int} business_id 商家id
 * @apiParam {int} money 提现金额
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/drawMoney
 * @apiVersion 1.0.0
 */
let drawMoney = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.business_id === undefined || body.money === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select  * from shop where business_id= ?`,
        mysqlHandle.formatParams(body.business_id, body.money), res => {
            if (res.length > 0) {
                let shop_id = res[0].shop_id;

                let money = parseInt(res[0].money);
                common.billRecord(shop_id, body.money, 2);
                if (money < body.money) {
                    resp.json(`当前余额为：${money} 无法提现${body.money}`);
                    return;
                }
                money -= parseInt(body.money);
                let sql = "UPDATE  shop  SET money = ? WHERE business_id = ?";
                let params = mysqlHandle.formatParams(money, body.business_id);
                mysqlHandle.exec(sql, params, res => {


                    log.debug(`提现了${body.money}`);
                    resp.json(msgResult.successResp(`提现了${body.money}`));
                });
            } else {
                resp.json(msgResult.errorResp('business_id不存在'));
            }
        });
};

// permissions 1 客服 2管理员

/**
 * @api {post} shop/addEmployee  添加员工
 * @apiDescription   添加员工
 * @apiName addEmployee
 * @apiGroup Shop
 * @apiParam {int} shop_id 店铺id
 * @apiParam {string} username 用户名
 * @apiParam {string} nick 昵称
 * @apiParam {int} permissions 权限  1 客服 2管理员
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/addEmployee
 * @apiVersion 1.0.0
 */
let addEmployee = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.shop_id === undefined || body.username === undefined || body.nick === undefined || body.permissions === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;

    }

    let sql = `INSERT INTO employees (
                        shop_id,
                        nick,
                        username,
                        pwd,
                        image_url,
                        state,
                        permissions,
                        create_time
                    )    VALUES  (  ?,  ?,  ?,  123456,  ?,  1,  ?,  NOW()  );`;
    let params = mysqlHandle.formatParams(body.shop_id, body.nick, body.username, defaultInfo.employee_avatar, body.permissions);

    mysqlHandle.exec(`select * from employees where username =?`, mysqlHandle.formatParams(body.username), res => {
        if (res.length > 0) {
            log.debug('用户名已存在');
            resp.json(msgResult.errorResp('用户名已经存在'));
        } else {
            mysqlHandle.exec(sql, params, res => {
                log.debug(res);

                if (res.affectedRows > 0) {
                    resp.json(msgResult.successResp({
                        msg: '员工添加成功，已生成默认密码',
                        username: body.username,
                        passowrd: '123456'
                    }));

                } else {
                    resp.json(msgResult.successResp('添加失败，用户名已存在或其他'));
                }
            });
        }
    })


};


/**
 * @api {post} shop/getAllEmployee  获取全部员工信息
 * @apiDescription   获取全部员工信息
 * @apiName getAllEmployee
 * @apiGroup Shop
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/getAllEmployee
 * @apiVersion 1.0.0
 */
let getAllEmployee = (req, resp) => {
    let sql = `select * from employees`;
    let params = mysqlHandle.formatParams('');
    mysqlHandle.exec(sql, params, res => {
        let arr = [];
        res.forEach(item => {
            let obj = item;
            obj.image_url = 'http://' + req.headers.host + item.image_url;
            arr.push(obj);

        });
        log.debug(arr);
        resp.json(msgResult.successResp(arr));
    });
};

/**
 * @api {post} shop/deleteEmployee  删除员工
 * @apiDescription   删除员工
 * @apiName deleteEmployee
 * @apiGroup Shop
 * @apiParam {int} employee_id 员工id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/deleteEmployee
 * @apiVersion 1.0.0
 */

let deleteEmployee = (req, resp) => {
    let body = qs.parse(req.body);

    if (body.employee_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select * from employees where employee_id = ?`,
        mysqlHandle.formatParams(body.employee_id), res => {
            log.debug(res)
            if (res.length > 0) {
                let sql = `DELETE FROM employees WHERE employee_id = ?`;
                let params = mysqlHandle.formatParams(body.employee_id);
                mysqlHandle.exec(sql, params, res => {
                    log.debug('删除员工成功');
                    resp.json(msgResult.successResp('删除员工成功'));
                });
            } else {
                log.debug('employee_id不存在');
                resp.json(msgResult.successResp('employee_id不存在'));
            }

        });

};


/**
 * @api {post} shop/setEmployeeState  删除员工
 * @apiDescription   删除员工
 * @apiName setEmployeeState
 * @apiGroup Shop
 * @apiParam {int} employee_id 员工id
 * @apiParam {int} state 状态 0 冻结 1 激活
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/setEmployeeState
 * @apiVersion 1.0.0
 */
let setEmployeeState = (req, resp) => {
    let body = qs.parse(req.body);

    if (body.employee_id === undefined || body.state === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    if (body.state != 1 && body.state != 0) {
        resp.json(msgResult.errorResp('传入state不合法'));
        return;
    }
    mysqlHandle.exec(`select * from employees where employee_id = ?`,
        mysqlHandle.formatParams(body.employee_id), res => {
            if (res.length > 0) {
                let sql = ` update employees set state =? where employee_id = ? `;
                let params = mysqlHandle.formatParams(body.state, body.employee_id);
                mysqlHandle.exec(sql, params, res => {
                    log.debug('修改员工账号状态成功');
                    resp.json(msgResult.successResp('修改员工账号状态成功'));
                });
            } else {
                log.debug('employee_id不存在');
                resp.json(msgResult.successResp('employee_id不存在'));
            }
        });
};

/**
 * @api {post} shop/setEmployeeInfo  修改员工昵称
 * @apiDescription   修改员工信息
 * @apiName setEmployeeInfo
 * @apiGroup Shop
 * @apiParam {int} employee_id 员工id
 * @apiParam {string} nick 昵称
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/setEmployeeInfo
 * @apiVersion 1.0.0
 */
let setEmployeeInfo = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.employee_id === undefined || body.nick === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec(`select * from employees where employee_id = ?`,
        mysqlHandle.formatParams(body.employee_id), res => {
            if (res.length > 0) {
                let sql = ` update employees set nick =? where employee_id = ? `;
                let params = mysqlHandle.formatParams(body.nick, body.employee_id);
                mysqlHandle.exec(sql, params, res => {
                    log.debug('修改员工昵称成功');
                    resp.json(msgResult.successResp('修改员工昵称成功'));
                });
            } else {
                log.debug('employee_id不存在');
                resp.json(msgResult.successResp('employee_id不存在'));
            }
        });
};


/**
 * @api {post} shop/getBill  获取店铺账单
 * @apiDescription   获取店铺账单
 * @apiName getBill
 * @apiGroup Shop
 * @apiParam {int} shop_id 店铺id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/getBill
 * @apiVersion 1.0.0
 */
let getBill = (req, resp) => {
    let body = qs.parse(req.body);

    if (body.shop_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = 'select * from bill where shop_id = ?';
    let params = mysqlHandle.formatParams(body.shop_id);
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {

            log.debug(res);
            resp.json(msgResult.successResp(res));

        } else {

            log.debug('暂无记录');
            resp.json(msgResult.errorResp('暂无记录'));
        }

    });
};

/**
 * @api {post} shop/getAllBill  获取全部店铺账单
 * @apiDescription   获取全部店铺账单
 * @apiName getAllBill
 * @apiGroup Shop
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/shop/getAllBill
 * @apiVersion 1.0.0
 */
let getAllBill = (req, resp) => {


    let sql = 'select * from bill';
    let params = mysqlHandle.formatParams('');
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            log.debug(res);
            resp.json(msgResult.successResp(res));
        } else {

            log.debug('暂无记录');
            resp.json(msgResult.errorResp('暂无记录'));
        }

    });
};

module.exports = {
    getShopInfo, drawMoney, addMoney, setShopName, setShopAdress, getAllShopInfo,
    addEmployee, getAllEmployee, deleteEmployee, setEmployeeState, setEmployeeInfo, getBill, getAllBill, searchShop
};


