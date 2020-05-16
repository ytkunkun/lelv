// 封装响应实体对象

// 成功实例
let successResp = (data, msg) => {
    return commonResp("ok", data, msg);
};

// 失败实例
let errorResp = (data, msg) => {
    return commonResp("error", data, msg);
};

// 通用响应的实体模板
let commonResp = (code, data, msg) => {
    if (!code) {
        throw  new Error('code can not  be null, check it please ~');
    }
    if (!msg) {
        return {
            code: code,
            msg: "",
            data: data
        }
    } else {
        return {
            code: code,
            msg: msg,
            data: data
        }
    }

};

module.exports = {
    successResp,
    errorResp,
    commonResp
};