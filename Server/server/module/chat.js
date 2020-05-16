const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const future = require('../core/util/future');
const upload = require('../core/util/upload');
const log = require('../core/util/log');

// type  1 用户 -> 用户 2 用户-> 商家 3 商家-> 用户

/**
 * @api {post} chat/sendMessage 发送消息
 * @apiDescription 发送消息
 * @apiName sendMessage
 * @apiGroup Chat
 * @apiParam {int} sender_id   发送id（用户id或商家id）
 * @apiParam {int} receive_id  接收id（用户id或商家id）
 * @apiParam {int} content  发送内容
 * @apiParam {int} type 发送类型 type=1 用户 -> 用户 2 用户-> 商家 3 商家-> 用户
 * @apiSuccess code int
 * @apiSuccess data array[object]
 *
 * @apiSuccessExample {json} Success-Response:
 req:
 sender_id:1
 receive_id:2
 type:1
 content:这个活动安全么

 resp:
 {
     "code": "ok",
     "data": [
          {
               "message_id": 4,
               "content": "好的呢亲",
               "type": 3,
               "send_time": "2019-12-16 11:29:06",
               "receive_id": 1,
               "sender_id": 3,
               "sender_nick": "胡安安",
               "receive_nick": "亲子用户_林小锟"
          }
     ]
}
 * @apiSampleRequest http://dkcloud.xyz/chat/sendMessage
 * @apiVersion 1.0.0
 */
let sendMessage = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.content === undefined || body.type === undefined || body.sender_id === undefined || body.receive_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    let sql = `INSERT INTO chat (content,type,send_time,receive_id,sender_id)  VALUES (?,?,NOW(),?,?);`;
    let params = mysqlHandle.formatParams(body.content, body.type, body.receive_id, body.sender_id);
    mysqlHandle.exec(sql, params, res => {
        log.debug(res);
        resp.json(msgResult.successResp({
            sender_id: body.sender_id,
            msg: '发送成功',
            receive_id: body.receive_id,
            content: body.content
        }));
    });

};


/**
 * @api {post} chat/receiveMessage 接收消息
 * @apiDescription 接收消息
 * @apiName receiveMessage
 * @apiGroup Chat
 * @apiParam {int} receive_id  接收id（用户id或商家id）
 * @apiParam {int} type 发送类型 type=1 用户 -> 用户 2 用户-> 商家 3 商家-> 用户
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 req :
 receive_id:1
 type:3
 resp:
 {
     "code": "ok",
     "data": [
          {
               "message_id": 4,
               "content": "好的呢亲",
               "type": 3,
               "send_time": "2019-12-16 11:29:06",
               "receive_id": 1,
               "sender_id": 3,
               "sender_nick": "胡安安",
               "receive_nick": "亲子用户_林小锟"
          }
     ]
}
 * @apiSampleRequest http://dkcloud.xyz/chat/receiveMessage
 * @apiVersion 1.0.0
 */

let receiveMessage = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.receive_id === undefined || body.type === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = ``;
    if (parseInt(body.type) === 1) {
        sql = `select * from v_chat_user2user where receive_id = ? and type = ?`
    } else if (parseInt(body.type) === 2) {
        sql = `select * from v_chat_user2business where receive_id = ? and type = ?`
    } else if (parseInt(body.type) === 3) {
        sql = `select * from v_chat_business2user where receive_id = ? and type = ?`
    } else {
        resp.json(msgResult.errorResp('type类型不存在'));
    }

    mysqlHandle.exec(sql,
        mysqlHandle.formatParams(body.receive_id, body.type), res => {
            log.debug(res);
            if (res.length > 0) {
                resp.json(msgResult.successResp(res));
            } else {
                resp.json(msgResult.successResp('暂无消息'));
            }
        });
};
/**
 * @api {post} chat/getUserChatObj 获取用户的聊天记录对象
 * @apiDescription 获取用户的聊天记录对象
 * @apiName getUserChatObj
 * @apiGroup Chat
 * @apiParam {int} user_id 用户id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
    "data": [
        {
            "receive_id": 1,
            "receive_nick": "林锟锟",
            "receive_avatar": "/images/uploads/20200107164500.jpeg",
            "sender_id": 2,
            "sender_nick": "胡小安",
            "sender_avatar": "/images/uploads/2.jpg"
        },
        {
            "receive_id": 2,
            "receive_nick": "杨芤蔻",
            "receive_avatar": "/images/uploads/32.jpg",
            "sender_id": 2,
            "sender_nick": "胡小安",
            "sender_avatar": "/images/uploads/2.jpg"
        },
        {
            "receive_id": 3,
            "receive_nick": "胡安安",
            "receive_avatar": "/images/uploads/33.jpg",
            "sender_id": 2,
            "sender_nick": "胡小安",
            "sender_avatar": "/images/uploads/2.jpg"
        },
        {
            "receive_id": 5,
            "receive_nick": "别拿经历谈人生",
            "receive_avatar": "/images/uploads/35.jpg",
            "sender_id": 2,
            "sender_nick": "胡小安",
            "sender_avatar": "/images/uploads/2.jpg"
        }
    ]
}
 * @apiSampleRequest http://dkcloud.xyz/chat/getUserChatObj
 * @apiVersion 1.0.0
 */
