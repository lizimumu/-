<template>
  <!-- 顶部标题区域 -->
  <div class="title">
    <span class="name">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
    .name{
        font-size: 16px;
        color:#333;
        font-weight: 600;
        margin-right: 10px;
    }
    .sub-title{
       font-size: 12px;
       color:#999;
    }

}
</style>
