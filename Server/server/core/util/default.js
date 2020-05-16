const future = require('./future');
let defaultInfo = {};
defaultInfo.nick = () => `亲子用户_${future.getRandom(4)}`;
defaultInfo.businessNick = () => `商家用户_${future.getRandom(4)}`;
defaultInfo.avatar_business = `/images/default_avatar_business.png`;
defaultInfo.avatar_user = `/images/default_avatar_user.png`;
defaultInfo.sex = '男';
defaultInfo.birthday = "2000-01-01";
defaultInfo.createTime = "NOW()";
defaultInfo.coin = 100;
defaultInfo.state = 1;
defaultInfo.money = 0;
defaultInfo.is_qualification = 0;
defaultInfo.cooperation_type = 0;
defaultInfo.employee_avatar = '/images/default_employee.png';
defaultInfo.manage_avatar = '/images/default_employee.png';

module.exports = defaultInfo;