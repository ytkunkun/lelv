const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const upload = require('../core/util/upload');
const log = require('../core/util/log');


// 关注类型 1:用户2:店铺3:活动 4: 文章点赞 5：文章转发
// 用户关注用户
/**
 * @api {post} follow/followUser 关注用户
 * @apiDescription 关注用户
 * @apiName followUser
 * @apiGroup Follow
 * @apiParam {int} user_id  用户id
 * @apiParam {int} firend_id 被关注的用户id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/follow/followUser
 * @apiVersion 1.0.0
 */
let followUser = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.firend_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = ` INSERT INTO follow(user_id,firend_id,type,create_time)
                        SELECT ?,?,1,NOW()
                        FROM dual
                        WHERE NOT EXISTS(
                            SELECT *
                            FROM follow
                        WHERE user_id = ? AND firend_id =? AND type =1)`;


    let params = mysqlHandle.formatParams(body.user_id, body.firend_id, body.user_id, body.firend_id);

    mysqlHandle.exec(sql, params, res => {
        log.debug(res);
        if (res.affectedRows > 0) {
            resp.json(msgResult.successResp('关注用户成功'));
        } else {
            resp.json(msgResult.successResp('该用户已关注'));
        }

    }, err => {
        log.error(err);
    });

};


/**
 * @api {post} follow/followShop 关注店铺
 * @apiDescription 关注店铺
 * @apiName followShop
 * @apiGroup Follow
 * @apiParam {int} user_id  用户id
 * @apiParam {int} firend_id 被关注的店铺id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/follow/followShop
 * @apiVersion 1.0.0
 */
let followShop = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.firend_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = ` INSERT INTO follow(user_id,firend_id,type,create_time)
                        SELECT ?,?,2,NOW()
                        FROM dual
                        WHERE NOT EXISTS(
                            SELECT *
                            FROM follow
                        WHERE user_id = ? AND firend_id =? AND type =2)`;


    let params = mysqlHandle.formatParams(body.user_id, body.firend_id, body.user_id, body.firend_id);

    mysqlHandle.exec(sql, params, res => {
        log.debug(res);
        if (res.affectedRows > 0) {
            resp.json(msgResult.successResp('关注店铺成功'));
        } else {
            resp.json(msgResult.successResp('该店铺已关注'));
        }

    }, err => {
        log.error(err);
    });

};


/**
 * @api {post} follow/followActivity 关注活动
 * @apiDescription 关注活动
 * @apiName followActivity
 * @apiGroup Follow
 * @apiParam {int} user_id  用户id
 * @apiParam {int} firend_id 被关注的活动id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/follow/followActivity
 * @apiVersion 1.0.0
 */
let followActivity = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.firend_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = ` INSERT INTO follow(user_id,firend_id,type,create_time)
                        SELECT ?,?,3,NOW()
                        FROM dual
                        WHERE NOT EXISTS(
                            SELECT *
                            FROM follow
                        WHERE user_id = ? AND firend_id =? AND type =3)`;


    let params = mysqlHandle.formatParams(body.user_id, body.firend_id, body.user_id, body.firend_id);

    mysqlHandle.exec(sql, params, res => {
        log.debug(res);
        if (res.affectedRows > 0) {
            resp.json(msgResult.successResp('关注活动成功'));
        } else {
            resp.json(msgResult.successResp('该活动已关注'));
        }

    }, err => {
        log.error(err);
    });

};


/**
 * @api {post} follow/likeArticle 点赞文章
 * @apiDescription 点赞文章
 * @apiName likeArticle
 * @apiGroup Follow
 * @apiParam {int} user_id  用户id
 * @apiParam {int} firend_id 被点赞的文章id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/follow/likeArticle
 * @apiVersion 1.0.0
 */

let likeArticle = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.firend_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = ` INSERT INTO follow(user_id,firend_id,type,create_time)
                        SELECT ?,?,4,NOW()
                        FROM dual
                        WHERE NOT EXISTS(
                            SELECT *
                            FROM follow
                        WHERE user_id = ? AND firend_id =? AND type =4)`;

    let params = mysqlHandle.formatParams(body.user_id, body.firend_id, body.user_id, body.firend_id);
    mysqlHandle.exec(sql, params, res => {
        log.debug(res);
        if (res.affectedRows > 0) {
            resp.json(msgResult.successResp('点赞成功'));
        } else {
            resp.json(msgResult.successResp('已经赞过该文章了'));
        }

    }, err => {
        log.error(err);
    });

};


/**
 * @api {post} follow/getFollowInfo 获取关注、点赞、转发
 * @apiDescription 获取关注、点赞、转发
 * @apiName getFollowInfo
 * @apiGroup Follow
 * @apiParam {int} user_id  用户id
 * @apiParam {int} type type = 1:用户2:店铺3:活动 4: 文章点赞 5：文章转发
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/follow/getFollowInfo
 * @apiVersion 1.0.0
 */

let getFollowInfo = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.type === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    if (body.type < 0 || body.type > 5) {
        resp.json(msgResult.errorResp('type类型不合法'));
        return;
    }
    let sql = `select * from follow where user_id = ? and type =?`;
    let params = mysqlHandle.formatParams(body.user_id, body.type);
    mysqlHandle.exec(sql, params, res => {
        log.debug(res);

        if (res.length > 0) {

            resp.json(msgResult.successResp(res));

        } else {
            resp.json(msgResult.successResp('暂无记录'));
        }

    });

};


/**
 * @api {post} follow/forwardArticle 转发文章
 * @apiDescription 转发文章
 * @apiName forwardArticle
 * @apiGroup Follow
 * @apiParam {int} user_id  用户id
 * @apiParam {int} firend_id 被转发的文章id
 * @apiParam {int} forward_account 转发理由
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/follow/forwardArticle
 * @apiVersion 1.0.0
 */

let forwardArticle = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.user_id === undefined || body.firend_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = ` INSERT INTO follow(user_id,firend_id,type,create_time,forward_account)   VALUES (? ,? , 5,NOW(),?)`;
    let account = '';
    if (body.forward_account !== undefined) {
        account = body.forward_account;
    }

    let params = mysqlHandle.formatParams(body.user_id, body.firend_id, account);
    mysqlHandle.exec(sql, params, res => {
        log.debug(res);
        if (res.affectedRows > 0) {
            resp.json(msgResult.successResp('转发成功'));
        } else {
            resp.json(msgResult.successResp('已经转发该文章了'));
        }

    }, err => {
        log.error(err);
    });

};


/**
 * @api {post} follow/deleteForward 删除转发
 * @apiDescription 删除转发
 * @apiName deleteForward
 * @apiGroup Follow
 * @apiParam {int} follow_id  follow_id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/follow/deleteForward
 * @apiVersion 1.0.0
 */
let deleteForward = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.follow_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = `select * from follow where follow_id = ?`;
    let params = mysqlHandle.formatParams(body.follow_id);
    mysqlHandle.exec(sql, params, res => {
        log.debug(res);
        if (res.length > 0) {
            mysqlHandle.exec('DELETE FROM  follow WHERE follow_id = ?', params, res => {
                resp.json(msgResult.successResp('删除成功'));
            });
        } else {
            resp.json(msgResult.errorResp('该文章不存在'));
        }
    }, err => {
        log.error(err);
    });
};
module.exports = {followUser, followShop, followActivity, likeArticle, forwardArticle, getFollowInfo, deleteForward};


