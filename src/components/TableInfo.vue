<template>
  <div class="container-fluid mt-1">
    <div class="row">
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="container bgcol">
          <div class="container colgrad">
            <h5 class="mt-1">total item(s): {{this.$store.state.products.length}}</h5>
              <div class="row">
                <div class="col">
                  <router-link id="noDecoration" :to="`/dashboard/productDetail/${newProduct.id}`">
                    <img class="responsive rounded" :src="newProduct.image_url" width=50%>
                  </router-link>
                  <blockquote class="mt-2">
                    <b>latest input</b><br>
                    <b>name :</b> {{newProduct.name}} <br>
                    <b>current stock :</b> {{newProduct.stock}} <br>
                    <b>input time :</b> {{newProduct.createdAt}}
                  </blockquote>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-6 col-sm-6">
        <TableList/>
      </div>
    </div>
  </div>
</template>

<script>
import TableList from '../components/TableList'

export default {
  name: 'TabelInfo',
  components: {
    TableList
  },
  methods: {
  },
  created () {
  },
  computed: {
    newProduct () {
      const unsort = this.$store.state.products
      const newInput = unsort.filter((a) => a.id === unsort.length)
      return newInput[0]
    }
  }
}
</script>

<style scoped>
.bgcol{
  border: solid;
  border-radius: 12px;
  border-color: #7f8c8d;
  border-width: 1px;
  background-color: #2C3E50;
  color: #ecf0f1;
}

blockquote {
  margin-left: 0;
  border-radius: 5px;
  text-align: left;
  background-color: #ecf0f1;
  color: #343A40;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
