<template>
  <div class="container mt-5">
      <h1 class="my-5">Welcome to the E-commerce Content Management System!</h1>
      <div class="row">
        <div class="col-xs-2 col-sm-2 col-md-3 col-lg-3 col-xl-3">
        </div>
        <div class="col-xs-8 col-sm-8 col-md-6 col-lg-6 col-xl-6">
          <div class="card shadow">
            <div class="card-header text-center">
              <h3 class="mb-0">Login to E-commerce</h3>
            </div>
            <div class="card-body container">
                  <br>
                  <form @submit.prevent="view_adminLogin">
                    <div class="form-group px-5">
                      <label for="email">Email</label> <br>
                      <input type="email" class="form-control" v-model="email" id="email" placeholder="admin@mail.com">
                    </div>
                  <div class="form-group px-5">
                    <label for="password">Password</label> <br>
                    <input type="password" class="form-control" v-model="password" id="password" placeholder="****">
                  </div>
                  <div class="form-group text-center">
                    <input type="submit" class="btn btn-success w-50" value="Go in!"> <br> <br>
                    <br v-if="!errorMessage">
                    <p class="red" v-if="errorMessage">{{errorMessage}}</p>
                  </div>
                  </form>
            </div>
            <div class="card-footer text-muted"><br></div>
          </div>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-3 col-lg-3 col-xl-3">
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    view_adminLogin () {
      if (!this.email) this.errorMessage = 'Please fill in the email'
      else if (!this.password) this.errorMessage = 'Please fill in the password'
      else {
        axios({
          method: 'POST',
          url: 'https://ecommerce-cms-laurentius.herokuapp.com/login',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(response => {
            localStorage.setItem('access_token', response.data.access_token)
            this.$router.push('/cms')
          })
          .catch(err => { this.errorMessage = err.response.data.message })
      }
    }
  }
}
</script>

<style scoped>
  h1 {
    text-shadow: 1px 2px 2px rgb(139, 139, 139);
  }
  .red {
    color: red;
  }
</style>
