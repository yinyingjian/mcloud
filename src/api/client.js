// 封装一个统一的全局的http的客户端

import axios from 'axios'

var instance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// 为http客户端添加拦截器, 通过拦截器拦截返回 做异常的统一处理
// instance.interceptors.request

instance.interceptors.response.use(
  // 请求成功的返回
  (resp) => {
    return resp.data
  },
  // 请求失败
  (error) => {
    console.log(error)
    // new Error(errMsg)
    // 默认使用message
    var message = error.message
    // api 有返回异常，使用API接口返回的异常
    if (error.response && error.response.data) {
      // if (error.response.data.code === 40010) {
      //     // token过去, 重定向Login
      // }
      message = error.response.data.message
    }
    return Promise.reject(new Error(message))
  }
)

export default instance
