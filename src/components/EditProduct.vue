<template>
<div id="editProduct">
  <h5 class="center">Edit Product</h5>
  <form class="col s12">
    <div class="row">
      <div class="col">
        <p for="first_name">Name</p>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">format_size</i>
        <input v-model="editProduct.name" id="editProductName" type="text" class="validate">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p for="editProductCategory">Category</p>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">reorder</i>
        <select id="editProductCategory" v-model="editProduct.category">
          <option value="" disabled selected>Choose category</option>
          <option value="Gaming Notebook">Gaming Notebook</option>
          <option value="Gaming PC">Gaming PC</option>
          <option value="Notebook">Notebook</option>
          <option value="PC">PC</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Tablet">Tablet</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p for="editProductDescription">Description</p>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">description</i>
        <textarea v-model="editProduct.description" id="editProductDescription" class="materialize-textarea"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p for="editProductPrice">Price</p>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">attach_money</i>
        <input v-model="editProduct.price" id="editProductPrice" type="number" class="validate">
        <span class="helper-text" data-error="" data-success="">Price can not be negative</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p for="password">Stock</p>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">storage</i>
        <input v-model="editProduct.stock" id="editProductStock" type="number" class="validate">
        <span class="helper-text" data-error="" data-success="">Stock can not be negative</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p for="newProductImgUrl">Image URL</p>
      </div>
      <div class="input-field col s12">
        <i class="material-icons prefix">camera_alt</i>
        <input v-model="editProduct.image_url" id="newProductImgUrl" type="url" class="validate">
      </div>
    </div>
    <div class="center">
      <div class="row">
        <div class="col m6">
          <button class="btn blue darken-3" @click.prevent="editProductById">Edit Product</button>
        </div>
        <div class="col m6">
          <router-link :to="'/product/show_all'"><button class="btn blue darken-3">Cancel</button></router-link>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'
import server from '../api/index'

export default {
  name: 'EditProduct',
  data () {
    return {
      editProduct: {
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        image_url: ''
      }
    }
  },
  methods: {
    getProductById () {
      server({
        method: 'get',
        url: `/product/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.editProduct.name = response.data.data.name
          this.editProduct.category = response.data.data.category
          this.editProduct.description = response.data.data.description
          this.editProduct.price = response.data.data.price
          this.editProduct.stock = response.data.data.stock
          this.editProduct.image_url = response.data.data.image_url
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProductById () {
      server({
        method: 'put',
        url: `/product/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.editProduct.name,
          category: this.editProduct.category,
          description: this.editProduct.description,
          price: this.editProduct.price,
          stock: this.editProduct.stock,
          image_url: this.editProduct.image_url
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
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
    const selectForm = document.querySelectorAll('#editProductCategory')
    M.FormSelect.init(selectForm)
  }
}
</script>

<style>
  #editProduct {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
