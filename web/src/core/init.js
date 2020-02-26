import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import router from '../router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '../style/index.less'
class InitMar {
    static async initCore() {
        await InitMar.initApp();
    }
    static initApp() {
        Vue.use(Router);
        Vue.use(Antd);
        Vue.prototype.router = router;
        Vue.config.productionTip = false;
        new Vue({
            router,
            render: h => h(App),
        }).$mount('#app')
    }
   
}
export default InitMar