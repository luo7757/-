<template>
  <view class="code-container">
    <view class="vCode-btn" @click="getForm">
      {{runTime? `${time}秒后重新获取`:'获取验证码'}}
    </view>
  </view>
</template>

<script>
	export default {
		name: 'SendCode',
		data(){
			return {
				runTime: false,
				time: 60,
				timeID: null,
			}
		},
		methods:{
			getForm(){
				// 抛出事件 获取phone 由于微信小程序 使用props会出现获取不到的情况
				// 使用这种 回调方式
				if(this.runTime) return; // 已有定时器
				this.$emit('getForm', this._getCode);
			},
			async _getCode(form){
				const { phone } = await form.validateField(['phone']);
				// 单独校验 phone
				this.timeRunning();
				
				const { msg, mobileCode } = await this.$api.getCode({phone});
				console.log(form)
			},
			timeRunning(){
				this.runTime = true; // 开启定时器
				this.timeID = setInterval(() => { // 定时器ID保存
					if(this.time === 1){
						this.default();
						return;
					}
					--this.time;
				}, 1000)
			},
			default(){
				// 清空 重置
				clearInterval(this.timeID);
				this.runTime = false;
				this.time = 60;
				this.timeID = null;
			}
		},
		beforeDestroy(){
			// 退出这个页面的时候 清空一下定时器 不然会出现重进出现多个定时器的问题
			this.default();
		}
	}
</script>

<style lang="scss">
.code-container {
  flex-shrink: 0;
  margin-right: 20rpx;
  .vCode-btn {
    background-color: $base-color;
    color: #ffffff;
    padding: 20rpx;
    border-radius: 10rpx;
    opacity: 0.8;
  }
}
</style>
