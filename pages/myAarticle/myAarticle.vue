<template>
	<view>
		<ListItem v-if="articleList.length" :articleList="articleList"></ListItem>
		<view v-if="authorDataNone" class="no-data">暂无文章</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList: [],
				authorDataNone:false,
			}
		},
		onLoad(){
			this._getMyArticle();
		},
		methods: {
			async _getMyArticle(){
				const {data} = await this.$api.getMyArticle({userId: this.userInfo._id});
				// console.log(result)
				!data.length && (this.authorDataNone = true)
				this.articleList = data;
			}
		}
	}
</script>

<style lang="scss">
.no-data {
		height: 400rpx;
		line-height: 400rpx;
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		color: #666;
}
</style>
