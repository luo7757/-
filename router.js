// router.js
import {RouterMount,createRouter} from 'uni-simple-router';
import store from './store/index.js';
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES],
	routerErrorEach:(error, router)=>{
	    if(error.type===2){       
	        router.$lockStatus=false;
	    }
	},
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(to.meta.needLogin && !store.state.userInfo){
		next({
			name: 'login',
			NAVTYPE: "push"
		})
	}else{
		next();
	}
});


export {
	router,
	RouterMount
}