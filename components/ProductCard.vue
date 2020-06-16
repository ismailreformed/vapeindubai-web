<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 15 : 1"
        :class="{ 'on-hover': hover }"
        light
        class="mx-auto"
        color="grey lighten-4"
        max-width="600"
      >
        <v-img :aspect-ratio="16/14" :src="product.attachments[0].fileUrl">
          <v-card-title class="pa-0 ma-0">
            <v-chip
              v-for="tag in product.tags"
              :key="tag"
              class="ml-1"
              dense
              color="primary"
              text-color="white"
            >
              {{ tag }}
            </v-chip>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn class="ma-1" small fab color="white" v-on="on">
                  <v-icon color="red">
                    mdi-heart
                  </v-icon>
                </v-btn>
              </template>
              <span>Add to wishlist</span>
            </v-tooltip>
          </v-card-title>
        </v-img>
        <v-card-text class="pa-2" style="position: relative;">
          <v-btn
            absolute
            color="orange"
            class="white--text"
            fab
            small
            right
            top
            @click.stop="dialog = true"
          >
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
          <v-chip
            v-for="category in product.categories"
            :key="category"
            class="mr-1 hidden-sm-and-down"
            color="primary"
            text-color="white"
          >
            {{ category }}
          </v-chip>
          <strong
            v-for="(category,i) in product.categories"
            :key="i"
            class="hidden-md-and-up mr-2"
            text-color="blue--text"
          >{{ category }}</strong>
          <h2 class="black--text font-weight-bold">
            {{ product.name }}
            <span class="hidden-sm-and-down">( {{ product.surname }} )</span>
          </h2>
          <div class="my-1 subtitle-1">
            AED •
            <strong>{{ product.price }}</strong>
          </div>
          <!-- <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">4.5 (413)</div>
          </v-row>-->

          <div class="hidden-sm-and-down">
            {{ product.shortIntroduction.substr(0, 100) }}...
          </div>
        </v-card-text>
      </v-card>
    </v-hover>

    <v-dialog v-model="dialog" max-width="900">
      <DetailsCard :product="product" @closeDetailCard="dialog = !dialog" />
    </v-dialog>
  </div>
</template>
<style>
.v-card--reveal {
  opacity: 0.6;
}
</style>

<script>
export default {

  components: {
    DetailsCard: () => import('@/components/DetailsCard.vue')
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      dialog: false
    }
  }
}
</script>
