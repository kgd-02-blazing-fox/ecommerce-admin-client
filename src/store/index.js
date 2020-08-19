import Vue from 'vue'
import Vuex from 'vuex'
import ServerAPI from '../axios/ServerAPI'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    spesificProduct: {}
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    fetchProducts (context) {
      ServerAPI({
        method: 'GET',
        url: 'products'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally((_) => {
          console.log('FETCHED PRODUCTS di FINALLY')
        })
    },
    addProducts (context, data) {
      ServerAPI({
        method: 'POST',
        url: 'products',
        data: {
          name: data.name,
          image_url: data.image_url,
          price: data.price,
          stock: data.stock
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('PRODUCT ADDED')
          context.dispatch('fetchProducts')
          router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err)
          router.push('/dashboard/addProduct')
        })
        .finally((_) => {
          console.log('FETCHED PRODUCTS di FINALLY')
        })
    },
    deleteProduct (context, id) {
      ServerAPI({
        method: 'DELETE',
        url: 'products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchProducts')
          router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err)
          router.push('/dashboard/productDetail/' + id)
        })
        .finally((_) => {
          console.log('FETCHED PRODUCTS di FINALLY')
        })
    },
    getProductToEdit (context, id) {
      console.log('INI DARI STORE GETTTT')
      console.log(id)
    }
  }
})
