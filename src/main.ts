import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store/index'
// import hccRequest from './service'
import { globalRegister } from '@/global'
import {
  ElButton,
  ElBadge,
  ElCard,
  ElMessage,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElRadio,
  ElCheckbox,
  ElRow,
  ElCol,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElAvatar,
  ElDropdownMenu,
  ElDropdownItem,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElLink,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElPopover,
  ElTag,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.css'
// 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = [
  ElButton,
  ElBadge,
  ElCard,
  ElMessage,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElRadio,
  ElCheckbox,
  ElRow,
  ElCol,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElAvatar,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElLink,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElPopover,
  ElTag,
  ElDescriptions,
  ElDescriptionsItem
]

const app = createApp(App)
for (const component of components) {
  // @ts-ignore
  app.component(component.name, component)
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载到app实例上
// 消息提示
// app.config.globalProperties.$message = ElMessage
// 消息弹出框
// app.config.globalProperties.$confirm = ElMessageBox.confirm

// 定义模块 功能是：ts代码提示
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $message: IMessage
//   }
// }

app.use(globalRegister)
// 先动态路由注册setupStore 再路由匹配
app.use(store)
setupStore()
app.use(router)
app.mount('#app')

// 定义想要request到的数据的类型
// 泛型接口
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// 直接在request里 返回请求的数据
// hccRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
//   .catch((err) => {
//     console.log('请求数据失败')
//     console.log(err)
//   })

// hccRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestinterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseinterceptor: (res) => {
//       console.log('单独响应的res')
//       return res
//     }
//   }
// })
