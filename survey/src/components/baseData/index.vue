<!-- 基础数据页面 -->
<template>
  <div class="baseData">
    <el-tabs v-model="baseDataActive" type="card" @tab-click="baseHandleClick">
	    <el-tab-pane label="校园信息" name="schoolInfo"></el-tab-pane>
	    <el-tab-pane label="年级管理" name="gradeManage"></el-tab-pane>
	    <el-tab-pane label="班级管理" name="clazzManage"></el-tab-pane>
	    <el-tab-pane label="课程管理" name="courseManage"></el-tab-pane>
	    <el-tab-pane label="教师管理" name="teacherManage"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
    	baseDataActive:'schoolInfo'
    }
  },
  mounted(){
    /*let vm = this;
    setTimeout(function(){
      vm.$router.push('/baseData/schoolInfo');
    },500)*/
  },
  methods:{
  	baseHandleClick(tab,event){
  		this.$router.push('/baseData/'+tab.name);
  	}
  }
}
</script>

<style scoped>

</style>
