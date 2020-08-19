<template>
  <div class="container-fluid dashboard">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col mt-1">
              <h1>admin dashboard</h1>
            </div>
            <div class="col-lg col-md-6 col-sm-6 col-xs-6">
              <Nav/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav.vue'

export default {
  name: 'Dashboard',
  data () {
    return {
    }
  },
  components: {
    Nav
  },
  created () {
    console.log(this.$route.name)
  }
}
</script>

<style>
i{
  color: #34495e;
}
</style>
