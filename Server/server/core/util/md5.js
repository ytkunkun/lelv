const crypto = require('crypto');

/**
 * md5 加密
 * @param pwd
 * @returns {PromiseLike<ArrayBuffer>}
 */
function md5Hex(pwd) {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');// 返回原始密码的md5
}

/**
 * md5加盐加密
 * @param pwd
 * @returns {PromiseLike<ArrayBuffer>}
 */
function md5Salt(pwd) {
    let hash = md5Hex(pwd);
    let hashSalt = hash.slice(0, 5) + hash + hash.slice(-5);  // md5 + 盐
    return md5Hex(hashSalt)
}

function getRandomSalt() {
    crypto.randomBytes(16, (err, salt) => {
        if (err) throw err;
        return salt.toString('hex');  // 记录盐值可读的字符串版本
    });
}

module.exports = {md5Hex,md5Salt};
