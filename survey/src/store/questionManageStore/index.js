// 问卷管理仓库
import axios from '../axios';
import qs from 'qs';
export default {
	state:{
		questions:[],
		naires:[],
		quesNoOption:[],
		naireWithQues:{},
	},
	getters:{
		questions:state=>state.questions,
		naires:state=>state.naires,
		quesNoOption:state=>state.quesNoOption,
		naireWithQues:state=>state.naireWithQues,
	},
	mutations:{
		changeQuestion(state,data){
			state.questions = data;
		},
		changeNaire(state,data){
			state.naires = data;
		},
		changeQuesNoOption(state,data){
			state.quesNoOption = data;
		},
		changeNaireWithQues(state,data){
			state.naireWithQues = data;
		},
	},
	actions:{
		// 问卷开始
		findNaireWithQues(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/questionnaire/findQuestionnaireVMById',{params:obj}).then(({data})=>{
					context.commit('changeNaireWithQues',data.data)
					resolve(data.data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		findAllNaire(context){
			return new Promise((resolve,reject)=>{
				axios.get('/questionnaire/findAllQuestionnaire').then(({data})=>{
					context.commit('changeNaire',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneNaire(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/questionnaire/saveOrUpdateQuestionnaire',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		deleteOneNaire(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/questionnaire/deleteQuestionnaireById',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchNaire(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/questionnaire/batchDeleteQuestion',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		// 问卷结束
		// 题目开始
		findAllQuesNoOption(context){
			// 返回题目id  name questionType
			return new Promise((resolve,reject)=>{
				axios.get('/question/findAllQuestion').then(({data})=>{
					context.commit('changeQuesNoOption',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		findAllQuestion(context){
			return new Promise((resolve,reject)=>{
				axios.get('/question/findAllQuestionVM').then(({data})=>{
					context.commit('changeQuestion',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneQuestion(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/question/saveOrUpdateQuestion',qs.stringify(obj,{allowDots:true})).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		deleteOneQuestion(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/question/deleteQuestionById',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchQuestion(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/question/batchDeleteQuestion',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		// 题目结束
	}
}