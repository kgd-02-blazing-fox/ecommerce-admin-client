<template>
  <div id="productDetail">
    <div class="container">
      <h4 class="center">{{product.name}}</h4>
      <div class="center">
        <img :src="product.image_url">
      </div>
      <div>
        <h5>Description</h5>
        <p>{{ product.description }}</p>
        <h5>Category</h5>
        <p>{{ product.category}}</p>
        <h5>Price</h5>
        <p>{{ priceConverter(product.price) }}</p>
        <h5>Stock</h5>
        <p v-if="product.stock == 0">Empty</p>
        <p v-else>{{ product.stock }}</p>
      </div>
      <div class="center">
        <div class="row">
          <div class="col m4">
            <router-link :to="'/product/show_all'"><button class="btn blue darken-3"><i class="material-icons left">arrow_back</i>Back</button></router-link>
          </div>
          <div class="col m4">
            <router-link :to="`/product/${product.id}/edit`"><button class="btn blue darken-3"><i class="material-icons left">edit</i>Edit Product</button></router-link>
          </div>
          <div class="col m4">
            <button class="btn modal-trigger blue darken-3" :href="`#modalDeleteFromDetail${product.id}`"><i class="material-icons left">delete</i>Delete Product</button>
          </div>
        </div>
      </div>
      <div class="modal" :id="`modalDeleteFromDetail${product.id}`">
        <div class="modal-content">
          <p>Are you sure you want to delete this product?</p>
        </div>
        <div class="modal-footer">
          <a @click.prevent="deleteProduct" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          <a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import server from '../api/index'
import M from 'materialize-css/dist/js/materialize.min.js'
import priceConverter from '../helpers/priceConverter'

export default {
  name: 'ProductDetail',
  data () {
    return {
      product: ''
    }
  },
  methods: {
    priceConverter: priceConverter,
    getProductById () {
      server({
        method: 'get',
        url: `/product/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.product = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct () {
      server({
        method: 'delete',
        url: `/product/${this.$route.params.id}`,
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
      this.getProductById()
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
  #productDetail {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  img {
    width: 300px
  }
  h4, h5 {
    font-weight: bolder;
  }
</style>>
