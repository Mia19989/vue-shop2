const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  // 允许CORS跨域 配置devServer
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
})
