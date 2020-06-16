export default {
  storeCategory (context, payload) {
    return this.$axios.post('category', payload)
      .then((response) => {
        return response
      })
  },
  getCategories (context, payload) {
    return this.$axios.get('category')
      .then((response) => {
        return response
      })
  }
}
