<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      light
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="orange darken-2"
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :src="menuBanner" :clipped-left="clipped" fixed app light>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />

      <!-- <v-btn class="hidden-sm-and-down" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-btn class="hidden-sm-and-down" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>-->

      <v-toolbar-title class="mt-1" style="padding-left: 80px;">
        <v-img height="90" width="100" :src="logo" alt="Vape-indubai.net" />
      </v-toolbar-title>

      <v-spacer />
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          color="white"
          class="hidden-sm-and-down"
          background-color="orange darken-2"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider color="white" />

          <v-tab v-for="item in items" :key="item.icon" :to="item.to">
            {{ item.title }}
            <v-icon>{{ item.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content style="background-color: white">
      <v-container class="px-0">
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>-->
  </v-app>
</template>

<script>
import menuBanner from '@/assets/images/menu-banner.jpg'
import logo from '@/assets/images/logo.png'
export default {
  data () {
    return {
      menuBanner,
      logo,
      tab: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-grid-plus',
          title: 'Category',
          to: '/main/category'
        },
        {
          icon: 'mdi-tag-multiple',
          title: 'Brands',
          to: '/main/brands'
        },
        {
          icon: 'mdi-package-variant',
          title: 'Products',
          to: '/main/products'
        },
        {
          icon: 'mdi-cart-plus',
          title: 'Orders',
          to: '/main/orders'
        }
      ],
      miniVariant: false
    }
  }
}
</script>
