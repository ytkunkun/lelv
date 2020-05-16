const express = require('express');
const router = express.Router();
const verify = require('../server/module/verify');

router.post('/sendMailCode', (req, resp) => {
    verify.sendMailCode(req, resp);
});

router.post('/isVerify', (req, resp) => {
    verify.isVerify(req, resp);
});

module.exports = router;