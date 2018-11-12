<!-- 学校信息页面 -->
<template>
  <div class="schoolInfo">
		<table>
			<tr @click="show=false" v-for="(item,index) in tableArr">
				<td>{{item.name}}</td>
				<td>
					<span v-if="show">{{schoolInfo[item.prop]}}</span>
					<el-input size="mini" v-else v-model="form[item.prop]" placeholder="请输入内容"></el-input>
				</td>
			</tr>
		</table>
		<div class="optionDiv">
			<el-button type="success" size="mini" @click="save">保存</el-button>
		</div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  data(){
    return {
    	show:true,
     	tableArr:[{
     		name:"校园名称",
     		prop:'name'
     	},{
     		name:"校园介绍",
     		prop:'description'
     	},{
     		name:"校园地址",
     		prop:'address'
     	},{
     		name:"校园电话",
     		prop:'telephone'
     	},{
     		name:"版权信息",
     		prop:'copyright'
     	}],
     	form:{},
    }
  },
  created(){
  	this.findAllSchoolInfo({id:3}).then((data)=>{
  		// data-->schoolInfo
  		console.log(data,'---');
  		this.form = {
  			id:data.id,
  			name:data.name,
  			description:data.description,
  			address:data.address,
  			telephone:data.telephone,
  			copyright:data.copyright,
  		};
  	});
  },
  computed:{
  	...mapGetters(['schoolInfo'])
  },
  methods:{
  	save(){
  		this.saveOneSchoolInfo(this.form).then((data)=>{
  			if(data.stauts==200){
  				this.$notify({
	          title: '成功',
	          message: '保存成功',
	          type: 'success'
	        });
	        this.show = true;
	        this.findAllSchoolInfo({id:3});
  			}else{
  				this.$notify({
	          title: '失败',
	          message: '保存失败',
	          type: 'error'
	        });
  			}
  		}).catch((error)=>{
				this.$notify({
          title: '失败',
          message: '保存失败',
          type: 'error'
        });
  		});
  	},
  	...mapActions(['findAllSchoolInfo','saveOneSchoolInfo'])
  }
}
</script>
<style scoped lang="scss">
  .schoolInfo{
  	table{
  		border-collapse:collapse;
  		width:100%;
  	}
		table td{
			border:1px solid #777777;
  	}
  	table td:first-child{
  		width:30%;
  		text-align:center;
  	}
		table td:last-child{
  		padding-left:5px;
  	}
  	.optionDiv{
			text-align:right;
			margin-top:10px;
 		}
  }







</style>