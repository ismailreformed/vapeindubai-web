<template>
  <v-app style="background-color: white;">
    <v-card>
      <v-app-bar
        fixed
        color="#fcb69f"
        dense
        short
        :src="menuBanner"
        scroll-target="#scrolling-techniques-2"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)" />
        </template>
        <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer" />

        <v-toolbar-title class="mt-12" style="padding-left: 80px;">
          <v-img height="110" width="100" :src="logo" alt="Vape-indubai.net" />
        </v-toolbar-title>

        <v-spacer />

        <v-text-field
          id="id"
          block
          single-line
          hide-details
          label="Search"
          class="mt-3 hidden-sm-and-down"
        />

        <v-spacer />

        <v-badge class="mt-5" color="orange" :content="selectedItems.length" overlap top>
          <v-btn icon @click.stop="$router.push('/cart')">
            <v-icon color="white">
              mdi-cart
            </v-icon>
          </v-btn>
        </v-badge>

        <!-- <v-btn class="mt-5" icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>-->
        <template v-slot:extension>
          <v-text-field
            id="id"
            block
            single-line
            hide-details
            label="Search"
            class="hidden-sm-and-up"
          />

          <v-container grid-list-xs class="py-0 hidden-sm-and-down">
            <v-layout justify-center row wrap class="my-0 py-0">
              <div v-for="brand in brands" :key="brand.id" class="text-center">
                <v-menu open-on-hover bottom offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn class="my-0 mx-5" text block color="white" v-on="on">
                      {{ brand.name }}
                    </v-btn>
                  </template>

                  <v-card flat light>
                    <v-list>
                      <v-list-item v-for="category in brand.categories" :key="category">
                        <v-list-item-title>{{ brand.name }} {{ category }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </div>
            </v-layout>
          </v-container>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        color="orange lighten-2 black--text"
        :src="bg"
        absolute
        temporary
      >
        <v-card flat>
          <v-card-title class="pa-0">
            <v-spacer />
            <v-img height="110" width="110" :src="logo" alt="Vape-indubai.net" />
            <v-spacer />
          </v-card-title>
        </v-card>
        <v-list dense nav>
          <v-list-group v-for="brand in brands" :key="brand.id" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="brand.name" />
              </v-list-item-content>
            </template>

            <v-list-item v-for="subItem in brand.categories" :key="subItem">
              <v-list-item-content>
                <v-list-item-title>{{ brand.name }} {{ subItem }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

      <v-sheet style="background-color: white">
        <v-container style="height: 100%">
          <v-content>
            <v-container class="pa-0">
              <nuxt />
            </v-container>
          </v-content>
        </v-container>
        <Footer />
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import menuBanner from '@/assets/images/menu-banner.jpg'
import logo from '@/assets/images/logo.png'
export default {
  components: {
    Footer: () => import('@/components/Footer.vue')
  },

  data: () => ({
    menuBanner,
    logo,
    fav: true,
    menu: false,
    message: false,
    hints: true,
    drawer: false,
    brands: []
  }),
  computed: {
    bg () {
      return this.background
        ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
        : undefined
    },
    ...mapGetters({
      selectedItems: 'cart/getSelectedItems'
    })
  },

  created () {
    this.initializeBrands()
  },

  methods: {
    initializeBrands () {
      this.$store
        .dispatch('brand/getBrands')
        .then((response) => {
          this.brands = response.data.result.data
        })
    }
  }
}
</script>

<style>
/* html {
  overflow-y: hidden;
} */
.customInput {
  width: 30px;
  border: 1px solid gray;
  text-align: center;
}
</style>
