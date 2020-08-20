<template>
  <div id="table" class="border rounded">
    <table class="table table-hover">
      <thead class="thead theadcol" id="fixedHead">
        <tr>
          <th scope="col" colspan="4">product database</th>
        </tr>
      </thead>
      <thead class="thead theadcol2">
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
  height: 45vh;
  max-height: 45vh;
  border-collapse: collapse
}
.theadcol{
background-color: #2C3E50;
color: white;
}
.theadcol2{
  background-color: #7f8c8d;
  color: white;
}
#fixedHead{
  position: sticky;
  height: 1hv;
  top: 0;
}
</style>
