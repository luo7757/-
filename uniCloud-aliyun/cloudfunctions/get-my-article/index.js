'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { userId } = event;
	
	const userInfo = await db.collection('user').doc(userId).get();
	const articleList = userInfo.data[0].article_ids;
	console.log(userInfo)
	
	const list = await db.collection('article').aggregate().project({
		content: 0,
		comments: 0,
		// 过滤掉上面的属性 这个api没有用
	}).match({
		// 判断id 这个字段在 查询到的article表中 是否存在
		id: dbCmd.in(articleList)
	}).end();
	//返回数据给客户端
	return {
		code : 0,
		msg: '请求成功',
		data: list.data
	}
};
