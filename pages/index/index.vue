<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar @changeActiveIndex="changeActiveIndex" :index="index" :list="labelList"></TabBar>
		<ArticleList class="list-content" :labelList="labelList" @changeActiveIndex="changeActiveIndex" :index="index"></ArticleList>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'; 
	export default {
		data(){
			return {
				index: 0,
			}
		},
		onLoad(){
			this._initLabelList();
		},
		methods: {
			async _initLabelList(){
				// console.log(this.labelList.length)
				if(this.labelList.length) {
					return ;
				}
				const result = await this.$api.getLabelList();
				const data = result.data;
				// console.log(result);
				
				
				this.setLabelList([{name:'全部'}, ...data])
			},
			changeActiveIndex(i){
				this.index = i;
			},
			...mapMutations(['setLabelList'])
		},
		computed:{
			labelList(){
				// console.log(this.userInfo)
				if(this.userInfo){
					this.index = 0;
					return [
						...this.$store.state.labelList.slice(0, 1), 
						...this.$store.state.labelList.filter(it => this.userInfo.label_ids.includes(it._id))
					];
				}else{
					return this.$store.state.labelList;
				}
			}
		}
	}
</script>

<style lang="scss">
page {
  height: 100%;
  display: flex;
}
.home-container {
  overflow: hidden;
  flex: 1;
  box-sizing: border-box;
  @include flex(flex-start, column);
  align-items: inherit;
}
.list-content{
	flex: 1;
	box-sizing: border-box;
}

</style>
