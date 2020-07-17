import axios from 'axios'
// 单独引入 element的message  Message代表this.$message
import { Message } from 'element-ui'
import { getLocal, removeLocal } from '@/utils/local.js'
// 导入路由
import router from '@/router/index.js'
// axios.defaults.baseURL = process.env.VUE_APP_URL
// withCredentials: true
// axios.create:创建一个axios副本（修改了axios一些默认值，返回一个新的axios）
// 导入时就执行了
var _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
  // headers: {
  //   token: getLocal()
  // }
})
// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    window.console.log('config:', config)
    config.headers.token = getLocal()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_fetch.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
      return response.data
    } else if (response.data.code == 206) {
      // 删除token
      removeLocal()
      //跳转至登陆页
      //this.$router===router
      router.push('/login')
      // this.$router.push('/login')
      // 中止后面.then执行
      // return undefined
      return Promise.reject('error')
    } else {
      window.console.log('response:', response)
      Message.error(response.data.message)
      //   不要执行后面的.then,抛出一个错误中止后面.then的执行
      return Promise.reject('error')
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default _fetch
// export {_fetch}
