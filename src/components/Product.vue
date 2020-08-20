<template>
  <div class='container'>
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
