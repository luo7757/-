'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	await db.collection('article').update({
		browse_count: dbCmd.inc(1)
	})
	const { _id } = event;
	const articleData = await db.collection('article')
	.aggregate()
	.match({_id})
	.project({
		comments: 0
	})
	.end();
	//返回数据给客户端
	// console.log(data)
	return {
		code: 0,
		data:articleData.data[0]
	}
};
