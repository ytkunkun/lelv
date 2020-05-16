// type 0 1室内 2室外 3野外 4其他 
//  state 0 下架 1正常 2热销 3新品  4推荐
const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const future = require('../core/util/future');
const upload = require('../core/util/upload');
const log = require('../core/util/log');


/**
 * @api {post} activity/addActivity  添加活动
 * @apiDescription 添加活动
 * @apiName addActivity
 * @apiGroup Activity
 * @apiParam {string} shop_id 店铺id
 * @apiParam {string} title 标题
 * @apiParam {string} content 内容
 * @apiParam {string} address 地址
 * @apiParam {string} type 活动类型  1室内 2室外 3野外 4其他 
 * @apiParam {string} state 状态  state = 0 下架 1正常 2热销 3新品  4推荐
 * @apiParam {string} number 人数
 * @apiParam {string} image_url 图片路径
 * @apiParam {string} max_age 适合最大年龄
 * @apiParam {string} min_age 适合最小年龄
 * @apiParam {string} price 单价
 * @apiParam {string} start_time 开始时间
 * @apiParam {string} end_time 结束时间
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 * 使用方法
 chooseImage() {
			uni.chooseImage({
				// 调用选择图片的方法
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					console.log(tempFilePaths);
					console.log(tempFilePaths[0]);
					sessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址
				}
			});
		},
 upload() {
			let path = sessionStorage.getItem('tempFilePaths'); //  获取刚刚存的图片临时地址

			let data = {
				// 添加活动接口需要传入的参数
				activity_id: 2,
				title: 'title1',
				content: 'c1ontent',
				address: 'a1ddress',
				type: 2,
				state: 1,
				number: 510,
				max_age: 118,
				min_age: 16,
				price: 199,
				start_time: '2022-01-01',
				end_time: '2022-01-05'
			};

			// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)
			$upload.upload('http://127.0.0.1/activity/setActivity', path, data, res => {
				console.log(res);
			});
		}
 * @apiSampleRequest http://dkcloud.xyz/activity/addActivity
 * @apiVersion 1.0.0
 */

let addActivity = (req, resp) => {
    let body = qs.parse(req.body);
    log.error(body)
    if (body.shop_id === undefined || body.title === undefined || body.content === undefined || body.address === undefined ||
        body.type === undefined || body.state === undefined || body.number === undefined || body.max_age === undefined || body.min_age === undefined || body.price === undefined ||
        body.start_time === undefined || body.end_time === undefined) {
        resp.json(msgResult.errorResp(`传入参数不合法`));
        return;
    }
    let uploadResult = upload.uploadImg(req, resp);
    uploadResult.then(resolve => {
        let sql = `INSERT INTO activity (
                    shop_id,title,content,address,type,state,number,image_url,max_age,min_age,price,start_time,end_time,
                    create_time)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`;
        let params = mysqlHandle.formatParams(body.shop_id, body.title, body.content,
            body.address, body.type, body.state, body.number, resolve.relativePath,
            body.max_age, body.min_age, body.price, body.start_time, body.end_time);
        mysqlHandle.exec(sql, params, res => {
            log.debug('添加了一个新的活动');
            resp.json(msgResult.successResp('添加了一个新的活动'));
        }, err => {
            log.error(err);
        });
    });
};

