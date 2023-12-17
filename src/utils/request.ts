import axios from 'axios'
import { ElMessage } from 'element-plus'

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})
/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 携带token

    return config
  },
  (error) => Promise.reject(error)
)
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg: string = ''
    switch (error.response.status) {
      case 400:
        msg = '请求错误'
        break
      case 401:
        msg = '未授权'
        break
      case 403:
        msg = '拒绝访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器内部错误'
        break
      case 501:
        msg = '服务未实现'
        break
      case 502:
        msg = '网关错误'
        break
      case 503:
        msg = '服务不可用'
        break
      case 504:
        msg = '网关超时'
        break
      case 505:
        msg = 'HTTP版本不受支持'
        break
      default:
        msg = '未知错误'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
  }
)
export default service
