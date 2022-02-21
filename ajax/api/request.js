export default ({name, data= {}}) => {
	return new Promise((resolve, reject) => {
		const { noLoading = true } = data;
		
		noLoading && uni.showLoading({});
		// 彈窗
		uniCloud.callFunction({
			// 調用云函數
			name,
			data,
			success : ({result}) => {
				// 失敗和成功的 處理邏輯
				if(result.code === 0) {
					resolve(result);
				}else{
					uni.showToast({
						icon: "none",
						title: result.msg,
					})
				}
			},
			fail: (err) => {
				reject(err);
			},
			complete(){
				// 完成時的回調
				noLoading && uni.hideLoading();
			}
		})
	})
}