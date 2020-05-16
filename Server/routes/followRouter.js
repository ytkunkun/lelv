const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const follow = require('../server/module/follow');


router.post('/followUser', (req, resp) => {

    follow.followUser(req, resp);
});
router.post('/followActivity', (req, resp) => {

    follow.followActivity(req, resp);
});
router.post('/followShop', (req, resp) => {

    follow.followShop(req, resp);
});
router.post('/likeArticle', (req, resp) => {

    follow.likeArticle(req, resp);
});
router.post('/forwardArticle', (req, resp) => {

    follow.forwardArticle(req, resp);
});
router.post('/getFollowInfo', (req, resp) => {

    follow.getFollowInfo(req, resp);
});
router.post('/deleteForward', (req, resp) => {

    follow.deleteForward(req, resp);
});

module.exports = router;