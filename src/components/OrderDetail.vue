<template>
  <div class="container">
    <h4 class="center blue-text">Detail Order ID:{{order.id}}</h4>
    <div class="row">
      <div class="col s12 m6 blue-text text-darken-3">
        <h5>Product</h5>
        <p>{{ order.Product.name }}</p>
        <h5>Quantity</h5>
        <p>{{ order.quantity}}</p>
        <h5>Status</h5>
        <p>{{ order.status }}</p>
        <h5>Total Paid</h5>
        <p>{{ priceConverter(order.Product.price * order.quantity) }}</p>
        <h5>Order Date</h5>
        <p>{{ dateConverter(order.createdAt) }}</p>
      </div>
      <div class="col s12 m6 blue-text text-darken-3">
        <h5 class="center">Customer Info</h5>
        <h6>Name</h6>
        <p>{{ order.Cart.Customer.name }}</p>
        <h6>Email</h6>
        <p>{{ order.Cart.Customer.email }}</p>
        <h6>Phone</h6>
        <p>{{ order.Cart.Customer.phone }}</p>
        <h6>Address</h6>
        <p>{{ order.Cart.Customer.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import priceConverter from '../helpers/priceConverter'
import dateConverter from '../helpers/dateConverter'

export default {
  name: 'OrderDetail',
  computed: {
    order () {
      const orders = this.$store.state.orders
      const id = this.$route.params.id
      var detail = {}
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === +id) {
          detail = orders[i]
          break
        }
      }
      return detail
    }
  },
  methods: {
    priceConverter: priceConverter,
    dateConverter: dateConverter
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
  h4, h5, h6{
    font-weight: bolder;
  }
  p {
    color: black;
  }
</style>
