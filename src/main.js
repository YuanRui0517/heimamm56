import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue';
Vue.config.productionTip = false

Vue.use(ElementUI);
import router from '@/router/index.js';
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')