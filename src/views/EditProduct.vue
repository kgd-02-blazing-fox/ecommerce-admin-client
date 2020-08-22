<template>
  <div id="bgCol" class="container-fluid col col-lg-6 col-md-12 col-sm-12 mt-4">
    <h3><i class="fas fa-warehouse fa-2x"> </i> edit product</h3>
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
                  v-model="spesificProduct.name"
                  required>
                </div>
                <div class="form-group">
                  <label for="productImageUrl">
                    <i class="fas fa-link fa-lg"></i>
                      image url</label>
                  <input type="text"
                  class="form-control"
                  v-model="spesificProduct.image_url"
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
                  v-model="spesificProduct.price"
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
                  v-model="spesificProduct.stock"
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
  name: 'EditProduct',
  data () {
    return {
    }
  },
  methods: {
    add () {
      const data = {
        id: this.spesificProduct.id,
        name: this.spesificProduct.name,
        image_url: this.spesificProduct.image_url,
        price: this.spesificProduct.price,
        stock: this.spesificProduct.stock
      }
      this.socket.emit('newEditproduct', data)
      this.$router.push('/dashboard')
    },
    back () {
      this.$router.push('/dashboard')
    }
  },
  created () {
  },
  computed: {
    spesificProduct () {
      const id = Number(this.$route.params.productId)
      const unfilteredProduct = this.$store.state.products
      const product = unfilteredProduct.filter((product) => product.id === id)
      return product[0]
    }
  },
  mounted () {
    this.socket = io.connect('http://localhost:3000')
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
