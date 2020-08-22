import Vue from 'vue'
import Vuex from 'vuex'
import ServerAPI from '../axios/ServerAPI'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    spesificProduct: {},
    alert: {
      isOn: false,
      message: ''
    }
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    ALERT (state, payload) {
      state.alert = {
        isOn: true,
        message: payload
      }
      setTimeout((_) => {
        state.alert = {
          isOn: false,
          message: payload
        }
      }, 3000)
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
          context.commit('ALERT', 'FETCH FAILED')
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
          context.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
          context.commit('ALERT', 'ADD FAILED')
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
        })
        .catch((err) => {
          console.log(err)
        })
        .finally((_) => {
          // context.commit('ALERT', 'PRODUCT DELETED')
        })
    },
    updateProduct (context, data) {
      ServerAPI({
        method: 'PUT',
        url: 'products/' + data.id,
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
          context.commit('ALERT', 'PRODUCT UPDATED')
          context.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
          context.commit('ALERT', 'EDIT FAILED')
          router.push(`/dashboard/editProduct/${data.id}`)
        })
        .finally((_) => {
          console.log('FETCHED PRODUCTS di FINALLY')
        })
    }
  }
})
