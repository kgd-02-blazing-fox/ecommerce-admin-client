<template>
  <div class="container mt-2 shadow">
      <!-- nav  -->
      <div class="row">
        <nav class="navbar navbar-light bg-dark justify-content-between w-100">
          <div class="container">
            <span class="navbar-brand text-light">E-commerce CMS</span>
            <button class="btn btn-outline-light float-right" @click.prevent="adminLogout">Logout</button>
          </div>
        </nav>
      </div>

      <div class="row">
        <!-- left container -->
        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 border overflow-auto bg-light"
          style="min-height: 90vh;max-height: 90vh;min-width: 50%;">
          <router-view @ProductInfo_emitChanges="CmsLatestChanges"></router-view>

        </div>

        <!-- right container -->
        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12 border p-4 text-right bg-light" style="min-height: 15vh;">
          <div class="text-center"><a @click.prevent="filterPage">Filter</a> | <a @click.prevent="addPage">Add Products</a></div>
          <br>

          <!-- filter -->
          <div v-if="currentOption === 'filter'">
            <label for="search">Filter by Category:</label> <br>
            <select name="search" id="search" class="w-100" v-model="filterCategory">
              <option value="" selected>None</option>
              <option
                v-for="(category,i) in filteredStoreCategories"
                :key="i"
                :value="category">
                {{category}}
              </option>
            </select>
          <label for="search">Search:</label> <br>
          <input type="text" name="" id="search" class="w-100" placeholder="Try combining with filter!" v-model="filterName">
          <br>
          <br>
          <div class="text-center">
          <a class="text-secondary" @click.prevent="resetSearch">Reset Filter</a>
          </div>
          </div>

          <!-- add new item -->
          <div v-if="currentOption === 'add'">
            <AddFormProducts
              @AddFormProducts_emitChanges="CmsLatestChanges"
            />
          </div>
        </div>
        <hr>

      </div>
    </div>
</template>

<script>
import AddFormProducts from '../components/AddFormProducts.vue'
import io from 'socket.io-client'

export default {
  name: 'Cms',
  data () {
    return {
      currentOption: 'filter',
      filterCategory: '',
      filterName: ''
    }
  },
  updated () {
    if (this.currentOption === 'filter') {
      this.$store.commit('SET_FILTER', this.filterCategory)
      this.$store.commit('SET_SEARCH', this.filterName)
    }
  },
  mounted () {
    this.$store.dispatch('getProducts')
    this.socket = io.connect('https://ecommerce-cms-laurentius.herokuapp.com/')

    this.socket.on('latestUpdate', () => {
      this.$store.dispatch('getProducts')
    })
  },
  methods: {
    CmsLatestChanges () {
      this.socket.emit('afterUpdate')
      this.$store.dispatch('getProducts')
    },
    adminLogout () {
      localStorage.removeItem('access_token')
      this.socket.emit('leave')
      this.$router.push('/')
    },
    filterPage () {
      this.currentOption = 'filter'
    },
    addPage () {
      this.currentOption = 'add'
    },
    resetSearch () {
      this.filterCategory = ''
      this.filterName = ''
    }
  },
  computed: {
    filteredStoreCategories () {
      return this.$store.getters.storeFilteredCategories
    }
  },
  components: {
    AddFormProducts
  }
}
</script>

<style scoped>
  div a:hover {
    cursor: pointer;
  }
</style>
