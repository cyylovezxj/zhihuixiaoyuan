// 创建store对象，并且导出。main.js来导入，加在new Vue()中
import Vue from 'vue';
import Vuex from 'vuex';
import baseDataStore from './baseDataStore'
import questionManageStore from './questionManageStore'
import surveyManageStore from './surveyManageStore'
import surveyStatisStore from './surveyStatisStore'
import systemManageStore from './systemManageStore'

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		// 放的是每个模块对应的小store
		baseDataStore,
		questionManageStore,
		surveyManageStore,
		surveyStatisStore,
		systemManageStore
	}
});


