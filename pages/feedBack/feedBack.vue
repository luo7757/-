<template>
  <view>
    <view class="feedback-title">意见反馈：</view>
    <view class="feedback-content">
      <textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题"></textarea>
    </view>
    <view class="feedback-title">反馈图片：</view>
    <view class="feedback-image-box">
      <view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
        <view class="close-icon" @click="delImage(index)">
          <uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
        </view>
        <view class="image-box">
          <image :src="item.url" mode="aspectFill"></image>
        </view>
      </view>
      <view v-if="imageList.length < 5" class="feedback-image-item" @click="_addImage">
        <view class="image-box">
          <uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
        </view>
      </view>
    </view>
    <button class="feedback-button" type="warn" @click="_submitFeedback">提交反馈意见</button>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageList: [],
			}
		},
		methods: {
			getFileId(){
				// 上传所有图片
				return this.imageList.map(item => {
					return new Promise(async (resolve, reject) => {
						// uni提供的云存储方法 
						const result = await uniCloud.uploadFile({
							filePath: item.url,
							cloudPath:item.name
						})
						resolve(result.fileID);
					})
				})
			},
			async _submitFeedback(){
				// 提交反馈
				if(!this.content){
					uni.showToast({
						title: '文本内容不能为空',
						icon: 'none'
					})
					return;
				}
				// 收集信息 发送请求 
				uni.showLoading();
				// 每一张图片都是一个 promise 请求 全部完成后返回 图片在服务器上的地址 
				const feedbackImageList = await Promise.all(this.getFileId())
				uni.hideLoading();
				const { data } = await this.$api.updateFeedBack({content: this.content, feedbackImageList, userId: this.userInfo._id})
				uni.showToast({
					title: data.msg,
				})
				setTimeout(() => {
					uni.switchTab({
						url:'/pages/self/self'
					})
				}, 1500)
			},
			async _addImage(){
				// 选择图片 获得图片的信息 在imglist中存储 每张图片的本地url和name
				let count = 5 - this.imageList.length;
				await uni.chooseImage({
					count,
					success :(res) => {
						const list = res.tempFilePaths;
						list.forEach((url, i) => {
							if(i < count){
								this.imageList.push({
									url,
									name : res.tempFiles[i].name,
								})
							}
						})
					}
				})
			},
			delImage(index){
				// 删除
				this.imageList.splice(index, 1);
			}
		}
	}
</script>

<style lang="scss">
@import './css/feedBack.scss';
</style>
