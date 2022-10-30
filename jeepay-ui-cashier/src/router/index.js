import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/staticQRCodePay/:mchNo',
            name: 'staticQRCodePay',
            component: () => import('@/views/pay/staticQRCodePay')
        },
    ]
})
