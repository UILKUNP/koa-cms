import Router from 'vue-router'
import Login from '../pages/login'
const routes=[
    {
        path: '/',
        redirect: '/login' 
    },
    { path: '/login', 
      name:'login',
      component: Login,
      icon:null,
      spoce:{
          used:false
      }
    }
];
export default new Router(
    { routes, 
      mode: 'history',}
    )