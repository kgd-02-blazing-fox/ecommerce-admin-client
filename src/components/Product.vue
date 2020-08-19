<template>
  <div class='container'>
    <div class="row">
      <div class="col">
        <h4 class="mt-3">{{getDate}}</h4>
      </div>
      <div class="col">
        <h3 class="mt-3">total item(s): {{this.$store.state.products.length}}</h3>
      </div>
    </div>
    <div class="container">
      <div class="row m-2">
      <ProductCard
      v-for="item in products"
      :key="item.id"
      :item="item"
      />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'Product',
  components: {
    ProductCard
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    getDate () {
      let day
      switch (new Date().getDay()) {
        case 0:
          day = 'Sunday'
          break
        case 1:
          day = 'Monday'
          break
        case 2:
          day = 'Tuesday'
          break
        case 3:
          day = 'Wednesday'
          break
        case 4:
          day = 'Thursday'
          break
        case 5:
          day = 'Friday'
          break
        case 6:
          day = 'Saturday'
      }
      const calender = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
      const today = day + ', ' + calender
      return today
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  justify-content: center;
}
</style>
