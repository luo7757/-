import { mapState, mapMutations } from 'vuex';

export default {
	install(Vue){
		Vue.mixin({
			data(){
				return {
					
				}
			},
			methods:{
				checkedIsLogin(){
					// 沒有登录跳转到登录页
					return new Promise(resolve => {
						if(this.userInfo){
							resolve()
						}else{
							uni.navigateTo({
								url:'/pages/userInfo/login/login'
							})
						}
					})
				},
				...mapMutations(['updateUserInfo'])
			},
			computed:{
				...mapState(['userInfo'])
			}
		})
	}
}