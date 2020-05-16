const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const activity = require('../server/module/activity');
const article = require('../server/module/article');
const business = require('../server/module/business');
const user = require('../server/module/user');
const shop = require('../server/module/shop');
const order = require('../server/module/order');


router.post('/activity', (req, resp) => {
    activity.searchActivity(req, resp);
});

router.post('/article', (req, resp) => {
    article.searchArticle(req, resp);
});

router.post('/business', (req, resp) => {
    business.searchBusiness(req, resp);
});

router.post('/user', (req, resp) => {
    user.searchUser(req, resp);
});

router.post('/shop', (req, resp) => {
    shop.searchShop(req, resp);
});

router.post('/order', (req, resp) => {
    order.searchOrder(req, resp);
});

module.exports = router;