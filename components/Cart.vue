<template>
  <div style="margin-top: 100px;">
    <v-card flat light class="pa-3">
      <p
        class="headline text-center"
      >
        Orders over 200 AED receive free delivery within one hour. (Dubai & Sharjah)
      </p>
      <v-divider class="my-4" />

      <v-layout justify-space-around row wrap>
        <v-flex xs12 sm12 lg7 md7 class="hidden-sm-and-down">
          <v-container class="pa-0" grid-list-md>
            <v-layout justify-space-between row wrap>
              <v-flex align-self-start xs5>
                <strong class="subtitle">Product</strong>
              </v-flex>
              <v-flex align-self-center xs2>
                <strong class="subtitle">Qauntity</strong>
              </v-flex>
              <v-flex align-self-center xs2>
                <strong class="subtitle">Price(AED)</strong>
              </v-flex>
              <v-flex align-self-center xs2>
                <strong class="subtitle">Total</strong>
              </v-flex>
              <v-flex align-self-center xs1>
                <strong class="subtitle" />
              </v-flex>
            </v-layout>

            <v-divider class="my-1" />

            <div v-for="(item,i) in selectedItems" :key="item.id">
              <v-layout justify-space-between row wrap>
                <v-flex align-self-center xs1>
                  <v-img height="50" width="50" :src="item.attachments[0].fileUrl" />
                </v-flex>
                <v-flex align-self-center xs4>
                  <span class="subtitle">{{ item.name }}</span>
                </v-flex>
                <v-flex align-self-center xs2>
                  <v-text-field
                    v-model="selectedItems[i].quantity"
                    append-icon="mdi-plus"
                    prepend-inner-icon="mdi-minus"
                    dense
                    outlined
                    type="text"
                    color="orange lighten-1"
                    hide-details
                    @click:append="increaseQuantity(i)"
                    @click:prepend-inner="decreaseQuantity(i)"
                  />
                </v-flex>
                <v-flex align-self-center xs2>
                  <span>
                    <strong>{{ item.price }}</strong>
                  </span>
                </v-flex>
                <v-flex align-self-center xs2>
                  {{ getTotal(item.price, item.quantity) }}
                </v-flex>
                <v-flex align-self-center xs1>
                  <v-icon>mdi-delete</v-icon>
                </v-flex>
              </v-layout>
              <v-divider class="my-2" />
            </div>
          </v-container>
        </v-flex>

        <v-flex xs12 sm12 lg7 md7 class="hidden-md-and-up">
          <v-container class="pa-0" grid-list-md>
            <v-layout justify-space-between row wrap>
              <v-flex align-self-start xs7>
                <strong class="subtitle">Product</strong>
              </v-flex>
              <v-flex align-self-center xs4>
                <strong class="subtitle">Qauntity</strong>
              </v-flex>
              <v-flex align-self-center xs1>
                <strong class="subtitle" />
              </v-flex>
            </v-layout>
            <v-divider class="my-1" />

            <div v-for="(item,i) in selectedItems" :key="item.name">
              <v-layout justify-space-between row wrap>
                <v-flex align-self-center xs2>
                  <v-img height="50" width="50" :src="item.attachments[0].fileUrl" />
                </v-flex>
                <v-flex align-self-center xs5>
                  <p class="mb-2">
                    {{ item.name }}
                  </p>
                  <span>
                    <strong>{{ item.price }} * {{ item.quantity }} = {{ getTotal(item.price, item.quantity) }}</strong>
                  </span>
                </v-flex>
                <v-flex align-self-center xs4>
                  <v-text-field
                    v-model="selectedItems[i].quantity"
                    append-icon="mdi-plus"
                    prepend-inner-icon="mdi-minus"
                    dense
                    outlined
                    type="text"
                    color="orange lighten-1"
                    hide-details
                    @click:append="increaseQuantity(i)"
                    @click:prepend-inner="decreaseQuantity(i)"
                  />
                </v-flex>
                <v-flex align-self-center xs1>
                  <v-icon>mdi-delete</v-icon>
                </v-flex>
              </v-layout>
              <v-divider class="my-2" />
            </div>
          </v-container>
        </v-flex>

        <v-divider vertical class="mx-0" />

        <v-flex xs12 sm12 lg4 md4 class="pa-0 ma-0">
          <v-container grid-list-md class="pa-0">
            <strong class="title">Cart Total</strong>

            <v-divider class="mb-5" />

            <v-layout justify-space-around row wrap>
              <v-flex align-self-start xs3>
                <strong>Subtotal</strong>
              </v-flex>
              <v-flex align-self-end xs9>
                <span>{{ subTotal() }}</span>
              </v-flex>
            </v-layout>

            <br>

            <v-layout row wrap>
              <v-flex align-self-start xs3>
                <strong>Shipping</strong>
              </v-flex>
              <v-flex align-self-end xs9>
                <span>Enter your address to view shipping options</span>
              </v-flex>
            </v-layout>

            <br>

            <v-layout row wrap>
              <v-flex align-self-center xs3>
                <strong>Total</strong>
              </v-flex>
              <v-flex align-self-center xs9>
                <span>
                  <strong class="title">{{ subTotal() }}</strong> (includes د.إ 0.00 VAT)
                </span>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-3">
              <v-flex v-if="false" align-self-start xs12>
                <v-btn block color="orange darken-3" class="white--text">
                  Proceed to checkout
                </v-btn>
              </v-flex>
              <v-flex align-self-start xs12>
                <v-btn
                  outlined
                  class="py-4"
                  color="green lighten-1"
                  :href="link + `items=${orderdata}`"
                  target="__blank"
                >
                  Order By
                  <v-icon right size="25" color="green lighten-1">
                    mdi-whatsapp
                  </v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
      <br>
      <!-- <SimilarProduct /> -->
    </v-card>
    <br>
  </div>
