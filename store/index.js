import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import state from './state.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	actions,
})