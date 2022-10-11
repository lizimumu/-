<template>
  <div>
    <div class="yunying">
      <TopTitle :title="'运营人员（当天）'" :start="start" :end="end" />
      <div class="num">
        <YunYing :name="'工单总数（个）'" :num="+yunying.total" />
        <YunYing :name="'完成工单（个）'" :num="+yunying.completedTotal" />
        <YunYing :name="'拒绝工单（个）'" :num="+yunying.cancelTotal" />
        <YunYing :name="'运营人员数（个）'" :num="+yunying.workerCount" />
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '../modules/TopTitle.vue'
import YunYing from '../modules/YunYing.vue'
export default {
  components: {
    TopTitle, YunYing
  },
  props: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    },
    yunying: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      num: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.yunying{
    width: 846px;
    height: 166px;
    padding: 20px;
    border-radius: 20px;
    background-color: #e9f3ff;
    background-image: url('../../../assets/common/circle.png'),url('../../../assets/common/car.png');
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
    .num {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>
