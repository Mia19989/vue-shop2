<template>
  <div class="nav-header">
    <el-icon @click="handleFold" class="fold-menu">
      <component :is="isFold ? 'ArrowRightBold' : 'ArrowLeftBold'"></component>
    </el-icon>

    <div class="content">
      <div>
        <!-- 面包屑导航 -->
        <hcc-breadcrumb :breadcrumbs="breadcrumbs"></hcc-breadcrumb>
      </div>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import UserInfo from './user-info.vue'
import HccBreadcrumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    HccBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 处理面包屑数据
    const route = useRoute()
    const store = useStore()
    const breadcrumbs = computed(() => {
      // 所有的菜单信息
      const userMenus = store.state.login.userMenus
      // 现在的路径
      const currentPath = route.path
      return pathMapBreadcrumbs(currentPath, userMenus)
    })

    return {
      isFold,
      breadcrumbs,
      handleFold
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;

  .fold-menu {
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
