import request from './request.js';

export const updateSaveLike = (data) => {
	return request({name: 'update-save-like', data});
}

export const searchAticle = (data) => {
	return request({name: 'get-article-search', data})
}

export const getArticleDetailContent = data => request({
	name : 'get-article-detail-content',
	data
}) 

export const getCommentData = data => request({
	name: 'get-comments',
	data
})