let getUserChatObj = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.user_id == "") {
        log.debug('传入参数不合法');
        resp.json(msgResult.successResp('传入参数不合法'));
        return;
    }
    // 用户发送给商家最新的一条记录
    let sql = `SELECT
	a.*,
        count( 1 ) AS rank 
        FROM
            ( SELECT * FROM v_chat_user2business WHERE sender_id = ${body.user_id} ) a
            LEFT JOIN ( SELECT * FROM v_chat_user2business WHERE sender_id = ${body.user_id} ) b ON a.receive_id = b.receive_id 
            AND a.send_time <= b.send_time 
        GROUP BY
            a.receive_id,
            a.send_time 
        HAVING
            rank = 1 
        ORDER BY
            a.receive_id,
            a.send_time DESC`;
    let sql2 = `SELECT
	a.*,
        count( 1 ) AS rank 
        FROM
            ( SELECT * FROM v_chat_business2user WHERE receive_id = ${body.user_id} ) a
            LEFT JOIN ( SELECT * FROM v_chat_business2user WHERE receive_id = ${body.user_id} ) b ON a.sender_id = b.sender_id 
            AND a.send_time <= b.send_time 
        GROUP BY
            a.sender_id,
            a.send_time 
        HAVING
            rank = 1 
        ORDER BY
            a.sender_id,
            a.send_time DESC`;

    let params = mysqlHandle.formatParams('');
    mysqlHandle.exec(sql, params, res => {
        let data1 = res;
        mysqlHandle.exec(sql2, params, res2 => {
            let data2 = res2;
            let data = [...data1, ...data2];
            let arr = [];
            data.forEach(e => {
                let obj = e;
                obj.sender_avatar = 'http://' + req.headers.host + e.sender_avatar;
                obj.receive_avatar = 'http://' + req.headers.host + e.receive_avatar;
                obj.last_time = obj.send_time;
                delete obj.rank;
                delete obj.send_time;
                arr.push(obj);
            });
            log.debug(arr);
            resp.json(msgResult.successResp(arr));
        })


    });
};

/**
 * @api {post} chat/getBusinessChatObj 获取商家的聊天记录对象
 * @apiDescription 获取商家的聊天记录对象
 * @apiName getBusinessChatObj
 * @apiGroup Chat
 * @apiParam {int} business_id 商家id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
    "data": [
        {
            "receive_id": 1,
            "receive_nick": "林小锟",
            "receive_avatar": "/images/uploads/20200107193492.jpeg",
            "sender_id": 2,
            "sender_nick": "杨芤蔻",
            "sender_avatar": "/images/uploads/32.jpg"
        }
    ]
}
 * @apiSampleRequest http://dkcloud.xyz/chat/getBusinessChatObj
 * @apiVersion 1.0.0
 */
let getBusinessChatObj = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.business_id === undefined || body.business_id == "") {
        log.debug('传入参数不合法');
        resp.json(msgResult.successResp('传入参数不合法'));
        return;
    }

    let sql = `SELECT
	a.*,
            count( 1 ) AS rank 
        FROM
            ( SELECT * FROM v_chat_business2user WHERE sender_id = ${body.business_id} ) a
            LEFT JOIN ( SELECT * FROM v_chat_business2user WHERE sender_id = ${body.business_id} ) b ON a.receive_id = b.receive_id 
            AND a.send_time <= b.send_time 
        GROUP BY
            a.receive_id,
            a.send_time 
        HAVING
            rank = 1 
        ORDER BY
            a.receive_id,
            a.send_time DESC`;
    let sql2 = `SELECT
	a.*,
            count( 1 ) AS rank 
        FROM
            ( SELECT * FROM v_chat_user2business WHERE receive_id = ${body.business_id} ) a
            LEFT JOIN ( SELECT * FROM v_chat_user2business WHERE receive_id = ${body.business_id} ) b ON a.sender_id = b.sender_id 
            AND a.send_time <= b.send_time 
        GROUP BY
            a.sender_id,
            a.send_time 
        HAVING
            rank = 1 
        ORDER BY
            a.sender_id,
            a.send_time DESC`;
    let params = mysqlHandle.formatParams('');
    mysqlHandle.exec(sql, params, res => {
        // let arr = [];
        // res.forEach(e => {
        //     let obj = e;
        //     obj.sender_avatar = 'http://' + req.headers.host + e.sender_avatar;
        //     obj.receive_avatar = 'http://' + req.headers.host + e.receive_avatar;
        //     obj.last_time = obj.send_time;
        //     delete obj.rank;
        //     delete obj.send_time;
        //     arr.push(obj);
        // });
        // log.debug(arr);
        // resp.json(msgResult.successResp(arr));

        let data1 = res;
        mysqlHandle.exec(sql2, params, res2 => {
            let data2 = res2;
            let data = [...data1, ...data2];
            let arr = [];
            data.forEach(e => {
                let obj = e;
                obj.sender_avatar = 'http://' + req.headers.host + e.sender_avatar;
                obj.receive_avatar = 'http://' + req.headers.host + e.receive_avatar;
                obj.last_time = obj.send_time;
                delete obj.rank;
                delete obj.send_time;
                arr.push(obj);
            });
            log.debug(arr);
            resp.json(msgResult.successResp(arr));
        })
    });
};

