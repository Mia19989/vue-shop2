// 配置base_url等
let BASE_URL = ''
const TIME_OUT = 1000

// 根据不同环境 选择不同的BASE_URL BASE_NAME
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://hcc.org/test'
}

// 导出
export { BASE_URL, TIME_OUT }
