import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
    // import { router } from '@/router/index.js'
import router from '@/router/index.js'
import store from '@/store/index.js'
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')