import axios from 'axios'
import { Toast } from 'vant'
// 创建一个axios实例，对实例进行自定义配置，避免污染axios
const loginInstance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 请求拦截器
loginInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 打开加载提示
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
loginInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.data.status !== 200) {
    Toast(response.data.message)
    return Promise.reject(response.data.message)
  } else {
    // 关闭加载提示 Toast只能存在一个，后面的会覆盖前面的
    Toast.clear()
  }
  return response.data
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default loginInstance
