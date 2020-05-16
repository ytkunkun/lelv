let redis = require('redis');
let fnode = require('../config/fnode');
let log = require('../util/log');
let client = redis.createClient(fnode.redis.port, fnode.redis.host, fnode.redis.opts);


let redisDb = {};
/**
 * 设置redis
 * @param key
 * @param value
 * @param expire
 * @param callback
 */
redisDb.set = (key, value, expire, callback) => {
    client.set(key, value, (err, result) => { // 设置键值对
        if (err) {

            callback(err, null);
            return;
        }

        if (!isNaN(expire) && expire > 0) { // 设置过期时间
            client.expire(key, parseInt(expire));
        }
        callback(null, result);

    });
};

/**
 * 获取redis
 * @param key
 * @param callback
 */
redisDb.get = (key, callback) => {
    client.get(key, function (err, result) { // 获取key对应的值

        if (err) {
            log.info(`获取错误:${err}`);
            callback(err, null);
            return;
        }

        callback(null, result);
    });
};

/**
 * 判断是否存在
 * @param key
 * @param callback
 */
redisDb.exists = (key, callback) => {
    client.exists(key, (err, result) => {

        if (err) {
            log.info(`错误:${err}`);
            callback(err, null);
            return;
        }
        let res = parseInt(result) === 1 ? true : false;

        callback(null, res);
    })
};

redisDb.del = (key, callback) => {
    client.del(key, (err, result) => { // 设置键值对
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, result);
    });
};

module.exports = redisDb;