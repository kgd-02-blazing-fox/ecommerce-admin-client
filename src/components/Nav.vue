<template>
  <div class="mt-2" id="nav">
    <router-link to="/dashboard">
    <i class="fas fa-home"></i> home
    </router-link> |
    <router-link to="/dashboard/addProduct">
    <i class="fas fa-plus-circle"></i> add product
    </router-link> |
    <a href="#" @click.prevent="logout">
      <i class="fas fa-sign-out-alt"></i> logout
    </a>
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
  }
}
</script>

<style scoped>
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2980b9;
}
</style>
