import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DetailCard from '../components/DetailCard.vue'
import Products from '../components/Products.vue'
import AddProduct from '../components/AddProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (to.name !== 'Login' && !localStorage.getItem('token')) next({ name: 'Login' })
      else next()
    },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        children: [
          {
            path: ':id',
            name: 'Detail',
            component: DetailCard
          }
        ]
      },
      {
        path: 'add-product',
        name: 'Add_Product',
        component: AddProduct
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name === 'Login' && localStorage.getItem('token')) next({ name: 'Home' })
      else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
