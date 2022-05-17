// 处理el-icon-xx
import { computed } from 'vue'

export default function useHandleIcon() {
  return computed(() => (iconClass: string) => {
    // 切割字符串
    const arr = iconClass.split('-')
    // 去掉前面的 el icon
    arr.splice(0, 2)

    for (let index = 0; index < arr.length; index++) {
      arr[index] =
        arr[index].charAt(0).toUpperCase() +
        arr[index].slice(1, arr[index].length)
    }
    // 拼接成字符串
    return arr.join('')
  })
}
