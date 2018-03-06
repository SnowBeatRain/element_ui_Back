<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
      <el-breadcrumb-item :to="{ path: '/' }">黄晓明后台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage' }">订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--检索条-->
    <el-col class="toolbar" style="padding-top: 15px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="关键字">
          <el-input v-model="filters.keyword" placeholder="关键字"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="filters.StTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">~</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束时间" v-model="filters.EndTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="发货状态">
          <el-select v-model="filters.Type" placeholder="发货状态">
            <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- table 内容 -->
    <el-table :data="orderList" style="width: 100%" :border='true'>
      <el-table-column label="订单号" prop="Name">
      </el-table-column>
      <el-table-column label="创建时间" prop="Image">
      </el-table-column>
      <el-table-column label="商品描述" prop="Price">
      </el-table-column>
      <el-table-column label="用户名" prop="Price">
      </el-table-column>
      <el-table-column label="联系方式" prop="Price">
      </el-table-column>
      <el-table-column label="订单状态" prop="Price">
      </el-table-column>
      <el-table-column label="实付款（元）" prop="Stock">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next,jumper" :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import md5 from "js-md5";

  export default {
    data() {
      return {
        orderList: [], //列表
        pageIndex: 1,
        pageSize: 10,
        pageCount: 1,
        mainurl: "",
        roleList: [], //管理员角色列表
        // 搜索关键字
        filters: {
          keyword: "",
          StTime: '2018-01-01',
          EndTime: '',
          Type: 0
        },
        typeList: [{
            name: "全部",
            value: 0
          },
          {
            name: "待发货",
            value: 1
          },
          {
            name: "待收货",
            value: 2
          }
        ],
        //编辑界面是否显示
        editFormVisible: false,
        editLoading: false,

        //编辑界面数据
        editForm: {
          company: "",
          Role: "",
          RoleID: "",
          Password: ""
        },
        editFormRules: {
          Name: [{
            required: true,
            message: "请输入账户",
            trigger: "blur"
          }],
          Password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }]
        },
        //发货界面是否显示
        sendFormVisible: false,
        sendLoading: false,
        sendFormRules: {
          Name: [{
            required: true,
            message: "请输入账户",
            trigger: "blur"
          }],
          Password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }]
        },
        //新增界面数据
        sendForm: {
          IsLock: false,
          Name: "",
          RoleID: "",
          Password: ""
        }
      };
    },
    methods: {
      /*
           1、获取列表 渲染列表
           2、搜索关键字
           3、分页
        */
      getInfo() {
        this.$http
          .post("/hxmback/api/Back/O_GetOrderList", {
            Token: getCookie("token"),
            PageIndex: this.pageIndex,
            PageSize: this.pageSize,
            Keyword: this.filters.keyword == "" ? "-1" : this.filters.keyword,
            Type: this.filters.Type,
            StTime: this.filters.StTime,
            EndTime: this.filters.EndTime == "" ? "-1" : this.filters.EndTime,
          })
          .then(
            function (response) {
              var status = response.data.Status;
              if (status === 1) {
                this.orderList = response.data.Result.List;
                this.pageCount = response.data.Result.Page;
              } else if (status === 40001) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  tt.$router.push({
                    path: "/login"
                  });
                }, 1500);
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      //关键字搜索
      getUsers() {
        this.getInfo();
        // console.log(this.filters)
      },
      // 分页
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getInfo();
      },
      /*
          1、添加编辑时获取角色列表，渲染下拉菜单
          2、点击管理员列表的编辑，弹出模态框
          3、点击新增管理严，弹出模态框
          4、保存修改
          5、保存添加
        */
      getRoleList() {
        // 获取角色列表
        this.$http
          .get("/hxmback/api/Role/GetRoles", {
            params: {
              PageIndex: 1,
              PageSize: 999
            }
          })
          .then(
            function (response) {
              var status = response.data.Status;
              if (status === 1) {
                this.roleList = response.data.Result.data;
              } else if (status === 40001) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  tt.$router.push({
                    path: "/login"
                  });
                }, 1500);
              }
            }.bind(this)
          )
          // 请求error
          .catch(
            function (error) {
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      },
      handleEdit(index, row) {
        console.log(Object.assign({}, row));
        var obj = Object.assign({}, row);
        var urlId = obj.ID;
        this.$router.push("/P_GetProductList/productEdit/id=" + urlId);
      },
      handleDelete(index, row) {
        var obj = Object.assign({}, row);
        this.$confirm("确认删除吗？", "提示", {}).then(() => {
          this.$http
            .get("/hxmback/api/Back/P_ProductDel", {
              params: {
                token: getCookie("token"),
                id: obj.ID
              }
            })
            .then(
              function (response) {
                var status = response.data.Status;
                if (status === 1) {
                  this.getInfo();
                } else if (status === 40001) {
                  this.$message({
                    showClose: true,
                    type: "warning",
                    message: response.data.Result
                  });
                  setTimeout(() => {
                    tt.$router.push({
                      path: "/login"
                    });
                  }, 1500);
                }
              }.bind(this)
            )
            // 请求error
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "错误：请检查网络"
                });
              }.bind(this)
            );
        });
      },
      handleAdd() {
        this.$router.push("/P_GetProductList/productAdd");
      },
      editSubmit() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            //判断是否填写完整  --true
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
              var para = Object.assign({}, this.editForm);
              if (para.Password.length > 20) {} else {
                para.Password = md5(para.Password);
              }
              // 将token传入参数中
              para.Token = getCookie("token");
              // 发保存请求
              this.$http
                .get("/hxmback/api/Admin/Edit", {
                  params: para
                })
                .then(
                  function (response) {
                    this.editLoading = false;
                    var status = response.data.Status;
                    if (status === 1) {
                      // 表单重置
                      this.$refs["editForm"].resetFields();
                      this.editFormVisible = false;
                      this.getInfo();
                    } else if (status === 40001) {
                      this.$message({
                        showClose: true,
                        type: "warning",
                        message: response.data.Result
                      });
                      setTimeout(() => {
                        tt.$router.push({
                          path: "/login"
                        });
                      }, 1500);
                    } else {
                      this.$message({
                        showClose: true,
                        type: "warning",
                        message: response.data.Result
                      });
                    }
                  }.bind(this)
                )
                // 请求error
                .catch(
                  function (error) {
                    this.$notify.error({
                      title: "错误",
                      message: "错误：请检查网络"
                    });
                  }.bind(this)
                );
            });
          }
        });
      },
      addSubmit() {
        this.$refs.sendForm.validate(valid => {
          if (valid) {
            //判断是否填写完整  --true
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.sendLoading = true;
              //NProgress.start();
              var para = Object.assign({}, this.sendForm);
              if (para.Password.length > 20) {} else {
                para.Password = md5(para.Password);
              }
              // 将token传入参数中
              para.Token = getCookie("token");
              // 发保存请求
              this.$http
                .get("/hxmback/api/Admin/Add", {
                  params: para
                })
                .then(
                  function (response) {
                    this.sendLoading = false;
                    var status = response.data.Status;
                    if (status === 1) {
                      // 表单重置
                      this.$refs["sendForm"].resetFields();
                      this.sendFormVisible = false;
                      this.getInfo();
                    } else if (status === 40001) {
                      this.$message({
                        showClose: true,
                        type: "warning",
                        message: response.data.Result
                      });
                      setTimeout(() => {
                        tt.$router.push({
                          path: "/login"
                        });
                      }, 1500);
                    } else {
                      this.$message({
                        showClose: true,
                        type: "warning",
                        message: response.data.Result
                      });
                    }
                  }.bind(this)
                )
                // 请求error
                .catch(
                  function (error) {
                    this.$notify.error({
                      title: "错误",
                      message: "错误：请检查网络"
                    });
                  }.bind(this)
                );
            });
          }
        });
      }
    },
    mounted() {
      this.mainurl = mainurl;
      this.getInfo();
    }
  };

</script>
<style scoped>
  /* 面包屑 */

  .crumb {
    height: 36px;
    line-height: 36px;
  }

  .block {
    text-align: center;
    padding: 20px 0;
  }

</style>
