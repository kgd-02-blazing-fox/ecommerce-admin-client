<template>
  <div class="col-lg-4 col-md-6 col-sm-12 mt-3">
    <div class='card'>
      <img class='rounded card-img-top responsive' :src='item.image_url' @click="details(item.id)" alt='Card image cap'  />
      <div class='card-body'>
        <h5 class='card-title'>{{item.name}}</h5>
        <div class="container card-text">
          <div class="row">
            <a href='#' @click="details(item.id)">
              <i class="fas fa-info-circle fa-2x"></i>
            </a>
            <div class="col">
              <div class="row">
                <div class="col">
                <b class=''> price </b>
                </div>
                <div class="col">
                <p class=''> {{priceInRupiah}} </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <div class="col">
                <b class=''> stock</b>
                </div>
                <div class="col">
                <p class=''> {{item.stock}} pc(s) </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['item'],
  methods: {
    details (id) {
      this.$router.push('dashboard/productDetail/' + id)
    }
  },
  computed: {
    priceInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.item.price)
    }
  }
}
</script>

<style scoped>
.responsive {
  max-width: 100%;
  height: auto;
  cursor: pointer;
}

h5{
  text-transform: uppercase;
}

</style>
