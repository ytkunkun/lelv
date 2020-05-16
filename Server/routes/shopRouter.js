const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const shop = require('../server/module/shop');

router.post('/getShopInfo', (req, resp) => {

    shop.getShopInfo(req, resp);
});
router.post('/getAllShopInfo', (req, resp) => {

    shop.getAllShopInfo(req, resp);
});

router.post('/setShopAdress', (req, resp) => {

    shop.setShopAdress(req, resp);
});

router.post('/setShopName', (req, resp) => {

    shop.setShopName(req, resp);
});

router.post('/drawMoney', (req, resp) => {

    shop.drawMoney(req, resp);
});

router.post('/addMoney', (req, resp) => {

    shop.addMoney(req, resp);
});


router.post('/addEmployee', (req, resp) => {

    shop.addEmployee(req, resp);
});


router.post('/getAllEmployee', (req, resp) => {

    shop.getAllEmployee(req, resp);
});


router.post('/deleteEmployee', (req, resp) => {

    shop.deleteEmployee(req, resp);
});


router.post('/setEmployeeState', (req, resp) => {

    shop.setEmployeeState(req, resp);
});


router.post('/setEmployeeInfo', (req, resp) => {

    shop.setEmployeeInfo(req, resp);
});

router.post('/getBill', (req, resp) => {

    shop.getBill(req, resp);
});

router.post('/getAllBill', (req, resp) => {

    shop.getAllBill(req, resp);
});

module.exports = router;