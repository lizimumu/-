<template>
  <div>
    <div class="yunying">
      <TopTitle :title="'运维人员（当天）'" :start="start" :end="end" />
      <div class="num">
        <YunWei :title="'工单总数（个）'" :count-num="+yunwei.total" />
        <YunWei :title="'完成工单（个）'" :count-num="+yunwei.completedTotal" />
        <YunWei :title="'拒绝工单（个）'" :count-num="+yunwei.cancelTotal" />
        <YunWei :title="'运维人员数（个）'" :count-num="+yunwei.workerCount" />
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '../modules/TopTitle.vue'
import YunWei from '../modules/YunWei.vue'
export default {
  components: {
    TopTitle, YunWei
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
    yunwei: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      countNum: ''
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
    background-color: #fbefe8;
    // background: #fbefe8 url('../../../assets/common/operation.png') no-repeat calc(100% - 12px) 100%;
    background-position: 0 0,calc(100% - 12px) 100%;
    background-image:  url('../../../assets/common/operation.png');
    background-repeat: no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
    .num {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>
