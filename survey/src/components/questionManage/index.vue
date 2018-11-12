<!-- 问卷管理页面 -->
<template>
  <div class="questionManage">
    <el-tabs v-model="questionManageActive" type="card" @tab-click="questionHandleClick">
	    <el-tab-pane label="题库管理" name="quesManage"></el-tab-pane>
	    <el-tab-pane label="问卷管理" name="naireManage"></el-tab-pane>
	</el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
     	questionManageActive:'quesManage'
    }
  },
  mounted(){
    /*let vm = this;
    setTimeout(function(){
      vm.$router.push('/questionManage/quesManage');
    },100)*/
  },
  methods:{
  	questionHandleClick(tab,event){
  		this.$router.push('/questionManage/'+tab.name);
  	}
  }
}
</script>
<style scoped>
  
</style>








