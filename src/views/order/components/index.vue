<template>
  <div class="order_container">

    <!-- 表格区域 -->
    <form-table />
  </div>
</template>

<script>

import FormTable from './FormTable'
export default {
  components: {
    FormTable
  }
}
</script >

<style scoped lang="scss">

.order_container {

  padding: 0 20px;
}

</style>
