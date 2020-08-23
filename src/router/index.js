import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Cms from '../views/Cms.vue'
import Products from '../components/Products.vue'
import ProductInfo from '../components/ProductInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem('access_token')) next()
      else next('/cms')
    }
  },
  {
    path: '/cms',
    component: Cms,
    beforeEnter (to, from, next) {
      if (localStorage.getItem('access_token')) next()
      else next('/')
    },
    children: [
      {
        path: '',
        name: 'Products',
        component: Products
      },
      {
        path: '/cms/:id',
        name: 'Product Info',
        component: ProductInfo
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
