<template>
  <div class="container p-5">
    <div class="text-center">
      <img :src="Info.image_url" :alt="Info.name">
      <br>
      <br>
      <div v-if="!formPage">
        <h1>{{Info.name}}</h1>
        <h4 class="text-secondary">Unit Price : {{toRp}}</h4>
        <h4 class="text-secondary">Warehouse Stock : {{Info.stock}}</h4>
        <h4 class="text-secondary">Category : {{Info.category}}</h4>
      </div>
      <div v-if="formPage">

        <form @submit.prevent="editProduct">
          <label for="add-name">Product name:</label>
          <br />
          <input type="text" name="add-name" id="add-name" class="w-75" placeholder="eg. Kursi" v-model="name" />
          <br />
          <label for="add-url">Image Url:</label>
          <br />
          <textarea name="add-url" id="add-url" class="w-75" rows="4" v-model="image_url"></textarea>
          <br />
          <label for="add-price">Price (in Rp):</label>
          <br />
          <input type="number" name="add-price" id="add-price" class="w-75" placeholder="15000" v-model="price" />
          <br />
          <label for="add-stock">Stock:</label>
          <br />
          <input type="number" name="add-stock" id="add-stock" class="w-25" placeholder="24" v-model="stock" />
          <br />
          <label for="add-category">Category:</label>
          <br />
          <input
            type="text"
            name="add-category"
            list="add-category"
            placeholder="Select one"
            class="w-75"
            v-model="category"
          />
          <datalist id="add-category">
            <option
              v-for="(speccategory,i) in filteredStoreCategories"
              :key="i"
              :value="speccategory"
            >{{speccategory}}</option>
          </datalist> <br> <br>
          <input type="submit" value="Confirm" class="btn btn-dark" />
          <br v-if="!successMessage && !errorMessage">
          <div class="text-center">
            <br>
            <p v-if="errorMessage" class="red">{{errorMessage}}</p>
          </div>
        </form>

      </div>
    </div>
    <div class="text-center">
      <span v-if="successMessage" class="green">{{successMessage}}</span>
    </div>
    <div class="pt-5">
      <button class="btn btn-success" @click.prevent="back">Back to Catalog</button>
      <div v-if="!formPage" class="float-right">
      <button class="btn btn-dark mx-1 smol" @click.prevent="deleteProduct">Delete</button>
      <button class="btn btn-secondary mx-1 smol" @click.prevent="toggleEdit">Edit</button>
      </div>
      <button class="btn btn-secondary float-right smol" @click.prevent="toggleEdit" v-if="formPage">Cancel</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ProductInfo',
  data () {
    return {
      formPage: false,
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
      category: '',
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    toggleEdit () {
      this.formPage = !this.formPage
      const payload = this.$store.state.products.filter(el => { return el.id === Number(this.$route.params.id) })[0]
      if (this.formPage) {
        this.name = payload.name
        this.image_url = payload.image_url
        this.price = payload.price
        this.stock = payload.stock
        this.category = payload.category
      }
    },
    deleteProduct () {
      if (confirm('Are you sure you want to delete this item?')) {
        this.$store.dispatch('delProducts', this.$route.params.id)
          .then(response => {
            this.successMessage = 'Product deleted'
            setTimeout(() => {
              this.successMessage = ''
              this.$router.push('/cms')
              this.$emit('ProductInfo_emitChanges')
            }, 1500)
          })
      }
    },
    editProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category
      }
      this.$store.dispatch('putProducts', payload, this.$route.params.id)
        .then(response => {
          this.successMessage = 'Product updated'
          setTimeout(() => {
            this.successMessage = ''
            this.$router.push('/cms')
            this.$emit('ProductInfo_emitChanges')
          }, 1500)
        })
        .catch(err => { this.errorMessage = err.response.data.message })
    }
  },
  computed: {
    Info () {
      return this.$store.state.products.filter(el => { return el.id === Number(this.$route.params.id) })[0]
    },
    toRp () {
      const value = String(this.$store.state.products.filter(el => { return el.id === Number(this.$route.params.id) })[0].price)
      if (value === '') return 'Rp. 0,00'
      let count = String(value).length % 3
      if (count === 0) count = 3
      let cont = 'Rp. '
      for (let i = 0; i < String(value).length; i++) {
        cont += String(value)[i]
        count--
        if (count === 0) {
          i === String(value).length - 1 ? cont += '.' : cont += ','
          count = 3
        }
      }
      return cont + '00'
    },
    filteredStoreCategories () {
      return this.$store.getters.storeFilteredCategories
    }
  }
}
</script>

<style scoped>
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 0 auto
  }
  h2 {
    margin-top: 30px;
  }
  .red {
    color: red;
  }
  .green {
    color: green;
  }
  .smol {
    max-width: 100px
  }
</style>
