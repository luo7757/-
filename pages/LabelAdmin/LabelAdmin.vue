<template>
  <view class="label-container">
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">我的标签</view>
        <text class="label-edit" @click="startEdit">{{this.isEdit ? '完成' : '编辑'}}</text>
      </view>
      <view class="label-content">
        <view @click="changeCommentLabelList(item._id)" class="label-content-item" v-for="(item,index) in selfLabelList" :key="item._id">
          {{item.name}}
          <uni-icons v-if="isEdit" class="icon-close" type="clear" size="20" color="red"></uni-icons>
        </view>
        <view v-if="!selfLabelList.length" class="no-data">当前没有数据</view>
      </view>
    </view>
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">标签推荐</view>
      </view>
      <view class="label-content">
        <view @click="changeSelfLabelList(item._id)" class="label-content-item" v-for="(item,index) in recommentLabelList" :key="item._id">
          {{item.name}}
        </view>
        <view v-if="!recommentLabelList.length" class="no-data">当前没有数据</view>
      </view>
    </view>
  </view>
</template>

<script>
	import { mapState } from 'vuex';
export default {
	name: 'LabelAdmin',
	data(){
		return {
			isEdit: false,
			labelIds: [],
		}
	},
	// watch:{
	// 	userInfo:{
	// 		immediate: true,
	// 		handler(newVal, oldVal){
	// 			this.labelIds = [...(this.userInfo.label_ids)]
	// 		}
	// 	}
	// },
	created() {
		this.isEdit = false;
		this.labelIds = this.userInfo.label_ids;
	},
	methods:{
		async _updateLabel(){
			// 发送请求修改数据
			const label_ids = this.selfLabelList.map(it => it._id);
			const result = await this.$api.updateLabelIds({userId: this.userInfo._id, label_ids})
			uni.showToast({
				title: result.msg
			})
			this.updateUserInfo({...this.userInfo, label_ids});
		},
		startEdit(){
			this.isEdit && this._updateLabel();
			this.isEdit = !this.isEdit;
		},
		changeSelfLabelList(id){
			if(!this.isEdit) return;
			// 点击过后向this.labelIds中添加id
			this.labelIds.push(id);
		},
		changeCommentLabelList(id){
			if(!this.isEdit) return;
			this.labelIds = this.labelIds.filter(it => it !== id);
		}
	},
	computed:{
		...mapState(['labelList']),
		selfLabelList(){
			return this.labelList.filter(item => this.labelIds.includes(item._id))		
		},
		recommentLabelList(){
			return this.labelList.filter(item => !this.labelIds.includes(item._id) && item._id)
		}
	}
}
</script>

<style lang="scss">
	@import './css/LabelAdmin.scss';
</style>
