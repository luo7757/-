<template>
	<view class="article-detail-container">
		<view class="detail-title">
			{{articleInfo.title}}
		</view>
		<view class="detail-header">
			<view class="detail-logo">
				<image v-if="articleInfo" :src="articleInfo.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{articleInfo.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{articleInfo.create_time}}</text>
					<text>{{articleInfo.browse_count}} 浏览</text>
					<text>{{articleInfo.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-button" @click="followHandle">
			{{isFollowAuthor ? '取消关注' : '关注'}}
			</button>
		</view>
		<view class="detail-content-container">
			<view class="detail-html">
				<u-parse :content="content"/>
			</view>
			<!-- 评论展示组件 -->
			
			<view class="detail-comment" v-if="commentList !== null">
				<view class="comment-title">最新评论</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<CommentBox @commentReply="commentReply" :commentData="item"></CommentBox>
				</view>
				<view class="no-data" v-if="!commentList.length">暂无评论</view>
			</view>
		</view>

		<!-- 评论组件 -->
		<view class="detail-bottom">
			<view class="input-container" @click="openCommentMasker">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<!-- <view class="detail-bottom-icon-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view> -->
				<SaveLikes class="detail-bottom-icon-box" :articleId="articleInfo._id" :size="'22'"></SaveLikes>
				<!-- <view class="detail-bottom-icon-box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view> -->
				<view class="detail-bottom-icon-box" @click="thumbsUp">
					<uni-icons :type="isThumbsUp ? 'hand-up-filled': 'hand-up' " size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<CommentMasker @sendComment="_sendCommentHandle" :showComment="isCommoent" @closeComment="closeCommentHandle"></CommentMasker>
		
	</view>
</template>

<script>
import uParse from '@/components/gaoyia-parse/parse.vue';
import { marked } from 'marked';
	export default {
		components:{
			uParse,
		},
		data() {
			return {
				articleInfo : null,// 文章的信息
				content: '  ', // 由于使用的uParse在一开始没有数据的时候显示一个 不能为空的文本 这里 初始化提供一个有空格的空字符串进行占位处理
				isCommoent: false, // comment组件 控制
				commentList: null,
				replyData: {},
			}
		},
		onLoad(){
			// 初始由 params 传递参数 渲染title等信息 即card提供的信息
			// console.log(this.$Router.currentRoute.query)
			// { _id, title, create_time, browse_count, thumbs_up_count, author }
			this.articleInfo = this.$Router.currentRoute.query;
			this._getArticleDetailContent();
			this._getCommentData();
		},
		methods: {
			async _getArticleDetailContent(){
				// 文章详情数据请求
				const { data } = await this.$api.getArticleDetailContent({_id: this.articleInfo._id});
				this.articleInfo = data;
				this.content = marked(this.articleInfo.content)
			},
			async _getCommentData(){
				// 获取评论信息
				const result = await this.$api.getCommentData({articleId:this.articleInfo._id});
				// console.log(result);
				this.commentList = result.data;
			},
			openCommentMasker(){
				// 评论组件 状态联动
				this.isCommoent = true;
			},
			closeCommentHandle(){
				// 评论组件 状态联动
				this.isCommoent = false;
			},
			async _sendCommentHandle(text){
				// 评论组件 触发事件 发送请求 修改内容
				const result = await this.$api.updateComment({
					userId: this.userInfo._id,
					articleId: this.articleInfo._id,
					text,
					...this.replyData
				})
				uni.showToast({
					title: result.msg,
					icon: 'none'
				})
				this.closeCommentHandle(); 
				this._getCommentData(); // 重新获取评论
				this.replyData = {}; // 重置 防止出现数据混乱
				// console.log(result);
			},
			commentReply(data){
				// 回复评论
				this.replyData = {
					"comment_id": data.comment.comment_id,
					is_reply: data.isReply
				}
				// 当前为回复内容的时候添加回复的ID
				// console.log(this.replyData)
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
				this.openCommentMasker();
			},
			async followHandle(){
				await this.checkedIsLogin()
				// 处理关注 发送当前文章中的用户信息 和当前登录用户的信息 进行处理
				const result = await this.$api.updateFollowAuthor({
					userId: this.userInfo._id,
					authorId: this.articleInfo.author.id
				});
				uni.$emit('followAuthor');
				uni.showToast({
					title: result.data.msg,
					icon: 'none'
				})
				// 关注逻辑处理完成后 更新用户的信息
				// 数据库 通过api更新了 本地的user信息 也要更新
				 let followIds = [...this.userInfo.author_likes_ids]
				 if (followIds.includes(this.articleInfo.author.id)) {
					 followIds = followIds.filter(item => item != this.articleInfo.author.id)
				 }else {
					 followIds.push(this.articleInfo.author.id)
				 }
				 this.updateUserInfo({...this.userInfo,author_likes_ids:followIds})
				// this.updateUserInfo();
			},
			async thumbsUp(){
				// 点赞处理
				await this.checkedIsLogin();
				const {data: {msg}} = await this.$api.updateThumbsUp({
					userId: this.userInfo._id,
					articleId: this.articleInfo._id
				});
				// console.log(result);
				msg && uni.showToast({
					title: msg,
					icon: 'none'
				})
				// 修改本地、vuex存储 用户中的点赞文章
				let thumbsArr = [...this.userInfo.thumbs_up_article_ids]; // 获得存储信息
				if (thumbsArr.includes(this.articleInfo._id)) {// 判断其中有没有当前文章的id值
					this.articleInfo.thumbs_up_count -= 1 // 本地文章点赞数更新
				  // 该文章id存在 做删除处理 过滤掉
					thumbsArr = thumbsArr.filter(item => item != this.articleInfo._id) // 用户点赞记录更新
				}else {
					// 不存在 添加
					this.articleInfo.thumbs_up_count += 1 
					thumbsArr.push(this.articleInfo._id)
				}
				// 通过全局封装 mutations 中的 api 更新本地、vuex的信息
				// 获得当前的用户信息 修改部分直接覆盖 api直接更新
				this.updateUserInfo({...this.userInfo,thumbs_up_article_ids:thumbsArr})
			}
		},
		computed:{
			// content(){
			// 	try{
			// 		// console.log(marked, 1)
			// 		return marked(this.articleInfo.content)
			// 	}catch(e){
			// 		return null;
			// 	}
			// }
			isFollowAuthor(){
				// console.log(this.userInfo.author_likes_ids.includes(this.articleInfo._id))
				// 从本地的信息中 即this.userInfo(在app启动时 就会从localstorage中获取
				// console.log(this.userInfo && this.userInfo.author_likes_ids.includes(this.articleInfo.author.id))
				try{
					return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleInfo.author.id)
				}catch(e){
					return false;
				}
			},
			isThumbsUp(){
				try{
					return this.userInfo && this.userInfo.thumbs_up_article_ids.includes(this.articleInfo._id)
				}catch(e){
					return false;
				}
			}
		}
	}
</script>

<style lang="scss">
@import './css/articleDetail.scss';
</style>
