<template>
  <div id="main2" />
</template>

<script>
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import { getSalesDistriButionAPI, getCurrentWeek } from '@/api/home'
export default {
  data() {
    return {
      data: {},
      month: {
        start_time: dayjs().startOf('month').format('YYYY-MM-DD'),
        end_time: dayjs(new Date()).format('YYYY-MM-DD')
      },
      year: {
        start_time: dayjs().startOf('year').format('YYYY-MM-DD'),
        end_time: dayjs(new Date()).format('YYYY-MM-DD')
      },
      time: getCurrentWeek()
    }
  },
  created() {

  },
  mounted() {
    this.getSalesDistriBution(0)
  },
  methods: {
    async getSalesDistriBution(index) {
      if (index === 0) {
        this.time = getCurrentWeek()
      }
      if (index === 1) {
        this.time = this.month
      }
      if (index === 2) {
        this.time = this.year
        console.log(this.year)
      }
      try {
        const { data } = await getSalesDistriButionAPI(this.time.start_time, this.time.end_time)
        this.data = data
      } catch (e) {
        console.log(e)
      }
      var chartDom = document.getElementById('main2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {

            label: {
              color: '#8c8c8c',
              backgroundColor: '#ffff'

            }
          },
          formatter: function(data) {
            let text = ''
            for (let i = 0; i < data.length; i++) {
              text += '销售额' + ':' + data[i].value + '<br>' + data[0].name + '<br>'
            }
            return text
          }
        },
        title: {
          show: true,
          text: '销售额趋势图',
          left: 'center',
          top: 5,
          textStyle: {
            color: '#000',
            fontSize: 14
          }
        },
        xAxis: {

          type: 'category',
          data: this.data.xAxis,
          axisLine: {
            show: true,
            // 设置坐标轴颜色
            lineStyle: {
              color: '#b5b5b5'
            }
          },
          axisLabel: {
            formatter: function(value) {
              if (value.length > 2) {
                return `${value.slice(0, 3)}\n...`
              }
              return value
            }
          }

        },
        grid: {
          left: '100px'
        },
        yAxis: {
          type: 'value',
          name: '单位：元',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#b5b5b5' // 分割线颜色
            }
          }

        },
        series: [
          {
            data: this.data.series,
            type: 'bar',
            name: '销售额',
            barWidth: '20',
            itemStyle: {
              normal: {
                color: '#91b0ff',
                // 这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
                barBorderRadius: [5, 5, 0, 0]
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
#main2{

  width: 110%;
  height: 320px;
}
</style>
