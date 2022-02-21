<template>
  <view>
    <!-- 当用户为登录状态时进行显示 -->
    <view v-if="userInfo" class="my-header">
      <view class="my-header-background">
        <image :src="userInfo.avatar" mode="aspectFill"></image>
      </view>
      <view class="my-header-logo" @click="changeAvatar">
        <view class="my-header-logo-box">
          <image :src="userInfo.avatar" mode="aspectFill"></image>
        </view>
        <text class="user-name">{{userInfo.author_name}}</text>
      </view>
      <view class="my-header-info">
        <view class="my-header-info-box">
          <text class="my-header-info-title">被关注</text>
          <text>{{userInfo.follow_count}}</text>
        </view>
        <view class="my-header-info-box">
          <text class="my-header-info-title">粉丝</text>
          <text>{{userInfo.fans_count}}</text>
        </view>
        <view class="my-header-info-box">
          <text class="my-header-info-title">积分</text>
          <text>{{userInfo.integral_count ? userInfo.integral_count : 0}}</text>
        </view>
      </view>
    </view>

    <view class="my-content">
      <view v-if="!userInfo" class="my-content-list" @click="goLoginPage">
        <view class="my-content-list-title">
          <image class="company-logo" src="../../static/img/1.jpg" mode="aspectFill"></image>
          <text>HI，您尚未登录,请点击登录</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
      <view class="my-content-list">
        <view class="my-content-list-title" @click="myArticle">
          <uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
          <text>我的文章</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
      <view class="my-content-list" @click="goFeedbackPage">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
          <text>意见反馈</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>

       <!-- #ifdef APP-PLUS -->
      <view class="my-content-list">
        <view class="my-content-list-title">
          <uni-icons class="icons" type="paperclip" size="16" color="#666"></uni-icons>
          <view class="version-container">
            <text>
              当前版本
              <text v-if="haveNewVersion" class="new-version-tip">(点击下载最新版本)</text>
            </text>
            <text class="version">{{currentVersion.version}}</text>
          </view>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
      <!-- #endif -->
      <button v-if="userInfo" type="warn" class="sign-out" @click="siginOut">退出</button>
    </view>

  </view>
</template>

<script>
	export default {
		data(){
			return {
				haveNewVersion: false,
				currentVersion: '1.0.0'
			}
		}, 
		onLoad () {
			// !判断是否有新版本进行下载及获取当前的版本
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				// 获取app的信息 通过api获取最新 版本 判断是否有更新
				success: (res) => {
					if (res.platform == "android") {
						plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
							this.currentVersion = wgtinfo;
							this._checkVersion();
						})
					}
				}
			})
			// #endif
		},
		methods:{
			// app中判断是否有新版本
			async _checkVersion () {
				const { version, downLoadLinkUrl } = await this.$http.get_current_version();
				if (version > this.currentVersion) {
					this.haveNewVersion = true;
					this.downLoadLinkUrl = downLoadLinkUrl
				}
			},
			siginOut(){
				// 直接调用Api 清除本地的数据 用户退出
				this.$store.commit('updateUserInfo', null);
				// #ifdef MP-WEIXIN
				uni.reLaunch({
					// 微信中跳转的流程 先进入页面再进行跳转 会保留一个未登录时的页面记录 登录后 返回会返回到未登录的页面状态
					// 直接关闭所有页面 重新进入 为登录状态
					url:'/pages/index/index'
				})
				// #endif
				
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url:'/pages/index/index'
				})
				// #endif
			},
			goLoginPage () {
				// 登录点击跳转 login
				uni.navigateTo({
					url: '/pages/userInfo/login/login'
				})
			},
			myArticle(){
				// 我的文章
				uni.navigateTo({
					url:'/pages/myAarticle/myAarticle'
				})
			},
			goFeedbackPage(){
				// 意见反馈
				uni.navigateTo({
					url:'/pages/feedBack/feedBack'
				})
			},
			 // 修改用户图片
			changeAvatar () {
				// 调用uni的api获得图片的信息
				uni.chooseImage({
					count: 1,
					success: async res => {
						// res 是返回的图片本地信息 调用 uploadFile  上传图片
						const filePath = await this._uploadFile(res.tempFilePaths[0], 
						res.tempFiles[0].name || Date.now().toString() +res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.')))
						// 获取图片在云存储空间的信息后 调用云函数 修改用户及其下的文章的avatar信息 
						await this._updateUserAvatar(filePath) // 传递地址 
					}
				})
			},
			async _uploadFile (filePath, cloudPath) {
				// 调用uni 提供的api 上传至云存储空间 成功后返回图片在云存储空间的地址
				const { fileID } = await uniCloud.uploadFile({
					filePath,
					cloudPath
				})
				return fileID // 返回地址
			},
			// 上传图片内容
			async _updateUserAvatar (filePath) {
				// 调用云函数 传递用户id  图片地址
				const { msg } = await this.$api.changeAvatar({
					userId: this.userInfo._id,
					filePath,
				})
				uni.showToast({ title: msg, icon: 'none' })
				// 更新vuex 、storage 中的信息
				this.updateUserInfo({...this.userInfo, avatar:filePath});
			}
		}
	}
</script>

<style lang="scss">
	@import './css/self.scss';
</style>
