import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/login',
  //   name: 'login',
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: '/index/index'
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: '登录NxAdmin',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/index',
    component: Layout,
    meta: { title: 'index', icon: '' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index'),
        meta: { title: '首页', icon: '' }
      }
    ]
  },
  // 用户
  {
    path: '/User',
    component: Layout,
    redirect: '/User/pointAccumulationMap',
    name: 'baidumap',
    meta: {
      title: '用户',
      icon: ''
    },
    children: [
      {
        path: 'student',
        name: 'student',
        component: () => import('@/views/User/student'),
        meta: { title: '学生', icon: '' }
      },
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import('@/views/User/teacher'),
        meta: { title: '老师', icon: '' }
      },
      {
        path: 'Enterprise personnel',
        name: 'Enterprise personnel',
        component: () => import('@/views/User/Enterprise personnel'),
        meta: { title: '企业人员', icon: '' }
      },
      {
        path: 'Invite to registe',
        name: 'Invite to registe',
        component: () => import('@/views/User/Invite to register'),
        meta: { title: '邀请注册', icon: '' }
      }
    ]
  },
  // 学校
  {
    path: '/colleges and universities',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '高校',
      icon: ''
    },
    children: [
      {
        path: 'school',
        name: 'school',
        component: () => import('@/views/school/colleges and universities'),
        meta: { title: '学校列表', icon: '' }
      },
      {
        path: 'School time',
        name: 'School time',
        component: () => import('@/views/school/School time'),
        meta: { title: '学校宣讲时间', icon: '' }
      }
    ]
  },
  // 企业
  {
    path: '/icons',
    component: Layout,
    redirect: '/icons/iconIndex',
    name: 'icons',
    meta: {
      title: '企业',
      icon: ''
    },
    children: [
      {
        path: 'Enterprise information',
        name: 'Enterprise information',
        component: () =>
          import('@/views/icons/svg-icons/Enterprise information'),
        meta: { title: '企业资料列表', icon: '' }
      },
      {
        path: 'Information on participation in the double election',
        name: 'Information on participation in the double election',
        component: () =>
          import(
            '@/views/icons/Information on participation in the double election/'
          ),
        meta: { title: '双选会参会资料', icon: '' }
      },
      {
        path: 'Position list',
        name: 'Position list',
        component: () => import('@/views/icons/Position list/'),
        meta: { title: '职位列表', icon: '' }
      }
    ]
  },

  {
    path: '/Order',
    component: Layout,
    redirect: '/Order/Appointment for college publicity',
    name: 'Order',
    meta: {
      title: '订单',
      icon: ''
    },
    children: [
      {
        path: 'Appointment for college publicity',
        name: 'Appointment for college publicity',
        component: () =>
          import('@/views/Order/Appointment for college publicity'),
        meta: { title: '高校宣讲预约' }
      },
      {
        path: 'member order',
        name: 'member order',
        component: () => import('@/views/Order/member order'),
        meta: { title: '会员订单' }
      },
      {
        path: 'Double selection order',
        name: 'Double selection order',
        component: () => import('@/views/Order/Double selection order'),
        meta: { title: '双选会订单' }
      },
      // {
      //   path: 'Mall order',
      //   name: 'Mall order',
      //   component: () => import('@/views/Order/Mall order'),
      //   meta: { title: '商城订单' }
      // },
      {
        path: 'Kong dollar  Order.',
        name: 'Kong dollar  Order.',
        component: () => import('@/views/Order/Kong dollar  Order'),
        meta: { title: '岗币订单' }
      }
    ]
  },
  // 表格
  {
    path: '/Tabs',
    component: Layout,
    redirect: 'Tabs',
    meta: { title: 'Tabs', icon: 'tab' },
    children: [
      {
        path: 'Tabs',
        name: 'Tabs',
        component: () => import('@/views/table/Tabs'),
        meta: { title: '签到', icon: '' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/form/BaseForm',
    name: 'form',
    meta: {
      title: '配置',
      icon: ''
    },
    children: [
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@/views/form/banner'),
        meta: { title: 'banner列表' }
      },
      {
        path: 'Upload',
        name: 'Upload',
        component: () => import('@/views/form/Upload'),
        meta: { title: '职场干货列表' }
      }
    ]
  },
  // 互动
  {
    path: '/HuDong',
    component: Layout,
    redirect: '/HuDong/Lecture room',
    name: 'HuDong',
    meta: {
      title: '互动',
      icon: ''
    },
    children: [
      {
        path: 'Lecture room query',
        name: 'Lecture room query',
        component: () => import('@/views/HuDong/Lecture room query'),
        meta: { title: '宣讲室查询' }
      },
      {
        path: 'Lecture room',
        name: 'Lecture room',
        component: () => import('@/views/HuDong/Lecture room'),
        meta: { title: '宣讲室列表' }
      },
      {
        path: 'Lecture room',
        name: 'Lecture room',
        component: () => import('@/views/HuDong/Lecture room'),
        meta: { title: '宣讲室占用列表添加' }
      },
      {
        path: 'Interview room',
        name: 'Interview room',
        component: () => import('@/views/HuDong/Interview room'),
        meta: { title: '面试室查询' }
      },
      {
        path: 'Agreement room',
        name: 'Agreement room',
        component: () => import('@/views/HuDong/Agreement room'),
        meta: { title: '协议室查询' }
      },
      {
        path: 'Entry show query',
        name: 'Entry show query',
        component: () => import('@/views/HuDong/Entry show query'),
        meta: { title: '入职秀查询' }
      },
      {
        path: 'Double election list',
        name: 'Double election list',
        component: () => import('@/views/HuDong/Double election list'),
        meta: { title: '双选会列表' }
      }
    ]
  },
  // 系统
  {
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'table',
    meta: {
      title: '系统',
      icon: ''
    },
    children: [
      {
        path: 'Upgrade',
        name: 'Upgrade',
        component: () => import('@/views/table/Upgrade'),
        meta: { title: '升级配置' }
      },
      // {
      //   path: 'complex-table',
      //   name: 'complex-table',
      //   component: () => import('@/views/table/complex-table'),
      //   meta: { title: '升级记录添加' }
      // },
      {
        path: 'position',
        name: 'position',
        component: () => import('@/views/table/tree-table/position'),
        meta: { title: '字典维护--职位' }
      },
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/table/tree-table/region'),
        meta: { title: '字典维护--区域' }
      },
      {
        path: 'industry',
        name: 'industry',
        component: () => import('@/views/table/tree-table/industry'),
        meta: { title: '字典维护--行业' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [{ path: '*', redirect: '/404', hidden: true }]
