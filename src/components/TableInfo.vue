<template>
  <div class="container-fluid mt-1">
    <div class="row">
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="container border">
                <h5 class="mt-1">total item(s): {{this.$store.state.products.length}}</h5>
                  <div class="row">
                  <div class="col">
                    <router-link id="noDecoration" :to="`/dashboard/productDetail/${newProduct.id}`">
                      <img class="responsive" :src="newProduct.image_url" width=50%>
                    </router-link>
                    <blockquote>
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
blockquote {
  margin-left: 0;
  text-align: left;
}
</style>
