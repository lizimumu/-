<template>
  <div>
    <div class="block">
      <el-date-picker
        v-model="value"
        size="mini"
        type="daterange"
        :picker-options="optionsDisable"
        range-separator="~"
        start-placeholder="起始日期"
        end-placeholder="结束日期"
        :clearable="false"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    start: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: [],
      optionsDisable: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      startTime: '',
      endTime: dayjs(new Date()).format('YYYY-MM-DD')
    }
  },
  watch: {
    start: {
      handler(newVal) {
        console.log(newVal)
        if (newVal !== '') {
          this.startTime = newVal
        } else {
          this.startTime = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
          console.log(this.startTime)
        }
      },
      immediate: true
    }
  },
  created() {
    console.log(this.startTime)
    this.value[0] = this.startTime
    this.value[1] = this.endTime
  }
}
</script>

<style>

</style>
