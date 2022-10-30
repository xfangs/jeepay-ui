import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './utils/api'

import tUtil from 'tyro-util'

var store = require('store')
import BaseUrl from "@/utils/baseUrl";

window.Vue = Vue
Vue.prototype.$store = store;

Vue.prototype.$baseUrl = BaseUrl

console.info(BaseUrl)

Vue.prototype.$api = api;
Vue.prototype.$tUtil = tUtil;


Vue.use(Vant);

Vue.config.productionTip = false

Vue.prototype.$go = (url) => {

    router.push({path: url})
}

Vue.prototype.$href = (url) => {
    location.href = location.origin + url
}

Vue.prototype.$open = (url) => {
    window.open(url)
}

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
