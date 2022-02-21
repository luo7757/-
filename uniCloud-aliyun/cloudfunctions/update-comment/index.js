'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { 
		userId, // 当前用户id
		articleId, // 当前文文章id
		text,  // 评论内容
		reply_id = "",  // 回复的那一条评论的id
		is_reply = false, // 是不是回复
		comment_id = "", // 评论id
		} = event;
	// console.log('event : ', event)
	// 创建一个评论对象 
	// 包括 当前用户id  评论文章id  评论内容 评论时间 评论id
	// 评论下的回复 每一个回复就是一个评论对象
	// 被评论对象 （回复专属）
	// 评论 or 回复 is_peply
	
	let {data} = await db.collection('user').doc(userId).get();
	let user = data[0]; // 获得当前用户
	// console.log(user);
	
	const article = await db.collection('article').doc(articleId).get();
	// 通过文章id 查询文章
	const comments = article.data[0].comments;
	// 选中 文章下的 所有评论 comments
	
	
	function generatedId (num) { // 随机id 由随机数字 + 时间戳 转为 字符串 截取一部分
		return Number(Math.random().toString().substr(3, num) + Date.now()).toString(36)
	}
	
	// 创建 评论对象
	let commentObj = {
		comment_id: generatedId(5), // id
		comment_content: text,
		comment_time: Date.now(),
		is_reply,
		replyArr: [],
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
			professinonal: user.professinonal
		}
	}
	
	if(comment_id === ''){
		// 没有传递评论id 说明是直接评论的文章 不是回复评论的内容
		// 此时没有回复内容 属于直接评论文章 是一级评论
		commentObj.replyArr = []; // 回复数组
		commentObj = dbCmd.unshift(commentObj); // 通过command uniapi 操作一个数组 返回一个适用于数据库的数组
	}else{
		// 传递了评论id  说明本次评论信息属于 本文章下的某一条评论 是二级评论
		let commentAuthor = null;
		// 在uni中 操作数据库的方式 是通过索引值的方式操作
		/* 
			const comments = {arr:[{id:'1'},{id:2}]}
			xxx.update({
				arr:{
					0:{
						id:3
					}
				}
			})
		 */
		// 从 comments 数组中 找到 评论id的index值 通过id判断
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id);
		if(is_reply){
			// 是回复 已经找到了 该条评论 现在要从该评论arr中 找到回复的目标信息
			commentAuthor = comments[commentIndex].replyArr.find(item => item.comment_id === reply_id).author.author_name;
		}else{
			commentAuthor = comments.find(item => item.comment_id === comment_id).author.author_name
		}
		
		commentObj.to = commentAuthor;
		commentObj = {
			[commentIndex]: {
				replyArr: dbCmd.unshift(commentObj)
			}
		}
	}
	
	// console.log(commentObj)
	
	
	await db.collection('article').doc(articleId).update({
		comments: commentObj
	})

	
	//返回数据给客户端
	return {
		code:0,
		msg: '评论成功'
	}
};


