<template>
  <div>
    <section id="loginForm">
      <div class="container">
        <div class="col s12 m4">
          <h4 class="center blue-text text-darken-2">Login</h4>
          <NotifSection></NotifSection>
          <ErrorSection></ErrorSection>
          <div class="row">
            <div class="input-field col s12 m4 push-m4">
              <input id="email" v-model="user.email" type="email" class="validate" required>
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m4 push-m4">
              <input id="password" v-model="user.password" type="password" class="validate" required>
              <label for="password">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12 m2 push-m5">
              <button type="submit" class="btn blue darken-3" @click.prevent="loginUser">Login</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import server from '../api/index'
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'LandingPage',
  components: {
    NotifSection, ErrorSection
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    changeLoginStatus () {
      this.$store.commit('changeLoginStatus')
    },
    loginUser () {
      server({
        method: 'post',
        url: '/user/login',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('currentUserId', response.data.data.id)
          localStorage.setItem('currentUserName', response.data.data.name)
          this.changeLoginStatus()
          this.$router.push({ name: 'Dashboard' })
          this.user.email = ''
          this.user.password = ''
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
          console.log(err.response.data.err)
        })
    }
  },
  created () {
    this.$store.commit('changeLoginStatus')
    if (localStorage.token) {
      this.$router.push({ name: 'Dashboard' })
      this.$store.dispatch('fetchProductsList')
    }
  }
}
</script>

<style>

</style>
