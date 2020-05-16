const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const user = require('../server/module/user');
router.post('/login', (req, resp) => {
    user.login(req, resp);
});

router.post('/register', (req, resp) => {
    user.register(req, resp);
});
router.post('/updateUserInfo', (req, resp) => {

    user.updateUserInfo(req, resp);
});
router.post('/getUserInfo', (req, resp) => {

    user.getUserInfo(req, resp);
});
router.post('/getAllUserInfo', (req, resp) => {

    user.getAllUserInfo(req, resp);
});
router.post('/updatePhoneByUserID', (req, resp) => {

    user.updatePhoneByUserID(req, resp);
});
router.post('/deleteUser', (req, resp) => {

    user.deleteUser(req, resp);
});

router.post('/uploadAvatar', upload.single('file'), (req, resp) => {
    user.uploadAvatar(req, resp);
});

module.exports = router;