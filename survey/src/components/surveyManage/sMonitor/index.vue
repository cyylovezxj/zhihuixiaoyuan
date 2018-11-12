<!-- 课调监控页面 -->
<template>
  <div class="sMonitor">
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
		      	<i v-if="scope.row.status=='未开启'" class="fa fa-play" title="开启" style="color:blue" @click="handleBegin(scope.$index, scope.row)"></i>
		      	<i v-if="scope.row.status=='开启'" class="fa fa-hourglass-start" title="查看进度" style="color:green" @click="handleProgress(scope.$index, scope.row)"></i>
		      	<i v-if="scope.row.status=='开启'" class="fa fa-stop-circle-o" title="结束" style="color:red" @click="handleStop(scope.$index, scope.row)"></i>
		      </template>
		    </el-table-column>
	    </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    	<div id="monitorContainer" style="min-width:400px;height:400px"></div>
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
    	dialogTitle:'课调进度',
    	dialogFormVisible:false,
    	tableHeight:'300px',
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
     	progressData:[
				['已完成',30],
				['未完成',10]
			],
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
  	handleBegin(index,row){
  		this.beginSurvey({id:row.id}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '开启成功',
	          type: 'success'
	        });
	        this.findAllSurvey();
  			}else{
  				this.$notify({
	          title: '失败',
	          message: '开启失败',
	          type: 'error'
	        });
  			}
  		}).catch((error)=>{
				this.$notify({
          title: '失败',
          message: '开启失败',
          type: 'error'
        });
  		});
  	},
  	handleProgress(index,row){
  		this.dialogFormVisible = true;
  		setTimeout(()=>{
  			this.toDraw();
  		},200);
  	},
  	handleStop(index,row){
  		this.stopSurvey({id:row.id}).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '结束成功',
	          type: 'success'
	        });
	        this.findAllSurvey();
  			}else{
  				this.$notify({
	          title: '失败',
	          message: '结束失败',
	          type: 'error'
	        });
  			}
  		}).catch((error)=>{
				this.$notify({
          title: '失败',
          message: '结束失败',
          type: 'error'
        });
  		});
  	},
  	typeChange(){
  		this.choice.search = '';
  	},
  	toDraw(){
  		var chart = Highcharts.chart('monitorContainer', {
  			credits:{
  				enabled:false,
  			},
				colors:['#cccccc','red'],
				chart: {
					spacing : [0, 0 , 0, 0],
				},
				title: {
					floating:true,
					text: '课调进度'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%   {point.y}份</b> '
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							style: {
								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						},
						point: {
							events: {
								mouseOver: function(e) {  // 鼠标滑过时动态更新标题
									// 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
									chart.setTitle({
										text: e.target.name+ '\t'+ e.target.y + ' 份'
									});
								}
								//, 
								// click: function(e) { // 同样的可以在点击事件里处理
								//     chart.setTitle({
								//         text: e.point.name+ '\t'+ e.point.y + ' %'
								//     });
								// }
							}
						},
					}
				},
				series: [{
					type: 'pie',
					innerSize: '80%',
					name: '进度',
					data: this.progressData
				}]
			}, function(c) { // 图表初始化完毕后的会掉函数
				// 环形图圆心
				var centerY = c.series[0].center[1],
					titleHeight = parseInt(c.title.styles.fontSize);
				// 动态设置标题位置
				c.setTitle({
					y:centerY + titleHeight/2
				});
			});
  	},
  	...mapActions(['findAllSurvey','beginSurvey','stopSurvey']),
  },
}
</script>
<style scoped>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
  .sMonitor{
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
  }
</style>