const express = require('express');
const router = express.Router();
const multer = require('multer');// 上传图片的模板
const upload = multer({ dest: 'uploads/' }); //生成的图片放入uploads文件夹下
const chat = require('../server/module/chat');

router.post('/sendMessage', (req, resp) => {

    chat.sendMessage(req, resp);
});
router.post('/receiveMessage', (req, resp) => {

    chat.receiveMessage(req, resp);
});
router.post('/getUserAndBusinessRecord', (req, resp) => {
    chat.getUserAndBusinessRecord(req, resp);
});
router.post('/getUserChatObj', (req, resp) => {
    chat.getUserChatObj(req, resp);
});
router.post('/getBusinessChatObj', (req, resp) => {
    chat.getBusinessChatObj(req, resp);
});


module.exports = router;