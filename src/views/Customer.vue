<template>
  <div>
    <h4 class="center-align">Customers</h4>
  </div>
</template>

<script>
export default {
  name: 'Customer',
  created () {
    if (!localStorage.token) {
      this.$store.commit('changeLoginStatus')
      this.$router.push({ name: 'LandingPage' })
    } else {
      this.$store.dispatch('fetchProductsList')
      this.$store.dispatch('fetchAllOrder')
    }
  }
}
</script>

<style>

</style>
