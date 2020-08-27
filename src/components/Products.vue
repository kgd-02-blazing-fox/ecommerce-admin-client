<template>
  <div class="row">
    <!-- cards -->
    <ProductCards
      v-for="(product,i) in filteredProducts"
      :key="i"
      :index="i"
      :id="product.id"
      :name="product.name"
      :image_url="product.image_url"
      :price="product.price"
      :stock="product.stock"
      :category="product.category"
    />
  </div>
</template>

<script>
import ProductCards from './ProductCards.vue'
export default {
  name: 'Products',
  computed: {
    filteredProducts () {
      return this.$store.getters.storeFilteredProducts
    }
  },
  components: {
    ProductCards
  }
}
</script>

<style>
</style>
