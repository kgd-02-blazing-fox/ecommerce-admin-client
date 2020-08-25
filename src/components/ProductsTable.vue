<template>
  <div id="productsTable">
    <table class="highlight">
      <thead>
        <tr>
            <th class="center-align">ID</th>
            <th class="center-align">Name</th>
            <th class="center-align">Image</th>
            <th class="center-align">Category</th>
            <th class="center-align">Stock</th>
            <th class="center-align">Price</th>
            <th class="center-align">Action</th>
        </tr>
      </thead>

      <tbody v-for="product in productsList" :key="product.id">
        <tr>
          <td class="center-align">{{ product.id }}</td>
          <td class="center-align">
            <router-link :to="`/product/${product.id}`">
            {{ product.name }}
            </router-link>
          </td>
          <td class="center">
            <img :src="product.image_url" alt="">
          </td>
          <td class="center-align">{{ product.category }}</td>
          <td class="center-align">{{ product.stock }}</td>
          <td class="center-align">{{ priceConverter(product.price) }}</td>
          <td class="center">
            <router-link :to="`/product/${product.id}/edit`"><button class="btn btn-small blue darken-3"><i class="material-icons">edit</i></button></router-link> |
            <button class="btn btn-small blue darken-3 modal-trigger" :href="`#modalDelete${product.id}`"><i class="material-icons">delete</i></button>
          </td>
        </tr>
        <div class="modal" :id="`modalDelete${product.id}`">
          <div class="modal-content">
            <p>Are you sure you want to delete product {{ product.id }}?</p>
          </div>
          <div class="modal-footer">
            <a @click.prevent="deleteProduct(product.id)" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            <a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
          </div>
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
import server from '../api/index'
import M from 'materialize-css/dist/js/materialize.min.js'
import priceConverter from '../helpers/priceConverter'

export default {
  name: 'ProductsTable',
  computed: {
    productsList () {
      return this.$store.state.productsList
    }
  },
  methods: {
    priceConverter: priceConverter,
    deleteProduct (id) {
      server({
        method: 'delete',
        url: `/product/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          this.$store.dispatch('fetchProductsList')
          this.$router.push({ name: 'ProductsTable' })
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$store.commit('changeLoginStatus')
      this.$router.push({ name: 'LandingPage' })
    } else {
      this.$store.dispatch('fetchProductsList')
      this.$store.dispatch('fetchAllOrder')
    }
  },
  mounted () {
    const modal = document.querySelectorAll('.modal')
    M.Modal.init(modal)
  }
}
</script>

<style scoped>
  #productsTable {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  img {
    height: 100px
  }
</style>
