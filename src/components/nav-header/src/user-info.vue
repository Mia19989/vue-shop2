<template>
  <div class="user-info">
    <div>
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><CircleClose /></el-icon>
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item divided>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    // 返回登录用户的name
    const name = computed(() => store.state.login.userInfo.name)
    return {
      store,
      name
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  align-items: center;

  .el-dropdown-link {
    padding: 0 0 0 5px;
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
