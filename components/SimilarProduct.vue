<template>
  <v-container grid-list-lg class="pa-0">
    <span class="font-weight-bold black--text text-center title">You maybe intersted in..</span>
    <v-layout justify-center row wrap>
      <v-flex
        v-for="i in 4"
        :key="i"
        xs12
        lg3
        md4
        sm6
      >
        <ProductCard />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  components: {
    ProductCard: () => import('@/components/ProductCard.vue')
  },

  data: () => ({}),

  methods: {}
}
</script>
