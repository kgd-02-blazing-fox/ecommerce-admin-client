<template>
  <div>
    <div class="row" id="myOrderNavbar">
      <div class="col m6 right-align">
        <router-link :to="'/order'"><button class="btn btn-large white grey-text text-darken-3 z-depth-0">Current Order</button></router-link>
      </div>
      <div class="col m6 left-align">
        <router-link :to="'/order/history'"><button class="btn btn-large white grey-text text-darken-3 z-depth-0">Order History</button></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Order'
}
</script>

<style scoped>
  #myOrderNavbar {
    padding-top: 20px;
  }
  button {
    font-weight: bolder;
  }
</style>
