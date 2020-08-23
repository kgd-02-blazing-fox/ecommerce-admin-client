<template>
  <form @submit.prevent="addProduct">
    <label for="add-name">Product name:</label>
    <br />
    <input type="text" name="add-name" id="add-name" class="w-75" placeholder="eg. Kursi" v-model="name"/>
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
        v-for="(category,i) in filteredStoreCategories"
        :key="i"
        :value="category"
      >{{category}}</option>
    </datalist> <br> <br>
    <input type="submit" value="Confirm" class="btn btn-dark" />
    <br v-if="!successMessage && !errorMessage">
    <div class="text-center">
      <br>
      <p v-if="successMessage" class="green">{{successMessage}}</p>
      <p v-if="errorMessage" class="red">{{errorMessage}}</p>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddFormProducts',
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
      category: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    addProduct () {
      if (!this.name) this.errorMessage = 'Please fill in the product name'
      else if (!this.image_url) this.errorMessage = 'Please fill in the product image'
      else if (!this.price) this.errorMessage = 'Please fill in the product price'
      else if (!this.category) this.errorMessage = 'Please fill in the category'
      else {
        const name = this.name.slice(0, 1).toUpperCase() + this.name.slice(1)
        const category = this.category.slice(0, 1).toUpperCase() + this.category.slice(1)
        const payload = {
          name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock,
          category
        }
        this.$store.dispatch('postProducts', payload)
          .then(response => {
            this.errorMessage = ''
            this.name = ''
            this.image_url = ''
            this.price = ''
            this.stock = ''
            this.category = ''
            this.successMessage = 'Products successfully added'
            setTimeout(() => {
              this.successMessage = ''
              this.$emit('AddFormProducts_emitChanges')
            }, 3000)
          })
          .catch(err => { this.errorMessage = err.response.data.message })
      }
    }
  },
  computed: {
    filteredStoreCategories () {
      return this.$store.getters.storeFilteredCategories
    }
  }
}
</script>

<style scoped>
  .red {
    color: red;
  }
  .green {
    color: green;
  }
</style>
