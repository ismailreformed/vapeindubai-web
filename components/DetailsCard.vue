<template>
  <div>
    <v-card light class="pa-3">
      <v-layout row wrap>
        <v-flex xs12 sm12 lg6 md6>
          <ImageViewer :images="images" />
        </v-flex>
        <v-flex xs12 sm12 lg6 md6>
          <v-card light flat class="pa-1">
            <v-card-text class="pt-0 pb-0">
              <span class="headline">{{ product.name }} ( {{ product.surname }})</span>
              <p class="mb-0">
                <span v-for="brand in product.brands" :key="brand" class="mr-2">{{ brand }}</span>
              </p>
              <p>
                <span class="headline">
                  <b>AED {{ product.price }}</b>
                </span>
                <span>
                  <strike>{{ product.oldPrice }}</strike>
                </span>
              </p>

              <p>{{ product.shortIntroduction }}</p>

              <!-- will add a list of details -->
              <!--
              <v-layout
                class="px-2"
                v-for="item in items"
                :key="item.title"
                justify-space-between
                row
                wrap
              >
                <v-flex xs4>
                  <strong>{{item.title}}</strong>
                </v-flex>
                <v-flex xs8>
                  <span>{{item.value}}</span>
                </v-flex>
              </v-layout>-->
              <v-layout justify-space-between row wrap>
                <v-flex lg3 xs4>
                  <v-text-field
                    v-model="quantity"
                    append-icon="mdi-plus"
                    prepend-inner-icon="mdi-minus"
                    dense
                    outlined
                    type="text"
                    color="orange lighten-1"
                    class="py-0"
                    @click:append="increaseQuantity"
                    @click:prepend-inner="decreaseQuantity"
                  />
                </v-flex>
                <v-flex lg4 xs6>
                  <v-btn
                    rounded
                    color="orange lighten-1"
                    class="white--text px-4"
                    @click="addToCart()"
                  >
                    Add to cart
                  </v-btn>
                </v-flex>
                <v-flex lg4 xs6>
                  <v-btn
                    outlined
                    class="py-4"
                    color="green lighten-1"
                    :href="link + `id=${product.id},name=${product.name},quantity=${quantity},price=${product.price},total=${getTotal(product.price,quantity)}`"
                    target="__blank"
                  >
                    Order By
                    <v-icon right size="25" color="green lighten-1">
                      mdi-whatsapp
                    </v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-text class="py-1 px-3">
              <!-- <span>
                <strong>SKU:</strong> asdfasddasf
              </span>-->
              <v-divider class="my-1" />
              <span>
                <strong>Category:</strong>
                <span
                  v-for="category in product.categories"
                  :key="category"
                  class="mr-4"
                >{{ category }}</span>
              </span>
              <v-divider class="my-1" />
              <span>
                <strong>Tags:</strong>
                <span v-for="tag in product.tags" :key="tag" class="mr-4">{{ tag }}</span>
              </span>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import ImageViewer from '@/components/ImageViewer'

export default {
  components: {
    ImageViewer
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      quantity: 1,
      items: [
        { title: 'Title one', value: 'faf kasjdfklasd j' },
        { title: 'Title one asd', value: 'faf kasjdfklasd j' },
        { title: 'Title one asdfasdf', value: 'faf kasjdfklasd j' },
        { title: 'Title ', value: 'faf kasjdfklasd j' }
      ]
    }
  },

  computed: {
    images () {
      return Array.prototype.map.call(this.product.attachments, function (item) {
        return item.fileUrl
      })
    },

    whatsapp () {
      return process.env.WHATSAPP_NUMBER
    },

    link () {
      return `https://web.whatsapp.com/send?phone=${this.whatsapp}&text=`
    },

    cart () {
      const data = this.product
      data.quantity = this.quantity
      return data
    }
  },

  mounted () {
    if (this.product.quantity > 1) {
      this.quantity = this.product.quantity
    } else {
      this.quantity = 1
    }
  },

  methods: {
    decreaseQuantity () {
      this.quantity = this.quantity - 1
    },

    increaseQuantity () {
      this.quantity = this.quantity + +1
    },

    getTotal (price, quantity) {
      return price * quantity
    },

    addToCart () {
      this.$store.commit('cart/addToCart', this.cart)
      this.$emit('closeDetailCard')
    }
  }
}
</script>
