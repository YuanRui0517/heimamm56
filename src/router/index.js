//安装
import VueRouter from 'vue-router';
//注册
import Vue from 'vue';
Vue.use(VueRouter)
    //实例化
import login from '@/views/login/login.vue';
const router = new VueRouter({
        routes: [{
            path: "/",
            redirect: '/login'
        }, {
            path: "/login",
            component: login
        }]
    })
    // export { router }
export default router
//注入到new vue（{}）