/**
 * @api {post} chat/getUserAndBusinessRecord 用户和商家之间的聊天记录
 * @apiDescription 某个用户和某个商家之间的聊天记录
 * @apiName getUserAndBusinessRecord
 * @apiGroup Chat
 * @apiParam {int} user_id  用户 id
 * @apiParam {int} business_id  商家 id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
    "data": {
        "ascending": [
            {
                "message_id": 12,
                "content": "你好",
                "type": 2,
                "send_time": "2020-03-05 12:10:22",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "胡小安",
                "receive_nick": "杨芤蔻"
            },
            {
                "message_id": 13,
                "content": "你好！",
                "type": 3,
                "send_time": "2020-03-05 12:10:30",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "杨芤蔻",
                "receive_nick": "胡小安"
            },
            {
                "message_id": 14,
                "content": "想问下",
                "type": 2,
                "send_time": "2020-03-05 12:10:47",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "胡小安",
                "receive_nick": "杨芤蔻"
            },
            {
                "message_id": 15,
                "content": "什么?",
                "type": 3,
                "send_time": "2020-03-05 12:10:54",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "杨芤蔻",
                "receive_nick": "胡小安"
            }
        ],
        "descending": [
            {
                "message_id": 15,
                "content": "什么?",
                "type": 3,
                "send_time": "2020-03-05 12:10:54",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "杨芤蔻",
                "receive_nick": "胡小安"
            },
            {
                "message_id": 14,
                "content": "想问下",
                "type": 2,
                "send_time": "2020-03-05 12:10:47",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "胡小安",
                "receive_nick": "杨芤蔻"
            },
            {
                "message_id": 13,
                "content": "你好！",
                "type": 3,
                "send_time": "2020-03-05 12:10:30",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "杨芤蔻",
                "receive_nick": "胡小安"
            },
            {
                "message_id": 12,
                "content": "你好",
                "type": 2,
                "send_time": "2020-03-05 12:10:22",
                "receive_id": 2,
                "sender_id": 2,
                "sender_nick": "胡小安",
                "receive_nick": "杨芤蔻"
            }
        ]
    }
}
 * @apiSampleRequest http://dkcloud.xyz/chat/getUserAndBusinessRecord
 * @apiVersion 1.0.0
 */
let getUserAndBusinessRecord = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.business_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    let p1 = getUser2BusinessRecord(body.business_id, body.user_id, req);
    let p2 = getBusiness2userRecord(body.business_id, body.user_id, req);
    Promise.all([p1, p2]).then((results) => {

        let arr = results[0].concat(results[1]);
        let arr2 = arr.concat([]);
        let ascending = arr.sort((a, b) => {
            var y = a.send_time;
            var x = b.send_time;
            return x > y ? -1 : x < y ? 1 : 0;
            // return  b.send_time - a.send_time ;
        });
        let descending = arr2.sort((a, b) => {
            var x = a.send_time;
            var y = b.send_time;
            return x > y ? -1 : x < y ? 1 : 0;
            // return  b.send_time - a.send_time ;
        });
        let obj = {
            ascending: ascending,
            descending: descending
        };
        // log.debug({ascending:ascending,descending:descending});
        resp.json(msgResult.successResp(obj));
    });
};

let getUser2BusinessRecord = (business_id, user_id, req) => {
    return new Promise((resolve, reject) => {
        let sql = 'select * from v_chat_user2business where receive_id = ? and sender_id = ? ';
        let params = mysqlHandle.formatParams(business_id, user_id);
        mysqlHandle.exec(sql, params, res => {
            let arr = [];

            res.forEach(e => {
                let obj = e;
                obj.sender_avatar = 'http://' + req.headers.host + e.sender_avatar;
                obj.receive_avatar = 'http://' + req.headers.host + e.receive_avatar;
                arr.push(obj);
            });

            resolve(arr);
        });
    })
};

let getBusiness2userRecord = (business_id, user_id, req) => {
    return new Promise((resolve, reject) => {
        let sql = 'select * from v_chat_business2user where receive_id = ? and sender_id = ? ';
        let params = mysqlHandle.formatParams(user_id, business_id);
        mysqlHandle.exec(sql, params, res => {
            let arr = [];

            res.forEach(e => {
                let obj = e;
                obj.sender_avatar = 'http://' + req.headers.host + e.sender_avatar;
                obj.receive_avatar = 'http://' + req.headers.host + e.receive_avatar;
                arr.push(obj);
            });

            resolve(arr);
        });
    })
};


module.exports = {sendMessage, receiveMessage, getUserAndBusinessRecord, getBusinessChatObj, getUserChatObj};