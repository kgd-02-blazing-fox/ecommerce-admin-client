<template>
  <div class="container mt-2">
    <img class="img-fluid" src="../assets/vue-commerce.png" width="50%" alt="">
    <h1>admin</h1>
    <div class="container">
      <div class="row">
        <div class="col col-lg-6 col-md-12 col-sm-12 border rounded bgcol">
          <form class="m-3" @submit.prevent='login'>
            <div class="form-group">
              <label for="loginEmail">email address</label>
              <input
              type="email"
              class="form-control"
              placeholder="Enter email"
              v-model='loginEmail'
              required>
            </div>
            <div class="form-group">
              <label for="loginPassword">password</label>
              <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model='loginPassword'
              required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServerAPI from '../axios/ServerAPI'

export default {
  name: 'Login',
  data () {
    return {
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    login () {
      ServerAPI({
        method: 'POST',
        url: 'admin',
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('role', 1)
          this.$router.push('/dashboard')
        })
        .catch((err) => {
          this.$router.push('/')
          console.log(err)
        })
        .finally((_) => {
          this.loginEmail = ''
          this.loginPassword = ''
        })
    }
  }
}
</script>

<style scoped>
div{
  justify-content: center;
  align-items: center;
}
label{
  color: white;
}
.bgcol{
  background-color: #2c3e50;
}
</style>
