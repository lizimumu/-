<template>
  <div>
    <div class="gongdan">
      <div class="num">
        {{ num }}
      </div>
      <div class="total">
        <span>{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    num: {
      type: Number,
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
    .num{
        width: 84px;
        height: 50px;
        font-size: 36px;
        font-weight: 600;
        color: #072074;
    }
    .total{
        width: 84px;
        height: 17px;
        font-size:12px;
        color:#91A7D7;
    }
}
</style>
