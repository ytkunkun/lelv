const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const log = require('../core/util/log');
const redis = require('../core/redis/redisopt');
const mail = require('../core/util/mail');

/**
 * @api {post} verify/sendMailCode 发送邮箱验证码
 * @apiDescription 发送邮箱验证码
 * @apiName sendMailCode
 * @apiGroup Verify
 * @apiParam {string} mail 邮箱地址
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
    "code": "ok",
    "data": {
        "msg": "验证码发送成功",
        "mailCode": "2511"
        }
    }
 * @apiSampleRequest http://dkcloud.xyz/verify/sendMailCode
 * @apiVersion 1.0.0
 */
let sendMailCode = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.mail === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }
    // 验证邮箱格式
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(body.mail)) {
        resp.json(msgResult.errorResp('邮箱格式错误'));
        return;

    }
    // 验证码随机
    let randomCode = Math.random().toString().substr(2, 4);

    let mailBody = `<div style="background: #f3f3f3; min-width: 350px; font-size: 1px; width: 100%;padding: 35px 0;font-family:'Source Sans Pro', sans-serif ;">
    <div style="width: 100%; max-width: 750px; min-width: 350px; background: #fff;margin: auto;overflow:hidden;padding: 0 25px;">
        <div style="margin:40px 0 80px 0;color: #1a1a1a;font-size: 52px; line-height: 55px; font-weight: 300; letter-spacing: -1.5px;">
            <a href="http://www.dkcloud.xyz/" style="text-decoration:none" rel="noopener" target="_blank"><span
                    class="mob_title1"
                    style="font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif; color: #6777ef; font-size: 48px; line-height: 55px; font-weight: 700; letter-spacing: -1.5px;">乐旅亲子</span></a>
        </div>
        <div style="margin-bottom: 35px;">
            <span style="font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">Hi, Friend</span>
        </div>
        <div style="margin-bottom: 20px;">
            <span style="font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif; color: #585858; font-size: 24px; line-height: 32px;">以下4位数字是邮箱验证码，请在网站上填写以通过验证</span>
        </div>
        <div style="margin-bottom: 35px;">
            <span style="font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif; color: #aaaaaa; font-size: 16px; line-height: 32px;">(如果您从未请求发送邮箱验证码，请忽略此邮件)</span>
        </div>
        <div style="margin-bottom: 75px;">
            <span style="font-family: 'Nunito', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 20px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600; background: #6777ef;padding: 10px 20px"><span
                    style="border-bottom: 1px dashed rgb(204, 204, 204); z-index: 1; position: static;" t="7"
                    onclick="return false;" data="618408"> ${randomCode}</span></span>
        </div>
    </div>
    <div style="text-align: center;margin-top: 30px;">
            <span style="font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 17px; line-height: 20px;"><a
                    href="http://www.dkcloud.xyz/" target="_blank"
                    style="font-family: 'Nunito', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 17px; line-height: 20px; text-decoration: none;"
                    rel="noopener">访问官网</a>
            </span>
    </div>

</div>`;

    // 发件内容
    let opt = {
        recipient: body.mail,
        title: '乐旅亲子——验证码',
        body: mailBody
    };
    // 发送
    mail.send(opt, (err, result) => {
        if (err) {
            log.error(err);
            return;
        }
        if (result === 'ok') {
            redis.set(body.mail, randomCode, 300, (err, result) => {
                log.debug(err);
                log.debug(result);

            });// 验证码存在内存中 设置时间5分钟
            resp.json(msgResult.successResp({
                msg: '验证码发送成功',
                mailCode: randomCode
            }))
        }
    });
};
/**
 * @api {post} verify/isVerify 验证邮箱验证码
 * @apiDescription 验证邮箱验证码
 * @apiName isVerify
 * @apiGroup Verify
 * @apiParam {string} mail 邮箱地址
 * @apiParam {int} code 验证码
 * @apiSuccess code int
 * @apiSuccess data array[object]
 * @apiSuccessExample {json} Success-Response:
 {
        "code": "ok",
        "data":"data": {
                "isVerify": true
                }
    }
 * @apiSampleRequest http://dkcloud.xyz/verify/isVerify
 * @apiVersion 1.0.0
 */
let isVerify = (req, resp) => {
    let body = qs.parse(req.body);
    if (body.mail === undefined || body.code === undefined) {
        resp.json(msgResult.errorResp('传入参数不合法'));
        return;
    }

    // 验证邮箱格式
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(body.mail)) {
        resp.json(msgResult.errorResp('邮箱格式错误'));
        return;
    }

    redis.get(body.mail, (err, result) => {
        if (err) {
            log.error(err);
            return
        }

        log.debug('redis:' + result);

        if (parseInt(result) === parseInt(body.code)) {
            resp.json(msgResult.successResp({
                verifyMail:body.mail,
                isVerify: true
            }));
        } else {
            resp.json(msgResult.errorResp({
                verifyMail:body.mail,
                isVerify: false
            }));
        }

    });

};

module.exports = {sendMailCode, isVerify};