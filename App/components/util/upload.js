let future = {};
future.uploadImg = function(url, data) {
	uni.chooseImage({
		success: chooseImageRes => {
			const tempFilePaths = chooseImageRes.tempFilePaths;
			console.log(tempFilePaths);
			console.log(tempFilePaths.length);
			if (tempFilePaths.length > 1) {

				for (let i = 0; i < tempFilePaths.length; i++) {
					future.upload(url, tempFilePaths[i], data);
				}

			} else {
				future.upload(url, tempFilePaths[0], data);
			}
		}
	});
};

future.upload = function(url, path, data, successResp, failResp) {
	const uploadTask = uni.uploadFile({
		url: url,
		filePath: path,
		name: 'file',
		formData: data,
		success: uploadFileRes => {
			successResp(JSON.parse(uploadFileRes.data))

		},
		fail: fail => {
			failResp(JSON.parse(fail))
		}
	});

	uploadTask.onProgressUpdate(res => {
		// console.log('上传进度' + res.progress);
		// console.log('已经上传的数据长度' + res.totalBytesSent);
		// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

	});
}
module.exports = future;
