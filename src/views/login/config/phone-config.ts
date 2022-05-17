export const phoneRules = {
  number: [
    { required: true, message: '请输入手机号~', trigger: 'blur' },
    {
      // pattern正则表达式 验证
      pattern: /^1(3|4|7|5|8)([0-9]{9})/,
      message: '请输入正确的手机号~',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '请输入验证码~', trigger: 'blur' },
    {
      length: 4,
      message: '验证码错误~',
      trigger: 'blur'
    }
  ]
}
