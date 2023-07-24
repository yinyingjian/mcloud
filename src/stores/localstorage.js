//  安装:  npm i @vueuse/core， 使用响应式localStorage对象
//  使用 state.isLogin 来
import { useStorage } from '@vueuse/core'

// 帮助把LocalStroage封装成一个响应式的Ref对象
export var token = useStorage(
  'token',
  {},
  localStorage,
  {mergeDefaults: true} 
)