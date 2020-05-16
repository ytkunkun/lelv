const msgResult = require('../core/util/msgResult');
const mysqlHandle = require('../core/mysql/mysqlopt');
const qs = require('qs');
const future = require('../core/util/future');
const upload = require('../core/util/upload');
const log = require('../core/util/log');

// type 1 收入 2支出
let billRecord = (shop_id, money, type) => {
    let sql;
    if (type == 1) {
        sql = `INSERT INTO bill (shop_id, type, money, create_time) VALUES ( ?, 1, ?, NOW());`;
    } else if (type == 2) {
        sql = `INSERT INTO bill (shop_id, type, money, create_time) VALUES ( ?, 2, ?, NOW());`;
    }
    let params = mysqlHandle.formatParams(shop_id, money);
    mysqlHandle.exec(sql, params, res => {
        log.debug('账单记录成功')
    });
};


module.exports = {
    billRecord
};
