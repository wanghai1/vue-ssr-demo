import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> console.log('Router_err', error))
}


Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/about',
    name: 'about',
    component: ()=> /* webpackChunkName: "About" */  import('@/views/Aboute/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: ()=> /* webpackChunkName: "Home" */ import('@/views/Home/index.vue')
  }
];

export const createRouter = ()=> {
  return new Router({
    routes,
    mode: 'history',
  })
}