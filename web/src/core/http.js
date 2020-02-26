import Axios from 'axios'
import config from "../config/config"
import Vue from 'vue'
const _this = new Vue()
//请求对象 初始化第一阶段    --创建 axios 实例
const axios = Axios.create({
    baseURL: config.baseUrl,
    timeout: 2000,
    withCredentials: true
});
class $http extends axios {
    constructor() {
        super()
    }
}
$http.interceptors.request.use(
    config => {
        console.log(config)
        return config;
    },
    err => {
        return Promise.reject(err);
    });
$http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                default:
                    _this.$message.error(
                        error.response.data.message
                    );
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });
export default $http 