export default {
  storeProduct (context, payload) {
    return this.$axios.post('product', payload)
      .then((response) => {
        return response
      })
  },

  getProducts (context, payload) {
    return this.$axios.get('product')
      .then((response) => {
        return response
      })
  },

  getProduct (context, payload) {
    return this.$axios.get('product/' + payload)
      .then((response) => {
        return response
      })
  }
}
