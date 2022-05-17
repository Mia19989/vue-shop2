<template>
  <!-- 1.抽离出检验规则rules到配置文件 2.点击登录相关处理 通过预验证
  3.根据是否记住密码 选择是否在stroge里存储 4.对存储操作 额外封装在utils下的组件中
  5.登录成功 跳转相关页面 -->
  <div class="login-account">
    <el-form
      ref="accountFormRef"
      :model="accountForm"
      :rules="accountRules"
      label-width="60px"
      class="account-ruleForm"
      :size="formSize"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
// 导入验证规则
import { accountRules } from '../config/account-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const formSize = ref('default')
    const accountFormRef = ref<FormInstance>()
    const accountForm = reactive({
      name: '',
      password: ''
    })

    // 点击登录后的 一系列操作
    // 预验证 根据记住密码判断是否存储账号、密码的相关信息
    const loginAction = (isKeepPwd: boolean) => {
      // 预验证
      accountFormRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要 记住密码 -> 本地缓存
          if (isKeepPwd) {
            // 记住密码 进行本地缓存(通过localStorage进行本地缓存)
            // 拓展：可以做加密 解密
            localCache.setCache('name', accountForm.name)
            localCache.setCache('password', accountForm.password)
            // console.log(isKeepPwd)
          } else {
            // 没有选择记住密码
            localCache.removeCache('name')
            localCache.removeCache('password')
          }

          // 2.登录验证
          store.dispatch('login/accountLoginAction', { ...accountForm })
        }
        // 默认有 验证错误的提示
      })
    }

    return {
      formSize,
      accountFormRef,
      accountForm,
      accountRules,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped></style>
