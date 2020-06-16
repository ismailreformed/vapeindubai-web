export default {
  storeBrand (context, payload) {
    return this.$axios.post('brand', payload)
      .then((response) => {
        return response
      })
  },
  getBrands (context, payload) {
    return this.$axios.get('brand')
      .then((response) => {
        return response
      })
  }
}
