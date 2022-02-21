'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { userId, authorId } = event;
	// 查询用户的信息 获得用户的关注author-likes-ids 数组
	// 判断当前传递的 authorid  是否存在 
	// 存在 删除 
	// 不存在 添加

	let user = await db.collection('user').doc(userId).get();
	let authorLikesIds = user.data[0].author_likes_ids; // 数据库arr对象
	
	let returnMsg = null;
	let author_ids =null;
	
	if(authorLikesIds.includes(authorId)){
		// 存在
		returnMsg = '取消关注成功'
		author_ids = dbCmd.pull(authorId); // 删除指令 dbCmd 是uni提供的操作 数据库Arr对象的 方法
	}else{
		// 不存在
		returnMsg = '关注作者成功'
		author_ids = dbCmd.addToSet(authorId);
	};
	
	// 获取 user表 中的对应user  修改 user中的 author_likes_ids 关键词的值为 author_ids
	await db.collection('user').doc(userId).update({
		author_likes_ids: author_ids
	})
	//返回数据给客户端
	return {
		code: 0,
		data:{
			msg: returnMsg
		}
	}
};
