<template>
  <div>
    <v-container grid-list-lg class="pa-0">
      <h1 class="font-weight-bold black--text text-center">
        VAPE-in-DUBAI
      </h1>
      <v-layout row wrap>
        <v-flex
          v-for="category in categories"
          :key="category.id"
          xs4
          sm3
          md2
          lg2
        >
          <v-card light>
            <v-img :aspect-ratio="16/13" :src="category.attachments[0].fileUrl" />
            <v-card-text class="pt-2">
              <h2 class="text-center">
                {{ category.name }}
              </h2>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    categories: []
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.$store
        .dispatch('category/getCategories')
        .then((response) => {
          this.categories = response.data.result.data
        })
    }
  }
}
</script>
