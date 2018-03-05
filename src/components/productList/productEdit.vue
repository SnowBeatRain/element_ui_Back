<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
      <el-breadcrumb-item :to="{ path: '/' }">黄晓明后台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/P_GetProductList' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    }
  };

</script>
<style scoped>


</style>