/**
 * @api {post} activity/setActivity  修改活动
 * @apiDescription 修改活动
 * @apiName setActivity
 * @apiGroup Activity
 * @apiParam {int} activity_id 活动id
 * @apiParam {string} title 标题
 * @apiParam {string} content 内容
 * @apiParam {string} address 地址
 * @apiParam {string} type 活动类型  0室内 1室外 2野外3其他
 * @apiParam {string} state 状态  state = 0 下架 1正常 2热销 3新品  4推荐
 * @apiParam {string} number 人数
 * @apiParam {string} image_url 图片路径
 * @apiParam {string} max_age 适合最大年龄
 * @apiParam {string} min_age 适合最小年龄
 * @apiParam {string} price 单价
 * @apiParam {string} start_time 开始时间
 * @apiParam {string} end_time 结束时间
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 *
 * 使用方法：
 chooseImage() {
			uni.chooseImage({
				// 调用选择图片的方法
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					console.log(tempFilePaths);
					console.log(tempFilePaths[0]);
					sessionStorage.setItem('tempFilePaths', tempFilePaths[0]); // 储存图片临时地址
				}
			});
		},
 upload() {
			let path = sessionStorage.getItem('tempFilePaths'); //  获取刚刚存的图片临时地址

			let data = {
				// 添加活动接口需要传入的参数
				activity_id: 2,
				title: 'title1',
				content: 'c1ontent',
				address: 'a1ddress',
				type: 2,
				state: 1,
				number: 510,
				max_age: 118,
				min_age: 16,
				price: 199,
				start_time: '2022-01-01',
				end_time: '2022-01-05'
			};

			// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)
			$upload.upload('http://127.0.0.1/activity/setActivity', path, data, res => {
				console.log(res);
			});
		}
 * @apiSampleRequest http://dkcloud.xyz/activity/
 * @apiVersion 1.0.0
 */

let setActivity = (req, resp) => {

    let body = qs.parse(req.body);
    if (body.activity_id === undefined || body.title === undefined || body.content === undefined || body.address === undefined ||
        body.type === undefined || body.state === undefined || body.number === undefined || body.max_age === undefined || body.min_age === undefined || body.price === undefined ||
        body.start_time === undefined || body.end_time === undefined) {
        resp.json(msgResult.errorResp(`传入参数不合法`));
        return;
    }
    mysqlHandle.exec('SELECT * FROM activity WHERE activity_id=? ', mysqlHandle.formatParams(body.activity_id), res => {
        if (res.length > 0) {
            // 如果活动id 存在 就修改
            let uploadResult = upload.uploadImg(req, resp);
            uploadResult.then(resolve => {
                let sql = "UPDATE `activity` SET `title`=?, `content`=?, `address`=?, `type`=?, `number`=?, `image_url`=?, `max_age`=?, `price`=?, `start_time`=?, `min_age`=?, `state`=?, `end_time`=? WHERE (`activity_id`=?)";
                let params = mysqlHandle.formatParams(
                    body.title, body.content, body.address, body.type, body.number, resolve.relativePath, body.max_age,
                    body.price, body.start_time, body.min_age, body.state, body.end_time, body.activity_id);
                mysqlHandle.exec(sql, params, res => {
                    log.debug('修改活动详情成功');
                    resp.json(msgResult.successResp('修改活动详情成功'));
                }, err => {
                    log.error(err);
                });
            });
        } else {
            resp.json(msgResult.errorResp('该活动id不存在'));
        }
    });
};

/**
 * @api {post} activity/getActivity  获取某个活动
 * @apiDescription 获取活动
 * @apiName getActivity
 * @apiGroup Activity
 * @apiParam {int} activity_id 活动id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/activity/getActivity
 * @apiVersion 1.0.0
 */
let getActivity = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.activity_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    let sql = `SELECT * FROM v_shop_active WHERE activity_id = ?`;
    let params = mysqlHandle.formatParams(body.activity_id);
    mysqlHandle.exec(sql, params, res => {

        if (res.length > 0) {
            let p = formatData(res, req);
            p.then(data => {
                log.debug(data);
                resp.json(msgResult.successResp(data));
            })
        } else {
            log.debug('活动id不存在');
            resp.json(msgResult.successResp('活动id不存在'));
        }

    });
};

/**
 * @api {post} activity/getAllActivity  获取全部活动
 * @apiDescription 获取全部活动
 * @apiName getAllActivity
 * @apiGroup Activity
 * @apiParam {int} page 页数(可选参数)
 * @apiParam {int} size 一页展示多少(可选参数)
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/activity/getAllActivity
 * @apiVersion 1.0.0
 */
