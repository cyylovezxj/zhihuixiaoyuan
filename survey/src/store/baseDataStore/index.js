// 基础数据仓库
import axios from '../axios';
import qs from 'qs';
export default {
	state:{
		grades:[],
		teachers:[],
		courses:[],
		clazzes:[],
		schoolInfo:{},
	},
	getters:{
		// grades:(state)=>{}
		grades:state=>{
			// 要处理成学校id为3
			return state.grades.filter((item)=>{
				return item.schoolId == 3;
			});
		},
		teachers:state=>state.teachers,
		courses:state=>state.courses,
		clazzes:state=>{
			return state.clazzes.filter((item)=>{
				if(item.grade){
					return item.grade.schoolId==3;
				}else{
					return false;
				}
			});
		},
		schoolInfo:state=>state.schoolInfo,
	},
	mutations:{
		changeGrade(state,data){
			state.grades = data;
		},
		changeTeacher(state,data){
			state.teachers = data;
		},
		changeCourse(state,data){
			state.courses = data;
		},
		changeClazz(state,data){
			state.clazzes = data;
		},
		changeSchoolInfo(state,data){
			state.schoolInfo = data;
		},
	},
	actions:{
		//5个模块
		//校园信息开始
		findAllSchoolInfo(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/school/findById',{params:obj}).then(({data})=>{
					context.commit('changeSchoolInfo',data.data)
					resolve(data.data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneSchoolInfo(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/school/saveOrUpdate',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//校园信息结束
		//班级开始
		findAllClazz(context){
			return new Promise((resolve,reject)=>{
				axios.get('/clazz/findAllVM').then(({data})=>{
					context.commit('changeClazz',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneClazz(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/clazz/saveOrUpdateClazz',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		deleteOneClazz(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/clazz/deleteClazzById',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchClazz(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/clazz/batchDeleteClazz',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//班级结束
		//课程开始
		findAllCourse(context){
			return new Promise((resolve,reject)=>{
				axios.get('/course/findAllCourse').then(({data})=>{
					context.commit('changeCourse',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneCourse(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/course/saveOrUpdate',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		deleteOneCourse(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/course/deleteById',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchCourse(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/course/batchDelete',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//课程结束
		//教师开始
		findAllTeacher(context){
			return new Promise((resolve,reject)=>{
				axios.get('/user/findAll').then(({data})=>{
					context.commit('changeTeacher',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneTeacher(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/user/saveOrUpdate',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		deleteOneTeacher(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/user/deleteById',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchTeacher(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/user/batchDelete',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//教师结束
		//年级开始
		findAllGrade(context){
			return new Promise((resolve,reject)=>{
				axios.get('/grade/findAll').then(({data})=>{
					context.commit('changeGrade',data.data)
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		saveOneGrade(context,obj){
			return new Promise((resolve,reject)=>{
				axios.post('/grade/saveOrUpdate',qs.stringify(obj)).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		deleteOneGrade(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/grade/deleteById',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchGrade(context,obj){
			return new Promise((resolve,reject)=>{
				axios.get('/grade/batchDelete',{params:obj}).then(({data})=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//年级结束
	}
}