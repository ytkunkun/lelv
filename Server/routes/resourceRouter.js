const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const resources = require('../server/module/resource');


router.post('/addResource', upload.single('file'), (req, resp) => {
    resources.addResource(req, resp);
});

router.post('/deleteResource', (req, resp) => {

    resources.deleteResource(req, resp);
});
router.post('/getAllResource', (req, resp) => {

    resources.getAllResource(req, resp);
});
router.post('/getResource', (req, resp) => {

    resources.getResource(req, resp);
});

module.exports = router;