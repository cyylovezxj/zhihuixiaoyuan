// 课调管理仓库
import axios from '../axios';
import qs from 'qs';
export default {
	state:{
		surveies:[],
	},
	getters:{
		surveies:state=>state.surveies,
		// 获取所有审核通过的课调数据
		passSurvey:state=>{
			return state.surveies.filter((item)=>{
				return item.status=="审核通过";
			});
		},
	},
	mutations:{
		changeSurvey(state,data){
			state.surveies = data;
		},
	},
	actions:{
		// 课调管理
		checkSurvey(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/survey/checkSurvey',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		beginSurvey(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/survey/beginSurvey',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		stopSurvey(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/survey/stopSurvey',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		findAllSurvey(context){
			return new Promise((resolve,reject)=>{
				axios.get('/survey/findAllSurveyVM').then(({data})=>{
					context.commit('changeSurvey',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneSurvey(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/survey/saveOrUpdateSurvey',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		deleteOneSurvey(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/survey/deleteSurveyById',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchSurvey(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/survey/batchDeleteSurveyById',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	}
}