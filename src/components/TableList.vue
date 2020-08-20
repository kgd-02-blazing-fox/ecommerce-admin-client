<template>
  <div id="table" class="border">
    <table class="table">
      <thead class="thead-dark" id="fixedHead">
        <tr>
          <th scope="col" colspan="4">product database</th>
        </tr>
      </thead>
      <thead class="thead-dark">
        <tr>
          <th scope="col">id</th>
          <th scope="col">name</th>
          <th scope="col">price</th>
          <th scope="col">stock</th>
        </tr>
      </thead>
      <TableDetail
        v-for="data in products"
        :key="data.id"
        :data="data"
        />
    </table>
  </div>
</template>

<script>
import TableDetail from '../components/TableDetail'
export default {
  name: 'TableList',
  components: {
    TableDetail
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
#table {
  overflow-y: auto;
  overflow-x: auto;
  height: 42vh;
  max-height: 42vh;
  border-collapse: collapse
}
#fixedHead{
  position: sticky;
  top: 0;
}
</style>
