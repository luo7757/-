'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { articleId, userId } = event;
	const UserInfo = await db.collection('user').doc(userId).get();
	// 获取用户Ids集合
	const articleIds = UserInfo.data[0].article_likes_ids;
	
	let returnMsg = null;
	let articleArr = null;
	// 如果包含删除收藏
	if(articleIds.includes(articleId)){
		articleArr = dbCmd.pull(articleId);
		returnMsg = '取消收藏成功'
	}else{
		articleArr = dbCmd.addToSet(articleId);
		returnMsg = '添加收藏成功'
	}
	
	await db.collection('user').doc(userId).update({
		article_likes_ids: articleArr
	});
	
	const updateUserInfo = await db.collection('user').doc(userId).get();
	
	
	//返回数据给客户端
	
	return {
		code: 0,
		data: {
			msg: returnMsg,
			newUserInfo : updateUserInfo.data[0]
		}
	}
};
