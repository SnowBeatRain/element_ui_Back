import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)
// 路由页面导入
import login from '@/components/Login.vue'
import home from '@/components/Home.vue'
import error from '@/components/404.vue'  //404错误
// import manage from '@/components/manage/manage.vue'
var manage = resolve => require(['@/components/manage/manage.vue'], resolve)
var detail = resolve => require(['../components/manage/detail.vue'], resolve)

var role = resolve => require(['@/components/role/role.vue'], resolve)
var roleLimit = resolve => require(['@/components/role/roleLimit.vue'], resolve)
var power = resolve => require(['../components/role/power.vue'], resolve)

var B_GetBannerList = resolve => require(['@/components/banner/B_GetBannerList.vue'], resolve)
var P_GetProductList = resolve => require(['@/components/productList/P_GetProductList.vue'], resolve)
var productEdit = resolve => require(['@/components/productList/productEdit.vue'], resolve)
// 懒加载方式，当路由被访问的时候才加载对应组件

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/',
      name: '首页',
      component: home,
      children: [
        // 404
        { path: '/error', component: error, name: '404页' },
        // manage
        { path: '/manage', component: manage, name: '管理员管理', },
        { path: '/manage/detail', component: detail, name: '管理员详情' },
        // role
        { path: '/role', component: role, name: '角色管理' },
        { path: '/power', component: power, name: '角色管理' },
        { path: '/role/rolelimit/:id', component: roleLimit, name: '权限管理' },
        // banner
        { path: '/B_GetBannerList', component: B_GetBannerList, name: 'Banner管理' },
        // productList
        { path: '/P_GetProductList', component: P_GetProductList, name: '商品列表' },
        { path: '/P_GetProductList/productEdit/:id', component: productEdit, name: '商品编辑' },


      ]
    },
  ]
})
