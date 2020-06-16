<template>
  <v-footer padless>
    <v-card flat tile class="orange darken-2 white--text text-center">
      <v-card-text>
        <v-btn
          v-for="item in icons"
          :key="item.id"
          :href="item.link"
          target="__blank"
          class="mx-4 white--text"
          color="white"
          fab
        >
          <v-icon large :color="item.color">
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text
        class="white--text pt-0"
      >
        Vape in dubai is renowned vape seller in dubai. we sell product on cash on delivery thorughout the dubai city. Vape in dubai is renowned vape seller in dubai. we sell product on cash on delivery thorughout the dubai city. Vape in dubai is renowned vape seller in dubai. we sell product on cash on delivery thorughout the dubai city.
      </v-card-text>

      <v-divider />

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>www.vapeindubai.xyz</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({}),
  computed: {
    icons () {
      return [
        {
          id: 1,
          color: 'blue darken-1',
          icon: 'mdi-facebook',
          link: 'https://web.facebook.com/vapenights.dubai/'
        },
        {
          id: 2,
          color: 'pink darken-1',
          icon: 'mdi-instagram',
          link: 'https://instagram.com/vapenights?igshid=fx5oiycvyixg'
        },
        {
          id: 3,
          color: 'green darken-1',
          icon: 'mdi-whatsapp',
          link: `https://web.whatsapp.com/send?text=Hello&phone=${process.env.WHATSAPP_NUMBER}`
        }
      ]
    }
  }
}
</script>
