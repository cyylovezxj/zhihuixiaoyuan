<!-- 课调统计页面 -->
<template>
  <div class="surveyStatis">
    <el-tabs v-model="surveyStatisActive" type="card" @tab-click="surveySHandleClick">
	    <el-tab-pane label="全部课调" name="allSurvey"></el-tab-pane>
	    <el-tab-pane label="班级课调统计" name="clazzSurvey"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
    	surveyStatisActive:'allSurvey'
    }
  },
  mounted(){
    /*let vm = this;
    setTimeout(function(){
      vm.$router.push('/surveyStatis/allSurvey');
    },100)*/
  },
  methods:{
  	surveySHandleClick(tab,event){
  		this.$router.push('/surveyStatis/'+tab.name);
  	}
  }
}
</script>
<style scoped>

</style>
