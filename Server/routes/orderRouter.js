const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const order = require('../server/module/order');
router.post('/addOrder', (req, resp) => {

    order.addOrder(req, resp);
});
router.post('/pay', (req, resp) => {

    order.pay(req, resp);
});
router.post('/orderEnd', (req, resp) => {

    order.orderEnd(req, resp);
});
router.post('/deleteOrder', (req, resp) => {

    order.deleteOrder(req, resp);
});
router.post('/cancelOrder', (req, resp) => {

    order.cancelOrder(req, resp);
});
router.post('/getShopOrder', (req, resp) => {

    order.getShopOrder(req, resp);
});
router.post('/getShopOrderDetails', (req, resp) => {

    order.getShopOrderDetails(req, resp);
});

router.post('/getAllOrder', (req, resp) => {

    order.getAllOrder(req, resp);
});

router.post('/getUserOrder', (req, resp) => {

    order.getUserOrder(req, resp);
});
router.post('/getUserOrderDetails', (req, resp) => {

    order.getUserOrderDetails(req, resp);
});
router.post('/getAllOrderDetails', (req, resp) => {

    order.getAllOrderDetails(req, resp);
});
module.exports = router;