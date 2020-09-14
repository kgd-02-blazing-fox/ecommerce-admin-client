import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    productsList: [],
    currentNotif: '',
    currentErr: '',
    orders: []
  },
  mutations: {
    changeLoginStatus (state) {
      if (localStorage.token) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    setProductsList (state, payload) {
      state.productsList = payload
    },
    changeCurrentNotif (state, payload) {
      state.currentNotif = payload
    },
    changeCurrentErr (state, payload) {
      state.currentErr = payload
    },
    setOrder (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    fetchProductsList (context) {
      server({
        method: 'get',
        url: '/product',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit('setProductsList', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAllOrder (context) {
      server({
        method: 'get',
        url: '/user/order',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit('setOrder', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {

  }
})

export default store
