<template>
  <div>
    <div class="container">
      <h4 class="center">Products</h4>
      <div class="center">
        <router-link to="/product/show_all"><a>Show All Products</a></router-link> |
        <router-link to="/product/add_product"><a>Add Product</a></router-link>
      </div>
      <NotifSection v-if="currentNotif"></NotifSection>
      <ErrorSection v-if="currentErr"></ErrorSection>
      <router-view/>
    </div>
  </div>
</template>

<script>
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'Product',
  components: {
    NotifSection, ErrorSection
  },
  computed: {
    productsList () {
      return this.$store.state.productsList
    },
    currentNotif () {
      return this.$store.state.currentNotif
    },
    currentErr () {
      return this.$store.state.currentErr
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'LandingPage' })
    } else {
      this.$router.push({ name: 'ProductsTable' })
    }
  }
}
</script>

<style>

</style>
