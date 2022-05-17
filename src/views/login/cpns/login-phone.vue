<template>
  <!-- 1.按钮 获取验证码 2.绑定点击事件 发送验证码 弹框提示已发送验证码
  3.尚未完善提示验证码发送的功能 -->
  <div class="login-phone">
    <el-form
      ref="phoneFormRef"
      :model="phoneForm"
      :rules="phoneRules"
      label-width="70px"
      class="phone-ruleForm"
      :size="formSize"
    >
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phoneForm.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="verification-code">
          <el-input v-model="phoneForm.code" />
          <el-button type="primary" class="code-btn" @click="getCode"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
// 导入验证规则
import { phoneRules } from '../config/phone-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const formSize = ref('default')
    const phoneFormRef = ref<FormInstance>()
    const phoneForm = reactive({
      number: '',
      code: ''
    })

    const getCode = () => {
      // this.$message({
      //   message: 'Congrats, this is a success message.',
      //   type: 'success'
      // })
      console.log('已经发送验证码')
    }

    const phoneAction = (isKeepPwd: boolean) => {
      // 预验证
      phoneFormRef.value?.validate((valid) => {
        // 通过预验证
        if (valid) {
          // 1.记住密码 -> 记住手机号
          if (isKeepPwd) {
            localCache.setCache('phone', phoneForm.number)
          } else {
            localCache.removeCache('phone')
          }

          // 2.后续登录逻辑
          store.dispatch('login/phoneLoginAction', { ...phoneForm })
        }
      })
    }

    return {
      formSize,
      phoneFormRef,
      phoneForm,
      phoneRules,
      getCode,
      phoneAction
    }
  }
})
</script>

<style lang="less" scoped>
.login-phone {
  .verification-code {
    display: flex;

    .code-btn {
      margin-left: 5px;
    }
  }
}
</style>
