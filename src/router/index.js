/*
1:安装
2：导入
3：注册
4：实例化
5：注入到new Vue({})
6:路由出口
*/

// 2：导入
import VueRouter from 'vue-router'
// 3：注册
import Vue from 'vue'
Vue.use(VueRouter)
    // 4：实例化
import login from '@/views/login/login.vue'
import layout from '@/views/layout/layout.vue'
import chart from '@/views/layout/chart/chart.vue'
import userList from '@/views/layout/userList/userList.vue'
import question from '@/views/layout/question/question.vue'
import business from '@/views/layout/business/business.vue'
import subject from '@/views/layout/subject/subject.vue'
const router = new VueRouter({
        routes: [{
                path: '/',
                // 路由重定向
                redirect: '/login'
            },
            {
                path: '/login',
                component: login,
                meta: {
                    title: '登陆'
                }
            },
            {
                path: '/layout',
                component: layout,
                redirect: '/layout/chart',
                children: [{
                        path: '/layout/chart', //相对（不写/号，相对于自己父级），完整模式，/开头
                        component: chart,
                        // meta是路由元信息，在获取该路由信息时是可以读取里面的信息的
                        meta: {
                            title: '数据概览'
                        }
                    },
                    {
                        path: '/layout/userList', //相对（不写/号，相对于自己父级），完整模式，/开头
                        component: userList,
                        meta: {
                            title: '用户列表'
                        }
                    },
                    {
                        path: '/layout/question', //相对（不写/号，相对于自己父级），完整模式，/开头
                        component: question,
                        meta: {
                            title: '题库列表'
                        }
                    },
                    {
                        path: '/layout/business', //相对（不写/号，相对于自己父级），完整模式，/开头
                        component: business,
                        meta: {
                            title: '企业列表'
                        }
                    },
                    {
                        path: '/layout/subject', //相对（不写/号，相对于自己父级），完整模式，/开头
                        component: subject,
                        meta: {
                            title: '学科列表'
                        }
                    }
                ]
            }
        ]
    })
    /*
    使用nprogress     
    装包：npm i nprogress
    导包  import NProgress from 'nprogress'
    import 'nprogress/nprogress.css'
    用包:NProgress.start() 开始   NProgress.done() 完成
    */
    // 路由前置守卫（离开前守卫）
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
        // window.console.log('去哪里:', to)
        // window.console.log('从哪来:', from)
        NProgress.start()
            // to:去哪里的路由信息，from:从哪里来的路由信息  next   next()正常通过
        next()
    })
    // 路由后置守卫（进入相应路由后守卫）
router.afterEach(to => {
    window.console.log('afterEach去哪里:', to)
    document.title = to.meta.title
        // document.getElementById('title').innerText = to.meta.title
    window.console.log(to.meta.title)
        // window.console.log('afterEach从哪来:', from)
    NProgress.done()
})
export default router
// export { router }
// export {名字} 与 import {名字}  二者名字要互相对应
// export default  名字  与  import 名字  from 路径
// 5：注入到new Vue({})
// 6:路由出口