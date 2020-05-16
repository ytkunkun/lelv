//引入模块 nodemailer
const nodemailer = require('nodemailer');
const fnode = require('../config/fnode');
const log = require('./log');

//创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport(fnode.mail.config);


// 发送邮件
let send = (opt, callback) => {

    let obj = {
        // 发件人 邮箱 '昵称<发件人邮箱>'
        from: `乐旅App<${fnode.mail.config.auth.user}>`,
        // 主题
        subject: opt.title,
        // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
        to: opt.recipient,
        //这里可以添加html标签
        html: opt.body
    };

    transporter.sendMail(obj, function (error, info) {
        if (error) {
            callback(error, null);
            return console.log(error);
        }
        log.debug(info.response);
        transporter.close();
        callback(null, 'ok')
    });
};


module.exports = {send};
