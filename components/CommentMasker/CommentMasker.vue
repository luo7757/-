<template>
  <view>
    <uni-popup ref="popup" type="bottom" @maskClick="closePopupMasker" :is-mask-click="true">
      <!-- 内容区域 -->
      <view class="popup-wrapper">
        <view class="popup-header">
          <view class="popup-header-item" @click="closePopupMasker">取消</view>
          <view class="popup-header-item" @click="_sendCommentData">发布</view>
        </view>
        <view class="popup-content">
          <textarea class="popup-content-textarea" v-model.trim="commentsValue" maxlength="200" fixed placeholder="请输入评论内容"></textarea>
          <view class="popup-content-count">{{commentsValue.length}}/200</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
	export default {
		name:"CommentMasker",
		props:{
			showComment:{
				type:Boolean,
			}
		},
		watch:{
			showComment(newVal){
				if(newVal){
					this.$refs.popup.open();
				}else{
					this.$refs.popup.close()
				}
			}
		},
		data() {
			return {
				commentsValue: '', // 评论内容\
			};
		},
		// mounted(){
		// 	this.$refs.popup.open();
		// },
		methods:{
			closePopupMasker(){
				// 关闭评论
				this.$refs.popup.close();
				this.$emit('closeComment')
			},
			_sendCommentData(){
				// 确定评论
				if(!this.commentsValue){
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return;
				}
				// 交给父组件处理  父组件有 文章id 
				this.$emit('sendComment', this.commentsValue);
			},
			
		}
	}
</script>


<style lang="scss">
.popup-wrapper {
  background-color: #ffffff;
  .popup-header {
    @include flex();
    font-size: 28rpx;
    color: #666;
    border-bottom: 1px #f5f5f5 solid;
    .popup-header-item {
      height: 100rpx;
      line-height: 100rpx;
      padding: 0 30rpx;
    }
  }
  .popup-content {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    .popup-content-textarea {
      height: 400rpx;
      width: 100%;
    }
    .popup-content-count {
      @include flex(flex-end);
      font-size: 24rpx;
      color: $c-9;
    }
  }
}
</style>