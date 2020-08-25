<template>
  <div id="dasboardPage">
    <div class="center">
      <div class="row">
        <div class="col m4" id="dashboardImg">
          <router-link to="/product"><img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBZ4ppb.img?h=416&w=799&m=6&q=60&u=t&o=f&l=f"><h5>PRODUCTS</h5></router-link>
        </div>
        <div class="col m4">
          <router-link to="/order"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRclu1oJgW-9-qhFm6oViHBUaRkIHD3_hdiZQ&usqp=CAU"><h5>ORDERS</h5></router-link>
        </div>
        <div class="col m4">
          <router-link to="/customer"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80"><h5>CUSTOMERS</h5></router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    productsList () {
      return this.$store.state.productsList
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
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

<style scoped>
  #dasboardPage {
    padding-top: 100px;
  }
  img {
    width: 450px;
    height: 300px;
    object-fit: cover;
  }
</style>
