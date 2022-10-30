import axios from 'axios'
import {Notify} from 'vant';
import {base64Encode} from '@ony3000/base64-converter';
var store = require('store')
import baseUrl from "@/utils/baseUrl";


// create an axios instance
const service = axios.create({
    baseURL: baseUrl, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        const token = store.get('Access-Token')
        if (token) {
            config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        console.log(res)

        if (response.request.responseType === 'blob') {
            return res
        }



        if (res.code === 0) {
            return res
        }


        switch (res.code) {
            case 403:
                Notify({type: 'danger', message: '没有权限访问'});

                break
            case 500:
                console.log("------error.response------", res.response)
                // update-end- --- author:liusq ------ date:20200910 ---- for:处理Blob情况----
                //notification.error({ message: '系统提示', description:'Token失效，请重新登录!',duration: 4})
                if (res.message.includes("Token失效")) {
                    // update-begin- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
                    // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----

                    Notify({type: 'danger', message: 'token失效，请重新登录'});
                } else {
                    Notify({type: 'danger', message: res.message});
                }
                break
            case 404:
                Notify({type: 'danger', message: '未找到资源'});
                break
            case 504:
                Notify({type: 'danger', message: '网络请求超时'});
                break
            case 401:
                // eslint-disable-next-line no-case-declarations
                let ccallback =
                    `${window.location.origin}/login?callback=${base64Encode(window.location.href)}`
                window.location.href = ccallback
                break
            default:
                Notify({type: 'danger', message: res.message});
                break
        }
        return Promise.reject(new Error(res.message || 'Error'))
    }
)

export default service
