const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const activity = require('../server/module/activity');

router.post('/addActivity', upload.single('file'), (req, resp) => {
    activity.addActivity(req, resp);
});

router.post('/getActivity', (req, resp) => {
    activity.getActivity(req, resp);
});
router.post('/getAllActivity', (req, resp) => {
    activity.getAllActivity(req, resp);
});

router.post('/setActivity', upload.single('file'), (req, resp) => {
    activity.setActivity(req, resp);
});

router.post('/deleteActivity', (req, resp) => {
    activity.deleteActivity(req, resp);
});
router.post('/setState', (req, resp) => {
    activity.setState(req, resp);
});

router.post('/addTotal', (req, resp) => {
    activity.addTotal(req, resp);
});
router.post('/addBrowseCount', (req, resp) => {
    activity.addBrowseCount(req, resp);
});
router.post('/addCommentCount', (req, resp) => {
    activity.addCommentCount(req, resp);
});
module.exports = router;