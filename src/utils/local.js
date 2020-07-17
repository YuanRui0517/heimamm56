// window.localStorage.setItem('token', res.data.token)
//  存储token
// 设置
function saveLocal (value) {
  window.localStorage.setItem('token', value)
}
//获取
function getLocal () {
  return window.localStorage.getItem('token')
}
// 删除
function removeLocal () {
  window.localStorage.removeItem('token')
}
export { saveLocal, getLocal, removeLocal }
