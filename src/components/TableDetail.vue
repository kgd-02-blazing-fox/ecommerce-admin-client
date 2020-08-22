<template>
  <tbody class="">
    <tr>
      <th scope="row">{{data.id}}</th>
    <router-link id="noDecoration" :to="`/dashboard/productDetail/${data.id}`">
      <td><i class="fas fa-search-plus"></i> {{data.name}}</td>
    </router-link>
      <td>{{priceInRupiah(data.price)}}</td>
      <td>{{data.stock}}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableDetail',
  props: ['data'],
  methods: {
    priceInRupiah (money) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(money)
    }
  }
}
</script>

<style scoped>
tbody{
  color: #34495e;
}
#noDecoration{
  text-decoration: none !important;
  color: #34495e;
}
</style>
