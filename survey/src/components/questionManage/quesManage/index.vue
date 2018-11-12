<!-- 题目管理页面 -->
<template>
<!-- 
	obj = {name:'323',
	type:'单选',
	options:[{
		label:'A',
		score:2,
		name:'优秀'
	},{
		label:'A',
		score:2,
		name:'优秀'
	}]}
	qs.stringify(obj);
		name	dasd
		options[0][label]	as
		options[0][name]	as
		options[0][score]	1
		options[1][label]	wq
		options[1][name]  qwq
		options[1][score]	3


		*********** 新增或者修改的时候注意
		qs.stringify(obj,{allowDots:true});
		name	dasd
		options[0].label	as
		options[0].name	as
		options[0].score	1
		options[1].label	wq
		options[1].name	qwq
		options[1].score	3
 -->
  <div class="quesManage">
    <div class="optionDiv">
    	<el-select clearable size="mini" v-model="choice.type" placeholder="请选择">
		    <el-option
		      v-for="(item,index) in types"
		      :key="index"
		      :label="item"
		      :value="item">
		    </el-option>
		  </el-select>
    	<el-input size="mini" v-model="choice.search" placeholder="请输入内容"></el-input>
    	<el-button size="mini" type="success" @click="batchDelete">批量删除</el-button>
    	<el-button size="mini" type="success" @click="add">新增</el-button>
    </div>
    <div class="contentDiv">
    	<div class="itemDiv" v-for="(item,index) in quesList">
    		<ul>
    			<li>
    				<input type="checkbox" v-model="selected" :value="item.id"/>
    				序号{{index+1}}:&nbsp;&nbsp;{{item.name}}
    			</li>
    			<li style="padding-left:30px;" v-for="(option,num) in item.options">
    				{{option.label}}.&nbsp;{{option.name}}
    			</li>
    		</ul>
    		<div class="iconDiv">
    			<i class="fa fa-pencil-square-o" title="编辑" style="color:green" @click="handleEdit(item)"></i>
		      <i class="fa fa-trash-o" title="删除" style="color:red" @click="handleDelete(item)"></i>
    		</div>
    	</div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <!-- {{form}} -->
      <el-form :model="form">
        <el-form-item label="题目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目类型" :label-width="formLabelWidth">
        <!-- select下拉列表的change事件
          单选题  多选题  简答题
         -->
          <el-select @change="selectChange" clearable v-model="form.questionType" placeholder="请选择">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showTable" label="题目选项" :label-width="formLabelWidth">
          <!-- 直接放置一个表格 -->
          <el-table @row-click="showSpan=false" height="200px"
            :data="form.options"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="55">
            </el-table-column>
            <el-table-column align="center"
              prop="label"
              label="label">
              <template slot-scope="scope">
                <span v-if="showSpan">{{scope.row.label}}</span>
                <el-input v-else size="mini" v-model="scope.row.label"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"
              prop="name"
              label="选项">
              <template slot-scope="scope">
                <span v-if="showSpan">{{scope.row.name}}</span>
                <el-input v-else size="mini" v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center"
              prop="score"
              label="分值">
              <template slot-scope="scope">
                <span v-if="showSpan">{{scope.row.score}}</span>
                <el-input v-else size="mini" v-model="scope.row.score"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <i class="fa fa-trash-o" title="删除" style="color:red" @click="handleDeleteOption(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加选项的按钮 -->
          <div class="addIcon">
            <i class="fa fa-plus" title="添加选项" @click="addOption"></i>
          </div>
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
import $ from 'jquery';
export default {
  data(){
    return {
      dialogTitle:'新增',
      dialogFormVisible:false,
      formLabelWidth:'80px',
     	choice:{
     		type:'',
     		search:''
     	},
     	selected:[],
     	types:['单选题','多选题','简答题'],
      form:{
        name:'',
        questionType:'单选题',
        options:[]
      },
      showTable:true,
      showSpan:true,
    }
  },
  computed:{
  	quesList(){
  		let vm = this;
  		return this.questions.filter((item)=>{
  			if(item.name){
  				if(item.questionType&&vm.choice.type){
  					return (item.name.indexOf(vm.choice.search)!=-1)&&item.questionType==vm.choice.type;
  				}
  				return item.name.indexOf(vm.choice.search)!=-1;
  			}else{
  				return false;
  			}
  		});
  	},
  	...mapGetters(['questions']),
  },
  mounted(){
  	$('.contentDiv').height($(window).height()-190);
  },
  created(){
  	this.findAllQuestion();
  },
  methods:{
    // 保存题目
    save(){
      // this.form存到后台
      this.saveOneQuestion(this.form).then((data)=>{
        if(data.stauts==200){
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.findAllQuestion();
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
    // 删除选项
    handleDeleteOption(index,row){
      // this.form.options 
      // {name:'',lable:'',score:3}
      // 通过index来删除数组中的对应位置上的对象
      // alert(index);
      this.form.options.splice(index,1);
    },
    // 添加选项
    addOption(){
      // 给表格中添加一行
      this.form.options.push({
        name:'',
        label:'',
        score:'',
      });
    },
    // 模态框的下拉列表发生更改
    selectChange(val){
      // alert(val);
      // alert(this.form.questionType);
      // val最新的值  单选   -  多选题  ---  简答题
      if(val=='简答题'){
        this.showTable = false;
      }else{
        this.showTable = true;
      }
    },
  	handleEdit(ques){
      // 可以拿到题目的信息，显示在模态框上
      this.form = {
        id:ques.id,
        name:ques.name,
        questionType:ques.questionType,
        // 当前给的是引用地址
        // options:ques.options
        options:JSON.parse(JSON.stringify(ques.options))
      };
      // ques.options = [];
      // this.form.options = ques.options;

      // let obj = {
      //   name:'zhangsan'
      // };
      // let obj2 = obj;
      // obj2.name = 'lisi'
      // console.log(obj.name);
      // 在这里要判断题目类型，展示表格
      if(ques.questionType=='简答题'){
        this.showTable = false;
      }else{
        this.showTable = true;
      }
      this.dialogFormVisible = true;
  	},
  	handleDelete(ques){
			// alert(ques.id);
      this.deleteOneQuestion({id:ques.id}).then((data)=>{
        if(data.stauts==200){
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
          this.findAllQuestion();
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
  	batchDelete(){
      // ids
      this.batchQuestion({ids:this.selected.join(',')}).then((data)=>{
        if(data.stauts==200){
          this.$notify({
            title: '成功',
            message: '批量删除成功',
            type: 'success'
          });
          this.findAllQuestion();
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
      this.dialogFormVisible = true;
      this.form = {
        name:'',
        questionType:'单选题',
        options:[]
      };
      this.showTable = true;
      this.showSpan = true;
    },
  	...mapActions(['findAllQuestion','saveOneQuestion','deleteOneQuestion','batchQuestion'])
  }
}
</script>
<style>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
  .quesManage{
		.optionDiv{
			button{
				float:right;
				margin-left:10px;
			}
		}
		.contentDiv{
			width:100%;
			overflow:auto;
			.itemDiv{
				border:1px solid #777777;
				margin-top:10px;
				ul{
					list-style:none;
					padding-left:10px;
					margin-bottom:0;
				}
			}
			.iconDiv{
				font-size:20px;
				text-align:right;
				margin:0 10px;
			}
		}
    .addIcon{
      font-size:20px;
      text-align:right;
      i{
        cursor:pointer;
      }
    }

  }
</style>