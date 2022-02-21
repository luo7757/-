import request from './request.js';

export const getUserInfo = (data) => {
	// 接收来自用户登录的信息 data 调用云函数 传递参数 data
	return request({name:'get-user-info', data})
}

export const updateLabelIds = (data) => {
	return request({name: 'update-label-ids', data})
}

export const updateComment = data => request({
	name: 'update-comment',
	data,
})

export const updateFollowAuthor = data => request({
	name:"update-follow-author",
	data,
})

export const updateThumbsUp = data => request({
	name: 'update-thumbs-up',
	data,
})

export const getFollowArticle = data => request({
	name:"get-follow-article",
	data
})

export const getFollowAuthor = data => request({
	name: 'get-follow-author',
	data,
})

export const getMyArticle = data => request({
	name: 'get-my-article',
	data,
})

export const updateFeedBack = data => request({
	name: 'update-feed-back',
	data,
})

export const changeAvatar = data => request({
	name: 'changeAvatar',
	data,
})