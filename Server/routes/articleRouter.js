const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下
const article = require('../server/module/article');


router.post('/addArticle', upload.single('file'), (req, resp) => {
    article.addArticle(req, resp);
});
router.post('/setArticle', upload.single('file'), (req, resp) => {
    article.setArticle(req, resp);
});
router.post('/deleteArticle', (req, resp) => {
    article.deleteArticle(req, resp);
});
router.post('/getArticle', (req, resp) => {
    article.getArticle(req, resp);
});
router.post('/getUserArticle', (req, resp) => {
    article.getUserArticle(req, resp);
});
router.post('/getAllArticle', (req, resp) => {
    article.getAllArticle(req, resp);
});

module.exports = router;