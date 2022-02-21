'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { userId, articleId } = event;
	
	// 获取用户信息
	let user = await db.collection('user').doc(userId).get();
	// 用户点赞文章集合
	let thumbs_up_article_ids = user.data[0].thumbs_up_article_ids;
	
	
	let tempArr = null;
	let returnMsg = '';
	let thumbsNumber = null;
	
	// 判断当前传递的文章id 是否存在于合集中
	if(thumbs_up_article_ids.includes(articleId)){
		// 存在  取消点赞
		tempArr = dbCmd.pull(articleId); // 操作对象 
		thumbsNumber = -1;
		returnMsg = '您取消了点赞'
	}else{
		// 不存在 点赞
		tempArr = dbCmd.addToSet(articleId)
		thumbsNumber = 1
		returnMsg = '点赞成功'
	}

	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids: tempArr
	})
	
	await db.collection('article').doc(articleId).update({
		thumbs_up_article_ids: dbCmd.inc(thumbsNumber)
	})

	
	//返回数据给客户端
	return {
		code: 0,
		data:{
			msg: returnMsg
		}
	}
};
