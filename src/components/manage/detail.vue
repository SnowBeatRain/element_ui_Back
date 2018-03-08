<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage/detail' }">管理员详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
    <!-- <div v-for="(l,i) in tableData" :key="i">
        <p>{{l.data}}</p>
        <p>{{l.name}}</p>
        <p>{{l.address}}</p>        
    </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ]
      };
    },
    filters: {
    }
  };

</script>
<style scoped>


</style>
