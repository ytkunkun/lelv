const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const log = require('../core/util/log');
const fnode = require('../core/config/fnode');


/**
 * @api {post} notice/sendNotice 发送系统通知
 * @apiDescription 发送系统通知
 * @apiName sendNotice
 * @apiGroup Notice
 * @apiParam {int} sender_id 发送者id（管理员id）
 * @apiParam {string} title 标题
 * @apiParam {string} content 内容
 * @apiSuccess  code 返回ok
 * @apiSuccess data  {}
 * @apiSampleRequest http://dkcloud.xyz/notice/sendNotice
 * @apiVersion 1.0.0
 */

let sendNotice = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.sender_id === undefined || body.title === undefined || body.content === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    let sql = ` INSERT INTO notice ( sender_id, title, content, send_time ) VALUES ( ?, ?, ?,NOW());`;
    let params = mysqlHandle.formatParams(body.sender_id, body.title, body.content);
    mysqlHandle.exec(sql, params, res => {
        log.debug('通知发送成功');
        resp.json(msgResult.successResp('通知发送成功'));
    });
};
/**
 * @api {post} notice/deleteNotice 删除系统通知
 * @apiDescription 删除系统通知
 * @apiName deleteNotice
 * @apiGroup Notice
 * @apiParam {int} notice_id 通知id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/notice/deleteNotice
 * @apiVersion 1.0.0
 */
let deleteNotice = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.notice_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    mysqlHandle.exec(`select * from notice where notice_id = ?`, mysqlHandle.formatParams(body.notice_id), res => {

        if (res.length > 0) {

            let sql = ` DELETE FROM  notice WHERE notice_id = ?`;
            let params = mysqlHandle.formatParams(body.notice_id);
            mysqlHandle.exec(sql, params, res => {
                log.debug('通知已删除');
                resp.json(msgResult.successResp('通知已删除'));
            });
        } else {
            log.debug('notice_id不存在');
            resp.json(msgResult.successResp('notice_id不存在'));
        }
    });
};

/**
 * @api {post} notice/getAllNotice 获取系统通知
 * @apiDescription 获取系统通知
 * @apiName getAllNotice
 * @apiGroup Notice
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/notice/getAllNotice
 * @apiVersion 1.0.0
 */

let getAllNotice = (req, resp) => {
    let sql = `select * from v_notice_manage`;
    let params = mysqlHandle.formatParams('');
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            let descending = res.sort((a, b) => {
                var x = a.sender_time;
                var y = b.sender_time;
                return x > y ? -1 : x < y ? 1 : 0;
                // return  b.send_time - a.send_time ;
            });
            let arr=[];
            descending.forEach(e => {

                e.sender_avatar = 'http://'+req.host+  e.sender_avatar;
                arr.push(e);
            });
            log.debug(arr);
            resp.json(msgResult.successResp(arr));
        } else {
            log.debug('暂无通知');
            resp.json(msgResult.successResp('暂无通知'));
        }
    });
};
/**
 * @api {post} notice/isUpdated 获取更新信息
 * @apiDescription 获取更新信息
 * @apiName isUpdated
 * @apiGroup Notice
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/notice/isUpdated
 * @apiVersion 1.0.0
 */
let isUpdated = (req, resp) => {
    let version = fnode.app.version;
    let download = fnode.app.download;
    let info = fnode.app.updatedInfo;
    resp.json(msgResult.successResp({
        version: version,
        download: download,
        info: info
    }));
};

module.exports = {
    sendNotice, deleteNotice, getAllNotice,
    isUpdated
};
