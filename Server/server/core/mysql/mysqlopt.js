// 引入核心模块
const mysql = require('mysql');
//引入配置文件
const fnode = require('../config/fnode');

let connection = mysql.createConnection({
    host: fnode.mysql.host,
    port: fnode.mysql.port,
    user: fnode.mysql.user,
    password: fnode.mysql.password,
    database: fnode.mysql.database,
    timezone: fnode.mysql.timezone
});

connection.connect();

function exec(sql, params, success, error) {

    connection.query(sql, params, (err, result) => {
        if (err) {
            if (error) {
                error(err);
                return
            }
        }

        if (success) {
            success(result);
        }
    });

}

/**
 * 参数格式化成数组
 * @returns {[]}
 */
function formatParams() {

    let arr = [];
    for (let i in arguments) {
        arr.push(arguments[i]);
    }
    return arr;
}

module.exports = {exec, formatParams};