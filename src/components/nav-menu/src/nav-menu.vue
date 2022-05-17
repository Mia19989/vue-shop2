<template>
  <div class="nav-menu">
    <!-- 标题logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">后管</span>
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      active-text-color="#0a60bd"
      background-color="#0c2135"
      text-color="#b7bdc3"
      :collapse="collapse"
    >
      <!-- 使用原生temeplate -->
      <template v-for="item in usermenus" :key="item.id">
        <!-- 判断几级菜单 -->
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 遍历二级菜单可展开的标题 item.name -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="handleIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- type=1 有子菜单栏 遍历children -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <el-icon v-if="subitem.icon">
                  <component :is="handleIcon(subitem.icon)"></component>
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- 一级菜单 没有子菜单 直接展示item.name -->
        <template v-else>
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon">
              <component :is="handleIcon(item.icon)"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import useHandleIcon from '@/hooks/useIcon'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    // 菜单是否折叠
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 使用自己封装的useStore
    const store = useStore()
    // 使用计算属性 动态数据
    const usermenus = computed(() => store.state.login.userMenus)
    const handleIcon = useHandleIcon()
    const router = useRouter()
    const route = useRoute()

    const menu = pathMapToMenu(route.path, usermenus.value)
    // 注意转成字符串类型
    const defaultValue = ref(menu.id + '')
    // 点击跳转页面
    const handleMenuItemClick = (item: any) => {
      // 路由切换
      router.push({
        path: item.url ?? '/not-found'
      })
      // console.log(item)
    }
    return {
      usermenus,
      handleIcon,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      color: white;
      font-size: 16px;
      font-weight: 700;
    }
  }

  .el-menu {
    border-right: none;
  }
  // 目录
  // 二级菜单
  .el-sub-menu {
    background-color: #001529 !important;
    color: #fff !important;

    .el-menu-item {
      background-color: #0c2135 !important;
      padding-left: 50px;
      color: #fff;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
