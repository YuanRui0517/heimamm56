import _fetch from './request.js'
// import { getLocal } from '@/utils/local.js'
// 获取用户信息
function getUserInfo () {
  return _fetch({
    url: '/info'
    // headers: { token: getLocal() }
  })
}
// 退出
function logout () {
  return _fetch({
    url: '/logout'
    // headers: {
    //   token: getLocal()
    // }
  })
}
export { getUserInfo, logout }
