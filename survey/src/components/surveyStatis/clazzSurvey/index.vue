<!-- 班级课调统计页面 -->
<template>
  <div class="clazzSurvey">
    <div class="optionDiv">
    	<el-select @change="gradeChange" clearable size="mini" v-model="choice.gradeId"placeholder="请选择年级">
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
    </div>
    <div class="clazzContent">
    	<el-row :gutter="20">
			  <el-col v-for="(item,index) in clazzScore" :key="index" :span="6">
			  	<div class="itemDiv" @click="showDialog">
			  		<div>
			  			<i class="fa fa-bolt" style="font-size:60px;color:yellow;margin:10px;margin-left:30px;"></i>
			  		</div>
				  	<div>
				  		<span>班级：{{item.name}}</span><br>
				  		<span>平均分：{{item.average}}</span><br>
				  		<span>最近分：{{item.recent}}</span>
				  	</div>
			  	</div>
			  </el-col>
			</el-row>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
    	<div id="clazzContainer" style="min-width:400px;height:400px"></div>
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
    	dialogTitle:'历史课调平均分',
    	dialogFormVisible:false,
     	choice:{
     		gradeId:'',
     		clazzId:''
     	},
     	clazzScore:[{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	},{
     		name:'1班',
     		average:4.3,
     		recent:3.8,
     	}],
    }
  },
  computed:{
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
  	...mapGetters(['grades','clazzes']),
  },
  created(){
  	this.findAllGrade();
  	this.findAllClazz();
  },
 	methods:{
 		showDialog(){
 			this.dialogFormVisible = true;
 			setTimeout(()=>{
 				this.toDraw();
 			},200);
 		},
 		gradeChange(){
 			this.choice.clazzId = '';
 		},
 		toDraw(){
			var chart = Highcharts.chart('clazzContainer', {
				// 去除版权
				credits:{
					enabled:false,
				},
				// 去除图例
				legend:{
					enabled:false,
				},
				chart: {
					type: 'line'
				},
				title: {
					text: ''
				},
				xAxis: {
					categories: ['张三', '李四', '马云', '老李','张三', '李四', '马云', '老李']
				},
				yAxis: {
					title: {
						text: '平均分'
					}
				},
				plotOptions: {
					line: {
						dataLabels: {
							// 开启数据标签
							enabled: true          
						},
					}
				},
				series: [{
					name: '1班',
					data: [3.9, 4.2, 2.7, 3.5, 3.9, 4.2, 3.9, 4.2]
				}]
			});

 		},
 		...mapActions(['findAllGrade','findAllClazz'])
 	}
}
</script>
<style scoped>
	.optionDiv .el-input{
		width:200px;
	}
</style>
<style scoped lang="scss">
  .clazzSurvey{
		.itemDiv{
			cursor:pointer;
			background:#4D8C7C;
			border-radius:5px;
			margin-top:10px;
			color:white;
			overflow:hidden;
			div:first-child{
				float:left;
			}
			div:last-child{
				float:left;
				margin-left:40px;
				line-height:30px;
			}
		}
  }





</style>