</template>
<script>
// import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapGetters } from 'vuex'

export default {
  components: {
    // VueSlickCarousel
    // SimilarProduct: () => import('@/components/SimilarProduct.vue')
  },

  data () {
    return {
      toggle_exclusive: false,
      items: [
        { title: 'Title one', value: 'faf kasjdfklasd j' },
        { title: 'Title one asd', value: 'faf kasjdfklasd j' },
        { title: 'Title one asdfasdf', value: 'faf kasjdfklasd j' },
        { title: 'Title ', value: 'faf kasjdfklasd j' }
      ],
      selectedItems: []
    }
  },

  computed: {
    ...mapGetters({
      cartItems: 'cart/getSelectedItems'
    }),

    whatsapp () {
      return process.env.WHATSAPP_NUMBER
    },

    link () {
      return `https://web.whatsapp.com/send?phone=${this.whatsapp}&text=`
    },

    orderdata () {
      const items = []
      this.selectedItems.forEach((element) => {
        const item = {
          id: `${element.id}`,
          name: `name=${element.name}`,
          quantity: `quantity=${element.quantity}`,
          price: `price=${element.price}`,
          img: `imgLink=${element.attachments[0].fileUrl}`
        }
        items.push(Object.values(item).join(', '))
      })
      if (items.length) {
        const subtotal = { subtotal: this.subTotal() }
        items.push(Object.values(subtotal).join('subtotal'))
      }
      return items.join(' || ')
    }
  },
  watch: {
    cartItems: {
      handler (nv) {
        if (this.cartItems.length) {
          this.selectedItems = JSON.parse(JSON.stringify(this.cartItems))
        }
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    decreaseQuantity (i) {
      this.selectedItems[i].quantity = this.selectedItems[i].quantity - 1
    },

    increaseQuantity (i) {
      this.selectedItems[i].quantity = this.selectedItems[i].quantity + +1
    },

    getTotal (price, quantity) {
      return price * quantity
    },

    subTotal () {
      let total = 0
      this.selectedItems.forEach((element) => {
        total = element.quantity * element.price + total
      })
      return total
    }
  }
}
</script>
