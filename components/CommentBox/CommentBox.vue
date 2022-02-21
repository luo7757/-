<template>
  <view class="comment-box">
    <view class="comment-header">
      <view class="comment-header-logo">
        <image :src="commentData.author.avatar" mode="aspectFill"></image>
      </view>
      <view class="comment-header-info">
        <view class="title" v-if="!commentData.is_reply">
          {{commentData.author.author_name}}
        </view>
				<view v-else class="title">
					 {{commentData.author.author_name}} 
					 <text class="reply-text">回复</text>
					 {{commentData.to}}
				</view>
        <view class="">
          <uni-dateformat :date="commentData.comment_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
        </view>
      </view>
    </view>
    <!-- 内容部分 -->
    <view class="comment-content">
      <view class="">
        {{commentData.comment_content}}
      </view>
      <view class="comment-info">
        <view class="comment-button" @click="commentReply({comment:commentData,isReply})">
          回复
        </view>
      </view>
			<view class="comment-reply-list" v-for="item in commentData.replyArr" :key="item._comment_id">
				<CommentBox :isReply="true"  @commentReply="commentReply" :commentData="item"></CommentBox>
			</view>
    </view>
  </view>
</template>

<script>
import CommentBox from '@/components/CommentBox/CommentBox.vue';
	export default {
		name:"CommentBox",
		components:{
			CommentBox,
		},
		props:{
			commentData:{
				type:Object,
			},
			isReply:{
				type:Boolean,
				default:false,
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			commentReply(data){
				console.log('click', this.commentData.comment_content)
				if (data.isReply) {
					data.comment.reply_id = data.comment.comment_id
					data.comment.comment_id = this.commentData.comment_id
				}
				this.$emit('commentReply', data);
			}
		}
	}
</script>

<style lang="scss">
@import './css/CommentBox.scss';
</style>
