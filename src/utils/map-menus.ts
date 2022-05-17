import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

// 默认/main 加载的是第一个菜单页面
let firstMenu: any = null

// import
// 从菜单 -> 路由
export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // webpack 递归查找符合.ts结尾的文件 -> routeFiles数组
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // routeFiles中的每个文件路径 -> 路由
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    // ./analysis/dashboard/dashboard.ts 切割后 -> /analysis/dashboard/dashboard
    const route = require('../router/main' + key.split('.')[1])
    // console.log(route.default)
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.再根据菜单获取需要添加的routes
  // userMenus：
  // type === 1 -> 查找children
  // type === 2 -> 看allRoutes中的path === 菜单中的url
  const recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1) {
        recurseGetRoute(menu.children)
      } else {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          // console.log(route)
          routes.push(route)
        }
        // 记录第一个菜单页面
        if (!firstMenu) {
          firstMenu = menu
        }
      }
    }
  }

  recurseGetRoute(userMenus)
  return routes
}

// 面包屑导航数据
export function pathMapBreadcrumbs(currentPath: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(currentPath, userMenus, breadcrumbs)
  return breadcrumbs
}

// 路径到菜单的映射 找到与当前路径相匹配的菜单页面
export function pathMapToMenu(
  currentPath: string,
  userMenus: any[],
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 可展开菜单栏 递归其子菜单栏
      const findMenu = pathMapToMenu(currentPath, menu.children)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
