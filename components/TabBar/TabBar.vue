<template>
	<view class="tab">
		<scroll-view :scroll-x="true" class="tab-scroll" 
		:scroll-with-animation="true" :scroll-into-view="currentIndex">
			<!-- <view class="tab-scroll-box">
				<view 
				:id="`item${i}`"
				@click="changeActiveIndex(i)" 
				:class="{active: index === i}" 
				class="tab-scroll-item" 
				v-for="(item, i) in list" 
				:key="i">
					{{item.name}}
				</view>
			</view> -->
				<view 
				:id="`item${i}`"
				@click="changeActiveIndex(i)" 
				:class="{active: index === i}" 
				class="tab-scroll-item" 
				v-for="(item, i) in list" 
				:key="i">
					{{item.name}}
				</view>
		</scroll-view>
		<view class="tab-icon">
			<uni-icons @click="goLabelAdmin" type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TabBar',
		props: {
			list : {
				type: Array,
			},
			index: {
				type: Number,
				default: 0,
			}
		},
		watch:{
			index(index){
				// console.log(index);
				this.currentIndex = `item${index}`;
				// console.log(this.currentIndex);
			}
		},
		data() {
			return {
				currentIndex: 'item0',
				// index: 0,
				// list: ['hello', 'word', '你好', '世界', 'Im coming', '我来了','hello', 'word', '你好', '世界', 'Im coming', '我来了']
			}
		},
		methods: {
			changeActiveIndex(i){
				this.$emit('changeActiveIndex', i);
			},
			async goLabelAdmin(){
				 await this.checkedIsLogin().then(() => {
					 uni.navigateTo({
					 	url:'/pages/LabelAdmin/LabelAdmin'
					 })
				 })
			}
		},
		// computed: {
		// 	currentIndex(){
		// 		console.log(`item${this.index}`)
		// 		return `item${this.index}`;
		// 	}
		// }
	}
</script>

<style lang="scss">
	@import './css/TabBar.scss';
</style>
