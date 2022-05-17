// 进行本地缓存
class LocalCache {
  // 设置缓存 拓展：参数3：缓存类型 isLocalStorage
  setCache(key: string, value: any) {
    // 注意setItem中 参数2：string类型
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      // 能够拿到value的话 利用JSON.parse转回对象类型
      return JSON.parse(value)
    }
  }

  // 删除某个缓存
  removeCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 删除所有缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
