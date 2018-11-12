<!-- 全部课调统计页面 -->
<template>
  <div class="allSurvey">
  <!-- {{passSurvey}} -->
    <div class="optionDiv">
    	<el-select @change="gradeChange" clearable size="mini" v-model="choice.gradeId" placeholder="请选择年级">
    		<el-option label="全部年级" value=""></el-option>
		    <el-option
		      v-for="(item,index) in grades"
		      :key="index"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
		  <el-select :disabled="Boolean(choice.gradeId?0:1)" clearable size="mini" v-model="choice.clazzId" placeholder="请选择班级">
		  	<el-option label="全部班级" value=""></el-option>
		    <el-option
		      v-for="(item,index) in clazzList"
		      :key="index"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
		  <el-select clearable size="mini" v-model="choice.courseId" placeholder="请选择课程">
		  	<el-option label="全部课程" value=""></el-option>
		    <el-option
		      v-for="(item,index) in courses"
		      :key="index"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
		  <el-select clearable size="mini" v-model="choice.naireId" placeholder="请选择问卷">
		  	<el-option label="全部问卷" value=""></el-option>
		    <el-option
		      v-for="(item,index) in naires"
		      :key="index"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
    	<el-input :disabled="Boolean(choice.naireId?1:0)" size="mini" v-model="choice.search" placeholder="请输入内容"></el-input>
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
	        prop="average"
	        label="平均分">
	        <template slot-scope="scope">
	        	<span>{{scope.row.average?scope.row.average:'--'}}</span>
	        </template>
	      </el-table-column>
	      <el-table-column label="操作" align="center" width="150">
		      <template slot-scope="scope">
		      	<i class="fa fa-eye" title="预览" style="color:blue" @click="handleEye(scope.$index, scope.row)"></i>
		      	<i class="fa fa-download" title="下载" style="color:green" @click="handleDownload(scope.$index,scope.row)"></i>
		      	<i class="fa fa-bar-chart" title="课调分析" style="color:red" @click="handleStatis(scope.$index,scope.row)"></i>
		      </template>
		    </el-table-column>
	    </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    	<div id="allContainer" style="min-width:400px;height:400px"></div>
		</el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import $ from 'jquery';
import Highcharts from 'highcharts';
export default {
  data(){
    return {
     	choice:{
     		gradeId:'',
     		clazzId:'',
     		courseId:'',
     		naireId:'',
     		search:'',
     	},
     	tableHeight:'300',
     	dialogTitle:'课调分析',
     	dialogFormVisible:false,
    }
  },
  computed:{
  	surveyList(){
  		// 对课调进行过滤，过滤的条件是用户选择的内容 choice对象里的是过滤的条件
  		let vm = this;
  		return this.passSurvey.filter((item)=>{
  			// return true;
  			if(vm.choice.gradeId){
  				if(vm.choice.clazzId){
  					if(vm.choice.courseId){
  						if(vm.choice.naireId){
  							return item.clazzVM.grade.id==vm.choice.gradeId&&item.clazzVM.id==vm.choice.clazzId&&item.course.id==vm.choice.courseId&&item.qnVM.id==vm.choice.naireId;
  						}else if(vm.choice.search){
								return item.clazzVM.grade.id==vm.choice.gradeId&&item.clazzVM.id==vm.choice.clazzId&&item.course.id==vm.choice.courseId&&(item.qnVM.name.indexOf(vm.choice.search)!=-1);
  						}else{
  							return item.clazzVM.grade.id==vm.choice.gradeId&&item.clazzVM.id==vm.choice.clazzId&&item.course.id==vm.choice.courseId;
  						}
  					}
  					return item.clazzVM.grade.id==vm.choice.gradeId&&item.clazzVM.id==vm.choice.clazzId;
  				}else if(vm.choice.courseId){
  						if(vm.choice.naireId){
  							return item.clazzVM.grade.id==vm.choice.gradeId&&item.course.id==vm.choice.courseId&&item.qnVM.id==vm.choice.naireId;
  						}else if(vm.choice.search){
								return item.clazzVM.grade.id==vm.choice.gradeId&&item.course.id==vm.choice.courseId&&(item.qnVM.name.indexOf(vm.choice.search)!=-1);
  						}else{
  							return item.clazzVM.grade.id==vm.choice.gradeId&&item.course.id==vm.choice.courseId;
  						}
  				}else if(vm.choice.naireId){
						return item.clazzVM.grade.id==vm.choice.gradeId&&item.qnVM.id==vm.choice.naireId;
	  			}else if(vm.choice.search){
	  				return item.clazzVM.grade.id==vm.choice.gradeId&&item.qnVM.name.indexOf(vm.choice.search)!=-1;
	  			}else{
  					return item.clazzVM.grade.id==vm.choice.gradeId;
	  			}
  			}else if(vm.choice.courseId){
  				if(vm.choice.naireId){
  					return item.course.id==vm.choice.courseId&&item.qnVM.id==vm.choice.naireId;
  				}else if(vm.choice.search){
  					return item.course.id==vm.choice.courseId&&(item.qnVM.name.indexOf(vm.choice.search)!=-1);
  				}else{
  					return item.course.id==vm.choice.courseId;
  				}
  			}else if(vm.choice.naireId){
					return item.qnVM.id==vm.choice.naireId;
  			}else if(vm.choice.search){
  				return item.qnVM.name.indexOf(vm.choice.search)!=-1;
  			}else{
  				return true;
  			}
  		});
  	},
  	clazzList(){
  		// 通过用户选择的年级来获取对应的班级
  		let vm = this;
  		return this.clazzes.filter((item)=>{
  			if(vm.choice.gradeId&&item.grade){
  				return item.grade.id == vm.choice.gradeId;
  			}else{
  				return true;
  			}
  		});
  	},
  	...mapGetters(['grades','clazzes','courses','naires','passSurvey']),
  },
  created(){
  	this.tableHeight = $(window).height()-190;
  	this.findAllGrade();
  	this.findAllClazz();
  	this.findAllCourse();
  	this.findAllNaire();
  	this.findAllSurvey();
  },
  methods:{
  	handleEye(index,row){},
  	handleDownload(index,row){
  		window.open('http://120.78.164.247:9999/result/downLoadSurveyResultById?id='+row.id);
  	},
  	handleStatis(index,row){
  		this.dialogFormVisible = true;
  		setTimeout(()=>{
  			this.toDraw();
  		},200);
  	},
  	toDraw(){
  		// highcharts代码
  		var chart = Highcharts.chart('allContainer', {
  			credits:{
  				enabled:false,
  			},
				chart: {
					type: 'bar'
				},
				title: {
					text: ''
				},
				xAxis: {
					categories: ['授课质量', '备课情况', '扩展能力', '技术能力', '亲和力'],
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: '评分情况',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: ' 次'
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true,
							allowOverlap: true // 允许数据标签重叠
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -40,
					y: 100,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				series: [{
					name: '优秀',
					data: [107, 31, 35, 203, 2]
				}, {
					name: '良好',
					data: [133, 156, 47, 48, 6]
				}, {
					name: '中等',
					data: [73, 14, 44, 32, 34]
				}]
			});
  	},
  	gradeChange(){
  		this.choice.clazzId = '';
  	},
  	...mapActions(['findAllGrade','findAllClazz','findAllCourse','findAllNaire','findAllSurvey'])
  },
}
</script>
<style scoped>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
  .allSurvey{
		.tableDiv i{
			cursor:pointer;
			margin:0 5px;
			font-size:18px;
		}
  }
</style>