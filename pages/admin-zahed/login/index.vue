<template>
  <v-container grid-list-lg>
    <v-layout justify-center row wrap>
      <v-flex align-content-center xs12 sm8 md6 lg5>
        <v-card light>
          <v-card-title class="primary black--text">
            <v-spacer />
            <v-img height="90" width="100" :src="logo" alt="Vape-indubai.net" />
            <v-spacer />
          </v-card-title>
          <v-card-text class="pt-10 pb-1">
            <v-form>
              <v-text-field v-model="email" label="Email" outlined shaped>
                <template v-slot:append>
                  <v-icon color="primary">
                    mdi-email
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field v-model="password" label="Password" outlined shaped>
                <template v-slot:append>
                  <v-icon color="primary">
                    mdi-key
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" block>
              Login
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import logo from '@/assets/images/logo.png'

export default {
  layout: 'Auth',
  props: {
    source: {
      type: String,
      required: false,
      default () {
        return 'asd'
      }
    }

  },

  data () {
    return {
      logo,
      email: '',
      password: ''
    }
  }
}
</script>
