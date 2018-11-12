<!-- 系统管理页面 -->
<template>
  <div class="systemManage">
    systemManage
    <div id="container" style="height:400px"></div>
  </div>
</template>

<script>
import $ from 'jquery';
import Highcharts from 'highcharts';
export default {
  data(){
    return {}
  },
  mounted(){
  	this.toDraw();
  },
  methods:{
  	toDraw(){
  		var chart = Highcharts.chart('container', {
			title: {
				text: '2010 ~ 2016'
			},
			subtitle: {
				text: ''
			},
			yAxis: {
				title: {
					text: ''
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top'
			},
			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					pointStart: 2010
				}
			},
			series: [{
				name: '1',
				data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
			}, {
				name: '2',
				data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
			}, {
				name: '3',
				data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
			}],
			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}
		});
  	}
  }
}
</script>

<style scoped>

</style>
