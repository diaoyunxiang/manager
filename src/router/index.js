import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/data',
    name: 'data',
    meta: {
      title: 'data',
      icon: 'el-icon-pie-chart'
    },
    children: [
      {
        path: 'data',
        component: () => import('@/views/data/index'),
        name: 'data',
        meta: { title: '数据概况' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    name: 'users',
    meta: {
      title: 'users',
      icon: 'peoples'
    },
    children: [
      {
        path: 'users',
        component: () => import('@/views/users/index'),
        name: 'users',
        meta: { title: '用户信息管理' }
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    name: 'products',
    meta: {
      title: 'products',
      icon: 'component'
    },
    children: [
      {
        path: 'products',
        component: () => import('@/views/products/index'),
        name: 'products',
        meta: { title: '商品信息管理' }
      }
    ]
  },
  {
    path: '/sort',
    component: Layout,
    name: 'sort',
    meta: {
      title: 'sort',
      icon: 'list'
    },
    children: [
      {
        path: 'sort',
        component: () => import('@/views/sort/index'),
        name: 'sort',
        meta: { title: '商品分类管理' }
      }
    ]
  },
  {
    path: '/bill',
    component: Layout,
    name: 'bill',
    meta: {
      title: 'bill',
      icon: 'documentation'
    },
    children: [
      {
        path: 'bill',
        component: () => import('@/views/bill/index'),
        name: 'bill',
        meta: { title: '订单信息管理' }
      }
    ]
  },
  {
    path: '/ad',
    component: Layout,
    name: 'ad',
    meta: {
      title: 'ad',
      icon: 'money'
    },
    children: [
      {
        path: 'ad',
        component: () => import('@/views/ad/index.vue'),
        name: 'ad',
        meta: { title: '广告投放管理' }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
