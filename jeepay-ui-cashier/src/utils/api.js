import axios from '@/utils/request'

export default {
  post(url, parameter) {
    return axios({
      url: url,
      method: 'post',
      data: parameter
    })
  },
  http(url, parameter, method) {

    return axios({
      url: url,
      method: method,
      data: parameter
    })
  },
  put(url, parameter) {
    return axios({
      url: url,
      method: 'put',
      data: parameter
    })
  },
  get(url, parameter) {
    if (!parameter) {
      parameter = {}
    }
    parameter.t = Math.random();
    return axios({
      url: url,
      method: 'get',
      params: parameter
    })
  },
  delete(url, parameter) {
    return axios({
      url: url,
      method: 'delete',
      params: parameter
    })
  },
  upload(url, parameter) {
    return axios({
      url: url,
      data: parameter,
      timeout: 1000 * 60 * 60,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',  // 文件上传
      },
    })
  }
}

