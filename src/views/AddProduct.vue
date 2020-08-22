<template>
  <div id="bgCol" class="container-fluid col col-lg-6 col-md-12 col-sm-12 mt-4">
    <h3><i class="fas fa-warehouse fa-2x"> </i> <i class="fas fa-truck-loading"> </i> add new product</h3>
    <div class="row">
      <div class="col">
        <div class="container mt-2">
          <div class="row">
            <div class="col border rounded formbg">
              <form class="m-3" @submit.prevent='add'>
                <div class="form-group">
                  <label for="productName">
                    <i class="fas fa-file-signature fa-lg"></i>
                      name</label>
                  <input type="text"
                  class="form-control"
                  placeholder="product name here"
                  v-model="productName"
                  required>
                </div>
                <div class="form-group">
                  <label for="productImageUrl">
                    <i class="fas fa-link fa-lg"></i>
                      image url</label>
                  <input type="text"
                  class="form-control"
                  placeholder="product image url here"
                  v-model="productImageUrl"
                  required>
                </div>
                <div class="form-group">
                  <label for="productPrice">
                    <i class="fas fa-money-bill-wave fa-lg"></i>
                      price</label>
                  <input type="number"
                  class="form-control"
                  placeholder="product price here"
                  min="1"
                  v-model="productPrice"
                  required>
                </div>
                <div class="form-group">
                  <label for="productStock">
                    <i class="fas fa-boxes fa-lg"></i>
                      stock</label>
                  <input type="number"
                  class="form-control"
                  placeholder="product stock here"
                  min="1"
                  v-model="productStock"
                  required>
                </div>
                <div class="container d-flex justify-content-center">
                  <div class="row">
                    <div class="col">
                      <button type="submit" class="btn btn-dark">submit</button>
                    </div>
                    <div class="col">
                      <button @click="back" class="btn btn-dark">back</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'AddProduct',
  data () {
    return {
      productName: '',
      productImageUrl: '',
      productPrice: 0,
      productStock: 0
    }
  },
  methods: {
    refresh () {
      this.socket.emit('newproduct')
    },
    add () {
      this.socket = io.connect('https://deploy-cms-ecommerce.herokuapp.com/')
      const data = {
        name: this.productName,
        image_url: this.productImageUrl,
        price: this.productPrice,
        stock: this.productStock
      }
      this.$store.dispatch('addProducts', data)
      this.$router.push('/dashboard')
      setTimeout((_) => {
        this.socket.emit('newproduct')
      }, 1000)
    },
    back () {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
#bgCol{
  background-color: #ecf0f1;
}
div{
  justify-content: center;
  align-items: center;
}
.formbg{
  background-color: #343A40;
  color: white;
}
label i {
  color: white;
}
</style>
