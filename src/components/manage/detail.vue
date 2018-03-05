<template>
       <div>
           <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage/detail' }">管理员详情</el-breadcrumb-item>
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