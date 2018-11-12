<template>
  <div class="home">
    <div class="headerDiv">
    	<span>智慧校园课调云平台</span>
    </div>	
    <div class="contentDiv">
    	<!-- 分左右  左边 -->
    	<el-row>
		  <el-col :span="3" class="heightDiv navDiv">
		  	<!-- 导航 -->
		  	<el-menu router
		      default-active="/baseData/schoolInfo"
		      class="el-menu-vertical-demo">
		      <el-menu-item index="/baseData/schoolInfo">
		        <i class="fa fa-table" aria-hidden="true"></i>
		        <span slot="title">基础数据</span>
		      </el-menu-item>
		      <el-menu-item index="/questionManage/quesManage">
		        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
		        <span slot="title">问卷管理</span>
		      </el-menu-item>
		      <el-menu-item index="/surveyManage/sManage">
		        <i class="fa fa-cogs" aria-hidden="true"></i>
		        <span slot="title">课调管理</span>
		      </el-menu-item>
		      <el-menu-item index="/surveyStatis/allSurvey">
		        <i class="fa fa-bar-chart" aria-hidden="true"></i>
		        <span slot="title">课调统计</span>
		      </el-menu-item>
		      <el-menu-item index="/systemManage">
		        <i class="fa fa-cog" aria-hidden="true"></i>
		        <span slot="title">系统管理</span>
		      </el-menu-item>
		    </el-menu>
		  </el-col>
		  <el-col :span="21">
		  	<div class="heightDiv routerDiv">
		  		<router-view></router-view>
		  	</div>
		  </el-col>
		</el-row>
    </div>
    <div class="footerDiv">
    	<span>版权所有：web1801班级</span>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data () {
    return {
    }
  },
  mounted(){
  	// 可以修改路由
  	this.$router.push('/baseData/schoolInfo');
  	// 使用jquery选中节点
  	$('.heightDiv').height($(window).height()-60-30);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-menu{
		border-right:0;
		/*background:none;*/
		background:#e1e1e1;
	}
</style>
<style scoped lang="scss">
	.home{
		.headerDiv{
			height:60px;
			color:white;
			background:#4D8C7C;
			span{
				line-height:60px;
				margin-left:20px;
				font-size:20px;
			}
		}
		.contentDiv{
			.navDiv{
				background:#e1e1e1;
				// border-right:1px solid #e788e7;
			}
			.routerDiv{
				padding:10px;
			}
		}
		.footerDiv{
			background:#4D8C7C;
			color:white;
			text-align:center;
			position:absolute;
			bottom:0;
			width:100%;
			height:30px;
			span{
				line-height:30px;
			}
		}
	}
</style>









