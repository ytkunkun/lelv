const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const business = require('../server/module/business');

router.post('/login', (req, resp) => {
    business.login(req, resp);
});
router.post('/register', (req, resp) => {
    business.register(req, resp);
});
router.post('/updateBusinessInfo', (req, resp) => {
    business.updateBusinessInfo(req, resp);
});
router.post('/getBusinessInfo', (req, resp) => {
    business.getBusinessInfo(req, resp);
});
router.post('/getAllBusinessInfo', (req, resp) => {
    business.getAllBusinessInfo(req, resp);
});
router.post('/deleteBusiness', (req, resp) => {
    business.deleteBusiness(req, resp);
});
router.post('/updatePhoneByBusinessID', (req, resp) => {
    business.updatePhoneByBusinessID(req, resp);
});
router.post('/uploadAvatar', upload.single('file'), (req, resp) => {
    business.uploadAvatar(req, resp);
});

router.post('/uploadCertificates', upload.single('file'), (req, resp) => {
    business.uploadCertificates(req, resp);
});


module.exports = router;