let getAllActivity = (req, resp) => {
    // 先查询总数 再分页
    let body = qs.parse(req.body);
    let sql = `SELECT * FROM v_shop_active `;
    let params = mysqlHandle.formatParams();
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            let total = res.length;
            if (body.page != undefined && body.size != undefined) {
                let page = (parseInt(body.page) - 1) * parseInt(body.size);
                let size = parseInt(body.size);
                sql = `SELECT * FROM v_shop_active LIMIT ${page}, ${size} `;

                mysqlHandle.exec(sql, params, res => {
                    let p = formatData(res, req);
                    p.then(data => {
                        log.debug(data);
                        let obj = {
                            total: total,
                            data: data
                        };
                        resp.json(msgResult.successResp(obj));
                    })

                })

            } else {
                let p = formatData(res, req);
                p.then(data => {
                    log.debug(data);
                    resp.json(msgResult.successResp(data));
                })
            }


        } else {
            log.debug('暂无活动');
            resp.json(msgResult.successResp('暂无活动'));
        }

    });
};

/**
 * @api {post} search/activity 通过活动标题搜索活动
 * @apiDescription   通过活动标题搜索活动
 * @apiName searchActivity
 * @apiParam {string} keyword 搜索内容
 * @apiParam {string} type title或 create_time
 * @apiGroup Search
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/search/activity
 * @apiVersion 1.0.0
 */
let searchActivity = (req, resp) => {
    let keyword = qs.parse(req.body).keyword;
    let type = qs.parse(req.body).type;
    if (type == "title" || type == "create_time") {

        let sql = `select * from v_shop_active where ${type} LIKE '%${keyword}%'`;
        mysqlHandle.exec(sql, mysqlHandle.formatParams(''),
            res => {

                let p = formatData(res, req);
                p.then(data => {
                    log.debug(data);
                    resp.json(msgResult.successResp(data));
                });

            });
    } else {
        resp.json(msgResult.errorResp('type类型错误'));

    }

};
/**
 * @api {post} activity/deleteActivity  删除活动
 * @apiDescription 删除活动
 * @apiName deleteActivity
 * @apiGroup Activity
 * @apiParam {int} activity_id 活动id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/activity/deleteActivity
 * @apiVersion 1.0.0
 */
let deleteActivity = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.activity_id === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    let sql = "DELETE FROM activity WHERE activity_id = ?";
    let params = mysqlHandle.formatParams(body.activity_id);
    mysqlHandle.exec(sql, params, res => {
        if (res != null) {
            log.debug(res);
            resp.json(msgResult.successResp('删除成功'));
        } else {
            log.error('数据库删除失败');
            resp.json(msgResult.errorResp('数据库删除失败'));
        }
    });
};


// 获取关注 数量
function getFollowCount(activity_id) {
    return new Promise((resolve, reject) => {
        let sql1 = `select count(*) as followCount from  follow where firend_id = ? and type = 3`;
        let params = mysqlHandle.formatParams(activity_id);
        let followCount;
        mysqlHandle.exec(sql1, params, res => {
            followCount = res[0].followCount;
            resolve({
                followCount: followCount,
            });
        });
    });
}

// 添加url前缀
function addURl(object, req) {
    return new Promise((resolve, reject) => {

        let arr = [];
        object.forEach(item => {
            let obj;
            obj = item;
            obj.image_url = 'http://' + req.headers.host + item.image_url;
            obj.avatar = 'http://' + req.headers.host + item.avatar;
            arr.push(obj);
        });
        resolve(arr);
    });
}

// 格式输出到前台的数据。异步嵌套异步 难点。
async function formatData(arr, req) {
    let data = await addURl(arr, req);// 同步了
    for (let i = 0; i < data.length; i++) {
        let count = await getFollowCount(data[i].activity_id);
        data[i].followCount = count.followCount;

    }

    return data;
}

module.exports = {
    addActivity, getActivity, setActivity, deleteActivity, getAllActivity, searchActivity
};