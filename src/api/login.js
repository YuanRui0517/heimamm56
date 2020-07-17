import _fetch from './request.js'
function getRcode (data) {
  return _fetch({
    url: '/sendsms',
    data: data,
    method: 'post'
  })
}
function registerUser (data) {
  return _fetch({
    url: '/register',
    method: 'post',
    data //data:data
  })
}
// 定义登陆接口
function toLogin (data) {
  return _fetch({
    url: '/login',
    method: 'post',
    data
  })
}

export { getRcode, registerUser, toLogin }
/*
export  {名字}   import  {名字}  from 路径（{名字}）
                        {名字} ={名字} 
                        {a}={a:10}
                        a=10
*/

//export default   变量名    import 名字 from "路径"（变量名）  名字 =变量
