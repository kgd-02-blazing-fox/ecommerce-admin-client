<template>
    <!-- cards -->
    <router-link :to="`/cms/${id}`" tag="div" class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6 mt-4 hoverable" style="min-height: 45vh;" @click.prevent="detail(index)">
      <div class="card border-0 shadow" style="width: 100%; min-height: 100%;">
        <img
          class="card-img-top mx-auto my-3"
          :src="image_url"
          alt="No image Preview"
        />
        <div class="card-body text-left pt-0">
          <h5 class="card-title text-center">{{name}}</h5>
          <span class="card-text" style="font-size:1em;">{{toRp}}</span>
          <br />
          <span class="card-text" style="font-size:0.8em;">Stock: {{stock}}</span>
          <br />
          <span class="card-text" style="font-size:0.8em;">Category: {{category}}</span>
          <br />
        </div>
      </div>
    </router-link>
</template>

<script>

export default {
  name: 'Products',
  props: ['index', 'id', 'name', 'image_url', 'price', 'stock', 'category'],
  methods: {
    detail (i) {
      this.$router.push(`/${this.index}`)
    }
  },
  mounted () {

  },
  computed: {
    toRp () {
      const value = this.price
      if (value === '') return 'Rp. 0,00'
      let count = String(value).length % 3
      if (count === 0) count = 3
      let cont = 'Rp. '
      for (let i = 0; i < String(value).length; i++) {
        cont += String(value)[i]
        count--
        if (count === 0) {
          i === String(value).length - 1 ? cont += '.' : cont += ','
          count = 3
        }
      }
      return cont + '00'
    }
  }
}
</script>

<style scoped>
  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
  }
  .hoverable:hover {
    opacity:0.7;
    transition: 0.3s;
    cursor: pointer;
  }
</style>
