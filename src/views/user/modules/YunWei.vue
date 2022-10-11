<template>
  <div>
    <!-- 销售额统计 -->
    <div class="gongdan">
      <div class="num">
        {{ countNum }}
      </div>
      <div class="total">
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countNum: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.gongdan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 107px;
    // background-color: bisque;
    .num{
        width: 84px;
        height: 50px;
        font-size: 36px;
        font-weight: 600;
        color: #FF5757;
    }
    .total{
        width: 84px;
        height: 17px;
        font-size:12px;
        color:#DE9690;
    }
}
</style>
