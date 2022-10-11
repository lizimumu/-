<template>
  <div>
    <div class="top">
      <TopTitle :title="'人效排名（月度）'" />
      <RenXuan />
    </div>
    <div class="xuanze">
      <YingWei />
    </div>
    <div class="big">
      <div class="img"><img src="../../../assets/common/empty.png" alt=""></div>
      <div class="font"><span>暂无数据</span></div>
    </div>
  </div>
</template>

<script>
import TopTitle from './TopTitle.vue'
import YingWei from './YingWei.vue'
import RenXuan from './RenXuan.vue'
export default {
  components: {
    TopTitle, YingWei, RenXuan
  }
}
</script>

<style lang="scss" scoped>
.big{
    width: 373px;
    height: 527px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.xuanze{
  width: 177px;
  height: 34px;
  margin:15px 98px 0 98px;
}
.top{
  width: 373px;
  height: 32px;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .el-input__inner{
height: 34px;
}
</style>
