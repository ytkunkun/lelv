module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'family_day',
        timezone: '08:00',
        dateStrings: 'false'
    },
    redis: {
        port: 6379,
        host:'localhost',
        opts:{}
    },
    system: {
        name: "乐旅亲子",
        port: 80,
    },
    mail: {
        config: {
            service: "QQ",
            auth: {
                user: 'lelvserver@foxmail.com',// 发件人邮箱账号
                pass: 'ocooglmparscdjej' // 授权码
            }
        },
    },
    app:{
        version:"1.0.2",// 版本号
        download:"https://www.lanzous.com/b0ejjm3eh",// APP下载路径
        updatedInfo:"修复部分已知Bug"// 更新说明
    }
};