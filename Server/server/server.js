const express = require('express');
const path = require('path');

// 设置post的请求体解析工具
const bodyparser = require('body-parser');

// 设置cookie处理工具
const cookieparser = require('cookie-parser');
const app = express();

// 导入自定义的模块
const usersRouter = require('../routes/userRouter');
const businessRouter = require('../routes/businessRouter');
const orderRouter = require('../routes/orderRouter');
const activityRouter = require('../routes/activityRouter');
const shopRouter = require('../routes/shopRouter');
const articleRouter = require('../routes/articleRouter');
const followRouter = require('../routes/followRouter');
const resourceRouter = require('../routes/resourceRouter');
const chatRouter = require('../routes/chatRouter');
const noticeRouter = require('../routes/noticeRouter');
const manageRouter = require('../routes/manageRouter');
const searchRouter = require('../routes/searchRouter');
const verifyRouter = require('../routes/verifyRouter');
const fnode = require('./core/config/fnode');
const log = require('./core/util/log');
// const test = require('../test');
// 设置静态目录
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "*");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        requestIntercept(req);// 调用拦截器
    next();
});// 全系统允许跨域处理

/**
 * 判断请求类型 请求头  请求参数
 * @param request
 */
function requestIntercept(request) {
    // console.log(request);
    // 1、判断本次请求的类型，只考虑POST\GET
    let type = request.method;
    // log.debug('请求参数', type);
    // 2、根据请求类型获取请求参数
    let params;
    if (type === "POST") {
        params = request.body;
    } else if (type === "GET") {
        params = request.query;
    }
    log.debug('参数', params);
    // 3、获取请求头
    let header = request.headers;
    log.debug('请求头', header);
}

app.use('/user', usersRouter);
app.use('/business', businessRouter);
app.use('/order', orderRouter);
app.use('/activity', activityRouter);
app.use('/shop', shopRouter);
app.use('/article', articleRouter);
app.use('/follow', followRouter);
app.use('/resource', resourceRouter);
app.use('/chat', chatRouter);
app.use('/notice', noticeRouter);
// app.use('/test', test);
app.use('/manage', manageRouter);
app.use('/search', searchRouter);
app.use('/verify', verifyRouter);


let listen = function () {
    app.listen(fnode.system.port, () => {
        log.info("[SYSTERM]服务已启动...");
        log.info("[SYSTERM]服务运行中...");
        log.info(`Local:   http://localhost/`);
        log.info(`NetWork: http://${getIPAdress()}/`);
    })
};

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

// 启动项目
!function () {
    log.info(`
#    _             _                 _____                          
#   | |           | |               / ____|                         
#   | |     ___   | |  __   __     | (___   ___ _ ____   _____ _ __ 
#   | |    / _ \\  | |  \\ \\ / /      \\___ \\ / _ \\ '__\\ \\ / / _ \\ '__|
#   | |___|  __/  | |___\\ V /       ____) |  __/ |   \\ V /  __/ |   
#   |______\\___|  |______\\_/       |_____/ \\___|_|    \\_/ \\___|_|   
#                                                                                                      
server :: (v0.0.1RELEASE)
`);
    log.info(`[SYSTERM]${fnode.system.name}服务启动中...`);
    log.info("[SYSTERM]等待...");

    // 启动检测项
    log.info("[SYSTERM]启动检查");

    // 启动
    listen();
}();


