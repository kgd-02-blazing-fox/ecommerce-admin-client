<template>
<div class="container-fluid col-lg-11 col-md-11 col-sm-12 mt-2">
  <div class="mt-2">
    <div class="row">
      <div class="col-lg-6 col-md-5 col-sm-12 mt-2 border rounded">
        <img class="rounded img-fluid" :src="spesificProduct.image_url" alt="GAMBAR PRODUCT">
      </div>
      <div class="col-lg-6 col-md-5 col-sm-12 mt-2 border rounded">
        <router-link class="smaller" to="/dashboard"> close <i class="far fa-times-circle fa-sm"></i>
        </router-link>
        <div class="row mt-3">
          <div class="col">
            <h2>{{spesificProduct.name}}</h2>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-4">
            <h3><b>price</b></h3>
          </div>
          <div class="col">
            <h3>{{priceInRupiah}}</h3>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-4">
            <h3><b>stock</b></h3>
          </div>
          <div class="col">
            <h3>{{spesificProduct.stock}} pc(s)</h3>
          </div>
        </div>
        <div v-if="userRole === 1" class="row mt-5">
          <div class="col">
            <a href="#" @click.prevent="editProduct(spesificProduct.id)">
            <i class="fas fa-pen-square"></i> edit
            </a>
          </div>
          <div class="col">
            <router-link to="/dashboard">
            <b @click="deleteProduct(spesificProduct.id)">
            <i class="fas fa-trash-alt"></i> delete
            </b>
            </router-link>
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
  name: 'ProductDetail',
  methods: {
    editProduct (id) {
      this.$router.push(`/dashboard/editProduct/${id}`)
    },
    deleteProduct (id) {
      this.socket = io.connect('http://localhost:3000')
      const isConfirmed = confirm('are you sure?')
      if (isConfirmed) {
        this.$store.dispatch('deleteProduct', id)
        this.$router.push('/dashboard')
        setTimeout((_) => {
          this.socket.emit('deleteingProduct')
        }, 1000)
      } else {
        console.log('delete canceled')
      }
    },
    refresh () {
    }
  },
  created () {
  },
  computed: {
    spesificProduct () {
      const id = Number(this.$route.params.id)
      const unfilteredProduct = this.$store.state.products
      const product = unfilteredProduct.filter((product) => product.id === id)
      return product[0]
    },
    priceInRupiah () {
      const price = this.spesificProduct.price
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    },
    userRole () {
      return Number(localStorage.getItem('role'))
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: #34495e;
  font-size: 30px;
}
a :hover{
  color: #2980b9;
}
.smaller{
  font-size: 17px;
}

</style>
