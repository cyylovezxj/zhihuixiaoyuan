<!-- 课程管理页面 -->
<template>
  <div class="courseManage">
    <div class="optionDiv">
    	<el-input size="mini" v-model="search" placeholder="请输入内容"></el-input>
    	<el-button size="mini" type="success" @click="batchDelete">批量删除</el-button>
    	<el-button size="mini" type="success" @click="add">新增</el-button>
    </div>
    <div class="tableDiv">
    	<el-table
    		@selection-change="handleSelectionChange"
	      :data="courseList"
	      style="width: 100%">
	      <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
	      <el-table-column align="center"
	        prop="name"
	        label="课程名称">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="period"
	        label="课程周期">
	      </el-table-column>
	       <el-table-column align="center"
	        prop="description"
	        label="课程描述">
	      </el-table-column>
	      <el-table-column label="操作" align="center">
		      <template slot-scope="scope">
		      	<i class="fa fa-pencil-square-o" title="编辑" style="color:green" @click="handleEdit(scope.$index, scope.row)"></i>
		      	<i class="fa fa-trash-o" title="删除" style="color:red" @click="handleDelete(scope.$index, scope.row)"></i>
		        <!-- <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
		        <!-- <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
		      </template>
		    </el-table-column>
	    </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form ref="ruleForm" :rules="rules" :model="form">
		    <el-form-item label="课程名称" :label-width="formLabelWidth" prop="name">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="课程周期" :label-width="formLabelWidth" prop="period">
		      <el-input v-model.number="form.period" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="课程简介" :label-width="formLabelWidth" prop="description">
		      <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
		    <el-button size="mini" type="success" @click="save('ruleForm')">确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  data(){
    return {
     	search:'',
     	dialogTitle:'新增',
     	dialogFormVisible:false,
     	formLabelWidth:'80px',
     	form:{
     		
     	},
     	multipleSelection:[],
     	rules:{
				name:[
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        description:[
          { required: true, message: '请输入课程简介', trigger: 'blur' }
        ],
        period:[
		      { required: true, message: '请输入课程周期',trigger: 'blur'},
		      { type: 'number', message: '课程周期必须为数字值',trigger: 'blur'}
		    ],
     	},
    }
  },
  created(){
  	this.findAllCourse();
  },
  computed:{
  	courseList(){
  		// courses进行搜索条件的过滤
  		let vm = this;
  		return this.courses.filter((item)=>{
  			if(item.name){
  				return item.name.indexOf(vm.search)!=-1;
  			}else{
  				return false;
  			}
  		});
  	},
  	...mapGetters(['courses'])
  },
  methods:{
  	handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  	save(formName){
			this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOneCourse(this.form).then((data)=>{
		  			if(data.stauts==200){
		  				this.$notify({
			          title: '成功',
			          message: '保存成功',
			          type: 'success'
			        });
			        this.dialogFormVisible = false;
			        this.findAllCourse();
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
        } else {
          return false;
        }
      });
  	},
  	batchDelete(){
  		let ids = this.multipleSelection.map((item)=>{
  			return item.id;
  		});
  		this.batchCourse({ids:ids.join(',')}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '批量删除成功',
	          type: 'success'
	        });
	        this.findAllCourse();
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
  		this.form = {};
  		this.dialogFormVisible = true;
  	},
  	handleEdit(index,row){
  		this.dialogTitle = '编辑';
  		this.form = {
  			id:row.id,
  			name:row.name,
  			period:row.period,
  			description:row.description
  		};
  		this.dialogFormVisible = true;
  	},
  	handleDelete(index,row){
  		this.deleteOneCourse({id:row.id}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '删除成功',
	          type: 'success'
	        });
	        this.findAllCourse();
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
  	...mapActions(['findAllCourse','saveOneCourse','deleteOneCourse','batchCourse'])
  }
}
</script>
<style>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
	.courseManage{
		.optionDiv{
			button{
				float:right;
				margin-left:10px;
			}
		}
		.tableDiv i{
			cursor:pointer;
		}
  }
</style>