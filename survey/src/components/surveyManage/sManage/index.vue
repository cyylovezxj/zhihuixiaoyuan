<!-- 课调管理页面 -->
<template>
  <div class="sManage">
    <!-- {{surveies}} -->
    <!-- {{surveyList}} -->
  	<!-- {{choice}} -->
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
    	<el-button size="mini" type="success" @click="batchDelete">批量删除</el-button>
    	<el-button size="mini" type="success" @click="add">新增</el-button>
    </div>
    <div class="tableDiv">
    	<el-table
    		@selection-change="handleSelectionChange"
	      :data="surveyList"
	      style="width: 100%" :height="tableHeight">
	      <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
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
	        	<!-- let str = '2018-09-09 09:09:09';
						str = str.split(' ')[0] -->
	        	<span>{{scope.row.surveydate?scope.row.surveydate.split(' ')[0]:'--'}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="操作" align="center" width="150">
		      <template slot-scope="scope">
		      	<i class="fa fa-eye" title="预览" style="color:blue" @click="handleEyes(scope.$index, scope.row)"></i>
		      	<i class="fa fa-pencil-square-o" title="编辑" style="color:green" @click="handleEdit(scope.$index, scope.row)"></i>
		      	<i class="fa fa-trash-o" title="删除" style="color:red" @click="handleDelete(scope.$index, scope.row)"></i>
		      </template>
		    </el-table-column>
	    </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    	<!-- {{form}} -->
		  <el-form :model="form">
		    <el-form-item label="年级" :label-width="formLabelWidth">
		      <el-select @change="gradeChange" clearable v-model="gradeId" placeholder="请选择年级">
				    <el-option
				      v-for="(item,index) in grades"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
		    </el-form-item>
		    <el-form-item label="班级" :label-width="formLabelWidth">
		      <el-select :disabled='Boolean(gradeId?0:1)' clearable v-model="form.clazzId" placeholder="请选择班级">
				    <el-option
				      v-for="(item,index) in clazzList"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
		    </el-form-item>
		    <el-form-item label="课程" :label-width="formLabelWidth">
		      <el-select clearable v-model="form.courseId" placeholder="请选择课程">
				    <el-option
				      v-for="(item,index) in courses"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
		    </el-form-item>
		    <el-form-item label="讲师" :label-width="formLabelWidth">
		      <el-select clearable v-model="form.userId" placeholder="请选择讲师">
				    <el-option
				      v-for="(item,index) in teachers"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
		    </el-form-item>
		    <el-form-item clearable label="问卷" :label-width="formLabelWidth">
		      <el-select v-model="form.questionnaireId" placeholder="请选择问卷">
				    <el-option
				      v-for="(item,index) in naires"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
		    <el-button size="mini" type="success" @click="save">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 预览 -->
		<el-dialog :title="currentSurvey.qnVM.name" :visible.sync="dialogEyeVisible">
			<table class="eyeTable">
				<tr>
					<td><span>班级：{{currentSurvey.clazzVM.name}}</span></td>
					<td><span>讲师：{{currentSurvey.user.name}}</span></td>
					<td><span>时间：{{currentSurvey.surveydate}}</span></td>
					<td><span>课程：{{currentSurvey.course.name}}</span></td>
				</tr>
			</table>
      <div class="contentDiv">
        <div class="itemDiv" v-for="(item,index) in currentSurvey.qnVM.questionVMs">
          <ul>
            <li>
              序号{{index+1}}:&nbsp;&nbsp;{{item.name}}
            </li>
            <li style="padding-left:30px;" v-for="(option,num) in item.options">
              {{option.label}}.&nbsp;{{option.name}}
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import $ from 'jquery';
export default {
  data(){
    return {
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
     	multipleSelection:[],
     	tableHeight:'300',
     	dialogTitle:'新增',
     	dialogFormVisible:false,
     	formLabelWidth:'80px',
     	form:{
     		clazzId:'',
  			courseId:'',
  			userId:'',
  			questionnaireId:''
     	},
     	gradeId:'',
     	// 当前要预览的课调对象的信息
     	currentSurvey:{
     		qnVM:{},
     		clazzVM:{},
     		user:{},
     		course:{},
     		qnVM:{
     			questionVMs:[]
     		},
     	},
     	dialogEyeVisible:false,
    }
  },
  computed:{
  	clazzList(){
  		let vm = this;
  		return this.clazzes.filter((item,index)=>{
  			if(item.grade){
  				return item.grade.id == vm.gradeId;
  			}
  		});
  	},
  	surveyList(){
  		// return this.surveies....
  		// 过滤条件是this.choice.type和this.choice.search
  		let vm = this;
  		return this.surveies.filter((item)=>{
  			if(vm.choice.type){
  				if(vm.choice.type=='grade'&&item.clazzVM&&item.clazzVM.grade){
  					// 如果用户选择了年级的话，对年级数据进行过滤
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
  	...mapGetters(['surveies','naires','grades','teachers','courses','clazzes']),
  },
  created(){
  	this.tableHeight = $(window).height()-190;
  	this.findAllSurvey();
  	this.findAllClazz();
  	this.findAllCourse();
  	this.findAllTeacher();
  	this.findAllGrade();
  	this.findAllNaire();
  },
  methods:{
  	save(){
  		this.form.status = '未开启';
  		this.saveOneSurvey(this.form).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '保存成功',
	          type: 'success'
	        });
	        this.dialogFormVisible = false;
	        this.findAllSurvey();
  			}else{
  				this.$notify({
	          title: '失败',
	          message: '保存失败',
	          type: 'error'
	        });
	        this.dialogFormVisible = false;
  			}
  		}).catch((error)=>{
				this.$notify({
          title: '失败',
          message: '保存失败',
          type: 'error'
        });
        this.dialogFormVisible = false;
  		});
  	},
  	gradeChange(){
  		// 在年级发生更改的时候。重置班级选中的值
  		this.form.clazzId = '';
  	},
  	handleEyes(index,row){
  		this.currentSurvey = row;
  		this.dialogEyeVisible = true;
  	},
  	// 编辑
  	handleEdit(index,row){
  		this.form = {
  			id:row.id,
  			clazzId:row.clazzVM?row.clazzVM.id:'',
  			courseId:row.course?row.course.id:'',
  			userId:row.user?row.user.id:'',
  			questionnaireId:row.qnVM?row.qnVM.id:'',
  			surveydate:this.getCurrentDate(),
  			// "surveydate": "2018-11-07 14:26:53",
  		};
  		this.gradeId = (row.clazzVM&&row.clazzVM.grade)?row.clazzVM.grade.id:'';
  		this.dialogTitle = '编辑';
  		this.dialogFormVisible = true;
  	},
  	handleDelete(index,row){
  		this.deleteOneSurvey({id:row.id}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '删除成功',
	          type: 'success'
	        });
	        this.findAllSurvey();
  			}else{
  				this.$notify({
	          title: '失败',
	          message: '删除失败',
	          type: 'error'
	        });
  			}
  		}).catch((error)=>{
				this.$notify({
          title: '失败',
          message: '删除失败',
          type: 'error'
        });
  		});
  	},
  	typeChange(){
  		this.choice.search = '';
  	},
  	batchDelete(){
  		let ids = this.multipleSelection.map((item)=>{
  			return item.id;
  		});
  		this.batchSurvey({ids:ids.join(',')}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '批量删除成功',
	          type: 'success'
	        });
	        this.findAllSurvey();
  			}else{
  				this.$notify({
	          title: '失败',
	          message: '批量删除失败',
	          type: 'error'
	        });
  			}
  		}).catch((error)=>{
				this.$notify({
          title: '失败',
          message: '批量删除失败',
          type: 'error'
        });
  		});
  	},
  	add(){
  		this.dialogTitle = '新增';
  		this.dialogFormVisible = true;
  		this.form = {
  			clazzId:'',
  			courseId:'',
  			userId:'',
  			questionnaireId:''
  		};
  		this.gradeId = '';
  	},
  	handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取当前的时间，返回字符串
    // 2018-11-07 08:06:03
    getCurrentDate(){
    	let date = new Date();
    	let year = date.getFullYear();
    	let month = date.getMonth()+1;
    	month = month<10?('0'+month):month;
    	let day = date.getDate();
    	day = day<10?('0'+day):day;
    	let hour = date.getHours();
    	hour = hour<10?('0'+hour):hour;
    	let minutes = date.getMinutes();
    	minutes = minutes<10?('0'+minutes):minutes;
    	let seconds = date.getSeconds();
    	seconds = seconds<10?('0'+seconds):seconds;
    	return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
  /*非IE底下  	
		new Date('2018-11-07 08:06:03');
	IE底下  	
		new Date('2018/11/07 08:06:03');*/
		//获取时间戳   date.getTime();
    },
  	...mapActions(['findAllSurvey','saveOneSurvey','deleteOneSurvey','batchSurvey','findAllClazz','findAllCourse','findAllTeacher','findAllGrade','findAllNaire']),
  }
}
</script>
<style>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
  .sManage{
		.optionDiv{
			button{
				float:right;
				margin-left:10px;
			}
		}
		.tableDiv i{
			cursor:pointer;
			margin:0 5px;
			font-size:18px;
		}
		.itemDiv{
      border:1px solid #777777;
      // margin-top:10px;
      padding:3px 0px;
      border-top:none;
      ul{
        list-style:none;
        padding-left:10px;
        margin-bottom:0;
        margin-top:0;
      }
    }
    .eyeTable{
    	width:100%;
    	line-height:40px;
    	text-align:center;
    	border-collapse:collapse;
    	td{
    		border:1px solid #777777;
    	}
    }
  }
</style>