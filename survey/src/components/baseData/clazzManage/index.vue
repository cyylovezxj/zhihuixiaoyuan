<!-- 班级管理页面 -->
<template>
  <div class="clazzManage">
    <div class="optionDiv">
    	<el-select clearable size="mini" v-model="choice.gradeId" placeholder="请选择">
		    <el-option
		      v-for="(item,index) in grades"
		      :key="index"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
    	<el-input size="mini" v-model="choice.search" placeholder="请输入内容"></el-input>
    	<el-button size="mini" type="success" @click="batchDelete">批量删除</el-button>
    	<el-button size="mini" type="success" @click="add">新增</el-button>
    </div>
    <div class="tableDiv">
    	<el-table
    		@selection-change="handleSelectionChange"
	      :data="clazzList"
	      style="width: 100%">
	      <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
	      <el-table-column align="center"
	        prop="name"
	        label="班级名称">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="description"
	        label="班级简介">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="grade.name"
	        label="所属年级">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="charge.name"
	        label="班主任">
	      </el-table-column>
	      <el-table-column label="操作" align="center">
		      <template slot-scope="scope">
		      	<i class="fa fa-pencil-square-o" title="编辑" style="color:green" @click="handleEdit(scope.$index, scope.row)"></i>
		      	<i class="fa fa-trash-o" title="删除" style="color:red" @click="handleDelete(scope.$index, scope.row)"></i>
		      </template>
		    </el-table-column>
	    </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="班级名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="所属年级" :label-width="formLabelWidth">
		      <el-select clearable  v-model="form.gradeId" placeholder="请选择">
				    <el-option
				      v-for="(item,index) in grades"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
		    </el-form-item>
		    <el-form-item label="班主任" :label-width="formLabelWidth">
		      <el-select clearable  v-model="form.chargeId" placeholder="请选择">
				    <el-option
				      v-for="(item,index) in teachers"
				      :key="index"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
		    </el-form-item>
		    <el-form-item label="班级描述" :label-width="formLabelWidth">
		      <el-input v-model="form.description" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
		    <el-button size="mini" type="success" @click="save">确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  data(){
    return {
    	choice:{
    		gradeId:'',
    		search:'',
    	},
     	dialogTitle:'新增',
     	dialogFormVisible:false,
     	formLabelWidth:'80px',
     	form:{
     		schoolId:3,
     	},
     	multipleSelection:[],
    }
  },
  created(){
  	this.findAllClazz();
  	this.findAllGrade();
  	this.findAllTeacher();
  },
  computed:{
  	clazzList(){
  		// clazzes进行搜索条件的过滤
  		let vm = this;
  		return this.clazzes.filter((item)=>{
  			if(item.name){
  				// 添加了对年级的过滤
  				if(item.grade&&vm.choice.gradeId){
  					return (item.name.indexOf(vm.choice.search)!=-1)&&(item.grade.id==vm.choice.gradeId);
  				}
  				return item.name.indexOf(vm.choice.search)!=-1;
  			}else{
  				return false;
  			}
  		});
  	},
  	...mapGetters(['teachers','clazzes','grades'])
  },
  methods:{
  	handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  	save(){
  		this.saveOneClazz(this.form).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '保存成功',
	          type: 'success'
	        });
	        this.dialogFormVisible = false;
	        this.findAllClazz();
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
  	batchDelete(){
  		let ids = this.multipleSelection.map((item)=>{
  			return item.id;
  		});
  		this.batchClazz({ids:ids.join(',')}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '批量删除成功',
	          type: 'success'
	        });
	        this.findAllClazz();
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
  		this.form = {
  			schoolId:3,
  		};
  		this.dialogFormVisible = true;
  	},
  	handleEdit(index,row){
  		this.dialogTitle = '编辑';
  		this.form = {
  			id:row.id,
  			name:row.name,
  			gradeId:row.grade?row.grade.id:'',
  			chargeId:row.charge?row.charge.id:'',
  			description:row.description
  		};
  		this.dialogFormVisible = true;
  	},
  	handleDelete(index,row){
  		this.deleteOneClazz({id:row.id}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '删除成功',
	          type: 'success'
	        });
	        this.findAllClazz();
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
  	...mapActions(['findAllTeacher','findAllGrade','findAllClazz','saveOneClazz','deleteOneClazz','batchClazz'])
  }
}
</script>
<style>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
	.clazzManage{
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