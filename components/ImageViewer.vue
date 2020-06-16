<template>
  <lingallery
    :show-controls="true"
    :disable-image-click="true"
    :iid.sync="currentId"
    :responsive="true"
    :width="width"
    :height="height"
    :items="items"
  />
</template>
<script>
import Lingallery from 'lingallery'
export default {

  components: {
    Lingallery
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      width: 400,
      height: 400,
      currentId: null
    }
  },

  computed: {
    items () {
      const images = []
      for (let i = 0; i < this.images.length; i++) {
        const item = {
          src: this.images[i],
          thumbnail: this.images[i],
          id: i
        }
        images.push(item)
      }
      return images
    }
  }
}
</script>
