<template>
  <div>
    <div class="renyuan">
      <div v-for="(item,index) in renyuanList" :key="index" :class="{bgcolor: index===ind}" @click="changeIndex(index)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renyuanList: ['运营人员', '运维人员'],
      ind: 0
    }
  },
  methods: {
    changeIndex(a) {
      this.ind = a
    }
  }
}
</script>

<style lang="scss" scoped>
.bgcolor{
  width: 78px;
  height: 25px;
  line-height: 25px;
  text-align: center;
    background: #fff !important;
     border-radius: 7px;
     -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
     font-weight: 600;
     color:black !important;
}
.renyuan{
      display: flex;
      width: 177px;
      height: 34px;
      line-height: 34px;
      justify-content: space-evenly;
      align-items: center;
      background-color: #f7fbff;
      cursor: pointer;
      .item{
    color: #9ca3b4;
        padding: 0 5px;
        text-align: center;
        width: 38px;
        background-color: transparent;
      }
    }
</style>
