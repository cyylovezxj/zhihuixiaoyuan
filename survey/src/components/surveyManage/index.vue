<!-- 课调管理页面 -->
<template>
  <div class="surveyManage">
    <el-tabs v-model="surveyManageActive" type="card" @tab-click="surveyHandleClick">
	    <el-tab-pane label="课调管理" name="sManage"></el-tab-pane>
	    <el-tab-pane label="课调监控" name="sMonitor"></el-tab-pane>
	    <el-tab-pane label="课调审核" name="sCheck"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
    	surveyManageActive:'sManage'
    }
  },
  mounted(){
    /*let vm = this;
    setTimeout(function(){
      vm.$router.push('/surveyManage/sManage');
    },100)*/
  },
  methods:{
  	surveyHandleClick(tab,event){
  		this.$router.push('/surveyManage/'+tab.name);
  	}
  }
}
</script>

<style scoped>

</style>
