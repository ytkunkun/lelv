// 引入核心模块
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');// 上传图片的模板
const future = require('./future');
const log = require('./log');

// 引入自定义模块
const msgResult = require('./msgResult');
const upload = multer({dest: 'uploads/'}); //生成的图片放入uploads文件夹下


// 图片上传必须用post方法
// router.post('/uploadImg', upload.array('file', 10), (req, resp) => {
//     let tmp = uploadImgArray(req, resp);
//     tmp.then(res => {
//         log.error('11111');
//         log.error(res);
//     })
// });


function uploadImg(req, resp) {
    let binaryPath = path.join(__dirname, '../../../', req.file.path);
    return new Promise((resolve, reject) => {
        //读取文件路径
        fs.readFile(req.file.path, (err, data) => {
            //如果读取失败
            if (err) {
                return resp.json(msgResult.errorResp('读取失败'));
            }
            let extname = req.file.mimetype.split('/')[1];
            //拼接成图片名
            let keepName = future.newID() + '.' + extname;
            let imgURL = 'http://' + req.headers.host + '/images/uploads/' + keepName;
            log.debug('图片路径', imgURL);
            let relativePath = '/images/uploads/' + keepName;
            log.debug('图片相对路径', relativePath);
            fs.writeFile(path.join(__dirname, '../../../public/images/uploads/' + keepName), data, (err) => {
                if (err) {
                    return resp.json(msgResult.errorResp('写入失败'));
                }

                if (fs.existsSync(binaryPath)) {
                    fs.unlinkSync(binaryPath);
                }

                resolve({
                    imgURL: imgURL,
                    relativePath: relativePath
                });
            });
        });
    });
}

function uploadImgArray(req, resp) {
    // let arr = [];

    console.log('单张',req.file);
    console.log('多张',req.files);
    resp.end("5535");
    // return new Promise((resolve, reject) => {

        // req.files.forEach((item, index) => {
        //     let binaryPath = path.join(__dirname, '../../../', item.path);
        //     let data = fs.readFileSync(item.path);// 同步读取文件
        //     let extname = item.mimetype.split('/')[1];
        //     //拼接成图片名
        //     let keepName = future.newID() + '.' + extname;
        //     let imgURL = 'http://' + req.headers.host + '/images/uploads/' + keepName;
        //     log.debug(`上传第${index + 1}张图：`, imgURL);
        //     let relativePath = '/images/uploads/' + keepName;
        //
        //     fs.writeFile(path.join(__dirname, '../../../public/images/uploads/' + keepName), data, (err) => {
        //         if (err) {
        //             return resp.json(msgResult.errorResp('写入失败'));
        //         }
        //
        //         // 删除二进制文件
        //         if (fs.existsSync(binaryPath)) {
        //             fs.unlinkSync(binaryPath);
        //         }
        //     });
        //     arr.push({
        //         id: index,
        //         imgURL: imgURL,
        //         relativePath: relativePath
        //     });
        // });
        //
        // resolve(arr);
    // });
}

module.exports = {uploadImg, uploadImgArray};
// module.exports = router;