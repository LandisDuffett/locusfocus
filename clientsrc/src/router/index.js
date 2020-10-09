import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Setup from '../views/Setup.vue'
import Study from '../views/Study.vue'
import { authGuard } from "@bcwdev/auth0-vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      beforeEnter: authGuard
    },
    {
      path: '/setup',
      name: 'setup',
      component: Setup
    },
    {
      path: '/study',
      name: 'study',
      component: Study
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})