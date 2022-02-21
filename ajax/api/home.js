import request from './request.js';

export const getLabelList = (data) => {
	return request({name: 'get-label-list', data});
}

export const getArticleList = (data) => {
	return request({name: 'get-article-list', data});
}