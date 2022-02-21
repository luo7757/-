<template>
  <view class="login-container">
    <image src="../../../static/img/login_bg.png" class="banner-bg" mode=""></image>
    <!-- 导航 -->
    <view class="login-nav">
      <view class="nav-item" @click="changFormType('account')" :class="{'active':type==='account'}">
        账号登录
      </view>
      <view class="nav-item" @click="changFormType('mobile')" :class="{'active':type !=='account'}">
        手机登录
      </view>
    </view>
    <!-- 表单部分 -->
    <uni-forms class="form" ref="form" :modelValue="formData">
      <view class="" v-if="type ==='account'">
        <uni-forms-item label="账号" name="loginName">
          <input placeholder-class="placeholder" class="form-input" 
					type="text" placeholder="请输入账号" v-model="formData.loginName" />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password">
          <uni-easyinput :inputBorder="false" placeholder-class="placeholder" 
					class="form-input" type="password" placeholder="请输入密码" v-model="formData.password" />
        </uni-forms-item>
      </view>
      <view class="" v-else>
        <uni-forms-item label="手机号" name="phone">
          <input :inputBorder="false" placeholder-class="placeholder" 
					class="form-input" type="number" placeholder="请输入手机号" v-model="formData.phone" />
        </uni-forms-item>
        <uni-forms-item label="验证码" name="vCode">
          <input placeholder-class="placeholder" class="form-input" 
					type="text" placeholder="请输入验证码" v-model="formData.vCode" />
          <SendCode @setCurrentCode="returnCode=$event" class="code-component" @getForm="getForm"></SendCode>
        </uni-forms-item>
      </view>

      <button class="login-btn" @click="_userLoginSubmit">立即登录</button>
    </uni-forms>
    <view class="footer-select-container">
      <text>注册</text>
      <text>忘记密码</text>
    </view>
  </view>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				formData: {
					loginName: '',
					password: '',
					phone: '',
					vCode : '',
				},
				type: 'account'
			}
		},
		created(){
			if(this.userInfo){
				// #ifdef H5
				uni.switchTab({
					url:'/pages/index/index'
				});
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.reLaunch({
					url: '/pages/index/index'
				})
				// #endif
				
				// #ifdef  APP
				uni.navigateBack()
				// #endif
			}
		},
		onReady () {
			this.$refs.form.setRules(this.userRules)
		},
		// onLoad() {
		// 	console.log(this.userRules)
		// },
		methods: {
			// ...mapMutations(['updateUserInfo']),
			async _userLoginSubmit(){
				// 登录
				const result = await this.$refs.form.validate();
				// 从refs中注册的form元素中获取到其子元素绑定的数据的值 返回
				// 使用全局注册的验证方法进行验证 validate方法只有在验证通过后 才会有返回值
				// 验证失败直接抛出错误 停止代码运行
				console.log(result)
				this._sendUserInfo({...result, type: this.type});
				
			},
			changFormType(type){
				// 修改 type 类型
				if(type === this.type){
					return;
				}
				this.type = type;
			},
		  async	_sendUserInfo(data){
				const userInfo = await this.$api.getUserInfo(data);
				// 登录成功 返回登录前的页面
				if(userInfo){
					this.updateUserInfo(userInfo.data);
						setTimeout(() => {
							// #ifdef H5 
							uni.switchTab({
								url:'/pages/index/index'
							});
							// #endif
							
							// #ifdef MP-WEIXIN
							uni.reLaunch({
								url: '/pages/index/index'
							})
							// #endif
							
							// #ifdef  APP
							uni.navigateBack()
							// #endif
						}, 0)
				}
				// console.log(userInfo)
			},
			getForm(cb){
				cb && cb(this.$refs.form);
			}
		}
	}
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.code-component {
  flex-shrink: 0;
}
</style>

<style lang="scss">
@import './css/login.scss';
</style>
