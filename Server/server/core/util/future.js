require('./date.format');// 引入 dateformat Example: 'd-m-Y' 'd-m-Y H:i:s'

/**
 * 获取id 时间+随机
 * @returns {*}
 */

let newID = () => (getFormatDate() + getRandom(5));

/**
 * 格式化时间
 * @param formatter
 * @returns {string}
 */

let getFormatDate = (formatter = "Ymd") => new Date().format(formatter);

/**
 * 获取随机数
 * @param n
 * @returns {null|number}
 */
let getRandom = (n) => n > 21 ? null : (Math.floor((Math.random() + 1) * Math.pow(10, n)));

/**
 * 判断是否为数字
 * @param n
 * @returns {boolean}
 */
let isNumber = (n) => Object.prototype.toString.call(n) === "[object Number]";


module.exports = {newID, isNumber, getFormatDate, getRandom};