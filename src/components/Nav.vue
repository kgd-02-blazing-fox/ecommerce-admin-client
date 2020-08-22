<template>
  <div class="mt-3" id="nav">
    <div class="row">
      <div class="col">
        <router-link to="/dashboard">
          <i class="fas fa-home"></i> home
        </router-link>
      </div>
      <div v-if="userRole === 1" class="col">
        <router-link to="/dashboard/addProduct">
          <i class="fas fa-plus-circle"></i> add product
        </router-link>
      </div>
      <div class="col">
        <a href="#" @click.prevent="logout">
          <i class="fas fa-sign-out-alt"></i> logout
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  computed: {
    userRole () {
      return Number(localStorage.getItem('role'))
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 10px;
  font-size: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2980b9;
}
</style>
