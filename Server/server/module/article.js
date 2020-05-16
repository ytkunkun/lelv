const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const upload = require('../core/util/upload');
const log = require('../core/util/log');


/**
 * @api {post} article/addArticle 添加文章
 * @apiDescription 添加文章
 * @apiName addArticle
 * @apiGroup Article
 * @apiParam {int} user_id 用户id
 * @apiParam {string} title 标题
 * @apiParam {string} content 内容
 * @apiParam  {file}  file 图片
 * @apiParam  {int}  isview 其他人是否可见 0 不可见 1 可见
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
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
				article_id: 2,
				title: '1111',
				content: '2222'
			};
			// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)
			$upload.upload('http://127.0.0.1/article/setArticle', path, data, res => {
				console.log(res);
			});
		}
 * @apiSampleRequest http://dkcloud.xyz/article/addArticle
 * @apiVersion 1.0.0
 */

let addArticle = (req, resp) => {
    let body = qs.parse(req.body);

    log.debug(req.file);
    if (body.user_id === undefined || body.title === undefined || body.content === undefined || body.isview === undefined) {
        resp.json('传入参数不合法');
        return;
    }

    let uploadResult = upload.uploadImg(req, resp);
    uploadResult.then(resolve => {
        let sql = `INSERT INTO article 
                    (user_id, title, content, image_url, create_time,isview) 
                        VALUES 
                    ( ?, ?, ?,?,NOW(),?)`;
        let params = mysqlHandle.formatParams(body.user_id, body.title, body.content, resolve.relativePath, body.isview);
        mysqlHandle.exec(sql, params, res => {
            log.debug('添加文章成功');
            resp.json(msgResult.successResp('添加文章成功'));
        });

    })

};


/**
 * @api {post} article/setArticle 修改文章
 * @apiDescription 修改文章
 * @apiName setArticle
 * @apiGroup Article
 * @apiParam {string} title 标题
 * @apiParam {string} content 内容
 * @apiParam {file}  file 图片
 * @apiParam {int}  isview 其他人是否可见 0 不可见 1 可见
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
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
				article_id: 2,
				title: '1111',
				content: '2222',
				isview :1
			};
			// 调用上传组件， 4个参数：(上传地址,图片临时路径,传入后台参数,后台返回的数据)
			$upload.upload('http://127.0.0.1/article/setArticle', path, data, res => {
				console.log(res);
			});
		}
 }
 * @apiSampleRequest http://dkcloud.xyz/article/setArticle
 * @apiVersion 1.0.0
 */
let setArticle = (req, resp) => {
    let body = qs.parse(req.body);
    log.error(body);
    log.debug('传入的图片', req.file);
    if (body.article_id === undefined || body.title === undefined || body.content === undefined || body.isview === undefined) {
        resp.json('传入参数不合法');
        return;
    }

    let uploadResult = upload.uploadImg(req, resp);
    uploadResult.then(resolve => {
        let sql = `UPDATE article 
                        SET 
                            title = ?,
                            content = ?,
                            image_url = ?,
                            isview = ?
                        WHERE
                        article_id = ? `;

        let params = mysqlHandle.formatParams(body.title, body.content, resolve.relativePath, body.isview, body.article_id);
        mysqlHandle.exec(sql, params, res => {
            log.debug(res);
            log.debug('修改文章成功');
            resp.json(msgResult.successResp('修改文章成功'));
        });

    });

};

/**
 * @api {post} article/deleteArticle 删除文章
 * @apiDescription 删除文章
 * @apiName deleteArticle
 * @apiGroup Article
 * @apiParam {int} article_id 文章id
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/article/deleteArticle
 * @apiVersion 1.0.0
 */
let deleteArticle = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.article_id === undefined) {
        resp.json('传入参数不合法');
        return;
    }
    let sql = `select * from article where article_id = ?`;
    let params = mysqlHandle.formatParams(body.article_id);
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            mysqlHandle.exec(`DELETE FROM  article WHERE article_id = ?`,
                mysqlHandle.formatParams(body.article_id), res => {
                    if (res != null) {
                        //同步删除转发里面的数据
                        mysqlHandle.exec(`delete from follow where firend_id =? and type = 5`,
                            mysqlHandle.formatParams(body.article_id), res => {
                                log.debug(res);
                                resp.json(msgResult.successResp('删除成功'));
                            });
                    } else {
                        log.error('数据库删除失败');
                        resp.json(msgResult.errorResp('数据库删除失败'));
                    }
                });
        } else {
            log.debug('文章id不存在');
            resp.json(msgResult.successResp('文章id不存在'));
        }
    });
};

/**
 * @api {post} article/getAllArticle 获取全部文章
 * @apiDescription 获取全部文章
 * @apiName getAllArticle
 * @apiGroup Article
 * @apiParam {int} page 页数(可选参数)
 * @apiParam {int} size 一页展示多少(可选参数)
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/article/getAllArticle
 * @apiVersion 1.0.0
 */
