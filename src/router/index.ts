import { createRouter, createWebHashHistory } from 'vue-router'
// 声明导入的是 RouteRecordRaw类型
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    // 添加name属性 方便后续动态添加子路由的操作
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    // 要跳转的页面不是登录页 判断是否有token
    const token = localCache.getCache('token')
    if (!token) {
      // token不存在 跳转到登录页
      router.push('/login')
    }
  }
  if (to.path === '/main') {
    // 跳转到 第一个菜单页面
    router.push(firstMenu.url)
  }
})

export default router
