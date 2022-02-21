<template>
	<swiper @change="changeActivIndex" 
	:current="index" class="swiper-container">
		<swiper-item v-for="(item, i) in labelList" 
		:key="`item-${item._id}`">
		<!-- labelList用于创建和滑动组件同数量的展示页 -->
			<view class="swiper-item">
				<ListItem :loadData="loadData[i]" :articleList="articleData[i]" @loadmore="watchLoadMore"></ListItem>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	/*
	 上拉
	 
	 这个模块的业务逻辑稍微要复杂一点
	 在swiper组件下 有多个容器 这些容器承载各类别的信息
	 初始默认为全部，规定一次请求获取的数据量 pageSzie 这个pageSize 所有容器共用
	 每个容器使用了 @scrolltolower 方法 这个方法在scroll-view组件上 当容器滑动到底部时触发
	 容器抛出事件，父级接收
	 这个时候就有一个问题 多个容器之间都有自己的当前请求数据的位置 和 当前数据请求量
	 那么在父级用一个对象来保存每一个容器的状态 page、total、loading。
	 分别决定了 
	 请求数据的位置、
	 此分类可以请求的总数据量(达到数据量，不再发送请求)、
	 laoding状态(每次触发触底事件，在发送请求时会有一个loading状态)
	
	子级抛出事件 父级接收事件 由当前的index 决定了子级 获取对应的子级信息 
	可以请求就发送请求，同时就修改当前组件的page值，total值。
	判断page值 与pageSize计算 是否大于等于 total ，已经达到了，修改loading状态，不再显示loading状态
	加载动画禁止掉。
	
	这个时候就有一个问题了 如果当前的total发生了改变 是在服务器端的改变 前端由于total已经达到最大值的时候
	请求是无法发送出去的。更新状态、检查是否有新数据
	
	可用通过下拉刷新来解决。
	
	*/ 
export default {
	name: 'ArticleList',
	props: {
		labelList: {
			type: Array,
		},
		index: {
			type: Number,
			default: 0,
		},
	},
	data(){
		return {
			articleData: {},
			loadData: {},
			pageSize: 6,
		}
	},
	created(){
		// 初始获取一次
		this.labelList.length && this._getArticleList(this.index);
	},
	watch : {
		labelList(newValue, oldValue){
			// 判断当前label与新的label是否相同，要是相同，不进行重新的数据获取
			// 监控当前的分类， 没有新的分类就不更新。
			// console.log(newValue, oldValue)
			if(JSON.stringify(newValue) === JSON.stringify(oldValue)){
				return;
			}
			// 重置 及 重新获取数据
			this.articleData = {};
			this.loadData = {};
			this._getArticleList(this.index);
		}
	},
	methods:{
		// 这里的逻辑处理方式 
		// 由于 分为多个模块
		// 每个模块的内容不同 渲染的时候 首先只渲染当前模块
		// 其余模块内容为空
		// 只有当切换至其模块 才进行模块数据的获取渲染
		// 第一次获取数据后 每次切换 都不在重新获取数据
		// 其实可以使用vue多页应用 来提升使用体验
		// 这样单页组件的数据不会因为组件销毁而销毁 或 多次不必要的重新渲染
		changeActivIndex(e){
			// 每次index 值变化都会触发这个函数
			const { current } = e.detail;
			this.$emit('changeActiveIndex', current);
			if(!this.articleData[current] || !this.articleData[current].length){
				this._getArticleList(current);
			}
		},
		async _getArticleList(currentIndex){
			// console.log(this.labelList[currentIndex])
			if(!this.loadData[currentIndex]){
				this.loadData[currentIndex] = {
					page: 1,
					loading: 'loading',
					total: 0,
				}
			}
			// {data: {articleList, total}}
			const {data: {articleList, total}} = await this.$api.getArticleList({
				classify: this.labelList[currentIndex].name,
				page: this.loadData[currentIndex].page,
				pageSize: this.pageSize,
			});
			// console.log(articleList, total, '测试');
			// // #ifdef H5
			// const articleList = result.data.articleList;
			// const total = result.data.total;
			// // #endif
			
			// // #ifndef H5
			// 	const articleList = result.data.articleList;
			// 	const total = result.data.total;
			// // #endif
			
			// const articleList = result.data.articleList;
			// const total = result.data.total;
			
	
			// console.log(articleList,total);
			// this.articleLoad[currentIndex] = {
			// 	total : result.data.affectedDocs,
			// 	page : 1,
			// 	pageSize: 6,
			// }
			let oldList = this.articleData[currentIndex] || [];
			// console.log(articleList)
			oldList.push(...articleList);
			this.loadData[currentIndex].total = total;
			this.$set(this.articleData, currentIndex, oldList);
			// console.log(this.articleData)
		},
		watchLoadMore(){
			if(this.loadData[this.index].total === this.articleData[this.index].length){
				this.loadData[this.index] = {
					...this.loadData[this.index],
					...{
						loading: 'noMore',
						page: this.loadData[this.index].page,
					}
				}
				this.$forceUpdate() // 强制更新 解决 vue2 的对象 无法有效监控的问题
				return;
			}
				this.loadData[this.index].page ++;
				// console.log(this.loadData)
				this._getArticleList(this.index);
		}
	}
}
</script>

<style lang="scss">
page{
	height: 100%;
}
.swiper-container {
	height: 100%;
	.swiper-item {
		height: 100%;
		overflow: hidden;
	}
}
</style>