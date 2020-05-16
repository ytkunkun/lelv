const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const notice = require('../server/module/notice');

router.post('/deleteNotice', (req, resp) => {

    notice.deleteNotice(req, resp);
});

router.post('/sendNotice', (req, resp) => {

    notice.sendNotice(req, resp);
});

router.post('/getAllNotice', (req, resp) => {

    notice.getAllNotice(req, resp);
});
router.post('/isUpdated', (req, resp) => {
    notice.isUpdated(req, resp);
});

module.exports = router;