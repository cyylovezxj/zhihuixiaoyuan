<!-- 教师管理页面 -->
<template>
  <div class="teacherManage">
    <div class="optionDiv">
    	<el-input size="mini" v-model="search" placeholder="请输入内容"></el-input>
    	<el-button size="mini" type="success" @click="batchDelete">批量删除</el-button>
    	<el-button size="mini" type="success" @click="add">新增</el-button>
    </div>
    <div class="tableDiv">
    	<el-table
    		@selection-change="handleSelectionChange"
	      :data="teacherList"
	      style="width: 100%">
	      <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
	      <el-table-column align="center"
	        prop="name"
	        label="教师姓名">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="gender"
	        label="性别">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="birth"
	        label="出生日期">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="hiredate"
	        label="入职时间">
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
		    <el-form-item label="教师名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="性别" :label-width="formLabelWidth">
		    	<el-radio v-model="form.gender" label="男">男</el-radio>
  				<el-radio v-model="form.gender" label="女">女</el-radio>
		    </el-form-item>
		    <el-form-item label="出生日期" :label-width="formLabelWidth">
		    	<el-date-picker value-format="yyyy-MM-dd"
			      v-model="form.birth"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
		    </el-form-item>
		    <el-form-item label="入职时间" :label-width="formLabelWidth">
		    	<el-date-picker value-format="yyyy-MM-dd"
			      v-model="form.hiredate"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
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
     	search:'',
     	dialogTitle:'新增',
     	dialogFormVisible:false,
     	formLabelWidth:'80px',
     	form:{
     		
     	},
     	multipleSelection:[],
    }
  },
  created(){
  	this.findAllTeacher();
  },
  computed:{
  	teacherList(){
  		// teachers进行搜索条件的过滤
  		let vm = this;
  		return this.teachers.filter((item)=>{
  			if(item.name){
  				return item.name.indexOf(vm.search)!=-1;
  			}else{
  				return false;
  			}
  		});
  	},
  	...mapGetters(['teachers'])
  },
  methods:{
  	handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  	save(){
  		this.saveOneTeacher(this.form).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '保存成功',
	          type: 'success'
	        });
	        this.dialogFormVisible = false;
	        this.findAllTeacher();
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
  		this.batchTeacher({ids:ids.join(',')}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '批量删除成功',
	          type: 'success'
	        });
	        this.findAllTeacher();
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
  			gender:row.gender,
  			birth:row.birth,
  			hiredate:row.hiredate,
  		};
  		this.dialogFormVisible = true;
  	},
  	handleDelete(index,row){
  		this.deleteOneTeacher({id:row.id}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '删除成功',
	          type: 'success'
	        });
	        this.findAllTeacher();
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
  	...mapActions(['findAllTeacher','saveOneTeacher','deleteOneTeacher','batchTeacher'])
  }
}
</script>
<style>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
	.teacherManage{
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