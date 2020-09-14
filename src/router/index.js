import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Product from '../components/Product.vue'
import ProductsTable from '../components/ProductsTable.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductDetail from '../components/ProductDetail.vue'
import EditProduct from '../components/EditProduct.vue'
import Order from '../views/Order.vue'
import Customer from '../views/Customer.vue'
import CurrentOrder from '../components/CurrentOrder.vue'
import OrderHistory from '../components/OrderHistory.vue'
import OrderDetail from '../components/OrderDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    children: [
      {
        path: 'show_all',
        name: 'ProductsTable',
        component: ProductsTable
      },
      {
        path: 'add_product',
        name: 'AddProduct',
        component: AddProduct
      },
      {
        path: ':id',
        name: 'ProductDetail',
        component: ProductDetail
      },
      {
        path: ':id/edit',
        name: 'EditProduct',
        component: EditProduct
      }
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    children: [
      {
        path: '',
        name: 'CurrentOrder',
        component: CurrentOrder
      },
      {
        path: 'detail/:id',
        name: 'OrderDetail',
        component: OrderDetail
      },
      {
        path: 'history',
        name: 'OrderHistory',
        component: OrderHistory
      }
    ]
  },
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
