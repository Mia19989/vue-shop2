<template>
  <!-- 1.默认记住密码 2.link 忘记密码(尚未完善忘记密码的页面) 3.点击登录 逻辑代码封装在对应组件
  4.通过Vuex action封装登录逻辑 登录的逻辑(网络请求 拿到数据后的处理)；
  数据保存到某一个位置；发送其他的请求(请求当前用户的信息)；拿到用户的菜单；跳到首页
  5.用ref 区分是账号登录 还是 手机登录 执行不同逻辑 -->
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="loginTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <!-- 账号信息 -->
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <!-- 手机信息 -->
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <!-- 记住密码 忘记密码 -->
    <div class="control-pwd">
      <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <!-- 点击登录 -->
    <div>
      <el-button type="primary" class="login-register" @click="handelLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },

  setup() {
    // 默认选中记住密码
    const isKeepPwd = ref<boolean>(true)
    // 绑定ref 获取login-account组件的信息
    // InstanceType<typeof LoginAccount> 拿到LoginAccount的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    // login-phone组件信息
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    // 默认选中的标签页 登录方式是 账号登录
    let loginTab = ref<string>('account')

    // 点击登录事件 具体登录操作交给 对应组件操作 panel只负责展示组件
    const handelLoginClick = () => {
      // console.log('立即登录')
      // 判断登录方式
      if (loginTab.value === 'account') {
        // 执行login-account组件里的方法 实现具体的登录操作
        accountRef.value?.loginAction(isKeepPwd.value)
      } else {
        // 执行login-phone组件里的方法
        console.log('调用login-phone里的方法')
        phoneRef.value?.phoneAction(isKeepPwd.value)
      }
    }

    return {
      isKeepPwd,
      accountRef,
      phoneRef,
      loginTab,
      handelLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;

  .title {
    text-align: center;
  }

  .custom-tabs-label {
    .el-icon {
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }
  }

  .control-pwd {
    display: flex;
    justify-content: space-between;
  }

  .login-register {
    width: 100%;
  }
}
</style>
