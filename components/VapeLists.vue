<template>
  <v-container grid-list-lg class="pa-0">
    <Banner />
    <h1 class="font-weight-bold black--text text-center">
      Our products
    </h1>
    <v-layout justify-center row wrap>
      <v-flex
        v-for="product in products"
        :key="product.id"
        xs6
        lg3
        md4
        sm6
      >
        <ProductCard :product="product" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  components: {
    ProductCard: () => import('@/components/ProductCard.vue'),
    Banner: () => import('@/components/Banner.vue')
  },

  data: () => ({
    products: []
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.$store
        .dispatch('product/getProducts')
        .then((response) => {
          this.products = response.data.result.data
        })
    }
  }
}
</script>
