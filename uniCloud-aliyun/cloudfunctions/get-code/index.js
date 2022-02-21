'use strict';
const db = uniCloud.collection();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 获取验证码使用 uni 提供的服务
	
	//返回数据给客户端
	return event
};
