// 提交订单 订单状态 state 0  取消订单， 1 未支付  2 已支付 3 交易完成
// 支付类型 type 1 支付宝 2 微信
// 选择支付方式 付款
// 收获 结束订单

const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const future = require('../core/util/future');
const upload = require('../core/util/upload');
const log = require('../core/util/log');
/**
 * @api {post} order/addOrder 添加订单
 * @apiDescription 添加订单
 * @apiName addOrder
 * @apiGroup Order
 * @apiParam {int} shop_id 店铺id
 * @apiParam {int} activity_id 活动id
 * @apiParam {int} user_id 用户id
 * @apiParam {int} money 实际付款金额
 * @apiParam {int} count 数量
 * @apiParam {int} price 单价
 * @apiParam {int} total 总价
 * @apiParam {string} note 备注
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 shop_id:1
 activity_id:1
 user_id:1
 money:199
 count:1
 price:199
 total:199
 note:打印发票
 resp:
 {
    "code": "ok",
    "data": "订单生成成功"
   }
 * @apiSampleRequest http://dkcloud.xyz/order/addOrder
 * @apiVersion 1.0.0
 */
let addOrder = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.activity_id === undefined || body.shop_id === undefined || body.user_id === undefined ||
        body.money === undefined || body.count === undefined || body.price === undefined || body.total === undefined ||
        body.note === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    let sql = `INSERT t_order (shop_id,activity_id,user_id,serial,state,money,count,price,total,note,create_time,update_time) 
                VALUES (?,?,?,?,1,?,?,?,?,?,NOW(),NOW())`;
    let serial = future.newID();
    let params = mysqlHandle.formatParams(body.shop_id, body.activity_id, body.user_id, serial, body.money, body.count, body.price, body.total, body.note);
    mysqlHandle.exec(sql, params, (res) => {
        if (res.affectedRows >= 1) {
            log.debug(res);
            resp.json(msgResult.successResp({
                msg: '订单生成成功',
                serial: serial
            }));
        }
    }, (err) => {
        resp.json(msgResult.errorResp('活动id、用户id、店铺id或其他参数不存在'));
        log.error(err);
    });
};


/**
 * @api {post} order/pay 支付订单
 * @apiDescription 支付订单
 * @apiName pay
 * @apiGroup Order
 * @apiParam {int} pay_type 支付类型（1：支付宝 2 ：微信）
 * @apiParam {int} order_id 订单id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 order_id:1
 pay_type:1

 resp:
 {
        "code": "ok",
        "data": "微信支付成功"
    }
 * @apiSampleRequest http://dkcloud.xyz/order/pay
 * @apiVersion 1.0.0
 */
