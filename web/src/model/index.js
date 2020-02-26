import $http from "../core/http"
import Vue from 'vue'
const _this = new Vue()
class httpModel{
    static async getCode(){
        const codeSvg=await $http.get('/getCode');
        return codeSvg
    } 
    static async setToken(token){
        $http.defaults.headers.common['token'] = token;
    } 
    static async login(data){
        const token = await $http.post('/login',data);
        const tok = token.data.token
        _this.$success({
            title: '已经得到Token',
            content: tok
        });
        return token
    } 
}
export default httpModel