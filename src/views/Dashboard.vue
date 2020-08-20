<template>
  <div class="container-fluid dashboard">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col mt-1">
              <h1><i class="fas fa-user-shield"></i> admin dashboard</h1>
              {{getDate}}
            </div>
            <div class="col-lg col-md-6 col-sm-6 col-xs-6">
              <Nav/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TableInfo/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav.vue'
import TableInfo from '../components/TableInfo.vue'
import io from 'socket.io-client'

export default {
  name: 'Dashboard',
  data () {
    return {
    }
  },
  components: {
    Nav,
    TableInfo
  },
  methods: {
    getChange () {
      this.$store.dispatch('fetchProducts')
    }
  },
  computed: {
    getDate () {
      let day
      switch (new Date().getDay()) {
        case 0:
          day = 'Sunday'
          break
        case 1:
          day = 'Monday'
          break
        case 2:
          day = 'Tuesday'
          break
        case 3:
          day = 'Wednesday'
          break
        case 4:
          day = 'Thursday'
          break
        case 5:
          day = 'Friday'
          break
        case 6:
          day = 'Saturday'
      }
      const calender = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
      const today = day + ', ' + calender
      return today
    }
  },
  created () {
    console.log(this.$route.name)
  },
  mounted () {
    this.socket = io.connect('http://localhost:3000')

    this.socket.on('init', function (payload) {
      console.log(payload)
      console.log('init invoked')
    })

    this.socket.on('CHANGE', () => {
      this.getChange()
      console.log('KEPANGGILLLLLLLLLLLLLLLLLLLLLL')
    })
  }
}
</script>

<style>
i{
  color: #34495e;
}
</style>
