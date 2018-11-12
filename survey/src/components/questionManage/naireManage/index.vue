<!-- 问卷管理页面 -->
<template>
  <div class="naireManage">
  <!-- {{quesNoOption}} -->
    <!-- {{naireWithQues}} -->
    <!-- {{multipleSelection}} -->
    <div class="optionDiv">
    	<el-input size="mini" v-model="search" placeholder="请输入内容"></el-input>
    	<el-button size="mini" type="success" @click="batchDelete">批量删除</el-button>
    	<el-button size="mini" type="success" @click="add">新增</el-button>
    </div>
    <div class="tableDiv">
    	<el-table
    		@selection-change="handleSelectionChange"
	      :data="naireList"
	      style="width: 100%" :height="tableHeight">
	      <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
	      <el-table-column align="center"
	        prop="name"
	        label="问卷名称">
	      </el-table-column>
	      <el-table-column align="center"
	        prop="description"
	        label="问卷描述">
	      </el-table-column>
	      <el-table-column label="操作" align="center">
		      <template slot-scope="scope">
		      	<i class="fa fa-eye" title="预览" style="color:blue" @click="handleEyes(scope.$index, scope.row)"></i>
		      	<i class="fa fa-pencil-square-o" title="编辑" style="color:green" @click="handleEdit(scope.$index, scope.row)"></i>
		      	<i class="fa fa-trash-o" title="删除" style="color:red" @click="handleDelete(scope.$index, scope.row)"></i>
		      </template>
		    </el-table-column>
	    </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="问卷名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="问卷描述" :label-width="formLabelWidth">
		      <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="题目列表" :label-width="formLabelWidth">
		      <el-button size="mini" @click="showTrans">点击选择</el-button>
          <!-- {{quesIds}} -->
		    </el-form-item>
		  </el-form>
      <!-- 展示用户选择的题目的详细信息 -->
      <!-- 题目详细信息{{quesShowList}} -->
      <div class="contentDiv">
        <div class="itemDiv" v-for="(item,index) in quesShowList">
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
		  <div slot="footer" class="dialog-footer">
		    <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
		    <el-button size="mini" type="success" @click="save">确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 穿梭框 模态框 -->
		<el-dialog :title="dialogTransTitle" :visible.sync="dialogTransVisible">
		  <el-transfer v-model="quesIds" :data="quesList"></el-transfer>
		  <div slot="footer" class="dialog-footer">
		    <el-button size="mini" type="success" @click="dialogTransVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
    <!-- 问卷预览 -->
    <el-dialog :title="naireWithQues.name" :visible.sync="dialogEyeVisible">
      <!-- {{naireWithQues}} -->
      <span>{{naireWithQues.description}}</span>
      <div class="contentDiv">
        <div class="itemDiv" v-for="(item,index) in naireWithQues.questionVMs">
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
     	search:'',
     	multipleSelection:[],
     	tableHeight:'300px',
     	dialogTitle:'新增',
     	dialogFormVisible:false,
     	dialogTransTitle:'题目列表',
     	dialogTransVisible:false,
      // dialogEyeTitle:'预览',
      dialogEyeVisible:false,
     	formLabelWidth:'80px',
     	form:{
     		name:'',
     		description:'',
     	},
     	// 用户选择的key值组成的数组
     	quesIds:[],
    }
  },
  computed:{
    // 用户选择的所有的题目列表，有选项，需要展示在模态框中，需要对所有的题目进行过滤，如果当前题目是用户选中的，那么过滤出来
    quesShowList(){
      // questions   所有的题目，包含选项
      // this.quesIds   [495,497]用户选择的题目id组成的数组
      // 
      return this.questions.filter((item,index)=>{
        return this.quesIds.indexOf(item.id)!=-1;
      });
    },
  	quesList(){
  		// 将quesNoOption 转换成 穿梭框识别的数据
     	let arr = [];
     	this.quesNoOption.forEach((item)=>{
     		let obj = {
     			key:item.id,
     			label:item.name
     		};
     		arr.push(obj);
     	});
     	return arr;
  	},
  	naireList(){
  		let vm = this;
  		return this.naires.filter((item)=>{
  			if(item.name){
  				return item.name.indexOf(vm.search)!=-1;
  			}else{
  				return false;
  			}
  		});
  	},
  	...mapGetters(['naires','quesNoOption','questions','naireWithQues']),
  },
  created(){
  	this.findAllNaire();
  	this.findAllQuesNoOption();
  	this.tableHeight = ($(window).height()-190)+'px';
  	// vue实例和属性和方法创建完毕
    //查找所有的题目， 
    this.findAllQuestion();
  },
  mounted(){
  	// vue实例与DOM绑定并且渲染完毕
  	//设置元素的高度，在这里设置，选中元素。
  },
  methods:{
  	// 点击选择题目
  	showTrans(){
  		// 显示模态框，穿梭框
  		this.dialogTransVisible = true;
  	},
  	// 保存
  	save(){
  		this.form.questionIds = this.quesIds.join(',');
  		this.saveOneNaire(this.form).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '保存成功',
	          type: 'success'
	        });
	        this.dialogFormVisible = false;
	        this.findAllNaire();
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
  	// 批量删除
  	batchDelete(){
      let ids = this.multipleSelection.map((item)=>{
        return item.id;
      });
      this.batchNaire({ids:ids.join(',')}).then((data)=>{
        if(data.stauts==200){
          this.$notify({
            title: '成功',
            message: '批量删除成功',
            type: 'success'
          });
          this.findAllNaire();
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
  	// 新增
  	add(){
      this.dialogTitle = "新增";
  		this.dialogFormVisible = true;
  		this.form = {
  			name:'',
     		description:'',
  		};
  		this.quesIds = [];
  	},
  	// 预览
  	handleEyes(index,row){
      this.findNaireWithQues({id:row.id}).then((data)=>{
        this.dialogEyeVisible = true;
      });
    },
  	// 编辑
  	handleEdit(index,row){
      // 通过row.id是问卷的id,去查找问卷的详细数据，包含题目的信息。
      // 可以修改问卷的名字，描述，修改内部的题目。
      // 该问卷中有哪些题目。
      // 1 2 3 4 题目    
      // 如果删除问卷中的某一题目，
      // 问卷与题目的关系。修改的是问卷中的题目有哪些，可以将题目添加到问卷中，也可以将题目从问卷中移除。
      this.dialogTitle = "编辑";
      this.findNaireWithQues({id:row.id}).then((data)=>{
        // data===this.naireWithQues
        this.form = {
          id:data.id,
          name:data.name,
          description:data.description,
        };
        this.quesIds = data.questionVMs.map((item)=>{
          return item.id;
        });
        this.dialogFormVisible = true;
      });
    },
  	// 删除
  	handleDelete(index,row){
      this.deleteOneNaire({id:row.id}).then((data)=>{
        if(data.stauts==200){
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
          this.findAllNaire();
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
  	handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  	...mapActions(['findAllNaire','saveOneNaire','deleteOneNaire','batchNaire','findAllQuesNoOption','findAllQuestion','findNaireWithQues']),
  },
}
</script>
<style>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
  .naireManage{
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
      margin-top:10px;
      padding:3px 0px;
      ul{
        list-style:none;
        padding-left:10px;
        margin-bottom:0;
        margin-top:0;
      }
    }
  }
</style>