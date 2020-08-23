import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    filter: '',
    search: ''
  },
  mutations: {
    SET_PRODUCTS (state, data) {
      state.products = data
    },
    SET_FILTER (state, data) {
      state.filter = data
    },
    SET_SEARCH (state, data) {
      state.search = data
    }
  },
  actions: {
    getProducts (context) {
      axios({
        method: 'GET',
        url: 'https://ecommerce-cms-laurentius.herokuapp.com/products',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(response => {
          context.commit('SET_PRODUCTS', response.data)
        })
        .catch(err => console.log(err))
    },
    postProducts (context, payload) {
      axios({
        method: 'POST',
        url: 'https://ecommerce-cms-laurentius.herokuapp.com/products',
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        }
      })
        .then(response => { console.log(response.data) })
        .catch(err => console.log(err))
    },
    putProducts (context, payload, id) {
      axios({
        method: 'PUT',
        url: `https://ecommerce-cms-laurentius.herokuapp.com/products/${id}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        }
      })
        .then(response => {})
        .catch(err => console.log(err))
    },
    delProducts (context, id) {
      axios({
        method: 'DELETE',
        url: `https://ecommerce-cms-laurentius.herokuapp.com/products/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(response => {})
        .catch(err => console.log(err))
    }
  },
  getters: {
    storeFilteredProducts (state) {
      const filteredCategory = state.products.filter(el => { return el.category.includes(state.filter) })
      const filteredSearch = filteredCategory.filter(el => { return el.name.toLowerCase().includes(state.search.toLowerCase()) })
      return filteredSearch
    },
    storeFilteredCategories (state) {
      const arr = []
      state.products.forEach(el => {
        let duplicate = false
        arr.forEach(elAr => {
          if (el.category === elAr) duplicate = true
        })
        if (!duplicate) arr.push(el.category)
      })
      return arr
    }
  }
})
