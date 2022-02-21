<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
			<view :style="{height: statusHeight * 2 +'rpx'}"></view>
			<view @click="navBack" v-if="isSearch" class="nav-back" :style="{top:statusHeight * 2 + 'rpx'}">
				<uni-icons color="#fff" size="20" type="back" class="nav-back-icon"></uni-icons>
			</view>
			<view @click="goSearchPage" class="nav-bar-content" 
			:style="{marginRight: marginRight + 'rpx', marginLeft: isSearch ? '40rpx' : '0'}">
				<uni-icons type="search" color="#999"></uni-icons>
				<view class="nav-bar-serach-txt" v-if="!isSearch">
					请输入搜索内容
				</view>
				<input v-else confirm-type="search" @confirm="updateVal" 
				v-model.trim="searchVal" type="text"
				placeholder="请输入搜索关键词" class="search-input">
			</view>
		</view>
		<view :style="{height: statusHeight * 2 + 75 + 'rpx'}"></view>
	</view>
</template>

<script>
export default {
	name: "NavBar",
	props:{
		isSearch: {
			type:Boolean,
			default: false,
		},
		parentVal:{
			type: String,
		}
	},
	data(){
		return {
			statusHeight: 7.5,
			marginRight: 0,
		}
	},
	created(){
		this.getSystemInfo();
	},
	methods:{
		getSystemInfo(){
			uni.getSystemInfo({
				success:(res) => {
					this.statusHeight = res.statusBarHeight ? res.statusBarHeight : this.statusHeight;
					//#ifdef MP-WEIXIN
						const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
						this.statusHeight = menuButtonInfo.top;
						// console.log(menuButtonInfo)
						this.marginRight = menuButtonInfo.width * 2;
					//#endif
				}
			});
			// uni.getSystemInfo().then((res) => {
			// 	console.log(res[1])
			// })
		},
		goSearchPage(){
			if(!this.isSearch){
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		},
		navBack(){
			// #ifdef H5
			uni.switchTab({
				url:'/pages/index/index'
			})
			// #endif
			
			// #ifndef H5
			uni.navigateBack()
			// #endif
		},
		updateVal(){
			this.$emit('sendSearchData', this.searchVal)
		}
	},
	computed:{
		// 使用计算属性实现 父子组件数据双向绑定
		searchVal:{
			get(){
				// 本组件获取
				return this.parentVal;
			},
			set(val){
				// 抛出数据
				this.$emit('updateVal', String(val));
				if(!val){
					// 当input 清空时触发 
					this.$emit('sendSearchData')
				}
			}
		}
	}
}
</script>

<style lang="scss">
	@import  './css/NavBar.scss';
</style>
