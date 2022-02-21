import App from './App';
import Vue from 'vue';
import module from './ajax/index.js';
import userMixins from './mixins/userRules.js';
import store from './store/index.js';
import commonMixin from './mixins/commonMixin.js';

import {router,RouterMount} from './router.js'  //路径换成自己的

Vue.use(router)
Vue.use(userMixins);
Vue.use(commonMixin);
Vue.config.productionTip = false
Vue.prototype.$api = module;
App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif