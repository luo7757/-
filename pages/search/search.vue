<template>
	<view class="search-container">
		<!-- 搜索栏部分 -->
		<NavBar :isSearch="true" 
		@sendSearchData="_sendSearchData" 
		@updateVal="searchVal = $event"
		:parentVal="searchVal"
		></NavBar>
		<!-- 历史记录部分 -->
		<view class="search-wrapper" v-if="isShowHistory">
			<view class="search-history-container">
				<view class="search-header">
					<text class="history-text">搜索记录</text>
					<text class="history-clean" @click="cleanHistory">清空</text>
				</view>
				<view v-if="historyList.length" class="search-history-content">
					<view @click="openHistory(item)" class="history-content-item" v-for="(item,index) in historyList" :key="index">{{item}}</view>
				</view>
				<view v-else class="no-data">当前没有搜索历史</view>
			</view>
		</view>
		<!-- 搜索信息展示部分 -->
		<view v-else class="search-list-container">
			<ListItem @saveHistory="saveHistory" :isShowLoading="false" v-if="searchList.length" :articleList="searchList"></ListItem>
			<view v-else class="no-data">没有查询到相关信息</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex';
	export default {
		name: 'Search',
		data(){
			return {
				searchVal: '',
				searchList: [],
				isShowHistory: true,
			}
		},
		methods:{
			openHistory(val){
				console.log(val)
				this.searchVal = val;
				this._sendSearchData();
			},
			async _sendSearchData(){
				// 请求数据 这个方式有两个触发方式 一个是回车确定 一个input 为空 
				 // 即两个操作逻辑
				 if(!this.searchVal){
					 this.isShowHistory = true
					 this.searchList = [];
					 return;
					}
					const {data: {articleList}} = await this.$api.searchAticle({searchVal: this.searchVal});
					// console.log('send')
					this.isShowHistory = false;
					// console.log(articleList)
					this.searchList= articleList;
				
			},
			saveHistory(){
				this.setHistory(this.searchVal);
			},
			...mapMutations(['setHistory','cleanHistory'])
		},
		computed:{
			...mapState(['historyList'])
		}
	}
</script>

<style lang="scss">
@import './css/search.scss';
</style>