let pay = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.pay_type === undefined || body.order_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select state from t_order where order_id = ?`, mysqlHandle.formatParams(body.order_id), res => {
        let state = res[0].state;
        if (state === 1) {
            let sql = `UPDATE t_order SET state= 2  ,pay_type = ? , pay_time = NOW(),update_time = NOW() WHERE order_id= ?`;
            let params = mysqlHandle.formatParams(body.pay_type, body.order_id);
            mysqlHandle.exec(sql, params, (res) => {
                log.debug(res)
                if (parseInt(body.pay_type) === 1) {
                    resp.json(msgResult.successResp('微信支付成功'));

                } else if (parseInt(body.pay_type) === 2) {
                    resp.json(msgResult.successResp('支付宝支付成功'));
                }
            }, (err) => {
                log.error(err);
                resp.json(msgResult.errorResp('数据类型有误或其他错误'));
            });
        } else {
            log.error('订单已取消或已支付');
            resp.json(msgResult.errorResp('订单已取消或已支付'));
        }
    });

};

/**
 * @api {post} order/orderEnd 订单结束
 * @apiDescription 订单结束
 * @apiName orderEnd
 * @apiGroup Order
 * @apiParam {int} order_id 订单id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 order_id:1
 resp:
 {
        "code": "ok",
        "data": "交易已完成"
    }
 * @apiSampleRequest http://dkcloud.xyz/order/orderEnd
 * @apiVersion 1.0.0
 */
let orderEnd = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.order_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec(`select done_time from t_order where order_id = ? `,
        mysqlHandle.formatParams(body.order_id), res => {
            log.error(res[0].done_time)
            if (res[0].done_time == null) {
                let sql = `UPDATE t_order SET  update_time = NOW() ,close_time = NOW() ,done_time = NOW()  WHERE order_id= ?`;
                let params = mysqlHandle.formatParams(body.order_id);
                mysqlHandle.exec(sql, params, (res) => {

                    log.debug('订单更改为已完成');
                    resp.json(msgResult.successResp('订单更改为已完成'));
                }, (err) => {
                    log.error(err)
                });
            } else {
                resp.json(msgResult.errorResp('该订单已结束'));
            }

        });


};

/**
 * @api {post} order/cancelOrder 取消订单
 * @apiDescription 取消订单
 * @apiName cancelOrder
 * @apiGroup Order
 * @apiParam {int} order_id 订单id
* @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 order_id:1
 resp:
 {
        "code": "ok",
        "data": "订单已取消"
    }
 * @apiSampleRequest http://dkcloud.xyz/order/cancelOrder
 * @apiVersion 1.0.0
 */
let cancelOrder = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.order_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec(`select state from t_order where order_id = ?`, mysqlHandle.formatParams(body.order_id), res => {

        let state = parseInt(res[0].state);
        if (state === 2 || state === 3) {
            log.debug('订单已结束或已支付 不能取消');
            resp.json(msgResult.errorResp('订单已结束或已支付 不能取消'));
        } else {
            let sql = `UPDATE t_order SET update_time = NOW() , state = 0  WHERE order_id= ?`;
            let params = mysqlHandle.formatParams(body.order_id);
            mysqlHandle.exec(sql, params, (res) => {
                log.debug('订单已取消');
                resp.json(msgResult.successResp('订单已取消'));
            }, (err) => {
                log.error(err)
            });
        }

    });


};

/**
 * @api {post} order/getAllOrder 获取所有订单
 * @apiDescription 获取所有订单
 * @apiName getAllOrder
 * @apiGroup Order
  * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 resp:
 {
     "code": "ok",
     "data": {
          "order": [
               {
                    "order_id": 1,
                    "store_id": null,
                    "activity_id": 1,
                    "user_id": 2,
                    "serial": "123",
                    "state": 0,
                    "pay_type": 1,
                    "pay_time": "2019-12-08 16:22:18",
                    "money": 111,
                    "count": 111,
                    "price": 21,
                    "total": 23,
                    "note": "备注",
                    "is_comment": 1,
                    "create_time": "2019-12-08 16:22:18",
                    "update_time": "2019-12-08 16:22:18",
                    "close_time": "2019-12-08 16:22:18",
                    "done_time": "2019-12-08 16:22:18"
               }
          ]
     }
}
 * @apiSampleRequest http://dkcloud.xyz/order/getAllOrder
 * @apiVersion 1.0.0
 */
let getAllOrder = (req, resp) => {
    let sql = 'SELECT * FROM t_order';
    let params = mysqlHandle.formatParams();
    mysqlHandle.exec(sql, params, (res) => {
        if (res.length > 0) {
            log.debug(res);
            resp.json(msgResult.successResp({
                order: res
            }));
        } else {
            log.debug(res);
            resp.json(msgResult.successResp('暂无订单'));
        }

    });
};
/**
 * @api {post} order/getAllOrderDetails 获取所有订单详情
 * @apiDescription 获取所有订单详情
 * @apiName getAllOrderDetails
 * @apiGroup Order
 * @apiParam {int} page 页数(可选参数)
 * @apiParam {int} size 一页展示多少(可选参数)
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 resp:
 {
     "code": "ok",
     "data": {
     }
}
 * @apiSampleRequest http://dkcloud.xyz/order/getAllOrderDetails
 * @apiVersion 1.0.0
 */
let getAllOrderDetails = (req, resp) => {
    let body = qs.parse(req.body);
    let sql = 'SELECT * FROM v_order_details';
    let params = mysqlHandle.formatParams();
    mysqlHandle.exec(sql, params, (res) => {
        if (res.length > 0) {
            let total = res.length;
            if (body.page != undefined && body.size != undefined) {
                let page = (parseInt(body.page) - 1) * parseInt(body.size);
                let size = parseInt(body.size);
                sql = `SELECT * FROM v_order_details LIMIT ${page}, ${size} `;
                mysqlHandle.exec(sql, params, res => {
                    let p = addURl(res, req);
                    p.then(data => {
                        let obj = {
                            total: total,
                            data: data
                        };
                        log.debug(obj);
                        resp.json(msgResult.successResp(obj));
                    })
                });
            } else {
                let p = addURl(res, req);
                p.then(data => {
                    log.debug(res);
                    resp.json(msgResult.successResp(data));
                })
            }


        } else {
            log.debug(res);
            resp.json(msgResult.successResp('暂无订单'));
        }

    });
};


/**
 * @api {post} /search/order 通过订单号、 用户名、 店铺名搜索订单
 * @apiDescription   通过订单号、 用户名、 店铺名搜索订单
 * @apiName searchOrder
 * @apiParam {string} keyword 搜索内容
 * @apiParam {string} type  serial、nick、shop_name
 * @apiGroup Search
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/search/order
 * @apiVersion 1.0.0
 */
let searchOrder = (req, resp) => {
    let body = qs.parse(req.body);
    let keyword = body.keyword;
    let type = body.type;
    if (type == "serial" || type == "nick" || type == "shop_name") {
        let sql = `select * from v_order_details where ${type} LIKE '%${keyword}%'`;
        mysqlHandle.exec(sql, mysqlHandle.formatParams(''),
            res => {
                let p = addURl(res, req);
                p.then(data => {
                    log.debug(res);
                    resp.json(msgResult.successResp(data));
                })
            });
    } else {
        resp.json(msgResult.errorResp('type类型错误'));
    }

};


/**
 * @api {post} order/getShopOrder 获取某个店铺的订单
 * @apiDescription 获取某个店铺的订单
 * @apiName getShopOrder
 * @apiGroup Order
 * @apiParam {int} shop_id 店铺id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 store_id:1

 resp:

 {
    "code": "ok",
    "data": [
    {
        "order_id": 3,
        "business_id": 1,
        "activity_id": 223,
        "user_id": 113,
        "serial": "20191208132727",
        "state": 2,
        "pay_type": 1,
        "pay_time": "2019-12-08 17:56:00",
        "money": 199,
        "count": 1,
        "price": 199,
        "total": 199,
        "note": "打印发票",
        "is_comment": 0,
        "create_time": "2019-12-08 17:10:28",
        "update_time": "2019-12-08 17:10:28",
        "close_time": null,
        "done_time": null
    },
    {
        "order_id": 4,
        "business_id": 1,
        "activity_id": 223,
        "user_id": 113,
        "serial": "20191208132303",
        "state": 0,
        "pay_type": 1,
        "pay_time": "2019-12-08 17:58:32",
        "money": 199,
        "count": 1,
        "price": 199,
        "total": 199,
        "note": "打印发票",
        "is_comment": 0,
        "create_time": "2019-12-08 17:13:19",
        "update_time": "2019-12-08 19:25:13",
        "close_time": "2019-12-08 19:06:34",
        "done_time": "2019-12-08 19:06:34"
    }
]
}
 * @apiSampleRequest http://dkcloud.xyz/order/getStoreOrder
 * @apiVersion 1.0.0
 */
let getShopOrder = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.shop_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec(`select * from shop where shop_id = ?`, mysqlHandle.formatParams(body.shop_id), res => {
        if (res.length > 0) {
            let sql = `SELECT * FROM t_order WHERE shop_id = ? `;
            let params = mysqlHandle.formatParams(body.shop_id);
            mysqlHandle.exec(sql, params, (res) => {

                if (res.length > 0) {

                    log.debug(res);
                    resp.json(msgResult.successResp(res));
                } else {
                    resp.json(msgResult.successResp('暂无订单'));
                }
            });
        } else {
            log.debug('店铺id不存在');
            resp.json(msgResult.errorResp('店铺id不存在'));
        }

    });


};

/**
 * @api {post} order/getShopOrderDetails 获取某个店铺的详情订单
 * @apiDescription 获取某个店铺的详情订单
 * @apiName getShopOrderDetails
 * @apiGroup Order
 * @apiParam {int} shop_id 店铺id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 store_id:1

 resp:

 {
    "code": "ok",
    "data": [

]
}
 * @apiSampleRequest http://dkcloud.xyz/order/getShopOrderDetails
 * @apiVersion 1.0.0
 */
let getShopOrderDetails = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.shop_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    mysqlHandle.exec(`    SELECT    *    FROM    shop    WHERE    shop_id = ?`, mysqlHandle.formatParams(body.shop_id), res => {
        if (res.length > 0) {

            let sql = `SELECT * FROM v_order_details WHERE shop_id = ? `;
            let params = mysqlHandle.formatParams(body.shop_id);
            mysqlHandle.exec(sql, params, (res) => {
                log.error(res)
                if (res.length > 0) {
                    let p = addURl(res, req);
                    p.then(data => {
                        log.debug(res);
                        resp.json(msgResult.successResp(data));
                    })

                } else {
                    resp.json(msgResult.successResp('暂无订单'));
                }
            }, err => {
                log.error(err)
            });
        } else {
            log.debug('店铺id不存在');
            resp.json(msgResult.errorResp('店铺id不存在'));
        }

    });


};

/**
 * @api {post} order/getUserOrder 获取某个用户的订单
 * @apiDescription 获取某个用户的订单
 * @apiName getUserOrder
 * @apiGroup Order
 * @apiParam {int} user_id 用户id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 user_id:1

 resp:

 {
    "code": "ok",
    "data": [
    {
        "order_id": 3,
        "business_id": 1,
        "activity_id": 223,
        "user_id": 113,
        "serial": "20191208132727",
        "state": 2,
        "pay_type": 1,
        "pay_time": "2019-12-08 17:56:00",
        "money": 199,
        "count": 1,
        "price": 199,
        "total": 199,
        "note": "打印发票",
        "is_comment": 0,
        "create_time": "2019-12-08 17:10:28",
        "update_time": "2019-12-08 17:10:28",
        "close_time": null,
        "done_time": null
    },
    {
        "order_id": 4,
        "business_id": 1,
        "activity_id": 223,
        "user_id": 113,
        "serial": "20191208132303",
        "state": 0,
        "pay_type": 1,
        "pay_time": "2019-12-08 17:58:32",
        "money": 199,
        "count": 1,
        "price": 199,
        "total": 199,
        "note": "打印发票",
        "is_comment": 0,
        "create_time": "2019-12-08 17:13:19",
        "update_time": "2019-12-08 19:25:13",
        "close_time": "2019-12-08 19:06:34",
        "done_time": "2019-12-08 19:06:34"
    }
]
}
 * @apiSampleRequest http://dkcloud.xyz/order/getUserOrder
 * @apiVersion 1.0.0
 */
let getUserOrder = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select * from user where user_id = ?`, mysqlHandle.formatParams(body.user_id), res => {
        if (res.length > 0) {
            let sql = `SELECT * FROM t_order WHERE user_id = ? `;
            let params = mysqlHandle.formatParams(body.user_id);
            mysqlHandle.exec(sql, params, (res) => {
                if (res.length > 0) {
                    log.debug(res);
                    resp.json(msgResult.successResp(res));
                } else {
                    resp.json(msgResult.successResp('暂无订单'));
                }
            });
        } else {
            log.debug('用户id不存在');
            resp.json(msgResult.errorResp('用户id不存在'));
        }
    });

};

