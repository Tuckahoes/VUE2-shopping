import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import My from '@/views/layout/my'
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/my', component: My }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id?', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})
const authPage = ['/pay', '/myOrder']
router.beforeEach((to, from, next) => {
  if (!authPage.includes(to.path)) {
    next()
    return false
  } else {
    const token = store.state.user.userInfo.token
    if (token) {
      next()
      return false
    } else {
      next('/login')
    }
  }
})
export default router
