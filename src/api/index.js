import axios from 'axios'

const server = axios.create({
  baseURL: 'https://e-commerce-cms-idz.herokuapp.com'
  // baseURL: 'http://localhost:3000'

})

export default server


// ## Data
// -----
// * email: citranur@contoh.com
// * password: 123456

// * Client-Side Deploy Link:
//     https://e-commerce-cms-idz.herokuapp.com/

// * Server-Side Deploy Link /
//     API Endpoint Base URL:
//     https://e-commerce-cms-admin-client.web.app/

// ---
