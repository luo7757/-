<template>
	<view class="save-icons" @click.stop="_changeSaveStatus">
		<uni-icons color="#ff6600" :type="isLike ? 'heart-filled' : 'heart'" :size="size"></uni-icons>
	</view>
</template>

<script>
export default {
	name: 'SaveLikes',
	props: {
		articleId : {// 文章id
			type:String,
		},
		size:{
			type: String,
			default: '20'
		}
	},
	data(){
		return {
		}
	},
	methods: {
		async _changeSaveStatus(){
		  await	this.checkedIsLogin(); 
			// 定义的一个全局的函数 用于检查用户的登录情况
			// console.log(this.articleId)
			const result = await this.$api.updateSaveLike({
				articleId : this.articleId,
				userId: this.userInfo._id,
				noLoading: true
			});
			uni.showToast({
				title: result.data.msg,
				icon: 'none'
			})
			// 传入文章id 与 用户 id 进行收藏文章操作
			// console.log(result, this.articleId);
			// 获得更新后的数据 本地、vuex进行处理，likes组件 更新状态
			this.updateUserInfo({...this.userInfo, ...result.data.newUserInfo})
			// console.log(this.userInfo._id, this.articleId)
			uni.$emit('updateArticle')
		},
	},
	computed: {
	    isLike () {
	      try {
	        return this.userInfo && this.userInfo.article_likes_ids.includes(this.articleId)
	      } catch (e) {
	        return false
	      }
	    }
	  }
}
</script>

<style>
</style>
