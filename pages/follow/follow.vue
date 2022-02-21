<template>
  <view class="follow-container">
    <view class="follow-tab">
      <view class="follow-tab-box">
        <view class="follow-tab-item" @click="changeIndex(0)" :class="{active:currentIndex===0}">文章</view>
        <view class="follow-tab-item" @click="changeIndex(1)" :class="{active:currentIndex===1}">作者</view>
      </view>
    </view>
    <!-- 内容切换区域 -->
    <view class="follow-list-container">
      <swiper class="follow-list-swiper" @change="swiperChange" :current="currentIndex">
        <swiper-item>
          <ListItem :isShowLoading="isShowLoading" :articleList="articleList" v-if="articleList.length"></ListItem>
          <view v-if="dataNone"  class="no-data">暂无收藏的文章</view>
					<uni-load-more v-if="isShowLoading" status="loading"></uni-load-more>
        </swiper-item>
        <swiper-item>
          <AuthorList :authorList="authorList" v-if="authorList.length"></AuthorList>
					<view v-if="authorDataNone" class="no-data">暂无关注的作者</view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
	data(){
		return {
			isShowLoading: true,
			currentIndex: 0,
			articleList: [],
			dataNone: false,
			authorList: [],
			authorDataNone: false,
		}
	},
	onLoad(){
		// #ifdef MP-WEIXIN
		// await this.checkedIsLogin()
		if(!this.$store.state.userInfo){
			uni.redirectTo({
				url:'/pages/userInfo/login/login'
			})
		}
		// #endif
		
		uni.$on('updateArticle', () => {
			this._getFollowArticle();
		})
		uni.$on('followAuthor', () => {
			this._getFollowAuthor();
		})
		
		this._getFollowArticle();
		this._getFollowAuthor();
	},
	methods:{
		async _getFollowArticle () {
			await this.checkedIsLogin();
			const {data} = await this.$api.getFollowArticle({ userId: this.userInfo._id })
			this.articleList = data
			!data.length && (this.dataNone = true) && (this.isShowLoading = false)
			
		},
		async _getFollowAuthor(){
			await this.checkedIsLogin();
			const {data} = await this.$api.getFollowAuthor({userId: this.userInfo._id })
			this.authorList = data;
			console.log(data.length)
			!data.length && (this.authorDataNone = true)
		},
		changeIndex(i){
			this.currentIndex = i;
		},
		swiperChange(e){
			this.changeIndex(e.detail.current);
		}
	}
}
</script>

<style lang="scss">
	@import './css/follow.scss';
</style>
