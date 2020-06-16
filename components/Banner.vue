<template>
  <v-card light>
    <v-layout class="mt-3 hidden-sm-and-down" row wrap>
      <v-flex class="py-0" xs12>
        <img height="150" width="100%" :src="menuBanner">
      </v-flex>
    </v-layout>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 lg3 md3 sm4>
          <v-layout justify-center row wrap>
            <v-flex align-self-center xs2>
              <v-icon large center color="orange">
                mdi-moped
              </v-icon>
            </v-flex>
            <v-flex xs10>
              <span class="title">
                <strong>FREE DELIVERY</strong>
              </span>
              <p
                class="black--text mb-0"
              >
                For all orders over AED 500. Deliveries Between 11 AM ~ 7PM
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 lg3 md3 sm4>
          <v-layout justify-center row wrap>
            <v-flex align-self-center xs2>
              <v-icon large center color="orange">
                mdi-whatsapp
              </v-icon>
            </v-flex>
            <v-flex xs10>
              <span class="title">
                <strong>ORDER BY WHATSAPP</strong>
              </span>
              <p class="black--text">
                Call us or WHATSAPP us on
                <v-btn
                  text
                  color="green lighten-1"
                  class="px-0"
                  :href="link"
                  target="__blank"
                >
                  {{ whatsapp }}
                </v-btn>
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 lg3 md3 sm4>
          <v-layout justify-center row wrap>
            <v-flex align-self-center xs2>
              <v-icon large center color="orange">
                mdi-credit-card-marker-outline
              </v-icon>
            </v-flex>
            <v-flex xs10>
              <span class="title">
                <strong>PAYMENT</strong>
              </span>
              <p class="black--text">
                Cash on Delivery. And By Card on POS machine
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 lg3 md3 sm4>
          <v-layout justify-center row wrap>
            <v-flex align-self-center xs2>
              <v-icon large center color="orange">
                mdi-help
              </v-icon>
            </v-flex>
            <v-flex xs10>
              <span class="title">
                <strong>WHY US?</strong>
              </span>
              <p class="black--text">
                Online help support. Fastest delivery. Original Product
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import menuBanner from '@/assets/images/menu-banner.jpg'

export default {
  data () {
    return {
      menuBanner
    }
  },

  computed: {
    whatsapp () {
      return process.env.WHATSAPP_NUMBER
    },

    link () {
      return `https://web.whatsapp.com/send?text=Help&phone=${this.whatsapp}`
    }
  }
}
</script>
