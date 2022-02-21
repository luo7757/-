<template>
	<view class="list-scroll-container">
		<scroll-view @scrolltolower="scrollHandle" scroll-y="true" class="list-scroll">
			<view>
				<ListCard @saveHistory="$emit('saveHistory')" v-for="(item) in articleList" :key="item._id" :item="item"></ListCard>
			</view>
			<uni-load-more v-if="isShowLoading && (articleList.length === 0 || articleList.length > 7)" :status="loadData.loading || 'loading'"></uni-load-more>
			<view v-if="!isShowLoading" class="no-data">没有相关的内容</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name : "ListItem",
	props:{
		articleList: {
			type:Array,
			default(){
				return [];
			}
		},
		loadData:{
			type:Object,
			default(){
				return ({
					loading: 'loading',
				})
			}
		},
		// isShowLoading: {
		// 	type: Boolean,
		// 	default: true,
		// }
	},
	data(){
		return {
			more: 'loading',
			isShowLoading: true,
		}
	},
	watch:{
		articleList(newValue, oldValue){
			// console.log(newValue, oldValue)
			// console.log('改变了')
			if(!this.articleList.length){
				this.isShowLoading = false;
				console.log('执行')
			}
		}
	},
	methods:{
		scrollHandle(){
			this.$emit('loadmore');
		}
	}
}
</script>

<style lang="scss">
.list-scroll-container {
  height: 100%;
  .list-scroll {
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
  }
}
.no-data {
	height: 400rpx;
	line-height: 400rpx;
	width: 100%;
	text-align: center;
	font-size: 24rpx;
	color: #666;
}
</style>
