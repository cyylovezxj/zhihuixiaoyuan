<!-- 课调审核页面 -->
<template>
  <div class="sCheck">
    <div class="optionDiv">
    	<el-select @change="typeChange" clearable size="mini" v-model="choice.type" placeholder="请选择">
		    <el-option
		      v-for="(item,index) in typeArr"
		      :key="index"
		      :label="item.name"
		      :value="item.value">
		    </el-option>
		  </el-select>
    	<el-input :disabled="Boolean(choice.type?0:1)" size="mini" v-model="choice.search" placeholder="请输入内容"></el-input>
    </div>
    <div class="tableDiv">
    	<el-table
	      :data="surveyList"
	      style="width: 100%" :height="tableHeight">
	      <el-table-column align="center"
	        prop="clazzVM.grade.name"
	        label="年级">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="clazzVM.name"
	        label="班级">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="course.name"
	        label="课程">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="qnVM.name"
	        label="问卷">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="user.name"
	        label="讲师">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="surveydate"
	        label="课调时间">
	        <template slot-scope="scope">
	        	<span>{{scope.row.surveydate?scope.row.surveydate.split(' ')[0]:'--'}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column align="center"
	        prop="status"
	        label="状态">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="code"
	        label="课调编号">
	      </el-table-column>
	      <el-table-column label="操作" align="center" width="150">
		      <template slot-scope="scope">
		      	<i v-if="scope.row.status=='未审核'" class="fa fa-check" title="审核通过" style="color:blue" @click="handleCheck(scope.$index, scope.row,1)"></i>
		      	<i v-if="scope.row.status=='未审核'" class="fa fa-times" title="审核不通过" style="color:green" @click="handleCheck(scope.$index, scope.row,0)"></i>
		      </template>
		    </el-table-column>
	    </el-table>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import $ from 'jquery';
import Highcharts from 'highcharts';
export default {
  data(){
    return {
    	tableHeight:'300',
     	choice:{
     		type:'',
     		search:'',
     	},
     	typeArr:[{
     		name:'年级',
     		value:'grade'
     	},{
     		name:'班级',
     		value:'clazz'
     	},{
     		name:'课程',
     		value:'course'
     	},{
     		name:'讲师',
     		value:'user'
     	},{
     		name:'问卷',
     		value:'qn'
     	}],
    }
  },
  computed:{
  	surveyList(){
  		let vm = this;
  		return this.surveies.filter((item)=>{
  			if(vm.choice.type){
  				if(vm.choice.type=='grade'&&item.clazzVM&&item.clazzVM.grade){
  					return item.clazzVM.grade.name.indexOf(vm.choice.search)!=-1;
  				}else if(vm.choice.type=='clazz'&&item.clazzVM){
  					return item.clazzVM.name.indexOf(vm.choice.search)!=-1;
  				}else if(vm.choice.type=='course'&&item.course){
  					return item.course.name.indexOf(vm.choice.search)!=-1;
  				}else if(vm.choice.type=='user'&&item.user){
  					return item.user.name.indexOf(vm.choice.search)!=-1;
  				}else if(vm.choice.type=='qn'&&item.qnVM){
  					return item.qnVM.name.indexOf(vm.choice.search)!=-1;
  				}else{
  					return false;
  				}
  			}else{
  				return true;
  			}
  		});
  	},
  	...mapGetters(['surveies']),
  },
  created(){
  	this.tableHeight = $(window).height()-190;
  	this.findAllSurvey();
  },
  methods:{
  	// 审核通过
  	handleCheck(index,row,value){
  		let obj = {
  			id:row.id,
  			status:value
  		};
  		this.checkSurvey(obj).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '操作成功',
	          type: 'success'
	        });
	        this.findAllSurvey();
  			}else{
  				this.$notify({
	          title: '失败',
	          message: '操作失败',
	          type: 'error'
	        });
  			}
  		}).catch((error)=>{
				this.$notify({
          title: '失败',
          message: '操作失败',
          type: 'error'
        });
  		});
  	},
  	// 审核不通过
  	// handleFail(index,row){},
  	typeChange(){
  		this.choice.search = '';
  	},
  	...mapActions(['findAllSurvey','checkSurvey']),
  },
}
</script>
<style scoped>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
  .sCheck{
		.tableDiv i{
			cursor:pointer;
			margin:0 5px;
			font-size:18px;
		}
  }
</style>