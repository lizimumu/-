<template>

  <div id="main3" />
</template>

<script>
import * as echarts from 'echarts'
import { getPointTop5API } from '@/api/home'
export default {
  data() {
    return {
      data: []
    }
  },
  created() {

  },
  mounted() {
    this.getECharts()
  },
  methods: {
    async getECharts() {
      const { data } = await getPointTop5API()
      this.data = data

      var chartDom = document.getElementById('main3')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'item',
          formatter: function(value) {
            console.log(value)
            return `${value.name} <br>
总占比：${value.percent}%`
          },
          borderColor: 'transparent'

        },
        // 注意颜色写的位置
        color: [
          '#85a7ff',
          '#99ebbd',
          '#ffb18b',
          '#ff9f7f',
          '#c6ebff',
          '#becce6'

        ],

        series: [
          {
            name: '',
            type: 'pie',
            // 如果radius是百分比则必须加引号
            radius: ['30%', '90%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            data: this.data,

            labelLine: {
              normal: {
                lineStyle: {
                  color: '#acacac'
                }
              }
            },

            itemStyle: {

              normal: {
                label: {

                  color: '#333333',
                  show: true,
                  //                   formatter: function(value) {
                  //                     return `${value.name}
                  // ${value.percent}%`
                  //                   },bb
                  formatter: `{b|{b}}\n{d}%`,
                  rich: {
                    b: {
                      fontWeight: 700
                    }
                  }
                }

              }
            }
          }
        ]
      }

      option && myChart.setOption(option)
      window.addEventListener('resize', myChart.resize)
    }

  }
}
</script>

<style scoped>
#main3{
  padding: 0 20px;
  width: 530px;
  height: 230px;
}
</style>
