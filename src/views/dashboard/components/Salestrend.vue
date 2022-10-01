<template>
  <!-- <div id="main" /> -->

  <el-col id="main" :span="24" />

</template>

<script>
import * as echarts from 'echarts'
import { getSellInfo, getCurrentWeek } from '@/api/home'
import dayjs from 'dayjs'
export default {
  name: 'Kkk',

  data() {
    return {
      num: 1,
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
  mounted() {
    this.getSell(0)
  },
  methods: {
    async getSell(index) {
      if (index === 0) {
        const date = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        try {
          const { data } = await getSellInfo(this.num, this.time.start_time, this.time.end_time)
          console.log(data)
          this.data.xAxis = date.splice(0, data.xAxis.length)
          this.data.series = data.series
        } catch (e) {
          console.log(e)
        }
      }
      if (index === 1) {
        this.time = {
          start_time: '2022-09-01',
          end_time: '2022-09-30'
        }
        const date = ['9月1日', '9月6日', '9月11日', '9月6日', '9月21日', '9月26日']
        try {
          const { data } = await getSellInfo(this.num, this.time.start_time, this.time.end_time)
          console.log(data)
          this.data.xAxis = date
          this.data.series = data.series
        } catch (e) {
          console.log(e)
        }
      }
      if (index === 2) {
        this.time = {
          start_time: '2022-01-01',
          end_time: '2022-10-05'
        }
        this.num = 2
        const date = ['2022年1月', '', '', '2022年4月', '', '', '2022年7月', '', '', '2022年10月']
        try {
          const { data } = await getSellInfo(this.num, this.time.start_time, this.time.end_time)
          console.log(data)
          this.data.xAxis = date
          this.data.series = data.series
        } catch (e) {
          console.log(e)
        }
      }
      // this.data = date.splice(0, this.x.length)
      const myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {

              type: 'sold'
            }
          },
          formatter: function(data) {
            let text = ''
            for (let i = 0; i < data.length; i++) {
              text += '销售额' + ':' + '&nbsp;' + data[i].value + '<br>' + data[0].name + '<br>'
            }
            return text
          }
        },
        color: ['#ff5757'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0
          },
          data: this.data.xAxis,
          axisLine: {
            lineStyle: {
              color: '#b5b5b5'
            },
            axisLabel: {
              color: '#999999'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位：元',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#b5b5b5' // 分割线颜色
            }
          },
          nameTextStyle: {
            color: '#9d9d9d'
          },
          axisLabel: {
            color: '#9d9d9d'
          }
        },
        series: [
          {
            name: '销售额',
            data: this.data.series,
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 2
            },
            areaStyle: {
              normal: {

                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#fecbcb' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ],
        grid: {
          left: '18%',
          bottom: '8%',
          right: '5%'
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
        }
      })
      window.onresize = function() {
        myChart.resize()
      }
    }
  }

}
</script>

<style scoped>

</style>
