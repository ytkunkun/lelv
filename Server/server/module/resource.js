const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const future = require('../core/util/future');
const upload = require('../core/util/upload');
const log = require('../core/util/log');

// 0 策划 1场地 2物料3影像 4其他
// 0未出售 1已出售

/**
 * @api {post} resource/addResource  添加闲置资源
 * @apiDescription   添加闲置资源
 * @apiName addResource
 * @apiGroup Resource
 * @apiParam {int} business_id 商家id
 * @apiParam {int} title 闲置资源名称
 * @apiParam {int} type 闲置资源类型 type= 0 策划 1场地 2物料3影像 4其他
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/resource/addResource
 * @apiVersion 1.0.0
 */
let addResource = (req, resp) => {
    let body = qs.parse(req.body);
    // body = JSON.parse(body.data);

    log.debug(req.file);
    log.debug(body);
    if (body.business_id === undefined || body.title === undefined || body.type === undefined) {
        resp.json('传入参数不合法');
        return;
    }

    let uploadResult = upload.uploadImg(req, resp);
    uploadResult.then(data => {

        let sql = `INSERT INTO resources (
                                business_id,
                                title,
                                image_url,
                                type,
                                is_sell,
                                create_time  ) VALUES  (?,?,?,?,0,NOW())`;

        let params = mysqlHandle.formatParams(body.business_id, body.title, data.relativePath, body.type);
        mysqlHandle.exec(sql, params, res => {

            log.debug('添加闲置闲置资源成功');
            resp.json(msgResult.successResp('添加闲置闲置资源成功'));

        });

    })
};


/**
 * @api {post} resource/deleteResource  删除闲置资源
 * @apiDescription   删除闲置资源
 * @apiName deleteResource
 * @apiGroup Resource
 * @apiParam {int} resource_id 闲置资源id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/resource/deleteResource
 * @apiVersion 1.0.0
 */
let deleteResource = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.resource_id === undefined) {
        resp.json('传入参数不合法');
        return;
    }

    let sql = `delete from resources where resource_id =?`;
    let params = mysqlHandle.formatParams(body.resource_id);
    mysqlHandle.exec(sql, params, res => {
        log.debug('删除闲置资源成功');
        resp.json(msgResult.successResp('删除闲置资源成功'));

    });
};


/**
 * @api {post} resource/getAllResource  获取全部闲置资源
 * @apiDescription   获取全部闲置资源
 * @apiName getAllResource
 * @apiGroup Resource
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/resource/getAllResource
 * @apiVersion 1.0.0
 */
let getAllResource = (req, resp) => {
    let sql = `select * from v_resoutces_business`;
    let params = mysqlHandle.formatParams('');
    mysqlHandle.exec(sql, params, res => {
        let arr = [];
        res.forEach(item => {
            let obj = item;
            obj.image_url = 'http://' + req.headers.host + item.image_url;
            obj.avatar = 'http://' + req.headers.host + item.avatar;
            arr.push(obj);

        });
        log.debug(arr);
        resp.json(msgResult.successResp(arr));
    });
};

/**
 * @api {post} resource/getResource  获取某个闲置资源
 * @apiDescription   删除闲置资源
 * @apiName getResource
 * @apiGroup Resource
 * @apiParam {int} resource_id 闲置资源id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/resource/getResource
 * @apiVersion 1.0.0
 */

let getResource = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.resource_id === undefined) {
        resp.json('传入参数不合法');
        return;
    }
    let sql = `select * from v_resoutces_business where resource_id = ? `;
    let params = mysqlHandle.formatParams(body.resource_id);
    mysqlHandle.exec(sql, params, res => {

        if (res.length > 0) {
            let arr = [];
            res.forEach(item => {
                let obj = item;
                obj.image_url = 'http://' + req.headers.host + item.image_url;
                obj.avatar = 'http://' + req.headers.host + item.avatar;
                arr.push(obj);

            });
            log.debug(arr);
            resp.json(msgResult.successResp(arr));

        } else {
            log.debug('resource_id不存在');
            resp.json(msgResult.successResp('resource_id不存在'));
        }

    });
};

module.exports = {addResource, deleteResource, getAllResource, getResource};