let getAllArticle = (req, resp) => {
    let body = qs.parse(req.body);
    let sql = `select * from v_user_article`;
    let params = mysqlHandle.formatParams('');
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            let total = res.length;
            if (body.page != undefined && body.size != undefined) {
                let page = (parseInt(body.page) - 1) * parseInt(body.size);
                let size = parseInt(body.size);
                sql = `SELECT * FROM v_user_article LIMIT ${page}, ${size}`;
                mysqlHandle.exec(sql, params, res => {
                    let p = formatData(res, req);
                    p.then(data => {
                        log.debug(data);
                        let obj = {
                            total: total,
                            data: data
                        };


                        resp.json(msgResult.successResp(obj));
                    });
                });
            } else {
                let p = formatData(res, req);
                p.then(data => {
                    log.debug(data);
                    resp.json(msgResult.successResp(data));
                });
            }

        } else {
            log.debug('暂无文章');
            resp.json(msgResult.successResp('暂无文章'));
        }
    });
};


/**
 * @api {post} search/article 通过文章标题或时间搜索文章内容
 * @apiDescription   通过文章标题或时间搜索文章内容
 * @apiName searchArticle
 * @apiParam {string} keyword 搜索内容
 * @apiParam {string} type article_title、article_time
 * @apiGroup Search
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/search/article
 * @apiVersion 1.0.0
 */
let searchArticle = (req, resp) => {
    let body = qs.parse(req.body);
    let keyword = body.keyword;
    let type = body.type;
    if (type == "article_title" || type == "article_time") {
        log.error(type)
        let sql = `select * from v_user_article where ${type} LIKE '%${keyword}%'`;
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
 * @api {post} article/getUserArticle 获取某个用户文章
 * @apiDescription 获取某个用户文章
 * @apiName getUserArticle
 * @apiParam {int} user_id 用户id
 * @apiGroup Article
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/article/getUserArticle
 * @apiVersion 1.0.0
 */
let getUserArticle = (req, resp) => {
    let body = qs.parse(req.body);
    let sql = `select * from v_user_article where user_id = ?`;
    let params = mysqlHandle.formatParams(body.user_id);
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            let p = formatData(res, req);
            p.then(data => {
                log.debug(data);
                resp.json(msgResult.successResp(data));
            });

        } else {
            log.debug('暂无文章');
            resp.json(msgResult.successResp('暂无文章'));

        }
    });
};

/**
 * @api {post} article/getArticle 获取某个文章
 * @apiDescription 获取某个文章
 * @apiName getArticle
 * @apiParam {int} article_id 文章id
 * @apiGroup Article
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSampleRequest http://dkcloud.xyz/article/getArticle
 * @apiVersion 1.0.0
 */

let getArticle = (req, resp) => {
    let body = qs.parse(req.body);
    let sql = `select * from v_user_article where article_id = ?`;
    let params = mysqlHandle.formatParams(body.article_id);
    mysqlHandle.exec(sql, params, res => {
        if (res.length > 0) {
            let p = formatData(res, req);
            p.then(data => {
                log.debug(data);
                resp.json(msgResult.successResp(data));
            });

        } else {
            log.debug('暂无文章');
            resp.json(msgResult.successResp('暂无文章'));

        }
    });
};

// 获取文章关注 转发数量
let getArticleFollowCount = (article_id) => {
    return new Promise((resolve, reject) => {
        let sql1 = `select count(*) as followCount from  follow where firend_id = ? and type = 4`;
        let sql2 = `select count(*) as forwardCount from  follow where firend_id = ? and type = 5`;
        let params = mysqlHandle.formatParams(article_id);
        let followCount;
        let forwardCount;
        mysqlHandle.exec(sql1, params, res => {
            followCount = res[0].followCount;
            mysqlHandle.exec(sql2, params, res => {
                forwardCount = res[0].forwardCount;
                resolve({
                    followCount: followCount,
                    forwardCount: forwardCount
                });
            });
        });
    });
};

// 添加url前缀
function addURl(object, req) {

    return new Promise((resolve, reject) => {
        let arr = [];
        object.forEach(item => {
            let obj;
            obj = item;
            obj.article_image = 'http://' + req.headers.host + item.article_image;
            obj.avatar = 'http://' + req.headers.host + item.avatar;
            arr.push(obj);
        });
        resolve(arr);
    });
};

function isLike(user_id,article_id){
    return new Promise ((resolve,reject)=>{
        console.log(user_id,article_id);
        let sql =`SELECT * FROM follow WHERE user_id=? AND  firend_id =?  AND type = 4`;
        let params = mysqlHandle.formatParams(user_id,article_id);
        mysqlHandle.exec(sql,params,res=>{
            console.log(res);
                if(res.length>0){
                    resolve({isLike:1})
                }else{
                    resolve({isLike:0})
                }
        });
    });
}
// 格式输出到前台的数据。异步嵌套异步 难点。
async function formatData(arr, req) {
    let user_id = qs.parse(req.body).user_id;
    let data = await addURl(arr, req);// 同步了

    for (let i = 0; i < data.length; i++) {
        let count = await getArticleFollowCount(data[i].article_id);
        // 如果有user_id 加一个是否点赞
        if (user_id != undefined && user_id !="") {
            let like =await isLike(user_id,data[i].article_id);
            data[i].isLike=like.isLike;
        }
       

        data[i].followCount = count.followCount;
        data[i].forwardCount = count.forwardCount;//  准备做异步
    }

    return data;
}

module.exports = {addArticle, setArticle, deleteArticle, getAllArticle, getArticle, getUserArticle, searchArticle};