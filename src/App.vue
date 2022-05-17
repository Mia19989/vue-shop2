<template>
  <div class="app">
    <!-- <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link> -->
    <!-- 全局配置国际化 -> 中文 -->
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',

  components: {
    ElConfigProvider
  },

  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }

.app {
  height: 100%;
}
</style>
