import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'dashboard_home',
        component: () => import(/* webpackChunkName: "product" */ '../components/Product.vue')
      },
      {
        path: 'productDetail/:id',
        name: 'dashboard_productDetail',
        component: () => import(/* webpackChunkName: "productDetail" */ '../components/ProductDetail.vue')
      }
    ]
  },
  {
    path: '/dashboard/addProduct',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "addProduct" */ '../views/AddProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/dashboard/editProduct/:productId',
    name: 'EditProduct',
    component: () => import(/* webpackChunkName: "editProduct" */ '../views/EditProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
