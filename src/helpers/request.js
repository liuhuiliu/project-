import axios from 'axios'
import baseURLConfig from './config-baseURL'

console.log(baseURLConfig)

axios.defaults.headers.post['Content-Type'] = axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    //所有的post请求都统一设置
axios.defaults.baseURL = baseURLConfig.baseURL
    // axios.defaults.baseURL = 'https://note-server.hunger-valley.com'
axios.defaults.withCredentials = true //需要跨域请求

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch(err => {
            console.error({ msg: '网络异常' })
            reject({ msg: '网络异常' })
        })
    })
}