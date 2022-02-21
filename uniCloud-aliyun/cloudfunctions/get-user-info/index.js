'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// 获得传递的参数 event
	console.log('event : ', event)
	const {loginName, password, phone, type} = event;
	const { affectedDocs, data} = await db.collection('user')
	.aggregate()
	.match((type === 'account' ? {loginName, password} : {phone}))
	.end()
	
	//返回数据给客户端
	// affectedDocs是返回的查询到的数据量 有就是查询到了
	return affectedDocs ? {
		code: 0,
		msg: "获取用户信息成功",
		data: data[0]
	} : {
		code : 1,
		msg: type === 'account' ? '用户信息获取失败，请检查用户名或密码' : '验证码或手机号错误'
	}
};
