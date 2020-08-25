<template>
  <div>
    <h3 class="center-align blue-text">Current Order</h3>
    <NotifSection></NotifSection>
    <ErrorSection></ErrorSection>
    <div v-if="currentOrders.length !== 0" class="">
      <table class="highlight">
        <thead>
          <tr>
              <th class="center-align">Product Name</th>
              <th class="center-align">Detail</th>
              <th class="center-align">Quantity</th>
              <th class="center-align">Total Price</th>
              <th class="center-align">Order Date</th>
              <th class="center-align">Status</th>
              <th class="center-align">Date Updated</th>
              <th class="center-align">Action</th>
          </tr>
        </thead>
        <tbody v-for="order in currentOrders" :key="order.id">
          <tr>
            <td class="center-align">{{ order.Product.name }}</td>
            <td class="center">
              <router-link :to="`/order/detail/${order.id}`">Detail Order</router-link>
            </td>
            <td class="center-align">{{ order.quantity }}</td>
            <td class="center-align">{{ priceConverter(order.Product.price * order.quantity) }}</td>
            <td class="center-align">{{ dateConverter(order.createdAt) }}</td>
            <td class="boldStatus center-align">{{ order.status.toUpperCase() }}</td>
            <td class="center-align">{{ dateConverter(order.updatedAt) }}</td>
            <td class="center">
              <button class="btn btn-small blue lighten-2" v-if="order.status == 'Paid'" @click.prevent="changeStatus(order.id,'On Process')">On Process</button>
              <button class="btn btn-small blue darken-1" v-else-if="order.status == 'On Process'" @click.prevent="changeStatus(order.id,'Shipping')">Shipping</button>
              <button class="btn btn-small blue darken-3" v-else-if="order.status == 'Shipping'" @click.prevent="changeStatus(order.id,'Finish')">Finish</button>
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
import server from '../api/index'
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'CurrentOrder',
  components: {
    NotifSection, ErrorSection
  },
  computed: {
    orders () {
      return this.$store.state.orders
    },
    currentOrders () {
      var detail = []
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].status === 'Paid' || this.orders[i].status === 'On Process' || this.orders[i].status === 'Shipping') {
          detail.push(this.orders[i])
        }
      }
      return detail
    }
  },
  methods: {
    priceConverter: priceConverter,
    dateConverter: dateConverter,
    changeStatus (id, status) {
      server({
        method: 'patch',
        url: '/user/order',
        headers: {
          token: localStorage.token
        },
        data: {
          id,
          status
        }
      })
        .then(response => {
          this.$store.dispatch('fetchProductsList')
          this.$store.dispatch('fetchAllOrder')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
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
  img {
    height: 100px;
  }
  .boldStatus {
    font-weight: bold;
    color: green;
  }
  button {
    font-size: 12px;
  }
</style>
