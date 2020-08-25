<template>
  <div>
    <h3 class="center-align blue-text">Order History</h3>
    <div v-if="finishOrders.length !== 0" class="">
      <table class="highlight">
        <thead>
          <tr>
              <th class="center-align">Product Name</th>
              <th class="center-align">Image</th>
              <th class="center-align">Quantity</th>
              <th class="center-align">Total Price</th>
              <th class="center-align">Order Date</th>
              <th class="center-align">Status</th>
              <th class="center-align">Finish Date</th>
              <th class="center-align">Detail</th>
          </tr>
        </thead>
        <tbody v-for="order in finishOrders" :key="order.id">
          <tr>
            <td class="center-align">{{ order.Product.name }}</td>
            <td class="center">
              <img :src="order.Product.image_url">
            </td>
            <td class="center-align">{{ order.quantity }}</td>
            <td class="center-align">{{ priceConverter(order.Product.price * order.quantity) }}</td>
            <td class="center-align">{{ dateConverter(order.createdAt) }}</td>
            <td class="boldStatus center-align">{{ order.status.toUpperCase() }}</td>
            <td class="center-align">{{ dateConverter(order.updatedAt) }}</td>
            <td class="center">
              <router-link :to="`/order/detail/${order.id}`">Detail Order</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import priceConverter from '../helpers/priceConverter'
import dateConverter from '../helpers/dateConverter'

export default {
  name: 'OrderHistory',
  computed: {
    orders () {
      return this.$store.state.orders
    },
    finishOrders () {
      var detail = []
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].status === 'Finish') {
          detail.push(this.orders[i])
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
  img {
    height: 100px;
  }
  .boldStatus {
    font-weight: bold;
    color: green;
  }
</style>
