<template>
  <div v-if="showData" :key="key" style="margin-top: 100px;">
    <DetailsCard :product="product" />
  </div>
</template>
<script>
import DetailsCard from '@/components/DetailsCard.vue'
export default {
  components: {
    DetailsCard
  },

  data () {
    return {
      product: {},
      showData: false,
      key: 1
    }
  },

  computed: {
    paramsId () {
      return this.$route.params.id
    }
  },

  created () {
    this.getSingleProductData()
  },

  methods: {
    getSingleProductData () {
      console.log(this.paramsId)
      this.$store
        .dispatch('product/getProduct', this.paramsId)
        .then((response) => {
          const product = response.data
          product.quantity = this.$route.query.quantity
          this.product = product
        })
        .finally(() => {
          this.showData = true
          this.key++
        })
    }
  }
}
</script>
