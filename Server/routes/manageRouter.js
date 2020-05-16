const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const manage = require('../server/module/manage');

router.post('/login', (req, resp) => {
    manage.login(req, resp);
});
router.post('/getAllManage', (req, resp) => {
    manage.getAllManage(req, resp);
});
router.post('/register', (req, resp) => {
    manage.register(req, resp);
});
router.post('/setPassword', (req, resp) => {
    manage.setPassword(req, resp);
});
router.post('/getManage', (req, resp) => {
    manage.getManage(req, resp);
});


module.exports = router;