/**
 * @api {post} order/getUserOrderDetails 获取某个用户的详情订单
 * @apiDescription 获取某个用户的详情订单
 * @apiName getUserOrderDetails
 * @apiGroup Order
 * @apiParam {int} user_id 用户id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req:
 user_id:1

 resp:

 {
    "code": "ok",
    "data": [

]
}
 * @apiSampleRequest http://dkcloud.xyz/order/getUserOrderDetails
 * @apiVersion 1.0.0
 */
let getUserOrderDetails = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select * from user where user_id = ?`, mysqlHandle.formatParams(body.user_id), res => {
        if (res.length > 0) {
            let sql = `SELECT * FROM v_order_details WHERE user_id = ? `;
            let params = mysqlHandle.formatParams(body.user_id);
            mysqlHandle.exec(sql, params, (res) => {
                if (res.length > 0) {
                    let p = addURl(res, req);
                    p.then(data => {
                        log.debug(res);
                        resp.json(msgResult.successResp(data));
                    })

                } else {
                    resp.json(msgResult.successResp('暂无订单'));
                }
            });
        } else {
            log.debug('用户id不存在');
            resp.json(msgResult.errorResp('用户id不存在'));
        }
    });

};
/**
 * @api {post} order/deleteOrder 删除订单
 * @apiDescription 删除订单
 * @apiName deleteOrder
 * @apiGroup Order
 * @apiParam {int} order_id 订单id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/order/deleteOrder
 * @apiVersion 1.0.0
 */
let deleteOrder = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.order_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`delete  from t_order where order_id =?`,
        mysqlHandle.formatParams(body.order_id), res => {
            log.debug('删除订单成功')
            resp.json(msgResult.successResp('删除成功'));
        });
};

// 添加url前缀
function addURl(object, req) {
    return new Promise((resolve, reject) => {
        let arr = [];
        object.forEach(item => {
            let obj;
            obj = item;
            obj.user_avatar = 'http://' + req.headers.host + item.user_avatar;
            obj.image_url = 'http://' + req.headers.host + item.image_url;
            arr.push(obj);
        });
        resolve(arr);
    });
}

module.exports = {
    addOrder,
    pay,
    orderEnd,
    cancelOrder,
    getAllOrder,
    getShopOrder,
    getUserOrder,
    getShopOrderDetails,
    getUserOrderDetails,
    getAllOrderDetails,
    deleteOrder,
    searchOrder
};

